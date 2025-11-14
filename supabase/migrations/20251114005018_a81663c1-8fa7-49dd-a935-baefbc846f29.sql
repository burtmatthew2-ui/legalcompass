-- Add new values to existing enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'attorney';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'client';