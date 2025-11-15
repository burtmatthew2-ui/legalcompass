import { TrendingUp, Target, Eye, DollarSign } from "lucide-react";

export const WhyLawyersUse = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Ready-to-Convert Clients",
      description: "Stop chasing cold leads. Get instant access to people who need your help now—not 'just browsing.'"
    },
    {
      icon: Target,
      title: "AI Does the Filtering For You",
      description: "No more sifting through bad-fit inquiries. Our AI matches you with cases in your practice area and jurisdiction."
    },
    {
      icon: Eye,
      title: "Level the Playing Field",
      description: "Solo and small firms: finally compete with big firms on visibility—without the marketing budget."
    },
    {
      icon: DollarSign,
      title: "Pay for Results, Not Marketing",
      description: "No retainers, no long contracts. Just pay per lead when you're ready. You're in control."
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            For Attorneys: Stop Waiting. Start Growing.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Finally, a lead generation system that works for lawyers who don't have time to waste
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index} 
                className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
};