import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Download, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Install() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] flex items-center justify-center p-6">
      <Card className="max-w-lg w-full bg-card/90 backdrop-blur-xl border-border/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-[var(--gradient-primary)] flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Install Legal Compass</CardTitle>
          <CardDescription>
            Get instant access from your home screen - works offline!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isInstalled ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <p className="text-lg font-medium">App Installed!</p>
              <p className="text-muted-foreground">
                You can now access Legal Compass from your home screen
              </p>
              <Button onClick={() => navigate("/")} className="w-full">
                Open App
              </Button>
            </div>
          ) : deferredPrompt ? (
            <div className="space-y-4">
              <Button 
                onClick={handleInstall} 
                className="w-full bg-[var(--gradient-accent)] hover:opacity-90"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Install Now
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Works offline • Fast loading • Native feel
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h3 className="font-semibold">How to Install:</h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li><strong>iPhone/iPad:</strong> Tap Share → Add to Home Screen</li>
                  <li><strong>Android:</strong> Tap Menu (⋮) → Install App or Add to Home Screen</li>
                  <li><strong>Desktop:</strong> Look for the install icon in your browser's address bar</li>
                </ul>
              </div>
              <Button onClick={() => navigate("/")} variant="outline" className="w-full">
                Continue in Browser
              </Button>
            </div>
          )}

          <div className="pt-4 border-t border-border/50">
            <h4 className="font-medium mb-3">Benefits:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Works offline - access your research anywhere</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Lightning fast loading times</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Native app experience on any device</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>No app store required</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
