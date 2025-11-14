import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut,
  DollarSign,
  Calendar
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";
import type { User } from "@/types/user";

const AttorneyDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

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

  const attorneyMenuItems = [
    { title: "Dashboard", icon: Briefcase, path: "/attorney-dashboard" },
    { title: "Available Leads", icon: Users, path: "/lawyer-dashboard" },
    { title: "My Cases", icon: FileText, path: "/case-management" },
    { title: "Analytics", icon: BarChart3, path: "/analytics" },
    { title: "Billing", icon: DollarSign, path: "/user-portal" },
    { title: "Calendar", icon: Calendar, path: "/calendar" },
    { title: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-primary">Attorney Portal</h2>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {attorneyMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={() => navigate(item.path)}>
                        <item.icon className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
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
                  Welcome Back, {user?.email?.split('@')[0] || 'Attorney'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your practice and connect with clients
                </p>
              </div>
              <SidebarTrigger />
            </div>

            {/* Getting Started Guide */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">Getting Started</CardTitle>
                <CardDescription>
                  Here's how to make the most of your attorney portal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="font-semibold">Browse Available Leads</h3>
                    <p className="text-sm text-muted-foreground">
                      Review potential clients that match your practice areas and license
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="font-semibold">Purchase & Connect</h3>
                    <p className="text-sm text-muted-foreground">
                      Buy leads that interest you and start communicating with clients
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="font-semibold">Manage Your Cases</h3>
                    <p className="text-sm text-muted-foreground">
                      Track progress, share documents, and schedule meetings with clients
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
                onClick={() => navigate("/lawyer-dashboard")}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Available Leads</CardTitle>
                  <CardDescription>
                    Browse and purchase new client leads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Leads</Button>
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
                    Manage active client cases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Cases</Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
                onClick={() => navigate("/analytics")}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    View your performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Analytics</Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary"
                onClick={() => navigate("/user-portal")}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Billing</CardTitle>
                  <CardDescription>
                    Manage payments and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Billing</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AttorneyDashboard;
