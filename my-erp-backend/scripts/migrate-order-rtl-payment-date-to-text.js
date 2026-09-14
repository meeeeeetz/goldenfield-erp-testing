const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

async function runMigration() {
    const sql = `
        ALTER TABLE order_rtl ALTER COLUMN payment_date TYPE TEXT;
    `;
    try {
        await pool.query(sql);
        console.log('Migration completed: payment_date column changed to TEXT');
    } catch (error) {
        console.error('Migration error:', error.message);
    }

    await pool.end();
}

runMigration();