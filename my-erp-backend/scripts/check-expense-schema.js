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
        const result = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'expenses' ORDER BY ordinal_position");
        console.log('Expenses table columns:');
        result.rows.forEach(row => console.log(`  ${row.column_name}: ${row.data_type}`));
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkSchema();
