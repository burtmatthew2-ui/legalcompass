-- Create newsletter_signups table for lead generation
CREATE TABLE IF NOT EXISTS public.newsletter_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  source TEXT NOT NULL CHECK (source IN ('newsletter', 'lead_magnet')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(email, source)
);

-- Enable RLS
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form submissions)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view newsletter signups
CREATE POLICY "Admins can view all newsletter signups"
ON public.newsletter_signups
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create storage RLS policies for legal-documents bucket (only if not existing)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Users can upload to own folder'
  ) THEN
    CREATE POLICY "Users can upload to own folder"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'legal-documents' AND
      auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Users can read own files'
  ) THEN
    CREATE POLICY "Users can read own files"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (
      bucket_id = 'legal-documents' AND
      auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Users can delete own files'
  ) THEN
    CREATE POLICY "Users can delete own files"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'legal-documents' AND
      auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;
END $$;