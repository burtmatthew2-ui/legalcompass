import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  FileText, 
  Search, 
  BookOpen,
  Settings,
  LogOut,
  Scale,
  Mail
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const { unreadCount } = useUnreadMessages();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const clientMenuItems = [
    { title: "Dashboard", icon: MessageSquare, path: "/client-dashboard" },
    { title: "Chat with AI", icon: MessageSquare, path: "/?chat=true" },
    { title: "Messages", icon: Mail, path: "/messages", badge: unreadCount > 0 ? unreadCount : undefined },
    { title: "Find Attorney", icon: Search, path: "/user-portal" },
    { title: "My Cases", icon: FileText, path: "/case-management" },
    { title: "Resources", icon: BookOpen, path: "/resources" },
    { title: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-primary">Client Portal</h2>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {clientMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={() => navigate(item.path)} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <item.icon className="h-4 w-4 mr-2" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-auto rounded-full">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Sign Out</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  Welcome, {user?.email?.split('@')[0] || 'User'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  Your legal support platform
                </p>
              </div>
              <SidebarTrigger />
            </div>

            {/* Getting Started Guide */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">How It Works</CardTitle>
                <CardDescription>
                  Get the legal help you need in three simple steps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="font-semibold">Ask AI or Browse Resources</h3>
                    <p className="text-sm text-muted-foreground">
                      Get instant answers from our AI or explore our legal resource library
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="font-semibold">Connect with an Attorney</h3>
                    <p className="text-sm text-muted-foreground">
                      Need personalized help? We'll match you with qualified attorneys
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="font-semibold">Track Your Case</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage documents, messages, and deadlines all in one place
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
                onClick={() => navigate("/?chat=true")}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Chat with AI</CardTitle>
                  <CardDescription>
                    Get instant legal guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
                onClick={() => navigate("/user-portal")}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Find Attorney</CardTitle>
                  <CardDescription>
                    Connect with qualified lawyers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
                onClick={() => navigate("/case-management")}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>My Cases</CardTitle>
                  <CardDescription>
                    View and manage your cases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Cases</Button>
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
                  <CardTitle>Legal Resources</CardTitle>
                  <CardDescription>
                    Free guides and templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Browse</Button>
                </CardContent>
              </Card>
            </div>

            {/* Legal Notice */}
            <Card className="border-2 border-amber-200 bg-amber-50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Scale className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <CardTitle className="text-amber-900">Important Legal Notice</CardTitle>
                    <CardDescription className="text-amber-800 mt-2">
                      This platform provides legal information and connects you with attorneys. 
                      <strong className="font-semibold"> This is not a substitute for personalized legal advice.</strong> Always 
                      consult with a licensed attorney for specific legal guidance.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ClientDashboard;
