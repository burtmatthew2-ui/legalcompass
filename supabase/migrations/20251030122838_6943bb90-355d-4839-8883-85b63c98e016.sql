-- Add RLS policies for legal-documents storage bucket

-- Allow users to upload only to their own folder
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'legal-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to view only their own files
CREATE POLICY "Users can view own files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'legal-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete only their own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'legal-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update only their own files
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'legal-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'legal-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);