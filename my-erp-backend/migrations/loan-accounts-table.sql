-- Loan Accounts Table
CREATE TABLE IF NOT EXISTS loan_accounts (
    id SERIAL PRIMARY KEY,
    loan_account_id VARCHAR(50) UNIQUE NOT NULL,
    company_individual VARCHAR(255) NOT NULL,
    contact_details TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster search
CREATE INDEX IF NOT EXISTS idx_loan_accounts_company ON loan_accounts(company_individual);
CREATE INDEX IF NOT EXISTS idx_loan_accounts_status ON loan_accounts(status);
