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

async function updateDates() {
    try {
        await pool.query('BEGIN');
        
        const result1 = await pool.query(
            'UPDATE electric_bills SET date = $1, updated_at = CURRENT_TIMESTAMP WHERE electric_bill_id = $2 RETURNING electric_bill_id, date',
            ['2024-02-09', 'ElBiID-1']
        );
        console.log('Updated ElBiID-1:', result1.rows[0]);
        
        const result2 = await pool.query(
            'UPDATE electric_bills SET date = $1, updated_at = CURRENT_TIMESTAMP WHERE electric_bill_id = $2 RETURNING electric_bill_id, date',
            ['2025-03-09', 'ElBiID-14']
        );
        console.log('Updated ElBiID-14:', result2.rows[0]);
        
        await pool.query('COMMIT');
        console.log('Done.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

updateDates();
