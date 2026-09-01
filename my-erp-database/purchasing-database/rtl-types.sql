CREATE TABLE IF NOT EXISTS rtl_types (
    id SERIAL PRIMARY KEY,
    type_id VARCHAR(50) UNIQUE NOT NULL,
    company VARCHAR(255) NOT NULL,
    item VARCHAR(255) NOT NULL,
    remarks TEXT,
    price NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rtl_types_type_id ON rtl_types(type_id);
CREATE INDEX IF NOT EXISTS idx_rtl_types_company ON rtl_types(company);
CREATE INDEX IF NOT EXISTS idx_rtl_types_status ON rtl_types(status);
