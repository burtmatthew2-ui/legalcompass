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
          .maybeSingle();
        
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
          .maybeSingle();
        
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
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Email not confirmed")) {
            toast.error("Please check your email to verify your account");
          } else if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(error.message);
          }
          return;
        }

        if (data.user) {
          toast.success("Welcome back!");
        }
      } else {
        // Sign up flow
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (signUpError) {
          if (signUpError.message.includes("already registered")) {
            toast.error("An account with this email already exists. Please log in.");
          } else {
            toast.error(signUpError.message);
          }
          return;
        }

        if (data.user) {
          // Create user role based on selection
          const { error: roleError } = await supabase
            .from("user_roles")
            .insert({
              user_id: data.user.id,
              role: userType,
            });

          if (roleError) {
            console.error("Error creating user role:", roleError);
          }

          // Send welcome email
          try {
            await supabase.functions.invoke('send-welcome-email', {
              body: { 
                email: data.user.email!,
                userType: userType
              }
            });
          } catch (error) {
            console.error("Welcome email error:", error);
            // Don't block signup if email fails
          }

          // Subscribe to newsletter if checkbox was checked
          if (subscribeNewsletter) {
            try {
              await supabase
                .from('newsletter_signups')
                .insert({
                  email: data.user.email!,
                  name: "",
                  source: 'signup'
                });

              // Send confirmation email
              await supabase.functions.invoke('send-newsletter-confirmation', {
                body: { email: data.user.email! }
              });
            } catch (error) {
              console.error("Newsletter subscription error:", error);
              // Don't block signup if newsletter fails
            }
          }

          toast.success("Account created! Check your email for a welcome message!");
          setIsLogin(true); // Switch to login mode
          setPassword(""); // Clear password for security
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "An unexpected error occurred");
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
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>I am signing up as:</Label>
                  <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "client" | "attorney")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="client" id="client" />
                      <Label htmlFor="client" className="cursor-pointer font-normal">
                        Client - I need legal help
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="attorney" id="attorney" />
                      <Label htmlFor="attorney" className="cursor-pointer font-normal">
                        Attorney - I want to offer legal services
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

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
