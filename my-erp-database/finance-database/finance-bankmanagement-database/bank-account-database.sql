CREATE TABLE IF NOT EXISTS bank_accounts (
    bank_account_id VARCHAR(50) PRIMARY KEY,
    bank VARCHAR(255) NOT NULL,
    bank_code VARCHAR(50) NOT NULL,
    address TEXT,
    bank_account_number VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active',
    starting_bank_cash DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bank_accounts_bank_code ON bank_accounts(bank_code);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_status ON bank_accounts(status);
