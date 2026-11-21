CREATE TABLE IF NOT EXISTS turks_branches (
    id SERIAL PRIMARY KEY,
    branch_code VARCHAR(50) NOT NULL UNIQUE,
    branch_name VARCHAR(255) NOT NULL,
    branch_location TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_by VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_turks_branches_branch_code ON turks_branches(branch_code);
CREATE INDEX IF NOT EXISTS idx_turks_branches_status ON turks_branches(status);