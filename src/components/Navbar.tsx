import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass, LogIn, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { User } from "@/types/user";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Compass className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-slate-900">Legal Compass</span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              onClick={() => {
                if (window.location.pathname === '/') {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/#how-it-works');
                }
              }}
              variant="ghost"
              className="hidden md:flex text-slate-700 hover:text-primary font-medium"
            >
              How It Works
            </Button>
            <Button
              onClick={() => navigate("/templates")}
              variant="ghost"
              className="hidden sm:flex text-slate-700 hover:text-primary font-medium"
            >
              Templates
            </Button>
            <Button
              onClick={() => navigate("/find-lawyers")}
              variant="ghost"
              className="text-slate-700 hover:text-primary font-medium text-sm sm:text-base"
            >
              Find Lawyers
            </Button>
            <Button
              onClick={() => navigate("/resources")}
              variant="ghost"
              className="hidden lg:flex text-slate-700 hover:text-primary"
            >
              Resources
            </Button>
            <Button
              onClick={() => navigate("/pricing")}
              variant="ghost"
              className="hidden md:flex text-slate-700 hover:text-primary"
            >
              Pricing
            </Button>
            
            {user ? (
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-slate-300 hover:bg-slate-50"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <LogIn className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
