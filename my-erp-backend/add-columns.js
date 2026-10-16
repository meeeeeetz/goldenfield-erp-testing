require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

async function addColumns() {
  try {
    await pool.query("ALTER TABLE chicken_hauling_logs ADD COLUMN IF NOT EXISTS grand_total NUMERIC DEFAULT 0");
    await pool.query("ALTER TABLE chicken_hauling_logs ADD COLUMN IF NOT EXISTS date_start DATE");
    await pool.query("ALTER TABLE chicken_hauling_logs ADD COLUMN IF NOT EXISTS date_end DATE");
    console.log('Columns added successfully');
  } catch (err) {
    console.error('Failed to add columns:', err.message);
  } finally {
    pool.end();
  }
}

addColumns();
