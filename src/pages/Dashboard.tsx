import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare, BookOpen, CreditCard, Shield, FileText, LogOut, Settings, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import type { User } from "@/types/user";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdminStatus();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);

      // Check user role and redirect to appropriate dashboard
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (roleData?.role === "attorney") {
        navigate("/attorney-dashboard", { replace: true });
        return;
      } else if (roleData?.role === "client") {
        navigate("/client-dashboard", { replace: true });
        return;
      }

      // Fetch profile data
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, profile_completed")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setProfileName(profile.full_name);
        setProfileCompleted(profile.profile_completed || false);
      }

      setLoading(false);
    };

    checkUserRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (roleData?.role === "attorney") {
        navigate("/attorney-dashboard", { replace: true });
      } else if (roleData?.role === "client") {
        navigate("/client-dashboard", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="space-y-8">
          {/* Profile Completion Alert */}
          {!profileCompleted && (
            <Alert className="border-accent bg-accent/10">
              <AlertCircle className="h-4 w-4 text-accent" />
              <AlertTitle>Complete Your Profile</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>Get the most out of Legal Compass by completing your profile</span>
                <Button
                  onClick={() => navigate("/profile-settings")}
                  size="sm"
                  className="ml-4"
                >
                  Complete Profile
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Welcome Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome Back{profileName ? `, ${profileName}` : user?.email ? `, ${user.email.split('@')[0]}` : ''}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose where you'd like to go
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-accent/10 border-2 border-accent/20 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-accent-foreground mb-2">Important Legal Notice</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This platform provides legal information and research tools to help you understand legal issues. 
                  <strong className="font-semibold text-foreground"> This is not a substitute for a licensed attorney.</strong> For specific legal advice 
                  about your situation, always consult with a qualified lawyer in your jurisdiction.
                </p>
              </div>
            </div>
          </div>

          {/* Main Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary bg-card"
              onClick={() => navigate("/?chat=true")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-card-foreground">Legal Research Chat</CardTitle>
                <CardDescription className="text-base">
                  Ask questions and get AI-powered legal research assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Chat Session
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary bg-card"
              onClick={() => navigate("/resources")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-card-foreground">Legal Resources</CardTitle>
                <CardDescription className="text-base">
                  Browse articles and guides on common legal topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                  View Resources
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary bg-card"
              onClick={() => navigate("/pricing")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-card-foreground">Subscription & Pricing</CardTitle>
                <CardDescription className="text-base">
                  View plans and manage your subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                  View Pricing
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary bg-card"
              onClick={() => navigate("/support")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-card-foreground">Support</CardTitle>
                <CardDescription className="text-base">
                  Get help with your account or technical issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Links */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 p-6 h-auto border-primary text-primary hover:bg-primary hover:text-white font-semibold"
              onClick={() => navigate("/security")}
            >
              <Shield className="w-5 h-5" />
              <span>Security & Privacy</span>
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2 p-6 h-auto border-primary text-primary hover:bg-primary hover:text-white font-semibold"
              onClick={() => navigate("/bookmarks")}
            >
              <FileText className="w-5 h-5" />
              <span>Bookmarks</span>
            </Button>

            {isAdmin && (
              <Button
                variant="outline"
                className="flex items-center gap-2 p-6 h-auto border-primary text-primary hover:bg-primary hover:text-white font-semibold"
                onClick={() => navigate("/admin")}
              >
                <Settings className="w-5 h-5" />
                <span>Admin Dashboard</span>
              </Button>
            )}
          </div>

          {/* Sign Out Button */}
          <div className="flex justify-center pt-8">
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-border hover:bg-muted"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
