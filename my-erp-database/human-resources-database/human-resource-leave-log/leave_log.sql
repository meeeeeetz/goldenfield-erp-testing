-- Leave Log table
CREATE TABLE IF NOT EXISTS leave_log (
    leave_id VARCHAR(20) PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL,
    last_name VARCHAR(100),
    first_name VARCHAR(100),
    date DATE NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    total_days NUMERIC,
    remarks VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    created_by VARCHAR(100),
    approved_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sequence for generating leave IDs
CREATE SEQUENCE IF NOT EXISTS leave_log_seq START 1;

-- Function to generate leave ID in LeaveLog-000000001 format
CREATE OR REPLACE FUNCTION generate_leave_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('leave_log_seq') INTO next_num;
    new_id := 'LeaveLog-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate leave_id on insert
CREATE OR REPLACE FUNCTION set_leave_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.leave_id IS NULL THEN
        NEW.leave_id := generate_leave_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_leave_id
    BEFORE INSERT ON leave_log
    FOR EACH ROW
    EXECUTE FUNCTION set_leave_id();

-- Index for fast lookups by employee and date
CREATE INDEX idx_leave_log_employee_date ON leave_log(employee_id, date);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_leave_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_leave_updated_at
    BEFORE UPDATE ON leave_log
    FOR EACH ROW
    EXECUTE FUNCTION update_leave_updated_at();
