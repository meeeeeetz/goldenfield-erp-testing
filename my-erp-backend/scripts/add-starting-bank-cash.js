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

async function addStartingBankCashColumn() {
    try {
        await pool.query('BEGIN');
        
        const checkColumn = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'bank_accounts' AND column_name = 'starting_bank_cash'
        `);
        
        if (checkColumn.rows.length === 0) {
            await pool.query('ALTER TABLE bank_accounts ADD COLUMN starting_bank_cash DECIMAL(15, 2) DEFAULT 0');
            console.log('Column starting_bank_cash added successfully.');
        } else {
            console.log('Column starting_bank_cash already exists.');
        }
        
        const updates = [
            { id: 'BnkAc-001', value: 100564.15 },
            { id: 'BnkAc-002', value: 0 },
            { id: 'BnkAc-003', value: 98401.06 },
            { id: 'BnkAc-004', value: 0 }
        ];
        
        for (const update of updates) {
            const result = await pool.query(
                'UPDATE bank_accounts SET starting_bank_cash = $1, updated_at = CURRENT_TIMESTAMP WHERE bank_account_id = $2',
                [update.value, update.id]
            );
            if (result.rowCount > 0) {
                console.log(`Updated ${update.id} with starting_bank_cash = ${update.value}`);
            } else {
                console.log(`Warning: ${update.id} not found in database`);
            }
        }
        
        await pool.query('COMMIT');
        console.log('Starting bank cash migration completed successfully.');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Migration error:', error.message);
    } finally {
        await pool.end();
    }
}

addStartingBankCashColumn();
