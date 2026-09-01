const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_8sSgTamhfeK5@ep-late-glade-b3q66mqf-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

const triggers = `
-- Attendance triggers
DROP TRIGGER IF EXISTS trigger_set_attendance_id ON attendance_log;
CREATE TRIGGER trigger_set_attendance_id
    BEFORE INSERT ON attendance_log
    FOR EACH ROW
    EXECUTE FUNCTION set_attendance_id();

DROP TRIGGER IF EXISTS trigger_update_attendance_updated_at ON attendance_log;
CREATE TRIGGER trigger_update_attendance_updated_at
    BEFORE UPDATE ON attendance_log
    FOR EACH ROW
    EXECUTE FUNCTION update_attendance_updated_at();

-- Cash advance repayment triggers
DROP TRIGGER IF EXISTS trigger_set_cashadvance_repayment_id ON cash_advance_repayment;
CREATE TRIGGER trigger_set_cashadvance_repayment_id
    BEFORE INSERT ON cash_advance_repayment
    FOR EACH ROW
    EXECUTE FUNCTION set_cashadvance_repayment_id();

-- Cash advance triggers
DROP TRIGGER IF EXISTS trigger_set_cashadvance_id ON cash_advance;
CREATE TRIGGER trigger_set_cashadvance_id
    BEFORE INSERT ON cash_advance
    FOR EACH ROW
    EXECUTE FUNCTION set_cashadvance_id();

DROP TRIGGER IF EXISTS trigger_set_cashadvance_created_by ON cash_advance;
CREATE TRIGGER trigger_set_cashadvance_created_by
    BEFORE INSERT ON cash_advance
    FOR EACH ROW
    EXECUTE FUNCTION set_cashadvance_created_by();

-- Loss damage triggers
DROP TRIGGER IF EXISTS trigger_set_lossdamage_id ON loss_damage;
CREATE TRIGGER trigger_set_lossdamage_id
    BEFORE INSERT ON loss_damage
    FOR EACH ROW
    EXECUTE FUNCTION set_lossdamage_id();

DROP TRIGGER IF EXISTS trigger_set_lossdamage_created_by ON loss_damage;
CREATE TRIGGER trigger_set_lossdamage_created_by
    BEFORE INSERT ON loss_damage
    FOR EACH ROW
    EXECUTE FUNCTION set_lossdamage_created_by();

-- Holiday triggers
DROP TRIGGER IF EXISTS trigger_set_holiday_id ON holiday;
CREATE TRIGGER trigger_set_holiday_id
    BEFORE INSERT ON holiday
    FOR EACH ROW
    EXECUTE FUNCTION set_holiday_id();

-- Leave triggers
DROP TRIGGER IF EXISTS trigger_set_leave_id ON leave_log;
CREATE TRIGGER trigger_set_leave_id
    BEFORE INSERT ON leave_log
    FOR EACH ROW
    EXECUTE FUNCTION set_leave_id();

DROP TRIGGER IF EXISTS trigger_update_leave_updated_at ON leave_log;
CREATE TRIGGER trigger_update_leave_updated_at
    BEFORE UPDATE ON leave_log
    FOR EACH ROW
    EXECUTE FUNCTION update_leave_updated_at();

-- Overtime triggers
DROP TRIGGER IF EXISTS trigger_set_overtime_id ON overtime_log;
CREATE TRIGGER trigger_set_overtime_id
    BEFORE INSERT ON overtime_log
    FOR EACH ROW
    EXECUTE FUNCTION set_overtime_id();

DROP TRIGGER IF EXISTS trigger_update_overtime_updated_at ON overtime_log;
CREATE TRIGGER trigger_update_overtime_updated_at
    BEFORE UPDATE ON overtime_log
    FOR EACH ROW
    EXECUTE FUNCTION update_overtime_updated_at();

-- Payroll triggers
DROP TRIGGER IF EXISTS trigger_set_payroll_id ON payroll;
CREATE TRIGGER trigger_set_payroll_id
    BEFORE INSERT ON payroll
    FOR EACH ROW
    EXECUTE FUNCTION set_payroll_id();

DROP TRIGGER IF EXISTS trigger_update_payroll_updated_at ON payroll;
CREATE TRIGGER trigger_update_payroll_updated_at
    BEFORE UPDATE ON payroll
    FOR EACH ROW
    EXECUTE FUNCTION update_payroll_updated_at();
`;

async function run() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(triggers);
        await client.query('COMMIT');
        console.log('All triggers created successfully!');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

run();
