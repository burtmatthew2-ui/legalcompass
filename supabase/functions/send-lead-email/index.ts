import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }

    // Check if user is admin
    const { data: adminCheck } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (!adminCheck) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { recipientEmail, recipientName, subject, htmlContent, senderId } = await req.json();

    if (!recipientEmail || !subject || !htmlContent) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: recipientEmail, subject, htmlContent" }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if email is unsubscribed
    const { data: unsubscribed } = await supabaseClient
      .from('email_unsubscribes')
      .select('email')
      .eq('email', recipientEmail)
      .maybeSingle();

    if (unsubscribed) {
      return new Response(
        JSON.stringify({ 
          error: "This email has unsubscribed",
          unsubscribed: true 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate unsubscribe link
    const unsubscribeUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/unsubscribe?email=${encodeURIComponent(recipientEmail)}`;

    // Add unsubscribe link to email
    const emailWithUnsubscribe = `
      ${htmlContent}
      <br><br>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #666; text-align: center;">
        If you'd prefer not to receive future emails, 
        <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">click here to unsubscribe</a>.
      </p>
    `;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Legal Compass <noreply@send.legalcompass.store>",
      to: [recipientEmail],
      subject: subject,
      html: emailWithUnsubscribe,
    });

    console.log("Email sent successfully:", emailResponse);

    // Log the send
    await supabaseClient
      .from('email_send_log')
      .insert({
        recipient_email: recipientEmail,
        recipient_name: recipientName,
        subject: subject,
        sent_by: senderId,
        status: 'sent'
      });

    return new Response(
      JSON.stringify({ 
        success: true,
        messageId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in send-lead-email function:', error);
    
    // Log the error
    const { recipientEmail, recipientName, subject, senderId } = await req.json().catch(() => ({}));
    
    if (recipientEmail) {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );
      
      await supabaseClient
        .from('email_send_log')
        .insert({
          recipient_email: recipientEmail,
          recipient_name: recipientName,
          subject: subject || 'Unknown',
          sent_by: senderId,
          status: 'failed',
          error_message: error instanceof Error ? error.message : "Unknown error"
        });
    }

    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
