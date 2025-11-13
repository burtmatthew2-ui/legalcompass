import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Edit, Trash, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Template {
  id: string;
  name: string;
  category: 'message' | 'document_request' | 'email';
  content: string;
  created_at: string;
}

export const TemplateManager = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'message' as 'message' | 'document_request' | 'email',
    content: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load from localStorage for now (in production, store in database)
      const stored = localStorage.getItem(`templates_${user.id}`);
      if (stored) {
        setTemplates(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const saveTemplate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newTemplate: Template = {
        id: selectedTemplate?.id || crypto.randomUUID(),
        ...formData,
        created_at: selectedTemplate?.created_at || new Date().toISOString()
      };

      let updatedTemplates;
      if (selectedTemplate) {
        updatedTemplates = templates.map(t => t.id === selectedTemplate.id ? newTemplate : t);
      } else {
        updatedTemplates = [...templates, newTemplate];
      }

      localStorage.setItem(`templates_${user.id}`, JSON.stringify(updatedTemplates));
      setTemplates(updatedTemplates);
      
      toast({
        title: "Success",
        description: selectedTemplate ? "Template updated" : "Template created",
      });

      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const updatedTemplates = templates.filter(t => t.id !== id);
      localStorage.setItem(`templates_${user.id}`, JSON.stringify(updatedTemplates));
      setTemplates(updatedTemplates);

      toast({
        title: "Deleted",
        description: "Template removed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: "Template copied to clipboard",
    });
  };

  const editTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setFormData({
      name: template.name,
      category: template.category,
      content: template.content
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setSelectedTemplate(null);
    setFormData({ name: '', category: 'message', content: '' });
    setDialogOpen(false);
  };

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: "default" | "secondary" | "outline" } = {
      message: "default",
      document_request: "secondary",
      email: "outline",
    };
    return <Badge variant={colors[category]}>{category.replace('_', ' ')}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Message Templates</CardTitle>
            <CardDescription>
              Create reusable templates for common communications
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedTemplate ? 'Edit' : 'Create'} Template</DialogTitle>
                <DialogDescription>
                  Save time with pre-written messages
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input
                    placeholder="e.g., Initial consultation request"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="message">Client Message</SelectItem>
                      <SelectItem value="document_request">Document Request</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Enter your template text..."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Use placeholders like [CLIENT_NAME] or [CASE_NUMBER]
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
                <Button onClick={saveTemplate} disabled={!formData.name || !formData.content}>
                  {selectedTemplate ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          {templates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No templates yet</p>
              <p className="text-sm mt-1">Create your first template to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {templates.map(template => (
                <div key={template.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{template.name}</h4>
                        {getCategoryBadge(template.category)}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(template.content)}>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => editTemplate(template)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteTemplate(template.id)}>
                      <Trash className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
