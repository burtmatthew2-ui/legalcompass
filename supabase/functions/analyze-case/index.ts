import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { state, legalTopic, urgency, description } = await req.json();

    if (!state || !legalTopic || !urgency || !description) {
      throw new Error('All fields are required');
    }

    console.log('Analyzing case:', { state, legalTopic, urgency });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Create detailed prompt for AI analysis
    const prompt = `You are a professional legal analyst providing preliminary case assessments. Analyze the following legal situation and provide a structured response.

**Case Details:**
- State: ${state}
- Legal Topic: ${legalTopic}
- Urgency: ${urgency}
- Description: ${description}

**Instructions:**
Provide a professional, empathetic analysis that includes:
1. A brief case assessment (2-3 sentences explaining what this case involves)
2. Success probability if handling alone (as percentage with brief reasoning)
3. Success probability with attorney representation (as percentage with brief reasoning)
4. Estimated attorney cost range (be realistic for ${legalTopic} in ${state})
5. List 3-4 key factors that will impact this case
6. List 3-4 recommended next steps

Be professional but empathetic. Use plain language, not legal jargon. Be realistic about both challenges and opportunities. Format your response as JSON with these exact keys:
{
  "caseAssessment": "string",
  "successChanceSolo": "XX-XX%",
  "successChanceWithLawyer": "XX-XX%",
  "estimatedCost": "$X,XXX - $XX,XXX (or contingency fee info)",
  "keyFactors": ["factor1", "factor2", "factor3"],
  "nextSteps": ["step1", "step2", "step3"]
}`;

    // Call Lovable AI Gateway
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a professional legal analyst providing preliminary case assessments. Always respond with valid JSON only, no markdown formatting.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        throw new Error('Our AI service is experiencing high demand. Please try again in a moment.');
      }
      if (aiResponse.status === 402) {
        throw new Error('AI service temporarily unavailable. Please try again later.');
      }
      
      throw new Error('Failed to analyze case. Please try again.');
    }

    const aiData = await aiResponse.json();
    console.log('AI response received');

    // Extract and parse the JSON response
    let analysisText = aiData.choices[0]?.message?.content || '';
    
    // Remove markdown code blocks if present
    analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Raw text:', analysisText);
      
      // Fallback: create a structured response from the text
      analysis = {
        caseAssessment: analysisText.substring(0, 300) + '...',
        successChanceSolo: '20-40%',
        successChanceWithLawyer: '60-80%',
        estimatedCost: '$2,000 - $10,000',
        keyFactors: [
          'Legal complexity of your situation',
          'Available evidence and documentation',
          'Time sensitivity and urgency level',
          'Local laws and precedents in ' + state
        ],
        nextSteps: [
          'Gather all relevant documents and evidence',
          'Document timeline of events in detail',
          'Consult with a licensed attorney for specific advice',
          'Consider your budget and legal options'
        ]
      };
    }

    // Validate the analysis structure
    if (!analysis.caseAssessment || !analysis.successChanceSolo || !analysis.successChanceWithLawyer) {
      throw new Error('Invalid analysis format received');
    }

    console.log('Analysis completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        analysis 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: any) {
    console.error('Error in analyze-case function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Analysis failed. Please try again.',
        success: false
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
