import { Shield, Lock, CheckCircle, Zap, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

const badges = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit AES encryption",
    metric: "SSL Certified"
  },
  {
    icon: Lock,
    title: "Attorney-Client Privilege",
    description: "Your data stays private",
    metric: "Zero-knowledge"
  },
  {
    icon: Award,
    title: "Verified Attorneys",
    description: "Bar number required",
    metric: "Manual review"
  },
  {
    icon: CheckCircle,
    title: "Transparent Pricing",
    description: "No hidden fees",
    metric: "$4.99/month"
  },
  {
    icon: Users,
    title: "Licensed Professionals",
    description: "Credentials verified",
    metric: "50+ states"
  },
  {
    icon: Zap,
    title: "Secure Platform",
    description: "End-to-end encrypted",
    metric: "Privacy first"
  }
];

export const TrustBadges = () => {
  return (
    <div className="py-20 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            Why Choose Legal Compass
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built on Trust, Security & Transparency
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your legal matters deserve professional handling. Here's our commitment to you.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <Link
                key={index}
                to={badge.title.includes("Security") || badge.title.includes("Attorney-Client") || badge.title.includes("Platform") ? "/security" : "#"}
                className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-card border-2 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-blue-500/0 to-teal-500/0 group-hover:from-primary/5 group-hover:via-blue-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
                
                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mx-auto shadow-sm">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors">
                      {badge.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{badge.description}</p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent px-3 py-1.5 rounded-lg shadow-sm">
                      <CheckCircle className="w-3 h-3" />
                      {badge.metric}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground font-medium">
            Professional legal connections you can trust
          </p>
        </div>
      </div>
    </div>
  );
};
