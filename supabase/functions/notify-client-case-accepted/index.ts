import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const log = (message: string, data?: any) => {
  console.log(`[notify-client-case-accepted] ${message}`, data || '');
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { leadId, lawyerId } = await req.json();
    log('Notifying client of case acceptance', { leadId, lawyerId });

    // Get case details
    const { data: caseData, error: caseError } = await supabase
      .from('legal_cases')
      .select('*, profiles!legal_cases_user_id_fkey(email)')
      .eq('id', leadId)
      .single();

    if (caseError || !caseData) {
      throw new Error('Case not found');
    }

    // Get lawyer details
    const { data: lawyerData, error: lawyerError } = await supabase
      .from('lawyer_profiles')
      .select('full_name, email, practice_areas, bio')
      .eq('user_id', lawyerId)
      .single();

    if (lawyerError || !lawyerData) {
      throw new Error('Lawyer profile not found');
    }

    const clientEmail = caseData.profiles?.email;
    if (!clientEmail) {
      throw new Error('Client email not found');
    }

    // Send email to client
    const { error: emailError } = await resend.emails.send({
      from: 'Legal Compass <onboarding@resend.dev>',
      to: [clientEmail],
      subject: 'Your Case Has Been Accepted by a Verified Lawyer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">Great News! A Lawyer Has Accepted Your Case</h1>
          
          <p>Hello,</p>
          
          <p>We're pleased to inform you that <strong>${lawyerData.full_name}</strong> has accepted your case regarding <strong>${caseData.legal_topic}</strong>.</p>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Lawyer Information</h3>
            <p><strong>Name:</strong> ${lawyerData.full_name}</p>
            <p><strong>Email:</strong> ${lawyerData.email}</p>
            <p><strong>Practice Areas:</strong> ${lawyerData.practice_areas.join(', ')}</p>
            ${lawyerData.bio ? `<p><strong>About:</strong> ${lawyerData.bio}</p>` : ''}
          </div>
          
          <h3>Next Steps</h3>
          <ul>
            <li>Log in to your dashboard to message your lawyer directly</li>
            <li>Upload any requested documents securely</li>
            <li>Schedule meetings and track important deadlines</li>
            <li>Receive notifications for upcoming court dates</li>
          </ul>
          
          <a href="${supabaseUrl.replace('supabase.co', 'lovable.app')}/case/${leadId}" 
             style="display: inline-block; background-color: #3182ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Access Your Case Dashboard
          </a>
          
          <p style="color: #718096; font-size: 14px; margin-top: 30px;">
            This is a secure, confidential communication. If you have any questions, please contact us through your dashboard.
          </p>
        </div>
      `,
    });

    if (emailError) {
      log('Email sending failed', emailError);
      throw emailError;
    }

    log('Client notification email sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Client notified successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    log('Error', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
