-- Add profile image and journey fields to lawyer_profiles
ALTER TABLE public.lawyer_profiles
ADD COLUMN IF NOT EXISTS profile_image_url TEXT,
ADD COLUMN IF NOT EXISTS journey_story TEXT,
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS total_ratings INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS years_of_experience INTEGER,
ADD COLUMN IF NOT EXISTS law_school TEXT,
ADD COLUMN IF NOT EXISTS specializations TEXT[];

-- Create lawyer_ratings table
CREATE TABLE IF NOT EXISTS public.lawyer_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lawyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.legal_cases(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(lawyer_id, client_id, lead_id)
);

-- Enable RLS on lawyer_ratings
ALTER TABLE public.lawyer_ratings ENABLE ROW LEVEL SECURITY;

-- Policies for lawyer_ratings
CREATE POLICY "Anyone can view lawyer ratings"
ON public.lawyer_ratings
FOR SELECT
USING (true);

CREATE POLICY "Clients can create ratings for their cases"
ON public.lawyer_ratings
FOR INSERT
WITH CHECK (
  auth.uid() = client_id
  AND EXISTS (
    SELECT 1 FROM public.lead_purchases
    WHERE lead_id = lawyer_ratings.lead_id
    AND lawyer_id = lawyer_ratings.lawyer_id
  )
);

CREATE POLICY "Clients can update their own ratings"
ON public.lawyer_ratings
FOR UPDATE
USING (auth.uid() = client_id);

CREATE POLICY "Clients can delete their own ratings"
ON public.lawyer_ratings
FOR DELETE
USING (auth.uid() = client_id);

-- Create storage bucket for lawyer profile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('lawyer-profiles', 'lawyer-profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for lawyer profile images
CREATE POLICY "Anyone can view lawyer profile images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'lawyer-profiles');

CREATE POLICY "Lawyers can upload their own profile image"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'lawyer-profiles'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Lawyers can update their own profile image"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'lawyer-profiles'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Lawyers can delete their own profile image"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'lawyer-profiles'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Function to update lawyer average rating
CREATE OR REPLACE FUNCTION public.update_lawyer_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.lawyer_profiles
  SET 
    average_rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM public.lawyer_ratings
      WHERE lawyer_id = COALESCE(NEW.lawyer_id, OLD.lawyer_id)
    ),
    total_ratings = (
      SELECT COUNT(*)
      FROM public.lawyer_ratings
      WHERE lawyer_id = COALESCE(NEW.lawyer_id, OLD.lawyer_id)
    )
  WHERE user_id = COALESCE(NEW.lawyer_id, OLD.lawyer_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Trigger to update ratings automatically
DROP TRIGGER IF EXISTS update_lawyer_rating_trigger ON public.lawyer_ratings;
CREATE TRIGGER update_lawyer_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.lawyer_ratings
FOR EACH ROW
EXECUTE FUNCTION public.update_lawyer_rating();