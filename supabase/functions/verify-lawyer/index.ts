import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-LAWYER] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Verify JWT authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      logStep("Authentication failed", { error: authError?.message });
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    logStep("User authenticated", { userId: user.id });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { lawyerId } = await req.json();
    
    // Validate lawyerId format (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!lawyerId || !uuidRegex.test(lawyerId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid lawyerId format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    logStep("Received verification request", { lawyerId, requestedBy: user.id });

    // Fetch lawyer profile
    const { data: lawyer, error: fetchError } = await supabaseClient
      .from("lawyer_profiles")
      .select("*")
      .eq("id", lawyerId)
      .single();

    if (fetchError || !lawyer) {
      throw new Error("Lawyer profile not found");
    }

    logStep("Lawyer profile fetched", { 
      name: lawyer.full_name, 
      barNumber: lawyer.bar_number,
      states: lawyer.states_licensed 
    });

    // Use AI to verify the lawyer credentials
    const verificationPrompt = `You are a legal credential verification assistant. Analyze the following lawyer information and determine if it appears legitimate:

Lawyer Name: ${lawyer.full_name}
Bar Number: ${lawyer.bar_number}
States Licensed: ${lawyer.states_licensed.join(", ")}
Practice Areas: ${lawyer.practice_areas.join(", ")}
Email: ${lawyer.email}

Based on this information:
1. Check if the bar number format is valid for the listed states (typical formats: 6-7 digits, sometimes with state prefix)
2. Verify the name format is professional and complete (first and last name)
3. Ensure the email appears professional
4. Check if practice areas are legitimate legal practice areas
5. Verify states licensed are actual US states

Respond with a JSON object in this exact format:
{
  "verified": true/false,
  "confidence": "high"/"medium"/"low",
  "reason": "Brief explanation of verification decision",
  "flags": ["List any concerns or red flags"]
}

Be strict but fair. Only verify if all criteria look legitimate.`;

    logStep("Sending verification request to AI");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: "You are a legal credential verification assistant. Always respond with valid JSON only." 
          },
          { role: "user", content: verificationPrompt }
        ],
        temperature: 0.3, // Lower temperature for more consistent verification
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      logStep("AI verification failed", { status: aiResponse.status, error: errorText });
      throw new Error(`AI verification failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;
    logStep("AI response received", { content: aiContent });

    // Parse AI response
    let verificationResult;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || 
                       aiContent.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : aiContent;
      verificationResult = JSON.parse(jsonStr);
    } catch (parseError) {
      logStep("Failed to parse AI response", { error: parseError, content: aiContent });
      // Fallback: manual verification required
      verificationResult = {
        verified: false,
        confidence: "low",
        reason: "AI response parsing failed - manual review required",
        flags: ["Could not parse AI verification response"]
      };
    }

    logStep("Verification result", verificationResult);

    // Auto-verify only if AI confirms with high confidence
    const shouldAutoVerify = verificationResult.verified && 
                            verificationResult.confidence === "high" &&
                            (!verificationResult.flags || verificationResult.flags.length === 0);

    if (shouldAutoVerify) {
      const { error: updateError } = await supabaseClient
        .from("lawyer_profiles")
        .update({ 
          verified_status: true,
          updated_at: new Date().toISOString()
        })
        .eq("id", lawyerId);

      if (updateError) {
        throw updateError;
      }

      logStep("Lawyer auto-verified successfully");

      return new Response(
        JSON.stringify({
          success: true,
          autoVerified: true,
          message: "Lawyer credentials verified and approved automatically",
          details: verificationResult
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      // Requires manual review - send email notification to admin
      logStep("Manual verification required - sending admin notification", { reason: verificationResult.reason });

      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (RESEND_API_KEY) {
        try {
          const flagsList = verificationResult.flags && verificationResult.flags.length > 0 
            ? `<ul>${verificationResult.flags.map((flag: string) => `<li>${flag}</li>`).join('')}</ul>`
            : '<p>No specific flags raised.</p>';

          const emailHtml = `
            <h2>Lawyer Verification Review Required</h2>
            <p>A new lawyer application requires manual review.</p>
            
            <h3>Lawyer Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${lawyer.full_name}</li>
              <li><strong>Email:</strong> ${lawyer.email}</li>
              <li><strong>Bar Number:</strong> ${lawyer.bar_number}</li>
              <li><strong>States Licensed:</strong> ${lawyer.states_licensed.join(", ")}</li>
              <li><strong>Practice Areas:</strong> ${lawyer.practice_areas.join(", ")}</li>
            </ul>

            <h3>AI Verification Result:</h3>
            <ul>
              <li><strong>Verified:</strong> ${verificationResult.verified ? 'Yes' : 'No'}</li>
              <li><strong>Confidence:</strong> ${verificationResult.confidence}</li>
              <li><strong>Reason:</strong> ${verificationResult.reason}</li>
            </ul>

            <h3>Flags Identified:</h3>
            ${flagsList}

            <p><strong>Action Required:</strong> Please review this application in the admin dashboard and manually verify or reject.</p>
          `;

          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "Legal Compass <noreply@legalcompass.shop>",
              to: ["admin@legalcompass.shop"], // Update this to your admin email
              subject: `🔍 Lawyer Verification Required: ${lawyer.full_name}`,
              html: emailHtml,
            }),
          });

          if (emailResponse.ok) {
            logStep("Admin notification email sent successfully");
          } else {
            const errorText = await emailResponse.text();
            logStep("Failed to send admin notification email", { error: errorText });
          }
        } catch (emailError) {
          logStep("Error sending admin notification", { error: emailError });
        }
      } else {
        logStep("RESEND_API_KEY not configured - skipping email notification");
      }

      return new Response(
        JSON.stringify({
          success: true,
          autoVerified: false,
          requiresManualReview: true,
          message: "Lawyer credentials require manual review",
          details: verificationResult
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
