-- Organizational Units table
CREATE TABLE IF NOT EXISTS organizational_units (
    org_unit_id VARCHAR(50) PRIMARY KEY,
    unit_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizational_units_status ON organizational_units(status);
