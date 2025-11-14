import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { MessageAttachments } from '@/components/MessageAttachments';
import { FileUploadButton } from '@/components/FileUploadButton';

interface Attachment {
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
}

interface Message {
  id: string;
  sender_id: string;
  sender_type: string;
  message_content: string;
  created_at: string;
  attachments?: Attachment[];
}

export default function Conversation() {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const { role, loading: roleLoading } = useUserRole();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [caseTitle, setCaseTitle] = useState('');
  const [otherPartyName, setOtherPartyName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (roleLoading || !role || !leadId) return;

    const fetchConversation = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        // Fetch case details
        const { data: caseData, error: caseError } = await supabase
          .from('legal_cases')
          .select('legal_topic, user_id')
          .eq('id', leadId)
          .single();

        if (caseError) throw caseError;
        setCaseTitle(caseData.legal_topic);

        // Fetch other party name
        if (role === 'attorney') {
          const { data: clientProfile } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', caseData.user_id)
            .single();
          
          setOtherPartyName(clientProfile?.email || 'Client');
        } else {
          const { data: purchase } = await supabase
            .from('lead_purchases')
            .select('lawyer_profiles:lawyer_id(full_name, email)')
            .eq('lead_id', leadId)
            .single();

          const lawyerProfile = (purchase as any)?.lawyer_profiles;
          setOtherPartyName(lawyerProfile?.full_name || lawyerProfile?.email || 'Attorney');
        }

        // Fetch messages with attachments
        const { data: messagesData, error: messagesError } = await supabase
          .from('case_messages')
          .select('id, sender_id, sender_type, message_content, created_at, attachments')
          .eq('lead_id', leadId)
          .order('created_at', { ascending: true });

        if (messagesError) throw messagesError;
        setMessages((messagesData || []) as unknown as Message[]);

        // Mark messages as read
        await supabase.rpc('mark_messages_as_read', {
          p_lead_id: leadId,
          p_user_id: user.id,
          p_user_role: role
        });

      } catch (error: any) {
        console.error('Error fetching conversation:', error);
        toast.error('Failed to load conversation');
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();

    // Subscribe to realtime message updates
    const channel = supabase
      .channel(`conversation-${leadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'case_messages',
          filter: `lead_id=eq.${leadId}`
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [leadId, role, roleLoading, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && selectedFiles.length === 0) || sending || !leadId) return;

    setSending(true);
    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let attachments: Attachment[] = [];

      // Upload files if any
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}/${leadId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('legal-documents')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          attachments.push({
            file_name: file.name,
            file_path: fileName,
            file_type: file.type,
            file_size: file.size,
            uploaded_at: new Date().toISOString()
          });
        }
      }

      const messageData: any = {
        lead_id: leadId,
        sender_id: user.id,
        sender_type: role,
        message_content: newMessage.trim() || '(attachment)'
      };

      if (attachments.length > 0) {
        messageData.attachments = attachments;
      }

      const { error } = await supabase
        .from('case_messages')
        .insert(messageData);

      if (error) throw error;

      setNewMessage('');
      setSelectedFiles([]);
      toast.success('Message sent');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
      setUploading(false);
    }
  };

  if (roleLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/messages')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Messages
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>{caseTitle}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Conversation with {otherPartyName}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No messages yet. Start the conversation!
                  </p>
                ) : (
                  messages.map((message) => {
                    const isOwnMessage = message.sender_type === role;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            isOwnMessage
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.message_content && message.message_content !== '(attachment)' && (
                            <p className="text-sm">{message.message_content}</p>
                          )}
                          {message.attachments && message.attachments.length > 0 && (
                            <MessageAttachments attachments={message.attachments} />
                          )}
                          <p className={`text-xs mt-1 ${isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="space-y-2">
                <FileUploadButton
                  onFilesSelected={setSelectedFiles}
                  selectedFiles={selectedFiles}
                  onRemoveFile={(index) => {
                    setSelectedFiles(files => files.filter((_, i) => i !== index));
                  }}
                  disabled={sending || uploading}
                />
                
                <div className="flex gap-2">
                  <Textarea
                    placeholder={`Message ${otherPartyName}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                    rows={3}
                    disabled={uploading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={(!newMessage.trim() && selectedFiles.length === 0) || sending || uploading}
                    size="icon"
                    className="h-full"
                  >
                    {sending || uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
