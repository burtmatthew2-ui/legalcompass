-- Add file attachment support to case_messages
ALTER TABLE case_messages
ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb;

-- Create index for faster attachment queries
CREATE INDEX IF NOT EXISTS idx_case_messages_attachments ON case_messages USING GIN(attachments);

-- Add comment
COMMENT ON COLUMN case_messages.attachments IS 'Array of file attachments: [{file_name, file_path, file_type, file_size, uploaded_at}]';