import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, DollarSign, TrendingUp, Gift, CreditCard } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LawyerPricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectModel: (model: "commission" | "pay_per_lead") => void;
  isFirstLead?: boolean;
}

export const LawyerPricingDialog = ({ open, onOpenChange, onSelectModel, isFirstLead = false }: LawyerPricingDialogProps) => {
  const [selectedModel, setSelectedModel] = useState<"commission" | "pay_per_lead">("commission");

  const handleContinue = () => {
    onSelectModel(selectedModel);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isFirstLead ? "🎉 Your First Lead is FREE!" : "Choose Your Payment Model"}
          </DialogTitle>
          {isFirstLead && (
            <p className="text-center text-muted-foreground mt-2">
              Try our platform risk-free. After your first lead, choose how you'd like to pay.
            </p>
          )}
        </DialogHeader>

        <RadioGroup value={selectedModel} onValueChange={(value) => setSelectedModel(value as any)} className="space-y-4 mt-6">
          {/* Commission Model */}
          <Card className={`p-6 cursor-pointer transition-all ${selectedModel === "commission" ? "border-2 border-primary shadow-lg" : "border"}`}>
            <div className="flex items-start gap-4">
              <RadioGroupItem value="commission" id="commission" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="commission" className="cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground">20% Commission on Cases</h3>
                      <Badge className="ml-2" variant="secondary">Recommended</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Only pay when you get paid. Perfect for lawyers who want zero upfront costs.
                  </p>
                </Label>

                <div className="space-y-3 ml-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><strong>No upfront payment</strong> - Access leads immediately</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><strong>Pay only on success</strong> - 20% when you accept the case</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><strong>Unlimited leads</strong> - No restrictions on how many you view</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><strong>Best for:</strong> Building your practice, uncertain case volumes</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm font-medium text-green-800 mb-1">Example</div>
                  <div className="text-xs text-green-700">
                    Accept a $5,000 case → Pay $1,000 commission → Keep $4,000
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Pay Per Lead Model */}
          <Card className={`p-6 cursor-pointer transition-all ${selectedModel === "pay_per_lead" ? "border-2 border-primary shadow-lg" : "border"}`}>
            <div className="flex items-start gap-4">
              <RadioGroupItem value="pay_per_lead" id="pay_per_lead" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="pay_per_lead" className="cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Pay Per Lead</h3>
                      <Badge className="ml-2" variant="outline">Predictable Costs</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Pay a flat fee per lead. Great for established practices with consistent conversion rates.
                  </p>
                </Label>

                <div className="space-y-3 ml-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><strong>Fixed pricing</strong> - Know costs upfront</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><strong>Buy in bulk</strong> - Better rates for multiple leads</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><strong>No commission</strong> - Keep 100% of case fees</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><strong>Best for:</strong> High-volume practices, established firms</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <div className="text-lg font-bold text-blue-800">$49</div>
                    <div className="text-xs text-blue-600">per lead</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <div className="text-lg font-bold text-blue-800">$39</div>
                    <div className="text-xs text-blue-600">10+ leads</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <div className="text-lg font-bold text-blue-800">$29</div>
                    <div className="text-xs text-blue-600">50+ leads</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </RadioGroup>

        {isFirstLead && (
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3">
            <Gift className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <strong>Special Offer:</strong> Your first lead is completely free! This selection sets your payment model for future leads.
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button onClick={handleContinue} size="lg" className="flex-1">
            {isFirstLead ? "Claim Free Lead" : "Continue with " + (selectedModel === "commission" ? "Commission" : "Pay Per Lead")}
          </Button>
          <Button onClick={() => onOpenChange(false)} variant="outline" size="lg">
            Cancel
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          You can change your payment model anytime in your settings
        </p>
      </DialogContent>
    </Dialog>
  );
};