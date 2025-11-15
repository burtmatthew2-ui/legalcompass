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

  const handlePurchaseLead = async (leadId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke("purchase-lead", {
        body: { leadId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to checkout",
          description: "Complete your payment to access the full lead details"
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
              <TabsTrigger value="purchased">My Cases</TabsTrigger>
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
                    
                    return (
                    <Card key={lead.id} className={isPurchased ? "border-green-500/50" : ""}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{lead.legal_topic}</CardTitle>
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
                          <p className="text-xs text-amber-600 mb-3 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                            Purchase to view client contact info and respond
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-primary">$35</div>
                            <Button 
                              onClick={() => handlePurchaseLead(lead.id)} 
                              disabled={loading || isPurchased}
                              variant={isPurchased ? "outline" : "default"}
                            >
                              {isPurchased ? "Already Purchased" : loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                "Purchase for $35"
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

            <TabsContent value="purchased" className="space-y-4">
              <div className="grid gap-4">
                {purchasedLeads.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">
                        You haven't purchased any leads yet
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  purchasedLeads.map((lead) => (
                    <Card key={lead.id}>
                      <CardHeader>
                        <CardTitle className="text-xl">{lead.legal_topic}</CardTitle>
                        <CardDescription>
                          {lead.state} • Purchased {new Date(lead.created_at).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Full Case Details:</h4>
                          <pre className="whitespace-pre-wrap text-sm">{lead.snapshot_brief}</pre>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => window.location.href = `/case/${lead.id}`}
                        >
                          Manage Case
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
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
