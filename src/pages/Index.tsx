import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { ExampleChatWidget } from "@/components/ExampleChatWidget";
import { TrustBadges } from "@/components/TrustBadges";
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
import { CollapsibleSections } from "@/components/CollapsibleSections";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { OrganizationSchema, WebSiteSchema, LegalServiceSchema } from "@/components/StructuredData";

// Force rebuild - 2024-11-22
const Index = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(true);

  useEffect(() => {
    // Check for URL param
    const urlParams = new URLSearchParams(window.location.search);
    const chatParam = urlParams.get('chat');
    
    // Set up auth listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      
      // Auto-navigate to chat if user just logged in
      if (session?.user) {
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("profile_completed")
            .eq("id", session.user.id)
            .single();
          
          setProfileCompleted(profile?.profile_completed || false);
          
          // Show chat for logged in users with chat param
          if (chatParam === 'true') {
            setShowChat(true);
          }
        }, 0);
      }
    });
    
    // Then check existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      // Check profile completion status
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("profile_completed")
          .eq("id", session.user.id)
          .single();
        
        setProfileCompleted(profile?.profile_completed || false);
      }
      
      // Auto-show chat if user is logged in and chat param is set
      if (session?.user && chatParam === 'true') {
        setShowChat(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (!user) {
      navigate("/auth");
    } else {
      setShowChat(true);
    }
  };

  return (
    <ErrorBoundary>
      <OrganizationSchema />
      <WebSiteSchema />
      <LegalServiceSchema />
      <Helmet>
        <title>Legal Compass - Free AI Legal Consultation | Connect with Verified Attorneys</title>
        <meta name="description" content="Get free AI-powered legal guidance instantly. Ask questions, analyze your case, and connect with verified attorneys. Start your free consultation - no credit card required." />
        <meta name="keywords" content="free legal help, AI legal consultation, free legal advice, legal aid, affordable lawyer, free case analysis, legal templates, connect with attorneys, free legal guidance" />
        <link rel="canonical" href="https://legalcompass.shop/" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Legal Compass - Free AI Legal Consultation" />
        <meta property="og:description" content="Get instant AI-powered legal guidance for free. Analyze your case, ask questions, and connect with verified attorneys. Start your free consultation today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/" />
        <meta property="og:image" content="https://legalcompass.shop/icon-512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Legal Compass - Free AI Legal Consultation" />
        <meta name="twitter:description" content="Get instant AI-powered legal guidance for free. Analyze your case and connect with verified attorneys." />
        <meta name="twitter:image" content="https://legalcompass.shop/icon-512.png" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://ifsckryvwehynahixmro.supabase.co" />
        <link rel="dns-prefetch" href="https://ifsckryvwehynahixmro.supabase.co" />
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
              {/* Profile Completion Alert */}
              {user && !profileCompleted && (
                <div className="max-w-7xl mx-auto px-4 pt-6">
                  <Alert className="border-accent bg-accent/10">
                    <AlertCircle className="h-4 w-4 text-accent" />
                    <AlertDescription className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-sm">Complete your profile to get the most out of Legal Compass</span>
                      <Button
                        onClick={() => navigate("/profile-settings")}
                        size="sm"
                        variant="default"
                      >
                        Complete Profile Here
                      </Button>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
              
              <Hero onGetStarted={handleGetStarted} />
              
              {/* Collapsible Sections */}
              <CollapsibleSections />
              
              {/* Floating CTA & Scroll to Top */}
              <FloatingCTA />
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
