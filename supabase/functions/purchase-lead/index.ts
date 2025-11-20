import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[PURCHASE-LEAD] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) throw new Error("Authentication failed");

    const user = userData.user;
    logStep("User authenticated", { userId: user.id });

    const { leadId } = await req.json();
    if (!leadId) throw new Error("Lead ID is required");

    // Verify lawyer profile exists and is verified
    const { data: lawyerProfile, error: lawyerError } = await supabaseClient
      .from("lawyer_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (lawyerError || !lawyerProfile) {
      throw new Error("Lawyer profile not found");
    }

    if (!lawyerProfile.verified_status) {
      throw new Error("Your profile must be verified before purchasing leads");
    }

    logStep("Lawyer verified", { lawyerId: lawyerProfile.id });

    // Check if already purchased
    const { data: existingPurchase } = await supabaseClient
      .from("lead_purchases")
      .select("id")
      .eq("lawyer_id", user.id)
      .eq("lead_id", leadId)
      .maybeSingle();

    if (existingPurchase) {
      throw new Error("You have already purchased this lead");
    }

    // Get lead details
    const { data: lead, error: leadError } = await supabaseClient
      .from("legal_cases")
      .select("*")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      throw new Error("Lead not found");
    }

    logStep("Lead fetched", { urgency: lead.urgency_level });

    // Check subscription status and monthly limits
    const { data: paymentPrefs, error: prefsError } = await supabaseClient
      .from('lawyer_payment_preferences')
      .select('*')
      .eq('lawyer_id', user.id)
      .maybeSingle();

    if (prefsError) throw prefsError;
    
    if (!paymentPrefs) {
      throw new Error("Payment preferences not found. Please contact support.");
    }

    // Check if period needs reset
    const periodStart = new Date(paymentPrefs.period_start);
    const now = new Date();
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    
    if (periodStart < monthAgo) {
      // Reset monthly count
      const { error: resetError } = await supabaseClient
        .from('lawyer_payment_preferences')
        .update({ 
          leads_used_this_month: 0,
          period_start: now.toISOString()
        })
        .eq('lawyer_id', user.id);
        
      if (resetError) throw resetError;
      paymentPrefs.leads_used_this_month = 0;
      logStep("Monthly period reset");
    }

    const isSubscribed = paymentPrefs.is_subscribed;
    const monthlyLimit = isSubscribed ? 10 : 1;
    const leadsUsed = paymentPrefs.leads_used_this_month || 0;

    logStep("Subscription check", { 
      isSubscribed, 
      monthlyLimit, 
      leadsUsed,
      remaining: monthlyLimit - leadsUsed 
    });

    if (leadsUsed >= monthlyLimit) {
      const message = isSubscribed 
        ? "You've reached your monthly limit of 10 leads. Your limit will reset next month."
        : "You've used your 1 free lead this month. Subscribe for $150/month to get up to 10 leads per month.";
      
      throw new Error(message);
    }

    // Accept the lead
    const { error: updateError } = await supabaseClient
      .from('lawyer_payment_preferences')
      .update({ 
        leads_used_this_month: leadsUsed + 1
      })
      .eq('lawyer_id', user.id);

    if (updateError) throw updateError;

    // Create lead purchase record
    const { error: purchaseError } = await supabaseClient
      .from("lead_purchases")
      .insert({
        lead_id: leadId,
        lawyer_id: user.id,
        amount_paid: 0,
        status: "active"
      });

    if (purchaseError) throw purchaseError;

    // Notify client
    await supabaseClient.functions.invoke('notify-client-case-accepted', {
      body: { leadId, lawyerId: user.id }
    });

    logStep("Lead accepted successfully", { 
      leadsRemaining: monthlyLimit - (leadsUsed + 1) 
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Lead accepted successfully!",
        leadsRemaining: monthlyLimit - (leadsUsed + 1)
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
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
