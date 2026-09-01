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

async function checkDates() {
    try {
        const result = await pool.query('SELECT electric_bill_id, date, billing_start, billing_end FROM electric_bills ORDER BY electric_bill_id');
        console.log('Current electric bills:');
        result.rows.forEach(row => {
            console.log(`  ${row.electric_bill_id}: date=${row.date}, billing_start=${row.billing_start}, billing_end=${row.billing_end}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkDates();
