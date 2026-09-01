CREATE TABLE IF NOT EXISTS rtl_suppliers (
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

CREATE INDEX IF NOT EXISTS idx_rtl_suppliers_supplier_id ON rtl_suppliers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_rtl_suppliers_company_name ON rtl_suppliers(company_name);
CREATE INDEX IF NOT EXISTS idx_rtl_suppliers_status ON rtl_suppliers(status);
