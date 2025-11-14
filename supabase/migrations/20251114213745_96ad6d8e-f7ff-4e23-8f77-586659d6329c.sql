-- Fix RLS policies for email_send_log table
CREATE POLICY "Service role can manage email logs"
ON public.email_send_log
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow users to view their own sent emails (if sent_by is populated)
CREATE POLICY "Users can view their own sent emails"
ON public.email_send_log
FOR SELECT
TO authenticated
USING (sent_by = auth.uid());