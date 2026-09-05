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

(async () => {
  try {
    await pool.query(`
      ALTER TABLE receipt_issues
      ALTER COLUMN qty TYPE DECIMAL(10,2)
      USING qty::DECIMAL(10,2)
    `);
    console.log('Migration completed successfully: receipt_issues.qty changed to DECIMAL(10,2)');
  } catch (e) {
    console.error('Migration failed:', e.message);
  } finally {
    await pool.end();
  }
})();
