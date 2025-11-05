import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [debugMessage, setDebugMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    
    // Debug timeout
    const debugTimer = setTimeout(() => {
      if (mounted && loading) {
        setDebugMessage("Still loading after 3 seconds - checking auth...");
        console.log("ProtectedRoute: Still loading, checking session...");
        supabase.auth.getSession().then(({ data }) => {
          console.log("ProtectedRoute debug: Session =", data.session ? "exists" : "null");
        });
      }
    }, 3000);

    // Check current session first
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("ProtectedRoute: Initial session check =", session ? "logged in" : "not logged in");
      if (mounted) {
        setAuthenticated(!!session);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("ProtectedRoute: Auth state changed, event =", event, "session =", session ? "exists" : "null");
      if (mounted) {
        setAuthenticated(!!session);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(debugTimer);
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-background via-background to-primary/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        {debugMessage && (
          <p className="text-sm text-muted-foreground">{debugMessage}</p>
        )}
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
