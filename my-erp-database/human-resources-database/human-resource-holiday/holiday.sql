-- Holiday table
CREATE TABLE IF NOT EXISTS holiday (
    holiday_id VARCHAR(50) PRIMARY KEY,
    holiday_name VARCHAR(255) NOT NULL,
    date_of_holiday DATE NOT NULL,
    type_of_holiday VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sequence for generating holiday IDs
CREATE SEQUENCE IF NOT EXISTS holiday_seq START 1;

-- Function to generate holiday ID in Holiday-000000001 format
CREATE OR REPLACE FUNCTION generate_holiday_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('holiday_seq') INTO next_num;
    new_id := 'Holiday-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate holiday_id on insert
CREATE OR REPLACE FUNCTION set_holiday_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.holiday_id IS NULL THEN
        NEW.holiday_id := generate_holiday_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_holiday_id
    BEFORE INSERT ON holiday
    FOR EACH ROW
    EXECUTE FUNCTION set_holiday_id();

-- Index for fast date lookups
CREATE INDEX idx_holiday_date ON holiday(date_of_holiday);
CREATE INDEX idx_holiday_type ON holiday(type_of_holiday);
