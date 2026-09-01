CREATE TABLE IF NOT EXISTS order_rtl_repayments (
    id SERIAL PRIMARY KEY,
    repayment_id VARCHAR(50) UNIQUE NOT NULL,
    order_id VARCHAR(50) NOT NULL,
    payment_type VARCHAR(20) NOT NULL DEFAULT 'Partial',
    payment_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    starting_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    remaining_balance NUMERIC(12,2) NOT NULL DEFAULT 0,
    bank_source VARCHAR(255),
    check_number VARCHAR(100),
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_rtl_repayments_repayment_id ON order_rtl_repayments(repayment_id);
CREATE INDEX IF NOT EXISTS idx_order_rtl_repayments_order_id ON order_rtl_repayments(order_id);
CREATE INDEX IF NOT EXISTS idx_order_rtl_repayments_date ON order_rtl_repayments(date);
