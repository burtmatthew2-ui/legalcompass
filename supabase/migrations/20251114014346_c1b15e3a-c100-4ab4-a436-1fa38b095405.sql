-- Drop the existing enum type and recreate with correct values
DROP TYPE IF EXISTS public.app_role CASCADE;

-- Create the enum with attorney and client roles
CREATE TYPE public.app_role AS ENUM ('attorney', 'client', 'admin');

-- Recreate the user_roles table with the updated enum
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own role
CREATE POLICY "Users can view their own role"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only allow inserts during signup (will be handled by application logic)
CREATE POLICY "Users can insert their own role during signup"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);