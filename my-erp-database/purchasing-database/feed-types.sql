CREATE TABLE IF NOT EXISTS feed_types (
    id SERIAL PRIMARY KEY,
    feed_type_id VARCHAR(50) UNIQUE NOT NULL,
    supplier_id VARCHAR(50) NOT NULL REFERENCES feeds_suppliers(supplier_id),
    feed_type VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    remarks TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feed_types_feed_type_id ON feed_types(feed_type_id);
CREATE INDEX IF NOT EXISTS idx_feed_types_supplier_id ON feed_types(supplier_id);
CREATE INDEX IF NOT EXISTS idx_feed_types_status ON feed_types(status);
