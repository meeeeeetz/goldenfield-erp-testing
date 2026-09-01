const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_8sSgTamhfeK5@ep-late-glade-b3q66mqf-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

async function test() {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = \'public\'');
        console.log('Tables in database:', result.rows[0].count);
        
        const tables = await pool.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\' ORDER BY table_name');
        console.log('\nTable list:');
        tables.rows.forEach(row => console.log(' -', row.table_name));
        
        pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        pool.end();
    }
}

test();
