import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const log = (message: string, data?: any) => {
  console.log(`[request-lawyer-removal] ${message}`, data || '');
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) throw new Error('Unauthorized');

    const { leadId, reason } = await req.json();
    log('Processing lawyer removal request', { leadId, userId: user.id });

    if (!reason || reason.trim().length < 50) {
      throw new Error('Please provide a detailed reason (minimum 50 characters)');
    }

    // Verify user owns this case
    const { data: caseData, error: caseError } = await supabase
      .from('legal_cases')
      .select('*, profiles!legal_cases_user_id_fkey(email)')
      .eq('id', leadId)
      .eq('user_id', user.id)
      .single();

    if (caseError || !caseData) {
      throw new Error('Case not found or unauthorized');
    }

    // Get lawyer info
    const { data: purchaseData, error: purchaseError } = await supabase
      .from('lead_purchases')
      .select('lawyer_id, lawyer_profiles!lead_purchases_lawyer_id_fkey(full_name, email)')
      .eq('lead_id', leadId)
      .single();

    if (purchaseError || !purchaseData) {
      throw new Error('No lawyer assigned to this case');
    }

    // Get all messages for this case
    const { data: messages, error: messagesError } = await supabase
      .from('case_messages')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      log('Error fetching messages', messagesError);
    }

    // Format chat transcript
    const chatTranscript = messages?.map(msg => 
      `[${new Date(msg.created_at).toLocaleString()}] ${msg.sender_type}: ${msg.message_content}`
    ).join('\n') || 'No messages exchanged';

    // Create removal request record
    const { error: logError } = await supabase
      .from('case_activity_log')
      .insert({
        lead_id: leadId,
        activity_type: 'removal_request',
        actor_id: user.id,
        actor_type: 'client',
        description: `Client requested lawyer removal`,
        metadata: {
          reason,
          lawyer_id: purchaseData.lawyer_id,
          chat_transcript: chatTranscript
        }
      });

    if (logError) {
      log('Error logging activity', logError);
    }

    // Get admin emails
    const { data: adminUsers, error: adminError } = await supabase
      .from('user_roles')
      .select('user_id, profiles!user_roles_user_id_fkey(email)')
      .eq('role', 'admin');

    if (adminError || !adminUsers || adminUsers.length === 0) {
      throw new Error('No admin users found');
    }

    const adminEmails = adminUsers
      .map(u => (u.profiles as any)?.email)
      .filter(Boolean) as string[];

    const lawyerInfo = (purchaseData.lawyer_profiles as any);

    // Send email to admins
    const { error: emailError } = await resend.emails.send({
      from: 'Legal Compass Admin <admin@legalcompass.shop>',
      to: adminEmails,
      subject: `URGENT: Lawyer Removal Request - Case ${leadId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Lawyer Removal Request</h1>
          
          <div style="background-color: #fef2f2; padding: 20px; border-left: 4px solid #dc2626; margin: 20px 0;">
            <h3 style="margin-top: 0;">⚠️ Action Required</h3>
            <p>A client has requested to remove their assigned lawyer from their case.</p>
          </div>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Case Details</h3>
            <p><strong>Case ID:</strong> ${leadId}</p>
            <p><strong>Legal Topic:</strong> ${caseData.legal_topic}</p>
            <p><strong>Client Email:</strong> ${(caseData.profiles as any)?.email}</p>
            <p><strong>Lawyer:</strong> ${lawyerInfo?.full_name} (${lawyerInfo?.email})</p>
          </div>
          
          <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Client's Reason for Removal</h3>
            <p style="white-space: pre-wrap;">${reason}</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Chat Transcript</h3>
            <pre style="background-color: white; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 12px; white-space: pre-wrap;">${chatTranscript}</pre>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #e0e7ff; border-radius: 8px;">
            <h3 style="margin-top: 0;">Next Steps</h3>
            <ol>
              <li>Review the client's reason and chat transcript</li>
              <li>Contact both parties if needed for clarification</li>
              <li>Make a decision on the removal request</li>
              <li>Notify both client and lawyer of the decision</li>
              <li>If approved, process refund/reassignment as appropriate</li>
            </ol>
          </div>
          
          <p style="color: #718096; font-size: 14px; margin-top: 30px;">
            This request was automatically generated by the Legal Compass system.
          </p>
        </div>
      `,
    });

    if (emailError) {
      log('Email sending failed', emailError);
      throw emailError;
    }

    log('Removal request submitted successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your request has been submitted to our admin team for review. You will be contacted within 24-48 hours.' 
      }),
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
