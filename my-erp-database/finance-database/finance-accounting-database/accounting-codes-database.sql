
CREATE TABLE IF NOT EXISTS accounting_codes (
    id SERIAL PRIMARY KEY,
    accounting_id VARCHAR(255) NOT NULL UNIQUE,
    accounting_type VARCHAR(255) NOT NULL,
    accounting_code VARCHAR(255) NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
