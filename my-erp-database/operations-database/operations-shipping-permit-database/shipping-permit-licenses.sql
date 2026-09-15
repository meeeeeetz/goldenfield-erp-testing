CREATE TABLE IF NOT EXISTS shipping_permit_licenses (
    id SERIAL PRIMARY KEY,
    license_id VARCHAR(50) UNIQUE NOT NULL,
    license_name VARCHAR(255) NOT NULL,
    reg_no VARCHAR(100) NOT NULL,
    issued_date DATE,
    expiration_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    file_path VARCHAR(500),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_shipping_permit_licenses_license_id ON shipping_permit_licenses(license_id);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_licenses_license_name ON shipping_permit_licenses(license_name);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_licenses_reg_no ON shipping_permit_licenses(reg_no);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_licenses_status ON shipping_permit_licenses(status);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_licenses_expiration_date ON shipping_permit_licenses(expiration_date);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_licenses_created_by ON shipping_permit_licenses(created_by);