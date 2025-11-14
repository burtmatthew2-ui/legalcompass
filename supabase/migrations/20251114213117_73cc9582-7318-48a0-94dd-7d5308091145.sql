-- Update app_role enum to include attorney and client
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'attorney';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'client';

-- The get_unread_message_count and mark_messages_as_read functions already exist
-- They just need to be properly registered in the schema

-- Ensure the functions are accessible
GRANT EXECUTE ON FUNCTION public.get_unread_message_count TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_messages_as_read TO authenticated;