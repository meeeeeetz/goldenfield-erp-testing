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

async function checkTableSchema() {
    try {
        const result = await pool.query(`
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = 'electric_bills' 
            ORDER BY ordinal_position
        `);
        
        console.log('Electric bills table schema:');
        result.rows.forEach(row => {
            console.log(`  ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
        });

        const countResult = await pool.query('SELECT COUNT(*) FROM electric_bills');
        console.log(`\nTotal records: ${countResult.rows[0].count}`);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkTableSchema();
