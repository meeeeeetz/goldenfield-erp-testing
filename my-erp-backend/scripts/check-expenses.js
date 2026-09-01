const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function checkExpenses() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT expense_list_id, tracking_id, description FROM expenses ORDER BY expense_list_id');
        console.log(`Total expenses: ${result.rows.length}`);
        result.rows.forEach(row => {
            console.log(`${row.expense_list_id}: tracking_id=${row.tracking_id}, desc=${row.description ? row.description.substring(0, 50) : '-'}`);
        });

        const trackingCount = result.rows.filter(r => r.tracking_id).length;
        console.log(`\nExpenses with tracking_id: ${trackingCount}`);
        console.log(`Expenses without tracking_id: ${result.rows.length - trackingCount}`);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkExpenses();
