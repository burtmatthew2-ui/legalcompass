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

const Index = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(true);

  useEffect(() => {
    // Check for URL param
    const urlParams = new URLSearchParams(window.location.search);
    const chatParam = urlParams.get('chat');
    
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
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl text-foreground">Legal Compass - Test Page</h1>
      <p className="text-2xl text-foreground mt-4">If you can see this, React is working</p>
      <p className="text-xl text-muted-foreground mt-4">Preview test in progress...</p>
    </div>
  );
};

export default Index;
