const { Client } = require('pg');

const client = new Client({
  host: 'ep-late-glade-b3q66mqf-pooler.c-4.ap-southeast-1.aws.neon.tech',
  port: 5432,
  user: 'neondb_owner',
  password: 'npg_8sSgTamhfeK5',
  database: 'neondb',
  ssl: { rejectUnauthorized: false }
});

(async () => {
  try {
    await client.connect();

    const check = await client.query("SELECT id, expense_list_id, tracking_id, status FROM expenses WHERE tracking_id IN ('PeCID-3643', 'PeCID-3642') ORDER BY tracking_id");
    console.log('CHECK PeCID-3643/3642:');
    check.rows.forEach(r => console.log(' ', r.expense_list_id, r.tracking_id, r.status));

    const max = await client.query("SELECT MAX(CAST(SUBSTRING(tracking_id FROM '[0-9]+') AS INTEGER)) as max_num FROM expenses WHERE tracking_id LIKE 'PeCID-%'");
    console.log('\nMax PeCID in expenses:', max.rows[0].max_num);

    const maxPetty = await client.query("SELECT MAX(CAST(SUBSTRING(petty_cash_code FROM '[0-9]+') AS INTEGER)) as max_num FROM petty_cash");
    console.log('Max PeCID in petty_cash:', maxPetty.rows[0].max_num);

    const sample = await client.query("SELECT tracking_id, status FROM expenses WHERE tracking_id LIKE 'PeCID-%' ORDER BY tracking_id DESC LIMIT 10");
    console.log('\nSAMPLE tracking_ids in expenses:');
    sample.rows.forEach(r => console.log(' ', r.tracking_id, r.status));
  } catch (e) {
    console.error('ERROR:', e.message);
  } finally {
    await client.end();
  }
})();