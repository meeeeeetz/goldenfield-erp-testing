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

async function clearCashAdvanceData() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const repaymentCount = await client.query('SELECT COUNT(*) FROM cash_advance_repayment');
        const cashAdvanceCount = await client.query('SELECT COUNT(*) FROM cash_advance');

        console.log(`Deleting ${repaymentCount.rows[0].count} repayment records...`);
        await client.query('DELETE FROM cash_advance_repayment');

        console.log(`Deleting ${cashAdvanceCount.rows[0].count} cash advance records...`);
        await client.query('DELETE FROM cash_advance');

        await client.query("SELECT setval('cash_advance_repayment_seq', 1, false)");
        await client.query("SELECT setval('cash_advance_seq', 1, false)");

        await client.query('COMMIT');
        console.log('Successfully cleared all cash advance and repayment data');
        console.log('Sequences reset to start from 1');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error clearing cash advance data:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

clearCashAdvanceData();
