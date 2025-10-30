import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Users, Mail, CheckCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { LeadFinder } from "@/components/LeadFinder";

interface UserEmail {
  email: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState<UserEmail[]>([]);
  const [copied, setCopied] = useState(false);

  // NOTE: This client-side admin check is for UI purposes only.
  // All sensitive operations (lead-finder, list-users) are protected by 
  // server-side admin validation in their respective edge functions.
  // This prevents the UI from being displayed to non-admins, but security
  // is enforced at the backend level.
  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleData) {
        toast.error("Access denied - Admin only");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      loadUserEmails();
    } catch (error) {
      console.error("Admin check error:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadUserEmails = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('list-users');

      if (error) throw error;
      
      setEmails(data?.users || []);
    } catch (error) {
      console.error("Error loading emails:", error);
      toast.error("Failed to load user emails");
    }
  };

  const copyAllEmails = () => {
    const emailList = emails.map(e => e.email).join(', ');
    navigator.clipboard.writeText(emailList);
    setCopied(true);
    toast.success(`Copied ${emails.length} emails to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--gradient-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-[var(--gradient-primary)]">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage user emails for outreach</p>
          </div>
        </div>

        <Tabs defaultValue="existing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Existing Users
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find New Leads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="existing">
            <Card className="bg-card/90 backdrop-blur-xl border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Active User Emails
                    </CardTitle>
                    <CardDescription>
                      {emails.length} registered users
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={copyAllEmails}
                    className="bg-[var(--gradient-accent)] hover:opacity-90"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All Emails
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3">
                    {emails.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">{user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Joined {new Date(user.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyEmail(user.email)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-xl border-border/50 mt-6">
              <CardHeader>
                <CardTitle>Cold Email Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>✅ Personalize each email - mention specific legal topics</p>
                <p>✅ Keep it concise - 3-4 sentences max</p>
                <p>✅ Include clear value proposition</p>
                <p>✅ Use a professional email service (not Gmail)</p>
                <p>✅ Follow CAN-SPAM Act requirements</p>
                <p>⚠️ Don't spam - space out emails over time</p>
                <p>⚠️ Always include an unsubscribe option</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <LeadFinder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
