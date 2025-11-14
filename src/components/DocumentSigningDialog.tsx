import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { SignaturePad } from "./SignaturePad";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText } from "lucide-react";

interface DocumentSigningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId: string;
  documentName: string;
  signerType: "client" | "lawyer";
  onSignatureComplete: () => void;
}

export const DocumentSigningDialog = ({
  open,
  onOpenChange,
  documentId,
  documentName,
  signerType,
  onSignatureComplete,
}: DocumentSigningDialogProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSignature = async (signatureData: string) => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("document_signatures").insert({
        document_id: documentId,
        signer_id: user.id,
        signer_type: signerType,
        signature_data: signatureData,
        ip_address: null, // Can be populated via edge function if needed
        user_agent: navigator.userAgent,
      });

      if (error) throw error;

      toast.success("Document signed successfully");
      onSignatureComplete();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving signature:", error);
      toast.error("Failed to save signature");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Sign Document
          </DialogTitle>
          <DialogDescription>
            Please sign the document: <span className="font-semibold">{documentName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Draw your signature in the box below using your mouse or touchscreen.
          </p>
          <SignaturePad
            onSave={handleSaveSignature}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
