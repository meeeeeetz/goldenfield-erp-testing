const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function verify() {
    try {
        const batch12 = await pool.query('SELECT batch_payroll_id FROM batch_payroll WHERE batch_reference = $1', ['BtPaRol-000000012']);
        if (batch12.rows.length > 0) {
            const batch12Id = batch12.rows[0].batch_payroll_id;
            const payrolls12 = await pool.query('SELECT p.payroll_id, p.employee_id, p.gross_pay, p.gross_deduction, p.net_pay FROM payroll p JOIN batch_payroll_items bi ON p.payroll_id = bi.payroll_id WHERE bi.batch_payroll_id = $1', [batch12Id]);
            console.log('Batch 12 payrolls:');
            payrolls12.rows.forEach(row => console.log(JSON.stringify(row)));
        }

        const batch13 = await pool.query('SELECT batch_payroll_id FROM batch_payroll WHERE batch_reference = $1', ['BtPaRol-000000013']);
        if (batch13.rows.length > 0) {
            const batch13Id = batch13.rows[0].batch_payroll_id;
            const payrolls13 = await pool.query('SELECT p.payroll_id, p.employee_id, p.gross_pay, p.gross_deduction, p.net_pay FROM payroll p JOIN batch_payroll_items bi ON p.payroll_id = bi.payroll_id WHERE bi.batch_payroll_id = $1', [batch13Id]);
            console.log('Batch 13 payrolls:');
            payrolls13.rows.forEach(row => console.log(JSON.stringify(row)));
        }

        const remainingBatches = await pool.query('SELECT batch_reference FROM batch_payroll ORDER BY batch_reference');
        console.log('Remaining batch payrolls:');
        remainingBatches.rows.forEach(row => console.log(row.batch_reference));
    } catch (err) {
        console.error('Verification error:', err.message);
    } finally {
        await pool.end();
    }
}

verify();
