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

async function fixBatchPayrolls() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const batch12 = await client.query('SELECT batch_payroll_id FROM batch_payroll WHERE batch_reference = $1', ['BtPaRol-000000012']);
        const batch13 = await client.query('SELECT batch_payroll_id FROM batch_payroll WHERE batch_reference = $1', ['BtPaRol-000000013']);

        if (batch12.rows.length > 0) {
            const batch12Id = batch12.rows[0].batch_payroll_id;
            await client.query('UPDATE payroll SET gross_pay = total_days_worked + total_overtime_hours + total_allowance + total_leaves_usage + regular_holiday + special_holiday, gross_deduction = total_income_tax + total_sss_payment + total_sss_loan_payment + total_philhealth_payment + total_pagibig_payment + total_pagibig_loan_payment + total_cash_loan_deductions + total_losses_damages FROM batch_payroll_items bi WHERE payroll.payroll_id = bi.payroll_id AND bi.batch_payroll_id = $1', [batch12Id]);
            console.log('Updated gross_pay and gross_deduction for batch BtPaRol-000000012');
        }

        if (batch13.rows.length > 0) {
            const batch13Id = batch13.rows[0].batch_payroll_id;
            await client.query('UPDATE payroll SET gross_pay = total_days_worked + total_overtime_hours + total_allowance + total_leaves_usage + regular_holiday + special_holiday, gross_deduction = total_income_tax + total_sss_payment + total_sss_loan_payment + total_philhealth_payment + total_pagibig_payment + total_pagibig_loan_payment + total_cash_loan_deductions + total_losses_damages FROM batch_payroll_items bi WHERE payroll.payroll_id = bi.payroll_id AND bi.batch_payroll_id = $1', [batch13Id]);
            console.log('Updated gross_pay and gross_deduction for batch BtPaRol-000000013');
        }

        const deletedBatches = await client.query('DELETE FROM batch_payroll WHERE batch_reference BETWEEN $1 AND $2 RETURNING batch_reference', ['BtPaRol-000000001', 'BtPaRol-000000011']);
        console.log(`Deleted ${deletedBatches.rows.length} batch payroll records from BtPaRol-000000001 to BtPaRol-000000011`);
        deletedBatches.rows.forEach(r => console.log('Deleted:', r.batch_reference));

        await client.query('COMMIT');
        console.log('Transaction committed successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transaction failed:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

fixBatchPayrolls();
