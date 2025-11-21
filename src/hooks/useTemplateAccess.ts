import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TemplateAccessResult {
  hasAccess: boolean;
  isLawyer: boolean;
  isSubscribed: boolean;
  freeTemplatesRemaining: number;
  loading: boolean;
  checkAccess: (templateId: string) => Promise<boolean>;
  recordUsage: (templateId: string) => Promise<void>;
}

export const useTemplateAccess = (): TemplateAccessResult => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLawyer, setIsLawyer] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [freeTemplatesRemaining, setFreeTemplatesRemaining] = useState(1);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkUserAccess();
  }, []);

  const checkUserAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Check if user is a lawyer
      const { data: lawyerProfile } = await supabase
        .from("lawyer_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      setIsLawyer(!!lawyerProfile);

      // Check subscription status for both clients and lawyers
      const { data: subscription } = await supabase
        .from("user_subscriptions")
        .select("status")
        .eq("user_id", user.id)
        .single();

      const isActive = subscription?.status === "active";
      setIsSubscribed(isActive);

      // If subscribed (client or lawyer), they have unlimited access
      if (isActive) {
        setHasAccess(true);
        setFreeTemplatesRemaining(999); // Unlimited
        setLoading(false);
        return;
      }

      // Count template usage for free users (1 free template)
      const { data: usageData, error } = await supabase
        .from("template_usage")
        .select("id")
        .eq("user_id", user.id);

      if (error) throw error;

      const used = usageData?.length || 0;
      const remaining = Math.max(0, 1 - used);
      
      setFreeTemplatesRemaining(remaining);
      setHasAccess(remaining > 0);
      setLoading(false);
    } catch (error) {
      console.error("Error checking template access:", error);
      setLoading(false);
    }
  };

  const checkAccess = async (templateId: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to download templates",
          variant: "destructive",
        });
        return false;
      }

      // Subscribers have unlimited access
      if (isSubscribed) {
        return true;
      }

      // Check if already used this specific template
      const { data: existingUsage } = await supabase
        .from("template_usage")
        .select("id")
        .eq("user_id", user.id)
        .eq("template_id", templateId)
        .single();

      if (existingUsage) {
        return true; // Already downloaded this template
      }

      // Check total usage (1 free template)
      const { data: usageData } = await supabase
        .from("template_usage")
        .select("id")
        .eq("user_id", user.id);

      const used = usageData?.length || 0;

      if (used >= 1) {
        toast({
          title: "Free template used",
          description: "Subscribe to get unlimited access to all templates",
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking template access:", error);
      return false;
    }
  };

  const recordUsage = async (templateId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Don't record usage for subscribers
      if (isSubscribed) return;

      await supabase.from("template_usage").insert({
        user_id: user.id,
        template_id: templateId,
        downloaded_at: new Date().toISOString(),
      });

      // Refresh access status
      await checkUserAccess();
    } catch (error) {
      console.error("Error recording template usage:", error);
    }
  };

  return {
    hasAccess,
    isLawyer,
    isSubscribed,
    freeTemplatesRemaining,
    loading,
    checkAccess,
    recordUsage,
  };
};
