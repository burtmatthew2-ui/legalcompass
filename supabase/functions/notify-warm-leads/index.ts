import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const { leadId } = await req.json();

    if (!leadId) {
      throw new Error("Lead ID is required");
    }

    // Get the lead details
    const { data: lead, error: leadError } = await supabase
      .from("legal_cases")
      .select("*")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      throw new Error("Lead not found");
    }

    // Find matching lawyers based on practice areas and states licensed
    const { data: lawyers, error: lawyersError } = await supabase
      .from("lawyer_profiles")
      .select("user_id, full_name, email")
      .eq("verified_status", true)
      .contains("states_licensed", [lead.state])
      .contains("practice_areas", [lead.legal_topic]);

    if (lawyersError) {
      console.error("Error fetching lawyers:", lawyersError);
      throw lawyersError;
    }

    if (!lawyers || lawyers.length === 0) {
      console.log("No matching lawyers found for lead:", leadId);
      return new Response(
        JSON.stringify({ message: "No matching lawyers found" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check notification preferences and send emails
    const emailPromises = lawyers.map(async (lawyer) => {
      // Check if lawyer has email notifications enabled
      const { data: prefs } = await supabase
        .from("notification_preferences")
        .select("email_notifications, notify_new_leads")
        .eq("user_id", lawyer.user_id)
        .single();

      if (prefs?.email_notifications && prefs?.notify_new_leads) {
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">🔥 New Warm Lead Available</h2>
            
            <p>Hi ${lawyer.full_name},</p>
            
            <p>A potential client is actively seeking legal help and matches your expertise!</p>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #334155;">Lead Details:</h3>
              <p><strong>Legal Topic:</strong> ${lead.legal_topic}</p>
              <p><strong>State:</strong> ${lead.state}</p>
              <p><strong>Urgency:</strong> ${lead.urgency_level}</p>
              ${lead.snapshot_brief ? `<p><strong>Brief:</strong> ${lead.snapshot_brief}</p>` : ""}
            </div>
            
            <p style="color: #ef4444; font-weight: 600;">
              ⏰ This is a WARM lead - the client is currently active and looking for help now!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://legalcompass.shop/attorney-dashboard" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Lead Details
              </a>
            </div>
            
            <p style="color: #64748b; font-size: 14px;">
              This notification was sent because you have a verified profile matching this case's requirements.
              You can manage your notification preferences in your dashboard settings.
            </p>
          </div>
        `;

        try {
          await resend.emails.send({
            from: "Legal Compass <leads@legalcompass.shop>",
            to: [lawyer.email],
            subject: `🔥 New Warm Lead: ${lead.legal_topic} in ${lead.state}`,
            html: emailHtml,
          });

          console.log(`Email sent to ${lawyer.email} for lead ${leadId}`);
        } catch (emailError) {
          console.error(`Failed to send email to ${lawyer.email}:`, emailError);
        }
      }
    });

    await Promise.all(emailPromises);

    return new Response(
      JSON.stringify({ 
        message: "Notifications sent successfully", 
        lawyersNotified: lawyers.length 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error: any) {
    console.error("Error in notify-warm-leads function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});