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

async function addGrossPayColumns() {
    try {
        await pool.query('ALTER TABLE payroll ADD COLUMN IF NOT EXISTS gross_pay DECIMAL(12,2) DEFAULT 0');
        await pool.query('ALTER TABLE payroll ADD COLUMN IF NOT EXISTS gross_deduction DECIMAL(12,2) DEFAULT 0');
        console.log('gross_pay and gross_deduction columns added to payroll table successfully');
    } catch (error) {
        console.error('Migration error:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

addGrossPayColumns();
