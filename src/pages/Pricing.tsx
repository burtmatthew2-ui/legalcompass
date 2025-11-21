import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import type { User, SubscriptionStatus } from "@/types/user";
import { ExitIntentCTA } from "@/components/ExitIntentCTA";
import { SocialProof } from "@/components/SocialProof";
import { BreadcrumbSchema } from "@/components/StructuredData";

const PREMIUM_TIER = {
  name: "Legal Compass Pro",
  price: "$4.99",
  originalPrice: "$9.99",
  interval: "per month",
  priceId: "price_1SNuZKArhAIMbV73QbW8o3hr",
  productId: "prod_TMFlPpHhdISKJS",
  features: [
    "Unlimited legal case submissions",
    "AI-generated Snapshot Briefs for your cases",
    "Connect with verified lawyers",
    "Download case summaries as PDFs",
    "All 50 US states + federal law coverage",
    "EU (all 27 member states), UK, Canada, Australia, NZ",
    "Case law comparison across jurisdictions",
    "AI-generated legal memo drafts",
    "Regulatory change alerts",
    "Direct links to official sources",
    "File upload & document analysis",
    "Conversation history & bookmarks",
  ],
};

const Pricing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkSubscription();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkSubscription();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      setCurrentSubscription(data);
    } catch (error: any) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoading(priceId);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create checkout session");
    } finally {
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    setLoading('portal');
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to open customer portal");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://legalcompass.shop/" },
        { name: "Pricing", url: "https://legalcompass.shop/pricing" }
      ]} />
      <ExitIntentCTA
        title="Wait! Get 3 Free Questions"
        description="Try Legal Compass free with no credit card required. Get instant AI legal guidance for your first 3 questions."
        ctaText="Start Free Trial"
        ctaLink="/auth"
      />
      <Helmet>
        <title>Pricing - Legal Compass | $4.99/month (50% Off) | 3 Free Questions</title>
        <meta name="description" content="Try Legal Compass free with 3 questions. Then just $4.99/month for unlimited legal research across 80+ jurisdictions. 90% less than enterprise legal tools. Cancel anytime." />
        <meta name="keywords" content="legal research pricing, affordable legal tool, legal subscription, AI legal research cost, cheap legal research" />
        <link rel="canonical" href="https://legalcompass.shop/pricing" />
        
        <meta property="og:title" content="Legal Compass Pricing - $4.99/month (50% Off)" />
        <meta property="og:description" content="Professional legal research for everyone. 3 free questions, then $4.99/month. 90% less than enterprise tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/pricing" />
        <meta property="og:image" content="https://legalcompass.shop/icon-512.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Legal Compass Pricing - $4.99/month" />
        <meta name="twitter:description" content="Try free, then $4.99/month for unlimited legal research." />
        <meta name="twitter:image" content="https://legalcompass.shop/icon-512.png" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Legal Compass Pro",
            "description": "AI-powered legal research platform with unlimited access to legal information across 80+ jurisdictions",
            "brand": {
              "@type": "Organization",
              "name": "Legal Compass"
            },
            "offers": {
              "@type": "Offer",
              "price": "4.99",
              "priceCurrency": "USD",
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock",
              "url": "https://legalcompass.shop/pricing"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <BreadcrumbNav />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Try It Free, Then Subscribe
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Get 3 professional legal research questions absolutely free. Then continue with unlimited access for just <span className="line-through text-muted-foreground/60">{PREMIUM_TIER.originalPrice}</span> <span className="font-bold text-accent">{PREMIUM_TIER.price}/month</span> (50% off!)—90% less than enterprise legal tools.
            </p>
            
            {/* Social Proof */}
            <SocialProof variant="compact" />
            
            {currentSubscription?.subscribed && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Subscription ends: {new Date(currentSubscription.subscription_end).toLocaleDateString()}
                </p>
                <Button
                  onClick={handleManageSubscription}
                  variant="outline"
                  disabled={loading === 'portal'}
                >
                  {loading === 'portal' ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</>
                  ) : (
                    'Manage Subscription'
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="max-w-lg mx-auto">
            <Card className={`relative overflow-hidden shadow-2xl border-primary/20 ${
              currentSubscription?.subscribed ? 'ring-2 ring-primary' : ''
            }`}>
              {currentSubscription?.subscribed && (
                <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-semibold rounded-bl-lg">
                  Active Plan
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl mb-2">{PREMIUM_TIER.name}</CardTitle>
                <CardDescription className="text-lg">
                  <div className="space-y-1">
                    <span className="text-2xl line-through text-muted-foreground/60 block">
                      {PREMIUM_TIER.originalPrice}
                    </span>
                    <span className="text-5xl font-bold text-foreground block">
                      {PREMIUM_TIER.price}
                    </span>
                    <span className="text-accent font-semibold block">50% OFF</span>
                    <span className="text-muted-foreground">{PREMIUM_TIER.interval}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {PREMIUM_TIER.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                {currentSubscription?.subscribed ? (
                  <div className="space-y-3">
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
                      <p className="text-sm font-medium text-primary">
                        ✓ You're subscribed to this plan
                      </p>
                    </div>
                    <Button
                      onClick={handleManageSubscription}
                      variant="outline"
                      size="lg"
                      disabled={loading === 'portal'}
                      className="w-full"
                    >
                      {loading === 'portal' ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...</>
                      ) : (
                        'Manage Subscription'
                      )}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleSubscribe(PREMIUM_TIER.priceId)}
                    disabled={loading === PREMIUM_TIER.priceId}
                    size="lg"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all text-lg py-6"
                  >
                    {loading === PREMIUM_TIER.priceId ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                    ) : (
                      'Get Started Now'
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Pricing;
