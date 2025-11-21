import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Scale, AlertCircle, TrendingUp, DollarSign, UserCheck, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExitIntentCTA } from "@/components/ExitIntentCTA";
import { SocialProof } from "@/components/SocialProof";
import { BreadcrumbSchema } from "@/components/StructuredData";

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
  "Family Law (Divorce, Custody, Support)",
  "Criminal Defense (DUI, Misdemeanor, Felony)",
  "Personal Injury (Accident, Medical Malpractice)",
  "Employment Law (Discrimination, Wrongful Termination)",
  "Landlord/Tenant Disputes",
  "Contract Disputes",
  "Estate Planning (Wills, Trusts)",
  "Business Law",
  "Immigration",
  "Bankruptcy",
  "Real Estate",
  "Other"
];

const URGENCY_LEVELS = [
  { value: "immediate", label: "Immediate (Court date within 2 weeks)" },
  { value: "urgent", label: "Urgent (Need help within 30 days)" },
  { value: "moderate", label: "Moderate (Can wait 1-2 months)" },
  { value: "low", label: "Low urgency (Just exploring options)" }
];

interface AnalysisResult {
  caseAssessment: string;
  successChanceSolo: string;
  successChanceWithLawyer: string;
  estimatedCost: string;
  keyFactors: string[];
  nextSteps: string[];
}

