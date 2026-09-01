CREATE TABLE IF NOT EXISTS order_rtl (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    company VARCHAR(255) NOT NULL,
    sales_invoice VARCHAR(255),
    grand_total NUMERIC(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    payment_date DATE,
    payment_source TEXT,
    check_number TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_rtl_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    item VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit VARCHAR(50) DEFAULT 'Heads',
    price NUMERIC(12,2) NOT NULL DEFAULT 0,
    total_price NUMERIC(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_rtl_order_id ON order_rtl(order_id);
CREATE INDEX IF NOT EXISTS idx_order_rtl_company ON order_rtl(company);
CREATE INDEX IF NOT EXISTS idx_order_rtl_status ON order_rtl(status);
CREATE INDEX IF NOT EXISTS idx_order_rtl_items_order_id ON order_rtl_items(order_id);
