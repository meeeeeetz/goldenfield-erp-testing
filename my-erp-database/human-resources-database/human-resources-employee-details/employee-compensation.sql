-- Employee Compensation table
CREATE TABLE IF NOT EXISTS employee_compensation (
    compensation_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    salary_pay_mode VARCHAR(50) NOT NULL,
    salary_amount DECIMAL(12,2),
    allowance_pay_mode VARCHAR(50),
    allowance_amount DECIMAL(12,2),
    pay_frequency VARCHAR(50) NOT NULL,
    payout_method VARCHAR(50) NOT NULL,
    department VARCHAR(255),
    role VARCHAR(255),
    yearly_sick_leave INT,
    yearly_vacation_leave INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_employee_compensation_employee_id ON employee_compensation(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_compensation_department ON employee_compensation(department);
CREATE INDEX IF NOT EXISTS idx_employee_compensation_pay_frequency ON employee_compensation(pay_frequency);
CREATE INDEX IF NOT EXISTS idx_employee_compensation_payout_method ON employee_compensation(payout_method);

-- Add leave columns if missing
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS yearly_sick_leave INT;
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS yearly_vacation_leave INT;

-- Add contribution columns if missing
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS sss_contribution_mode VARCHAR(50);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS sss_contribution_amount DECIMAL(12,2);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS sss_loan_payment_mode VARCHAR(50);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS sss_loan_amount DECIMAL(12,2);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS philhealth_contribution_mode VARCHAR(50);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS philhealth_contribution_amount DECIMAL(12,2);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS pagibig_contribution_mode VARCHAR(50);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS pagibig_contribution_amount DECIMAL(12,2);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS pagibig_loan_payment_mode VARCHAR(50);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS pagibig_loan_amount DECIMAL(12,2);
