import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email with zod
    const emailSchema = z.object({
      email: z.string().trim().email("Invalid email address").max(255, "Email too long")
    });

    const validation = emailSchema.safeParse({ email: email.trim() });
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_signups')
        .insert({
          email: validation.data.email,
          source: 'newsletter'
        });

      if (error) {
        if (error.message.includes('duplicate')) {
          toast.error("You're already subscribed to our newsletter!");
        } else {
          throw error;
        }
      } else {
        toast.success("Thanks for subscribing! Check your inbox for legal tips.");
        setEmail("");
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get monthly legal tips, AI insights, and updates from Legal Compass
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-[250px]"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
};