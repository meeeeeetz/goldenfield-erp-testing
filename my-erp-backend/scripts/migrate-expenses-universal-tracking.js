const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function migrateExpenses() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const result = await client.query('SELECT id, expense_list_id, electric_bill_id FROM expenses WHERE electric_bill_id IS NOT NULL');
        console.log(`Found ${result.rows.length} expenses with electric_bill_id`);

        for (const row of result.rows) {
            await client.query('UPDATE expenses SET tracking_id = $1 WHERE id = $2', [row.electric_bill_id, row.id]);
            console.log(`  Updated ${row.expense_list_id}: tracking_id = ${row.electric_bill_id}`);
        }

        await client.query('ALTER TABLE expenses DROP CONSTRAINT IF EXISTS expenses_electric_bill_id_key');
        console.log('Dropped UNIQUE constraint on electric_bill_id');

        await client.query('ALTER TABLE expenses DROP COLUMN IF EXISTS electric_bill_id');
        console.log('Dropped electric_bill_id column');

        await client.query('ALTER TABLE expenses ADD CONSTRAINT tracking_id_unique UNIQUE (tracking_id)');
        console.log('Added UNIQUE constraint on tracking_id');

        await client.query('COMMIT');
        console.log('Migration completed successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

migrateExpenses();
