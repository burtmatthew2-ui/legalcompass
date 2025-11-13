-- Add notification timing to case_deadlines
ALTER TABLE case_deadlines 
ADD COLUMN notification_timing text NOT NULL DEFAULT '2_days';

-- Add comment explaining the values
COMMENT ON COLUMN case_deadlines.notification_timing IS 'When to send reminder: 1_week, 3_days, 2_days, 1_day, 12_hours';