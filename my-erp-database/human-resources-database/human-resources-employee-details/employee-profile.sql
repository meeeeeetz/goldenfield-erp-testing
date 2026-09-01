-- Employee Profile table
CREATE TABLE IF NOT EXISTS employee_profile (
    employee_id VARCHAR(50) PRIMARY KEY,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    address TEXT NOT NULL,
    contact_details VARCHAR(50) NOT NULL,
    email_address VARCHAR(255),
    birthdate DATE NOT NULL,
    gender VARCHAR(50) NOT NULL,
    civil_status VARCHAR(50) NOT NULL,
    emergency_contact VARCHAR(255) NOT NULL,
    emergency_contact_number VARCHAR(50) NOT NULL,
    date_of_hire DATE,
    employment_status VARCHAR(50),
    department VARCHAR(50),
    job_title VARCHAR(255),
    sss_number VARCHAR(50),
    philhealth_number VARCHAR(50),
    pagibig_number VARCHAR(50),
    tin_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_employee_profile_employee_id ON employee_profile(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_profile_department ON employee_profile(department);
CREATE INDEX IF NOT EXISTS idx_employee_profile_employment_status ON employee_profile(employment_status);
