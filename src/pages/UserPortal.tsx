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
import { Loader2, Download, CheckCircle, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { useSubscription } from "@/hooks/useSubscription";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";
import ReactMarkdown from "react-markdown";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const LEGAL_CATEGORIES = [
  { value: "traffic", label: "Traffic Court" },
  { value: "misdemeanor", label: "Misdemeanor Offenses" },
  { value: "felony", label: "Felony Cases" },
  { value: "family", label: "Family Law" },
  { value: "business", label: "Business Matters" },
  { value: "real-estate", label: "Real Estate" },
  { value: "employment", label: "Employment Law" },
  { value: "personal-injury", label: "Personal Injury" },
  { value: "other", label: "Other (Describe Below)" }
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
  const [step, setStep] = useState<"category" | "questionnaire" | "summary" | "submitted">("category");
  const [aiSummary, setAiSummary] = useState("");
  const [caseId, setCaseId] = useState("");
  
  const [formData, setFormData] = useState({
    category: "",
    otherDescription: "",
    state: "",
    description: "",
    urgencyLevel: ""
  });

  const handleCategoryNext = () => {
    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a legal category",
        variant: "destructive"
      });
      return;
    }
    if (formData.category === "other" && !formData.otherDescription.trim()) {
      toast({
        title: "Description required",
        description: "Please briefly describe your issue",
        variant: "destructive"
      });
      return;
    }
    setStep("questionnaire");
  };

  const handleQuestionnaireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to continue",
          variant: "destructive"
        });
        navigate("/auth");
        return;
      }

      // Generate AI summary
      const categoryLabel = LEGAL_CATEGORIES.find(c => c.value === formData.category)?.label || formData.category;
      const prompt = `You are COMPASS, a trusted legal advisor. A client has submitted a legal matter. Provide a brief summary (200-300 words) covering:

1. Issue Analysis: What this case appears to involve
2. Possible Outcomes: 2-3 realistic scenarios (best case, most likely, worst case)
3. Next Steps: What the client should do immediately
4. Important Considerations: Key legal points they should know

Category: ${categoryLabel}
${formData.category === "other" ? `Type: ${formData.otherDescription}` : ""}
State: ${formData.state}
Urgency: ${formData.urgencyLevel}
Description: ${formData.description}

Format the response in a warm, professional tone. End with: "Would you like me to connect you with a verified attorney in our network who can help with your case?"`;

      const { data: aiData, error: aiError } = await supabase.functions.invoke("legal-research", {
        body: {
          messages: [
            { role: "user", content: prompt }
          ]
        }
      });

      if (aiError) throw aiError;

      // Stream the response
      const reader = aiData.body.getReader();
      const decoder = new TextDecoder();
      let summary = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                summary += content;
                setAiSummary(summary);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      setStep("summary");
    } catch (error: any) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error",
        description: "Failed to generate case summary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFindAttorney = async () => {
    // Check if user has premium subscription
    if (!subscription?.subscribed && !subLoading) {
      setShowSubscriptionDialog(true);
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const categoryLabel = LEGAL_CATEGORIES.find(c => c.value === formData.category)?.label || formData.category;
      const legalTopic = formData.category === "other" ? formData.otherDescription : categoryLabel;

      const { data, error } = await supabase
        .from("legal_cases")
        .insert({
          user_id: user.id,
          state: formData.state,
          legal_topic: legalTopic,
          description: formData.description,
          urgency_level: formData.urgencyLevel,
          status: "open",
          snapshot_brief: aiSummary
        })
        .select()
        .single();

      if (error) throw error;

      setCaseId(data.id);
      setStep("submitted");

      toast({
        title: "Connected to attorney network!",
        description: "Verified lawyers can now view your case."
      });

      // Notify matching lawyers
      try {
        await supabase.functions.invoke("notify-new-lead", {
          body: { caseId: data.id }
        });
      } catch (notifyError) {
        console.error("Failed to notify lawyers:", notifyError);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === "submitted") {
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
              <CardTitle className="text-2xl text-center">Case Submitted Successfully!</CardTitle>
              <CardDescription className="text-center">
                You're now connected to our network of verified attorneys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg border border-border">
                <p className="text-center mb-4">
                  Verified lawyers in <span className="font-semibold">{formData.state}</span> can now review your case.
                  You'll be notified when an attorney accepts your case and you'll gain access to:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Secure messaging with your attorney
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Document upload and management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Case progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Calendar integration for court dates
                  </li>
                </ul>
              </div>
              
              <Button onClick={() => navigate("/dashboard")} className="w-full" size="lg">
                Go to My Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (step === "category") {
    return (
      <>
        <Helmet>
          <title>Get Legal Help - Legal Compass</title>
        </Helmet>
        
        <div className="min-h-screen bg-background p-4 flex items-center justify-center">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="text-2xl">What Legal Matter Do You Need Help With?</CardTitle>
              <CardDescription>
                Select the category that best describes your situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Legal Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEGAL_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.category === "other" && (
                <div className="space-y-2">
                  <Label htmlFor="otherDescription">Briefly Describe Your Issue</Label>
                  <Textarea
                    id="otherDescription"
                    placeholder="E.g., Intellectual property dispute, contract review, etc."
                    value={formData.otherDescription}
                    onChange={(e) => setFormData({ ...formData, otherDescription: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
              )}

              <Button onClick={handleCategoryNext} className="w-full" size="lg">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (step === "questionnaire") {
    return (
      <>
        <Helmet>
          <title>Case Details - Legal Compass</title>
        </Helmet>

        <div className="min-h-screen bg-background p-4">
          <div className="max-w-2xl mx-auto py-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tell Us About Your Case</CardTitle>
                <CardDescription>
                  Our AI will analyze your situation and provide a personalized assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuestionnaireSubmit} className="space-y-6">
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
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your legal situation in detail. Include relevant dates, parties involved, and any actions already taken..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[200px]"
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

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("category")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" size="lg" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Get AI Assessment"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  if (step === "summary") {
    return (
      <>
        <Helmet>
          <title>Case Assessment - Legal Compass</title>
        </Helmet>
        
        <div className="min-h-screen bg-background p-4">
          <div className="max-w-3xl mx-auto py-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Case Assessment</CardTitle>
                <CardDescription>
                  AI-powered analysis of your legal situation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none bg-muted/50 p-6 rounded-lg border border-border">
                  <ReactMarkdown>{aiSummary}</ReactMarkdown>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">Connect With a Verified Attorney</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on your case details, we can connect you with verified attorneys in {formData.state} who specialize in this area.
                    They'll have full access to your case summary and can provide personalized legal guidance.
                  </p>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                      className="flex-1"
                    >
                      Review Later
                    </Button>
                    <Button
                      onClick={handleFindAttorney}
                      disabled={loading}
                      className="flex-1"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        "Find Me an Attorney"
                      )}
                    </Button>
                  </div>
                </div>
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
  }

  return null;
};

export default UserPortal;
