-- Fix 1: Add RLS policies for user_subscriptions management by service role
-- This allows edge functions using service_role key to manage subscriptions
CREATE POLICY "Service role can insert subscriptions"
ON public.user_subscriptions
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update subscriptions"
ON public.user_subscriptions
FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can delete subscriptions"
ON public.user_subscriptions
FOR DELETE
USING (auth.role() = 'service_role');

-- Fix 2: Restrict profiles table to prevent email harvesting
-- Drop the overly permissive policy that allows any user to see all emails
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Ensure users can only view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Allow admins to view all profiles for legitimate admin purposes
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));