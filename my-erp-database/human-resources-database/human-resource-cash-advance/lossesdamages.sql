-- Loss/Damage table
CREATE TABLE IF NOT EXISTS loss_damage (
    lossdamage_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    loss_damage_amount DECIMAL(12,2) NOT NULL,
    reason VARCHAR(255),
    no_of_payroll_cycle INT NOT NULL,
    installment_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'unpaid',
    created_by VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sequence for generating loss/damage IDs
CREATE SEQUENCE IF NOT EXISTS loss_damage_seq START 1;

-- Function to generate loss/damage ID in LoDaID-000000001 format
CREATE OR REPLACE FUNCTION generate_lossdamage_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('loss_damage_seq') INTO next_num;
    new_id := 'LoDaID-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate lossdamage_id on insert
CREATE OR REPLACE FUNCTION set_lossdamage_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.lossdamage_id IS NULL THEN
        NEW.lossdamage_id := generate_lossdamage_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_lossdamage_id
    BEFORE INSERT ON loss_damage
    FOR EACH ROW
    EXECUTE FUNCTION set_lossdamage_id();

-- Index for fast lookups by employee
CREATE INDEX idx_loss_damage_employee_id ON loss_damage(employee_id);

-- Trigger to update created_by if null
CREATE OR REPLACE FUNCTION set_lossdamage_created_by()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.created_by IS NULL THEN
        NEW.created_by := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_lossdamage_created_by
    BEFORE INSERT ON loss_damage
    FOR EACH ROW
    EXECUTE FUNCTION set_lossdamage_created_by();
