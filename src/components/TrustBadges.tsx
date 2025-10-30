import { Shield, Lock, CheckCircle, Zap } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption"
  },
  {
    icon: Lock,
    title: "Private & Confidential",
    description: "Your data stays yours"
  },
  {
    icon: CheckCircle,
    title: "Always Updated",
    description: "Latest legal databases"
  },
  {
    icon: Zap,
    title: "Instant Research",
    description: "Answers in seconds"
  }
];

export const TrustBadges = () => {
  return (
    <div className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--gradient-primary)] flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{badge.title}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
