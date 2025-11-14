-- Create document signatures table
CREATE TABLE IF NOT EXISTS public.document_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES public.case_documents(id) ON DELETE CASCADE,
  signer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signer_type TEXT NOT NULL CHECK (signer_type IN ('client', 'lawyer')),
  signature_data TEXT NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.document_signatures ENABLE ROW LEVEL SECURITY;

-- Allow users to view signatures on their documents
CREATE POLICY "Users can view signatures on their case documents"
ON public.document_signatures
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.case_documents cd
    INNER JOIN public.legal_cases lc ON cd.lead_id = lc.id
    WHERE cd.id = document_signatures.document_id
    AND lc.user_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM public.case_documents cd
    INNER JOIN public.lead_purchases lp ON cd.lead_id = lp.lead_id
    WHERE cd.id = document_signatures.document_id
    AND lp.lawyer_id = auth.uid()
  )
);

-- Allow users to create signatures on their documents
CREATE POLICY "Users can sign their case documents"
ON public.document_signatures
FOR INSERT
TO authenticated
WITH CHECK (
  signer_id = auth.uid()
  AND (
    (signer_type = 'client' AND EXISTS (
      SELECT 1 FROM public.case_documents cd
      INNER JOIN public.legal_cases lc ON cd.lead_id = lc.id
      WHERE cd.id = document_id
      AND lc.user_id = auth.uid()
    ))
    OR
    (signer_type = 'lawyer' AND EXISTS (
      SELECT 1 FROM public.case_documents cd
      INNER JOIN public.lead_purchases lp ON cd.lead_id = lp.lead_id
      WHERE cd.id = document_id
      AND lp.lawyer_id = auth.uid()
    ))
  )
);

-- Add signature_required field to case_documents
ALTER TABLE public.case_documents 
ADD COLUMN IF NOT EXISTS signature_required BOOLEAN NOT NULL DEFAULT false;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_document_signatures_document_id 
ON public.document_signatures(document_id);

CREATE INDEX IF NOT EXISTS idx_document_signatures_signer_id 
ON public.document_signatures(signer_id);