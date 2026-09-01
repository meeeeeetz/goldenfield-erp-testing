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

async function subtractOneDay() {
    try {
        await pool.query('BEGIN');

        const result = await pool.query(`
            UPDATE electric_bills 
            SET 
                date = date - INTERVAL '1 day',
                billing_start = billing_start - INTERVAL '1 day',
                billing_end = billing_end - INTERVAL '1 day',
                updated_at = CURRENT_TIMESTAMP
            WHERE electric_bill_id IN ('ElBiID-1', 'ElBiID-2', 'ElBiID-3', 'ElBiID-4', 'ElBiID-5', 'ElBiID-6', 'ElBiID-7')
            RETURNING electric_bill_id, date, billing_start, billing_end
        `);

        console.log(`Updated ${result.rowCount} records:`);
        result.rows.forEach(row => {
            console.log(`  ${row.electric_bill_id}: date=${row.date}, billing_start=${row.billing_start}, billing_end=${row.billing_end}`);
        });

        await pool.query('COMMIT');
        console.log('Subtract 1 day completed successfully.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

subtractOneDay();
