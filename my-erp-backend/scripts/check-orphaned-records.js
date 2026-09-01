const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function checkOrphanedRecords() {
    const client = await pool.connect();
    try {
        const orphanedExpenses = await client.query(`
            SELECT COUNT(*) as count FROM expenses 
            WHERE tracking_id LIKE 'OrFeID-%' 
            AND tracking_id NOT IN (SELECT order_id FROM order_feeds)
        `);

        const orphanedInventory = await client.query(`
            SELECT COUNT(*) as count FROM feed_inventory 
            WHERE building_tracking_receipt LIKE 'OF-%'
            AND building_tracking_receipt NOT IN (SELECT 'OF-' || order_id FROM order_feeds)
        `);

        console.log('Orphaned records:');
        console.log(`  expenses with deleted order refs: ${orphanedExpenses.rows[0].count}`);
        console.log(`  feed_inventory with deleted order refs: ${orphanedInventory.rows[0].count}`);

        if (orphanedExpenses.rows[0].count > 0) {
            console.log('\nDeleting orphaned expenses...');
            await client.query(`
                DELETE FROM expenses 
                WHERE tracking_id LIKE 'OrFeID-%' 
                AND tracking_id NOT IN (SELECT order_id FROM order_feeds)
            `);
            console.log('Deleted orphaned expenses');
        }

        if (orphanedInventory.rows[0].count > 0) {
            console.log('\nDeleting orphaned feed_inventory records...');
            await client.query(`
                DELETE FROM feed_inventory 
                WHERE building_tracking_receipt LIKE 'OF-%'
                AND building_tracking_receipt NOT IN (SELECT 'OF-' || order_id FROM order_feeds)
            `);
            console.log('Deleted orphaned feed_inventory records');
        }

        if (orphanedExpenses.rows[0].count === 0 && orphanedInventory.rows[0].count === 0) {
            console.log('\nNo orphaned records found - database is clean');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkOrphanedRecords();
