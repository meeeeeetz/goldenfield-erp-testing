const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function fixRemaining() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Fix expenses tracking_id - map old refs to new
    const expenseMapping = {
      '29': '11',  // BtPaRol-29 -> BtPaRol-11
      '31': '12',  // BtPaRol-31 -> BtPaRol-12
      '33': '13',  // BtPaRol-33 -> BtPaRol-13
      '35': '14',  // BtPaRol-35 -> BtPaRol-14
    };

    for (const [oldNum, newNum] of Object.entries(expenseMapping)) {
      await client.query(
        "UPDATE expenses SET tracking_id = $1 WHERE tracking_id = $2",
        ['BtPaRol-' + newNum, 'BtPaRol-' + oldNum]
      );
    }

    // Fix batch_payroll_items with null batch_payroll_id (were from old BtPaRol-37, now 15)
    await client.query(
      "UPDATE batch_payroll_items SET batch_payroll_id = 15 WHERE batch_payroll_id IS NULL"
    );

    // Also check if there are items with batch_payroll_id that don't exist in batch_payroll
    const invalidItems = await client.query(`
      SELECT bi.* FROM batch_payroll_items bi
      LEFT JOIN batch_payroll bp ON bi.batch_payroll_id = bp.batch_payroll_id
      WHERE bp.batch_payroll_id IS NULL
    `);
    console.log('Invalid items (no matching batch):', invalidItems.rows.length);

    await client.query('COMMIT');
    console.log('Fix complete!');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error:', e);
  } finally {
    client.release();
    pool.end();
  }
}

fixRemaining();