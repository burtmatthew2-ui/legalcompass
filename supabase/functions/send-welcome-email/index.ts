import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  userType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, userType }: WelcomeEmailRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const isLawyer = userType === 'attorney';

    const emailResponse = await resend.emails.send({
      from: "Legal Compass <welcome@legalcompass.shop>",
      to: [email],
      subject: isLawyer ? "Welcome to Legal Compass - Attorney Network" : "Welcome to Legal Compass - Your Legal Guidance Starts Here",
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
                padding: 40px 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
              }
              .header .compass {
                font-size: 48px;
                margin-bottom: 10px;
              }
              .content {
                padding: 40px 30px;
              }
              .content h2 {
                color: #667eea;
                margin-top: 0;
                font-size: 22px;
              }
              .feature-box {
                background: #f8f9ff;
                border-left: 4px solid #667eea;
                padding: 20px;
                margin: 20px 0;
                border-radius: 8px;
              }
              .feature-box h3 {
                margin-top: 0;
                color: #667eea;
                font-size: 18px;
              }
              .feature-list {
                list-style: none;
                padding: 0;
                margin: 15px 0;
              }
              .feature-list li {
                padding: 8px 0;
                padding-left: 30px;
                position: relative;
              }
              .feature-list li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #667eea;
                font-weight: bold;
                font-size: 18px;
              }
              .cta-button {
                display: inline-block;
                background: #667eea;
                color: white !important;
                padding: 16px 36px;
                text-decoration: none;
                border-radius: 8px;
                margin: 20px 0;
                font-weight: 600;
                text-align: center;
              }
              .cta-button:hover {
                background: #5568d3;
              }
              .footer {
                background: #f8f9fa;
                padding: 30px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }
              .footer a {
                color: #667eea;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="compass">🧭</div>
                <h1>Welcome to Legal Compass!</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">
                  ${isLawyer ? 'Your journey as a verified legal professional begins here' : 'Your journey to legal clarity starts here'}
                </p>
              </div>
              
              <div class="content">
                <h2>${isLawyer ? 'Thank you for joining our attorney network!' : 'We\'re here to guide you through any legal challenge'}</h2>
                
                <p>
                  ${isLawyer 
                    ? 'You\'ve taken the first step in connecting with clients who need your expertise. Legal Compass makes it easy to grow your practice and help those in need.'
                    : 'Legal issues can feel overwhelming, but you\'re not alone. Legal Compass breaks down complex legal matters into plain English and connects you with verified attorneys when you need them.'
                  }
                </p>

                ${isLawyer ? `
                  <div class="feature-box">
                    <h3>🎯 What's Next?</h3>
                    <ul class="feature-list">
                      <li>Complete your attorney profile and verification</li>
                      <li>Browse available leads matching your practice areas</li>
                      <li>Connect with qualified clients seeking your expertise</li>
                      <li>Manage cases efficiently through our dashboard</li>
                    </ul>
                  </div>

                  <div class="feature-box">
                    <h3>💼 How Legal Compass Works for Attorneys</h3>
                    <ul class="feature-list">
                      <li><strong>Quality Leads:</strong> Only verified, serious clients</li>
                      <li><strong>Fair Pricing:</strong> Pay only for leads you accept ($50-90 per lead)</li>
                      <li><strong>Secure Communication:</strong> Built-in encrypted messaging</li>
                      <li><strong>Case Management:</strong> Track deadlines, documents, and progress</li>
                    </ul>
                  </div>

                  <center>
                    <a href="${req.headers.get("origin")}/lawyer-dashboard" class="cta-button">
                      Complete Your Attorney Profile
                    </a>
                  </center>
                ` : `
                  <div class="feature-box">
                    <h3>🎯 What You Get with Legal Compass</h3>
                    <ul class="feature-list">
                      <li><strong>AI Legal Guidance:</strong> Get instant answers to legal questions in plain English</li>
                      <li><strong>Free Resources:</strong> Access legal templates, guides, and tools</li>
                      <li><strong>Attorney Matching:</strong> Connect with verified lawyers when you need professional help</li>
                      <li><strong>100% Confidential:</strong> Your conversations are private and secure</li>
                    </ul>
                  </div>

                  <div class="feature-box">
                    <h3>🚀 Get Started Today</h3>
                    <ul class="feature-list">
                      <li>Chat with our AI legal assistant about your situation</li>
                      <li>Download free legal document templates</li>
                      <li>Find local legal resources in your area</li>
                      <li>Submit your case for attorney review (Premium - $4.99/mo)</li>
                    </ul>
                  </div>

                  <center>
                    <a href="${req.headers.get("origin")}/" class="cta-button">
                      Start Your Legal Journey
                    </a>
                  </center>
                `}

                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                  ${isLawyer 
                    ? 'Questions? Our support team is here to help you get started. Reply to this email anytime.'
                    : 'Have questions? We\'re here to help. Just reply to this email or use the chat on our website.'
                  }
                </p>
              </div>

              <div class="footer">
                <p><strong>Legal Compass</strong></p>
                <p>Professional legal research meets accessible guidance</p>
                <p>
                  <a href="${req.headers.get("origin")}">Visit Website</a> | 
                  <a href="${req.headers.get("origin")}/support">Get Support</a> | 
                  <a href="${req.headers.get("origin")}/resources">Browse Resources</a>
                </p>
                <p style="font-size: 12px; color: #999; margin-top: 20px;">
                  You're receiving this because you created an account at Legal Compass.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Welcome email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send welcome email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
