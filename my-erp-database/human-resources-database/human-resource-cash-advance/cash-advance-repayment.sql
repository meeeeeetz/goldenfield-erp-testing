-- Cash Advance Repayment table
CREATE TABLE IF NOT EXISTS cash_advance_repayment (
    cashadvance_repayment_id VARCHAR(50) PRIMARY KEY,
    cashadvance_id VARCHAR(50) NOT NULL,
    payroll_cycle_id VARCHAR(50),
    amount_paid DECIMAL(12,2),
    paid_at VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sequence for generating cash advance repayment IDs
CREATE SEQUENCE IF NOT EXISTS cash_advance_repayment_seq START 1;

SELECT setval('cash_advance_repayment_seq', COALESCE(MAX(CAST(SUBSTRING(cashadvance_repayment_id FROM 9) AS INTEGER)), 0), true) FROM cash_advance_repayment;

-- Function to generate cash advance repayment ID in CaPayID-000000001 format
CREATE OR REPLACE FUNCTION generate_cashadvance_repayment_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('cash_advance_repayment_seq') INTO next_num;
    new_id := 'CaPayID-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate cashadvance_repayment_id on insert
CREATE OR REPLACE FUNCTION set_cashadvance_repayment_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cashadvance_repayment_id IS NULL THEN
        NEW.cashadvance_repayment_id := generate_cashadvance_repayment_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_cashadvance_repayment_id
    BEFORE INSERT ON cash_advance_repayment
    FOR EACH ROW
    EXECUTE FUNCTION set_cashadvance_repayment_id();

-- Index for fast lookups by cash advance
CREATE INDEX idx_cash_advance_repayment_cashadvance_id ON cash_advance_repayment(cashadvance_id);
