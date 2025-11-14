-- Add role column to existing user_roles table
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS role app_role NOT NULL DEFAULT 'client';