const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function deleteOrderFeedsData() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const repaymentCount = await client.query('SELECT COUNT(*) FROM order_feeds_repayment');
        const orderCount = await client.query('SELECT COUNT(*) FROM order_feeds');
        
        console.log(`Before deletion:`);
        console.log(`  order_feeds_repayment: ${repaymentCount.rows[0].count} records`);
        console.log(`  order_feeds: ${orderCount.rows[0].count} records`);

        await client.query('DELETE FROM order_feeds_repayment');
        console.log('Deleted all records from order_feeds_repayment');

        await client.query('DELETE FROM order_feeds');
        console.log('Deleted all records from order_feeds');

        await client.query("SELECT setval(pg_get_serial_sequence('order_feeds', 'id'), 1, false)");
        console.log('Reset order_feeds.id sequence');

        await client.query("SELECT MAX(CAST(SUBSTRING(order_id FROM '\\d+') AS INTEGER)) as max_num FROM order_feeds");
        
        await client.query('COMMIT');
        console.log('Transaction committed successfully');
        console.log('All order_feeds and order_feeds_repayment data has been deleted');
        console.log('Order IDs will start fresh from OrFeID-1');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

deleteOrderFeedsData();
