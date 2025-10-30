import { Button } from "@/components/ui/button";
import { Compass, Scale, Shield, Sparkles } from "lucide-react";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { TrustBadges } from "./TrustBadges";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <Compass className="w-24 h-24 text-primary animate-spin-slow" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-glow" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              The Most Advanced AI Legal Assistant
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Navigate complex legal matters with cutting-edge AI technology. 
              Get instant insights, research case law, and discover legal strategies — all powered by the latest AI models.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
              <Scale className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Comprehensive Research</h3>
              <p className="text-sm text-muted-foreground">
                Access vast legal databases and case law instantly
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
              <Shield className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                Your legal matters stay confidential with encryption
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
              <Sparkles className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Always Up-to-Date</h3>
              <p className="text-sm text-muted-foreground">
                Latest AI models trained on current legal standards
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-[var(--gradient-accent)] hover:opacity-90 text-accent-foreground text-xl font-extrabold px-12 py-8 rounded-2xl shadow-[var(--shadow-accent)] hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-accent/30 animate-glow"
            >
              Start Your Legal Research
            </Button>
            <p className="text-sm text-muted-foreground">
              Only $4.99 every 2 weeks • Cancel anytime
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This AI assistant provides informational guidance only and does not constitute legal advice. 
              For specific legal matters, please consult a licensed attorney.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />
    </div>
  );
};
