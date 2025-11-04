import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LegalDisclaimer = () => {
  return (
    <Alert className="mb-8 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
      <AlertDescription className="text-sm text-amber-900 dark:text-amber-100">
        <strong className="font-semibold">Legal Disclaimer:</strong> This information is provided for educational purposes only and does not constitute legal advice. 
        Legal Compass is not a law firm and does not provide legal representation. For specific legal guidance regarding your situation, 
        please consult with a licensed attorney in your jurisdiction. Laws vary by state and change frequently.
      </AlertDescription>
    </Alert>
  );
};
