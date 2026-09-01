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

async function addCategoryColumn() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const columnExists = await client.query(`
            SELECT column_name FROM information_schema.columns
            WHERE table_name = 'feed_types' AND column_name = 'category'
        `);

        if (columnExists.rows.length === 0) {
            await client.query('ALTER TABLE feed_types ADD COLUMN category VARCHAR(50)');
            console.log('Added category column to feed_types table');
        } else {
            console.log('category column already exists');
        }

        await client.query('COMMIT');
        console.log('Migration completed successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

addCategoryColumn();
