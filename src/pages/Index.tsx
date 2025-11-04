import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/Hero";
import { ChatInterface } from "@/components/ChatInterface";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navbar } from "@/components/Navbar";
import { LeadMagnetPopup } from "@/components/LeadMagnetPopup";
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
        <title>Legal Compass - AI Legal Research Tool | Affordable Legal Information</title>
        <meta name="description" content="Professional AI-powered legal research tool for everyone. Get instant legal information across all 50 US states and international jurisdictions. 3 free questions, then $4.99/month." />
        <meta name="keywords" content="legal research, AI legal tool, legal information, case law research, legal questions, affordable legal help, legal research platform" />
        <link rel="canonical" href="https://legalcompass.shop/" />
        <meta property="og:title" content="Legal Compass - AI Legal Research Tool" />
        <meta property="og:description" content="Professional legal research accessible to everyone. 80+ jurisdictions, case law citations, 24/7 access." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/" />
      </Helmet>
      <LeadMagnetPopup />
      <div className="min-h-screen flex flex-col">
        {!showChat && <Navbar />}
        <div className="flex-1">
          {showChat ? (
            <ChatInterface onBack={() => setShowChat(false)} />
          ) : (
            <Hero onGetStarted={handleGetStarted} />
          )}
        </div>
        {!showChat && <Footer />}
      </div>
    </ErrorBoundary>
  );
};

export default Index;
