CREATE TABLE IF NOT EXISTS order_feeds (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    due_date DATE NOT NULL,
    supplier_id VARCHAR(50) NOT NULL REFERENCES feeds_suppliers(supplier_id),
    sales_invoice VARCHAR(255),
    feed_type_id VARCHAR(50) NOT NULL REFERENCES feed_types(feed_type_id),
    quantity DECIMAL(12,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(14,2) NOT NULL,
    receipt_path VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    rebate_status VARCHAR(20) NOT NULL DEFAULT 'Unclaimed',
    payment_date DATE,
    payment_source VARCHAR(255),
    check_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_feeds_order_id ON order_feeds(order_id);
CREATE INDEX IF NOT EXISTS idx_order_feeds_supplier_id ON order_feeds(supplier_id);
CREATE INDEX IF NOT EXISTS idx_order_feeds_feed_type_id ON order_feeds(feed_type_id);
CREATE INDEX IF NOT EXISTS idx_order_feeds_status ON order_feeds(status);
CREATE INDEX IF NOT EXISTS idx_order_feeds_date ON order_feeds(date);
