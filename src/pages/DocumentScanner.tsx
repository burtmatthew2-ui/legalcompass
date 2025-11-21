import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { ToolsSidebar } from '@/components/ToolsSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileText, CheckCircle, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

export default function DocumentScanner() {
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; path: string }>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    if (files.length > 5) {
      toast.error('Maximum 5 files allowed');
      return;
    }

    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to upload files');
        return;
      }

      const uploaded: Array<{ name: string; path: string }> = [];

      for (const file of files) {
        const filePath = `${user.id}/${Date.now()}_${file.name}`;
        const { error } = await supabase.storage
          .from('legal-documents')
          .upload(filePath, file);

        if (error) {
          toast.error(`Failed to upload ${file.name}`);
          continue;
        }

        uploaded.push({ name: file.name, path: filePath });
      }

      setUploadedFiles(prev => [...prev, ...uploaded]);
      toast.success(`${uploaded.length} file(s) uploaded`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Please upload at least one document');
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('legal-research', {
        body: {
          messages: [
            {
              role: 'user',
              content: `Please analyze the following uploaded legal document(s) and provide:
1. Document type and purpose
2. Key terms and clauses
3. Potential issues or concerns
4. Recommendations for action`,
            },
          ],
          uploadedFiles: uploadedFiles.map((f) => f.path),
        },
      });

      if (error) throw error;

      if (data?.response) {
        setAnalysisResult(data.response);
        toast.success('Document analysis complete');
      }
    } catch (error) {
      console.error('Error analyzing document:', error);
      toast.error('Failed to analyze document');
    } finally {
      setIsAnalyzing(false);
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
            <h1 className="text-4xl font-bold mb-2">{t('documentScanner.title')}</h1>
            <p className="text-lg text-muted-foreground">{t('documentScanner.subtitle')}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload Documents
              </CardTitle>
              <CardDescription>{t('documentScanner.uploadPrompt')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <input
                  type="file"
                  id="doc-upload"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  multiple
                  disabled={isUploading}
                />
                <Button
                  onClick={() => document.getElementById('doc-upload')?.click()}
                  disabled={isUploading}
                  className="w-full"
                  variant="outline"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Select Files (Max 5)'}
                </Button>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Uploaded Files:</h3>
                  <div className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm p-2 bg-muted rounded">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || uploadedFiles.length === 0}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('documentScanner.analyzing')}
                  </>
                ) : (
                  'Analyze Documents'
                )}
              </Button>
            </CardContent>
          </Card>

          {analysisResult && (
            <Card>
              <CardHeader>
                <CardTitle>{t('documentScanner.results')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{analysisResult}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
