const { Pool } = require('pg');

const pool = new Pool({
    user: 'neondb_owner',
    host: 'ep-late-glade-b3q66mqf-pooler.c-4.ap-southeast-1.aws.neon.tech',
    database: 'neondb',
    password: 'npg_8sSgTamhfeK5',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

function parseRowData(raw) {
    if (Array.isArray(raw)) return raw;
    if (typeof raw !== 'string') return [];
    const trimmed = raw.trim();
    if (trimmed === '[]' || trimmed === '') return [];
    try {
        let parsed = JSON.parse(trimmed);
        while (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
        }
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

async function fix() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT id, name, row_data, length(row_data) as data_len FROM scratch_layer_data');
        console.log(`Found ${res.rows.length} rows to check`);
        for (const row of res.rows) {
            console.log(`ID ${row.id}: "${row.name}" - length: ${row.data_len} - type: ${typeof row.row_data}`);
            const parsed = parseRowData(row.row_data);
            console.log(`  -> Parsed: ${parsed.length} rows`);
            if (parsed.length > 0) {
                await client.query('UPDATE scratch_layer_data SET row_data = $1 WHERE id = $2', [JSON.stringify(parsed), row.id]);
                console.log(`  -> Fixed! Saved ${parsed.length} rows`);
            } else {
                console.log(`  -> Skipped (empty or unparsable)`);
            }
        }
        console.log('Done');
    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

fix();
