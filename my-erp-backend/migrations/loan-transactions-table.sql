CREATE TABLE IF NOT EXISTS loan_transactions (
    id SERIAL PRIMARY KEY,
    loan_transaction_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    loan_account_id VARCHAR(50) NOT NULL,
    borrow_amount DECIMAL(15,2) DEFAULT 0,
    payment_interest_amount DECIMAL(15,2) DEFAULT 0,
    payment_principal_amount DECIMAL(15,2) DEFAULT 0,
    source_account VARCHAR(50),
    check_number VARCHAR(50),
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_loan_transactions_account ON loan_transactions(loan_account_id);
CREATE INDEX IF NOT EXISTS idx_loan_transactions_date ON loan_transactions(date);
CREATE INDEX IF NOT EXISTS idx_loan_transactions_type ON loan_transactions(loan_transaction_id);
CREATE INDEX IF NOT EXISTS idx_loan_transactions_source ON loan_transactions(source_account);
