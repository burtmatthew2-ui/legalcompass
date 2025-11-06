-- Fix nullable email field to prevent silent failures in Stripe integrations
-- Make email column NOT NULL to ensure every profile has a valid email

-- First, ensure all existing profiles have emails (shouldn't be any nulls due to trigger, but safety check)
UPDATE profiles SET email = 'no-email@legalcompass.store' WHERE email IS NULL;

-- Make email column NOT NULL
ALTER TABLE profiles 
ALTER COLUMN email SET NOT NULL;

-- Add email format validation constraint
ALTER TABLE profiles
ADD CONSTRAINT profiles_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Update the handle_new_user trigger to enforce email requirement
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Ensure email is present from auth.users
  IF NEW.email IS NULL THEN
    RAISE EXCEPTION 'Cannot create profile without email address';
  END IF;
  
  -- Create profile with required email
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  
  -- Create subscription record with free status
  INSERT INTO public.user_subscriptions (user_id, status)
  VALUES (NEW.id, 'free');
  
  -- Create question usage record
  INSERT INTO public.question_usage (user_id, question_count)
  VALUES (NEW.id, 0);
  
  RETURN NEW;
END;
$$;