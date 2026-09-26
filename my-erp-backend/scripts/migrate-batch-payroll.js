const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Get current batches ordered by batch_payroll_id
    const batches = await client.query('SELECT batch_payroll_id, batch_reference FROM batch_payroll ORDER BY batch_payroll_id');
    console.log('Current batches:', batches.rows);

    // 2. Create mapping old_id -> new_id (1..N)
    const mapping = {};
    batches.rows.forEach((row, idx) => {
      mapping[row.batch_payroll_id] = idx + 1;
    });
    console.log('Mapping:', mapping);

    // 3. Update batch_payroll: set new PK, new reference, new batch_id
    for (const [oldId, newId] of Object.entries(mapping)) {
      const newRef = 'BtPaRol-' + newId;
      await client.query(
        'UPDATE batch_payroll SET batch_payroll_id = $1, batch_reference = $2, batch_id = $3 WHERE batch_payroll_id = $4',
        [newId, newRef, newRef, oldId]
      );
    }

    // 4. Update batch_payroll_items
    for (const [oldId, newId] of Object.entries(mapping)) {
      await client.query(
        'UPDATE batch_payroll_items SET batch_payroll_id = $1, batch_id = $2 WHERE batch_payroll_id = $3',
        [newId, 'BtPaRol-' + newId, oldId]
      );
    }

    // 5. Update expenses tracking_id
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

    // 6. Drop batch_id column from batch_payroll
    await client.query('ALTER TABLE batch_payroll DROP COLUMN IF EXISTS batch_id');

    // 7. Drop batch_id column from batch_payroll_items
    await client.query('ALTER TABLE batch_payroll_items DROP COLUMN IF EXISTS batch_id');

    // 8. Reset sequence
    const maxId = batches.rows.length;
    await client.query('SELECT setval($1, $2)', ['batch_payroll_seq', maxId + 1]);

    await client.query('COMMIT');
    console.log('Migration complete!');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error:', e);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();