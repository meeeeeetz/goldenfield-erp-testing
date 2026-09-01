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

async function listTables() {
    try {
        const result = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name");
        console.log('Tables:');
        result.rows.forEach(row => console.log(row.table_name));
    } catch (err) {
        console.error(err.message);
    } finally {
        await pool.end();
    }
}

listTables();
