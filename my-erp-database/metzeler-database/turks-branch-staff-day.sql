CREATE TABLE IF NOT EXISTS turks_branch_staff_day (
    id SERIAL PRIMARY KEY,
    branch_code VARCHAR(50) NOT NULL,
    day_of_week VARCHAR(20) NOT NULL CHECK (day_of_week IN ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
    pax INTEGER NOT NULL DEFAULT 0,
    created_by VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(branch_code, day_of_week)
);

CREATE INDEX IF NOT EXISTS idx_turks_branch_staff_day_branch ON turks_branch_staff_day(branch_code);