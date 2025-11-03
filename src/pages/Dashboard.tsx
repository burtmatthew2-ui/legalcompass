import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare, BookOpen, CreditCard, Shield, FileText, LogOut, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdminStatus();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-white">
      <Navbar />
      
      <div className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome Back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
            </h1>
            <p className="text-lg text-slate-600">
              Choose where you'd like to go
            </p>
          </div>

          {/* Main Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
              onClick={() => navigate("/?chat=true")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Legal Research Chat</CardTitle>
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
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
              onClick={() => navigate("/resources")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Legal Resources</CardTitle>
                <CardDescription className="text-base">
                  Browse articles and guides on common legal topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                  View Resources
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
              onClick={() => navigate("/pricing")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Subscription & Pricing</CardTitle>
                <CardDescription className="text-base">
                  View plans and manage your subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Pricing
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
              onClick={() => navigate("/support")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Support</CardTitle>
                <CardDescription className="text-base">
                  Get help with your account or technical issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Links */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 p-6 h-auto"
              onClick={() => navigate("/security")}
            >
              <Shield className="w-5 h-5" />
              <span>Security & Privacy</span>
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2 p-6 h-auto"
              onClick={() => navigate("/bookmarks")}
            >
              <FileText className="w-5 h-5" />
              <span>Bookmarks</span>
            </Button>

            {isAdmin && (
              <Button
                variant="outline"
                className="flex items-center gap-2 p-6 h-auto"
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
              className="border-slate-300 hover:bg-slate-50"
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
