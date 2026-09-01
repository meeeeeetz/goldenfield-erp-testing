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

async function checkYears() {
    try {
        const result = await pool.query(`
            SELECT DISTINCT EXTRACT(YEAR FROM date) as year 
            FROM electric_bills 
            WHERE date IS NOT NULL 
            ORDER BY year DESC
        `);
        console.log('Years in database:', result.rows.map(r => r.year));
        
        const currentYearResult = await pool.query("SELECT EXTRACT(YEAR FROM CURRENT_DATE) as current_year");
        console.log('Current year:', currentYearResult.rows[0].current_year);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkYears();
