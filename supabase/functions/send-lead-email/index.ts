import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://esm.sh/zod@3.22.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// Input validation schema
const emailSchema = z.object({
  recipientEmail: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  recipientName: z.string().trim().max(100, 'Name too long').optional(),
  subject: z.string().trim().min(1, 'Subject required').max(200, 'Subject too long'),
  textContent: z.string().trim().min(1, 'Content required').max(5000, 'Content too long (max 5,000 characters)'),
  senderId: z.string().uuid('Invalid sender ID').optional()
});

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

    const requestData = await req.json();
    
    // Validate input
    const validation = emailSchema.safeParse(requestData);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      console.error('Email validation error:', firstError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input", 
          details: firstError.message 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { recipientEmail, recipientName, subject, textContent, senderId } = validation.data;

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

    // Add unsubscribe footer to plain text email (prevents HTML injection)
    const emailWithUnsubscribe = `${textContent}

────────────────────────────────────────

If you'd prefer not to receive future emails, you can unsubscribe here:
${unsubscribeUrl}`;

    // Send email via Resend as PLAIN TEXT only (prevents HTML injection)
    const emailResponse = await resend.emails.send({
      from: "Legal Compass <noreply@send.legalcompass.store>",
      to: [recipientEmail],
      subject: subject,
      text: emailWithUnsubscribe,
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

    // Sanitize error for client
    let userMessage = 'An error occurred while sending email';
    if (error instanceof Error) {
      if (error.message.includes('Admin access required')) {
        userMessage = 'Admin access required';
      } else if (error.message.toLowerCase().includes('unauthorized') || error.message.toLowerCase().includes('not authenticated')) {
        userMessage = 'Authentication required';
      }
    }
    
    return new Response(
      JSON.stringify({ error: userMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
