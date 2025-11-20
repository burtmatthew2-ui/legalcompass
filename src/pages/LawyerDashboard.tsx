import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, BarChart3 } from "lucide-react";
import { Helmet } from "react-helmet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TemplateManager } from "@/components/TemplateManager";
import { TeamManagement } from "@/components/TeamManagement";
import { LawyerProfileEditor } from "@/components/LawyerProfileEditor";
import { AcceptedCasesView } from "@/components/lawyer/AcceptedCasesView";

interface LawyerProfile {
  id: string;
  verified_status: boolean;
  full_name: string;
  states_licensed: string[];
  practice_areas: string[];
}

interface LegalCase {
  id: string;
  state: string;
  legal_topic: string;
  description: string;
  urgency_level: string;
  snapshot_brief: string;
  created_at: string;
  lead_temperature: string;
  last_activity_at: string;
}

const LawyerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<LawyerProfile | null>(null);
  const [availableLeads, setAvailableLeads] = useState<LegalCase[]>([]);
  const [purchasedLeads, setPurchasedLeads] = useState<LegalCase[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData, error: profileError } = await supabase
        .from("lawyer_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      if (profileData.verified_status) {
        const { data: casesData, error: casesError } = await supabase
          .from("legal_cases")
          .select("*")
          .eq("status", "open")
          .in("state", profileData.states_licensed)
          .in("legal_topic", profileData.practice_areas)
          .order("created_at", { ascending: false });

        if (casesError) throw casesError;
        setAvailableLeads(casesData || []);

        const { data: purchasesData, error: purchasesError } = await supabase
          .from("lead_purchases")
          .select("lead_id")
          .eq("lawyer_id", user.id);

        if (purchasesError) throw purchasesError;
        
        if (purchasesData && purchasesData.length > 0) {
          const purchasedIds = purchasesData.map(p => p.lead_id);
          const { data: purchasedCases, error: purchasedError } = await supabase
            .from("legal_cases")
            .select("*")
            .in("id", purchasedIds);

          if (purchasedError) throw purchasedError;
          setPurchasedLeads(purchasedCases || []);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error loading dashboard",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptLead = async (leadId: string) => {
    try {
      setLoading(true);
      // Pay only when accepting - not viewing
      const { data, error } = await supabase.functions.invoke("purchase-lead", {
        body: { leadId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Accept this case?",
          description: "Complete payment to officially accept and start working with this client"
        });
      }
    } catch (error: any) {
      toast({
        title: "Purchase failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No lawyer profile found. Please complete the signup process.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile.verified_status) {
    return (
      <>
        <Helmet>
          <title>Pending Verification - Lawyer Dashboard</title>
        </Helmet>
        
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Verification Pending</CardTitle>
              <CardDescription>
                Your application is currently under review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Thank you for applying to join Legal Compass. Our team is reviewing your credentials. 
                  You'll receive an email notification once your profile is verified.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Lawyer Dashboard - Legal Compass</title>
      </Helmet>

      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {profile.full_name}</h1>
              <p className="text-muted-foreground">Manage your leads and profile</p>
            </div>
            <Button onClick={() => navigate('/analytics')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>

          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full max-w-4xl grid-cols-5">
              <TabsTrigger value="available">Available Leads</TabsTrigger>
              <TabsTrigger value="cases">My Cases</TabsTrigger>
              <TabsTrigger value="profile">My Profile</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4">
              <div className="grid gap-4">
                {availableLeads.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">
                        No available leads matching your practice areas at this time
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  availableLeads.map((lead) => {
                    const isPurchased = purchasedLeads.some(p => p.id === lead.id);
                    const temperatureColors = {
                      warm: "bg-red-500",
                      cooling: "bg-yellow-500",
                      cold: "bg-blue-500"
                    };
                    
                    return (
                    <Card key={lead.id} className={isPurchased ? "border-green-500/50" : ""}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-xl">{lead.legal_topic}</CardTitle>
                              <div className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${temperatureColors[lead.lead_temperature as keyof typeof temperatureColors]}`} />
                                <span className="text-xs font-medium capitalize">{lead.lead_temperature}</span>
                              </div>
                            </div>
                            <CardDescription>
                              {lead.state} • {new Date(lead.created_at).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={lead.urgency_level === "high" ? "destructive" : "secondary"}>
                              {lead.urgency_level} urgency
                            </Badge>
                            {isPurchased && <Badge variant="outline" className="bg-green-500/10 text-green-600">Purchased</Badge>}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Legal Issue:</p>
                          <p className="text-sm text-muted-foreground">{lead.description}</p>
                        </div>
                        {lead.snapshot_brief && (
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <p className="text-xs font-medium mb-1">AI Brief Preview:</p>
                            <p className="text-xs text-muted-foreground line-clamp-3">{lead.snapshot_brief}</p>
                          </div>
                        )}
                        <div className="border-t pt-3">
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-primary">$50-90</div>
                            <Button 
                              onClick={() => handleAcceptLead(lead.id)} 
                              disabled={loading || isPurchased}
                              variant={isPurchased ? "outline" : "default"}
                            >
                              {isPurchased ? "Already Accepted" : loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                "Accept & Begin ($50-90)"
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )})
                )}
              </div>
            </TabsContent>

            <TabsContent value="cases" className="space-y-4">
              <AcceptedCasesView />
            </TabsContent>

            <TabsContent value="profile">
              <LawyerProfileEditor />
            </TabsContent>

            <TabsContent value="templates">
              <TemplateManager />
            </TabsContent>

            <TabsContent value="team">
              <TeamManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default LawyerDashboard;
