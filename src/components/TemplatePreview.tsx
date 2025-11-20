import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy, Check, FileText, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Template } from "@/data/templates";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";

interface TemplatePreviewProps {
  template: Template | null;
  open: boolean;
  onClose: () => void;
  onCustomize?: () => void;
  onDownload?: (templateId: string) => void;
}

export const TemplatePreview = ({ template, open, onClose, onCustomize, onDownload }: TemplatePreviewProps) => {
  const { toast } = useToast();
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  if (!template) return null;

  const handleValueChange = (label: string, value: string) => {
    setCustomValues(prev => ({ ...prev, [label]: value }));
  };

  const generateCustomizedContent = () => {
    let content = template.content;
    template.customizableFields.forEach(field => {
      const value = customValues[field.label] || field.placeholder;
      const placeholder = `{{${field.label.toLowerCase().replace(/\s+/g, "")}}}`;
      const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, value);
    });
    return content;
  };

  const handleDownloadPDF = async () => {
    try {
      const content = generateCustomizedContent();
      const doc = new jsPDF();
      
      // Set font and size
      doc.setFontSize(10);
      
      // Split content into lines that fit the page width
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const maxWidth = pageWidth - (margin * 2);
      
      const lines = doc.splitTextToSize(content, maxWidth);
      
      // Add text to PDF with page breaks
      let yPosition = margin;
      const lineHeight = 7;
      const pageHeight = doc.internal.pageSize.getHeight();
      
      lines.forEach((line: string) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      
      doc.save(`${template.title.replace(/\s+/g, "_")}.pdf`);
      
      if (onDownload) {
        onDownload(template.id);
      }
      
      toast({
        title: "PDF Downloaded",
        description: "Your template has been downloaded as PDF.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadDOCX = async () => {
    try {
      const content = generateCustomizedContent();
      
      // Convert text to HTML with proper formatting
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            pre { white-space: pre-wrap; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <pre>${content}</pre>
        </body>
        </html>
      `;
      
      const converted = htmlDocx.asBlob(htmlContent);
      saveAs(converted, `${template.title.replace(/\s+/g, "_")}.docx`);
      
      if (onDownload) {
        onDownload(template.id);
      }
      
      toast({
        title: "DOCX Downloaded",
        description: "Your template has been downloaded as Word document.",
      });
    } catch (error) {
      console.error("Error generating DOCX:", error);
      toast({
        title: "Download Error",
        description: "Failed to generate DOCX. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadTXT = () => {
    try {
      const content = generateCustomizedContent();
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${template.title.replace(/\s+/g, "_")}.txt`);
      
      if (onDownload) {
        onDownload(template.id);
      }
      
      toast({
        title: "Text File Downloaded",
        description: "Your template has been downloaded as text file.",
      });
    } catch (error) {
      console.error("Error generating TXT:", error);
      toast({
        title: "Download Error",
        description: "Failed to generate text file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async () => {
    const content = generateCustomizedContent();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      title: "Copied to Clipboard",
      description: "Template content copied successfully.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartCustomize = () => {
    setShowCustomize(true);
    if (onCustomize) {
      onCustomize();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{template.title}</DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
        </DialogHeader>

        {!showCustomize ? (
          // Preview Mode
          <div className="space-y-4">
            <div className="bg-muted/50 p-6 rounded-lg max-h-[50vh] overflow-y-auto border">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {template.content}
              </pre>
            </div>
            
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleStartCustomize} className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Customize This Template
              </Button>
              <Button onClick={onClose} variant="outline">
                Close Preview
              </Button>
            </div>
          </div>
        ) : (
          // Customize Mode
          <Tabs defaultValue="customize" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customize">
                <FileText className="w-4 h-4 mr-2" />
                Customize
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customize" className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Fill in the fields below to customize your template. Leave blank to use default placeholders.
              </p>
              <div className="grid gap-4 max-h-[40vh] overflow-y-auto pr-2">
                {template.customizableFields.map((field) => (
                  <div key={field.label} className="space-y-2">
                    <Label htmlFor={field.label}>{field.label}</Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.label}
                        placeholder={field.placeholder}
                        value={customValues[field.label] || ""}
                        onChange={(e) => handleValueChange(field.label, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={customValues[field.label] || ""}
                        onChange={(e) => handleValueChange(field.label, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="bg-muted/50 p-6 rounded-lg max-h-[40vh] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm font-mono">
                  {generateCustomizedContent()}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {showCustomize && (
          <div className="space-y-2 pt-4 border-t">
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleDownloadPDF} variant="default">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={handleDownloadDOCX} variant="default">
                <Download className="w-4 h-4 mr-2" />
                Download DOCX
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleDownloadTXT} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download TXT
              </Button>
              <Button onClick={handleCopy} variant="outline">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Text
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
