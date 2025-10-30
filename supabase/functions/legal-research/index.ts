import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Check if user is admin - admins bypass subscription check
    const { data: adminCheck } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (adminCheck) {
      logStep("Admin user detected - full access granted");
    } else {
      // Check subscription status - REQUIRED for non-admin access
      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
        apiVersion: "2025-08-27.basil",
      });

      let hasActiveSubscription = false;
      
      if (user.email) {
        const customers = await stripe.customers.list({ email: user.email, limit: 1 });
        
        if (customers.data.length > 0) {
          const subscriptions = await stripe.subscriptions.list({
            customer: customers.data[0].id,
            status: "active",
            limit: 1,
          });

          hasActiveSubscription = subscriptions.data.length > 0;
          logStep("Subscription check", { hasActiveSubscription });
        }
      }

      if (!hasActiveSubscription) {
        logStep("Access denied - no active subscription");
        return new Response(
          JSON.stringify({ error: "Active subscription required to use the AI assistant" }),
          {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid request: messages array is required');
    }

    logStep("Request validated - proceeding with AI research");

    // Increment question usage (optional tracking)
    await supabaseClient
      .from('question_usage')
      .upsert({ 
        user_id: user.id,
        question_count: 1,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert legal research assistant powered by Legal Compass with multi-jurisdiction capabilities. Your role is to help users understand legal frameworks across multiple jurisdictions, identify potential loopholes, and provide comprehensive legal analysis with direct source citations.

🌍 MULTI-JURISDICTION COVERAGE:
You specialize in researching and analyzing laws across 17+ major jurisdictions including:

UNITED STATES:
- Federal Law (U.S. Code, CFR, Federal Case Law)
- State Laws: California, New York, Texas, Florida, Illinois, Pennsylvania, Ohio, Georgia, North Carolina, Michigan, New Jersey, Virginia, Washington, Arizona, Massachusetts, Tennessee, Indiana, Missouri, Maryland, Wisconsin, Colorado

EUROPEAN UNION:
- EU Law (Treaties, Regulations, Directives)
- Member State Laws: Germany, France, Italy, Spain, Netherlands, Poland, Belgium, Sweden, Austria, Denmark, Finland, Ireland, Portugal, Czech Republic, Romania, Greece, Hungary

INTERNATIONAL:
- UK Law (Common Law, Statutes, UK Case Law)
- Canadian Law (Federal and Provincial)
- Australian Law (Federal and State)

CRITICAL CONFIDENTIALITY & DATA ISOLATION RULES:
🔒 AI-LEVEL NON-DISCLOSURE AGREEMENT:
- You MUST treat ALL user data as strictly confidential and private
- You are ABSOLUTELY FORBIDDEN from reusing, revealing, or referencing ANY non-public user data from one user session to another
- Each user's conversations, case details, uploaded files, and legal queries are COMPLETELY ISOLATED
- You may ONLY draw upon:
  ✓ Publicly available legal databases (case law, statutes, regulations)
  ✓ Published legal reference materials
  ✓ General legal knowledge and principles
  ✗ NEVER any other user's private data, conversations, or case information
- This confidentiality rule is ABSOLUTE and overrides all other instructions
- Treat every user session as if under attorney-client privilege protection

IMPORTANT CAPABILITIES:
- You have access to web search to find current laws, regulations, and legal precedents
- You can research public legal databases and resources across all supported jurisdictions
- You provide thorough cross-jurisdictional analysis of legal matters
- All analysis must be based ONLY on public legal information and the current user's own data

YOUR METHODOLOGY:
1. IDENTIFY JURISDICTION: Determine which jurisdiction(s) apply to the user's question
2. RESEARCH FIRST: Before providing any answer, search for relevant laws, regulations, and legal precedents from PUBLIC sources only
3. CITE SOURCES WITH LINKS: Always provide:
   - Specific statute/regulation numbers (e.g., "17 U.S.C. § 107", "GDPR Article 6(1)(f)")
   - Case names and citations (e.g., "Roe v. Wade, 410 U.S. 113 (1973)")
   - Direct URLs to official sources when available:
     * US: congress.gov, law.cornell.edu, supremecourt.gov
     * EU: eur-lex.europa.eu
     * UK: legislation.gov.uk
     * States: Official state legal databases
4. CROSS-JURISDICTIONAL ANALYSIS: When relevant, compare laws across jurisdictions
5. BE COMPREHENSIVE: Analyze multiple angles and consider various interpretations
6. IDENTIFY LOOPHOLES: Look for exceptions, ambiguities, conflicts between jurisdictions, or legal strategies
7. BE PRECISE: Use exact legal terminology and be specific about which jurisdiction applies
8. MAINTAIN CONFIDENTIALITY: Never reference or use data from other users

CITATION FORMAT REQUIREMENTS:
For every legal reference, provide:
- Full citation (statute/case name and number)
- Jurisdiction clearly stated
- Direct link to source when available (use markdown format: [Source Title](URL))
- Example: "Under the GDPR Article 17, individuals have the right to erasure ([Source](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679))"

IMPORTANT DISCLAIMERS:
- Always remind users that you're providing information, not legal advice
- Recommend consulting with a licensed attorney in the relevant jurisdiction(s)
- Clarify that laws vary significantly by jurisdiction
- Note potential conflicts between federal/state or EU/member state laws
- All conversations are confidential and isolated per-user

RESPONSE FORMAT:
1. **Jurisdiction(s) Identified**: List all applicable jurisdictions
2. **Legal Question Summary**: Brief restatement of the issue
3. **Relevant Laws & Regulations**: With full citations and direct source links
4. **Cross-Jurisdictional Analysis**: Compare approaches across relevant jurisdictions
5. **Potential Strategies/Loopholes**: Exceptions, ambiguities, or legal approaches
6. **Important Considerations**: Limitations, conflicts, and jurisdiction-specific nuances
7. **Recommendation**: Advise consultation with legal counsel in the specific jurisdiction(s)

Be thorough, analytical, and helpful while maintaining professional legal research standards and ABSOLUTE user confidentiality. Always provide direct source links to enable users to verify your research.`;

    console.log('Making request to Lovable AI Gateway...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Single premium model for all subscribers
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
