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

async function checkSchedules() {
    try {
        const result = await pool.query('SELECT * FROM employee_schedule ORDER BY created_at DESC LIMIT 10');
        console.log('Schedules in database:');
        console.log('Count:', result.rows.length);
        result.rows.forEach(row => {
            console.log(JSON.stringify(row));
        });
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

checkSchedules();
