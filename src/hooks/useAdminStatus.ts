import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log("🔍 Admin check - User:", user?.email, "Error:", userError);
      
      if (!user) {
        console.log("❌ No user found");
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

      console.log("🔍 Admin check - User ID:", user.id);
      console.log("🔍 Admin check - Role data:", roleData, "Error:", roleError);
      console.log("✅ Is Admin:", !!roleData);
      
      setIsAdmin(!!roleData);
    } catch (error) {
      console.error("❌ Admin check error:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAdmin, loading };
};
