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
  const ids = ['GefiEmp-00001','GefiEmp-00002','GefiEmp-00003','GefiEmp-00004','GefiEmp-00005','GefiEmp-00006','GefiEmp-00007','GefiEmp-00008','GefiEmp-00009'];
  try {
    const result = await pool.query(
      'DELETE FROM employee_profile WHERE employee_id = ANY($1::text[]) RETURNING employee_id, last_name, first_name',
      [ids]
    );
    console.log('Deleted rows:', result.rows.length);
    console.log(JSON.stringify(result.rows, null, 2));
    if (result.rows.length === 0) {
      console.log('No matching employee profiles found.');
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
