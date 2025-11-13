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
        <div className="fixed top-20 right-4 z-40">
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            size="sm"
            className="bg-white border-slate-300 hover:bg-slate-50 font-medium shadow-lg"
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
              Legal Guidance for Everyone
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              <span className="font-semibold text-primary">Individuals:</span> Get AI-powered legal help, submit cases, and connect with verified lawyers for just <span className="font-bold text-accent">$4.99/month</span>
            </p>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mt-2">
              <span className="font-semibold text-primary">Lawyers:</span> Access pre-qualified leads in your practice area. Pay only for leads you choose—no subscriptions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                onClick={() => navigate("/get-started")}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white text-lg font-bold px-12 py-7 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover-scale"
              >
                Get Started
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
          </div>

          {/* Dual Portal Features */}
          <div className="bg-gradient-to-br from-white via-primary/5 to-white border-2 border-primary/20 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-slate-900">
              Choose Your Path
            </h2>
            <p className="text-center text-lg text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Whether you need legal help or you are a lawyer looking for clients, Legal Compass connects you.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Individual Users Section */}
              <div className="bg-white border-2 border-primary/30 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-slate-900">For Individuals</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">Submit unlimited legal cases with AI-generated Snapshot Briefs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">Get matched with verified lawyers in your state</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">Download your case summaries as PDFs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">Access AI legal research across 80+ jurisdictions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">Free legal templates and document hub</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center mb-4">
                    <p className="text-sm text-slate-600">Just</p>
                    <p className="text-3xl font-bold text-accent">$4.99<span className="text-lg text-slate-600">/month</span></p>
                    <p className="text-sm text-slate-500 line-through">Regular $9.99/month</p>
                  </div>
                  <Button 
                    onClick={() => navigate("/get-started")}
                    className="w-full"
                    size="lg"
                  >
                    Submit a Case
                  </Button>
                </div>
              </div>

              {/* Lawyers Section */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                  <h3 className="text-2xl font-bold">For Lawyers</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Access pre-qualified leads in your practice areas</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">AI-verified credentials for instant approval</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Email notifications for new matching leads</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Only pay for leads you choose to purchase</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm">No monthly subscriptions or hidden fees</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="text-center mb-4">
                    <p className="text-sm text-slate-300">Pay per lead</p>
                    <p className="text-3xl font-bold text-accent">$50-$90</p>
                    <p className="text-sm text-slate-400">Based on case urgency</p>
                  </div>
                  <Button 
                    onClick={() => navigate("/get-started")}
                    variant="secondary"
                    className="w-full bg-accent hover:bg-accent/90 text-slate-900"
                    size="lg"
                  >
                    Join as a Lawyer
                  </Button>
                </div>
              </div>
            </div>

            {/* Platform Features */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-2xl font-bold text-center mb-8 text-slate-900">Complete Legal Platform</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Globe className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-bold text-slate-900">Multi-Jurisdiction</h4>
                  <p className="text-sm text-slate-600">80+ jurisdictions including all US states, EU, UK, Canada, Australia</p>
                </div>

                <div className="space-y-2">
                  <FileText className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-bold text-slate-900">AI Snapshot Briefs</h4>
                  <p className="text-sm text-slate-600">Automated case summaries with legal analysis and citations</p>
                </div>

                <div className="space-y-2">
                  <Shield className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-bold text-slate-900">Verified Lawyers</h4>
                  <p className="text-sm text-slate-600">AI-verified bar credentials ensure legitimate professionals</p>
                </div>
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
