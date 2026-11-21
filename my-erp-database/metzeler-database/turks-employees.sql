CREATE TABLE IF NOT EXISTS turks_employees (
    id SERIAL PRIMARY KEY,
    employee_code VARCHAR(50) NOT NULL UNIQUE,
    employee_name VARCHAR(255) NOT NULL,
    employee_department VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_by VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_turks_employees_employee_code ON turks_employees(employee_code);
CREATE INDEX IF NOT EXISTS idx_turks_employees_status ON turks_employees(status);