CREATE TABLE IF NOT EXISTS passbook_statements (
    statement_id SERIAL PRIMARY KEY,
    code_book_page VARCHAR(150),
    date DATE,
    debit NUMERIC(15, 2) DEFAULT 0,
    credit NUMERIC(15, 2) DEFAULT 0,
    balance NUMERIC(15, 2) DEFAULT 0,
    link TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_passbook_statements_date ON passbook_statements(date);
CREATE INDEX IF NOT EXISTS idx_passbook_statements_code_book_page ON passbook_statements(code_book_page);
