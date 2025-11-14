-- First, check if the enum already has the correct values
-- If not, we need to add them

-- Add 'attorney' and 'client' to the app_role enum if they don't exist
DO $$
BEGIN
    -- Add 'attorney' if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'attorney' AND enumtypid = 'app_role'::regtype) THEN
        ALTER TYPE app_role ADD VALUE 'attorney';
    END IF;
    
    -- Add 'client' if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'client' AND enumtypid = 'app_role'::regtype) THEN
        ALTER TYPE app_role ADD VALUE 'client';
    END IF;
END$$;