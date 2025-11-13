-- Case Notes Table
CREATE TABLE case_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES legal_cases(id) ON DELETE CASCADE,
  lawyer_id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Document Versions Table
CREATE TABLE document_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES case_documents(id) ON DELETE CASCADE,
  version_number integer NOT NULL,
  file_path text NOT NULL,
  file_size bigint NOT NULL,
  uploaded_by uuid NOT NULL,
  upload_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Case Activity Log Table
CREATE TABLE case_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES legal_cases(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  actor_id uuid NOT NULL,
  actor_type text NOT NULL,
  description text NOT NULL,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_case_notes_lead ON case_notes(lead_id);
CREATE INDEX idx_case_notes_lawyer ON case_notes(lawyer_id);
CREATE INDEX idx_case_notes_category ON case_notes(category);
CREATE INDEX idx_document_versions_document ON document_versions(document_id);
CREATE INDEX idx_activity_log_lead ON case_activity_log(lead_id);
CREATE INDEX idx_activity_log_created ON case_activity_log(created_at DESC);
CREATE INDEX idx_activity_log_type ON case_activity_log(activity_type);

-- Enable RLS
ALTER TABLE case_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for case_notes
CREATE POLICY "Lawyers can create notes for their cases"
ON case_notes FOR INSERT
WITH CHECK (
  lawyer_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM lead_purchases
    WHERE lead_purchases.lead_id = case_notes.lead_id
    AND lead_purchases.lawyer_id = auth.uid()
  )
);

CREATE POLICY "Lawyers can view their own notes"
ON case_notes FOR SELECT
USING (lawyer_id = auth.uid());

CREATE POLICY "Lawyers can update their own notes"
ON case_notes FOR UPDATE
USING (lawyer_id = auth.uid());

CREATE POLICY "Lawyers can delete their own notes"
ON case_notes FOR DELETE
USING (lawyer_id = auth.uid());

-- RLS Policies for document_versions
CREATE POLICY "Lawyers can view document versions for purchased cases"
ON document_versions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM case_documents cd
    JOIN lead_purchases lp ON cd.lead_id = lp.lead_id
    WHERE cd.id = document_versions.document_id
    AND lp.lawyer_id = auth.uid()
  )
);

CREATE POLICY "Clients can view their document versions"
ON document_versions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM case_documents cd
    JOIN legal_cases lc ON cd.lead_id = lc.id
    WHERE cd.id = document_versions.document_id
    AND lc.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create document versions"
ON document_versions FOR INSERT
WITH CHECK (uploaded_by = auth.uid());

-- RLS Policies for case_activity_log
CREATE POLICY "Lawyers can view activity for purchased cases"
ON case_activity_log FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM lead_purchases
    WHERE lead_purchases.lead_id = case_activity_log.lead_id
    AND lead_purchases.lawyer_id = auth.uid()
  )
);

CREATE POLICY "Clients can view their case activity"
ON case_activity_log FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM legal_cases
    WHERE legal_cases.id = case_activity_log.lead_id
    AND legal_cases.user_id = auth.uid()
  )
);

CREATE POLICY "System can log activity"
ON case_activity_log FOR INSERT
WITH CHECK (auth.role() = 'service_role' OR actor_id = auth.uid());

-- Trigger to update case_notes updated_at
CREATE TRIGGER update_case_notes_updated_at
BEFORE UPDATE ON case_notes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Comment on tables
COMMENT ON TABLE case_notes IS 'Lawyer notes for cases';
COMMENT ON TABLE document_versions IS 'Version history for case documents';
COMMENT ON TABLE case_activity_log IS 'Activity timeline for cases';
COMMENT ON COLUMN case_notes.category IS 'Note category: general, research, client_contact, court_filing, strategy, billing';
COMMENT ON COLUMN case_activity_log.activity_type IS 'Activity type: message, document, deadline, meeting, note, status_change';