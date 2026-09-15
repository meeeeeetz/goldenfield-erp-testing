const pool = require('../../config/database');
const ExpenseController = require('../../Controllers/main-finance-controller/expense-controller');

class PettyCashController {
    constructor(dbConnection) {
        this.db = dbConnection;
        this.expenseController = new ExpenseController(dbConnection);
    }

    async getAllPettyCashTransactions() {
        const query = 'SELECT * FROM petty_cash ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getPettyCashTransactionById(pettyCashCode) {
        const query = 'SELECT * FROM petty_cash WHERE petty_cash_code = $1';
        const result = await this.db.query(query, [pettyCashCode]);
        return result.rows[0];
    }

    async addReplenishTransaction(replenishData) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            await client.query("SELECT pg_advisory_xact_lock(2001)");

            const { date, source, replenish_amount, check_number, status } = replenishData;
            const nextId = await this._getNextPettyCashIdClient(client);
            const petty_cash_code = `PeCID-${nextId}`;
            const query = `
                INSERT INTO petty_cash 
                (date, pettycashcategory, item, source, replenish_amount, check_number, status, petty_cash_code) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            `;
            const result = await client.query(query, [
                date,
                'Replenishment',
                'Petty Cash Replenishment',
                source || null,
                replenish_amount || 0,
                check_number || null,
                status || 'Pending',
                petty_cash_code
            ]);

            const savedTransaction = result.rows[0];

            const expenseListId = await this._getNextExpenseIdClient(client);
            await this._addExpenseClient(client, {
                expense_list_id: expenseListId,
                tracking_id: petty_cash_code,
                date: date,
                accounting_code: null,
                expense_type: null,
                description: `Withdraw petty cash form ${source || 'Unknown Source'}`,
                remarks: null,
                total_amount: parseFloat(replenish_amount || 0),
                account_source: source || null,
                cleared_date: date,
                status: 'Pending'
            });

