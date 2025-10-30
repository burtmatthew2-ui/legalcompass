import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const reason = url.searchParams.get('reason') || 'User requested';

    if (!email) {
      return new Response(
        'Email parameter is required',
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'text/html' }
        }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Insert unsubscribe record
    const { error } = await supabaseClient
      .from('email_unsubscribes')
      .insert({
        email: email,
        reason: reason
      });

    if (error && !error.message.includes('duplicate')) {
      throw error;
    }

    // Return HTML success page
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.1);
              max-width: 500px;
              text-align: center;
            }
            h1 {
              color: #333;
              margin-bottom: 20px;
            }
            p {
              color: #666;
              line-height: 1.6;
            }
            .checkmark {
              font-size: 64px;
              color: #4CAF50;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="checkmark">✓</div>
            <h1>You've Been Unsubscribed</h1>
            <p>
              The email address <strong>${email}</strong> has been successfully removed from our mailing list.
            </p>
            <p>
              You will no longer receive emails from Legal Compass.
            </p>
            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              If this was a mistake, please contact us to resubscribe.
            </p>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      }
    );
  } catch (error) {
    console.error('Error in unsubscribe function:', error);
    
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              max-width: 500px;
              text-align: center;
            }
            h1 { color: #d32f2f; }
            p { color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Oops!</h1>
            <p>Something went wrong. Please try again or contact support.</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      }
    );
  }
});
