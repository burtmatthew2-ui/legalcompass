import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting lead temperature update...');

    // Call the database function to update lead temperatures
    const { error } = await supabaseClient.rpc('update_lead_temperature');

    if (error) {
      console.error('Error updating lead temperatures:', error);
      throw error;
    }

    console.log('Lead temperatures updated successfully');

    // Get count of leads that were updated
    const { data: coolingLeads } = await supabaseClient
      .from('legal_cases')
      .select('id', { count: 'exact', head: true })
      .eq('lead_temperature', 'cooling');

    const { data: coldLeads } = await supabaseClient
      .from('legal_cases')
      .select('id', { count: 'exact', head: true })
      .eq('lead_temperature', 'cold');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead temperatures updated',
        cooling: coolingLeads?.length || 0,
        cold: coldLeads?.length || 0
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error: any) {
    console.error('Error in update-lead-temperature function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
