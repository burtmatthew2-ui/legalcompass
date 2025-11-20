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
      const errorMessage = err instanceof Error ? err.message : String(err);
      logStep("Webhook signature verification failed", { error: errorMessage });
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

    // Handle subscription events
    if (event.type === "customer.subscription.created" || 
        event.type === "customer.subscription.updated") {
      const subscription = event.data.object;
      logStep("Processing subscription event", { 
        type: event.type, 
        subscriptionId: subscription.id,
        status: subscription.status 
      });

      // Get customer email
      const customer = await stripe.customers.retrieve(subscription.customer as string);
      if ('email' in customer && customer.email) {
        const { data: userData } = await supabaseClient.auth.admin.listUsers();
        const user = userData.users.find(u => u.email === customer.email);
        
        if (user) {
          const isActive = subscription.status === 'active';
          logStep("Updating lawyer subscription status", { 
            userId: user.id, 
            isActive 
          });
          
          await supabaseClient
            .from('lawyer_payment_preferences')
            .update({ is_subscribed: isActive })
            .eq('lawyer_id', user.id);
        }
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      logStep("Processing subscription deletion", { subscriptionId: subscription.id });

      const customer = await stripe.customers.retrieve(subscription.customer as string);
      if ('email' in customer && customer.email) {
        const { data: userData } = await supabaseClient.auth.admin.listUsers();
        const user = userData.users.find(u => u.email === customer.email);
        
        if (user) {
          logStep("Deactivating lawyer subscription", { userId: user.id });
          
          await supabaseClient
            .from('lawyer_payment_preferences')
            .update({ is_subscribed: false })
            .eq('lawyer_id', user.id);
        }
      }
    }

    // Handle legacy lead purchases (checkout.session.completed)
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { lead_id, lawyer_id, amount_paid } = session.metadata || {};

      if (lead_id && lawyer_id) {
        logStep("Processing lead purchase", { lead_id, lawyer_id });

        // Record the purchase
        const { error: purchaseError } = await supabaseClient
          .from("lead_purchases")
          .insert({
            lead_id,
            lawyer_id,
            amount_paid: amount_paid ? parseInt(amount_paid) / 100 : 0,
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
        }
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
