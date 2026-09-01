CREATE TABLE IF NOT EXISTS electric_bills (
    id SERIAL PRIMARY KEY,
    electric_bill_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    billing_start DATE NOT NULL,
    billing_end DATE NOT NULL,
    demand DECIMAL(10, 2),
    kwh DECIMAL(10, 2),
    rate_per_kwh DECIMAL(10, 2),
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_by INTEGER,
    payment_date DATE,
    payment_source VARCHAR(255),
    check_number VARCHAR(100),
    file_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_electric_bills_id ON electric_bills(electric_bill_id);
CREATE INDEX IF NOT EXISTS idx_electric_bills_date ON electric_bills(date);
CREATE INDEX IF NOT EXISTS idx_electric_bills_status ON electric_bills(status);
