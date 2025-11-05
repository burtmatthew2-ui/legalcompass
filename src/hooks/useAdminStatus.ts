import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logger";

export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => {
        checkAdminStatus();
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      logger.log("🔍 Admin check - User:", user?.email, "Error:", userError);
      
      if (!user) {
        logger.log("❌ No user found");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      logger.log("🔍 Admin check - User ID:", user.id);
      logger.log("🔍 Admin check - Role data:", roleData, "Error:", roleError);
      logger.log("✅ Is Admin:", !!roleData);
      
      setIsAdmin(!!roleData);
    } catch (error) {
      logger.error("❌ Admin check error:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAdmin, loading };
};
