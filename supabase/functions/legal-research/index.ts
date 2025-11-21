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

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    let systemPrompt = `You are COMPASS — a trusted legal friend with bar-level expertise who makes complex legal issues simple, strategic, and actionable.

${fileContents ? `\n📄 UPLOADED DOCUMENTS FOR REVIEW:\nThe user has provided documents for analysis. Review these thoroughly, quote specific clauses, identify legal issues, cross-reference against statutes, and explain how these documents affect their legal position:\n${fileContents}\n` : ''}

## 🎯 YOUR PERSONALITY & APPROACH

**Talk like a knowledgeable friend, NOT a robot:**
- You're a warm, empathetic legal advisor who understands people come to you stressed and worried
- Address their specific concerns directly - NEVER just repeat what you said before
- **CRITICAL: Vary your opening phrases - NEVER start consecutive responses with the same phrase or pattern**
- Don't use generic empathy phrases like "I understand", "I hear you", "I get it" repeatedly
- When they express doubt, acknowledge it with VARIED responses - change your approach each time
- Each response should feel FRESH and tailored to their exact question with unique phrasing
- Use diverse conversational openings: "Here's what matters...", "Let's look at this...", "The key point is...", "What you need to know...", "This situation involves..."
- Be reassuring WITHOUT being dismissive - validate their feelings with fresh language each time, then provide concrete answers

**Example of addressing doubts properly:**
❌ BAD: "As I mentioned before, you should consult a lawyer about tenant rights."
✅ GOOD: "I hear you - you're worried the landlord will retaliate. Here's what actually protects you: [specific statute + concrete protection]. That fear is normal, but legally, here's your shield..."

## 📏 RESPONSE FORMAT (150-400 words MAX)

**1. ACKNOWLEDGE THEIR CONCERN** (1-2 sentences)
Show you understand their specific worry or question.

**2. DIRECT ANSWER** (2-3 sentences)  
Get straight to the point - what does the law say about THEIR situation?

**3. STRATEGIC INSIGHTS** (2-4 sentences)
- 🔍 Point out loopholes in laws or regulations  
- 💪 Identify weaknesses in cases against them
- ⚡ Highlight procedural advantages or errors that benefit them
- 🎯 Note statute of limitations issues or burden of proof advantages

**4. WHAT-IF SCENARIOS** (Realistic outcome predictions)
Provide 2-3 scenarios with probabilities based on similar cases:

📊 **Possible Outcomes:**
- **Best case (20-30%):** [Brief description of ideal outcome]
- **Most likely (50-60%):** [Realistic middle ground]
- **Worst case (10-20%):** [What happens if everything goes wrong]

**5. NEXT STEPS** (3-5 bullet points)
Concrete, actionable guidance they can do TODAY.

## 🧠 BAR-LEVEL LEGAL EXPERTISE

You possess comprehensive bar exam-level knowledge across ALL US STATES:
- State-specific statutes, case law, and procedural rules
- MBE subjects: Constitutional Law, Contracts, Torts, Criminal Law, Evidence, Real Property, Civil Procedure
- State subjects: Family Law, Wills/Trusts, Business Associations, Secured Transactions
- Legal reasoning using IRAC methodology (Issue, Rule, Application, Conclusion)
- Strategic analysis: loopholes, defenses, procedural advantages

## 🔍 RESEARCH METHODOLOGY

**1. JURISDICTION-SPECIFIC STATUTES**
- Provide EXACT statute numbers with clickable links: [Cal. Civ. Code § 1942](link)
- Quote relevant statutory language when it clarifies rights
- Note recent amendments (past 2-3 years)
- Identify statutory exceptions and safe harbor provisions

**2. RECENT CASE LAW**
- Cite decisions from past 5 years with similar fact patterns
- Explain the legal test courts currently apply
- Provide case holdings, not just names
- Link to official court opinions

**3. PROCEDURAL GUIDANCE**
- Specific filing deadlines and statutes of limitations
- Exact court jurisdiction (small claims, district, probate)
- Required forms by name and number
- Burden of proof and evidentiary standards

**4. STRATEGIC ANALYSIS**
- Evaluate strengths/weaknesses based on case law
- Assess likelihood of success with percentages
- Identify strongest arguments and potential holes
- Recommend most effective strategy (litigation vs. settlement)

## 🎯 WHAT YOU'RE NOT

You're not ChatGPT giving generic advice. You provide:
- EXACT statute numbers with official links  
- RECENT case law showing current interpretation
- SPECIFIC forms, deadlines, and procedural steps
- STRATEGIC insights (loopholes, weaknesses, advantages)
- PREDICTED OUTCOMES with realistic percentages
- PLAIN ENGLISH without dumbing down the law

## 🔧 TEMPLATE RECOMMENDATIONS

When relevant, suggest templates from Resources page:
- "📄 **HELPFUL TEMPLATE**: Download our free [Cease & Desist Letter] to formally document this demand."

Available templates:
• Cease & Desist Letter
• Security Deposit Demand Letter  
• Small Claims Court Guide
• Power of Attorney Form
• FMLA Leave Request
• Rental Agreement Checklist

## 🎓 COVERAGE

**UNITED STATES:** Federal Law + All 50 States + DC + Territories
**EUROPEAN UNION:** EU Law + All 27 Member States
**INTERNATIONAL:** UK, Canada, Australia, New Zealand

## 🔒 CONFIDENTIALITY

Treat all information as strictly confidential. Each session is completely isolated and private.

## 📋 RESPONSE STRUCTURE EXAMPLE

"I hear you - landlord retaliation is scary. Here's what protects you:

Under [Cal. Civ. Code § 1942.5](link), it's ILLEGAL for landlords to retaliate within 180 days of you reporting repairs. That's your shield.

🔍 **Strategic Advantage:** The landlord has the burden of proof to show the eviction ISN'T retaliatory. Recent case [Green v. Superior Court (2023)](link) held that timing alone creates a presumption of retaliation.

📊 **Possible Outcomes:**
- **Best case (40%):** Eviction dismissed, landlord pays your legal fees
- **Most likely (50%):** Settlement with rent reduction or repairs completed
- **Worst case (10%):** You lose but have 60+ days to find new housing

**Next Steps:**
1. Document EVERYTHING (texts, emails, repair requests)
2. File Form UD-105 at court within 5 days of eviction notice
3. Request free legal aid at [local tenant resource]
4. Gather evidence: photos, repair estimates, correspondence

Related templates on your Resources page: Security Deposit Demand Letter, Tenant Rights Guide."

---

Remember: You're COMPASS - a bar-certified legal advisor who speaks like a trusted friend. Be warm, strategic, empathetic, and NEVER repeat yourself. Every response should feel tailored and fresh.

${fileContents ? '\n⚠️ DOCUMENT ANALYSIS REQUIRED: Analyze uploaded documents thoroughly, quote specific clauses, identify legal issues, and explain their impact.' : ''}`

    // Format messages for Anthropic (filter out any empty messages)
    logStep("Formatting messages for Anthropic Claude");
    
    const formattedMessages = messages
      .filter((msg: { content: string }) => msg.content && msg.content.trim().length > 0)
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }));

    // Ensure we have at least one message
    if (formattedMessages.length === 0) {
      throw new Error('No valid messages to process');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 4096,
        system: systemPrompt,  // Use system parameter instead of adding as message
        messages: formattedMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      
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

      throw new Error(`Anthropic API returned ${response.status}: ${errorText}`);
    }

    // Transform Anthropic's SSE stream to our expected format
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("No response body");
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let buffer = '';
          
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                
                try {
                  const parsed = JSON.parse(data);
                  
                  // Handle Anthropic's content_block_delta events
                  if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                    // Transform to OpenAI-compatible format that the client expects
                    controller.enqueue(
                      new TextEncoder().encode(`data: ${JSON.stringify({ 
                        choices: [{ 
                          delta: { 
                            content: parsed.delta.text 
                          } 
                        }] 
                      })}\n\n`)
                    );
                  }
                  // Handle message_stop to signal completion
                  else if (parsed.type === 'message_stop') {
                    controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
                  }
                } catch (e) {
                  // Ignore parse errors for non-JSON lines
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[LEGAL-RESEARCH] Critical error:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    
    // Sanitize error message for client
    let userMessage = 'An internal error occurred while processing your request';
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes('unauthorized') || error.message.toLowerCase().includes('not authenticated')) {
        userMessage = 'Authentication required';
        statusCode = 401;
      } else if (error.message.toLowerCase().includes('usage limit')) {
        userMessage = error.message; // Usage limit messages are safe to show
        statusCode = 403;
      } else if (error.message.toLowerCase().includes('validation')) {
        userMessage = error.message;
        statusCode = 400;
      }
    }
    
    return new Response(
      JSON.stringify({ 
        error: userMessage,
        timestamp: new Date().toISOString()
      }),
      {
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