export default function CaseAnalyzer() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState("");
  const [legalTopic, setLegalTopic] = useState("");
  const [urgency, setUrgency] = useState("");
  const [description, setDescription] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const progress = (step / 4) * 100;

  const handleNext = () => {
    if (step === 1 && !state) {
      toast({ title: "Please select your state", variant: "destructive" });
      return;
    }
    if (step === 2 && !legalTopic) {
      toast({ title: "Please select a legal topic", variant: "destructive" });
      return;
    }
    if (step === 3 && !urgency) {
      toast({ title: "Please select urgency level", variant: "destructive" });
      return;
    }
    if (step === 4 && description.trim().length < 20) {
      toast({ title: "Please provide more details (at least 20 characters)", variant: "destructive" });
      return;
    }
    setStep(step + 1);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-case', {
        body: {
          state,
          legalTopic,
          urgency,
          description
        }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      setStep(5);
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://legalcompass.shop/" },
        { name: "Case Analyzer", url: "https://legalcompass.shop/case-analyzer" }
      ]} />
      <ExitIntentCTA
        title="Need a Full Case Analysis?"
        description="Sign up to get detailed AI-powered analysis of your legal case, including success probability and cost estimates."
        ctaText="Get Free Analysis"
        ctaLink="/auth"
      />
      <Helmet>
        <title>Free Legal Case Analyzer - Get Instant AI Analysis | Legal Compass</title>
        <meta name="description" content="Free instant legal case analysis powered by AI. Answer 4 simple questions and get professional insights about your legal situation, success chances, and estimated costs. No signup required." />
        <meta name="keywords" content="free legal advice, case analyzer, legal help, attorney cost estimate, legal consultation, free lawyer consultation, legal case evaluation, AI legal assistant" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Legal Case Analyzer - Get Instant AI Analysis" />
        <meta property="og:description" content="Answer 4 questions and get professional AI analysis of your legal case for free. Understand your options before hiring a lawyer." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:image:alt" content="Legal case analysis with scales of justice and documents" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Legal Case Analyzer - Get Instant AI Analysis" />
        <meta name="twitter:description" content="Answer 4 questions and get professional AI analysis of your legal case for free." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80" />
        <meta name="twitter:image:alt" content="Legal case analysis with scales of justice" />
        
        {/* Schema.org markup for image SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Legal Compass Case Analyzer",
            "applicationCategory": "LegalService",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1247"
            },
            "description": "Free AI-powered legal case analyzer that provides instant analysis of your legal situation, success probability, and cost estimates.",
            "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Free Legal Case Analysis
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get professional AI-powered insights about your legal situation in minutes. 
              No signup required until you want detailed guidance.
            </p>
          </div>

          {/* Social Proof */}
          <div className="mb-8">
            <SocialProof variant="compact" />
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              <span>No Signup Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-primary" />
              <span>Unbiased Analysis</span>
            </div>
          </div>

          {/* Progress Bar */}
          {step <= 4 && (
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center mt-2">
                Step {step} of 4
              </p>
            </div>
          )}

          {/* Question Cards */}
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-lg font-semibold">
                      Which state are you located in?
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Laws vary by state, so this helps us provide accurate guidance
                    </p>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleNext} className="w-full" size="lg">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic" className="text-lg font-semibold">
                      What type of legal issue are you facing?
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Choose the category that best matches your situation
                    </p>
                    <Select value={legalTopic} onValueChange={setLegalTopic}>
                      <SelectTrigger id="topic">
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
                  <div className="flex gap-3">
                    <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleNext} className="flex-1">
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="text-lg font-semibold">
                      How urgent is your situation?
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      This helps us prioritize your case and suggest appropriate timelines
                    </p>
                    <Select value={urgency} onValueChange={setUrgency}>
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
                    <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleNext} className="flex-1">
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-lg font-semibold">
                      Briefly describe your situation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Don't worry about including every detail - you can add more information after signing up. 
                      Just give us a general overview.
                    </p>
                    <Textarea
                      id="description"
                      placeholder="Example: I was in a car accident 3 months ago. The other driver ran a red light and hit me. I have medical bills of $15,000 and my car was totaled. The insurance company is only offering $5,000..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      {description.length} characters (minimum 20)
                    </p>
                  </div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your information is completely confidential and protected. We never share your details.
                    </AlertDescription>
                  </Alert>
                  <div className="flex gap-3">
                    <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleAnalyze} 
                      className="flex-1"
                      disabled={loading || description.trim().length < 20}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Get Free Analysis
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {step === 5 && analysis && (
                <div className="space-y-6">
                  <div className="text-center pb-4 border-b">
                    <h2 className="text-2xl font-bold mb-2">Your Case Analysis</h2>
                    <p className="text-muted-foreground">
                      Based on the information provided
                    </p>
                  </div>

                  {/* Case Assessment */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Scale className="h-5 w-5 text-primary" />
                      Case Overview
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {analysis.caseAssessment}
                    </p>
                  </div>

                  {/* Success Chances */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-secondary/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Without Attorney
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-orange-500 mb-2">
                          {analysis.successChanceSolo}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Estimated success probability handling this alone
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          With Attorney
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-green-500 mb-2">
                          {analysis.successChanceWithLawyer}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Estimated success probability with legal representation
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Cost Estimate */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Estimated Attorney Costs
                    </h3>
                    <Card className="bg-green-500/5 border-green-500/20">
                      <CardContent className="pt-4">
                        <p className="text-xl font-semibold mb-2">{analysis.estimatedCost}</p>
                        <p className="text-sm text-muted-foreground">
                          This is a general estimate. Actual costs may vary based on case complexity and attorney rates in your area.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Key Factors */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Key Factors in Your Case</h3>
                    <ul className="space-y-2">
                      {analysis.keyFactors.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next Steps */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Recommended Next Steps</h3>
                    <ol className="space-y-2">
                      {analysis.nextSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-semibold text-primary">{idx + 1}.</span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* CTA Section */}
                  <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-3 text-center">
                        Want More Detailed Guidance?
                      </h3>
                      <p className="text-center text-muted-foreground mb-6">
                        Sign up to get personalized legal assistance, connect with verified attorneys, 
                        and get answers to your follow-up questions.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={() => navigate('/auth')} 
                          size="lg"
                          className="flex-1"
                        >
                          Sign Up for Free Consultation
                        </Button>
                        <Button 
                          onClick={() => navigate('/find-lawyers')} 
                          variant="outline"
                          size="lg"
                          className="flex-1"
                        >
                          Find Attorneys Now
                        </Button>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-4">
                        First consultation is free • No credit card required • 100% confidential
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legal Disclaimer */}
          <Alert className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Legal Disclaimer:</strong> This analysis is for informational purposes only and does not constitute legal advice. 
              Success rates and cost estimates are approximations based on general data and may not reflect your specific situation. 
              For actual legal advice, please consult with a licensed attorney in your jurisdiction.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </>
  );
}
