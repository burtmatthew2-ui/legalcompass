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
    <section className="py-16 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How LegalCompass Connects You With a Lawyer
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Simple, transparent, and designed to match you with the right legal help
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <step.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-center text-slate-700">
            <strong className="text-primary">100% Risk-Free:</strong> Submitting your case is completely free. 
            You're never charged unless you choose to work with an attorney.
          </p>
        </div>
      </div>
    </section>
  );
};