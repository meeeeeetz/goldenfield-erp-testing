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

async function addOneDayToElBiID7() {
    try {
        await pool.query('BEGIN');

        const result = await pool.query(`
            UPDATE electric_bills 
            SET 
                date = date + INTERVAL '1 day',
                billing_start = billing_start + INTERVAL '1 day',
                billing_end = billing_end + INTERVAL '1 day',
                updated_at = CURRENT_TIMESTAMP
            WHERE electric_bill_id = 'ElBiID-7'
            RETURNING electric_bill_id, date, billing_start, billing_end
        `);

        console.log('Updated ElBiID-7:');
        console.log(result.rows[0]);

        await pool.query('COMMIT');
        console.log('Done.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

addOneDayToElBiID7();
