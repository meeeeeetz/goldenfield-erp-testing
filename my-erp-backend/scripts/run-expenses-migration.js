const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function runMigration() {
    const sqlFile = path.join(__dirname, '..', '..', 'my-erp-database', 'finance-expenses-database', 'expenses.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    try {
        await pool.query(sql);
        console.log('Expenses migration completed successfully');
    } catch (error) {
        console.error('Expenses migration error:', error.message);
    } finally {
        await pool.end();
    }
}

runMigration();
