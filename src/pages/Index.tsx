import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/Hero";
import { ChatInterface } from "@/components/ChatInterface";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {showChat ? (
          <ChatInterface onBack={() => setShowChat(false)} />
        ) : (
          <Hero onGetStarted={handleGetStarted} />
        )}
      </div>
      {!showChat && <Footer />}
    </div>
  );
};

export default Index;
