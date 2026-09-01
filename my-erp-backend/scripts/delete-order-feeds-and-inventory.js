const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function deleteData() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const orderCount = await client.query('SELECT COUNT(*) FROM order_feeds');
        const inventoryCount = await client.query('SELECT COUNT(*) FROM feed_inventory');

        console.log('Before deletion:');
        console.log(`  order_feeds: ${orderCount.rows[0].count} records`);
        console.log(`  feed_inventory: ${inventoryCount.rows[0].count} records`);

        await client.query('DELETE FROM feed_inventory');
        console.log('Deleted all records from feed_inventory');

        await client.query('DELETE FROM order_feeds');
        console.log('Deleted all records from order_feeds');

        await client.query('COMMIT');
        console.log('Done. Both tables are now empty.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

deleteData();
