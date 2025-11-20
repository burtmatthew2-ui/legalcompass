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

    const { leadId, documentName, lawyerId, notes } = await req.json();

    if (!leadId || !documentName || !lawyerId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get case and client details
    const { data: caseData, error: caseError } = await supabaseClient
      .from("legal_cases")
      .select(`
        *,
        profiles:user_id (email)
      `)
      .eq("id", leadId)
      .single();

    if (caseError || !caseData) {
      throw new Error("Case not found");
    }

    // Get lawyer details
    const { data: lawyer, error: lawyerError } = await supabaseClient
      .from("lawyer_profiles")
      .select("full_name")
      .eq("user_id", lawyerId)
      .single();

    if (lawyerError || !lawyer) {
      throw new Error("Lawyer not found");
    }

    const clientEmail = (caseData.profiles as any)?.email;
    if (!clientEmail) {
      throw new Error("Client email not found");
    }

    // Check notification preferences
    const { data: prefs } = await supabaseClient
      .from("notification_preferences")
      .select("email_notifications, notify_case_updates")
      .eq("user_id", caseData.user_id)
      .single();

    if (prefs && (!prefs.email_notifications || !prefs.notify_case_updates)) {
      return new Response(
        JSON.stringify({ message: "Client has disabled case update notifications" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Send email notification
    await resend.emails.send({
      from: "Legal Compass <notifications@legalcompass.shop>",
      to: [clientEmail],
      subject: `Document Requested - ${documentName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 0;
                background-color: #f5f5f5;
              }
              .container {
                background: white;
                margin: 20px auto;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
              }
              .content {
                padding: 30px;
              }
              .document-box {
                background: #fff8e1;
                border-left: 4px solid #ffa726;
                padding: 20px;
                margin: 20px 0;
                border-radius: 8px;
              }
              .cta-button {
                display: inline-block;
                background: #667eea;
                color: white !important;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 8px;
                margin: 20px 0;
                font-weight: 600;
              }
              .footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📄 Document Requested</h1>
              </div>
              
              <div class="content">
                <p>Hello,</p>
                
                <p><strong>${lawyer.full_name}</strong> has requested a document for your case: <strong>${caseData.legal_topic}</strong></p>

                <div class="document-box">
                  <h3 style="margin-top: 0; color: #f57c00;">Requested Document:</h3>
                  <p style="font-size: 16px; font-weight: 600; margin: 10px 0;">${documentName}</p>
                  ${notes ? `
                    <p style="margin-top: 15px; color: #666;">
                      <strong>Note from your attorney:</strong><br>
                      ${notes}
                    </p>
                  ` : ''}
                </div>

                <p>Please upload this document through your secure client dashboard as soon as possible to keep your case moving forward.</p>

                <center>
                  <a href="${req.headers.get("origin")}/client-dashboard" class="cta-button">
                    Upload Document
                  </a>
                </center>

                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  If you have any questions about this document request, you can message your attorney directly through the dashboard.
                </p>
              </div>

              <div class="footer">
                <p>Legal Compass - Your Legal Journey Made Simple</p>
                <p style="font-size: 12px; color: #999;">
                  You're receiving this because you have an active case with Legal Compass.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error sending document request notification:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to send notification" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
