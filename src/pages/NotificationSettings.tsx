import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, MessageSquare, AlertCircle, Calendar, Briefcase, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    sms_notifications: false,
    phone_number: "",
    notify_new_messages: true,
    notify_case_updates: true,
    notify_deadlines: true,
    notify_new_leads: true,
    notify_case_accepted: true,
    deadline_reminder_timing: "2_days",
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPreferences({
          email_notifications: data.email_notifications,
          sms_notifications: data.sms_notifications,
          phone_number: data.phone_number || "",
          notify_new_messages: data.notify_new_messages,
          notify_case_updates: data.notify_case_updates,
          notify_deadlines: data.notify_deadlines,
          notify_new_leads: data.notify_new_leads,
          notify_case_accepted: data.notify_case_accepted,
          deadline_reminder_timing: data.deadline_reminder_timing,
        });
      }
    } catch (error: any) {
      console.error("Error loading preferences:", error);
      toast({
        title: "Error",
        description: "Failed to load notification preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("notification_preferences")
        .upsert({
          user_id: user.id,
          ...preferences,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Notification preferences saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save preferences",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Notification Settings - Legal Compass</title>
        <meta name="description" content="Manage your notification preferences for case updates, messages, and deadlines." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Bell className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Notification Center</span>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Notification Preferences
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose how and when you want to be notified about important updates
            </p>
          </div>

          <div className="space-y-6">
            {/* Communication Channels */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Communication Channels
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    id="email"
                    checked={preferences.email_notifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, email_notifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 opacity-50">
                  <div>
                    <Label htmlFor="sms" className="text-base font-medium">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via text message (Coming Soon)</p>
                  </div>
                  <Switch id="sms" disabled checked={false} />
                </div>
              </div>
            </Card>

            {/* Notification Types */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                What to Notify Me About
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <div>
                      <Label htmlFor="messages" className="text-base font-medium">New Messages</Label>
                      <p className="text-sm text-muted-foreground">When you receive a message from your lawyer or client</p>
                    </div>
                  </div>
                  <Switch
                    id="messages"
                    checked={preferences.notify_new_messages}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, notify_new_messages: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    <div>
                      <Label htmlFor="updates" className="text-base font-medium">Case Updates</Label>
                      <p className="text-sm text-muted-foreground">Status changes, new documents, and case progress</p>
                    </div>
                  </div>
                  <Switch
                    id="updates"
                    checked={preferences.notify_case_updates}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, notify_case_updates: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <div>
                      <Label htmlFor="deadlines" className="text-base font-medium">Deadline Reminders</Label>
                      <p className="text-sm text-muted-foreground">Important dates and filing deadlines</p>
                    </div>
                  </div>
                  <Switch
                    id="deadlines"
                    checked={preferences.notify_deadlines}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, notify_deadlines: checked })}
                  />
                </div>

                {preferences.notify_deadlines && (
                  <div className="ml-8 p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <Label htmlFor="timing" className="text-sm font-medium mb-2 block">
                      Remind me before deadline
                    </Label>
                    <Select
                      value={preferences.deadline_reminder_timing}
                      onValueChange={(value) => setPreferences({ ...preferences, deadline_reminder_timing: value })}
                    >
                      <SelectTrigger id="timing" className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1_day">1 day before</SelectItem>
                        <SelectItem value="2_days">2 days before</SelectItem>
                        <SelectItem value="3_days">3 days before</SelectItem>
                        <SelectItem value="1_week">1 week before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-green-600" />
                    <div>
                      <Label htmlFor="leads" className="text-base font-medium">New Leads (Lawyers Only)</Label>
                      <p className="text-sm text-muted-foreground">When new cases match your practice areas</p>
                    </div>
                  </div>
                  <Switch
                    id="leads"
                    checked={preferences.notify_new_leads}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, notify_new_leads: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    <div>
                      <Label htmlFor="accepted" className="text-base font-medium">Case Accepted</Label>
                      <p className="text-sm text-muted-foreground">When a lawyer accepts your case</p>
                    </div>
                  </div>
                  <Switch
                    id="accepted"
                    checked={preferences.notify_case_accepted}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, notify_case_accepted: checked })}
                  />
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex gap-4">
              <Button onClick={savePreferences} size="lg" className="flex-1" disabled={saving}>
                {saving ? "Saving..." : "Save Preferences"}
              </Button>
              <Button onClick={() => navigate(-1)} variant="outline" size="lg">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NotificationSettings;