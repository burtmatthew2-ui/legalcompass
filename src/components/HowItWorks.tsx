import { MessageSquare, Search, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      number: "01",
      title: "Describe Your Case",
      description: "Tell us your legal situation in plain language. Our AI understands context, not just keywords.",
      features: ["No legal jargon required", "Upload documents for analysis", "Fully confidential"]
    },
    {
      icon: Search,
      number: "02",
      title: "Get Matched Instantly",
      description: "Our platform analyzes your case and matches you with verified attorneys in your jurisdiction.",
      features: ["Verified attorneys only", "Specialization matching", "24-hour response guarantee"]
    },
    {
      icon: CheckCircle,
      number: "03",
      title: "Manage Everything Online",
      description: "Communicate securely, sign documents, track deadlines, and manage your case from one platform.",
      features: ["Secure messaging", "E-signature capability", "Real-time case updates"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Simple 3-Step Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From case submission to resolution - we've streamlined the entire legal process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" style={{ top: '6rem' }} />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index} 
                className="group relative bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                <CardContent className="pt-8 pb-6 px-6 space-y-6">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-bold text-sm">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2 pt-4 border-t border-border/50">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow indicator */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary items-center justify-center z-10">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
