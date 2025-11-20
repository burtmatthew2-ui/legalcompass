import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Zap, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { templates, templateCategories, type Template } from "@/data/templates";
import { TemplateCard } from "@/components/TemplateCard";
import { TemplatePreview } from "@/components/TemplatePreview";
import { useTemplateAccess } from "@/hooks/useTemplateAccess";

const Templates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { hasAccess, isLawyer, isSubscribed, freeTemplatesUsed, checkAccess, recordUsage } = useTemplateAccess();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a template plan.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-template-checkout", {
        body: { priceId },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (template: Template) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to preview templates.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const access = await checkAccess(template.id);
    if (access) {
      setSelectedTemplate(template);
      setPreviewOpen(true);
    }
  };

  const handleDownload = async (templateId: string) => {
    await recordUsage(templateId);
  };

  const handleUpgrade = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Templates" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const templateStats = {
    total: templates.length,
    free: templates.filter(t => t.tier === "free").length,
    pro: templates.filter(t => t.tier === "pro").length,
    business: templates.filter(t => t.tier === "business").length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Free Legal Templates & Forms | Download Attorney-Reviewed Documents 2025</title>
        <meta name="description" content="Download 50+ free legal templates including divorce papers, eviction notices, promissory notes, NDAs, wills, contracts, and court forms. Attorney-reviewed, state-specific, instantly customizable." />
        
        {/* Primary Keywords */}
        <meta name="keywords" content="legal templates free, legal forms download, attorney templates, court forms, legal documents, contract templates, divorce papers template, eviction notice template, promissory note, bill of sale, affidavit template, cease and desist letter, demand letter template, NDA template, will template, power of attorney form, rental agreement, employment contract, small claims complaint, personal injury demand letter" />
        
        {/* Long-tail Keywords */}
        <meta name="keywords" content="how to file for divorce, how to evict a tenant, how to write a demand letter, free legal document templates, downloadable legal forms, customizable legal templates, attorney-reviewed legal documents, state-specific legal forms, DIY legal documents, affordable legal forms, legal templates for lawyers, court filing templates, business contract templates, family law forms, estate planning documents, real estate contracts, employment agreements, free will template, free divorce papers, free eviction notice" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Free Legal Templates & Forms | Attorney-Reviewed Documents" />
        <meta property="og:description" content="Download 50+ free legal templates. Divorce papers, contracts, court forms, wills, and more. Customize instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/templates" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Legal Templates & Forms | Attorney-Reviewed" />
        <meta name="twitter:description" content="50+ free legal templates. Download divorce papers, contracts, court forms instantly." />
        
        {/* Structured Data for Legal Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Legal Document Templates",
            "description": "Free attorney-reviewed legal templates including contracts, court documents, wills, divorce papers, and business forms",
            "url": "https://legalcompass.shop/templates",
            "provider": {
              "@type": "LegalService",
              "name": "Legal Compass",
              "description": "Professional legal document templates and attorney matching service"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "lowPrice": "0",
              "highPrice": "29.99",
              "offerCount": "50+"
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            {templateStats.total} Professional Templates
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Legal Document Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Attorney-reviewed templates for contracts, court filings, business documents, and more. Customize and download instantly.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search templates by name, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="flex-wrap h-auto gap-2 bg-transparent">
              {templateCategories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Template Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory === "All Templates" ? "All Templates" : selectedCategory}
            </h2>
            <p className="text-muted-foreground">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  hasAccess={hasAccess}
                  isSubscribed={isSubscribed}
                  isLawyer={isLawyer}
                  freeTemplatesUsed={freeTemplatesUsed}
                  onPreview={handlePreview}
                  onUpgrade={handleUpgrade}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No templates found matching your search.</p>
              <Button 
                variant="link" 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All Templates"); }}
                className="mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="py-16 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock more templates and advanced features with our Pro and Business plans
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="border rounded-lg p-6 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-slate-600" />
                <h3 className="text-xl font-bold">Free</h3>
              </div>
              <p className="text-3xl font-bold mb-2">$0</p>
              <p className="text-muted-foreground mb-6">Forever free</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">{templateStats.free}</Badge>
                  <span className="text-sm">Basic templates</span>
                </li>
                <li className="text-sm text-muted-foreground">• 1 free template</li>
              <li className="text-sm text-muted-foreground">• Download as PDF, DOCX, or TXT</li>
              <li className="text-sm text-muted-foreground">• Preview before customizing</li>
              </ul>
            {!user && (
              <Button onClick={() => navigate("/auth")} variant="outline" className="w-full">
                Sign In to Get Free Template
              </Button>
            )}
            </div>

            {/* Pro Tier */}
            <div className="border-2 border-primary rounded-lg p-6 bg-card relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">Pro</h3>
              </div>
              <p className="text-3xl font-bold mb-2">$14.99</p>
              <p className="text-muted-foreground mb-6">per month</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">{templateStats.free + templateStats.pro}</Badge>
                  <span className="text-sm">All templates</span>
                </li>
              <li className="text-sm text-muted-foreground">• Unlimited downloads (PDF, DOCX, TXT)</li>
              <li className="text-sm text-muted-foreground">• Advanced customization</li>
              <li className="text-sm text-muted-foreground">• Save customized templates</li>
              <li className="text-sm text-muted-foreground">• AI assistance (coming soon)</li>
              </ul>
            {isSubscribed && !isLawyer ? (
              <Badge className="w-full justify-center">Current Plan</Badge>
            ) : (
              <Button 
                onClick={() => handleCheckout("price_1SUzPCArhAIMbV73e47FgPcB")}
                disabled={loading}
                className="w-full"
              >
                Upgrade to Pro
              </Button>
            )}
            </div>

            {/* Business Tier */}
            <div className="border rounded-lg p-6 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold">Business</h3>
              </div>
              <p className="text-3xl font-bold mb-2">$29.99</p>
              <p className="text-muted-foreground mb-6">per month</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">{templateStats.total}</Badge>
                  <span className="text-sm">All templates</span>
                </li>
                <li className="text-sm text-muted-foreground">• Everything in Pro</li>
                <li className="text-sm text-muted-foreground">• Team collaboration</li>
                <li className="text-sm text-muted-foreground">• API access</li>
                <li className="text-sm text-muted-foreground">• Custom integrations</li>
              <li className="text-sm text-muted-foreground">• Priority support</li>
              <li className="text-sm text-muted-foreground">• Custom templates</li>
            </ul>
            {isLawyer ? (
              <Badge className="w-full justify-center">Lawyer Access</Badge>
            ) : (
              <Button 
                onClick={() => handleCheckout("price_1SUzR2ArhAIMbV73oQR3XOpp")}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                Upgrade to Business
              </Button>
            )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Template Preview Modal */}
      <TemplatePreview
        template={selectedTemplate}
        open={previewOpen}
        onClose={() => {
          setPreviewOpen(false);
          setSelectedTemplate(null);
        }}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default Templates;
