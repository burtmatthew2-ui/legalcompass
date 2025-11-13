-- Create case deadlines table
CREATE TABLE public.case_deadlines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.legal_cases(id) ON DELETE CASCADE,
  lawyer_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  deadline_date TIMESTAMP WITH TIME ZONE NOT NULL,
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on case_deadlines
ALTER TABLE public.case_deadlines ENABLE ROW LEVEL SECURITY;

-- Lawyers can manage deadlines for their cases
CREATE POLICY "Lawyers can view their case deadlines"
ON public.case_deadlines
FOR SELECT
USING (lawyer_id = auth.uid());

CREATE POLICY "Lawyers can create deadlines"
ON public.case_deadlines
FOR INSERT
WITH CHECK (lawyer_id = auth.uid());

CREATE POLICY "Lawyers can update their deadlines"
ON public.case_deadlines
FOR UPDATE
USING (lawyer_id = auth.uid());

CREATE POLICY "Lawyers can delete their deadlines"
ON public.case_deadlines
FOR DELETE
USING (lawyer_id = auth.uid());

-- Create case meetings table
CREATE TABLE public.case_meetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.legal_cases(id) ON DELETE CASCADE,
  lawyer_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  meeting_type TEXT CHECK (meeting_type IN ('in-person', 'phone', 'video')) DEFAULT 'video',
  status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on case_meetings
ALTER TABLE public.case_meetings ENABLE ROW LEVEL SECURITY;

-- Lawyers can manage meetings for their cases
CREATE POLICY "Lawyers can view their case meetings"
ON public.case_meetings
FOR SELECT
USING (lawyer_id = auth.uid());

CREATE POLICY "Lawyers can create meetings"
ON public.case_meetings
FOR INSERT
WITH CHECK (lawyer_id = auth.uid());

CREATE POLICY "Lawyers can update their meetings"
ON public.case_meetings
FOR UPDATE
USING (lawyer_id = auth.uid());

CREATE POLICY "Lawyers can delete their meetings"
ON public.case_meetings
FOR DELETE
USING (lawyer_id = auth.uid());

-- Clients can view meetings for their cases
CREATE POLICY "Clients can view meetings for their cases"
ON public.case_meetings
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.legal_cases
    WHERE legal_cases.id = case_meetings.lead_id
    AND legal_cases.user_id = auth.uid()
  )
);

-- Create indexes for performance
CREATE INDEX idx_case_deadlines_lead_id ON public.case_deadlines(lead_id);
CREATE INDEX idx_case_deadlines_deadline_date ON public.case_deadlines(deadline_date);
CREATE INDEX idx_case_meetings_lead_id ON public.case_meetings(lead_id);
CREATE INDEX idx_case_meetings_meeting_date ON public.case_meetings(meeting_date);