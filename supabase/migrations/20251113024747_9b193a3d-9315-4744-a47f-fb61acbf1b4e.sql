-- Create user type enum
CREATE TYPE public.user_type AS ENUM ('individual', 'lawyer');

-- Create lawyer profile table
CREATE TABLE public.lawyer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name text NOT NULL,
  email text NOT NULL,
  states_licensed text[] NOT NULL,
  bar_number text NOT NULL,
  practice_areas text[] NOT NULL,
  bio text,
  verified_status boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create legal cases/leads table
CREATE TABLE public.legal_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  state text NOT NULL,
  legal_topic text NOT NULL,
  description text NOT NULL,
  urgency_level text NOT NULL,
  snapshot_brief text,
  status text DEFAULT 'open',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create lead purchases table
CREATE TABLE public.lead_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lead_id uuid REFERENCES public.legal_cases(id) ON DELETE CASCADE NOT NULL,
  amount_paid integer NOT NULL,
  purchased_at timestamp with time zone DEFAULT now(),
  UNIQUE(lawyer_id, lead_id)
);

-- Add user_type to profiles table
ALTER TABLE public.profiles ADD COLUMN user_type public.user_type DEFAULT 'individual';

-- Enable RLS
ALTER TABLE public.lawyer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lawyer_profiles
CREATE POLICY "Lawyers can view their own profile"
  ON public.lawyer_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Lawyers can insert their own profile"
  ON public.lawyer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Lawyers can update their own profile"
  ON public.lawyer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all lawyer profiles"
  ON public.lawyer_profiles FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all lawyer profiles"
  ON public.lawyer_profiles FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for legal_cases
CREATE POLICY "Users can view their own cases"
  ON public.legal_cases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cases"
  ON public.legal_cases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Verified lawyers can view all open cases"
  ON public.legal_cases FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.lawyer_profiles
      WHERE user_id = auth.uid() AND verified_status = true
    )
  );

CREATE POLICY "Admins can view all cases"
  ON public.legal_cases FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for lead_purchases
CREATE POLICY "Lawyers can view their own purchases"
  ON public.lead_purchases FOR SELECT
  USING (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can create purchases"
  ON public.lead_purchases FOR INSERT
  WITH CHECK (auth.uid() = lawyer_id);

CREATE POLICY "Admins can view all purchases"
  ON public.lead_purchases FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_lawyer_profiles_updated_at
  BEFORE UPDATE ON public.lawyer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_cases_updated_at
  BEFORE UPDATE ON public.legal_cases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();