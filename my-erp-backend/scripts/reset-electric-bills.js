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

async function resetElectricBills() {
    try {
        await pool.query('BEGIN');

        const countResult = await pool.query('SELECT COUNT(*) FROM electric_bills');
        const count = parseInt(countResult.rows[0].count);
        console.log(`Found ${count} electric bill record(s).`);

        await pool.query('DELETE FROM electric_bills');
        console.log('All electric bill records deleted.');

        await pool.query("SELECT setval(pg_get_serial_sequence('electric_bills', 'id'), 1, false)");
        console.log('Primary key sequence reset to 1.');

        await pool.query('COMMIT');
        console.log('Electric bills reset completed successfully.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Electric bills reset error:', error.message);
    } finally {
        await pool.end();
    }
}

resetElectricBills();
