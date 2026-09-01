require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function check() {
  try {
    const result = await pool.query('SELECT * FROM employee_profile ORDER BY created_at DESC');
    console.log('Query succeeded');
    console.log('Rows:', result.rows.length);
    console.log('Data:', JSON.stringify(result.rows, null, 2));
  } catch (err) {
    console.error('Query failed:', err.message);
    console.error('Code:', err.code);
    console.error('Detail:', err.detail);
  } finally {
    await pool.end();
  }
}

check();
