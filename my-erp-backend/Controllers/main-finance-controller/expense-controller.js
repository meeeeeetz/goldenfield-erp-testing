const pool = require('../../config/database');

class ExpenseController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllExpenses() {
        const query = 'SELECT * FROM expenses ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getExpenseById(id) {
        const query = 'SELECT * FROM expenses WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getExpenseByCode(expenseListId) {
        const query = 'SELECT * FROM expenses WHERE expense_list_id = $1';
        const result = await this.db.query(query, [expenseListId]);
        return result.rows[0];
    }

    async getExpenseByTrackingId(trackingId) {
        const query = 'SELECT * FROM expenses WHERE tracking_id = $1';
        const result = await this.db.query(query, [trackingId]);
        return result.rows;
    }

    async addExpense(expenseData) {
        const { expense_list_id, tracking_id, date, accounting_code, expense_type, description, remarks, total_amount, account_source, cleared_date, status } = expenseData;
        const query = `
            INSERT INTO expenses 
            (expense_list_id, tracking_id, date, accounting_code, expense_type, description, remarks, total_amount, account_source, cleared_date, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;
        const result = await this.db.query(query, [
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

    async updateExpense(id, expenseData) {
        const { expense_list_id, tracking_id, date, accounting_code, expense_type, description, remarks, total_amount, account_source, cleared_date, status } = expenseData;
        
        const updates = [];
        const values = [];
        let counter = 1;

        if (expense_list_id !== undefined) { updates.push(`expense_list_id = $${counter++}`); values.push(expense_list_id); }
        if (tracking_id !== undefined) { updates.push(`tracking_id = $${counter++}`); values.push(tracking_id || null); }
        if (date !== undefined) { updates.push(`date = $${counter++}`); values.push(date); }
        if (accounting_code !== undefined) { updates.push(`accounting_code = $${counter++}`); values.push(accounting_code); }
        if (expense_type !== undefined) { updates.push(`expense_type = $${counter++}`); values.push(expense_type); }
        if (description !== undefined) { updates.push(`description = $${counter++}`); values.push(description); }
        if (remarks !== undefined) { updates.push(`remarks = $${counter++}`); values.push(remarks); }
        if (total_amount !== undefined) { updates.push(`total_amount = $${counter++}`); values.push(total_amount); }
        if (account_source !== undefined) { updates.push(`account_source = $${counter++}`); values.push(account_source || null); }
        if (cleared_date !== undefined) { updates.push(`cleared_date = $${counter++}`); values.push(cleared_date || null); }
        if (status !== undefined) { updates.push(`status = $${counter++}`); values.push(status); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        const query = `
            UPDATE expenses 
            SET ${updates.join(', ')}
            WHERE id = $${counter}
            RETURNING *
        `;
        
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async deleteExpense(id) {
        const query = 'DELETE FROM expenses WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rowCount > 0;
    }

    async getNextExpenseId() {
        const query = "SELECT MAX(CAST(SUBSTRING(expense_list_id FROM '\\d+') AS INTEGER)) as max_num FROM expenses";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'ExLiID-' + (maxNum + 1);
    }

    async updateExpenseByTrackingId(trackingId, expenseData) {
        const { account_source, cleared_date, status, payment_date } = expenseData;
        const query = `
            UPDATE expenses 
            SET account_source = $1, cleared_date = $2, status = $3, payment_date = $4, updated_at = CURRENT_TIMESTAMP
            WHERE tracking_id = $5
            RETURNING *
        `;
        const result = await this.db.query(query, [
            account_source || null,
            cleared_date || null,
            status || 'Paid',
            payment_date || null,
            trackingId
        ]);
        return result.rows[0];
    }
}

module.exports = ExpenseController;
