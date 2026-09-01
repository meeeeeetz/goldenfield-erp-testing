const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function deleteCashAdvance() {
    const client = await pool.connect();
    try {
        const targetId = 'CaID-00000001';

        const caResult = await client.query('SELECT * FROM cash_advance WHERE cashadvance_id = $1', [targetId]);
        console.log('Cash advance records found:', caResult.rows.length);
        if (caResult.rows.length > 0) {
            console.log('Record:', caResult.rows[0]);
        }

        const repaymentResult = await client.query('SELECT * FROM cash_advance_repayment WHERE cashadvance_id = $1', [targetId]);
        console.log('Repayment records found:', repaymentResult.rows.length);
        if (repaymentResult.rows.length > 0) {
            console.log('Repayments:', repaymentResult.rows);
        }

        if (caResult.rows.length === 0) {
            console.log('No cash advance found with ID:', targetId);
            return;
        }

        await client.query('BEGIN');

        await client.query('DELETE FROM cash_advance_repayment WHERE cashadvance_id = $1', [targetId]);
        console.log('Deleted repayment records');

        await client.query('DELETE FROM cash_advance WHERE cashadvance_id = $1', [targetId]);
        console.log('Deleted cash advance record');

        await client.query('COMMIT');
        console.log('Successfully deleted cash advance:', targetId);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error deleting cash advance:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

deleteCashAdvance();
