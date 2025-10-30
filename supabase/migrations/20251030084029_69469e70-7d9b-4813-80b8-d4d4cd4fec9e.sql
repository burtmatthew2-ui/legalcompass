-- Create unsubscribe tracking table
CREATE TABLE IF NOT EXISTS public.email_unsubscribes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.email_unsubscribes ENABLE ROW LEVEL SECURITY;

-- Public can insert their own unsubscribe (anyone can unsubscribe)
CREATE POLICY "Anyone can unsubscribe"
ON public.email_unsubscribes
FOR INSERT
TO public
WITH CHECK (true);

-- Public can view their own unsubscribe status
CREATE POLICY "Users can view their own unsubscribe status"
ON public.email_unsubscribes
FOR SELECT
TO public
USING (true);

-- Admins can view all unsubscribes
CREATE POLICY "Admins can view all unsubscribes"
ON public.email_unsubscribes
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create email send log table for tracking
CREATE TABLE IF NOT EXISTS public.email_send_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_by UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'sent',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.email_send_log ENABLE ROW LEVEL SECURITY;

-- Admins can view all send logs
CREATE POLICY "Admins can view email logs"
ON public.email_send_log
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Admins can insert send logs
CREATE POLICY "Admins can create email logs"
ON public.email_send_log
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));