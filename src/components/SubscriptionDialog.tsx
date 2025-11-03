import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SubscriptionDialog = ({ open, onOpenChange }: SubscriptionDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Ready for Unlimited Access?
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            You've used your 3 free questions! Continue with professional legal research for just <span className="line-through text-muted-foreground/60">$9.99</span> <span className="font-bold text-accent">$4.99/month</span> (50% off!)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">Multi-jurisdiction research (17+ jurisdictions)</p>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">Case law comparison across states & countries</p>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">AI-generated legal memo drafts</p>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">Direct links to official legal sources</p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button
            onClick={() => navigate("/pricing")}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            View Plans - <span className="line-through mx-1">$9.99</span> $4.99/month
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            className="w-full"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
