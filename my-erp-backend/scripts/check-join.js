const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function checkJoin() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT o.order_id, o.payment_source, b.bank, b.bank_code, b.bank_account_number
            FROM order_feeds o
            LEFT JOIN bank_accounts b ON o.payment_source = b.bank_code
            ORDER BY o.order_id
        `);
        console.log('Orders with bank info (fixed JOIN):');
        result.rows.forEach(row => {
            console.log(`${row.order_id}: payment_source=${row.payment_source}, bank_code=${row.bank_code}, account=${row.bank_account_number}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkJoin();
