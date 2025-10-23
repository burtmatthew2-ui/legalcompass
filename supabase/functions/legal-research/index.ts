import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Legal research request received with", messages.length, "messages");

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
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
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

      return new Response(
        JSON.stringify({ error: "Failed to process request" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Legal research error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
