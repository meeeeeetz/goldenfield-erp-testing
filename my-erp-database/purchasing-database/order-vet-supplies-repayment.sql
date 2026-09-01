CREATE TABLE IF NOT EXISTS order_vet_supplies_repayment (
    id SERIAL PRIMARY KEY,
    repayment_id VARCHAR(50) UNIQUE NOT NULL,
    order_id VARCHAR(50) NOT NULL,
    bank_source VARCHAR(255),
    check_number VARCHAR(100),
    total DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_repayment_repayment_id ON order_vet_supplies_repayment(repayment_id);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_repayment_order_id ON order_vet_supplies_repayment(order_id);
