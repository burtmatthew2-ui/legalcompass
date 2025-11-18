-- Create LinkedIn outreach contacts table
CREATE TABLE IF NOT EXISTS public.linkedin_outreach_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL,
  name TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  practice_area TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'not_contacted' CHECK (status IN ('not_contacted', 'message_sent', 'responded', 'interested', 'joined', 'declined')),
  notes TEXT,
  last_contact TIMESTAMP WITH TIME ZONE DEFAULT now(),
  follow_up_date DATE,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.linkedin_outreach_contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for admins only
CREATE POLICY "Admins can manage LinkedIn outreach contacts"
ON public.linkedin_outreach_contacts
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_linkedin_outreach_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_linkedin_outreach_contacts_updated_at
BEFORE UPDATE ON public.linkedin_outreach_contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_linkedin_outreach_updated_at();