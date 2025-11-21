import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Crown, Zap, Lock, Eye } from "lucide-react";
import type { Template } from "@/data/templates";

interface TemplateCardProps {
  template: Template;
  hasAccess: boolean;
  isSubscribed: boolean;
  isLawyer: boolean;
  freeTemplatesRemaining: number;
  onPreview: (template: Template) => void;
  onUpgrade: () => void;
}

export const TemplateCard = ({ template, hasAccess, isSubscribed, isLawyer, freeTemplatesRemaining, onPreview, onUpgrade }: TemplateCardProps) => {
  const canAccess = isSubscribed || isLawyer || freeTemplatesRemaining > 0;
  const showLockIcon = !canAccess;

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "free": return <FileText className="w-4 h-4" />;
      case "pro": return <Zap className="w-4 h-4" />;
      case "business": return <Crown className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "free": return "bg-slate-100 text-slate-700";
      case "pro": return "bg-primary/10 text-primary";
      case "business": return "bg-amber-100 text-amber-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <Card className={`relative ${!canAccess ? "opacity-75" : ""}`}>
      {showLockIcon && (
        <div className="absolute top-2 right-2 z-10">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
      {!hasAccess && canAccess && freeTemplatesRemaining > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Free Template Available
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className={getTierColor(template.tier)}>
            <span className="mr-1">{getTierIcon(template.tier)}</span>
            {template.tier.toUpperCase()}
          </Badge>
          <Badge variant="outline">{template.category}</Badge>
        </div>
        <CardTitle className="text-lg">{template.title}</CardTitle>
        <CardDescription className="line-clamp-2">{template.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        {canAccess ? (
          <Button 
            onClick={() => onPreview(template)}
            className="w-full"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview & Customize
          </Button>
        ) : (
          <Button 
            onClick={onUpgrade}
            variant="outline"
            className="w-full"
          >
            <Lock className="w-4 h-4 mr-2" />
            {freeTemplatesRemaining === 0 ? "Upgrade for More Templates" : "Sign In to Access"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
