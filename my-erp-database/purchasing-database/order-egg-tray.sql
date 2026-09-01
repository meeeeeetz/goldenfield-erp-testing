CREATE TABLE IF NOT EXISTS order_egg_trays (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    supplier_id VARCHAR(50) NOT NULL,
    type_id VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    invoice VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    payment_date DATE,
    payment_source VARCHAR(100),
    check_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_egg_trays_order_id ON order_egg_trays(order_id);
CREATE INDEX IF NOT EXISTS idx_order_egg_trays_supplier_id ON order_egg_trays(supplier_id);
CREATE INDEX IF NOT EXISTS idx_order_egg_trays_type_id ON order_egg_trays(type_id);
CREATE INDEX IF NOT EXISTS idx_order_egg_trays_status ON order_egg_trays(status);
