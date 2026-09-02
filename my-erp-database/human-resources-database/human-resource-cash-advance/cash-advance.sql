-- Cash Advance table
CREATE TABLE IF NOT EXISTS cash_advance (
    cashadvance_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    ca_amount DECIMAL(12,2) NOT NULL,
    reason VARCHAR(255),
    no_of_payroll_cycle INT NOT NULL,
    installment_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'unpaid',
    created_by VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sequence for generating cash advance IDs
CREATE SEQUENCE IF NOT EXISTS cash_advance_seq START 1;

SELECT setval('cash_advance_seq', COALESCE(MAX(CAST(SUBSTRING(cashadvance_id FROM 7) AS INTEGER)), 0), true) FROM cash_advance;

-- Function to generate cash advance ID in CaID-00000001 format
CREATE OR REPLACE FUNCTION generate_cashadvance_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('cash_advance_seq') INTO next_num;
    new_id := 'CaID-' || LPAD(next_num::TEXT, 8, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate cashadvance_id on insert
CREATE OR REPLACE FUNCTION set_cashadvance_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cashadvance_id IS NULL THEN
        NEW.cashadvance_id := generate_cashadvance_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_cashadvance_id
    BEFORE INSERT ON cash_advance
    FOR EACH ROW
    EXECUTE FUNCTION set_cashadvance_id();

-- Index for fast lookups by employee
CREATE INDEX idx_cash_advance_employee_id ON cash_advance(employee_id);

-- Trigger to update created_by if null
CREATE OR REPLACE FUNCTION set_cashadvance_created_by()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.created_by IS NULL THEN
        NEW.created_by := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_cashadvance_created_by
    BEFORE INSERT ON cash_advance
    FOR EACH ROW
    EXECUTE FUNCTION set_cashadvance_created_by();
