import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-bg)]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <Compass className="w-24 h-24 text-accent animate-spin-slow" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent animate-gradient">
          Legal Compass
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
          Navigate the complexities of law with AI-powered research
        </p>

        <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
          Discover legal loopholes and strategies through comprehensive analysis of laws and public databases
        </p>

        <Button 
          onClick={onGetStarted}
          size="lg"
          className="bg-[var(--gradient-accent)] hover:shadow-[var(--shadow-accent)] text-background font-semibold text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
        >
          Start Your Legal Research
        </Button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2 text-foreground">AI-Powered Research</h3>
            <p className="text-sm text-muted-foreground">Deep analysis using multiple legal databases and sources</p>
          </div>
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Legal Loopholes</h3>
            <p className="text-sm text-muted-foreground">Uncover strategies and interpretations in complex legal frameworks</p>
          </div>
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Instant Insights</h3>
            <p className="text-sm text-muted-foreground">Get comprehensive legal analysis in seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};
