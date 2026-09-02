-- Payroll table
CREATE TABLE IF NOT EXISTS payroll (
    payroll_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    total_days_worked DECIMAL(12,2) DEFAULT 0,
    total_overtime_hours DECIMAL(12,2) DEFAULT 0,
    total_allowance DECIMAL(12,2) DEFAULT 0,
    total_leaves_usage DECIMAL(12,2) DEFAULT 0,
    regular_holiday DECIMAL(12,2) DEFAULT 0,
    special_holiday DECIMAL(12,2) DEFAULT 0,
    total_income_tax DECIMAL(12,2) DEFAULT 0,
    total_sss_payment DECIMAL(12,2) DEFAULT 0,
    total_sss_loan_payment DECIMAL(12,2) DEFAULT 0,
    total_philhealth_payment DECIMAL(12,2) DEFAULT 0,
    total_pagibig_payment DECIMAL(12,2) DEFAULT 0,
    total_pagibig_loan_payment DECIMAL(12,2) DEFAULT 0,
    total_cash_loan_deductions DECIMAL(12,2) DEFAULT 0,
    total_losses_damages DECIMAL(12,2) DEFAULT 0,
    net_pay DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sequence for generating payroll IDs
CREATE SEQUENCE IF NOT EXISTS payroll_seq START 1;

SELECT setval('payroll_seq', COALESCE(MAX(CAST(SUBSTRING(payroll_id FROM 9) AS INTEGER)), 0), true) FROM payroll;

-- Function to generate payroll ID in Payroll-000000001 format
CREATE OR REPLACE FUNCTION generate_payroll_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('payroll_seq') INTO next_num;
    new_id := 'Payroll-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate payroll_id on insert
CREATE OR REPLACE FUNCTION set_payroll_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payroll_id IS NULL THEN
        NEW.payroll_id := generate_payroll_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_payroll_id
    BEFORE INSERT ON payroll
    FOR EACH ROW
    EXECUTE FUNCTION set_payroll_id();

-- Indexes for faster lookups
CREATE INDEX idx_payroll_employee_id ON payroll(employee_id);
CREATE INDEX idx_payroll_date_start ON payroll(date_start);
CREATE INDEX idx_payroll_date_end ON payroll(date_end);
CREATE INDEX idx_payroll_status ON payroll(status);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_payroll_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_payroll_updated_at
    BEFORE UPDATE ON payroll
    FOR EACH ROW
    EXECUTE FUNCTION update_payroll_updated_at();
