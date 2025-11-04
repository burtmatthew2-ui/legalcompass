import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.22.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const { question } = await req.json();
    
    // Validate input with generous limits for legal questions
    const faqSchema = z.object({
      question: z.string().trim().min(1, 'Question is required').max(3000, 'Question too long (max 3,000 characters)')
    });

    const validation = faqSchema.safeParse({ question });
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      console.error('FAQ validation error:', firstError);
      return new Response(
        JSON.stringify({ error: firstError.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an AI FAQ assistant for Legal Compass, an AI-powered legal research platform.

Answer questions clearly and concisely about:

Platform Features:
- AI-powered legal research using advanced reasoning models
- Multi-jurisdiction case analysis
- Strategic insight discovery (loopholes, precedents, arguments)
- Secure document analysis
- Bookmark and save important findings

Subscription & Pricing:
- Free tier: 10 questions per month
- Pro tier: Unlimited questions, priority support
- All plans include full AI capabilities

Getting Started:
- Create an account
- Upload documents or ask questions
- AI analyzes and provides strategic insights
- Save important findings with bookmarks

Security & Privacy:
- End-to-end encryption
- No data sharing with third parties
- Secure cloud storage
- GDPR compliant

Provide helpful, accurate answers in 2-3 sentences. If you don't know something, suggest contacting support.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error("No response from AI");
    }

    return new Response(
      JSON.stringify({ answer }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in faq-ai function:", error);
    
    // Sanitize error for client
    let userMessage = 'An error occurred while processing your question';
    if (error instanceof Error && error.message.toLowerCase().includes('question')) {
      userMessage = error.message; // Question-related errors are safe to show
    }
    
    return new Response(
      JSON.stringify({ error: userMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
