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
    const result = await pool.query(`
      ALTER TABLE receipt_issue_summaries
      ADD COLUMN IF NOT EXISTS created_by VARCHAR(255)
    `);
    console.log('Migration completed successfully');
  } catch (e) {
    console.error('Migration failed:', e.message);
  } finally {
    await pool.end();
  }
})();
