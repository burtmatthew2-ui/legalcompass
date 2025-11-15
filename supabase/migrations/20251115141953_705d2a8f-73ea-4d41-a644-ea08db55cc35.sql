-- Fix critical admin privilege escalation vulnerability
-- Drop the insecure policy that allows any role value
DROP POLICY IF EXISTS "Users can insert their own role during signup" ON public.user_roles;
DROP POLICY IF EXISTS "Users can assign client or attorney role on signup" ON public.user_roles;

-- Create restricted policy that only allows 'client' and 'attorney' roles during signup
CREATE POLICY "Users can assign client or attorney role on signup"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND 
    role IN ('client'::app_role, 'attorney'::app_role)
  );

-- Add UPDATE policy - only admins can change roles
CREATE POLICY "Admins can update any role"
  ON public.user_roles
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add DELETE policy - only admins can delete roles
CREATE POLICY "Admins can delete any role"
  ON public.user_roles
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));