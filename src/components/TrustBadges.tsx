import { Shield, Lock, CheckCircle, Zap, Award, Users } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit encryption",
    metric: "99.9% uptime"
  },
  {
    icon: Lock,
    title: "Attorney-Client Privilege",
    description: "Your data stays private",
    metric: "HIPAA compliant"
  },
  {
    icon: Users,
    title: "10,000+ Cases",
    description: "Successfully matched",
    metric: "Nationwide"
  },
  {
    icon: Award,
    title: "Verified Attorneys",
    description: "All bar-certified",
    metric: "50+ states"
  },
  {
    icon: CheckCircle,
    title: "Always Current",
    description: "Latest legal data",
    metric: "Daily updates"
  },
  {
    icon: Zap,
    title: "24-Hour Matching",
    description: "Attorney response",
    metric: "Guaranteed"
  }
];

export const TrustBadges = () => {
  return (
    <div className="py-16 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Trusted by Thousands of Clients & Attorneys
          </h3>
          <p className="text-muted-foreground">
            Your legal matters deserve the highest standards of security and professionalism
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div 
                key={index} 
                className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1">{badge.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                    <div className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full inline-block">
                      {badge.metric}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
