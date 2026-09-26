const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function fixMigration() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // First, fix the null PK row - assign it ID 15
    await client.query("UPDATE batch_payroll SET batch_payroll_id = 15, batch_reference = 'BtPaRol-15' WHERE batch_payroll_id IS NULL");

    // Verify all rows now have proper IDs
    const batches = await client.query('SELECT batch_payroll_id, batch_reference FROM batch_payroll ORDER BY batch_payroll_id');
    console.log('Fixed batches:', batches.rows);

    // Now fix batch_payroll_items - they still have old batch_payroll_id values
    // Need to map old -> new for items
    const mapping = {
      '12': 1, '13': 2, '15': 3, '16': 4, '17': 5, '18': 6, '19': 7,
      '24': 8, '26': 9, '28': 10, '30': 11, '32': 12, '34': 13, '36': 14, '37': 15
    };

    for (const [oldId, newId] of Object.entries(mapping)) {
      await client.query(
        'UPDATE batch_payroll_items SET batch_payroll_id = $1 WHERE batch_payroll_id = $2',
        [newId, oldId]
      );
    }

    // Fix expenses tracking_id
    const expenseResult = await client.query("SELECT expense_list_id, tracking_id FROM expenses WHERE tracking_id LIKE 'BtPaRol-%'");
    for (const row of expenseResult.rows) {
      const oldRef = row.tracking_id;
      const oldNum = parseInt(oldRef.replace('BtPaRol-', ''));
      const newNum = mapping[oldNum];
      if (newNum) {
        const newRef = 'BtPaRol-' + newNum;
        await client.query('UPDATE expenses SET tracking_id = $1 WHERE expense_list_id = $2', [newRef, row.expense_list_id]);
      }
    }

    // Reset sequence to 16
    await client.query("SELECT setval('batch_payroll_seq', 16)");

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

fixMigration();