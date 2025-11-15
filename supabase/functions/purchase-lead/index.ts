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

    // Check if lawyer has signed commission agreement
    const { data: agreement, error: agreementError } = await supabaseClient
      .from('commission_agreements')
      .select('id')
      .eq('lawyer_id', user.id)
      .maybeSingle();

    if (!agreement) {
      throw new Error("Commission agreement not signed. Please complete onboarding.");
    }
    logStep("Commission agreement verified");

    // Check if this is their free lead
    const { data: paymentPrefs, error: prefsError } = await supabaseClient
      .from('lawyer_payment_preferences')
      .select('*')
      .eq('lawyer_id', user.id)
      .maybeSingle();

    if (prefsError) throw prefsError;

    const isFree = paymentPrefs?.lead_credits_remaining > 0;
    logStep("Free lead check", { isFree, creditsRemaining: paymentPrefs?.lead_credits_remaining });

    if (isFree) {
      // Use free credit
      const { error: updateError } = await supabaseClient
        .from('lawyer_payment_preferences')
        .update({ 
          lead_credits_remaining: paymentPrefs.lead_credits_remaining - 1 
        })
        .eq('lawyer_id', user.id);

      if (updateError) throw updateError;

      // Create lead purchase record
      const { error: purchaseError } = await supabaseClient
        .from('lead_purchases')
        .insert({
          lawyer_id: user.id,
          lead_id: leadId,
          amount_paid: 0,
          status: 'active'
        });

      if (purchaseError) throw purchaseError;

      logStep("Free lead claimed successfully");
      return new Response(JSON.stringify({ 
        success: true, 
        isFree: true,
        message: "Free lead claimed successfully!" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Paid lead - Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Stripe not configured");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Get or create Stripe customer
    const customers = await stripe.customers.list({ email: user.email!, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    logStep("Creating Stripe checkout session for paid lead");

    // Flat pricing for all leads: $35
    const LEAD_PRICE_ID = "price_1STVfVArhAIMbV73y6qEPNpD"; // $35 flat fee
    const LEAD_AMOUNT = 3500; // $35 in cents
    logStep("Flat pricing applied", { amount: LEAD_AMOUNT });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email!,
      mode: "payment",
      line_items: [
        {
          price: LEAD_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        lead_id: leadId,
        lawyer_id: user.id,
        amount_paid: LEAD_AMOUNT,
      },
      success_url: `${req.headers.get("origin")}/lawyer-dashboard?purchase=success&lead=${leadId}`,
      cancel_url: `${req.headers.get("origin")}/lawyer-dashboard?purchase=cancelled`,
    });

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(
      JSON.stringify({ url: session.url, isFree: false }),
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
