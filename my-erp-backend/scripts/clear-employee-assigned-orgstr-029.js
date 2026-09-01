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
  try {
    const result = await pool.query(
      'UPDATE organizational_structure SET employee_assigned = NULL WHERE org_unit_role_id = $1 RETURNING org_unit_role_id, org_unit_name, employee_assigned',
      ['OrgStr-029']
    );
    console.log('Updated rows:', result.rows.length);
    console.log(JSON.stringify(result.rows, null, 2));
  } catch (err) {
    console.error('Update failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
