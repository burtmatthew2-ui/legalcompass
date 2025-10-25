import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { Footer } from "@/components/Footer";

const PRICING_TIERS = {
  basic: {
    name: "Basic",
    price: "$4.99",
    priceId: "price_1SLa55ArhAIMbV739y0sARjH",
    productId: "prod_TIAP3IV5EhaFIL",
    features: [
      "50 questions per month",
      "Streamlined AI assistant",
      "Basic legal research",
      "Email support",
    ],
  },
  professional: {
    name: "Professional",
    price: "$9.99",
    priceId: "price_1SLaCsArhAIMbV73oyBD4pTB",
    productId: "prod_TIAXB3ezMYE5u5",
    features: [
      "200 questions per month",
      "Enhanced AI capabilities",
      "Advanced legal research",
      "Priority email support",
      "Complex question handling",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: "$19.99",
    priceId: "price_1SLaDCArhAIMbV73x8TebNXr",
    productId: "prod_TIAYv6WKBRt2OE",
    features: [
      "Unlimited questions",
      "Most advanced AI model",
      "Premium legal research",
      "24/7 priority support",
      "Complex legal challenges",
      "Dedicated account manager",
    ],
  },
};

const Pricing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
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
        window.open(data.url, '_blank');
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
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to open customer portal");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground">
              Select the perfect tier for your legal research needs
            </p>
            {currentSubscription?.subscribed && (
              <div className="mt-4">
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

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(PRICING_TIERS).map(([key, tier]) => {
              const isCurrentPlan = currentSubscription?.product_id === tier.productId;
              return (
                <Card
                  key={key}
                  className={`relative overflow-hidden shadow-card border-white/10 ${
                    isCurrentPlan ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {isCurrentPlan && (
                    <div className="absolute top-0 right-0 bg-gradient-primary text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                      Current Plan
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription>
                      <span className="text-4xl font-bold text-foreground">
                        {tier.price}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleSubscribe(tier.priceId)}
                      disabled={loading === tier.priceId || isCurrentPlan}
                      className="w-full bg-gradient-primary hover:opacity-90 transition-all"
                    >
                      {loading === tier.priceId ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                      ) : isCurrentPlan ? (
                        'Current Plan'
                      ) : (
                        'Subscribe'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
