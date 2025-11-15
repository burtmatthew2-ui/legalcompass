import { TrendingUp, Target, Eye, DollarSign } from "lucide-react";

export const WhyLawyersUse = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Steady Flow of Warm Clients",
      description: "Get connected with potential clients actively seeking legal help right now"
    },
    {
      icon: Target,
      title: "More Qualified Leads",
      description: "Our AI pre-screens users, so you only see cases matching your expertise"
    },
    {
      icon: Eye,
      title: "Increased Visibility",
      description: "Perfect for smaller or solo practices looking to grow their client base"
    },
    {
      icon: DollarSign,
      title: "Transparent Lead Pricing",
      description: "Clear, upfront pricing with no hidden fees or long-term contracts"
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Lawyers Use LegalCompass
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Build your practice with a steady stream of qualified client leads
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};