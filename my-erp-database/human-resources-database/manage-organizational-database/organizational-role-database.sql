-- Organizational Roles table
CREATE TABLE IF NOT EXISTS organizational_roles (
    role_id VARCHAR(50) PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    org_unit VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizational_roles_org_unit ON organizational_roles(org_unit);
CREATE INDEX IF NOT EXISTS idx_organizational_roles_status ON organizational_roles(status);
