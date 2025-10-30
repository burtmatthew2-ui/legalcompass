import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://esm.sh/zod@3.22.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const { name, email, subject, message } = await req.json();

    // Server-side validation matching client schema with generous limits
    const contactSchema = z.object({
      name: z.string().trim().min(1, 'Name is required').max(150, 'Name too long (max 150 characters)'),
      email: z.string().email('Invalid email address').max(255, 'Email too long (max 255 characters)'),
      subject: z.string().trim().min(1, 'Subject is required').max(300, 'Subject too long (max 300 characters)'),
      message: z.string().trim().min(1, 'Message is required').max(5000, 'Message too long (max 5,000 characters)')
    });

    const validation = contactSchema.safeParse({ name, email, subject, message });
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      console.error('Contact form validation error:', firstError);
      return new Response(
        JSON.stringify({ error: firstError.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const emailContent = `
New support request from Legal Compass

From: ${name} (${email})
User ID: ${user.id}
Subject: ${subject}

Message:
${message}

---
Sent via Legal Compass Support Form
    `.trim();

    const { error: emailError } = await resend.emails.send({
      from: "Legal Compass Support <noreply@send.legalcompass.store>",
      to: ["support@legalcompass.store"],
      replyTo: email,
      subject: `Support Request: ${subject}`,
      text: emailContent,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      throw new Error("Failed to send email");
    }

    console.log("Support email sent successfully for user:", user.id);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in contact-support function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
