import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Template } from "@/data/templates";

interface TemplatePreviewProps {
  template: Template | null;
  open: boolean;
  onClose: () => void;
}

export const TemplatePreview = ({ template, open, onClose }: TemplatePreviewProps) => {
  const { toast } = useToast();
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

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

  const handleDownload = () => {
    const content = generateCustomizedContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded",
      description: "Your customized template has been downloaded.",
    });
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{template.title}</DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="customize" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="customize" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Fill in the fields below to customize your template. Leave blank to use default placeholders.
            </p>
            <div className="grid gap-4 max-h-[50vh] overflow-y-auto pr-2">
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
            <div className="bg-muted/50 p-6 rounded-lg max-h-[50vh] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {generateCustomizedContent()}
              </pre>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
          <Button onClick={handleCopy} variant="outline" className="flex-1">
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
