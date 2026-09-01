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

async function migrate() {
    try {
        await pool.query('BEGIN');
        
        const checkColumn = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'expenses' AND column_name = 'electric_bill_id'
        `);
        
        if (checkColumn.rows.length === 0) {
            await pool.query('ALTER TABLE expenses ADD COLUMN electric_bill_id VARCHAR(50) UNIQUE');
            console.log('Column electric_bill_id added successfully.');
        } else {
            console.log('Column electric_bill_id already exists.');
        }
        
        await pool.query('COMMIT');
        console.log('Migration completed successfully.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Migration error:', error.message);
    } finally {
        await pool.end();
    }
}

migrate();
