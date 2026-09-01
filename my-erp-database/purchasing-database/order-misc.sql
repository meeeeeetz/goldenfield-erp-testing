CREATE TABLE IF NOT EXISTS order_misc (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    sales_invoice VARCHAR(255),
    customer VARCHAR(255),
    customer_name VARCHAR(255),
    expense_code VARCHAR(255),
    expense_type VARCHAR(255),
    grand_total NUMERIC(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    payment_date DATE,
    payment_source TEXT,
    check_number TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_misc_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    item VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit VARCHAR(50) DEFAULT 'Unit',
    price NUMERIC(12,2) NOT NULL DEFAULT 0,
    remarks TEXT,
    amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_misc_order_id ON order_misc(order_id);
CREATE INDEX IF NOT EXISTS idx_order_misc_customer ON order_misc(customer);
CREATE INDEX IF NOT EXISTS idx_order_misc_status ON order_misc(status);
CREATE INDEX IF NOT EXISTS idx_order_misc_items_order_id ON order_misc_items(order_id);
