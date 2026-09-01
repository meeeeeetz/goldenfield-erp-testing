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
  const targetId = 'GefiEmp-00001';
  try {
    const result = await pool.query(
      'DELETE FROM employee_profile WHERE employee_id = $1 RETURNING employee_id, last_name, first_name',
      [targetId]
    );
    if (result.rows.length === 0) {
      console.log('No employee profile found with ID:', targetId);
    } else {
      console.log('Deleted employee profile:', result.rows[0]);
    }
  } catch (err) {
    console.error('Delete failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
