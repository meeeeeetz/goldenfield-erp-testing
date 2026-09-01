const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_8sSgTamhfeK5@ep-late-glade-b3q66mqf-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-tables-only.sql';
const content = fs.readFileSync(file, 'utf8');

async function run() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(content);
        await client.query('COMMIT');
        console.log('All tables created successfully!');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error:', err.message);
        console.error('Position:', err.position);
        if (err.position) {
            const start = Math.max(0, err.position - 100);
            const end = Math.min(content.length, err.position + 100);
            console.error('Context:', content.substring(start, end));
        }
    } finally {
        client.release();
        pool.end();
    }
}

run();
