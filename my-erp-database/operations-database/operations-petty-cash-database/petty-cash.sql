CREATE TABLE IF NOT EXISTS petty_cash (
    petty_cash_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    pettycashcategory VARCHAR(100) NOT NULL,
    item VARCHAR(255) NOT NULL,
    remarks TEXT,
    store VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    petty_cash_code VARCHAR(20) UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    replenish_amount DECIMAL(10, 2),
    source VARCHAR(255),
    check_number VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_petty_cash_date ON petty_cash(date);
CREATE INDEX IF NOT EXISTS idx_petty_cash_category ON petty_cash(pettycashcategory);
CREATE INDEX IF NOT EXISTS idx_petty_cash_status ON petty_cash(status);
