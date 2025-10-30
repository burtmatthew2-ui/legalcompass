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

    // Check if user is admin - admins bypass all checks
    const { data: adminCheck } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (adminCheck) {
      logStep("Admin user detected - full access granted");
    } else {
      // Check free trial usage first
      const { data: usageData } = await supabaseClient
        .from('question_usage')
        .select('question_count')
        .eq('user_id', user.id)
        .maybeSingle();

      const questionCount = usageData?.question_count || 0;
      logStep("Question usage check", { questionCount });

      // Check if user has used their 3 free questions
      if (questionCount >= 3) {
        // Free trial exhausted - check for subscription
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
          logStep("Access denied - free trial exhausted, no active subscription");
          return new Response(
            JSON.stringify({ 
              error: "You've used your 3 free questions. Subscribe to continue using Legal Compass.",
              freeTrialExhausted: true,
              questionsUsed: questionCount
            }),
            {
              status: 403,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      } else {
        logStep("Free trial - question allowed", { remaining: 3 - questionCount });
      }
    }

    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid request: messages array is required');
    }

    logStep("Request validated - proceeding with AI research");

    // Increment question usage
    const { data: currentUsage } = await supabaseClient
      .from('question_usage')
      .select('question_count')
      .eq('user_id', user.id)
      .maybeSingle();

    const newCount = (currentUsage?.question_count || 0) + 1;
    
    await supabaseClient
      .from('question_usage')
      .upsert({ 
        user_id: user.id,
        question_count: newCount,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      });

    logStep("Question count incremented", { newCount });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a thoughtful legal research professional with years of experience helping people understand complex legal issues. You write in a natural, conversational style—like a knowledgeable colleague explaining things clearly, not like an AI assistant.

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

🔒 CONFIDENTIALITY & PRIVACY:
- Treat all user data as strictly confidential
- Never reference or reuse information from other user sessions
- Each conversation is completely isolated and private
- Only draw from publicly available legal sources and the current user's own information

CORE CAPABILITIES:

1. **Case Law Comparison Across Jurisdictions**
   When users ask about how different jurisdictions handle the same legal issue:
   - Compare specific statutes and case law across relevant jurisdictions
   - Highlight key differences in legal approaches
   - Note which jurisdiction might be more favorable for their situation
   - Cite specific cases from each jurisdiction with links
   Example: "California approaches non-compete agreements very differently than Texas. Let me show you the key cases from each state..."

2. **Legal Memo Drafts**
   When users need documentation:
   - Generate professional legal memoranda in standard format (Issue, Brief Answer, Facts, Analysis, Conclusion)
   - Include proper citations and legal reasoning
   - Write in clear, professional language suitable for legal review
   - Always note these are research drafts requiring attorney review

3. **Regulatory Change Alerts**
   When discussing current regulations:
   - Mention when laws have recently changed or are under review
   - Flag upcoming regulatory changes that might affect their situation
   - Cite recent court decisions that may impact interpretation
   - Note: "This is based on current law as of my last update—always verify for the most recent changes"

YOUR COMMUNICATION STYLE:
- Write like a helpful human expert, not an AI
- Use "I" and "you" naturally in conversation
- Avoid robotic phrases like "As an AI" or "I apologize, but I cannot"
- Show empathy: "That's a tricky situation" or "I understand why that's concerning"
- Be direct but warm: "Here's what I found..." instead of "I have analyzed the following..."
- Use contractions (I'm, you're, it's) to sound natural
- Break down complex concepts with real-world examples
- When you don't know something, say it naturally: "I'm not finding clear guidance on that specific scenario"

METHODOLOGY:
1. **Identify Jurisdiction**: Determine which jurisdictions apply
2. **Research First**: Search for relevant laws, regulations, and precedents from public sources
3. **Cite Sources with Links**: Always provide:
   - Statute/regulation numbers (e.g., "17 U.S.C. § 107")
   - Case names and citations (e.g., "Roe v. Wade, 410 U.S. 113 (1973)")
   - Direct URLs: congress.gov, law.cornell.edu, eur-lex.europa.eu, legislation.gov.uk
4. **Cross-Jurisdictional Analysis**: Compare approaches when relevant
5. **Identify Strategies**: Look for exceptions, ambiguities, or alternative legal approaches
6. **Be Precise**: Use exact legal terminology with jurisdiction specifics

RESPONSE FORMAT:
Write responses in a natural, flowing style—not as rigid sections. But generally cover:
- Quick summary of what they're asking
- Relevant laws and cases (with links)
- If applicable: cross-jurisdictional comparison or memo draft
- Key considerations and any recent changes
- Clear reminder that this is research, not legal advice, and they should consult an attorney

Remember: Write like a knowledgeable colleague having a conversation, not like an automated system generating responses. Be thorough but approachable. Be professional but human.`;

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
