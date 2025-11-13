import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CLOSE-CASE] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
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
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) throw new Error("Authentication failed");

    const user = userData.user;
    logStep("User authenticated", { userId: user.id });

    const { leadId, action, reason } = await req.json();
    if (!leadId || !action) throw new Error("Missing required fields");

    // Verify lawyer owns this case
    const { data: purchase, error: purchaseError } = await supabaseClient
      .from("lead_purchases")
      .select("*, legal_cases!inner(legal_topic, user_id)")
      .eq("lead_id", leadId)
      .eq("lawyer_id", user.id)
      .single();

    if (purchaseError || !purchase) {
      throw new Error("Case not found or you don't have access");
    }

    logStep("Case verified", { leadId });

    // Update case status
    const { error: updateError } = await supabaseClient
      .from("lead_purchases")
      .update({ status: action })
      .eq("id", purchase.id);

    if (updateError) throw updateError;

    // Also update legal_cases status
    await supabaseClient
      .from("legal_cases")
      .update({ status: action })
      .eq("id", leadId);

    logStep("Case status updated", { action });

    // Get lawyer info
    const { data: lawyer } = await supabaseClient
      .from("lawyer_profiles")
      .select("email, full_name")
      .eq("user_id", user.id)
      .single();

    // Get client info
    const { data: client } = await supabaseClient
      .from("profiles")
      .select("email")
      .eq("id", purchase.legal_cases.user_id)
      .single();

    // Send notification to client
    if (client?.email) {
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (RESEND_API_KEY) {
        const resend = new Resend(RESEND_API_KEY);

        await resend.emails.send({
          from: "Legal Compass <cases@legalcompass.app>",
          to: [client.email],
          subject: `Case Update: ${purchase.legal_cases.legal_topic}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Case Status Update</h2>
              
              <p>Your case regarding <strong>${purchase.legal_cases.legal_topic}</strong> has been ${action === 'closed' ? 'closed' : 'dropped'} by your lawyer.</p>

              ${reason ? `<div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Reason:</h3>
                <p>${reason}</p>
              </div>` : ''}

              <p>If you have any questions, please reach out to ${lawyer?.full_name || 'your lawyer'}.</p>

              <div style="margin: 30px 0;">
                <a href="${Deno.env.get("SUPABASE_URL")?.replace('supabase.co', 'lovable.app') || 'https://legalcompass.app'}/user-portal" 
                   style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  View Your Cases
                </a>
              </div>
            </div>
          `,
        });

        logStep("Client notification sent");
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
