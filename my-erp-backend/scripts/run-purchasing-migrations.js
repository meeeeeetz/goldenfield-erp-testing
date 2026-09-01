const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function runMigration() {
    const sqlFiles = [
        path.join(__dirname, '..', '..', 'my-erp-database', 'purchasing-database', 'feeds-suppliers.sql'),
        path.join(__dirname, '..', '..', 'my-erp-database', 'purchasing-database', 'feed-types.sql'),
        path.join(__dirname, '..', '..', 'my-erp-database', 'purchasing-database', 'order-feeds.sql')
    ];

    for (const sqlFile of sqlFiles) {
        const sql = fs.readFileSync(sqlFile, 'utf8');
        try {
            await pool.query(sql);
            console.log(`Migration completed: ${path.basename(sqlFile)}`);
        } catch (error) {
            console.error(`Migration error in ${path.basename(sqlFile)}:`, error.message);
        }
    }

    await pool.end();
}

runMigration();
