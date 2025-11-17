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
    <div className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            Why 10,000+ Users Trust Us
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Built on Trust, Security & Results
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your legal matters are important. Here's how we protect you and deliver results.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div 
                key={index} 
                className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-white border-2 border-slate-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-blue-500/0 to-teal-500/0 group-hover:from-primary/5 group-hover:via-blue-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
                
                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mx-auto shadow-sm">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-primary transition-colors">
                      {badge.title}
                    </h4>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">{badge.description}</p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-primary to-blue-600 px-3 py-1.5 rounded-lg shadow-sm">
                      <CheckCircle className="w-3 h-3" />
                      {badge.metric}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 font-medium">
            Join thousands who've found legal clarity with Legal Compass
          </p>
        </div>
      </div>
    </div>
  );
};
