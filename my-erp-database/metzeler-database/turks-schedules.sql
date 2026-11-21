CREATE TABLE IF NOT EXISTS turks_schedules (
    id SERIAL PRIMARY KEY,
    branch_code VARCHAR(50) NOT NULL,
    schedule_date DATE NOT NULL,
    day_of_week VARCHAR(20) NOT NULL,
    pax INTEGER NOT NULL DEFAULT 0,
    created_by VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(branch_code, schedule_date)
);

CREATE INDEX IF NOT EXISTS idx_turks_schedules_branch_date ON turks_schedules(branch_code, schedule_date);