import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, ArrowLeft, Compass, LogOut, Menu, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChatMessageMemo } from "./ChatMessageMemo";
import { streamLegalResearch } from "@/utils/streamChat";
import { toast as sonnerToast } from "sonner";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useSubscription } from "@/hooks/useSubscription";
import { ConversationSidebar } from "./ConversationSidebar";
import { FileUpload } from "./FileUpload";
import { ConversationActions } from "./ConversationActions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Sparkles } from "lucide-react";
import { UploadedFilePreview } from "./UploadedFilePreview";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useQuestionUsage } from "@/hooks/useQuestionUsage";
import { SubscriptionDialog } from "./SubscriptionDialog";
import { logger } from "@/utils/logger";
import type { User } from "@/types/user";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

export const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { isAdmin } = useAdminStatus();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    sonnerToast.success("Signed out successfully");
    navigate("/");
  };
  
  const {
    messages,
    setMessages,
    currentConversation,
    conversations,
    createConversation,
    saveMessage,
    deleteConversation,
    loadMessages,
  } = useChatHistory();

  const { subscription, loading: subLoading } = useSubscription();
  const { questionCount, remainingFreeQuestions, refetch: refetchUsage } = useQuestionUsage();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; path: string }>>([]);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageCountRef = useRef(0);
  const userScrolledUpRef = useRef(false);

  // Track if user has scrolled up
  const handleScroll = () => {
    if (!scrollAreaRef.current) return;
    
    // Find the viewport element inside ScrollArea
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    const scrollElement = viewport || scrollAreaRef.current;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    userScrolledUpRef.current = !isNearBottom;
  };

  // Smart auto-scroll: only on new messages and when user is at bottom
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    // Only auto-scroll when a NEW message is added (not during streaming updates)
    const messageCountChanged = messages.length !== lastMessageCountRef.current;
    lastMessageCountRef.current = messages.length;
    
    if (!messageCountChanged) return;
    
    // Only auto-scroll if user hasn't scrolled up
    if (userScrolledUpRef.current) return;
    
    // Smooth scroll to bottom
    requestAnimationFrame(() => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        const scrollElement = viewport || scrollAreaRef.current;
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: 'smooth'
        });
      }
    });
  }, [messages.length]);

  // Reset scroll tracking and scroll to bottom when conversation changes
  useEffect(() => {
    userScrolledUpRef.current = false;
    lastMessageCountRef.current = 0;
    
    // Scroll to bottom when loading a conversation
    if (messages.length > 0 && scrollAreaRef.current) {
      // Use requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            const scrollElement = viewport || scrollAreaRef.current;
            // Use instant scroll for conversation switch to avoid lag
            scrollElement.scrollTop = scrollElement.scrollHeight;
          }
        });
      });
    }
  }, [currentConversation?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    
    // Check if user has free questions or subscription (admins bypass)
    if (!isAdmin && !subscription?.subscribed && remainingFreeQuestions <= 0) {
      setShowSubscriptionDialog(true);
      return;
    }
    
    if (trimmedInput.length > 5000) {
      toast({
        title: "Message Too Long",
        description: "Please limit your message to 5000 characters",
        variant: "destructive",
      });
      return;
    }

    const userMessage = trimmedInput;
    setInput("");
    
    // Create conversation if this is the first message
    let conversationId = currentConversation?.id;
    if (!conversationId) {
      conversationId = await createConversation(userMessage);
      if (!conversationId) {
        toast({
          title: "Error",
          description: "Failed to create conversation",
          variant: "destructive",
        });
        return;
      }
    }

    // Append file context if files are uploaded
    let messageContent = userMessage;
    if (uploadedFiles.length > 0) {
      const fileContext = uploadedFiles.map(f => `[Uploaded Document: ${f.name}]`).join('\n');
      messageContent = `${userMessage}\n\n${fileContext}`;
    }

    const userMsg: Message = { role: "user", content: messageContent };
    setMessages((prev) => [...prev, userMsg]);
    await saveMessage(userMsg);
    
    // Update usage count immediately for UI feedback
    if (!isAdmin && !subscription?.subscribed) {
      await refetchUsage();
    }
    
    setIsLoading(true);

    let assistantContent = "";
    let updateTimeout: NodeJS.Timeout | null = null;
    
    const upsertAssistant = (chunk: string) => {
      assistantContent += chunk;
      
      // Throttle updates to every 100ms for better performance
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      
      updateTimeout = setTimeout(() => {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [...prev.slice(0, -1), { role: "assistant", content: assistantContent }];
          }
          return [...prev, { role: "assistant", content: assistantContent }];
        });
      }, 100);
    };

    try {
      await streamLegalResearch({
        messages: [...messages, userMsg],
        uploadedFiles: uploadedFiles.length > 0 ? uploadedFiles : undefined, // Only send if files exist in current session
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: async () => {
          // Clear any pending timeouts
          if (updateTimeout) {
            clearTimeout(updateTimeout);
          }
          // Final update with complete content
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant") {
              return [...prev.slice(0, -1), { role: "assistant", content: assistantContent }];
            }
            return [...prev, { role: "assistant", content: assistantContent }];
          });
          // Refresh question count and save message
          await refetchUsage();
          await saveMessage({ role: "assistant", content: assistantContent });
          setUploadedFiles([]);
          setIsLoading(false);
        },
        onError: (error) => {
          logger.error("Chat stream error", new Error(error), {
            userId: user?.id,
            conversationId,
            hasSubscription: subscription?.subscribed,
            remainingQuestions: remainingFreeQuestions,
            errorType: error === "TRIAL_EXHAUSTED" ? "trial_exhausted" : "stream_error"
          });
          
          // Handle free trial exhaustion with clean dialog
          if (error === "TRIAL_EXHAUSTED") {
            setIsLoading(false);
            setShowSubscriptionDialog(true);
            // Remove the user's question since it wasn't processed
            setMessages(prev => prev.slice(0, -1));
            return;
          }
          
          // Handle other errors
          sonnerToast.error(error || "Failed to get response. Please try again.");
          setIsLoading(false);
          setMessages(prev => prev.slice(0, -1));
        },
      });
    } catch (error) {
      logger.error("Chat submit error", error, {
        userId: user?.id,
        conversationId,
        messageLength: userMessage?.length,
        hasFiles: uploadedFiles.length > 0
      });
      sonnerToast.error("Failed to get response. Please try again.");
      setIsLoading(false);
      setMessages(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] flex flex-col">
      <SubscriptionDialog 
        open={showSubscriptionDialog} 
        onOpenChange={setShowSubscriptionDialog}
      />
      
      {/* Legal AI Disclaimer - Compact on mobile */}
      <Alert className="mx-3 md:mx-6 my-2 md:my-3 border-yellow-600 bg-yellow-50 dark:bg-yellow-950/20">
        <AlertDescription className="text-xs md:text-sm text-yellow-900 dark:text-yellow-100">
          <strong>Important Legal Disclaimer:</strong> This AI provides general legal information only and is NOT a substitute for a licensed attorney. For specific legal advice about your situation, please consult a qualified lawyer in your jurisdiction.
        </AlertDescription>
      </Alert>

      {/* Only show free trial counter for non-subscribed users */}

      <ConversationSidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onSelectConversation={(conv) => loadMessages(conv.id)}
        onDeleteConversation={deleteConversation}
        onNewConversation={() => {
          setMessages([]);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="border-b border-border bg-card shadow-sm">
        <div className="max-w-5xl mx-auto px-3 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="hover:bg-muted rounded-md shrink-0"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-muted rounded-md shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Button>
              <div className="min-w-0">
                <h2 className="text-base md:text-xl font-semibold text-foreground truncate">
                  Legal Research Assistant
                </h2>
                <p className="text-xs text-muted-foreground hidden sm:block">Professional AI-powered analysis</p>
              </div>
            </div>
            <div className="flex gap-1 md:gap-2 items-center shrink-0">
              <div className="hidden sm:flex">
                <ConversationActions 
                  messages={messages} 
                  conversationId={currentConversation?.id || null}
                />
              </div>
              <Button
                onClick={() => navigate("/pricing")}
                variant="outline"
                size="sm"
                className="border-primary/30 hover:bg-primary/5 text-primary hidden sm:flex"
              >
                Upgrade
              </Button>
              {isAdmin && (
                <Button
                  onClick={() => navigate("/admin")}
                  variant="outline"
                  size="icon"
                  className="border-border hover:bg-muted"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              )}
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="icon"
                className="hover:bg-muted rounded-md"
              >
                <LogOut className="h-4 w-4 text-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea 
        className="flex-1 px-3 md:px-6 bg-background" 
        ref={scrollAreaRef}
        onScroll={handleScroll}
      >
        <div className="max-w-5xl mx-auto py-12 space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-6 inline-flex items-center justify-center">
                <Compass className="w-16 h-16 text-primary" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Ask me anything about legal matters, and I'll research applicable laws and databases to help you discover insights and strategies.
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                {[
                  "What are the legal requirements for starting a business?",
                  "How do I protect my intellectual property?",
                  "What are my rights as a tenant?",
                  "How does contract law work in my state?"
                ].map((example, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(example)}
                    className="p-4 text-left rounded-lg bg-card border border-border hover:border-primary hover:bg-muted transition-all text-sm text-foreground shadow-sm"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessageMemo key={index} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex items-center gap-4 p-5 rounded-lg bg-card border border-primary/30 shadow-sm">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-foreground font-medium">Researching legal databases and analyzing regulations...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-card shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-3 md:px-6 py-3 md:py-5">
          <UploadedFilePreview 
            files={uploadedFiles}
            onRemove={(index) => {
              setUploadedFiles(prev => prev.filter((_, i) => i !== index));
              sonnerToast.info("File removed");
            }}
          />
          <div className="flex gap-2 items-end">
            <FileUpload 
              conversationId={currentConversation?.id || null}
              onFileUploaded={(file) => {
                setUploadedFiles(prev => [...prev, file]);
                sonnerToast.success(`${file.name} uploaded and ready for AI review`);
              }}
              compact
            />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about legal matters, regulations, or strategies..."
              className="flex-1 bg-background border-border focus:border-primary text-base py-5 rounded-lg"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-5 text-base font-semibold rounded-lg shadow-sm"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
