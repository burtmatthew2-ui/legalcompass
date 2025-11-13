import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(RESEND_API_KEY);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { leadId, lawyerId } = await req.json();

    // Get lead and lawyer details
    const { data: lead } = await supabaseClient
      .from("legal_cases")
      .select("*")
      .eq("id", leadId)
      .single();

    const { data: lawyer } = await supabaseClient
      .from("lawyer_profiles")
      .select("email, full_name")
      .eq("user_id", lawyerId)
      .single();

    if (!lead || !lawyer) {
      throw new Error("Lead or lawyer not found");
    }

    await resend.emails.send({
      from: "Legal Compass <leads@legalcompass.app>",
      to: [lawyer.email],
      subject: `Lead Purchased Successfully - ${lead.legal_topic}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Lead Purchase Confirmed!</h2>
          
          <p>Dear ${lawyer.full_name},</p>
          
          <p>You have successfully purchased a legal lead. Full case details are now available in your dashboard.</p>

          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Case Summary</h3>
            <pre style="white-space: pre-wrap; font-family: monospace; font-size: 13px;">${lead.snapshot_brief}</pre>
          </div>

          <div style="margin: 30px 0;">
            <a href="${Deno.env.get("SUPABASE_URL")?.replace('supabase.co', 'lovable.app') || 'https://legalcompass.app'}/lawyer-dashboard" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Full Details
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            You can access this lead at any time from your Purchased Leads section.
          </p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
