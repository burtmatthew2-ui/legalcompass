import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown } from "lucide-react";

interface LawyerSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubscribe: () => void;
}

export const LawyerSubscriptionDialog = ({ open, onOpenChange, onSubscribe }: LawyerSubscriptionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Crown className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Lawyer Subscription Required
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Subscribe to access qualified legal leads and grow your practice
          </DialogDescription>
        </DialogHeader>

        <Card className="p-6 border-2 border-primary">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-foreground mb-2">
              $150<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <div className="text-sm text-muted-foreground mb-1">or save 30% annually</div>
            <div className="text-2xl font-bold text-primary">
              $1,260<span className="text-lg font-normal text-muted-foreground">/year</span>
            </div>
            <Badge className="mt-2" variant="secondary">Professional Plan</Badge>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm"><strong>Up to 10 leads per month</strong> - No additional charges per lead</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm"><strong>Priority placement</strong> in lead matching</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm"><strong>Enhanced profile visibility</strong> to potential clients</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm"><strong>Case management tools</strong> - Messages, documents, deadlines</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm"><strong>Email support</strong> for technical assistance</span>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mb-6">
            <div className="text-sm font-medium text-foreground mb-1">Non-Subscribers</div>
            <div className="text-xs text-muted-foreground">
              Get 1 free lead per month • Limited features • No priority placement
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onSubscribe}
              className="flex-1 bg-primary hover:bg-primary/90"
              size="lg"
            >
              Subscribe Now - $150/month
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              size="lg"
            >
              Maybe Later
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
