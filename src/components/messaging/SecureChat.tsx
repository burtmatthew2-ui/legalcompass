import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Paperclip, Loader2 } from "lucide-react";
import { FileUploadButton } from "@/components/FileUploadButton";
import { MessageAttachments } from "@/components/MessageAttachments";
import { format } from "date-fns";

interface Message {
  id: string;
  sender_type: string;
  sender_id: string;
  message_content: string;
  attachments: any;
  created_at: string;
}

interface SecureChatProps {
  leadId: string;
  userType: "lawyer" | "client";
  userId: string;
  otherPartyName?: string;
}

export const SecureChat = ({ leadId, userType, userId, otherPartyName }: SecureChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
    markMessagesAsRead();

    const channel = supabase
      .channel(`chat-${leadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'case_messages',
          filter: `lead_id=eq.${leadId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
          if (payload.new.sender_id !== userId) {
            markMessagesAsRead();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [leadId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('case_messages')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: true });

    if (error) {
      toast({
        title: "Error loading messages",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const markMessagesAsRead = async () => {
    await supabase.rpc('mark_messages_as_read', {
      p_lead_id: leadId,
      p_user_id: userId,
      p_user_role: userType === 'lawyer' ? 'attorney' : 'client'
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    setSending(true);
    try {
      let uploadedAttachments = [];

      if (attachments.length > 0) {
        for (const file of attachments) {
          const filePath = `${leadId}/${Date.now()}_${file.name}`;
          const { error: uploadError } = await supabase.storage
            .from('legal-documents')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          uploadedAttachments.push({
            name: file.name,
            path: filePath,
            size: file.size,
            type: file.type
          });
        }
      }

      const { error } = await supabase
        .from('case_messages')
        .insert({
          lead_id: leadId,
          sender_id: userId,
          sender_type: userType,
          message_content: newMessage,
          attachments: uploadedAttachments.length > 0 ? uploadedAttachments : null
        });

      if (error) throw error;

      setNewMessage("");
      setAttachments([]);
      
      toast({
        title: "Message sent",
        description: "Your message has been delivered securely.",
      });
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleFileSelect = (files: File[]) => {
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="p-4 border-b bg-muted/30">
        <h3 className="font-semibold">
          Secure Chat {otherPartyName && `with ${otherPartyName}`}
        </h3>
        <p className="text-sm text-muted-foreground">End-to-end encrypted messaging</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.sender_id === userId;
          return (
            <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`rounded-lg p-3 ${
                  isOwn 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  <p className="text-sm whitespace-pre-wrap break-words">{message.message_content}</p>
                  {message.attachments && (
                    <div className="mt-2">
                      <MessageAttachments 
                        attachments={message.attachments} 
                      />
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground px-2">
                  {format(new Date(message.created_at), 'MMM d, h:mm a')}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <FileUploadButton
            onFilesSelected={handleFileSelect}
            selectedFiles={attachments}
            onRemoveFile={removeAttachment}
            disabled={sending}
          />

          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />

          <Button 
            onClick={handleSendMessage} 
            disabled={sending || (!newMessage.trim() && attachments.length === 0)}
            size="icon"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
};
