CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    expense_list_id VARCHAR(50) UNIQUE NOT NULL,
    electric_bill_id VARCHAR(50) UNIQUE,
    date DATE NOT NULL,
    accounting_code VARCHAR(50) NOT NULL DEFAULT '5130',
    expense_type VARCHAR(255) NOT NULL DEFAULT 'Direct Utilities & Energy',
    description TEXT,
    remarks TEXT,
    total_amount DECIMAL(12, 2) DEFAULT 0,
    account_source VARCHAR(255),
    cleared_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_expenses_expense_list_id ON expenses(expense_list_id);
CREATE INDEX IF NOT EXISTS idx_expenses_electric_bill_id ON expenses(electric_bill_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_status ON expenses(status);
