const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: process.env.DB_USER || 'neondb_owner',
    host: process.env.DB_HOST || 'ep-late-glade-b3q66mqf-pooler.c-4.ap-southeast-1.aws.neon.tech',
    database: 'neondb',
    password: process.env.DB_PASSWORD || 'npg_8sSgTamhfeK5',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    ssl: { rejectUnauthorized: false }
});

const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/my-erp-database/operations-database/operations-layer-buildings-database/scratch-layer-data.sql';
const content = fs.readFileSync(file, 'utf8');

const statements = [];
let current = '';
let inFunction = false;

for (const char of content) {
    current += char;
    if (char === '$' && !inFunction) {
        inFunction = true;
    } else if (char === '$' && inFunction) {
        inFunction = false;
    } else if (char === ';' && !inFunction) {
        if (current.trim()) {
            statements.push(current.trim());
        }
        current = '';
    }
}
if (current.trim()) {
    statements.push(current.trim());
}

async function run() {
    const client = await pool.connect();
    try {
        for (const sql of statements) {
            if (!sql) continue;
            await client.query(sql);
            console.log('Executed:', sql.split('\n')[0].substring(0, 80));
        }
        console.log('All statements executed successfully');
    } catch (err) {
        console.error('Error executing SQL:', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

run();
