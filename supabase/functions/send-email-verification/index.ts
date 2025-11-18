import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerificationRequest {
  email: string;
  token: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token }: VerificationRequest = await req.json();

    if (!email || !token) {
      return new Response(
        JSON.stringify({ error: "Email and token are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const verificationUrl = `${req.headers.get("origin")}/verify-email?token=${token}`;

    const emailResponse = await resend.emails.send({
      from: "Legal Compass <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your email - Legal Compass",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f8f9fa;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .button {
                display: inline-block;
                background: #667eea;
                color: white !important;
                padding: 14px 32px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: 600;
              }
              .button:hover {
                background: #5568d3;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">🧭 Verify Your Email</h1>
            </div>
            <div class="content">
              <p>Welcome to Legal Compass! Please verify your email address to complete your registration.</p>
              <p>Click the button below to verify your email:</p>
              <center>
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </center>
              <p style="margin-top: 30px; font-size: 14px; color: #666;">
                If you didn't create this account, you can safely ignore this email.
              </p>
              <p style="font-size: 12px; color: #999;">
                This link will expire in 24 hours.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Verification email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send verification email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
