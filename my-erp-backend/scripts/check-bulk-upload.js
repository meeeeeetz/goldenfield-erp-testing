const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function checkBulkUpload() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT order_id, receipt_path, feed_type_id, sales_invoice, total_price FROM order_feeds WHERE order_id >= \'OrFeID-1\' ORDER BY order_id');
        console.log(`Total orders: ${result.rows.length}`);
        result.rows.forEach(row => {
            console.log(`${row.order_id}: receipt_path=${row.receipt_path}, feed_type_id=${row.feed_type_id}, invoice=${row.sales_invoice}, total=${row.total_price}`);
        });

        const withPath = result.rows.filter(r => r.receipt_path);
        const withoutPath = result.rows.filter(r => !r.receipt_path);
        console.log(`\nWith receipt_path: ${withPath.length}`);
        console.log(`Without receipt_path: ${withoutPath.length}`);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkBulkUpload();
