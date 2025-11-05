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
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useQuestionUsage } from "@/hooks/useQuestionUsage";
import { SubscriptionDialog } from "./SubscriptionDialog";
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
  const [uploadedFile, setUploadedFile] = useState<{ name: string; path: string } | null>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    
    // Check if user has free questions or subscription (admins bypass)
    if (!isAdmin && !subscription?.subscribed && remainingFreeQuestions <= 0) {
      toast({
        title: "Free Trial Exhausted",
        description: "You've used your 3 free questions. Subscribe to continue!",
        variant: "destructive",
      });
      navigate("/pricing");
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

    let userMessage = trimmedInput;
    
    // Add file context if uploaded
    if (uploadedFile) {
      userMessage += `\n\n[Attached Document: ${uploadedFile.name}]`;
    }
    
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

    const userMsg: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    await saveMessage(userMsg);
    
    // Update usage count immediately for UI feedback
    if (!isAdmin && !subscription?.subscribed) {
      await refetchUsage();
    }
    
    setIsLoading(true);

    let assistantContent = "";
    const upsertAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.slice(0, -1).concat({ role: "assistant", content: assistantContent });
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      await streamLegalResearch({
        messages: [...messages, userMsg],
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: async () => {
          // Refresh question count and save message
          await refetchUsage();
          await saveMessage({ role: "assistant", content: assistantContent });
          setIsLoading(false);
          setUploadedFile(null); // Clear uploaded file after processing
        },
        onError: (error) => {
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
      {!isAdmin && !subscription?.subscribed && !subLoading && (
        <Alert className={`m-6 ${remainingFreeQuestions > 0 ? 'border-primary bg-primary/10' : 'border-destructive bg-destructive/10'}`}>
          {remainingFreeQuestions > 0 ? <Sparkles className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
          <AlertDescription className="flex items-center justify-between">
            <span>
              {remainingFreeQuestions > 0 
                ? `Free Trial: ${remainingFreeQuestions} question${remainingFreeQuestions === 1 ? '' : 's'} remaining` 
                : "You've used your 3 free questions. Subscribe to continue!"}
            </span>
            {remainingFreeQuestions === 0 && (
              <Button onClick={() => navigate("/pricing")} size="sm" variant="destructive">
                Subscribe Now
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

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

      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="hover:bg-slate-100 rounded-md"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-slate-100 rounded-md"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Legal Research Assistant
              </h2>
              <p className="text-xs text-slate-500">Professional AI-powered analysis</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <ConversationActions 
              messages={messages} 
              conversationId={currentConversation?.id || null}
            />
            {isAdmin && (
              <Button
                onClick={() => navigate("/admin")}
                variant="outline"
                size="sm"
                className="border-slate-300 hover:bg-slate-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            )}
            <Button
              onClick={() => navigate("/pricing")}
              variant="outline"
              size="sm"
              className="border-primary/30 hover:bg-primary/5 text-primary"
            >
              Upgrade
            </Button>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="icon"
              className="hover:bg-slate-100 rounded-md"
            >
              <LogOut className="h-4 w-4 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 bg-slate-50" ref={scrollAreaRef}>
        <div className="max-w-5xl mx-auto py-12 space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-6 inline-flex items-center justify-center">
                <Compass className="w-16 h-16 text-primary" />
              </div>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
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
                    className="p-4 text-left rounded-lg bg-white border border-slate-200 hover:border-primary hover:bg-slate-50 transition-all text-sm text-slate-700 shadow-sm"
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
            <div className="flex items-center gap-4 p-5 rounded-lg bg-white border border-primary/30 shadow-sm">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-slate-700 font-medium">Researching legal databases and analyzing regulations...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-slate-200 bg-white shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-6 py-5 space-y-3">
          <FileUpload 
            conversationId={currentConversation?.id || null}
            onFileUploaded={(file) => {
              setUploadedFile(file);
              sonnerToast.success(`${file.name} uploaded - add your question and send`);
            }}
          />
          {uploadedFile && (
            <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-sm">
              <span className="text-primary font-medium">📎 {uploadedFile.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setUploadedFile(null)}
                className="ml-auto h-6 px-2"
              >
                Remove
              </Button>
            </div>
          )}
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={uploadedFile ? "Ask a question about the uploaded document..." : "Ask about legal matters, regulations, or strategies..."}
              className="flex-1 bg-white border-slate-300 focus:border-primary text-base py-5 rounded-lg"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-5 text-base font-semibold rounded-lg shadow-sm"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
