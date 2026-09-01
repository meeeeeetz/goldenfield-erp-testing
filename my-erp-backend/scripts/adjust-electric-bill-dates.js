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

async function addOneDayToDates() {
    try {
        await pool.query('BEGIN');

        const result = await pool.query(`
            UPDATE electric_bills 
            SET 
                date = date + INTERVAL '1 day',
                billing_start = billing_start + INTERVAL '1 day',
                billing_end = billing_end + INTERVAL '1 day',
                updated_at = CURRENT_TIMESTAMP
            WHERE date IS NOT NULL 
               OR billing_start IS NOT NULL 
               OR billing_end IS NOT NULL
            RETURNING id, electric_bill_id, date, billing_start, billing_end
        `);

        console.log(`Updated ${result.rowCount} record(s):`);
        result.rows.forEach(row => {
            console.log(`  ${row.electric_bill_id}: date=${row.date}, billing_start=${row.billing_start}, billing_end=${row.billing_end}`);
        });

        await pool.query('COMMIT');
        console.log('Date adjustment completed successfully.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Date adjustment error:', error.message);
    } finally {
        await pool.end();
    }
}

addOneDayToDates();
