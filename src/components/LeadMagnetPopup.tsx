import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, X } from "lucide-react";
import { toast } from "sonner";

export const LeadMagnetPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds if not already shown
    const hasShown = localStorage.getItem("leadMagnetShown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("leadMagnetShown", "true");
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@") || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate download
    setTimeout(() => {
      toast.success("Check your email! Your guide is on its way.");
      setIsOpen(false);
      setEmail("");
      setName("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            Free Legal Checklist
          </DialogTitle>
          <DialogDescription className="text-center">
            Download our comprehensive guide: <strong>"Top 10 Legal Questions Every Tenant Should Know"</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Download Free Guide"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};