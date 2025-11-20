import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DollarSign } from "lucide-react";

interface CommissionReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadId: string;
  clientId: string;
}

export const CommissionReportDialog = ({ open, onOpenChange, leadId, clientId }: CommissionReportDialogProps) => {
  const [caseValue, setCaseValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    const value = parseFloat(caseValue);
    if (isNaN(value) || value <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid case value",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get commission rate from lawyer payment preferences
      const { data: prefs } = await supabase
        .from('lawyer_payment_preferences')
        .select('commission_rate')
        .eq('lawyer_id', user.id)
        .single();

      const commissionRate = prefs?.commission_rate || 10;
      const commissionAmount = (value * commissionRate) / 100;

      const { error } = await supabase.from('commission_tracking').insert({
        lawyer_id: user.id,
        lead_id: leadId,
        client_id: clientId,
        case_value: value,
        commission_rate: commissionRate,
        commission_amount: commissionAmount,
        payment_status: 'pending'
      });

      if (error) throw error;

      toast({
        title: "Commission Reported",
        description: `Case value: $${value.toFixed(2)} | Commission: $${commissionAmount.toFixed(2)} (${commissionRate}%)`,
      });

      onOpenChange(false);
      setCaseValue("");
    } catch (error: any) {
      console.error('Error reporting commission:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Report Commission
          </DialogTitle>
          <DialogDescription>
            Report the final case value to calculate your commission
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="caseValue">Final Case Value ($)</Label>
            <Input
              id="caseValue"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter case settlement or judgment amount"
              value={caseValue}
              onChange={(e) => setCaseValue(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Your commission will be calculated based on your agreed rate and reported to the platform for processing.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Reporting..." : "Report Commission"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
