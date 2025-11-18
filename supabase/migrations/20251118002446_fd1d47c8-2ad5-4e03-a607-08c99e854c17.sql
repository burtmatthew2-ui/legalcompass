-- Fix search_path for the update function without dropping it
CREATE OR REPLACE FUNCTION public.update_linkedin_outreach_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;