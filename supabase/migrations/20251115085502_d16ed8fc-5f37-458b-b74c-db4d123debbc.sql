-- Fix Critical Security Issue #1: Prevent users from self-assigning admin roles
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Users can insert their own role during signup" ON user_roles;
DROP POLICY IF EXISTS "Users can insert their own role on signup" ON user_roles;

-- Create restricted policy: users can only assign themselves client or attorney roles
CREATE POLICY "Users can assign client or attorney role on signup"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id 
    AND role IN ('client', 'attorney')
  );

-- Allow admins to assign any role (including admin) to other users
CREATE POLICY "Admins can assign any role"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Fix Critical Security Issue #2: Restrict notification creation to service role
-- Drop overly permissive policy
DROP POLICY IF EXISTS "System can create notifications" ON message_notifications;

-- Only service role (edge functions) can create notifications
CREATE POLICY "Service role can create notifications"
  ON message_notifications
  FOR INSERT
  TO service_role
  WITH CHECK (true);