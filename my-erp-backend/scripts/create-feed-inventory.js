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

async function createFeedInventoryTable() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const tableExists = await client.query(`
            SELECT table_name FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'feed_inventory'
        `);

        if (tableExists.rows.length === 0) {
            await client.query(`
                CREATE TABLE feed_inventory (
                    id SERIAL PRIMARY KEY,
                    feed_use_id VARCHAR(50) UNIQUE NOT NULL,
                    source_type VARCHAR(20) NOT NULL CHECK (source_type IN ('order', 'consumption')),
                    building_tracking_receipt VARCHAR(100) NOT NULL,
                    category VARCHAR(50) NOT NULL CHECK (category IN ('Pre-Lay', 'Layer 1', 'Layer 2')),
                    unit VARCHAR(20) DEFAULT 'Kilos',
                    quantity DECIMAL(10,2) NOT NULL CHECK (quantity > 0),
                    driver VARCHAR(100),
                    feed_time TIME,
                    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Delivered', 'Cancelled')),
                    created_by VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('Created feed_inventory table');
        } else {
            console.log('feed_inventory table already exists');
        }

        const viewExists = await client.query(`
            SELECT table_name FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'feed_inventory_summary'
        `);

        if (viewExists.rows.length === 0) {
            await client.query(`
                CREATE OR REPLACE VIEW feed_inventory_summary AS
                SELECT 
                    category,
                    SUM(CASE WHEN source_type = 'order' THEN quantity ELSE 0 END) as total_inputs,
                    SUM(CASE WHEN source_type = 'consumption' THEN quantity ELSE 0 END) as total_consumption,
                    SUM(CASE WHEN source_type = 'order' THEN quantity ELSE -quantity END) as remaining_stock
                FROM feed_inventory
                WHERE status != 'Cancelled'
                GROUP BY category
            `);
            console.log('Created feed_inventory_summary view');
        } else {
            console.log('feed_inventory_summary view already exists');
        }

        await client.query('UPDATE feed_types SET category = $1 WHERE feed_type_id = $2', ['Pre-Lay', 'FeTyID-1']);
        await client.query('UPDATE feed_types SET category = $1 WHERE feed_type_id = $2', ['Layer 1', 'FeTyID-2']);
        console.log('Updated feed type categories');

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

createFeedInventoryTable();
