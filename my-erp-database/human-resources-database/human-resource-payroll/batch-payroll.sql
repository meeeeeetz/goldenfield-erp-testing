CREATE SEQUENCE IF NOT EXISTS batch_payroll_seq;

CREATE TABLE IF NOT EXISTS batch_payroll (
    batch_payroll_id SERIAL PRIMARY KEY,
    batch_reference VARCHAR(50) NOT NULL UNIQUE,
    pay_period_start DATE,
    pay_period_end DATE,
    payroll_count INTEGER NOT NULL DEFAULT 0,
    total_gross_pay DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_gross_deduction DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_net_pay DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS batch_payroll_items (
    batch_payroll_item_id SERIAL PRIMARY KEY,
    batch_payroll_id INTEGER NOT NULL REFERENCES batch_payroll(batch_payroll_id),
    payroll_id VARCHAR(50) NOT NULL REFERENCES payroll(payroll_id),
    employee_id VARCHAR(50) NOT NULL REFERENCES employee_profile(employee_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_batch_payroll_reference ON batch_payroll(batch_reference);
CREATE INDEX IF NOT EXISTS idx_batch_payroll_items_batch ON batch_payroll_items(batch_payroll_id);
CREATE INDEX IF NOT EXISTS idx_batch_payroll_items_payroll ON batch_payroll_items(payroll_id);
CREATE INDEX IF NOT EXISTS idx_batch_payroll_items_employee ON batch_payroll_items(employee_id);