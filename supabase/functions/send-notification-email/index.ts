import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  userId: string;
  notificationType: string;
  subject: string;
  message: string;
  metadata?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { userId, notificationType, subject, message, metadata }: NotificationRequest = await req.json();

    console.log(`Processing notification for user ${userId}, type: ${notificationType}`);

    // Get user's email and notification preferences
    const { data: userData, error: userError } = await supabaseClient.auth.admin.getUserById(userId);
    if (userError || !userData?.user?.email) {
      throw new Error("User not found or email missing");
    }

    const { data: prefs, error: prefsError } = await supabaseClient
      .from("notification_preferences")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (prefsError) {
      console.error("Error fetching preferences:", prefsError);
    }

    // Check if user wants this type of notification
    const shouldSendEmail = prefs?.email_notifications !== false;
    
    let shouldSend = true;
    if (notificationType === "new_message" && prefs?.notify_new_messages === false) shouldSend = false;
    if (notificationType === "case_update" && prefs?.notify_case_updates === false) shouldSend = false;
    if (notificationType === "deadline" && prefs?.notify_deadlines === false) shouldSend = false;
    if (notificationType === "new_lead" && prefs?.notify_new_leads === false) shouldSend = false;
    if (notificationType === "case_accepted" && prefs?.notify_case_accepted === false) shouldSend = false;

    if (!shouldSendEmail || !shouldSend) {
      console.log(`User ${userId} has notifications disabled for ${notificationType}`);
      return new Response(
        JSON.stringify({ message: "Notification skipped per user preferences" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Check if user has unsubscribed
    const { data: unsubscribed } = await supabaseClient
      .from("email_unsubscribes")
      .select("id")
      .eq("email", userData.user.email)
      .maybeSingle();

    if (unsubscribed) {
      console.log(`User ${userId} has unsubscribed from emails`);
      return new Response(
        JSON.stringify({ message: "User has unsubscribed" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Legal Compass <notifications@resend.dev>",
      to: [userData.user.email],
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
              .footer a { color: #667eea; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">Legal Compass</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">${subject}</p>
            </div>
            <div class="content">
              ${message}
              ${metadata?.actionUrl ? `<a href="${metadata.actionUrl}" class="button">View Details</a>` : ''}
            </div>
            <div class="footer">
              <p>You're receiving this because you have notifications enabled.</p>
              <p><a href="${Deno.env.get("SUPABASE_URL")?.replace('//', '//app.')}/settings/notifications">Manage Preferences</a> | <a href="${Deno.env.get("SUPABASE_URL")?.replace('//', '//app.')}/unsubscribe">Unsubscribe</a></p>
              <p style="margin-top: 20px;">© ${new Date().getFullYear()} Legal Compass. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Log the email send
    await supabaseClient.from("email_send_log").insert({
      recipient_email: userData.user.email,
      subject: subject,
      status: "sent",
    });

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);