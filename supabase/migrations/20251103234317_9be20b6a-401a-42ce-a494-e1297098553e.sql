-- Fix critical RLS vulnerability in email_unsubscribes table
-- Remove the overly permissive "Users can view their own unsubscribe status" policy
DROP POLICY IF EXISTS "Users can view their own unsubscribe status" ON public.email_unsubscribes;

-- Add a properly scoped policy that only allows users to check their own email's unsubscribe status
CREATE POLICY "Users can view their own email unsubscribe status"
ON public.email_unsubscribes
FOR SELECT
USING (
  email = (SELECT email FROM public.profiles WHERE id = auth.uid())
);

-- Add comment for data retention on email_send_log
COMMENT ON TABLE public.email_send_log IS 'Contains sensitive email data. Implement data retention policy to auto-delete records older than 90 days for compliance.';