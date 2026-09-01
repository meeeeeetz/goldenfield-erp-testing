const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function checkSchema() {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'feed_types' ORDER BY ordinal_position");
        console.log('feed_types columns:');
        result.rows.forEach(row => console.log(`  ${row.column_name}: ${row.data_type}`));

        const dataResult = await client.query('SELECT * FROM feed_types ORDER BY feed_type_id');
        console.log(`\nExisting feed types: ${dataResult.rows.length}`);
        dataResult.rows.forEach(row => console.log(`  ${row.feed_type_id}: ${row.feed_type}`));
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkSchema();
