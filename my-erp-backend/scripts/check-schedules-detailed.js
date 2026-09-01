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

async function checkSchedules() {
    try {
        const result = await pool.query(`
            SELECT schedule_id, employee_id, org_unit, schedule_date, half_month, status 
            FROM employee_schedule 
            WHERE org_unit = 'Fish Pond' 
            AND schedule_date >= '2026-08-01' 
            AND schedule_date <= '2026-08-31'
            ORDER BY schedule_date, employee_id
        `);
        console.log('Fish Pond schedules for August 2026:');
        console.log('Count:', result.rows.length);
        result.rows.forEach(row => {
            console.log(`${row.schedule_id} | ${row.employee_id} | ${row.schedule_date} | ${row.status}`);
        });

        const allResult = await pool.query(`
            SELECT schedule_id, employee_id, org_unit, schedule_date, half_month, status 
            FROM employee_schedule 
            WHERE schedule_date >= '2026-08-01' 
            AND schedule_date <= '2026-08-31'
            ORDER BY schedule_date, org_unit, employee_id
        `);
        console.log('\nAll schedules for August 2026:');
        console.log('Total count:', allResult.rows.length);
        allResult.rows.forEach(row => {
            console.log(`${row.org_unit} | ${row.schedule_id} | ${row.employee_id} | ${row.schedule_date} | ${row.status}`);
        });
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

checkSchedules();
