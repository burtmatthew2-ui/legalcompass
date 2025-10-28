import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { Footer } from "@/components/Footer";

const PREMIUM_TIER = {
  name: "Legal Compass Premium",
  price: "$4.99",
  interval: "every 2 weeks",
  priceId: "price_1SN0bKArhAIMbV737l0eMYVG",
  productId: "prod_TJdtoPNUnva1b6",
  features: [
    "Unlimited legal questions",
    "Advanced AI-powered research",
    "File upload & document analysis",
    "Export conversation history",
    "Share research findings",
    "Bookmark important responses",
    "Priority support",
    "All future features included",
  ],
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              One plan with all features. No hidden fees. Cancel anytime.
            </p>
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
                <div className="absolute top-0 right-0 bg-gradient-primary text-white px-4 py-2 text-sm font-semibold rounded-bl-lg">
                  Active Plan
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl mb-2">{PREMIUM_TIER.name}</CardTitle>
                <CardDescription className="text-lg">
                  <span className="text-5xl font-bold text-foreground block mb-2">
                    {PREMIUM_TIER.price}
                  </span>
                  <span className="text-muted-foreground">{PREMIUM_TIER.interval}</span>
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
                {!currentSubscription?.subscribed && (
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
  );
};

export default Pricing;
