import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[LIST-USERS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError) throw new Error(`Role check error: ${roleError.message}`);
    if (!roleData) {
      logStep("Access denied - user is not admin");
      throw new Error("Admin access required");
    }
    logStep("Admin access verified");

    // Fetch all user emails and creation dates
    const { data: profiles, error: profilesError } = await supabaseClient
      .from('profiles')
      .select('email, created_at')
      .order('created_at', { ascending: false });

    if (profilesError) throw new Error(`Error fetching profiles: ${profilesError.message}`);
    logStep("Profiles fetched", { count: profiles?.length });

    return new Response(JSON.stringify({ users: profiles }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in list-users", { message: errorMessage });
    
    // Sanitize error for client
    let userMessage = 'An error occurred';
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (errorMessage === "Admin access required") {
        userMessage = "Admin access required";
        statusCode = 403;
      } else if (errorMessage.toLowerCase().includes('unauthorized') || errorMessage.toLowerCase().includes('not authenticated')) {
        userMessage = 'Authentication required';
        statusCode = 401;
      }
    }
    
    return new Response(JSON.stringify({ error: userMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: statusCode,
    });
  }
});
