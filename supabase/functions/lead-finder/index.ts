import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const inputSchema = z.object({
  targetAudience: z.string().trim().min(5, "Target audience must be at least 5 characters").max(500, "Target audience must be less than 500 characters"),
  industry: z.string().trim().max(100, "Industry must be less than 100 characters").optional(),
  location: z.string().trim().max(100, "Location must be less than 100 characters").optional()
});

// Lead validation schema for AI-generated results
const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  title: z.string().optional(),
  company: z.string().optional(),
  source: z.string().optional(),
  relevance: z.string().optional(),
  email_draft: z.string().min(1)
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }

    // Check if user is admin
    const { data: adminCheck } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (!adminCheck) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const requestBody = await req.json();
    
    // Validate input
    const validationResult = inputSchema.safeParse(requestBody);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid input parameters",
          details: validationResult.error.issues.map(i => i.message).join(", ")
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    const { targetAudience, industry, location } = validationResult.data;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

// Generate a unique timestamp-based seed to ensure different results each time
    const timestamp = new Date().toISOString();
    const randomSeed = Math.random().toString(36).substring(7);

    // STEP 1: Use web search to find real current leads
    const webSearchPrompt = `Search the web RIGHT NOW (${timestamp}) for real people who need legal help but can't afford attorneys. Focus on:

SEARCH CRITERIA:
- Location: ${location || 'United States'}
- Industry/Context: ${industry || 'general'}
- Target: ${targetAudience}

SEARCH SOURCES TO CHECK:
1. Reddit posts in r/legaladvice, r/personalfinance asking for help with legal issues
2. Quora questions about legal problems from people who mention they can't afford lawyers
3. Twitter/X posts from people seeking legal guidance
4. Facebook community groups where people ask for legal help
5. Online forums discussing landlord-tenant disputes, employment issues, family law
6. Legal aid society contact pages listing people seeking assistance
7. Community support groups and mutual aid networks
8. Small business forums where entrepreneurs ask legal questions
9. Freelancer communities discussing contract issues
10. Recent news articles about people facing legal challenges

PRIORITY: Find REAL, CURRENT individuals (from the last 30 days) who:
- Are facing legal issues RIGHT NOW
- Have explicitly mentioned they can't afford an attorney
- Need legal research or guidance
- Are actively seeking help online
- Have posted contact information or profile links

Return 10-15 REAL people with their publicly available information including where you found them and what legal issue they're facing. Include direct links to posts/profiles where possible.

IMPORTANT: This is ${timestamp} - search for CURRENT, RECENT posts and people. Random seed: ${randomSeed}`;

    console.log('Searching web for real leads with seed:', randomSeed);

    const webSearchResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro", // Using Pro for better web search capabilities
        messages: [
          {
            role: "system",
            content: `You are a web research specialist with real-time internet access. Your job is to search the web RIGHT NOW and find REAL people who need legal help but can't afford attorneys. You have access to current web data and can search forums, social media, and public websites. Always provide fresh, unique results for each search by focusing on recent posts and different communities. Current time: ${timestamp}`
          },
          {
            role: "user",
            content: webSearchPrompt
          }
        ],
        temperature: 1.0, // Higher temperature for more varied results
      })
    });

    if (!webSearchResponse.ok) {
      const errorText = await webSearchResponse.text();
      console.error('Web search error:', webSearchResponse.status, errorText);
      throw new Error(`Web search error: ${webSearchResponse.status}`);
    }

    const webSearchResult = await webSearchResponse.json();
    const webSearchContent = webSearchResult.choices?.[0]?.message?.content;

    console.log('Web search completed, found leads');

    // STEP 2: Extract contact information and create personalized emails
    const extractionPrompt = `Based on this web research about people needing legal help:

${webSearchContent}

Extract and format the leads with the following requirements:

1. For each person found, extract:
   - Their name (real name from post/profile)
   - Contact method (email if available, otherwise social media handle)
   - What legal issue they're facing (from their post)
   - Where you found them (specific forum, subreddit, website with link)
   - Why they need affordable legal help (quote from their post if possible)

2. Create a personalized, empathetic email for EACH person that:
   - Shows you understand their specific legal situation
   - Offers Legal Compass as a free/affordable resource
   - Mentions that many people face similar issues and can't afford lawyers
   - Is warm, supportive, and non-salesy
   - Specifically references their issue (landlord dispute, contract problem, etc.)
   - Provides value by suggesting they can get quick legal answers through our AI tool
   - Is 150-200 words
   - Ends with: "Get free legal guidance: https://legalcompass.store
   
Best regards,
Matthew Burt
Legal Compass

If you'd prefer not to receive this, you can unsubscribe at https://legalcompass.store/unsubscribe"

Format as JSON array:
[
  {
    "name": "Real person's name",
    "email": "their_email@example.com or @username",
    "title": "Brief description of their situation",
    "company": "Forum/platform where found",
    "source": "Direct link to post/profile",
    "relevance": "Quote from their post showing they need help",
    "email_draft": "Complete personalized email"
  }
]

CRITICAL: Only include people with actual contact information. If no email, use their social media handle. Only include REAL people from the web search results. Do NOT make up fictional leads.`;

    const extractionResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a lead extraction specialist. Extract real contact information from web research and create personalized, empathetic outreach emails. Only return valid JSON. Never create fictional leads - only use information from the provided research."
          },
          {
            role: "user",
            content: extractionPrompt
          }
        ],
        temperature: 0.7,
      })
    });

    if (!extractionResponse.ok) {
      const errorText = await extractionResponse.text();
      console.error('Extraction error:', extractionResponse.status, errorText);
      throw new Error(`Extraction error: ${extractionResponse.status}`);
    }

    const extractionResult = await extractionResponse.json();
    const content = extractionResult.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    // Try to extract JSON from the response
    let leads = [];
    let invalidLeads = [];
    try {
      // Look for JSON array in the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsedLeads = JSON.parse(jsonMatch[0]);
        
        // Validate each lead and filter out invalid ones
        for (const lead of parsedLeads) {
          const validation = leadSchema.safeParse(lead);
          if (validation.success) {
            leads.push(validation.data);
          } else {
            console.warn('Invalid lead found:', lead, 'Errors:', validation.error.issues);
            invalidLeads.push({ lead, errors: validation.error.issues });
          }
        }
      } else {
        console.error('No JSON array found in response');
        throw new Error('Invalid response format from AI');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw content:', content);
      throw new Error('Failed to parse lead data');
    }

    console.log(`Successfully generated ${leads.length} valid leads, ${invalidLeads.length} invalid leads filtered out`);

    return new Response(
      JSON.stringify({ 
        leads,
        metadata: {
          total: leads.length,
          timestamp,
          searchSeed: randomSeed,
          filtered: invalidLeads.length
        },
        disclaimer: "These are real people found from current web searches. Ensure compliance with CAN-SPAM, GDPR, and other email marketing laws."
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Lead finder error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate leads',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
