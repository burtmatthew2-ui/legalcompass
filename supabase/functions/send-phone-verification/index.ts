import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      throw new Error('Not authenticated');
    }

    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      throw new Error('Phone number is required');
    }

    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the verification code in the database
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Code expires in 10 minutes

    const { error: dbError } = await supabaseClient
      .from('verification_codes')
      .insert({
        user_id: user.id,
        phone_number: phoneNumber,
        code: code,
        expires_at: expiresAt.toISOString(),
      });

    if (dbError) throw dbError;

    // TODO: Integrate with Twilio or similar SMS service to send the code
    // For now, we'll log it (in production, you'd send via SMS)
    console.log(`Verification code for ${phoneNumber}: ${code}`);
    
    // In development, return the code in the response
    // REMOVE THIS IN PRODUCTION!
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Verification code sent',
        // Remove this in production:
        devCode: code 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});