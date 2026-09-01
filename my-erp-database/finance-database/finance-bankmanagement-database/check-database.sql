CREATE TABLE IF NOT EXISTS check_database (
    check_transaction_id VARCHAR(50) PRIMARY KEY,
    bank_code VARCHAR(50),
    check_number VARCHAR(50),
    date DATE,
    recipient VARCHAR(255),
    recipient_account VARCHAR(100),
    amount NUMERIC(15, 2) DEFAULT 0,
    remarks TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    link_to_passbook TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_check_database_bank_code ON check_database(bank_code);
CREATE INDEX IF NOT EXISTS idx_check_database_date ON check_database(date);
CREATE INDEX IF NOT EXISTS idx_check_database_status ON check_database(status);
