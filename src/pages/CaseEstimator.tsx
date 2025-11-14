import { useState } from "react";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CASE_TYPES = [
  { value: "personal_injury", label: "Personal Injury", baseMin: 5000, baseMax: 50000 },
  { value: "family_law", label: "Family Law / Divorce", baseMin: 3000, baseMax: 25000 },
  { value: "criminal_defense", label: "Criminal Defense", baseMin: 2500, baseMax: 100000 },
  { value: "employment", label: "Employment Dispute", baseMin: 5000, baseMax: 75000 },
  { value: "contract", label: "Contract Dispute", baseMin: 2000, baseMax: 50000 },
  { value: "real_estate", label: "Real Estate", baseMin: 1500, baseMax: 30000 },
  { value: "bankruptcy", label: "Bankruptcy", baseMin: 1000, baseMax: 5000 },
  { value: "immigration", label: "Immigration", baseMin: 1500, baseMax: 15000 },
  { value: "estate", label: "Estate Planning / Probate", baseMin: 1000, baseMax: 10000 },
  { value: "business", label: "Business Formation / Disputes", baseMin: 3000, baseMax: 50000 },
];

const COMPLEXITY_MULTIPLIERS = {
  simple: 1,
  medium: 1.5,
  complex: 2.5,
};

const CaseEstimator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    caseType: "",
    complexity: "",
    description: "",
    location: "",
    urgency: "",
  });
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);

  const calculateEstimate = () => {
    if (!formData.caseType || !formData.complexity) {
      toast({
        title: "Missing Information",
        description: "Please select both case type and complexity level.",
        variant: "destructive",
      });
      return;
    }

    const caseType = CASE_TYPES.find((t) => t.value === formData.caseType);
    if (!caseType) return;

    const multiplier = COMPLEXITY_MULTIPLIERS[formData.complexity as keyof typeof COMPLEXITY_MULTIPLIERS];
    const urgencyMultiplier = formData.urgency === "urgent" ? 1.2 : 1;

    const estimatedMin = Math.round(caseType.baseMin * multiplier * urgencyMultiplier);
    const estimatedMax = Math.round(caseType.baseMax * multiplier * urgencyMultiplier);

    setEstimate({ min: estimatedMin, max: estimatedMax });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEstimate();
  };

  return (
    <>
      <Helmet>
        <title>Case Value Estimator - Legal Compass</title>
        <meta name="description" content="Get an instant estimate of your legal case value. Free AI-powered calculator helps you understand potential legal costs." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Free Tool</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Case Value Estimator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get an instant estimate of your potential legal costs based on case type and complexity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="caseType">Case Type *</Label>
                  <Select value={formData.caseType} onValueChange={(value) => setFormData({ ...formData, caseType: value })}>
                    <SelectTrigger id="caseType">
                      <SelectValue placeholder="Select case type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CASE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="complexity">Case Complexity *</Label>
                  <Select value={formData.complexity} onValueChange={(value) => setFormData({ ...formData, complexity: value })}>
                    <SelectTrigger id="complexity">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple - Straightforward, few parties involved</SelectItem>
                      <SelectItem value="medium">Medium - Moderate complexity, some documentation</SelectItem>
                      <SelectItem value="complex">Complex - Multiple parties, extensive documentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location (State)</Label>
                  <Input
                    id="location"
                    placeholder="e.g., California"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                    <SelectTrigger id="urgency">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal - Standard timeline</SelectItem>
                      <SelectItem value="urgent">Urgent - Need immediate attention</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Case Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe your case..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Estimate
                </Button>
              </form>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {estimate ? (
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-blue-50 border-2 border-primary">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-primary">
                      <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Estimated Cost Range</h3>
                      <p className="text-sm text-muted-foreground">Based on your inputs</p>
                    </div>
                  </div>

                  <div className="bg-white/80 rounded-lg p-6 mb-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary mb-2">
                        ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Estimated total cost</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-white/60 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium text-foreground mb-1">Factors Affecting Cost</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Lawyer experience and reputation</li>
                          <li>• Geographic location</li>
                          <li>• Case duration and court requirements</li>
                          <li>• Settlement vs. trial</li>
                        </ul>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" onClick={() => navigate('/auth')}>
                      Find Lawyers in Your Budget
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-dashed">
                  <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Estimate Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form and click "Calculate Estimate" to see your potential case costs
                    </p>
                  </div>
                </Card>
              )}

              {/* Disclaimer */}
              <Card className="p-6 bg-amber-50 border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-amber-800">
                    <div className="font-bold mb-1">Disclaimer</div>
                    This is an estimate only and actual legal fees may vary significantly. Many factors affect final costs including lawyer hourly rates, case duration, settlement negotiations, and court fees. This tool does not constitute legal advice. Consult with licensed attorneys for accurate pricing.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CaseEstimator;