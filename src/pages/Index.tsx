import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/Hero";
import { ChatInterface } from "@/components/ChatInterface";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navbar } from "@/components/Navbar";
import { ToolsSidebar } from "@/components/ToolsSidebar";
import { LeadMagnetPopup } from "@/components/LeadMagnetPopup";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { InstantDemoWidget } from "@/components/InstantDemoWidget";
import { ComparisonTable } from "@/components/ComparisonTable";
import { LiveStatsCounter } from "@/components/LiveStatsCounter";
import { ExampleChatWidget } from "@/components/ExampleChatWidget";
import { TrustBadges } from "@/components/TrustBadges";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { LegalDirectionFinder } from "@/components/LegalDirectionFinder";
import { DocumentHub } from "@/components/DocumentHub";
import { LocalHelpFinder } from "@/components/LocalHelpFinder";
import { Helmet } from "react-helmet";
import type { User } from "@/types/user";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      // Auto-show chat if user is logged in and chat param is set
      if (session?.user && searchParams.get('chat') === 'true') {
        setShowChat(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [searchParams]);

  const handleGetStarted = () => {
    if (!user) {
      navigate("/auth");
    } else {
      setShowChat(true);
    }
  };

  return (
    <ErrorBoundary>
      <Helmet>
        <title>Legal Compass - Free Legal Help | Find Affordable Legal Assistance</title>
        <meta name="description" content="Free legal help for everyone. Find affordable lawyers, download free templates, get AI-powered legal guidance. Built for people who can't afford expensive legal fees." />
        <meta name="keywords" content="free legal help, affordable legal advice, legal aid, free legal templates, find lawyer, legal assistance, pro bono lawyers" />
        <link rel="canonical" href="https://legalcompass.shop/" />
        <meta property="og:title" content="Legal Compass - Free Legal Help for Everyone" />
        <meta property="og:description" content="Find free legal resources, affordable lawyers, and AI-powered guidance. Because everyone deserves access to justice." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/" />
      </Helmet>
      <ExitIntentPopup />
      <LeadMagnetPopup />
      <div className="min-h-screen flex flex-col">
        {!showChat && <Navbar />}
        {!showChat && <ToolsSidebar />}
        <main className="flex-1">
          {showChat ? (
            <ChatInterface onBack={() => setShowChat(false)} />
          ) : (
            <>
              <Hero onGetStarted={handleGetStarted} />
              
              {/* How It Works Section */}
              <div id="how-it-works">
                <HowItWorks />
              </div>
              
              {/* Live Stats - Social Proof */}
              <LiveStatsCounter />
              
              {/* Legal Direction Finder - Interactive Quiz */}
              <div id="tools">
                <LegalDirectionFinder />
              </div>
              
              {/* Document Hub - Free Templates */}
              <DocumentHub />
              
              {/* Local Help Finder */}
              <LocalHelpFinder />
              
              {/* Trust Badges */}
              <TrustBadges />
              
              {/* Instant Demo Widget */}
              <div className="py-12 px-6 bg-slate-50">
                <InstantDemoWidget />
              </div>
              
              {/* Example Chat */}
              <ExampleChatWidget />
              
              {/* Testimonials */}
              <Testimonials />
              
              {/* Comparison Table */}
              <div id="comparison">
                <ComparisonTable />
              </div>
            </>
          )}
        </main>
        {!showChat && <Footer />}
      </div>
    </ErrorBoundary>
  );
};

export default Index;
