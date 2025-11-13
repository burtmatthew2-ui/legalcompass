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
        <div className="max-w-6xl w-full space-y-12">
          {/* Main Hero Content */}
          <div className="text-center space-y-6">
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
              Connect with verified lawyers, get AI-powered legal research, and access professional tools—all in one platform
            </p>

            {/* New Features Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6">
              <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <Scale className="w-6 h-6 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm mb-1">For Individuals</h3>
                <p className="text-xs text-muted-foreground">$4.99/mo for personalized case briefs & lawyer matching</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <Compass className="w-6 h-6 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm mb-1">For Lawyers</h3>
                <p className="text-xs text-muted-foreground">Pay-per-lead model with verified client cases</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <Bell className="w-6 h-6 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm mb-1">Smart Matching</h3>
                <p className="text-xs text-muted-foreground">Compare lawyers, view profiles & ratings before choosing</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {user ? (
                <>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => navigate('/get-started')}
                  >
                    Find an Attorney
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-2"
                    onClick={onGetStarted}
                  >
                    Chat with AI
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => navigate('/get-started')}
                  >
                    Get Started Now
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-2"
                    onClick={() => navigate('/lawyer-signup')}
                  >
                    Join as a Lawyer
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

      {/* Testimonials Section */}
      <div className="py-16 bg-slate-50">
        <Testimonials />
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