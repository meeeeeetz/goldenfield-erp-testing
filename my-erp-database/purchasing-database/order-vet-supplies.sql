CREATE TABLE IF NOT EXISTS order_vet_supplies (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    sales_invoice VARCHAR(100),
    company_id VARCHAR(50) NOT NULL,
    product_item_code VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    package_size VARCHAR(50),
    unit VARCHAR(50),
    unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    free_units INTEGER NOT NULL DEFAULT 0,
    discount VARCHAR(10) NOT NULL DEFAULT '0%',
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    file_path TEXT,
    payment_date DATE,
    payment_source VARCHAR(100),
    check_number VARCHAR(100),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_order_id ON order_vet_supplies(order_id);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_company_id ON order_vet_supplies(company_id);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_product_item_code ON order_vet_supplies(product_item_code);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_status ON order_vet_supplies(status);
