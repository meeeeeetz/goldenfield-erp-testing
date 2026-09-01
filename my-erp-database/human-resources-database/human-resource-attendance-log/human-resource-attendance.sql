-- Drop existing table if needed (optional)
-- DROP TABLE IF EXISTS attendance_log;

CREATE TABLE attendance_log (
    attendance_id VARCHAR(20) PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time_in TIME,
    first_coffee_break_in TIME,
    first_coffee_break_out TIME,
    mid_day_break_in TIME,
    mid_day_break_out TIME,
    second_coffee_break_in TIME,
    second_coffee_break_out TIME,
    time_out TIME,
    total_hours NUMERIC,
    total_late_minutes NUMERIC,
    total_early_out_minutes NUMERIC,
    total_deductable_time NUMERIC,
    actual_payable_hours NUMERIC,
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_by VARCHAR(100),
    status VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sequence for generating attendance IDs
CREATE SEQUENCE IF NOT EXISTS attendance_log_seq START 1;

-- Function to generate attendance ID in AttLog-000000001 format
CREATE OR REPLACE FUNCTION generate_attendance_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('attendance_log_seq') INTO next_num;
    new_id := 'AttLog-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate attendance_id on insert
CREATE OR REPLACE FUNCTION set_attendance_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.attendance_id IS NULL THEN
        NEW.attendance_id := generate_attendance_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_attendance_id
    BEFORE INSERT ON attendance_log
    FOR EACH ROW
    EXECUTE FUNCTION set_attendance_id();

-- Index for fast lookups by employee and date
CREATE INDEX idx_attendance_log_employee_date ON attendance_log(employee_id, date);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_attendance_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_attendance_updated_at
    BEFORE UPDATE ON attendance_log
    FOR EACH ROW
    EXECUTE FUNCTION update_attendance_updated_at();