            await client.query('COMMIT');
            return savedTransaction;
        } catch (error) {
            try { await client.query('ROLLBACK'); } catch (e) {}
            throw error;
        } finally {
            client.release();
        }
    }

    async addPettyCashTransaction(transactionData) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            await client.query("SELECT pg_advisory_xact_lock(2001)");

            const { date, pettycashcategory, item, remarks, store, amount, status, replenish_amount } = transactionData;
            const nextId = await this._getNextPettyCashIdClient(client);
            const petty_cash_code = `PeCID-${nextId}`;
            const query = `
                INSERT INTO petty_cash 
                (date, pettycashcategory, item, remarks, store, amount, status, petty_cash_code, replenish_amount) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING *
            `;
            const result = await client.query(query, [
                date,
                pettycashcategory,
                item,
                remarks,
                store,
                amount,
                status || 'Pending',
                petty_cash_code,
                replenish_amount || 0
            ]);
            const savedTransaction = result.rows[0];

            const expenseListId = await this._getNextExpenseIdClient(client);
            await this._addExpenseClient(client, {
                expense_list_id: expenseListId,
                tracking_id: petty_cash_code,
                date: date,
                accounting_code: null,
                expense_type: pettycashcategory,
                description: item + ' bought at ' + (store || 'Unknown Store'),
                remarks: remarks || '',
                total_amount: parseFloat(amount || 0),
                account_source: null,
                cleared_date: null,
                status: status || 'Pending'
            });

            await client.query('COMMIT');
            return savedTransaction;
        } catch (error) {
            try { await client.query('ROLLBACK'); } catch (e) {}
            throw error;
        } finally {
            client.release();
        }
    }

    async _getNextPettyCashIdClient(client) {
        const query = "SELECT MAX(CAST(SUBSTRING(petty_cash_code FROM '\\d+') AS INTEGER)) as max_num FROM petty_cash";
        const result = await client.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return maxNum + 1;
    }

    async _getNextExpenseIdClient(client) {
        const query = "SELECT MAX(CAST(SUBSTRING(expense_list_id FROM '[0-9]+') AS INTEGER)) as max_num FROM expenses";
        const result = await client.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'ExLiID-' + (maxNum + 1);
    }

    async _addExpenseClient(client, expenseData) {
        const { expense_list_id, tracking_id, date, accounting_code, expense_type, description, remarks, total_amount, account_source, cleared_date, status } = expenseData;
        const query = `
            INSERT INTO expenses 
            (expense_list_id, tracking_id, date, accounting_code, expense_type, description, remarks, total_amount, account_source, cleared_date, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;
        const result = await client.query(query, [
            expense_list_id,
            tracking_id || null,
            date,
            accounting_code,
            expense_type,
            description,
            remarks,
            total_amount,
            account_source,
            cleared_date,
            status
        ]);
        return result.rows[0];
    }

    async updatePettyCashTransaction(pettyCashCode, transactionData) {
        const { date, pettycashcategory, item, remarks, store, amount, status } = transactionData;

        const updates = [];
        const values = [];
        let counter = 1;

        if (date !== undefined) { updates.push(`date = $${counter++}`); values.push(date); }
        if (pettycashcategory !== undefined) { updates.push(`pettycashcategory = $${counter++}`); values.push(pettycashcategory); }
        if (item !== undefined) { updates.push(`item = $${counter++}`); values.push(item); }
        if (remarks !== undefined) { updates.push(`remarks = $${counter++}`); values.push(remarks); }
        if (store !== undefined) { updates.push(`store = $${counter++}`); values.push(store); }
        if (amount !== undefined) { updates.push(`amount = $${counter++}`); values.push(amount); }
        if (status !== undefined) { updates.push(`status = $${counter++}`); values.push(status); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(pettyCashCode);

        const query = `
            UPDATE petty_cash 
            SET ${updates.join(', ')}
            WHERE petty_cash_code = $${counter}
            RETURNING *
        `;
        
        const result = await this.db.query(query, values);
        const updated = result.rows[0];

        if (updated && status === 'Rejected') {
            try {
                const existingExpenses = await this.expenseController.getExpenseByTrackingId(pettyCashCode);
                if (existingExpenses.length > 0) {
                    const expense = existingExpenses[0];
                    await this.expenseController.updateExpense(expense.id, {
                        remarks: `Rejected by system`,
                        total_amount: 0,
                        account_source: null,
                        cleared_date: null,
                        status: 'Rejected'
                    });
                }
            } catch (expenseError) {
                console.error('Failed to update rejection expense:', expenseError);
            }
        }

        if (updated && status === 'Approved') {
            try {
                const existingExpenses = await this.expenseController.getExpenseByTrackingId(pettyCashCode);
                if (existingExpenses.length > 0) {
                    const expense = existingExpenses[0];
                    const expenseStatus = updated.pettycashcategory === 'Replenishment' ? 'Cleared' : 'Cleared on Petty Cash';
                    await this.expenseController.updateExpense(expense.id, {
                        status: expenseStatus
                    });
                }
            } catch (expenseError) {
                console.error('Failed to update approval expense:', expenseError);
            }
        }

        return updated;
    }

    async deletePettyCashTransaction(pettyCashCode) {
        const query = 'DELETE FROM petty_cash WHERE petty_cash_code = $1';
        const result = await this.db.query(query, [pettyCashCode]);
        return result.rowCount > 0;
    }

    async getNextPettyCashId() {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            await client.query("SELECT pg_advisory_lock(1001)");
            const query = "SELECT MAX(CAST(SUBSTRING(petty_cash_code FROM '\\d+') AS INTEGER)) as max_num FROM petty_cash";
            const result = await client.query(query);
            const maxNum = result.rows[0]?.max_num || 0;
            await client.query("SELECT pg_advisory_unlock(1001)");
            await client.query('COMMIT');
            return maxNum + 1;
        } catch (error) {
            try { await client.query('ROLLBACK'); } catch (e) {}
            console.error('Error getting next petty cash ID:', error);
            return 1;
        } finally {
            client.release();
        }
    }

    async getPettyCashTransactionsByStatus(status) {
        const query = 'SELECT * FROM petty_cash WHERE status = $1 ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query, [status]);
        return result.rows;
    }

    async getPettyCashStats() {
        const availableResult = await this.db.query(`
            SELECT 
                COALESCE(SUM(replenish_amount), 0) - COALESCE(SUM(amount), 0) as available
            FROM petty_cash
            WHERE status != 'Rejected'
        `);
        const available = Number(availableResult.rows[0]?.available || 0);

        const currentMonthStart = new Date();
        currentMonthStart.setDate(1);
        currentMonthStart.setHours(0, 0, 0, 0);
        const monthStartStr = currentMonthStart.toISOString().split('T')[0];

        const monthlyExpenseResult = await this.db.query(`
            SELECT COALESCE(SUM(amount), 0) as monthly_expense
            FROM petty_cash
            WHERE date >= $1 AND pettycashcategory != 'Replenishment' AND status != 'Rejected'
        `, [monthStartStr]);
        const monthlyExpense = Number(monthlyExpenseResult.rows[0]?.monthly_expense || 0);

        const monthlyReplenishResult = await this.db.query(`
            SELECT COUNT(*) as monthly_replenish
            FROM petty_cash
            WHERE date >= $1 AND pettycashcategory = 'Replenishment' AND status != 'Rejected'
        `, [monthStartStr]);
        const monthlyReplenish = Number(monthlyReplenishResult.rows[0]?.monthly_replenish || 0);

        return {
            available,
            monthly_expense: monthlyExpense,
            monthly_replenish: monthlyReplenish
        };
    }
}

module.exports = PettyCashController;
