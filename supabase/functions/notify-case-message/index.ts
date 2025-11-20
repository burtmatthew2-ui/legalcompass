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

    const { leadId, senderId, senderType, messageContent } = await req.json();

    if (!leadId || !senderId || !senderType || !messageContent) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get case details
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

    // Determine recipient based on sender type
    let recipientEmail;
    let recipientName;
    let senderName;

    if (senderType === 'client') {
      // Notify lawyer
      const { data: purchase } = await supabaseClient
        .from("lead_purchases")
        .select(`
          lawyer_profiles:lawyer_id (
            email,
            full_name
          )
        `)
        .eq("lead_id", leadId)
        .single();

      if (!purchase?.lawyer_profiles) {
        return new Response(
          JSON.stringify({ message: "No lawyer assigned yet" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
        );
      }

      recipientEmail = (purchase.lawyer_profiles as any).email;
      recipientName = (purchase.lawyer_profiles as any).full_name;
      senderName = "Client";
    } else {
      // Notify client
      recipientEmail = (caseData.profiles as any)?.email;
      
      // Get lawyer name
      const { data: lawyer } = await supabaseClient
        .from("lawyer_profiles")
        .select("full_name")
        .eq("user_id", senderId)
        .single();
      
      recipientName = "Client";
      senderName = lawyer?.full_name || "Your Attorney";
    }

    if (!recipientEmail) {
      throw new Error("Recipient email not found");
    }

    // Check notification preferences
    const { data: prefs } = await supabaseClient
      .from("notification_preferences")
      .select("email_notifications, notify_new_messages")
      .eq("user_id", senderType === 'client' ? senderId : caseData.user_id)
      .single();

    if (prefs && (!prefs.email_notifications || !prefs.notify_new_messages)) {
      return new Response(
        JSON.stringify({ message: "User has disabled message notifications" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Send email notification
    await resend.emails.send({
      from: "Legal Compass <notifications@legalcompass.shop>",
      to: [recipientEmail],
      subject: `New Message from ${senderName} - ${caseData.legal_topic}`,
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
              .message-box {
                background: #f8f9ff;
                border-left: 4px solid #667eea;
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
                <h1 style="margin: 0;">💬 New Message</h1>
              </div>
              
              <div class="content">
                <p>Hi ${recipientName},</p>
                
                <p>You have a new message from <strong>${senderName}</strong> regarding your case: <strong>${caseData.legal_topic}</strong></p>

                <div class="message-box">
                  <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message Preview:</p>
                  <p style="margin: 10px 0 0 0; font-size: 15px;">${messageContent.substring(0, 200)}${messageContent.length > 200 ? '...' : ''}</p>
                </div>

                <center>
                  <a href="${req.headers.get("origin")}/${senderType === 'client' ? 'lawyer-dashboard' : 'client-dashboard'}" class="cta-button">
                    View Message & Reply
                  </a>
                </center>

                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  Reply directly through your secure dashboard to keep your conversation private and encrypted.
                </p>
              </div>

              <div class="footer">
                <p>Legal Compass - Secure Legal Communication</p>
                <p style="font-size: 12px; color: #999;">
                  You're receiving this because you have a case with Legal Compass.
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
    console.error("Error sending message notification:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to send notification" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
