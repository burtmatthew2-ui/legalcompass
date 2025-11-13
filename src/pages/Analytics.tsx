import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { LawyerAnalytics } from "@/components/LawyerAnalytics";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [lawyerId, setLawyerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check if user is a verified lawyer
    const { data: lawyerProfile } = await supabase
      .from('lawyer_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!lawyerProfile || !lawyerProfile.verified_status) {
      navigate('/lawyer-dashboard');
      return;
    }

    setLawyerId(user.id);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Analytics - Legal Compass</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate('/lawyer-dashboard')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="w-8 h-8" />
            Practice Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your performance and case insights
          </p>
        </div>

        {lawyerId && <LawyerAnalytics lawyerId={lawyerId} />}
      </div>
    </>
  );
};

export default AnalyticsPage;