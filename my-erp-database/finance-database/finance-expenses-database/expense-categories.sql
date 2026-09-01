 
CREATE TABLE IF NOT EXISTS expense_categories (
    id SERIAL PRIMARY KEY,
    expense_type VARCHAR(255) NOT NULL UNIQUE,
    remarks TEXT,
    accounting_code VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO expense_categories (expense_type, remarks, accounting_code) VALUES
    ('Salary', 'Employee salaries and wages', 'EXP-001'),
    ('Feeds', 'Animal feeds and supplements', 'EXP-002'),
    ('Flock', 'Poultry flock purchases', 'EXP-003'),
    ('Maintenance', 'Equipment and facility maintenance', 'EXP-004'),
    ('Construction', 'Building and infrastructure', 'EXP-005'),
    ('Office', 'Office supplies and expenses', 'EXP-006'),
    ('Legal and Accountant', 'Legal and accounting services', 'EXP-007'),
    ('Veterinary', 'Veterinary services and medicines', 'EXP-008'),
    ('Egg Tray', 'Egg trays and packaging materials', 'EXP-009'),
    ('Utilities', 'Electricity, water, and other utilities', 'EXP-010'),
    ('Others', 'Other miscellaneous expenses', 'EXP-011')
ON CONFLICT (expense_type) DO NOTHING;
