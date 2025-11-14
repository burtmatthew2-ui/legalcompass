-- Drop dependent functions with CASCADE
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP FUNCTION IF EXISTS public.get_user_role(uuid) CASCADE;

-- Now drop and recreate the enum
ALTER TYPE public.app_role RENAME TO app_role_old;
CREATE TYPE public.app_role AS ENUM ('attorney', 'client', 'admin');
ALTER TABLE public.user_roles ALTER COLUMN role TYPE public.app_role USING 
  CASE role::text
    WHEN 'user' THEN 'client'::app_role
    WHEN 'admin' THEN 'admin'::app_role
    ELSE 'client'::app_role
  END;
DROP TYPE public.app_role_old;

-- Recreate the security definer function
CREATE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Recreate get_user_role function
CREATE FUNCTION public.get_user_role(_user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Drop and recreate all the RLS policies that were removed with CASCADE
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all unsubscribes" ON public.email_unsubscribes;
CREATE POLICY "Admins can view all unsubscribes" ON public.email_unsubscribes
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view email logs" ON public.email_send_log;
CREATE POLICY "Admins can view email logs" ON public.email_send_log
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can create email logs" ON public.email_send_log;
CREATE POLICY "Admins can create email logs" ON public.email_send_log
FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all newsletter signups" ON public.newsletter_signups;
CREATE POLICY "Admins can view all newsletter signups" ON public.newsletter_signups
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all lawyer profiles" ON public.lawyer_profiles;
CREATE POLICY "Admins can view all lawyer profiles" ON public.lawyer_profiles
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update all lawyer profiles" ON public.lawyer_profiles;
CREATE POLICY "Admins can update all lawyer profiles" ON public.lawyer_profiles
FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all cases" ON public.legal_cases;
CREATE POLICY "Admins can view all cases" ON public.legal_cases
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all purchases" ON public.lead_purchases;
CREATE POLICY "Admins can view all purchases" ON public.lead_purchases
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users can insert their own role on signup" ON public.user_roles;
CREATE POLICY "Users can insert their own role on signup" ON public.user_roles
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);