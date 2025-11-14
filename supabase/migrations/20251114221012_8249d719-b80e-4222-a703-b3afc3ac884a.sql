-- Commission agreements table
CREATE TABLE IF NOT EXISTS public.commission_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contract_text TEXT NOT NULL,
  signature_data TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  commission_rate NUMERIC NOT NULL DEFAULT 10.00,
  agreed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Commission tracking table
CREATE TABLE IF NOT EXISTS public.commission_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES public.legal_cases(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  case_value NUMERIC NOT NULL,
  commission_rate NUMERIC NOT NULL DEFAULT 10.00,
  commission_amount NUMERIC NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  reported_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.commission_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies for commission_agreements
CREATE POLICY "Lawyers can view their own agreements"
  ON public.commission_agreements FOR SELECT
  USING (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can create their own agreements"
  ON public.commission_agreements FOR INSERT
  WITH CHECK (auth.uid() = lawyer_id);

-- RLS Policies for commission_tracking
CREATE POLICY "Lawyers can view their own commission records"
  ON public.commission_tracking FOR SELECT
  USING (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can report commissions"
  ON public.commission_tracking FOR INSERT
  WITH CHECK (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can update their commission records"
  ON public.commission_tracking FOR UPDATE
  USING (auth.uid() = lawyer_id);

-- Add index for performance
CREATE INDEX idx_commission_agreements_lawyer_id ON public.commission_agreements(lawyer_id);
CREATE INDEX idx_commission_tracking_lawyer_id ON public.commission_tracking(lawyer_id);
CREATE INDEX idx_commission_tracking_payment_status ON public.commission_tracking(payment_status);

-- Trigger for updated_at
CREATE TRIGGER update_commission_tracking_updated_at
  BEFORE UPDATE ON public.commission_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();