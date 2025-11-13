import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[DEADLINE-REMINDERS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(RESEND_API_KEY);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get upcoming deadlines (within 48 hours) that haven't sent reminders
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setHours(twoDaysFromNow.getHours() + 48);

    const { data: upcomingDeadlines, error: deadlinesError } = await supabaseClient
      .from('case_deadlines')
      .select(`
        *,
        legal_cases!inner(legal_topic, user_id),
        lawyer_profiles!inner(email, full_name)
      `)
      .eq('reminder_sent', false)
      .lte('deadline_date', twoDaysFromNow.toISOString())
      .gte('deadline_date', new Date().toISOString());

    if (deadlinesError) throw deadlinesError;

    logStep("Found deadlines", { count: upcomingDeadlines?.length || 0 });

    // Send reminders
    for (const deadline of upcomingDeadlines || []) {
      try {
        const hoursUntil = Math.floor(
          (new Date(deadline.deadline_date).getTime() - new Date().getTime()) / (1000 * 60 * 60)
        );

        await resend.emails.send({
          from: "Legal Compass <deadlines@legalcompass.app>",
          to: [deadline.lawyer_profiles.email],
          subject: `⏰ Deadline Reminder: ${deadline.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626;">⏰ Upcoming Deadline Reminder</h2>
              
              <p>Dear ${deadline.lawyer_profiles.full_name},</p>
              
              <p>This is a reminder about an upcoming deadline for one of your cases:</p>

              <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #dc2626;">${deadline.title}</h3>
                <p><strong>Case:</strong> ${deadline.legal_cases.legal_topic}</p>
                <p><strong>Due:</strong> ${new Date(deadline.deadline_date).toLocaleString()}</p>
                <p><strong>Time Remaining:</strong> ${hoursUntil} hours</p>
                ${deadline.description ? `<p><strong>Details:</strong> ${deadline.description}</p>` : ''}
              </div>

              <div style="margin: 30px 0;">
                <a href="${Deno.env.get("SUPABASE_URL")?.replace('supabase.co', 'lovable.app') || 'https://legalcompass.app'}/lawyer-dashboard" 
                   style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  View Dashboard
                </a>
              </div>

              <p style="color: #666; font-size: 14px;">
                Make sure to complete this task before the deadline to maintain your case schedule.
              </p>
            </div>
          `,
        });

        // Mark reminder as sent
        await supabaseClient
          .from('case_deadlines')
          .update({ reminder_sent: true })
          .eq('id', deadline.id);

        logStep("Reminder sent", { deadlineId: deadline.id });

      } catch (emailError) {
        logStep("Email failed for deadline", { 
          deadlineId: deadline.id, 
          error: emailError 
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        remindersSent: upcomingDeadlines?.length || 0 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
