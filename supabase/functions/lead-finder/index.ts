import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    const { targetAudience, industry, location } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const searchPrompt = `Find potential customers for a legal research AI tool. Search the web for publicly available contact information.

TARGET AUDIENCE: ${targetAudience}
INDUSTRY: ${industry || 'general'}
LOCATION: ${location || 'any'}

INSTRUCTIONS:
1. Search for businesses, professionals, or individuals who would benefit from affordable legal research
2. Find their publicly available email addresses from:
   - Company websites (contact pages, team pages)
   - Professional directories (LinkedIn, industry listings)
   - Public business registrations
   - Professional social media profiles
3. Return ONLY publicly available information
4. Format as a JSON array with structure:
   [
     {
       "name": "Person/Company Name",
       "email": "email@example.com",
       "title": "Job Title",
       "company": "Company Name",
       "source": "Where you found this info",
       "relevance": "Why they might need legal research"
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
            content: "You are a lead generation AI that finds publicly available contact information for potential B2B customers. You only return information that is publicly listed and accessible. You format all responses as valid JSON arrays."
          },
          {
            role: "user",
            content: searchPrompt
          }
        ],
        temperature: 0.3,
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
    try {
      // Look for JSON array in the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        leads = JSON.parse(jsonMatch[0]);
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
