import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CaseProgressTracker } from "@/components/CaseProgressTracker";

interface ClientCase {
  id: string;
  legal_topic: string;
  state: string;
  urgency_level: string;
  status: 'submitted' | 'accepted' | 'resolved' | 'open' | 'closed';
  created_at: string;
  lawyer_name?: string;
  unread_messages: number;
}

export const MyCasesView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cases, setCases] = useState<ClientCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyCases();
    setupRealtimeSubscription();
  }, []);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('client-cases-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'case_messages'
        },
        () => {
          loadMyCases();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const loadMyCases = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's cases
      const { data: casesData, error: casesError } = await supabase
        .from('legal_cases')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (casesError) throw casesError;

      // Enrich with lawyer info and unread messages
      const enrichedCases = await Promise.all(
        (casesData || []).map(async (caseItem) => {
          // Check if case is accepted by a lawyer
          const { data: purchase } = await supabase
            .from('lead_purchases')
            .select('lawyer_id')
            .eq('lead_id', caseItem.id)
            .single();

          let lawyerName = undefined;
          if (purchase) {
            const { data: lawyer } = await supabase
              .from('lawyer_profiles')
              .select('full_name')
              .eq('user_id', purchase.lawyer_id)
              .single();
            
            lawyerName = lawyer?.full_name;
          }

          // Get unread messages count
          const { count } = await supabase
            .from('case_messages')
            .select('*', { count: 'exact', head: true })
            .eq('lead_id', caseItem.id)
            .eq('sender_type', 'lawyer')
            .eq('read_by_client', false);

          return {
            id: caseItem.id,
            legal_topic: caseItem.legal_topic,
            state: caseItem.state,
            urgency_level: caseItem.urgency_level,
            status: caseItem.status as 'submitted' | 'accepted' | 'resolved' | 'open' | 'closed',
            created_at: caseItem.created_at,
            lawyer_name: lawyerName,
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
        <CardContent className="p-8 text-center space-y-4">
          <p className="text-muted-foreground">You haven't submitted any cases yet</p>
          <Button onClick={() => navigate('/user-portal')}>
            Submit Your First Case
          </Button>
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
              <div className="space-y-2 flex-1">
                <CardTitle className="text-lg">{caseItem.legal_topic}</CardTitle>
                <CaseProgressTracker status={caseItem.status} />
                {caseItem.lawyer_name && (
                  <p className="text-sm text-muted-foreground">
                    Attorney: {caseItem.lawyer_name}
                  </p>
                )}
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
                  Submitted {format(new Date(caseItem.created_at), 'MMM d, yyyy')}
                </p>
                <p className="text-sm">
                  <FileText className="w-3 h-3 inline mr-1" />
                  State: {caseItem.state}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/case-view/${caseItem.id}`)}
                  className="gap-2"
                  variant={caseItem.unread_messages > 0 ? "default" : "outline"}
                >
                  <MessageSquare className="w-4 h-4" />
                  View Case
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
