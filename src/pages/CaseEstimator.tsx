import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { ToolsSidebar } from '@/components/ToolsSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Scale, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

const caseTypes = [
  'Personal Injury',
  'Contract Dispute',
  'Employment',
  'Family Law',
  'Criminal Defense',
  'Real Estate',
  'Business',
  'Intellectual Property',
  'Other',
];

const jurisdictions = [
  'Federal', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

export default function CaseEstimator() {
  const { t } = useTranslation();
  const [caseType, setCaseType] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [caseDetails, setCaseDetails] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!caseType || !jurisdiction || !caseDetails) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsPredicting(true);
    try {
      const { data, error } = await supabase.functions.invoke('legal-research', {
        body: {
          messages: [
            {
              role: 'user',
              content: `Please analyze this legal case and provide a detailed prediction:

Case Type: ${caseType}
Jurisdiction: ${jurisdiction}
Case Details: ${caseDetails}

Please provide:
1. Likelihood of success (percentage and reasoning)
2. Key factors that could influence the outcome
3. Potential challenges and risks
4. Estimated timeline
5. Recommended next steps
6. Similar case precedents if applicable`,
            },
          ],
        },
      });

      if (error) throw error;

      if (data?.response) {
        setPredictionResult(data.response);
        toast.success('Case analysis complete');
      }
    } catch (error) {
      console.error('Error predicting case outcome:', error);
      toast.error('Failed to analyze case');
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ToolsSidebar />
      <div className="container mx-auto px-4 py-8 pt-20">
        <BreadcrumbNav />
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t('casePredictor.title')}</h1>
            <p className="text-lg text-muted-foreground">{t('casePredictor.subtitle')}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Case Information
              </CardTitle>
              <CardDescription>Enter your case details for AI-powered prediction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caseType">{t('casePredictor.caseType')}</Label>
                <Select value={caseType} onValueChange={setCaseType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    {caseTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jurisdiction">{t('casePredictor.jurisdiction')}</Label>
                <Select value={jurisdiction} onValueChange={setJurisdiction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select jurisdiction" />
                  </SelectTrigger>
                  <SelectContent>
                    {jurisdictions.map((j) => (
                      <SelectItem key={j} value={j}>
                        {j}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseDetails">{t('casePredictor.caseDetails')}</Label>
                <Textarea
                  id="caseDetails"
                  value={caseDetails}
                  onChange={(e) => setCaseDetails(e.target.value)}
                  placeholder="Describe your case in detail..."
                  rows={8}
                />
              </div>

              <Button
                onClick={handlePredict}
                disabled={isPredicting || !caseType || !jurisdiction || !caseDetails}
                className="w-full"
              >
                {isPredicting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('casePredictor.predicting')}
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {t('casePredictor.predict')}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {predictionResult && (
            <Card>
              <CardHeader>
                <CardTitle>{t('casePredictor.results')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{predictionResult}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
