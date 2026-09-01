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

async function showRawDates() {
    try {
        const result = await pool.query('SELECT electric_bill_id, date, billing_start, billing_end FROM electric_bills ORDER BY id');
        console.log('Raw DB values:');
        result.rows.forEach(row => {
            console.log(JSON.stringify(row));
        });
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

showRawDates();
