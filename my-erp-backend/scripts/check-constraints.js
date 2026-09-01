const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'goldenfield_erp',
    password: 'Zillion',
    port: 5432,
});

async function checkConstraints() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT 
                tc.constraint_name, 
                tc.constraint_type, 
                kcu.column_name,
                ccu.table_name AS foreign_table_name,
                ccu.column_name AS foreign_column_name
            FROM information_schema.table_constraints AS tc
            LEFT JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
            LEFT JOIN information_schema.constraint_column_usage AS ccu
                ON ccu.constraint_name = tc.constraint_name
            WHERE tc.table_name = 'expenses'
        `);
        
        console.log('Constraints on expenses table:');
        result.rows.forEach(row => {
            console.log(`  ${row.constraint_type}: ${row.column_name} -> ${row.foreign_table_name}.${row.foreign_column_name}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkConstraints();
