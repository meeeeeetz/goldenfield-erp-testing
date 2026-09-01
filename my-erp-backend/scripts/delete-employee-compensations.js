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

async function run() {
    const ids = ['EmpComp-0001', 'EmpComp-0002', 'EmpComp-0003'];
    const result = await pool.query('DELETE FROM employee_compensation WHERE compensation_id = ANY($1::text[])', [ids]);
    console.log('Deleted ' + result.rowCount + ' row(s)');
    await pool.end();
}

run().catch(err => {
    console.error(err.message);
    process.exit(1);
});
