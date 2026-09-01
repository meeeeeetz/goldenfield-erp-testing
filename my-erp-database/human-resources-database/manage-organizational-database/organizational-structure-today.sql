-- Organizational Structure table
CREATE TABLE IF NOT EXISTS organizational_structure (
    org_unit_role_id VARCHAR(50) PRIMARY KEY,
    org_unit_id VARCHAR(50) NOT NULL,
    org_unit_name VARCHAR(255),
    role_title VARCHAR(255) NOT NULL,
    parent_id VARCHAR(50),
    employee_assigned VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizational_structure_org_unit ON organizational_structure(org_unit_id);
CREATE INDEX IF NOT EXISTS idx_organizational_structure_parent ON organizational_structure(parent_id);
CREATE INDEX IF NOT EXISTS idx_organizational_structure_status ON organizational_structure(status);
