import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TemplateAccessResult {
  hasAccess: boolean;
  isLawyer: boolean;
  isSubscribed: boolean;
  freeTemplatesUsed: number;
  loading: boolean;
  checkAccess: (templateId: string) => Promise<boolean>;
  recordUsage: (templateId: string) => Promise<void>;
}

export const useTemplateAccess = (): TemplateAccessResult => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLawyer, setIsLawyer] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [freeTemplatesUsed, setFreeTemplatesUsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkUserAccess();
  }, []);

  const checkUserAccess = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Check if user is a lawyer
      const { data: lawyerProfile } = await supabase
        .from("lawyer_profiles")
        .select("verified_status")
        .eq("user_id", user.id)
        .single();

      if (lawyerProfile?.verified_status) {
        setIsLawyer(true);
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Check user subscription (for template access)
      const { data: templateSubData } = await supabase.functions.invoke("check-template-subscription");
      
      if (!templateSubData?.error && templateSubData?.product_id) {
        setIsSubscribed(true);
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Check user subscription (for general Pro access)
      const { data: subData } = await supabase.functions.invoke("check-subscription");
      
      if (!subData?.error && subData?.subscribed) {
        setIsSubscribed(true);
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Count free templates used
      const { data: usageData, error: usageError } = await supabase
        .from("template_usage")
        .select("id")
        .eq("user_id", user.id);

      if (!usageError && usageData) {
        setFreeTemplatesUsed(usageData.length);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error checking template access:", error);
      setLoading(false);
    }
  };

  const checkAccess = async (templateId: string): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to download templates.",
        variant: "destructive",
      });
      return false;
    }

    // Subscribed users or lawyers always have access
    if (isSubscribed || isLawyer) {
      return true;
    }

    // Free users get 1 free template
    if (freeTemplatesUsed >= 1) {
      toast({
        title: "Free Limit Reached",
        description: "You've used your free template. Upgrade to access unlimited templates.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const recordUsage = async (templateId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Only record usage for non-subscribed, non-lawyer users
      if (!isSubscribed && !isLawyer) {
        const { error } = await supabase
          .from("template_usage")
          .insert({
            user_id: user.id,
            template_id: templateId,
          });

        if (!error) {
          setFreeTemplatesUsed(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error("Error recording template usage:", error);
    }
  };

  return {
    hasAccess,
    isLawyer,
    isSubscribed,
    freeTemplatesUsed,
    loading,
    checkAccess,
    recordUsage,
  };
};
