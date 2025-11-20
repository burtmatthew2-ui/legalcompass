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
import { HowLawyerMatchingWorks } from "@/components/HowLawyerMatchingWorks";
import { WhyLawyersUse } from "@/components/WhyLawyersUse";
import { MissionStatement } from "@/components/MissionStatement";
import { WhatMakesUsDifferent } from "@/components/WhatMakesUsDifferent";
import { InternalLinks } from "@/components/InternalLinks";
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
        <title>Legal Compass - Cheapest Legal Aid $4.99/month | 75% Cheaper Than Competitors</title>
        <meta name="description" content="Get unlimited legal help for just $4.99/month - 4x cheaper than AI Lawyer ($19.99), 6x cheaper than LegalSifter ($29). The most affordable legal assistance in 2025. Try 3 questions free!" />
        <meta name="keywords" content="cheap legal help, affordable legal aid, cheapest legal assistance, low cost legal services, budget legal advice, legal help under $5, cheap AI lawyer, inexpensive legal aid, affordable legal consultation" />
        <link rel="canonical" href="https://legalcompass.shop/" />
        <meta property="og:title" content="Legal Compass - Cheapest Legal Aid at $4.99/month" />
        <meta property="og:description" content="The most affordable legal assistance in 2025. 75% cheaper than competitors with MORE features. Unlimited AI legal help for less than a coffee." />
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
              
              {/* How Lawyer Matching Works */}
              <HowLawyerMatchingWorks />
              
              {/* Why Lawyers Use LegalCompass */}
              <WhyLawyersUse />
              
              {/* Mission Statement */}
              <MissionStatement />
              
              {/* What Makes Us Different */}
              <WhatMakesUsDifferent />
              
              {/* Legal Direction Finder - Interactive Quiz */}
              <div id="direction-finder">
                <LegalDirectionFinder />
              </div>
              
              {/* Document Hub - Free Templates */}
              <DocumentHub />
              
              {/* Local Help Finder */}
              <div id="local-help">
                <LocalHelpFinder />
              </div>
              
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
              
              {/* Why Lawyers Use Legal Compass */}
              <WhyLawyersUse />
              
              {/* Mission Statement */}
              <MissionStatement />
            </>
          )}
        </main>
        {!showChat && <InternalLinks />}
        {!showChat && <Footer />}
      </div>
    </ErrorBoundary>
  );
};

export default Index;
