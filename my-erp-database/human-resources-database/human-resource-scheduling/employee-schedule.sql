DROP TABLE IF EXISTS employee_schedule;

CREATE TABLE employee_schedule (
    schedule_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    org_unit VARCHAR(100) NOT NULL,
    schedule_date DATE NOT NULL,
    half_month VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_employee_schedule_org_unit ON employee_schedule(org_unit);
CREATE INDEX IF NOT EXISTS idx_employee_schedule_schedule_date ON employee_schedule(schedule_date);
CREATE INDEX IF NOT EXISTS idx_employee_schedule_employee_id ON employee_schedule(employee_id);
CREATE UNIQUE INDEX IF NOT EXISTS uniq_employee_schedule_assignment ON employee_schedule(employee_id, schedule_date, org_unit);
