import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { MessageSquare, FileText } from "lucide-react";

interface ClientCase {
  id: string;
  legal_topic: string;
  state: string;
  urgency_level: string;
  description: string;
  status: string;
  created_at: string;
  has_lawyer: boolean;
  unread_messages: number;
}

const ClientCaseView = () => {
  const [cases, setCases] = useState<ClientCase[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load user's cases
      const { data: userCases, error } = await supabase
        .from('legal_cases')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Check which cases have been purchased (have a lawyer)
      const casesWithStatus = await Promise.all(
        (userCases || []).map(async (caseItem) => {
          const { data: purchase } = await supabase
            .from('lead_purchases')
            .select('id')
            .eq('lead_id', caseItem.id)
            .maybeSingle();

          // Count unread messages (simplified - in production you'd track read status)
          const { count } = await supabase
            .from('case_messages')
            .select('*', { count: 'exact', head: true })
            .eq('lead_id', caseItem.id)
            .eq('sender_type', 'lawyer');

          return {
            ...caseItem,
            has_lawyer: !!purchase,
            unread_messages: count || 0
          };
        })
      );

      setCases(casesWithStatus);
    } catch (error: any) {
      console.error('Error loading cases:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading your cases...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Cases</h2>
        <Button onClick={() => navigate('/user-portal')}>
          Start New Case
        </Button>
      </div>

      {cases.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-muted-foreground">
              No cases yet. Start by submitting your legal situation.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {cases.map((caseItem) => (
            <Card key={caseItem.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{caseItem.legal_topic}</span>
                  <div className="flex gap-2">
                    <Badge>{caseItem.state}</Badge>
                    {caseItem.has_lawyer && (
                      <Badge variant="secondary">Lawyer Assigned</Badge>
                    )}
                  </div>
                </CardTitle>
                <CardDescription>
                  Submitted {new Date(caseItem.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {caseItem.description.substring(0, 150)}...
                  </p>

                  <div className="flex gap-2">
                    <Badge variant="outline">
                      {caseItem.urgency_level} urgency
                    </Badge>
                    <Badge variant="outline">
                      Status: {caseItem.status}
                    </Badge>
                  </div>

                  {caseItem.has_lawyer && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="default"
                        onClick={() => navigate(`/case/${caseItem.id}`)}
                        className="flex-1"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Messages
                        {caseItem.unread_messages > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {caseItem.unread_messages}
                          </Badge>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/case/${caseItem.id}?tab=documents`)}
                        className="flex-1"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Documents
                      </Button>
                    </div>
                  )}

                  {!caseItem.has_lawyer && (
                    <p className="text-sm text-muted-foreground italic">
                      Waiting for a verified lawyer to accept your case...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientCaseView;
