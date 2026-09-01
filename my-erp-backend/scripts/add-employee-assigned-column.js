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

async function addColumn() {
    try {
        await pool.query('ALTER TABLE organizational_structure ADD COLUMN IF NOT EXISTS employee_assigned VARCHAR(50)');
        console.log('employee_assigned column added successfully');
    } catch (error) {
        console.error('Migration error:', error.message);
    } finally {
        await pool.end();
    }
}

addColumn();
