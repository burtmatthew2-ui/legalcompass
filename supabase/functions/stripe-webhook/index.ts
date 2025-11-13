import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey || !webhookSecret) {
      throw new Error("Stripe configuration missing");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const body = await req.text();

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      logStep("Webhook signature verification failed", { error: err.message });
      return new Response(
        JSON.stringify({ error: "Webhook signature verification failed" }),
        { status: 400, headers: corsHeaders }
      );
    }

    logStep("Webhook received", { type: event.type });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { lead_id, lawyer_id, amount_paid } = session.metadata;

      logStep("Processing successful payment", { lead_id, lawyer_id });

      // Record the purchase
      const { error: purchaseError } = await supabaseClient
        .from("lead_purchases")
        .insert({
          lead_id,
          lawyer_id,
          amount_paid: parseInt(amount_paid) / 100, // Convert cents to dollars
        });

      if (purchaseError) {
        logStep("Error recording purchase", { error: purchaseError });
        throw purchaseError;
      }

      logStep("Purchase recorded successfully");

      // Send notification email to lawyer
      try {
        await supabaseClient.functions.invoke("notify-lead-purchased", {
          body: { leadId: lead_id, lawyerId: lawyer_id }
        });
        logStep("Notification email triggered");
      } catch (emailError) {
        logStep("Email notification failed (non-critical)", { error: emailError });
        // Don't fail the webhook for email errors
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
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
