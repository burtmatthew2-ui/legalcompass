import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Crown, Zap, Lock } from "lucide-react";
import type { Template } from "@/data/templates";

interface TemplateCardProps {
  template: Template;
  currentTier: "free" | "pro" | "business";
  onPreview: (template: Template) => void;
  onUpgrade: () => void;
}

export const TemplateCard = ({ template, currentTier, onPreview, onUpgrade }: TemplateCardProps) => {
  const tierOrder = { free: 0, pro: 1, business: 2 };
  const hasAccess = tierOrder[currentTier] >= tierOrder[template.tier];

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
    <Card className={`relative ${!hasAccess ? "opacity-75" : ""}`}>
      {!hasAccess && (
        <div className="absolute top-2 right-2 z-10">
          <Lock className="w-5 h-5 text-muted-foreground" />
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
        {hasAccess ? (
          <Button 
            onClick={() => onPreview(template)}
            className="w-full"
          >
            Preview & Customize
          </Button>
        ) : (
          <Button 
            onClick={onUpgrade}
            variant="outline"
            className="w-full"
          >
            <Lock className="w-4 h-4 mr-2" />
            Upgrade to Access
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
