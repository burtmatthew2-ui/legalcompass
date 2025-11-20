import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "Legal Compass <noreply@legalcompass.shop>",
      to: [email],
      subject: "Welcome to Legal Compass Newsletter!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
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
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">🧭 Welcome to Legal Compass!</h1>
            </div>
            <div class="content">
              <h2>Thank you for subscribing!</h2>
              <p>We're excited to have you join our community. You'll now receive:</p>
              <ul>
                <li>📚 Monthly legal insights and tips</li>
                <li>🤖 AI-powered legal research updates</li>
                <li>📊 Platform feature announcements</li>
                <li>💡 Expert legal guidance for everyone</li>
              </ul>
              <p>While you're here, why not explore our AI legal research platform?</p>
              <center>
                <a href="https://legalcompass.store" class="button">Explore Legal Compass</a>
              </center>
              <p>Get <strong>3 free questions</strong> to try our bar-level AI legal assistance!</p>
            </div>
            <div class="footer">
              <p>You're receiving this because you subscribed to Legal Compass newsletter.</p>
              <p>Legal Compass • Bar-Level AI Legal Research</p>
              <p><a href="https://legalcompass.store" style="color: #667eea;">Visit our website</a></p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Newsletter confirmation email sent:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Confirmation email sent"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending newsletter confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
