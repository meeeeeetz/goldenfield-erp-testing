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

async function fixOvertimeLogSequence() {
    try {
        await pool.query('BEGIN');

        const seqExistsQuery = `
            SELECT EXISTS (
                SELECT FROM pg_class 
                WHERE relname = 'overtime_log_seq'
            ) AS sequence_exists;
        `;
        const seqResult = await pool.query(seqExistsQuery);
        const seqExists = seqResult.rows[0].sequence_exists;

        if (!seqExists) {
            await pool.query(`CREATE SEQUENCE overtime_log_seq START 1`);
            console.log('Created overtime_log_seq sequence');
        } else {
            console.log('overtime_log_seq sequence already exists');
        }

        const maxQuery = `SELECT MAX(CAST(SUBSTRING(overtime_id FROM 7) AS INTEGER)) AS max_num FROM overtime_log`;
        const maxResult = await pool.query(maxQuery);
        const maxNum = maxResult.rows[0].max_num || 0;
        console.log('Max overtime_id numeric:', maxNum);

        await pool.query(`SELECT setval('overtime_log_seq', $1, true)`, [maxNum]);
        console.log(`Set overtime_log_seq to ${maxNum} (next value will be ${maxNum + 1})`);

        const funcExistsQuery = `
            SELECT EXISTS (
                SELECT FROM pg_proc 
                WHERE proname = 'generate_overtime_id'
            ) AS func_exists;
        `;
        const funcResult = await pool.query(funcExistsQuery);
        const funcExists = funcResult.rows[0].func_exists;

        if (!funcExists) {
            await pool.query(`
                CREATE OR REPLACE FUNCTION generate_overtime_id()
                RETURNS TEXT AS $$
                DECLARE
                    next_num INTEGER;
                    new_id TEXT;
                BEGIN
                    SELECT nextval('overtime_log_seq') INTO next_num;
                    new_id := 'OTLog-' || LPAD(next_num::TEXT, 9, '0');
                    RETURN new_id;
                END;
                $$ LANGUAGE plpgsql;
            `);
            console.log('Created generate_overtime_id() function');
        } else {
            console.log('generate_overtime_id() function already exists');
        }

        const triggerExistsQuery = `
            SELECT EXISTS (
                SELECT FROM pg_trigger 
                WHERE tgname = 'trigger_set_overtime_id'
            ) AS trigger_exists;
        `;
        const triggerResult = await pool.query(triggerExistsQuery);
        const triggerExists = triggerResult.rows[0].trigger_exists;

        if (!triggerExists) {
            await pool.query(`
                CREATE OR REPLACE FUNCTION set_overtime_id()
                RETURNS TRIGGER AS $$
                BEGIN
                    IF NEW.overtime_id IS NULL THEN
                        NEW.overtime_id := generate_overtime_id();
                    END IF;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;

                CREATE TRIGGER trigger_set_overtime_id
                    BEFORE INSERT ON overtime_log
                    FOR EACH ROW
                    EXECUTE FUNCTION set_overtime_id();
            `);
            console.log('Created set_overtime_id() trigger');
        } else {
            console.log('trigger_set_overtime_id trigger already exists');
        }

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

fixOvertimeLogSequence();
