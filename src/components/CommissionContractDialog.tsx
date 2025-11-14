import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignaturePad } from "@/components/SignaturePad";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface CommissionContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContractSigned: () => void;
  lawyerId: string;
}

const CONTRACT_TEXT = `
LEGAL LEAD REFERRAL COMMISSION AGREEMENT

This Agreement is entered into between Legal Compass ("Platform") and the undersigned Attorney ("Attorney").

1. COMMISSION STRUCTURE
Attorney agrees to pay Platform a commission of 10% (ten percent) on all revenue generated from clients referred through the Platform.

2. SCOPE
- Commission applies to all cases originating from Platform leads
- Commission period: 12 months from initial client consultation date
- Commission calculated on gross revenue received from the client

3. PAYMENT TERMS
- Attorney shall report case conversions within 30 days of client engagement
- Commission payments due within 30 days of attorney receiving client payment
- Attorney shall maintain accurate records of all referred client transactions

4. FREE LEAD TRIAL
- Attorney receives ONE (1) free lead trial to evaluate Platform quality
- After free trial, Attorney pays $35 per additional lead purchased
- Commission agreement applies to all leads (free and paid)

5. ATTORNEY OBLIGATIONS
- Provide professional legal services to all referred clients
- Maintain current bar license and good standing
- Report all case conversions accurately and timely
- Comply with all applicable legal and ethical standards

6. PLATFORM OBLIGATIONS
- Provide qualified legal leads matching Attorney's practice areas
- Maintain client confidentiality and data security
- Process payments securely through Stripe

7. TERMINATION
Either party may terminate this agreement with 30 days written notice. Commission obligations survive termination for all active cases.

8. GOVERNING LAW
This Agreement shall be governed by the laws of the United States.

By signing below, Attorney acknowledges reading, understanding, and agreeing to all terms of this Commission Agreement.
`;

export function CommissionContractDialog({
  open,
  onOpenChange,
  onContractSigned,
  lawyerId,
}: CommissionContractDialogProps) {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const handleSaveSignature = async (signatureData: string) => {
    setLoading(true);

    try {
      // Get IP address and user agent
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();

      const { error } = await supabase
        .from('commission_agreements')
        .insert({
          lawyer_id: lawyerId,
          contract_text: CONTRACT_TEXT,
          signature_data: signatureData,
          ip_address: ipData.ip,
          user_agent: navigator.userAgent,
          commission_rate: 10.00,
        });

      if (error) throw error;

      toast.success("Commission agreement signed successfully!");
      onContractSigned();
      onOpenChange(false);
    } catch (error) {
      console.error('Error signing contract:', error);
      toast.error("Failed to sign agreement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToSignature = () => {
    if (!agreed) {
      toast.error("Please read and agree to the terms");
      return;
    }
    setShowSignature(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Commission Agreement Required</DialogTitle>
          <DialogDescription>
            Please review and sign the 10% commission agreement to access legal leads.
          </DialogDescription>
        </DialogHeader>

        {!showSignature ? (
          <>
            <ScrollArea className="h-96 border rounded-lg p-4 bg-muted/30">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {CONTRACT_TEXT}
              </pre>
            </ScrollArea>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="agree"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <label
                  htmlFor="agree"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  I have read, understood, and agree to the terms of this Commission Agreement,
                  including the 10% commission on all client revenue from Platform leads.
                </label>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleProceedToSignature}
                  disabled={!agreed}
                  className="flex-1"
                >
                  Proceed to Sign
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please sign below to complete your agreement.
            </p>
            <SignaturePad
              onSave={handleSaveSignature}
              onCancel={() => setShowSignature(false)}
            />
            {loading && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing agreement...
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
