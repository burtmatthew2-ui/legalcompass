-- Fix search_path for update_lead_temperature function
CREATE OR REPLACE FUNCTION update_lead_temperature()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Mark leads as cooling if inactive for 3 days
  UPDATE public.legal_cases
  SET 
    lead_temperature = 'cooling',
    temperature_changed_at = now()
  WHERE 
    lead_temperature = 'warm'
    AND last_activity_at < now() - INTERVAL '3 days'
    AND last_activity_at >= now() - INTERVAL '7 days';
  
  -- Mark leads as cold if inactive for 7 days
  UPDATE public.legal_cases
  SET 
    lead_temperature = 'cold',
    temperature_changed_at = now()
  WHERE 
    lead_temperature IN ('warm', 'cooling')
    AND last_activity_at < now() - INTERVAL '7 days';
END;
$$;

-- Fix search_path for mark_lead_warm function
CREATE OR REPLACE FUNCTION mark_lead_warm()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update lead to warm and refresh activity timestamp
  UPDATE public.legal_cases
  SET 
    lead_temperature = 'warm',
    last_activity_at = now(),
    temperature_changed_at = CASE 
      WHEN lead_temperature != 'warm' THEN now()
      ELSE temperature_changed_at
    END
  WHERE user_id = NEW.user_id
    AND lead_temperature != 'warm';
  
  RETURN NEW;
END;
$$;