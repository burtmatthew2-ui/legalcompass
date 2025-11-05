import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionStatus {
  subscribed: boolean;
  product_id: string | null;
  subscription_end: string | null;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setSubscription({ subscribed: false, product_id: null, subscription_end: null });
        setLoading(false);
        return;
      }

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Subscription check timeout')), 5000)
      );

      const checkPromise = supabase.functions.invoke('check-subscription');

      const { data, error } = await Promise.race([checkPromise, timeoutPromise]) as any;
      
      if (error) throw error;
      
      setSubscription(data);
      setLoading(false);
    } catch (error) {
      console.error('Error checking subscription:', error);
      // Don't block UI - set default state and continue
      setSubscription({ subscribed: false, product_id: null, subscription_end: null });
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();

    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(() => {
      checkSubscription();
    });

    return () => authSubscription.unsubscribe();
  }, []);

  return { subscription, loading, checkSubscription };
};
