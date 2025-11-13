import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { useSubscription } from "@/hooks/useSubscription";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const LEGAL_TOPICS = [
  "Family Law", "Criminal Defense", "Personal Injury", "Employment Law", "Real Estate",
  "Business Law", "Estate Planning", "Immigration", "Bankruptcy", "Civil Rights", "Other"
];

const URGENCY_LEVELS = [
  { value: "low", label: "Low - General guidance needed" },
  { value: "medium", label: "Medium - Need help within a few weeks" },
  { value: "high", label: "High - Urgent matter, need immediate assistance" }
];

const UserPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscription, loading: subLoading } = useSubscription();
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caseSubmitted, setCaseSubmitted] = useState(false);
  const [snapshotBrief, setSnapshotBrief] = useState("");
  const [caseId, setCaseId] = useState("");
  
  const [formData, setFormData] = useState({
    state: "",
    legalTopic: "",
    description: "",
    urgencyLevel: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has premium subscription
    if (!subscription?.subscribed && !subLoading) {
      setShowSubscriptionDialog(true);
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to submit a case",
          variant: "destructive"
        });
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("legal_cases")
        .insert({
          user_id: user.id,
          state: formData.state,
          legal_topic: formData.legalTopic,
          description: formData.description,
          urgency_level: formData.urgencyLevel,
          status: "open",
          snapshot_brief: `Legal Matter Summary\n\nState: ${formData.state}\nTopic: ${formData.legalTopic}\nUrgency: ${formData.urgencyLevel}\n\nDescription:\n${formData.description}\n\nThis case is now available to verified lawyers in your area.`
        })
        .select()
        .single();

      if (error) throw error;

      setSnapshotBrief(data.snapshot_brief);
      setCaseId(data.id);
      setCaseSubmitted(true);

      toast({
        title: "Case submitted successfully!",
        description: "Your Snapshot Brief has been created and is now visible to verified lawyers."
      });

      // Notify matching lawyers
      try {
        await supabase.functions.invoke("notify-new-lead", {
          body: { caseId: data.id }
        });
      } catch (notifyError) {
        console.error("Failed to notify lawyers:", notifyError);
        // Don't show error to user - this is background notification
      }
    } catch (error: any) {
      toast({
        title: "Error submitting case",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([snapshotBrief], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snapshot-brief-${caseId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (caseSubmitted) {
    return (
      <>
        <Helmet>
          <title>Case Submitted - Legal Compass</title>
        </Helmet>
        
        <div className="min-h-screen bg-background p-4 flex items-center justify-center">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-center">Your Case Has Been Submitted!</CardTitle>
              <CardDescription className="text-center">
                Verified lawyers in {formData.state} can now view your case details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Your Snapshot Brief:</h3>
                <pre className="whitespace-pre-wrap text-sm">{snapshotBrief}</pre>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleDownload} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download My Snapshot
                </Button>
                <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex-1">
                  View My Cases
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Submit Your Case - Legal Compass</title>
        <meta name="description" content="Submit your legal case details and receive a personalized Snapshot Brief to share with verified lawyers." />
      </Helmet>

      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Submit Your Legal Case</CardTitle>
              <CardDescription>
                Fill out the form below to receive your personalized Snapshot Brief
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                    required
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legalTopic">Legal Topic</Label>
                  <Select
                    value={formData.legalTopic}
                    onValueChange={(value) => setFormData({ ...formData, legalTopic: value })}
                    required
                  >
                    <SelectTrigger id="legalTopic">
                      <SelectValue placeholder="Select legal topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEGAL_TOPICS.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Case Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your legal situation in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select
                    value={formData.urgencyLevel}
                    onValueChange={(value) => setFormData({ ...formData, urgencyLevel: value })}
                    required
                  >
                    <SelectTrigger id="urgency">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      {URGENCY_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Case & Get Snapshot Brief"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <SubscriptionDialog 
        open={showSubscriptionDialog} 
        onOpenChange={setShowSubscriptionDialog}
      />
    </>
  );
};

export default UserPortal;
