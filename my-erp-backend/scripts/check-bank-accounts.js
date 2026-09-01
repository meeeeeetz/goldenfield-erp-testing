const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function checkBankAccounts() {
    const client = await pool.connect();
    try {
        const banksResult = await client.query('SELECT * FROM bank_accounts ORDER BY bank');
        console.log('Bank accounts table:');
        console.log(banksResult.rows);

        const ordersResult = await client.query(`
            SELECT o.order_id, o.payment_source, b.bank, b.bank_account_number, b.bank_code
            FROM order_feeds o
            LEFT JOIN bank_accounts b ON o.payment_source = b.bank
            ORDER BY o.order_id
        `);
        console.log('\nOrders with bank info:');
        ordersResult.rows.forEach(row => {
            console.log(`${row.order_id}: payment_source=${row.payment_source}, bank=${row.bank}, account=${row.bank_account_number}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkBankAccounts();
