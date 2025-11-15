-- Add lead temperature tracking to legal_cases table
ALTER TABLE public.legal_cases 
ADD COLUMN lead_temperature TEXT DEFAULT 'warm' CHECK (lead_temperature IN ('warm', 'cooling', 'cold')),
ADD COLUMN last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN temperature_changed_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create index for efficient querying
CREATE INDEX idx_legal_cases_temperature ON public.legal_cases(lead_temperature);
CREATE INDEX idx_legal_cases_last_activity ON public.legal_cases(last_activity_at);

-- Function to update lead temperature based on inactivity
CREATE OR REPLACE FUNCTION update_lead_temperature()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Function to mark lead as warm when user becomes active
CREATE OR REPLACE FUNCTION mark_lead_warm()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Trigger to mark leads as warm when user logs in (via auth sessions)
-- This will be called from the application when user activity is detected