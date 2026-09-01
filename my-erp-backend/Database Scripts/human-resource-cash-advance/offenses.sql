CREATE SEQUENCE IF NOT EXISTS offenses_seq;

CREATE TABLE IF NOT EXISTS offenses (
    offense_id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    employee_name VARCHAR(255),
    offense_type VARCHAR(255) NOT NULL,
    description TEXT,
    date_committed DATE,
    severity VARCHAR(50),
    action_taken TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_offenses_employee_id ON offenses(employee_id);
CREATE INDEX IF NOT EXISTS idx_offenses_date_committed ON offenses(date_committed);
