import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const PRICING_TIERS = {
  monthly: {
    name: "Monthly",
    price: 150,
    priceId: "price_1SVSHIArhAIMbV73j8va34UF",
    interval: "month",
    features: [
      "Up to 10 leads per month",
      "Priority lead access",
      "Enhanced profile visibility",
      "Full CRM access",
      "Email support"
    ]
  },
  annual: {
    name: "Annual",
    price: 1260,
    originalPrice: 1800,
    priceId: "price_1SVSHbArhAIMbV73pPW8ucwg",
    interval: "year",
    savings: "Save 30%",
    features: [
      "Up to 10 leads per month",
      "Priority lead access",
      "Enhanced profile visibility",
      "Full CRM access",
      "Priority support",
      "2 months free"
    ]
  }
};

interface LawyerSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const LawyerSubscriptionDialog = ({ open, onOpenChange, onSuccess }: LawyerSubscriptionDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('create-lawyer-checkout', {
        body: { priceId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to checkout",
          description: "Complete your subscription payment to activate your account"
        });
        onSuccess?.();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Subscription Plan</DialogTitle>
          <DialogDescription>
            Get access to quality leads and grow your practice
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {Object.entries(PRICING_TIERS).map(([key, tier]) => (
            <Card key={key} className={key === 'annual' ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{tier.name}</CardTitle>
                  {'savings' in tier && <Badge variant="secondary">{tier.savings}</Badge>}
                </div>
                <CardDescription>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                    <span className="text-muted-foreground">/{tier.interval}</span>
                  </div>
                  {'originalPrice' in tier && (
                    <p className="text-sm text-muted-foreground line-through mt-1">
                      ${tier.originalPrice}/year
                    </p>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleSubscribe(tier.priceId)}
                  disabled={loading}
                  variant={key === 'annual' ? "default" : "outline"}
                >
                  Subscribe {key === 'annual' && '(Best Value)'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
