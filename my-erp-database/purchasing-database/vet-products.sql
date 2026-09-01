CREATE TABLE IF NOT EXISTS vet_products (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    supplier_id VARCHAR(50) NOT NULL,
    item VARCHAR(255) NOT NULL,
    generic_name VARCHAR(255),
    category VARCHAR(255) NOT NULL,
    package_size VARCHAR(50),
    unit VARCHAR(50) NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    discount VARCHAR(10) NOT NULL DEFAULT '0%',
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    dosage_preventive_value DECIMAL(10,2),
    dosage_preventive_unit VARCHAR(50),
    dosage_preventive_water VARCHAR(50),
    dosage_treatment_value DECIMAL(10,2),
    dosage_treatment_unit VARCHAR(50),
    dosage_treatment_water VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vet_products_product_id ON vet_products(product_id);
CREATE INDEX IF NOT EXISTS idx_vet_products_supplier_id ON vet_products(supplier_id);
CREATE INDEX IF NOT EXISTS idx_vet_products_category ON vet_products(category);
CREATE INDEX IF NOT EXISTS idx_vet_products_status ON vet_products(status);
