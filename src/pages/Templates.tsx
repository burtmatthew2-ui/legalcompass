import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, FileText, Zap, Users, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Templates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [currentTier, setCurrentTier] = useState<"free" | "pro" | "business">("free");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        checkTemplateSubscription();
      }
    });
  }, []);

  const checkTemplateSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("check-template-subscription");
      if (error) throw error;
      
      if (data?.product_id === "prod_TRtB8rUmdjViNR") {
        setCurrentTier("pro");
      } else if (data?.product_id === "prod_TRtDWB1E2jJ0CD") {
        setCurrentTier("business");
      }
    } catch (error: any) {
      console.error("Error checking subscription:", error);
    }
  };

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
        window.open(data.url, "_blank");
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

  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 template per month",
        "Basic templates only",
        "PDF export",
        "Email support",
      ],
      icon: FileText,
      priceId: null,
      tier: "free" as const,
    },
    {
      name: "Pro",
      price: "$14.99",
      period: "month",
      description: "Most popular for professionals",
      features: [
        "Unlimited templates",
        "AI template assistance",
        "Version history",
        "Priority support",
        "Custom branding",
        "Advanced templates",
      ],
      icon: Zap,
      priceId: "price_1SUzPCArhAIMbV73e47FgPcB",
      tier: "pro" as const,
      popular: true,
    },
    {
      name: "Business",
      price: "$29.99",
      period: "month",
      description: "For teams and enterprises",
      features: [
        "Everything in Pro",
        "Team collaboration (up to 10 users)",
        "API access",
        "Dedicated account manager",
        "99.9% SLA guarantee",
        "Custom integrations",
      ],
      icon: Crown,
      priceId: "price_1SUzR2ArhAIMbV73oQR3XOpp",
      tier: "business" as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            Legal Templates
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Professional Legal Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access hundreds of attorney-reviewed legal templates. Download, customize, and use instantly.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isCurrentTier = currentTier === tier.tier;
            
            return (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.popular ? "border-primary shadow-lg scale-105" : ""
                } ${isCurrentTier ? "ring-2 ring-primary" : ""}`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-8 h-8 text-primary" />
                    {isCurrentTier && (
                      <Badge variant="secondary">Current Plan</Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground">/{tier.period}</span>
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  {tier.priceId ? (
                    <Button
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                      onClick={() => handleCheckout(tier.priceId!)}
                      disabled={loading || isCurrentTier}
                    >
                      {isCurrentTier ? "Current Plan" : `Upgrade to ${tier.name}`}
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Current Plan
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-muted/50 rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
            What's Included in Our Template Library
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Contract Templates</h3>
              <p className="text-sm text-muted-foreground">Employment agreements, NDAs, service contracts, and more</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Court Documents</h3>
              <p className="text-sm text-muted-foreground">Motions, complaints, discovery requests, and filings</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Business Forms</h3>
              <p className="text-sm text-muted-foreground">LLC formation, partnership agreements, bylaws</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Estate Planning</h3>
              <p className="text-sm text-muted-foreground">Wills, trusts, power of attorney documents</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Templates;
