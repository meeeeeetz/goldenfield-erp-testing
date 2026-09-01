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

async function resetPettyCash() {
    try {
        await pool.query('BEGIN');
        
        const countResult = await pool.query('SELECT COUNT(*) FROM petty_cash');
        const count = parseInt(countResult.rows[0].count);
        console.log(`Found ${count} petty cash records.`);
        
        await pool.query('DELETE FROM petty_cash');
        console.log('All petty cash records deleted.');
        
        await pool.query("SELECT setval(pg_get_serial_sequence('petty_cash', 'petty_cash_id'), 1, false)");
        console.log('Sequence reset to 1.');
        
        await pool.query('COMMIT');
        console.log('Petty cash reset completed successfully.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Petty cash reset error:', error.message);
    } finally {
        await pool.end();
    }
}

resetPettyCash();
