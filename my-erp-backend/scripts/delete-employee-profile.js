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

async function deleteRow() {
    try {
        const result = await pool.query('DELETE FROM employee_profile WHERE employee_id = $1', ['GefiEmp-00001']);
        console.log(`Deleted ${result.rowCount} row(s)`);
    } catch (error) {
        console.error('Delete error:', error.message);
    } finally {
        await pool.end();
    }
}

deleteRow();
