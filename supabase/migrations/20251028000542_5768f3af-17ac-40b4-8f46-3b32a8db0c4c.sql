-- Create storage bucket for legal documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'legal-documents',
  'legal-documents',
  false,
  20971520, -- 20MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png']
);

-- RLS policies for legal documents bucket
CREATE POLICY "Users can upload their own documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'legal-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'legal-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'legal-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create table for document metadata
CREATE TABLE IF NOT EXISTS public.uploaded_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id uuid REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size bigint NOT NULL,
  mime_type text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.uploaded_documents ENABLE ROW LEVEL SECURITY;

-- RLS policies for uploaded documents
CREATE POLICY "Users can view their own document metadata"
ON public.uploaded_documents
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own document metadata"
ON public.uploaded_documents
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own document metadata"
ON public.uploaded_documents
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create table for bookmarked messages
CREATE TABLE IF NOT EXISTS public.bookmarked_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message_id uuid NOT NULL REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  note text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, message_id)
);

-- Enable RLS
ALTER TABLE public.bookmarked_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for bookmarks
CREATE POLICY "Users can view their own bookmarks"
ON public.bookmarked_messages
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
ON public.bookmarked_messages
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
ON public.bookmarked_messages
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookmarks"
ON public.bookmarked_messages
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);