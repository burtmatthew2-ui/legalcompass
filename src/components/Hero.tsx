import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-bg)]" />
      
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl animate-glow" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-12 inline-flex items-center justify-center">
          <div className="relative">
            <Compass className="w-32 h-32 text-primary animate-spin-slow drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]" style={{ animationDuration: "20s" }} />
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-glow" />
          </div>
        </div>

        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 bg-clip-text text-transparent bg-[var(--gradient-primary)] leading-tight tracking-tight">
          Legal Compass
        </h1>

        <p className="text-2xl md:text-3xl text-foreground/90 mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
          Navigate the complexities of law with AI-powered research
        </p>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover legal loopholes and strategies through comprehensive analysis of laws and public databases
        </p>

        <div className="bg-destructive/15 border-2 border-destructive rounded-2xl p-8 mb-12 max-w-3xl mx-auto backdrop-blur-sm shadow-[0_8px_32px_rgba(239,68,68,0.2)]">
          <p className="text-destructive font-bold text-2xl mb-3 flex items-center justify-center gap-3">
            <span className="text-3xl">⚠️</span> Important Legal Disclaimer
          </p>
          <p className="text-destructive-foreground/90 text-lg leading-relaxed">
            This AI-powered tool is for informational and research purposes only. It does NOT provide legal advice 
            and does NOT replace consultation with a licensed attorney. For legal matters affecting your rights or 
            obligations, you MUST consult with a qualified attorney in your jurisdiction. Using this service does 
            not create an attorney-client relationship.
          </p>
        </div>

        <Button 
          onClick={onGetStarted}
          size="lg"
          className="bg-[var(--gradient-accent)] hover:shadow-[var(--shadow-accent)] text-background font-bold text-2xl px-16 py-10 transition-all duration-500 hover:scale-110 shadow-2xl rounded-2xl group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            🚀 Start Your Legal Research
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </Button>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "AI-Powered Research", desc: "Deep analysis using multiple legal databases and sources", icon: "🤖" },
            { title: "Legal Loopholes", desc: "Uncover strategies and interpretations in complex legal frameworks", icon: "🔍" },
            { title: "Instant Insights", desc: "Get comprehensive legal analysis in seconds", icon: "⚡" }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-2xl bg-[var(--gradient-card)] backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-[var(--shadow-card)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
