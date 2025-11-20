-- Add subscription tracking to lawyer_payment_preferences
ALTER TABLE lawyer_payment_preferences 
ADD COLUMN IF NOT EXISTS monthly_lead_limit INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS leads_used_this_month INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS period_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS is_subscribed BOOLEAN DEFAULT FALSE;

-- Update existing records to set initial values
UPDATE lawyer_payment_preferences 
SET monthly_lead_limit = 1, 
    leads_used_this_month = 0,
    period_start = now(),
    is_subscribed = FALSE
WHERE monthly_lead_limit IS NULL;

-- Function to reset monthly lead counts
CREATE OR REPLACE FUNCTION reset_monthly_lead_counts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE lawyer_payment_preferences
  SET leads_used_this_month = 0,
      period_start = now()
  WHERE period_start < now() - INTERVAL '1 month';
END;
$$;