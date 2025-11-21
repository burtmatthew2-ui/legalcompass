import { DollarSign, ShieldCheck, Sparkles, Eye, Lock } from "lucide-react";

export const WhatMakesUsDifferent = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Transparent Lead Pricing",
      description: "Clear pricing for lawyers, completely free for individuals"
    },
    {
      icon: ShieldCheck,
      title: "Verified Lawyers",
      description: "All attorneys are pre-screened and verified for your protection"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Research",
      description: "Get instant legal guidance powered by advanced AI technology"
    },
    {
      icon: Eye,
      title: "No Hidden Fees",
      description: "What you see is what you get—no surprises, ever"
    },
    {
      icon: Lock,
      title: "Free to Use for Individuals",
      description: "Submit cases, research laws, and connect with lawyers at no cost"
    }
  ];

  return (
    <section className="py-16 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            What Makes Us Different
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to transparency, quality, and accessibility in legal services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-card/50 rounded-xl border border-border hover:border-primary transition-colors"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};