-- Fix notification spam vulnerability by restricting to service role only
DROP POLICY IF EXISTS "Service role can create notifications" ON public.message_notifications;
DROP POLICY IF EXISTS "System can create notifications" ON public.message_notifications;

-- Only service role (edge functions) can create notifications
CREATE POLICY "Service role can create notifications"
  ON public.message_notifications
  FOR INSERT
  TO service_role
  WITH CHECK (true);