import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TIER_MODEL_MAP: Record<string, string> = {
  "prod_TIAP3IV5EhaFIL": "google/gemini-2.5-flash-lite", // Basic
  "prod_TIAXB3ezMYE5u5": "google/gemini-2.5-flash",      // Professional
  "prod_TIAYv6WKBRt2OE": "google/gemini-2.5-pro",        // Enterprise
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[LEGAL-RESEARCH] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    // Authenticate user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }

    const user = userData.user;
    logStep("User authenticated", { userId: user.id });

    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid request: messages array is required');
    }

    // Check subscription and get product_id
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    let productId = "prod_TIAP3IV5EhaFIL"; // Default to Basic tier
    
    if (user.email) {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      
      if (customers.data.length > 0) {
        const subscriptions = await stripe.subscriptions.list({
          customer: customers.data[0].id,
          status: "active",
          limit: 1,
        });

        if (subscriptions.data.length > 0) {
          productId = subscriptions.data[0].items.data[0].price.product as string;
          logStep("Active subscription found", { productId });
        }
      }
    }

    const model = TIER_MODEL_MAP[productId] || "google/gemini-2.5-flash-lite";
    logStep("Using AI model", { model, tier: productId });

    // Increment question usage
    const { data: usageData } = await supabaseClient
      .from('question_usage')
      .select('question_count')
      .eq('user_id', user.id)
      .single();

    await supabaseClient
      .from('question_usage')
      .update({ 
        question_count: (usageData?.question_count || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);
    
    logStep("Updated usage count");

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert legal research assistant powered by Legal Compass. Your role is to help users understand legal frameworks, identify potential loopholes, and provide comprehensive legal analysis.

IMPORTANT CAPABILITIES:
- You have access to web search to find current laws, regulations, and legal precedents
- You can research public legal databases and resources
- You provide thorough analysis of legal matters

YOUR METHODOLOGY:
1. RESEARCH FIRST: Before providing any answer, search for relevant laws, regulations, and legal precedents
2. CITE SOURCES: Always reference specific laws, statutes, or cases when applicable
3. BE COMPREHENSIVE: Analyze multiple angles and consider various interpretations
4. IDENTIFY LOOPHOLES: Look for exceptions, ambiguities, or legal strategies that may apply
5. BE PRECISE: Use exact legal terminology and be specific about jurisdictions

IMPORTANT DISCLAIMERS:
- Always remind users that you're providing information, not legal advice
- Recommend consulting with a licensed attorney for specific legal situations
- Clarify that laws vary by jurisdiction

RESPONSE FORMAT:
1. Brief summary of the legal question
2. Relevant laws and regulations (with citations)
3. Analysis of potential strategies or loopholes
4. Important considerations and limitations
5. Recommendation to consult with legal counsel

Be thorough, analytical, and helpful while maintaining professional legal research standards.`;

    console.log('Making request to Lovable AI Gateway...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          ...messages
        ],
        stream: true
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      throw new Error(`AI Gateway returned ${response.status}: ${errorText}`);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in legal-research function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
