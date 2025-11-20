import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SecureChat } from "@/components/messaging/SecureChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClientCaseView() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [caseData, setCaseData] = useState<any>(null);
  const [lawyerData, setLawyerData] = useState<any>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    loadCaseData();
  }, [leadId]);

  const loadCaseData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUserId(user.id);

      // Load case details
      const { data: caseInfo, error: caseError } = await supabase
        .from('legal_cases')
        .select('*')
        .eq('id', leadId)
        .eq('user_id', user.id)
        .single();

      if (caseError) throw caseError;
      setCaseData(caseInfo);

      // Load lawyer info if case is accepted
      const { data: purchase } = await supabase
        .from('lead_purchases')
        .select('lawyer_id')
        .eq('lead_id', leadId)
        .single();

      if (purchase) {
        const { data: lawyer } = await supabase
          .from('lawyer_profiles')
          .select('full_name, email, profile_image_url, bio')
          .eq('user_id', purchase.lawyer_id)
          .single();

        setLawyerData(lawyer);
      }
    } catch (error: any) {
      toast({
        title: "Error loading case",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8">
          <p>Case not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/client-dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Case Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Legal Topic</p>
                  <p className="font-semibold">{caseData.legal_topic}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-semibold">{caseData.state}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Urgency</p>
                  <Badge variant={caseData.urgency_level === 'high' ? 'destructive' : 'secondary'}>
                    {caseData.urgency_level}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge>{caseData.status}</Badge>
                </div>
              </CardContent>
            </Card>

            {lawyerData && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Attorney</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    {lawyerData.profile_image_url ? (
                      <img 
                        src={lawyerData.profile_image_url} 
                        alt={lawyerData.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">
                          {lawyerData.full_name?.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{lawyerData.full_name}</p>
                      <p className="text-sm text-muted-foreground">{lawyerData.email}</p>
                    </div>
                  </div>
                  {lawyerData.bio && (
                    <p className="text-sm text-muted-foreground">{lawyerData.bio}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="md:col-span-2">
            {lawyerData ? (
              <SecureChat
                leadId={leadId!}
                userType="client"
                userId={userId}
                otherPartyName={lawyerData.full_name}
              />
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Waiting for an attorney to accept your case...
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
