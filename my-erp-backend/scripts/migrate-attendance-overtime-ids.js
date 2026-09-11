const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

async function migrateLogIds() {
    try {
        await pool.query('BEGIN');

        const attendanceResult = await pool.query(`
            SELECT attendance_id FROM attendance_log WHERE attendance_id LIKE 'AttLog-000000%'
        `);
        const attendanceRows = attendanceResult.rows;
        console.log(`Found ${attendanceRows.length} attendance log records to update`);

        for (const row of attendanceRows) {
            const oldId = row.attendance_id;
            const newId = 'AttLog-' + String(parseInt(oldId.replace('AttLog-', ''), 10));
            await pool.query('UPDATE attendance_log SET attendance_id = $1 WHERE attendance_id = $2', [newId, oldId]);
            console.log(`Updated attendance ${oldId} -> ${newId}`);
        }

        const overtimeResult = await pool.query(`
            SELECT overtime_id FROM overtime_log WHERE overtime_id LIKE 'OTLog-000000%'
        `);
        const overtimeRows = overtimeResult.rows;
        console.log(`\nFound ${overtimeRows.length} overtime log records to update`);

        for (const row of overtimeRows) {
            const oldId = row.overtime_id;
            const newId = 'OTLog-' + String(parseInt(oldId.replace('OTLog-', ''), 10));
            await pool.query('UPDATE overtime_log SET overtime_id = $1 WHERE overtime_id = $2', [newId, oldId]);
            console.log(`Updated overtime ${oldId} -> ${newId}`);
        }

        await pool.query('COMMIT');
        console.log('\nMigration completed successfully');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Migration error:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

migrateLogIds();
