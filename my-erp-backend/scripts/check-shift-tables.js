const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Zillion',
  database: 'goldenfield_erp'
});

async function check() {
  const res = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'shift_policy' ORDER BY ordinal_position");
  console.log('Columns:', res.rows);
  const data = await pool.query("SELECT * FROM shift_policy LIMIT 10");
  console.log('Data:', data.rows);
  await pool.end();
}

check().catch(e => { console.error(e); process.exit(1); });
