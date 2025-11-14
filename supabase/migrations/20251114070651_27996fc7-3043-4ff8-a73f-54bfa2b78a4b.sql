-- Add pricing model tracking to lawyer profiles
ALTER TABLE public.lawyer_profiles
ADD COLUMN IF NOT EXISTS pricing_model TEXT DEFAULT 'commission',
ADD COLUMN IF NOT EXISTS free_lead_used BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS total_leads_purchased INTEGER DEFAULT 0;

-- Create pricing tiers table for pay-per-lead options
CREATE TABLE IF NOT EXISTS public.lead_pricing_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_name TEXT NOT NULL,
  leads_count INTEGER NOT NULL,
  price_per_lead INTEGER NOT NULL, -- in cents
  total_price INTEGER NOT NULL, -- in cents
  stripe_price_id TEXT NOT NULL,
  stripe_product_id TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.lead_pricing_tiers ENABLE ROW LEVEL SECURITY;

-- Anyone can view pricing tiers
CREATE POLICY "Anyone can view pricing tiers"
  ON public.lead_pricing_tiers
  FOR SELECT
  USING (active = true);

-- Track lawyer payment preferences
CREATE TABLE IF NOT EXISTS public.lawyer_payment_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  pricing_model TEXT NOT NULL DEFAULT 'commission', -- 'commission' or 'pay_per_lead'
  lead_credits_remaining INTEGER NOT NULL DEFAULT 0,
  commission_rate NUMERIC NOT NULL DEFAULT 20.00, -- percentage
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.lawyer_payment_preferences ENABLE ROW LEVEL SECURITY;

-- Lawyers can view their own preferences
CREATE POLICY "Lawyers can view their own payment preferences"
  ON public.lawyer_payment_preferences
  FOR SELECT
  USING (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can insert their own payment preferences"
  ON public.lawyer_payment_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can update their own payment preferences"
  ON public.lawyer_payment_preferences
  FOR UPDATE
  USING (auth.uid() = lawyer_id);

-- Trigger for updated_at
CREATE TRIGGER update_lawyer_payment_preferences_updated_at
  BEFORE UPDATE ON public.lawyer_payment_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create payment preferences on lawyer profile creation
CREATE OR REPLACE FUNCTION public.create_lawyer_payment_preferences()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.lawyer_payment_preferences (lawyer_id, pricing_model, lead_credits_remaining)
  VALUES (NEW.user_id, 'commission', 1) -- Start with 1 free credit
  ON CONFLICT (lawyer_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_lawyer_profile_created_payment_prefs
  AFTER INSERT ON public.lawyer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_lawyer_payment_preferences();