-- Add read status tracking to case_messages
ALTER TABLE case_messages
ADD COLUMN IF NOT EXISTS read_by_client BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS read_by_lawyer BOOLEAN DEFAULT FALSE;

-- Create index for faster unread message queries
CREATE INDEX IF NOT EXISTS idx_case_messages_read_status ON case_messages(lead_id, read_by_client, read_by_lawyer);
CREATE INDEX IF NOT EXISTS idx_case_messages_sender ON case_messages(sender_id, created_at DESC);

-- Set replica identity for realtime updates
ALTER TABLE case_messages REPLICA IDENTITY FULL;

-- Create a function to get unread message count for a user
CREATE OR REPLACE FUNCTION get_unread_message_count(user_id UUID, user_role TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  unread_count INTEGER;
BEGIN
  IF user_role = 'attorney' THEN
    -- Count messages where lawyer hasn't read and sender is client
    SELECT COUNT(*)::INTEGER INTO unread_count
    FROM case_messages cm
    INNER JOIN lead_purchases lp ON cm.lead_id = lp.lead_id
    WHERE lp.lawyer_id = user_id
      AND cm.sender_type = 'client'
      AND cm.read_by_lawyer = FALSE;
  ELSE
    -- Count messages where client hasn't read and sender is lawyer
    SELECT COUNT(*)::INTEGER INTO unread_count
    FROM case_messages cm
    INNER JOIN legal_cases lc ON cm.lead_id = lc.id
    WHERE lc.user_id = user_id
      AND cm.sender_type = 'lawyer'
      AND cm.read_by_client = FALSE;
  END IF;
  
  RETURN COALESCE(unread_count, 0);
END;
$$;

-- Create a function to mark messages as read
CREATE OR REPLACE FUNCTION mark_messages_as_read(p_lead_id UUID, p_user_id UUID, p_user_role TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_user_role = 'attorney' THEN
    -- Mark messages as read by lawyer
    UPDATE case_messages
    SET read_by_lawyer = TRUE
    WHERE lead_id = p_lead_id
      AND sender_type = 'client'
      AND read_by_lawyer = FALSE
      AND EXISTS (
        SELECT 1 FROM lead_purchases 
        WHERE lead_id = p_lead_id AND lawyer_id = p_user_id
      );
  ELSE
    -- Mark messages as read by client
    UPDATE case_messages
    SET read_by_client = TRUE
    WHERE lead_id = p_lead_id
      AND sender_type = 'lawyer'
      AND read_by_client = FALSE
      AND EXISTS (
        SELECT 1 FROM legal_cases 
        WHERE id = p_lead_id AND user_id = p_user_id
      );
  END IF;
END;
$$;

-- Create notifications table for match notifications
CREATE TABLE IF NOT EXISTS message_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lead_id UUID NOT NULL,
  notification_type TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on notifications
ALTER TABLE message_notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view their own notifications"
  ON message_notifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can mark their own notifications as read
CREATE POLICY "Users can update their own notifications"
  ON message_notifications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- System can create notifications
CREATE POLICY "System can create notifications"
  ON message_notifications
  FOR INSERT
  WITH CHECK (true);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE message_notifications;