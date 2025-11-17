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

    const { messages } = await req.json();

    // Validate input with generous limits for support conversations
    const supportChatSchema = z.object({
      messages: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(8000, 'Message too long (max 8,000 characters)')
      })).min(1, 'At least one message required').max(100, 'Too many messages in conversation (max 100)')
    });

    const validation = supportChatSchema.safeParse({ messages });
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      console.error('Support chat validation error:', firstError);
      return new Response(
        JSON.stringify({ error: firstError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful customer support assistant for Legal Compass, an AI-powered legal research platform. 

Your role is to:
- Help users understand how to use the platform
- Answer questions about features and functionality
- Provide guidance on legal research best practices
- Address subscription and billing questions
- Troubleshoot technical issues

Key information about Legal Compass:
- It's an AI-powered legal research tool with COMPASS AI assistant
- Uses advanced AI to analyze legal documents and cases
- Offers multi-jurisdiction research capabilities
- Provides strategic insights, not just search results
- Has privacy-first design with secure data handling
- Available in Free trial (3 questions) and Pro subscription ($4.99/month)
- Lawyer marketplace with verified attorneys

Be professional, helpful, and concise in your responses.`;

    const formattedMessages = [
      { role: "user" as const, content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 2048,
        messages: formattedMessages.slice(1),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const assistantMessage = data.content?.[0]?.text;

    if (!assistantMessage) {
      throw new Error("No response from AI");
    }

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in support-chat function:", error);
    // Sanitize error for client
    let userMessage = 'An error occurred while processing your support request';
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes('unauthorized') || error.message.toLowerCase().includes('not authenticated')) {
        userMessage = 'Authentication required';
      }
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
