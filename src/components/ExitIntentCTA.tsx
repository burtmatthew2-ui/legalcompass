import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface ExitIntentCTAProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export const ExitIntentCTA = ({ title, description, ctaText, ctaLink }: ExitIntentCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem("exitIntentShown");
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  const handleCTA = () => {
    setIsVisible(false);
    navigate(ctaLink);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Zap className="h-8 w-8 text-primary" />
          </div>

          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={handleCTA}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-lg"
            >
              {ctaText}
            </Button>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
            >
              No thanks, I'll continue browsing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};