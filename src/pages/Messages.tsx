import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface ConversationThread {
  lead_id: string;
  case_title: string;
  other_party_name: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

export default function Messages() {
  const navigate = useNavigate();
  const { role, loading: roleLoading } = useUserRole();
  const [conversations, setConversations] = useState<ConversationThread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roleLoading) return;

    const fetchConversations = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        if (role === 'attorney') {
          // Fetch attorney's cases
          const { data: purchases, error: purchasesError } = await supabase
            .from('lead_purchases')
            .select(`
              lead_id,
              legal_cases!inner(
                id,
                legal_topic,
                description,
                user_id,
                profiles!inner(email)
              )
            `)
            .eq('lawyer_id', user.id);

          if (purchasesError) throw purchasesError;

          // Fetch last messages and unread counts
          const threads: ConversationThread[] = await Promise.all(
            (purchases || []).map(async (purchase: any) => {
              const { data: lastMessage } = await supabase
                .from('case_messages')
                .select('message_content, created_at')
                .eq('lead_id', purchase.lead_id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

              const { data: unreadMessages } = await supabase
                .from('case_messages')
                .select('id')
                .eq('lead_id', purchase.lead_id)
                .eq('sender_type', 'client')
                .eq('read_by_lawyer', false);

              return {
                lead_id: purchase.lead_id,
                case_title: purchase.legal_cases.legal_topic,
                other_party_name: purchase.legal_cases.profiles.email,
                last_message: lastMessage?.message_content || 'No messages yet',
                last_message_time: lastMessage?.created_at || '',
                unread_count: unreadMessages?.length || 0
              };
            })
          );

          setConversations(threads);
        } else if (role === 'client') {
          // Fetch client's cases with attorneys
          const { data: cases, error: casesError } = await supabase
            .from('legal_cases')
            .select(`
              id,
              legal_topic,
              description,
              lead_purchases!inner(
                lawyer_id,
                lawyer_profiles:lawyer_id(full_name, email)
              )
            `)
            .eq('user_id', user.id);

          if (casesError) throw casesError;

          // Fetch last messages and unread counts
          const threads: ConversationThread[] = await Promise.all(
            (cases || []).map(async (legalCase: any) => {
              const { data: lastMessage } = await supabase
                .from('case_messages')
                .select('message_content, created_at')
                .eq('lead_id', legalCase.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

              const { data: unreadMessages } = await supabase
                .from('case_messages')
                .select('id')
                .eq('lead_id', legalCase.id)
                .eq('sender_type', 'lawyer')
                .eq('read_by_client', false);

              const lawyerProfile = legalCase.lead_purchases[0]?.lawyer_profiles;

              return {
                lead_id: legalCase.id,
                case_title: legalCase.legal_topic,
                other_party_name: lawyerProfile?.full_name || lawyerProfile?.email || 'Attorney',
                last_message: lastMessage?.message_content || 'No messages yet',
                last_message_time: lastMessage?.created_at || '',
                unread_count: unreadMessages?.length || 0
              };
            })
          );

          setConversations(threads);
        }
      } catch (error: any) {
        console.error('Error fetching conversations:', error);
        toast.error('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('conversation-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'case_messages'
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [role, roleLoading, navigate]);

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
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-muted-foreground">Secure communication with your {role === 'attorney' ? 'clients' : 'attorney'}</p>
            </div>
          </div>

          {conversations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
                <p className="text-muted-foreground">
                  {role === 'attorney' 
                    ? 'Purchase a case to start messaging with clients' 
                    : 'Submit a case and connect with an attorney to start messaging'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <Card
                  key={conversation.lead_id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
                  onClick={() => navigate(`/conversation/${conversation.lead_id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{conversation.case_title}</CardTitle>
                          {conversation.unread_count > 0 && (
                            <Badge variant="destructive" className="rounded-full">
                              {conversation.unread_count}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="mt-1">
                          with {conversation.other_party_name}
                        </CardDescription>
                      </div>
                      <Button>View</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {conversation.last_message}
                    </p>
                    {conversation.last_message_time && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(conversation.last_message_time).toLocaleString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
