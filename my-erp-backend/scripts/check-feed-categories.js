const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function checkFeedTypes() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT feed_type_id, feed_type, category FROM feed_types ORDER BY feed_type_id');
        console.log('Feed types and categories:');
        result.rows.forEach(row => {
            console.log(`  ${row.feed_type_id}: ${row.feed_type} → ${row.category}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkFeedTypes();
