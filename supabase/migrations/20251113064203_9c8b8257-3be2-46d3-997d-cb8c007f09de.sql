-- Create case messages table for secure communication
CREATE TABLE public.case_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.legal_cases(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('lawyer', 'client')),
  message_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on case_messages
ALTER TABLE public.case_messages ENABLE ROW LEVEL SECURITY;

-- Clients can view messages for their own cases
CREATE POLICY "Clients can view their case messages"
ON public.case_messages
FOR SELECT
USING (
  sender_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.legal_cases
    WHERE legal_cases.id = case_messages.lead_id
    AND legal_cases.user_id = auth.uid()
  )
);

-- Lawyers can view messages for cases they purchased
CREATE POLICY "Lawyers can view purchased case messages"
ON public.case_messages
FOR SELECT
USING (
  sender_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.lead_purchases
    WHERE lead_purchases.lead_id = case_messages.lead_id
    AND lead_purchases.lawyer_id = auth.uid()
  )
);

-- Clients can send messages for their own cases
CREATE POLICY "Clients can send messages for their cases"
ON public.case_messages
FOR INSERT
WITH CHECK (
  sender_type = 'client' AND
  EXISTS (
    SELECT 1 FROM public.legal_cases
    WHERE legal_cases.id = lead_id
    AND legal_cases.user_id = auth.uid()
  )
);

-- Lawyers can send messages for cases they purchased
CREATE POLICY "Lawyers can send messages for purchased cases"
ON public.case_messages
FOR INSERT
WITH CHECK (
  sender_type = 'lawyer' AND
  EXISTS (
    SELECT 1 FROM public.lead_purchases
    WHERE lead_purchases.lead_id = lead_id
    AND lead_purchases.lawyer_id = auth.uid()
  )
);

-- Create case documents table for document requests and uploads
CREATE TABLE public.case_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.legal_cases(id) ON DELETE CASCADE,
  document_name TEXT NOT NULL,
  document_path TEXT,
  requested_by UUID NOT NULL,
  uploaded_by UUID,
  status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'uploaded', 'approved')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on case_documents
ALTER TABLE public.case_documents ENABLE ROW LEVEL SECURITY;

-- Clients can view document requests for their cases
CREATE POLICY "Clients can view their case documents"
ON public.case_documents
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.legal_cases
    WHERE legal_cases.id = case_documents.lead_id
    AND legal_cases.user_id = auth.uid()
  )
);

-- Lawyers can view documents for cases they purchased
CREATE POLICY "Lawyers can view purchased case documents"
ON public.case_documents
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.lead_purchases
    WHERE lead_purchases.lead_id = case_documents.lead_id
    AND lead_purchases.lawyer_id = auth.uid()
  )
);

-- Lawyers can request documents for cases they purchased
CREATE POLICY "Lawyers can request documents"
ON public.case_documents
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.lead_purchases
    WHERE lead_purchases.lead_id = lead_id
    AND lead_purchases.lawyer_id = auth.uid()
  )
);

-- Clients can upload documents for their cases
CREATE POLICY "Clients can upload documents"
ON public.case_documents
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.legal_cases
    WHERE legal_cases.id = case_documents.lead_id
    AND legal_cases.user_id = auth.uid()
  )
);

-- Add status field to lead_purchases for case management
ALTER TABLE public.lead_purchases 
ADD COLUMN status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'dropped'));

-- Create index for better query performance
CREATE INDEX idx_case_messages_lead_id ON public.case_messages(lead_id);
CREATE INDEX idx_case_documents_lead_id ON public.case_documents(lead_id);

-- Enable realtime for case messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.case_messages;