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

async function migrateElectricBillsToExpenses() {
    try {
        await pool.query('BEGIN');
        
        const billsResult = await pool.query('SELECT * FROM electric_bills ORDER BY electric_bill_id');
        console.log(`Found ${billsResult.rows.length} electric bills to migrate.`);
        
        let migrated = 0;
        let skipped = 0;
        
        for (const bill of billsResult.rows) {
            const existingExpense = await pool.query('SELECT id FROM expenses WHERE electric_bill_id = $1', [bill.electric_bill_id]);
            if (existingExpense.rows.length > 0) {
                console.log(`  Skipping ${bill.electric_bill_id} - already exists in expenses`);
                skipped++;
                continue;
            }
            
            const expenseListId = await getNextExpenseId(pool);
            
            const description = `Electric Bill from ${formatDate(bill.billing_start)} to ${formatDate(bill.billing_end)}`;
            const remarks = `Total KWH used ${bill.kwh || 0} at ${bill.rate_per_kwh || 0}`;
            
            await pool.query(
                `INSERT INTO expenses 
                (expense_list_id, electric_bill_id, date, accounting_code, expense_type, description, remarks, total_amount, account_source, cleared_date, status) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                [
                    expenseListId,
                    bill.electric_bill_id,
                    bill.date,
                    '5130',
                    'Direct Utilities & Energy',
                    description,
                    remarks,
                    bill.amount,
                    bill.payment_source,
                    bill.payment_date,
                    'Pending'
                ]
            );
            
            console.log(`  Migrated ${bill.electric_bill_id} -> ${expenseListId}`);
            migrated++;
        }
        
        await pool.query('COMMIT');
        console.log(`\nMigration completed: ${migrated} migrated, ${skipped} skipped.`);
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Migration error:', error.message);
    } finally {
        await pool.end();
    }
}

async function getNextExpenseId(pool) {
    const result = await pool.query("SELECT MAX(CAST(SUBSTRING(expense_list_id FROM '\\d+') AS INTEGER)) as max_num FROM expenses");
    const maxNum = result.rows[0]?.max_num || 0;
    return 'ExLiID-' + (maxNum + 1);
}

function formatDate(dateValue) {
    if (!dateValue) return 'unknown date';
    const d = new Date(dateValue);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

migrateElectricBillsToExpenses();
