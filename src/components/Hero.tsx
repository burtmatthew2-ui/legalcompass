import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Compass, Scale, Shield, CheckCircle, Award, FileText, Globe, Bell } from "lucide-react";

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
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      {/* Admin Badge - Hidden on mobile */}
      {user && isAdmin && (
        <div className="hidden md:block fixed top-20 right-4 z-40">
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            size="sm"
            className="bg-white/95 backdrop-blur-sm border-slate-300 hover:bg-slate-50 font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <Award className="h-4 w-4 mr-2 text-primary" />
            Admin Dashboard
          </Button>
        </div>
      )}
      
      <div className="flex items-center justify-center px-3 md:px-4 py-12 md:py-16 lg:py-24">
        <div className="max-w-6xl w-full space-y-6 md:space-y-12">
          {/* Legal Disclaimer Banner */}
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-600 p-4 rounded-lg mx-auto max-w-4xl">
            <p className="text-sm text-yellow-900 dark:text-yellow-100 text-center">
              <strong>Important:</strong> Legal Compass provides general legal information and is not a substitute for professional legal advice from a licensed attorney.
            </p>
          </div>

          {/* Main Hero Content */}
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <Shield className="w-4 h-4" />
              100% Confidential & Private
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Professional Legal Guidance
              <br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                That's Actually Affordable
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              LegalCompass helps people understand legal issues, research laws using AI, and get matched with the right attorney when needed. Built for people who can't afford expensive consultations, giving you clarity before taking the next step.
            </p>

            {/* Who We Help Section */}
            <div className="bg-white rounded-2xl p-4 md:p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto mt-6 md:mt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Who We Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600">People who can't afford a lawyer yet</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600">People overwhelmed with legal information</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600">Users who need quick answers and guidance</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600">Anyone looking for the right attorney without upfront fees</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {user ? (
                <>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => navigate('/find-lawyers')}
                  >
                    Find a Lawyer
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-2"
                    onClick={onGetStarted}
                  >
                    AI Legal Chat
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                    onClick={onGetStarted}
                  >
                    Chat with AI
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-2"
                    onClick={() => navigate('/find-lawyers')}
                  >
                    Find a Lawyer
                  </Button>
                </>
              )}
            </div>

            <p className="text-sm text-slate-500 pt-2">
              No credit card required to start • Cancel anytime
            </p>
          </div>

          {/* Platform Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Case Management</h3>
              <p className="text-sm text-muted-foreground">Track your case progress, communicate securely with lawyers, and manage documents in one place</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Verified Lawyers</h3>
              <p className="text-sm text-muted-foreground">All attorneys are bar-verified with transparent profiles, ratings, and specializations</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Globe className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">AI Legal Research</h3>
              <p className="text-sm text-muted-foreground">Get instant legal guidance powered by advanced AI trained on multi-jurisdictional legal databases</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Bell className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-sm text-muted-foreground">Get notifications for messages, deadlines, court dates, and case status changes</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FAQ />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-12 bg-white">
        <TrustBadges />
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-gradient-to-br from-primary/10 to-blue-50">
        <div className="max-w-2xl mx-auto px-4">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
};