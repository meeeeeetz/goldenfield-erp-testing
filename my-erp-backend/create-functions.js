const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_8sSgTamhfeK5@ep-late-glade-b3q66mqf-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

const functions = `
-- Function to generate attendance ID
CREATE OR REPLACE FUNCTION generate_attendance_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('attendance_log_seq') INTO next_num;
    new_id := 'AttLog-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_attendance_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.attendance_id IS NULL THEN
        NEW.attendance_id := generate_attendance_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_attendance_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate cash advance repayment ID
CREATE OR REPLACE FUNCTION generate_cashadvance_repayment_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('cash_advance_repayment_seq') INTO next_num;
    new_id := 'CaPayID-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_cashadvance_repayment_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cashadvance_repayment_id IS NULL THEN
        NEW.cashadvance_repayment_id := generate_cashadvance_repayment_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate cash advance ID
CREATE OR REPLACE FUNCTION generate_cashadvance_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('cash_advance_seq') INTO next_num;
    new_id := 'CaID-' || LPAD(next_num::TEXT, 8, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_cashadvance_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cashadvance_id IS NULL THEN
        NEW.cashadvance_id := generate_cashadvance_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_cashadvance_created_by()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.created_by IS NULL THEN
        NEW.created_by := current_user;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate loss/damage ID
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

CREATE OR REPLACE FUNCTION set_lossdamage_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.lossdamage_id IS NULL THEN
        NEW.lossdamage_id := generate_lossdamage_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_lossdamage_created_by()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.created_by IS NULL THEN
        NEW.created_by := current_user;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate holiday ID
CREATE OR REPLACE FUNCTION generate_holiday_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('holiday_seq') INTO next_num;
    new_id := 'Holiday-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_holiday_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.holiday_id IS NULL THEN
        NEW.holiday_id := generate_holiday_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate leave ID
CREATE OR REPLACE FUNCTION generate_leave_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('leave_log_seq') INTO next_num;
    new_id := 'LeaveLog-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_leave_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.leave_id IS NULL THEN
        NEW.leave_id := generate_leave_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_leave_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate overtime ID
CREATE OR REPLACE FUNCTION generate_overtime_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('overtime_log_seq') INTO next_num;
    new_id := 'OTLog-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_overtime_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.overtime_id IS NULL THEN
        NEW.overtime_id := generate_overtime_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_overtime_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate payroll ID
CREATE OR REPLACE FUNCTION generate_payroll_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('payroll_seq') INTO next_num;
    new_id := 'Payroll-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_payroll_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payroll_id IS NULL THEN
        NEW.payroll_id := generate_payroll_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_payroll_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

async function run() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(functions);
        await client.query('COMMIT');
        console.log('All functions created successfully!');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

run();
