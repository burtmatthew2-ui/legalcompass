import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Compass, Shield } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptedTos, setAcceptedTos] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [userType, setUserType] = useState<"client" | "attorney">("client");

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Fetch user role and redirect accordingly
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();
        
        if (roleData?.role === "attorney") {
          navigate("/attorney-dashboard");
        } else if (roleData?.role === "client") {
          navigate("/client-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();
        
        if (roleData?.role === "attorney") {
          navigate("/attorney-dashboard");
        } else if (roleData?.role === "client") {
          navigate("/client-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      const validation = authSchema.safeParse({ email, password });
      if (!validation.success) {
        const firstError = validation.error.errors[0];
        toast.error(firstError.message);
        setLoading(false);
        return;
      }

      // Check TOS acceptance for signup
      if (!isLogin && !acceptedTos) {
        toast.error("You must accept the Terms of Service to create an account");
        setLoading(false);
        return;
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) {
          // Provide user-friendly error messages
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else if (error.message.includes("Email not confirmed")) {
            toast.error("Please confirm your email before signing in");
          } else {
            toast.error(error.message);
          }
          setLoading(false);
          return;
        }
        toast.success("Welcome back! Your data is encrypted and secure.");
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) {
          // Provide user-friendly error messages
          if (error.message.includes("already registered")) {
            toast.error("This email is already registered. Please sign in instead.");
          } else {
            toast.error(error.message);
          }
          setLoading(false);
          return;
        }

        // If user opted in for newsletter, subscribe them
        if (subscribeNewsletter) {
          try {
            const { error: newsletterError } = await supabase
              .from('newsletter_signups')
              .insert({ email: email.trim(), source: 'signup' });
            
            if (!newsletterError) {
              // Send newsletter confirmation
              await supabase.functions.invoke('send-newsletter-confirmation', {
                body: { email: email.trim() }
              });
            }
          } catch (newsletterError) {
            // Don't block signup if newsletter fails
            console.error('Newsletter signup error:', newsletterError);
          }
        }

        toast.success("Account created! Please check your email to verify your account before signing in.", {
          duration: 6000
        });
        setIsLogin(true);
        setPassword("");
        setAcceptedTos(false);
        setSubscribeNewsletter(false);
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-card border-white/10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-primary">
              <Compass className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Sign in to access your legal research"
              : "Get started with your legal research assistant"}
          </CardDescription>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <Shield className="h-3 w-3" />
            <span>Encrypted • Private • Secure</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Must be 8+ characters with uppercase, lowercase, and special character
              </p>
            </div>
            
            {!isLogin && (
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="tos" 
                    checked={acceptedTos}
                    onCheckedChange={(checked) => setAcceptedTos(checked as boolean)}
                    className="mt-1"
                  />
                  <label
                    htmlFor="tos"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    I accept the{" "}
                    <a
                      href="/terms-of-service"
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-destructive ml-1">*</span>
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="newsletter" 
                    checked={subscribeNewsletter}
                    onCheckedChange={(checked) => setSubscribeNewsletter(checked as boolean)}
                    className="mt-1"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm leading-relaxed cursor-pointer text-muted-foreground"
                  >
                    Subscribe to our newsletter for legal tips and updates (optional)
                  </label>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
