import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VerifiedBadgeProps {
  lastReviewed: string;
}

export const VerifiedBadge = ({ lastReviewed }: VerifiedBadgeProps) => {
  return (
    <div className="flex items-center gap-4 mb-6 flex-wrap">
      <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700">
        <ShieldCheck className="h-3 w-3 mr-1" />
        Fact-Checked Information
      </Badge>
      <span className="text-sm text-muted-foreground">
        Last reviewed: <time dateTime={lastReviewed}>{new Date(lastReviewed).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</time>
      </span>
    </div>
  );
};
