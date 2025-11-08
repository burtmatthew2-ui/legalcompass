import { MessageSquare, Search, CheckCircle } from "lucide-react";

export const HowItWorks = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
          How Legal Compass Works
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Get the legal help you need in three simple steps — no confusing jargon, no expensive retainers
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <div className="w-8 h-8 mx-auto bg-primary text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Tell Us What's Going On</h3>
            <p className="text-slate-600 leading-relaxed">
              Describe your situation in plain English. No legal jargon needed — just explain what's happening in your own words.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <div className="w-8 h-8 mx-auto bg-primary text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-slate-900">We Guide You to the Right Place</h3>
            <p className="text-slate-600 leading-relaxed">
              Our AI understands your issue and points you to relevant resources, forms, or local legal aid that can help.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="w-8 h-8 mx-auto bg-primary text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Get Real Answers & Help</h3>
            <p className="text-slate-600 leading-relaxed">
              Access free legal information, download templates, connect with affordable lawyers, or find free legal aid near you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
