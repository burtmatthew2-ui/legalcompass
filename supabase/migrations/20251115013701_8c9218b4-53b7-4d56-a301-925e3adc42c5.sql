-- Fix Security Issues: Storage bucket privacy, ratings access, and function search paths

-- 1. Make lawyer-profiles bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'lawyer-profiles';

-- 2. Update storage policy for lawyer profile images to require authentication
DROP POLICY IF EXISTS "Anyone can view lawyer profile images" ON storage.objects;

CREATE POLICY "Authenticated users can view lawyer profile images"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'lawyer-profiles'
  AND auth.role() = 'authenticated'
);

-- 3. Restrict lawyer ratings to authenticated users only
DROP POLICY IF EXISTS "Anyone can view lawyer ratings" ON public.lawyer_ratings;

CREATE POLICY "Authenticated users can view lawyer ratings"
ON public.lawyer_ratings
FOR SELECT
USING (auth.role() = 'authenticated');

-- 4. Fix function search paths for security (add search_path to functions missing it)
-- Note: update_lawyer_rating, create_notification_preferences, and create_lawyer_payment_preferences already have search_path set
-- No additional functions found without search_path in the codebase