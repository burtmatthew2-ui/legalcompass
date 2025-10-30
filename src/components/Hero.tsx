import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Compass, Scale, Shield, FileText, Globe, Bell, Settings, CheckCircle } from "lucide-react";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { TrustBadges } from "./TrustBadges";
import { useAdminStatus } from "@/hooks/useAdminStatus";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {user && isAdmin && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            size="sm"
            className="bg-card/90 backdrop-blur-sm border-primary/30 hover:bg-primary/10"
          >
            <Settings className="h-4 w-4 mr-2" />
            Admin Dashboard
          </Button>
        </div>
      )}
      <div className="flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Main Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center mb-4">
              <Compass className="w-16 h-16 text-primary" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
              Professional Legal Research,
              <span className="block text-primary mt-2">Made Accessible</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We've built a legal research assistant that gives you access to the same tools used by law firms—without the complexity or cost.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Try It For Free
              </Button>
              <p className="text-sm text-muted-foreground">
                3 free questions • Then $9.99/month
              </p>
            </div>
          </div>

          {/* What You Actually Get */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              What You're Actually Getting
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Comprehensive Multi-Jurisdiction Research</h3>
                    <p className="text-sm text-muted-foreground">
                      Search across all 50 US states, federal law, EU (all 27 member states), UK, Canada, Australia, and New Zealand—the most comprehensive legal research coverage available
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Case Law Comparison</h3>
                    <p className="text-sm text-muted-foreground">
                      Compare how different states or countries handle the same legal issue with direct citations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Legal Memo Drafts</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate professional legal memoranda with proper citations and analysis structure
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Bell className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Regulatory Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Stay informed about recent law changes and upcoming regulations that might affect your situation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Direct Source Links</h3>
                    <p className="text-sm text-muted-foreground">
                      Every citation links directly to the official source (Cornell Law, Congress.gov, EUR-Lex, etc.)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Private & Confidential</h3>
                    <p className="text-sm text-muted-foreground">
                      Your conversations are completely isolated and encrypted—we never share data between users
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
                <strong className="text-foreground">Important:</strong> This tool provides research and information to help you understand legal issues. 
                It's not a replacement for a licensed attorney—for specific legal advice, always consult with a lawyer in your jurisdiction.
              </p>
            </div>
          </div>

          {/* Simple Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">80+</div>
              <p className="text-sm text-muted-foreground">
                Jurisdictions Covered
                <span className="block text-xs mt-1">(All 50 US States + International)</span>
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Instant Access</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Private & Secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />
    </div>
  );
};
