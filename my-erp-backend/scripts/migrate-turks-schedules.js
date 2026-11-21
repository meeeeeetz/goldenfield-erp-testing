const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, '..', '..', 'my-erp-database', 'metzeler-database', 'turks-schedules.sql'), 'utf8');
        
        await pool.query('BEGIN');
        await pool.query(sql);
        await pool.query('COMMIT');
        console.log('Turks schedules table created successfully.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Migration error:', error.message);
    } finally {
        await pool.end();
    }
}

migrate();