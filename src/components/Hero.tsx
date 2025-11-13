import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Compass, Scale, Shield, FileText, Globe, Bell, Settings, CheckCircle } from "lucide-react";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { TrustBadges } from "./TrustBadges";
import { NewsletterSignup } from "./NewsletterSignup";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import type { User } from "@/types/user";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { isAdmin } = useAdminStatus();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {user && isAdmin && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            size="sm"
            className="bg-white border-slate-300 hover:bg-slate-50 font-medium"
          >
            <Settings className="h-4 w-4 mr-2" />
            Admin Dashboard
          </Button>
        </div>
      )}
      
      <div className="flex items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Main Hero Section */}
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center justify-center mb-2">
              <Compass className="w-14 h-14 text-primary animate-pulse" />
            </div>

            {/* Confidentiality Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/5 border border-primary/20 rounded-full hover-scale">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">100% Confidential & Private</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-primary to-slate-700 leading-tight max-w-5xl mx-auto">
              Your Legal Compass in Uncertain Times
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              <span className="font-semibold text-primary">Professional legal research</span> meets <span className="font-semibold text-primary">accessible guidance</span>—powerful tools for every legal journey.
              <span className="block mt-4 text-xl font-medium text-slate-800">Clear answers. Real support. Bar-level AI expertise.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white text-lg font-bold px-12 py-7 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover-scale"
              >
                {user ? "Get Instant Answers" : "Try 3 Questions Free"}
              </Button>
              {!user && (
                <Button
                  onClick={() => navigate("/auth")}
                  size="lg"
                  variant="outline"
                  className="text-lg font-semibold px-12 py-7 rounded-xl border-2 border-slate-300 hover:bg-slate-50 hover:border-primary transition-all duration-300"
                >
                  Sign In
                </Button>
              )}
              <Button
                onClick={() => navigate("/resources")}
                size="lg"
                variant="outline"
                className="text-lg font-semibold px-12 py-7 rounded-xl border-2 border-slate-300 hover:bg-slate-50 hover:border-primary transition-all duration-300"
              >
                <FileText className="w-5 h-5 mr-2" />
                Legal Resources
              </Button>
            </div>
            <p className="text-base text-slate-600 text-center font-medium">
              <span className="text-green-600 font-bold">Always free to explore</span> • 3 free AI consultations • Then <span className="line-through text-slate-400">$9.99</span> <span className="font-bold text-2xl text-accent">$4.99/month</span> <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-bold ml-2">50% OFF</span> • Cancel anytime
            </p>
          </div>

          {/* What You Actually Get */}
          <div className="bg-gradient-to-br from-white via-primary/5 to-white border-2 border-primary/20 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-slate-900">
              Bar-Level AI Legal Research Platform
            </h2>
            <p className="text-center text-lg text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold text-primary">Sophisticated research tools</span> meet <span className="font-bold text-primary">intuitive guidance</span>—because <span className="italic">everyone deserves access to justice</span>
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-900">Multi-Jurisdiction Research</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Search across all 50 US states, federal law, EU (all 27 member states), UK, Canada, Australia, and New Zealand
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-900">Case Law Comparison</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Compare how different jurisdictions handle the same legal issue with direct citations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-900">Legal Memo Drafts</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Generate professional legal memoranda with proper citations and analysis structure
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Bell className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-900">Regulatory Updates</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Stay informed about recent law changes and upcoming regulations that might affect your situation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-900">Direct Source Links</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Every citation links directly to the official source (Cornell Law, Congress.gov, EUR-Lex, etc.)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-lg border border-blue-100">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-primary">100% Private & Confidential</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Your conversations are completely isolated and encrypted—we never share your data with anyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 text-center text-lg">How This Platform Works</h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p><strong>AI-Powered Research:</strong> Uses advanced AI to search legal databases and provide relevant information</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p><strong>Educational Only:</strong> Provides information to help you understand legal concepts, not legal advice</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p><strong>Not a Law Firm:</strong> We don't practice law or represent clients—we help you research and understand</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p><strong>Attorney Connection:</strong> We can help you find qualified attorneys when you need professional representation</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p><strong>Verify Everything:</strong> Always verify legal information with official sources and consult an attorney for your specific situation</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p><strong>Privacy First:</strong> Your searches and conversations are completely private and encrypted—we never share your data</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 text-center max-w-2xl mx-auto leading-relaxed pt-4 border-t border-slate-200">
                  <strong className="text-slate-900 font-semibold">Transparency Note:</strong> Legal Compass is a legal research platform, not a substitute for a licensed attorney. 
                  Our AI provides educational information based on publicly available legal resources. For specific legal advice tailored to your situation, 
                  always consult with a qualified lawyer in your jurisdiction.
                </p>
              </div>
            </div>
          </div>

          {/* Simple Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white border border-slate-200 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-3">80+</div>
              <p className="text-sm text-slate-700 font-medium">
                Jurisdictions
              </p>
              <p className="text-xs text-slate-500 mt-2">All 50 US States + International</p>
            </div>
            <div className="text-center p-6 bg-white border border-slate-200 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-3">24/7</div>
              <p className="text-sm text-slate-700 font-medium">Instant Access</p>
              <p className="text-xs text-slate-500 mt-2">Available anytime, anywhere</p>
            </div>
            <div className="text-center p-6 bg-white border border-slate-200 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-3">100%</div>
              <p className="text-sm text-slate-700 font-medium">Private & Secure</p>
              <p className="text-xs text-slate-500 mt-2">Encrypted conversations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter Signup */}
      <div className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <NewsletterSignup />
        </div>
      </div>

      {/* FAQ */}
      <FAQ />
    </div>
  );
};
