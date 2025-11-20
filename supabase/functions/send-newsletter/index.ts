import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { subject, content, sendTo } = await req.json();

    if (!subject || !content) {
      throw new Error('Subject and content are required');
    }

    console.log('Preparing to send newsletter:', subject);

    // Get recipients based on sendTo parameter
    let recipientsQuery = supabaseClient.from('newsletter_signups').select('email, name');
    
    if (sendTo === 'users') {
      recipientsQuery = supabaseClient.from('profiles').select('email');
    } else if (sendTo === 'lawyers') {
      recipientsQuery = supabaseClient.from('lawyer_profiles').select('email, full_name');
    }

    const { data: recipients, error: fetchError } = await recipientsQuery;

    if (fetchError) throw fetchError;

    console.log(`Sending newsletter to ${recipients?.length || 0} recipients`);

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    // Send emails in batches to avoid rate limits
    const batchSize = 50;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < (recipients?.length || 0); i += batchSize) {
      const batch = recipients?.slice(i, i + batchSize) || [];
      
      const emailPromises = batch.map(async (recipient: any) => {
        try {
          const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: 'Legal Compass <noreply@legalcompass.shop>',
              to: [recipient.email],
              subject: subject,
              html: content,
            }),
          });

          if (!response.ok) {
            throw new Error(`Failed to send to ${recipient.email}`);
          }

          // Log successful send
          await supabaseClient.from('email_send_log').insert({
            recipient_email: recipient.email,
            recipient_name: recipient.name || recipient.full_name || null,
            subject: subject,
            status: 'sent'
          });

          successCount++;
        } catch (error: any) {
          console.error(`Error sending to ${recipient.email}:`, error);
          
          // Log failed send
          await supabaseClient.from('email_send_log').insert({
            recipient_email: recipient.email,
            recipient_name: recipient.name || recipient.full_name || null,
            subject: subject,
            status: 'failed',
            error_message: error.message
          });

          errorCount++;
        }
      });

      await Promise.all(emailPromises);
      
      // Small delay between batches
      if (i + batchSize < (recipients?.length || 0)) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`Newsletter sent: ${successCount} successful, ${errorCount} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        failed: errorCount,
        message: `Newsletter sent to ${successCount} recipients`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error: any) {
    console.error('Error in send-newsletter function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
