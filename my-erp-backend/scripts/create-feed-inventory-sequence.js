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

async function createSequence() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sequenceExists = await client.query(`
            SELECT sequence_name FROM information_schema.sequences
            WHERE sequence_name = 'feed_inventory_feed_use_id_seq'
        `);

        if (sequenceExists.rows.length === 0) {
            await client.query('CREATE SEQUENCE feed_inventory_feed_use_id_seq START 1');
            console.log('Created feed_inventory_feed_use_id_seq');
        } else {
            console.log('Sequence already exists');
        }

        await client.query('COMMIT');
        console.log('Sequence creation completed');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Failed:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

createSequence();
