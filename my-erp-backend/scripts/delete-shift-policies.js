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

async function deleteRows() {
    const ids = ['ShfPo-0001', 'ShfPo-0002', 'ShfPo-0003', 'ShfPo-0004'];
    try {
        const result = await pool.query('DELETE FROM public.shift_policy WHERE shift_policy_id = ANY($1::text[])', [ids]);
        console.log(`Deleted ${result.rowCount} row(s)`);
    } catch (error) {
        console.error('Delete error:', error.message);
    } finally {
        await pool.end();
    }
}

deleteRows();
