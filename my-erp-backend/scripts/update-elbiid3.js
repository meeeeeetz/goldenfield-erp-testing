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

async function updateElBiID3() {
    try {
        await pool.query('BEGIN');
        
        const result = await pool.query(
            'UPDATE electric_bills SET billing_start = $1, billing_end = $2, updated_at = CURRENT_TIMESTAMP WHERE electric_bill_id = $3 RETURNING *',
            ['2024-02-27', '2024-03-26', 'ElBiID-3']
        );
        
        console.log('Updated ElBiID-3:', result.rows[0]);
        
        await pool.query('COMMIT');
        console.log('Done.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

updateElBiID3();
