import { FileSearch, UserCheck, MessageSquare, CheckCircle } from "lucide-react";

export const HowLawyerMatchingWorks = () => {
  const steps = [
    {
      icon: FileSearch,
      title: "Submit Your Legal Issue",
      description: "Describe your situation for free—no payment required to get started"
    },
    {
      icon: UserCheck,
      title: "AI Finds Suitable Attorneys",
      description: "Our AI reviews your case and matches you with qualified legal professionals"
    },
    {
      icon: MessageSquare,
      title: "Free Mini-Consultation",
      description: "Lawyers may offer a complimentary initial consultation to understand your needs"
    },
    {
      icon: CheckCircle,
      title: "Connect with Verified Professionals",
      description: "You only connect with pre-screened, verified attorneys ready to help"
    }
  ];

  return (
    <section className="py-8 md:py-16 px-4 md:px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            How LegalCompass Connects You With a Lawyer
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Simple, transparent, and designed to match you with the right legal help
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="relative p-4 md:p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-primary/5 rounded-xl border border-primary/20">
          <p className="text-center text-sm md:text-base">
            <strong className="text-primary">100% Risk-Free:</strong> Submitting your case is completely free. 
            You're never charged unless you choose to work with an attorney.
          </p>
        </div>
      </div>
    </section>
  );
};