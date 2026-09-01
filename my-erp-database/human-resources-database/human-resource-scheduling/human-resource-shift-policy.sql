-- Drop view if exists (to allow clean re-run)
DROP VIEW IF EXISTS public.shift_policy_with_unit_name;

-- Shift Policy table
CREATE TABLE IF NOT EXISTS shift_policy (
    shift_policy_id VARCHAR(50) PRIMARY KEY,
    shift_name VARCHAR(255) NOT NULL,
    shift_time_start TIME NOT NULL,
    shift_time_end TIME NOT NULL,
    first_coffee_break_start TIME,
    first_coffee_break_end TIME,
    mid_break_start TIME,
    mid_break_end TIME,
    second_coffee_break_start TIME,
    second_coffee_break_end TIME,
    org_unit VARCHAR(50) NOT NULL,
    remarks TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_shift_policy_org_unit ON shift_policy(org_unit);
CREATE INDEX IF NOT EXISTS idx_shift_policy_status ON shift_policy(status);
