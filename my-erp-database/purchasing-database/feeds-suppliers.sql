CREATE TABLE IF NOT EXISTS feeds_suppliers (
    id SERIAL PRIMARY KEY,
    supplier_id VARCHAR(50) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    address TEXT,
    tin_number VARCHAR(20),
    contact_person VARCHAR(255),
    contact_number VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feeds_suppliers_supplier_id ON feeds_suppliers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_feeds_suppliers_company_name ON feeds_suppliers(company_name);
CREATE INDEX IF NOT EXISTS idx_feeds_suppliers_status ON feeds_suppliers(status);
