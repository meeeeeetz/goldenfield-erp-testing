class ExpenseCategoryController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllExpenseCategories() {
        const query = "SELECT *, CONCAT('ExpID-', LPAD(id::text, 4, '0')) as expense_id FROM expense_categories ORDER BY id ASC";
        const result = await this.db.query(query);
        return result.rows;
    }

    async getExpenseCategoryById(id) {
        const query = "SELECT *, CONCAT('ExpID-', LPAD(id::text, 4, '0')) as expense_id FROM expense_categories WHERE id = $1";
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async addExpenseCategory(expenseData) {
        const { expense_type, remarks, accounting_code } = expenseData;
        const query = `
            INSERT INTO expense_categories 
            (expense_type, remarks, accounting_code) 
            VALUES ($1, $2, $3)
            RETURNING *, CONCAT('ExpID-', LPAD(id::text, 4, '0')) as expense_id
        `;
        const result = await this.db.query(query, [
            expense_type, 
            remarks,
            accounting_code
        ]);
        return result.rows[0];
    }

    async updateExpenseCategory(id, expenseData) {
        const { expense_type, remarks, accounting_code } = expenseData;
        const query = `
            UPDATE expense_categories 
            SET expense_type = $1, remarks = $2, accounting_code = $3, updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *, CONCAT('ExpID-', LPAD(id::text, 4, '0')) as expense_id
        `;
        const result = await this.db.query(query, [
            expense_type, 
            remarks, 
            accounting_code,
            id
        ]);
        return result.rows[0];
    }

    async deleteExpenseCategory(id) {
        const query = 'DELETE FROM expense_categories WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rowCount > 0;
    }

    async getNextExpenseCategoryId() {
        const query = "SELECT MAX(id) as max_id FROM expense_categories";
        const result = await this.db.query(query);
        const maxId = result.rows[0]?.max_id || 0;
        return maxId + 1;
    }
}

module.exports = ExpenseCategoryController;
