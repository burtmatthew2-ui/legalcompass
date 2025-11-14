import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const PRACTICE_AREAS = [
  "Family Law", "Criminal Defense", "Personal Injury", "Employment Law", "Real Estate",
  "Business Law", "Estate Planning", "Immigration", "Bankruptcy", "Civil Rights"
];

const LawyerSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    statesLicensed: [] as string[],
    barNumber: "",
    practiceAreas: [] as string[],
    bio: ""
  });

  const toggleState = (state: string) => {
    setFormData(prev => ({
      ...prev,
      statesLicensed: prev.statesLicensed.includes(state)
        ? prev.statesLicensed.filter(s => s !== state)
        : [...prev.statesLicensed, state]
    }));
  };

  const togglePracticeArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      practiceAreas: prev.practiceAreas.includes(area)
        ? prev.practiceAreas.filter(a => a !== area)
        : [...prev.practiceAreas, area]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirmed) {
      toast({
        title: "Confirmation required",
        description: "Please confirm that all information is accurate",
        variant: "destructive"
      });
      return;
    }

    if (formData.statesLicensed.length === 0) {
      toast({
        title: "States required",
        description: "Please select at least one state where you are licensed",
        variant: "destructive"
      });
      return;
    }

    if (formData.practiceAreas.length === 0) {
      toast({
        title: "Practice areas required",
        description: "Please select at least one practice area",
        variant: "destructive"
      });
      return;
    }

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

      const { data: profileData, error } = await supabase
        .from("lawyer_profiles")
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          states_licensed: formData.statesLicensed,
          bar_number: formData.barNumber,
          practice_areas: formData.practiceAreas,
          bio: formData.bio,
        verified_status: false
      })
      .select()
      .maybeSingle();

      if (error) throw error;

      // Trigger AI verification
      toast({
        title: "Verifying credentials...",
        description: "Our AI is checking your bar credentials"
      });

      const { data: verificationData, error: verifyError } = await supabase.functions.invoke(
        'verify-lawyer',
        {
          body: { lawyerId: profileData.id }
        }
      );

      if (verifyError) {
        console.error("Verification error:", verifyError);
        toast({
          title: "Application submitted!",
          description: "Your profile will be manually reviewed. You'll be notified once approved.",
          duration: 5000
        });
      } else if (verificationData?.autoVerified) {
        toast({
          title: "Verified!",
          description: "Your credentials have been verified. Welcome to Legal Compass!",
          duration: 5000
        });
      } else {
        toast({
          title: "Application submitted!",
          description: verificationData?.message || "Your profile is pending verification.",
          duration: 5000
        });
      }

      navigate("/lawyer-dashboard");
    } catch (error: any) {
      toast({
        title: "Error submitting application",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Lawyer Signup - Legal Compass</title>
        <meta name="description" content="Join Legal Compass as a verified lawyer and connect with qualified legal leads." />
      </Helmet>

      <div className="min-h-screen bg-background p-4">
        <div className="max-w-3xl mx-auto py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Lawyer Verification Application</CardTitle>
              <CardDescription>
                Submit your credentials for verification. Once approved, you'll have access to qualified legal leads.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>State(s) Licensed *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                    {US_STATES.map((state) => (
                      <div key={state} className="flex items-center space-x-2">
                        <Checkbox
                          id={`state-${state}`}
                          checked={formData.statesLicensed.includes(state)}
                          onCheckedChange={() => toggleState(state)}
                        />
                        <label
                          htmlFor={`state-${state}`}
                          className="text-sm cursor-pointer"
                        >
                          {state}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barNumber">Bar Number *</Label>
                  <Input
                    id="barNumber"
                    value={formData.barNumber}
                    onChange={(e) => setFormData({ ...formData, barNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Practice Areas *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRACTICE_AREAS.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={`area-${area}`}
                          checked={formData.practiceAreas.includes(area)}
                          onCheckedChange={() => togglePracticeArea(area)}
                        />
                        <label
                          htmlFor={`area-${area}`}
                          className="text-sm cursor-pointer"
                        >
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Short Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your experience and expertise..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex items-center space-x-2 bg-muted p-4 rounded-lg">
                  <Checkbox
                    id="confirm"
                    checked={confirmed}
                    onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                  />
                  <label
                    htmlFor="confirm"
                    className="text-sm cursor-pointer"
                  >
                    I confirm that all information provided is accurate and I am a licensed attorney in good standing
                  </label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading || !confirmed}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit for Verification"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LawyerSignup;
