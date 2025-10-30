import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Search, Mail, Copy, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Lead {
  name: string;
  email: string;
  title?: string;
  company?: string;
  source?: string;
  relevance?: string;
  email_draft?: string;
}

export const LeadFinder = () => {
  const [targetAudience, setTargetAudience] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleSearch = async () => {
    // Client-side validation
    const trimmedAudience = targetAudience.trim();
    const trimmedIndustry = industry.trim();
    const trimmedLocation = location.trim();
    
    if (!trimmedAudience) {
      toast.error("Please describe your target audience");
      return;
    }
    
    if (trimmedAudience.length < 5) {
      toast.error("Target audience must be at least 5 characters");
      return;
    }
    
    if (trimmedAudience.length > 500) {
      toast.error("Target audience must be less than 500 characters");
      return;
    }
    
    if (trimmedIndustry.length > 100) {
      toast.error("Industry must be less than 100 characters");
      return;
    }
    
    if (trimmedLocation.length > 100) {
      toast.error("Location must be less than 100 characters");
      return;
    }

    setIsSearching(true);
    setLeads([]);

    try {
      const { data, error } = await supabase.functions.invoke('lead-finder', {
        body: {
          targetAudience: trimmedAudience,
          industry: trimmedIndustry || undefined,
          location: trimmedLocation || undefined,
        }
      });

      if (error) throw error;

      if (data.leads && Array.isArray(data.leads)) {
        setLeads(data.leads.filter((lead: any) => lead.email && !lead.error));
        toast.success(`Found ${data.leads.length} potential leads`);
      } else {
        toast.error("No leads found. Try a different search.");
      }
    } catch (error) {
      console.error('Lead finder error:', error);
      toast.error("Failed to find leads. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  const copyEmailDraft = (draft: string) => {
    navigator.clipboard.writeText(draft);
    toast.success("Email draft copied to clipboard");
  };

  const copyAllEmails = () => {
    const emails = leads.map(lead => lead.email).join(', ');
    navigator.clipboard.writeText(emails);
    toast.success(`Copied ${leads.length} emails`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/90 backdrop-blur-xl border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            AI Lead Finder
          </CardTitle>
          <CardDescription>
            Use AI to find potential customers from publicly available information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-sm">
              This tool searches public internet sources. Always comply with CAN-SPAM Act, GDPR, and email marketing laws. Only email people who match your target audience and include unsubscribe options.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="target">Target Audience * (5-500 characters)</Label>
            <Textarea
              id="target"
              placeholder="e.g., Small business owners who need legal advice, startup founders, freelance consultants..."
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="min-h-[100px]"
              maxLength={500}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry (Optional, max 100 chars)</Label>
              <Input
                id="industry"
                placeholder="e.g., Tech, Real Estate, Healthcare"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional, max 100 chars)</Label>
              <Input
                id="location"
                placeholder="e.g., United States, California, New York"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                maxLength={100}
              />
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full bg-[var(--gradient-accent)] hover:opacity-90"
            size="lg"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Searching the web...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Find Leads
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {leads.length > 0 && (
        <Card className="bg-card/90 backdrop-blur-xl border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Found Leads ({leads.length})</CardTitle>
                <CardDescription>Publicly available contact information</CardDescription>
              </div>
              <Button onClick={copyAllEmails} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy All Emails
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {leads.map((lead, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <h4 className="font-semibold">{lead.name}</h4>
                          </div>
                          
                          <div className="text-sm space-y-1">
                            <p className="flex items-center gap-2">
                              <span className="text-muted-foreground">Email:</span>
                              <code className="text-primary">{lead.email}</code>
                            </p>
                            {lead.title && (
                              <p className="text-muted-foreground">Title: {lead.title}</p>
                            )}
                            {lead.company && (
                              <p className="text-muted-foreground">Company: {lead.company}</p>
                            )}
                            {lead.source && (
                              <p className="text-xs text-muted-foreground">Source: {lead.source}</p>
                            )}
                            {lead.relevance && (
                              <p className="text-xs text-muted-foreground italic">
                                Why: {lead.relevance}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyEmail(lead.email)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>

                      {lead.email_draft && (
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-semibold">Personalized Email Draft</h5>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyEmailDraft(lead.email_draft!)}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Email
                            </Button>
                          </div>
                          <div className="bg-background/50 p-3 rounded-md text-sm whitespace-pre-wrap">
                            {lead.email_draft}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
