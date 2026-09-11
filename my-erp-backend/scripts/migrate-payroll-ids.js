const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

async function migratePayrollIds() {
    try {
        await pool.query('BEGIN');

        const payrollResult = await pool.query(`
            SELECT payroll_id FROM payroll WHERE payroll_id LIKE 'Payroll-000000%'
        `);
        const payrollRows = payrollResult.rows;
        console.log(`Found ${payrollRows.length} payroll records to update`);

        for (const row of payrollRows) {
            const oldId = row.payroll_id;
            const newId = 'Payroll-' + String(parseInt(oldId.replace('Payroll-', ''), 10));
            await pool.query('UPDATE payroll SET payroll_id = $1 WHERE payroll_id = $2', [newId, oldId]);
            await pool.query('UPDATE batch_payroll_items SET payroll_id = $1 WHERE payroll_id = $2', [newId, oldId]);
            console.log(`Updated payroll ${oldId} -> ${newId}`);
        }

        const batchResult = await pool.query(`
            SELECT batch_reference FROM batch_payroll WHERE batch_reference LIKE 'BtPaRol-000000%'
        `);
        const batchRows = batchResult.rows;
        console.log(`\nFound ${batchRows.length} batch payroll records to update`);

        for (const row of batchRows) {
            const oldRef = row.batch_reference;
            const newRef = 'BtPaRol-' + String(parseInt(oldRef.replace('BtPaRol-', ''), 10));
            await pool.query('UPDATE batch_payroll SET batch_reference = $1 WHERE batch_reference = $2', [newRef, oldRef]);
            console.log(`Updated batch reference ${oldRef} -> ${newRef}`);
        }

        await pool.query('COMMIT');
        console.log('\nMigration completed successfully');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Migration error:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

migratePayrollIds();
