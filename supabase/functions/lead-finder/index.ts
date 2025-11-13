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

    const searchPrompt = `Find potential customers for a legal research AI tool. Search the web for publicly available contact information.

TARGET AUDIENCE: ${targetAudience}
INDUSTRY: ${industry || 'general'}
LOCATION: ${location || 'any'}

PRIORITY TARGETS:
- Law students (especially 1L, 2L students who are new to legal research and struggling with case law)
- Small business owners (who need legal guidance but can't afford constant lawyer consultations)
- Startup founders (dealing with contracts, compliance, employment law)
- Freelancers and independent contractors (needing help with agreements and legal protections)
- Non-profit organizations (with limited legal budgets)
- People facing legal situations for the first time (tenants, landlords, family matters)
- Individuals seeking legal advice but cannot afford an attorney (use personal email addresses from social media, forums, community posts)

INSTRUCTIONS:
1. Search for businesses, professionals, or individuals who would benefit from affordable legal research
2. Focus on people who are NOT already legal experts - target those who need accessible, easy-to-understand legal information
3. Look for personal email addresses from forums, social media profiles, community discussions, and public posts
4. Find their publicly available email addresses from:
   - Company websites (contact pages, team pages)
   - Professional directories (LinkedIn, industry listings)
   - Public business registrations
   - Professional social media profiles
3. Return ONLY publicly available information
4. For EACH lead, write a professional, personalized cold email (150-200 words) that:
   - Addresses them by name
   - References their specific role/company
   - Explains how our AI legal research tool solves their specific pain points
   - Is signed by Matthew Burt from Legal Compass
   - Ends with a link to visit our website: https://legalcompass.store
   - Includes an unsubscribe option
   - Is professional yet friendly
   - Complies with CAN-SPAM (includes who we are, what we offer, unsubscribe option)
   
   IMPORTANT: The email should end with:
   "Learn more and try it out: https://legalcompass.store
   
   Best regards,
   Matthew Burt
   Legal Compass
   
   If you'd prefer not to receive future emails, please click here to unsubscribe."
   
5. Format as a JSON array with structure:
   [
     {
       "name": "Person/Company Name",
       "email": "email@example.com",
       "title": "Job Title",
       "company": "Company Name",
       "source": "Where you found this info",
       "relevance": "Why they might need legal research",
       "email_draft": "The complete personalized email ready to send"
     }
   ]

Find 10-15 high-quality leads. Only return valid, publicly listed email addresses.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
            content: "You are a lead generation AI that finds publicly available contact information for potential B2B customers. You only return information that is publicly listed and accessible. You format all responses as valid JSON arrays. IMPORTANT: Always generate DIFFERENT, UNIQUE leads for each request based on the specific input criteria."
          },
          {
            role: "user",
            content: searchPrompt
          }
        ],
        temperature: 0.9,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

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
        // If no JSON found, return the raw content for manual parsing
        leads = [{ error: "Could not parse AI response", raw: content }];
      }
    } catch (parseError) {
      leads = [{ error: "JSON parse error", raw: content }];
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        leads,
        invalidCount: invalidLeads.length,
        disclaimer: "These are publicly available contacts found on the internet. Ensure compliance with CAN-SPAM, GDPR, and other email marketing laws."
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in lead-finder function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
