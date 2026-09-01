const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function checkAndDelete() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const checkResult = await client.query('SELECT order_id, receipt_path, feed_type_id, supplier_id FROM order_feeds WHERE order_id IN ($1, $2, $3, $4)', ['OrFeID-12', 'OrFeID-13', 'OrFeID-14', 'OrFeID-15']);
        console.log('Found records:', checkResult.rows.length);
        checkResult.rows.forEach(row => {
            console.log(`  ${row.order_id}: receipt_path=${row.receipt_path}, feed_type_id=${row.feed_type_id}, supplier_id=${row.supplier_id}`);
        });

        await client.query('DELETE FROM order_feeds WHERE order_id IN ($1, $2, $3, $4)', ['OrFeID-12', 'OrFeID-13', 'OrFeID-14', 'OrFeID-15']);
        console.log('Deleted OrFeID-12 to OrFeID-15');

        await client.query('COMMIT');
        console.log('Transaction committed');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkAndDelete();
