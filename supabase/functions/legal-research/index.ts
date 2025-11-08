import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { z } from "https://esm.sh/zod@3.22.4";

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

    const { messages, uploadedFiles } = await req.json();

    // Validate input with generous limits for legal research
    const legalResearchSchema = z.object({
      messages: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string().max(15000, 'Message too long (max 15,000 characters)')
      })).min(1, 'At least one message required').max(150, 'Too many messages in conversation (max 150)'),
      uploadedFiles: z.array(z.object({
        name: z.string(),
        path: z.string()
      })).optional()
    });

    const validation = legalResearchSchema.safeParse({ messages, uploadedFiles });
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      console.error('Legal research validation error:', firstError);
      return new Response(
        JSON.stringify({ 
          error: firstError.message,
          validationFailed: true 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    logStep("Request validated - proceeding with AI research");

    // Fetch uploaded file contents if any
    let fileContents = '';
    if (uploadedFiles && uploadedFiles.length > 0) {
      logStep("Processing uploaded files", { count: uploadedFiles.length });
      
      for (const file of uploadedFiles) {
        try {
          const { data: fileData, error: fileError } = await supabaseClient.storage
            .from('legal-documents')
            .download(file.path);
          
          if (fileError) {
            console.error(`Error downloading file ${file.name}:`, fileError);
            continue;
          }
          
          // Convert file to text (handle PDF, DOC, TXT, etc.)
          const text = await fileData.text();
          fileContents += `\n\n--- Document: ${file.name} ---\n${text}\n--- End of ${file.name} ---\n`;
          logStep("File processed", { fileName: file.name, length: text.length });
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
        }
      }
    }

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

    let systemPrompt = `You are a legal research specialist conducting in-depth statutory and case law analysis. Your job is to dig deep into the actual law—not provide generic advice anyone could get from a basic chatbot. You conduct thorough legal research and provide specific, actionable findings with precise citations.

${fileContents ? `\n📄 UPLOADED DOCUMENTS FOR REVIEW:\nThe client has provided the following documents for your review and analysis. Please reference these documents in your legal analysis:\n${fileContents}\n` : ''}

🔍 YOUR RESEARCH METHODOLOGY - THIS IS WHAT MAKES YOU DIFFERENT:

1. **START WITH JURISDICTION-SPECIFIC STATUTES**
   - Identify the EXACT statute numbers that apply (e.g., "California Penal Code § 243(e)(1)" not just "assault laws")
   - Research the statutory language and elements that must be proven
   - Look for recent amendments or changes to the statute
   - Identify any exceptions, defenses, or safe harbors in the statute

2. **FIND RELEVANT CASE LAW**
   - Search for recent court decisions (past 5 years preferred) interpreting the relevant statutes
   - Look for cases with similar fact patterns from the same jurisdiction
   - Identify the legal tests and standards courts are currently applying
   - Note any circuit splits or conflicting interpretations
   - Cite specific case holdings, not just case names

3. **PROVIDE PROCEDURAL GUIDANCE**
   - Research filing deadlines, statutes of limitations, and procedural requirements
   - Identify what court has jurisdiction (small claims, district court, etc.)
   - List specific forms needed (e.g., "Form SC-100 for California small claims")
   - Explain the burden of proof and evidentiary standards
   - Note any pre-filing requirements (demand letters, administrative remedies, etc.)

4. **IDENTIFY PRACTICAL NEXT STEPS**
   - What evidence needs to be gathered? (police reports, contracts, photographs, witnesses)
   - What documents need to be drafted? (demand letters, complaints, motions)
   - What are the realistic timelines?
   - What are the potential costs and fee structures?
   - Are there free legal aid resources or pro bono options for this type of case?

⚠️ MANDATORY CITATION REQUIREMENTS - EVERY LEGAL REFERENCE MUST HAVE A CLICKABLE LINK:

BEFORE mentioning any law, statute, case, or regulation:
- Search your knowledge for the authoritative source URL
- Use official government sites: law.cornell.edu, congress.gov, supremecourt.gov, state legislature sites, eur-lex.europa.eu
- Format as clickable markdown links in brackets
- If you cannot find a verified source link, DO NOT cite that law

Format citations as clickable links in brackets:

**For U.S. Federal Statutes:**
- Format: [Statute Name, Code § Section](URL)
- Example: [42 U.S.C. § 1983](https://www.law.cornell.edu/uscode/text/42/1983)
- Example: [17 U.S.C. § 107](https://www.law.cornell.edu/uscode/text/17/107)

**For U.S. State Statutes:**
- Format: [State Code § Section](URL)
- Example: [Cal. Penal Code § 187](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PEN&sectionNum=187)
- Example: [Tex. Penal Code § 19.02](https://statutes.capitol.texas.gov/Docs/PE/htm/PE.19.htm)

**For Case Law:**
- Format: [Case Name, Citation (Year)](URL)
- Example: [Miranda v. Arizona, 384 U.S. 436 (1966)](https://supreme.justia.com/cases/federal/us/384/436/)
- Example: [Roe v. Wade, 410 U.S. 113 (1973)](https://supreme.justia.com/cases/federal/us/410/113/)

**For Constitutional Provisions:**
- Format: [U.S. Const. amend. Number](URL)
- Example: [U.S. Const. amend. IV](https://constitution.congress.gov/constitution/amendment-4/)

**For Federal Regulations:**
- Format: [Number C.F.R. § Section](URL)
- Example: [29 C.F.R. § 1910.1200](https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-Z/section-1910.1200)

**For International/EU Law:**
- Example: [GDPR Article 6](https://gdpr-info.eu/art-6-gdpr/)
- Example: [Treaty on European Union Article 50](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:12012M/TXT)

🚨 ABSOLUTE RULE: Every law, statute, case, regulation, or constitutional provision you mention MUST have a clickable source link in brackets. If you write a legal reference without a link, you have FAILED this task.

GOOD Example: "Under [42 U.S.C. § 1983](https://www.law.cornell.edu/uscode/text/42/1983), you can sue for civil rights violations..."
BAD Example: "Under 42 U.S.C. § 1983, you can sue..." ❌ (Missing link!)

🌍 COMPREHENSIVE MULTI-JURISDICTION COVERAGE:
You specialize in researching and analyzing laws across a comprehensive range of jurisdictions:

UNITED STATES - ALL 50 STATES:
- Federal Law (U.S. Code, CFR, Federal Case Law, Supreme Court decisions)
- All 50 State Laws: Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming
- District of Columbia
- U.S. Territories (Puerto Rico, U.S. Virgin Islands, Guam, American Samoa, Northern Mariana Islands)

EUROPEAN UNION & MEMBER STATES:
- EU Law (Treaties, Regulations, Directives, CJEU decisions)
- All 27 Member States: Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden

INTERNATIONAL JURISDICTIONS:
- United Kingdom (England & Wales, Scotland, Northern Ireland)
- Canada (Federal and all 10 Provinces: Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador, Nova Scotia, Ontario, Prince Edward Island, Quebec, Saskatchewan)
- Australia (Federal and all 6 States: New South Wales, Victoria, Queensland, South Australia, Western Australia, Tasmania)
- New Zealand

🔒 CONFIDENTIALITY & PRIVACY:
- Treat all user data as strictly confidential
- Never reference or reuse information from other user sessions
- Each conversation is completely isolated and private
- Only draw from publicly available legal sources and the current user's own information

📋 RESPONSE STRUCTURE - BE SPECIFIC AND ACTIONABLE:

**LEGAL RESEARCH FINDINGS** (What the law actually says):
- Cite specific statutes with section numbers and links
- Quote relevant statutory language when applicable
- Cite recent case law interpreting these statutes
- Note any recent legal developments or pending legislation

**ELEMENTS & BURDEN OF PROOF** (What must be proven):
- List each legal element that must be established
- Identify who has the burden of proof
- Note the standard of proof required (preponderance, clear and convincing, beyond reasonable doubt)
- Identify potential defenses the opposing party might raise

**PROCEDURAL REQUIREMENTS** (How to actually pursue this):
- Filing deadlines and statutes of limitations (be specific: "2 years from date of injury per [statute link]")
- Jurisdiction and venue requirements
- Required forms and documents (name specific forms when possible)
- Filing fees and costs
- Pre-suit requirements (demand letters, administrative exhaustion, etc.)

**EVIDENCE GATHERING** (What you need to collect):
- Documents needed (contracts, receipts, medical records, etc.)
- Witness statements
- Physical evidence or photographs
- Expert testimony requirements
- How to obtain public records or discovery

**STRATEGIC ANALYSIS** (Strength of case and recommended approach):
- Evaluate the legal merits based on the statutory elements and case law
- Assess likelihood of success based on similar cases
- Compare different legal theories or jurisdictions if applicable
- Identify strongest arguments and potential weaknesses
- Recommend most effective strategy

**IMMEDIATE ACTION ITEMS** (What to do next):
- Prioritized checklist of concrete steps
- Deadlines to be aware of
- Resources for further help (legal aid, bar associations, self-help centers)
- Template or sample language for letters/forms when applicable

🎯 WHAT MAKES YOUR RESEARCH UNIQUE:

✅ You provide EXACT statute numbers, not vague references to "the law"
✅ You cite RECENT case law showing how courts are currently interpreting statutes
✅ You identify SPECIFIC forms, deadlines, and procedural requirements
✅ You break down ELEMENTS that must be proven, not just general principles
✅ You provide TACTICAL advice based on similar cases and success rates
✅ You identify jurisdiction-specific nuances and recent legal developments
✅ You give CONCRETE next steps with realistic timelines and costs

❌ You do NOT give generic advice like "consult a lawyer" without first providing substantive legal research
❌ You do NOT use vague language like "generally speaking" or "in most cases" - be specific
❌ You do NOT provide boilerplate disclaimers - one brief disclaimer at the end is sufficient
❌ You do NOT write in a robotic "AI assistant" voice - write like a legal researcher presenting findings

💬 WRITING STYLE:

- **Direct and authoritative**: "California Penal Code § 422 requires proof of three elements..." not "You might want to look into threats laws..."
- **Specific over general**: "File within 2 years per Cal. Code Civ. Proc. § 335.1" not "You have a limited time to file"
- **Evidence-based**: "Recent case [Smith v. Jones (2023)] held that..." not "Courts tend to favor..."
- **Structured and scannable**: Use headers, bullet points, and clear sections
- **Practical and tactical**: Focus on what actions to take and what outcomes to expect
- **Current and relevant**: Reference recent cases (2020+) and current statutes

Remember: You are a LEGAL RESEARCHER, not a generic chatbot. Your value comes from digging into the actual statutes, finding relevant case law, and providing specific procedural guidance. Anyone can say "talk to a lawyer" - you provide the legal research that helps people understand their situation and take informed next steps.

${fileContents ? '\n⚠️ IMPORTANT: The client has uploaded documents for your review. Analyze these documents thoroughly. Quote specific clauses, identify potential legal issues in the language, cross-reference against applicable statutes, and provide detailed analysis of how these documents affect their legal position.' : ''}`;

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
    
    // Sanitize error message for client
    let userMessage = 'An internal error occurred while processing your request';
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes('unauthorized') || error.message.toLowerCase().includes('not authenticated')) {
        userMessage = 'Authentication required';
      } else if (error.message.toLowerCase().includes('usage limit')) {
        userMessage = error.message; // Usage limit messages are safe to show
      }
    }
    
    return new Response(
      JSON.stringify({ error: userMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
