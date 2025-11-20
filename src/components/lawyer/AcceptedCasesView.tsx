import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface AcceptedCase {
  id: string;
  legal_topic: string;
  state: string;
  urgency_level: string;
  status: string;
  created_at: string;
  client_email: string;
  unread_messages: number;
}

export const AcceptedCasesView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cases, setCases] = useState<AcceptedCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAcceptedCases();
    setupRealtimeSubscription();
  }, []);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('accepted-cases-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'case_messages'
        },
        () => {
          loadAcceptedCases();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const loadAcceptedCases = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get purchased leads
      const { data: purchases, error: purchasesError } = await supabase
        .from('lead_purchases')
        .select('lead_id')
        .eq('lawyer_id', user.id);

      if (purchasesError) throw purchasesError;

      if (!purchases || purchases.length === 0) {
        setCases([]);
        setLoading(false);
        return;
      }

      const leadIds = purchases.map(p => p.lead_id);

      // Get case details
      const { data: casesData, error: casesError } = await supabase
        .from('legal_cases')
        .select(`
          id,
          legal_topic,
          state,
          urgency_level,
          status,
          created_at,
          user_id
        `)
        .in('id', leadIds)
        .order('created_at', { ascending: false });

      if (casesError) throw casesError;

      // Get client emails and unread counts
      const enrichedCases = await Promise.all(
        (casesData || []).map(async (caseItem) => {
          // Get client email
          const { data: profile } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', caseItem.user_id)
            .single();

          // Get unread messages count
          const { count } = await supabase
            .from('case_messages')
            .select('*', { count: 'exact', head: true })
            .eq('lead_id', caseItem.id)
            .eq('sender_type', 'client')
            .eq('read_by_lawyer', false);

          return {
            ...caseItem,
            client_email: profile?.email || 'Unknown',
            unread_messages: count || 0
          };
        })
      );

      setCases(enrichedCases);
    } catch (error: any) {
      toast({
        title: "Error loading cases",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No accepted cases yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {cases.map((caseItem) => (
        <Card key={caseItem.id} className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{caseItem.legal_topic}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Client: {caseItem.client_email}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={caseItem.urgency_level === 'high' ? 'destructive' : 'secondary'}>
                  {caseItem.urgency_level} priority
                </Badge>
                <Badge>{caseItem.status}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Accepted {format(new Date(caseItem.created_at), 'MMM d, yyyy')}
                </p>
                <p className="text-sm">
                  <FileText className="w-3 h-3 inline mr-1" />
                  State: {caseItem.state}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/case/${caseItem.id}`)}
                  className="gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Manage Case
                  {caseItem.unread_messages > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {caseItem.unread_messages}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
