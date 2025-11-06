import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Gift, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem("exitIntentShown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    // Add a small delay before activating exit intent
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClaim = () => {
    setIsOpen(false);
    navigate("/auth");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Wait! Don't Leave Empty-Handed
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-gradient-to-br from-primary/10 to-blue-50 p-6 text-center border-2 border-primary/20">
            <p className="text-lg font-semibold text-slate-900 mb-2">
              Get Your First Legal Question Answered FREE
            </p>
            <p className="text-sm text-slate-600 mb-4">
              Plus 2 more questions on us when you create your account. No credit card required.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-primary/30">
              <span className="text-2xl font-bold text-primary">3</span>
              <span className="text-sm font-medium text-slate-700">Free Questions</span>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              Instant AI-powered legal research
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              Access to 80+ jurisdictions worldwide
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              No credit card required to start
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              100% private and confidential
            </li>
          </ul>

          <Button
            onClick={handleClaim}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-base"
            size="lg"
          >
            Claim My 3 Free Questions
          </Button>

          <p className="text-xs text-center text-slate-500">
            Join 10,000+ users who trust Legal Compass for their legal research
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
