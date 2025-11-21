import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ErrorLogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: Record<string, any>;
  stack?: string;
  userAgent?: string;
  url?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json() as { type: string; data: ErrorLogEntry };

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Try to get user from auth header if available
    let userId = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData } = await supabaseClient.auth.getUser(token);
        userId = userData.user?.id || null;
      } catch (err) {
        console.log("Could not extract user from token:", err);
      }
    }

    // Log error to console for immediate visibility
    console.error(`[${data.timestamp}] ${data.level.toUpperCase()}: ${data.message}`, {
      userId,
      url: data.url,
      context: data.context,
      stack: data.stack,
    });

    // Store in activity log for tracking
    if (type === 'error') {
      await supabaseClient.from('case_activity_log').insert({
        lead_id: '00000000-0000-0000-0000-000000000000', // Placeholder for system errors
        actor_id: userId || '00000000-0000-0000-0000-000000000000',
        actor_type: 'system',
        activity_type: 'error',
        description: data.message,
        metadata: {
          level: data.level,
          context: data.context,
          stack: data.stack,
          userAgent: data.userAgent,
          url: data.url,
          timestamp: data.timestamp,
        }
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Error logged" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in log-error function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        success: false 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
