import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.22.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting storage (in-memory for demo - consider Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // requests per hour for unauthenticated users
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getRateLimitKey(req: Request): string {
  // Use IP address for rate limiting
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return `ratelimit:${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Check if user is authenticated (optional for this endpoint)
    let isAuthenticated = false;
    const authHeader = req.headers.get("Authorization");
    
    if (authHeader) {
      try {
        const { data: { user } } = await supabaseClient.auth.getUser(authHeader.replace("Bearer ", ""));
        isAuthenticated = !!user;
      } catch {
        // Not authenticated, continue as guest
      }
    }

    // Apply rate limiting only for unauthenticated users
    if (!isAuthenticated) {
      const rateLimitKey = getRateLimitKey(req);
      const { allowed, remaining } = checkRateLimit(rateLimitKey);
      
      if (!allowed) {
        return new Response(
          JSON.stringify({ 
            error: "Rate limit exceeded. Please sign up for unlimited questions.",
            rateLimit: {
              limit: RATE_LIMIT,
              remaining: 0,
              resetIn: "1 hour"
            }
          }),
          { 
            status: 429, 
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json",
              "X-RateLimit-Limit": RATE_LIMIT.toString(),
              "X-RateLimit-Remaining": "0"
            } 
          }
        );
      }
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

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    const systemPrompt = `You are an AI FAQ assistant for Legal Compass, an AI-powered legal research platform.

Your role is to:
- Answer questions about the Legal Compass platform and its features
- Explain how to use various tools and functionalities
- Provide information about subscription plans and pricing
- Guide users through the platform's capabilities
- Address common questions about legal research and attorney matching

Key features of Legal Compass:
- AI-powered legal research with COMPASS assistant
- Attorney matching and lead generation for lawyers
- Document templates and legal resources
- Multi-jurisdiction legal research
- Secure, confidential platform
- Affordable pricing: Free trial (3 questions) then $4.99/month for individuals
- Lawyer marketplace with verified, bar-certified attorneys

Be helpful, clear, and concise. Focus on platform features and capabilities, not specific legal advice.`;

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
        messages: [
          { role: "user", content: `${systemPrompt}\n\nUser question: ${question}` }
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

    // Add watermark for unauthenticated users
    const finalAnswer = isAuthenticated 
      ? answer 
      : `${answer}\n\n---\n💡 Sign up for unlimited questions and full access to Legal Compass!`;

    return new Response(
      JSON.stringify({ answer: finalAnswer }),
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
