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

async function run() {
    try {
        await pool.query('ALTER TABLE employee_profile DROP COLUMN IF EXISTS department');
        console.log('Dropped department column');
        await pool.query('ALTER TABLE employee_profile DROP COLUMN IF EXISTS job_title');
        console.log('Dropped job_title column');
    } catch (err) {
        console.error('Migration error:', err.message);
    } finally {
        await pool.end();
    }
}

run();
