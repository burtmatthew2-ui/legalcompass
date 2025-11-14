-- Update app_role enum to have correct values
-- Handle the default value issue

-- Step 1: Create new enum with correct values
CREATE TYPE public.app_role_new AS ENUM ('admin', 'client', 'attorney');

-- Step 2: Drop the default temporarily
ALTER TABLE public.user_roles ALTER COLUMN role DROP DEFAULT;

-- Step 3: Update user_roles table to use the new enum
ALTER TABLE public.user_roles 
  ALTER COLUMN role TYPE public.app_role_new 
  USING (
    CASE 
      WHEN role::text = 'user' THEN 'client'::public.app_role_new
      WHEN role::text = 'admin' THEN 'admin'::public.app_role_new
      ELSE 'client'::public.app_role_new
    END
  );

-- Step 4: Set new default
ALTER TABLE public.user_roles ALTER COLUMN role SET DEFAULT 'client'::public.app_role_new;

-- Step 5: Drop old enum and rename new one
DROP TYPE public.app_role;
ALTER TYPE public.app_role_new RENAME TO app_role;

-- Step 6: Update has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
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