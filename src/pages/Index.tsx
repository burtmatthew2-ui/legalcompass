import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/Hero";
import { ChatInterface } from "@/components/ChatInterface";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navbar } from "@/components/Navbar";
import { LeadMagnetPopup } from "@/components/LeadMagnetPopup";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<any>(null);

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
