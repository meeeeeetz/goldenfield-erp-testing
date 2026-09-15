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
    const cols = await client.query("SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'petty_cash' ORDER BY ordinal_position");
    console.log('COLUMNS:');
    cols.rows.forEach(r => console.log(' ', r.column_name, r.data_type, r.is_nullable));

    const idx = await client.query("SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'petty_cash'");
    console.log('\nINDEXES:');
    idx.rows.forEach(r => console.log(' ', r.indexname, '-', r.indexdef));

    const constraints = await client.query(`
      SELECT con.conname, pg_get_constraintdef(con.oid, true) as def
      FROM pg_constraint con
      JOIN pg_class cls ON con.conrelid = cls.oid
      WHERE cls.relname = 'petty_cash'
    `);
    console.log('\nCONSTRAINTS:');
    constraints.rows.forEach(r => console.log(' ', r.conname, '-', r.def));

    const sample = await client.query("SELECT petty_cash_code, id FROM petty_cash ORDER BY petty_cash_code DESC LIMIT 5");
    console.log('\nSAMPLE CODES:');
    sample.rows.forEach(r => console.log(' ', r.petty_cash_code, 'id=', r.id));
  } catch (e) {
    console.error('ERROR:', e.message);
  } finally {
    await client.end();
  }
})();