import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  console.log(`[NOTIFY-NEW-LEAD] ${step}${details ? ` - ${JSON.stringify(details)}` : ''}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

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

    const { caseId } = await req.json();
    logStep("Received case ID", { caseId });

    // Get case details
    const { data: legalCase, error: caseError } = await supabaseClient
      .from("legal_cases")
      .select("*")
      .eq("id", caseId)
      .single();

    if (caseError || !legalCase) {
      throw new Error("Case not found");
    }

    logStep("Case fetched", { topic: legalCase.legal_topic, state: legalCase.state });

    // Calculate lead price based on urgency
    let price = "$50";
    if (legalCase.urgency_level === "medium") price = "$70";
    if (legalCase.urgency_level === "high") price = "$90";

    // Find matching lawyers
    const { data: matchingLawyers, error: lawyersError } = await supabaseClient
      .from("lawyer_profiles")
      .select("email, full_name, practice_areas, states_licensed")
      .eq("verified_status", true)
      .contains("states_licensed", [legalCase.state])
      .contains("practice_areas", [legalCase.legal_topic]);

    if (lawyersError) {
      throw new Error("Error finding matching lawyers");
    }

    if (!matchingLawyers || matchingLawyers.length === 0) {
      logStep("No matching lawyers found");
      return new Response(
        JSON.stringify({ message: "No matching lawyers found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    logStep(`Found ${matchingLawyers.length} matching lawyers`);

    // Send emails to all matching lawyers
    const emailPromises = matchingLawyers.map(async (lawyer) => {
      try {
        const emailResponse = await resend.emails.send({
          from: "Legal Compass <leads@legalcompass.app>",
          to: [lawyer.email],
          subject: `New ${legalCase.urgency_level.toUpperCase()} Priority Lead Available - ${legalCase.legal_topic}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a1a1a;">New Legal Lead Available</h2>
              
              <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Practice Area:</strong> ${legalCase.legal_topic}</p>
                <p style="margin: 0 0 10px 0;"><strong>State:</strong> ${legalCase.state}</p>
                <p style="margin: 0 0 10px 0;"><strong>Urgency:</strong> <span style="color: ${legalCase.urgency_level === 'high' ? '#dc2626' : legalCase.urgency_level === 'medium' ? '#ea580c' : '#16a34a'}; font-weight: bold;">${legalCase.urgency_level.toUpperCase()}</span></p>
                <p style="margin: 0;"><strong>Lead Price:</strong> ${price}</p>
              </div>

              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #856404;">
                  <strong>Preview:</strong> ${legalCase.description.substring(0, 150)}...
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #856404;">
                  Full case details available after purchase
                </p>
              </div>

              <div style="margin: 30px 0;">
                <a href="${Deno.env.get("SUPABASE_URL")?.replace('supabase.co', 'lovable.app') || 'https://legalcompass.app'}/lawyer-dashboard" 
                   style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  View Lead Details
                </a>
              </div>

              <p style="color: #666; font-size: 14px; margin-top: 30px; border-top: 1px solid #e5e5e5; padding-top: 20px;">
                This lead matches your practice areas and licensed states. Log in to your dashboard to review the full details and purchase this lead.
              </p>

              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Legal Compass - Connecting Lawyers with Clients<br>
                <a href="${Deno.env.get("SUPABASE_URL")?.replace('supabase.co', 'lovable.app') || 'https://legalcompass.app'}/lawyer-dashboard" style="color: #2563eb;">Manage Notifications</a>
              </p>
            </div>
          `,
        });

        logStep("Email sent successfully", { to: lawyer.email });
        return { success: true, email: lawyer.email };
      } catch (error) {
        logStep("Email failed", { to: lawyer.email, error });
        return { success: false, email: lawyer.email, error };
      }
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(r => r.success).length;

    logStep(`Sent ${successCount}/${matchingLawyers.length} emails successfully`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailsSent: successCount,
        totalMatches: matchingLawyers.length 
      }),
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
