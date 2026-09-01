const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: 'neondb_owner',
    host: 'ep-late-glade-b3q66mqf-pooler.c-4.ap-southeast-1.aws.neon.tech',
    database: 'neondb',
    password: 'npg_8sSgTamhfeK5',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
const content = fs.readFileSync(file, 'utf8');

// Split by semicolons but be careful with function bodies
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

console.log(`Found ${statements.length} statements`);

async function runStatements() {
    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i].trim();
        if (!stmt || stmt.startsWith('--')) continue;
        
        try {
            await pool.query(stmt);
        } catch (err) {
            console.error(`\nError at statement ${i}:`);
            console.error(stmt.substring(0, 200));
            console.error('\nError message:', err.message);
            pool.end();
            process.exit(1);
        }
    }
    console.log('All tables created successfully!');
    pool.end();
}

runStatements();
