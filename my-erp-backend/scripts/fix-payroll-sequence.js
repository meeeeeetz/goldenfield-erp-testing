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

async function fixPayrollSequence() {
    try {
        await pool.query('BEGIN');

        const seqExistsQuery = `
            SELECT EXISTS (
                SELECT FROM pg_class 
                WHERE relname = 'payroll_seq'
            ) AS sequence_exists;
        `;
        const seqResult = await pool.query(seqExistsQuery);
        const seqExists = seqResult.rows[0].sequence_exists;

        if (!seqExists) {
            await pool.query(`CREATE SEQUENCE payroll_seq START 1`);
            console.log('Created payroll_seq sequence');
        } else {
            console.log('payroll_seq sequence already exists');
        }

        const maxQuery = `SELECT MAX(CAST(SUBSTRING(payroll_id FROM 9) AS INTEGER)) AS max_num FROM payroll`;
        const maxResult = await pool.query(maxQuery);
        const maxNum = maxResult.rows[0].max_num || 0;
        console.log('Max payroll_id numeric:', maxNum);

        await pool.query(`SELECT setval('payroll_seq', $1, true)`, [maxNum]);
        console.log(`Set payroll_seq to ${maxNum} (next value will be ${maxNum + 1})`);

        await pool.query('COMMIT');
        console.log('\nFix completed successfully');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Fix error:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

fixPayrollSequence();
