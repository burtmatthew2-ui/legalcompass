import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass, LogIn, LogOut, Menu, LayoutDashboard, Settings, User as UserIcon, UserCog } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { User } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useUserRole } from "@/hooks/useUserRole";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useAdminStatus();
  const { role } = useUserRole();

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
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Compass className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Legal Compass</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                onClick={() => navigate("/faq")}
                variant="ghost"
                className="text-muted-foreground hover:text-primary font-medium"
              >
                FAQ
              </Button>
              <Button
                onClick={() => {
                  if (window.location.pathname === '/') {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#how-it-works');
                  }
                }}
                variant="ghost"
                className="text-muted-foreground hover:text-primary font-medium"
              >
                How It Works
              </Button>
              <Button
                onClick={() => navigate("/templates")}
                variant="ghost"
                className="text-muted-foreground hover:text-primary font-medium"
              >
                Templates
              </Button>
              <Button
                onClick={() => navigate("/find-lawyers")}
                variant="ghost"
                className="text-muted-foreground hover:text-primary font-medium"
              >
                Find Lawyers
              </Button>
              <Button
                onClick={() => navigate("/resources")}
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
              >
                Resources
              </Button>
              <Button
                onClick={() => navigate("/pricing")}
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
              >
                Pricing
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/faq");
                    }}
                    variant="ghost"
                    className="justify-start"
                  >
                    FAQ
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (window.location.pathname === '/') {
                        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        navigate('/#how-it-works');
                      }
                    }}
                    variant="ghost"
                    className="justify-start"
                  >
                    How It Works
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/templates");
                    }}
                    variant="ghost"
                    className="justify-start"
                  >
                    Templates
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/find-lawyers");
                    }}
                    variant="ghost"
                    className="justify-start"
                  >
                    Find Lawyers
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/resources");
                    }}
                    variant="ghost"
                    className="justify-start"
                  >
                    Resources
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/pricing");
                    }}
                    variant="ghost"
                    className="justify-start"
                  >
                    Pricing
                  </Button>
                  {user && (
                    <>
                      <div className="border-t my-2" />
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (role === "attorney") {
                            navigate("/attorney-dashboard");
                          } else if (role === "client") {
                            navigate("/client-dashboard");
                          } else {
                            navigate("/dashboard");
                          }
                        }}
                        variant="ghost"
                        className="justify-start"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate("/profile-settings");
                        }}
                        variant="ghost"
                        className="justify-start"
                      >
                        <UserCog className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                      {isAdmin && (
                        <Button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            navigate("/admin");
                          }}
                          variant="ghost"
                          className="justify-start"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Admin
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            
            {/* User Menu - Desktop Only */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex border-border hover:bg-muted"
                  >
                    <UserIcon className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    if (role === "attorney") {
                      navigate("/attorney-dashboard");
                    } else if (role === "client") {
                      navigate("/client-dashboard");
                    } else {
                      navigate("/dashboard");
                    }
                  }}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile-settings")}>
                    <UserCog className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                size="sm"
                className="hidden lg:flex bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <LogIn className="w-4 h-4 sm:mr-2" />
                <span>Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
