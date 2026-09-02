-- Drop existing table if needed (optional)
-- DROP TABLE IF EXISTS overtime_log;

CREATE TABLE overtime_log (
    overtime_id VARCHAR(20) PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time_in TIME NOT NULL,
    time_out TIME NOT NULL,
    total_hours NUMERIC,
    remarks VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_by VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sequence for generating overtime IDs
CREATE SEQUENCE IF NOT EXISTS overtime_log_seq START 1;

SELECT setval('overtime_log_seq', COALESCE(MAX(CAST(SUBSTRING(overtime_id FROM 9) AS INTEGER)), 0), true) FROM overtime_log;

-- Function to generate overtime ID in OTLog-000000001 format
CREATE OR REPLACE FUNCTION generate_overtime_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('overtime_log_seq') INTO next_num;
    new_id := 'OTLog-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate overtime_id on insert
CREATE OR REPLACE FUNCTION set_overtime_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.overtime_id IS NULL THEN
        NEW.overtime_id := generate_overtime_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_overtime_id
    BEFORE INSERT ON overtime_log
    FOR EACH ROW
    EXECUTE FUNCTION set_overtime_id();

-- Index for fast lookups by employee and date
CREATE INDEX idx_overtime_log_employee_date ON overtime_log(employee_id, date);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_overtime_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_overtime_updated_at
    BEFORE UPDATE ON overtime_log
    FOR EACH ROW
    EXECUTE FUNCTION update_overtime_updated_at();
