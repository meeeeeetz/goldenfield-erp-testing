const { Pool } = require('pg');
require('dotenv').config({ path: 'my-erp-backend/.env' });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

const tables = [
  'order_egg_trays',
  'order_feeds',
  'order_vet_supplies',
  'order_rtl',
  'order_misc',
  'expenses',
  'electric_bills',
  'receipt_issues',
  'employee_compensation',
  'attendance_log'
];

(async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const table of tables) {
      const colCheck = await client.query(`
        SELECT column_name FROM information_schema.columns
        WHERE table_name = $1 AND column_name = 'id'
      `, [table]);
      if (colCheck.rows.length === 0) {
        console.log(`- ${table}: no id column, skipped`);
        continue;
      }
      const result = await client.query(`
        SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE(MAX(id), 0) + 1, false) as new_sequence
        FROM ${table}
      `);
      console.log(`✓ ${table}: sequence reset to ${result.rows[0].new_sequence}`);
    }
    await client.query('COMMIT');
    console.log('\nAll sequences reset successfully!');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', e.message);
  } finally {
    client.release();
    await pool.end();
  }
})();
