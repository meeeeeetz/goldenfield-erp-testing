const pool = require('../../config/database');

class PettyCashController {
    constructor(dbConnection) {
        this.db = dbConnection;
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
        const { date, source, replenish_amount, check_number, status } = replenishData;
        const nextId = await this.getNextPettyCashId();
        const petty_cash_code = `PeCID-${nextId}`;
        const query = `
            INSERT INTO petty_cash 
            (date, pettycashcategory, item, source, replenish_amount, check_number, status, petty_cash_code) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            date,
            'Replenishment',
            'Petty Cash Replenishment',
            source || null,
            replenish_amount || 0,
            check_number || null,
            status || 'Pending',
            petty_cash_code
        ]);
        return result.rows[0];
    }

    async addPettyCashTransaction(transactionData) {
        const { date, pettycashcategory, item, remarks, store, amount, status, replenish_amount } = transactionData;
        const nextId = await this.getNextPettyCashId();
        const petty_cash_code = `PeCID-${nextId}`;
        const query = `
            INSERT INTO petty_cash 
            (date, pettycashcategory, item, remarks, store, amount, status, petty_cash_code, replenish_amount) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;
        const result = await this.db.query(query, [
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
        return result.rows[0];
    }

    async updatePettyCashTransaction(pettyCashCode, transactionData) {
        const { date, pettycashcategory, item, remarks, store, amount, status } = transactionData;
        const query = `
            UPDATE petty_cash 
            SET date = $1, pettycashcategory = $2, item = $3, remarks = $4, store = $5, amount = $6, status = $7, updated_at = CURRENT_TIMESTAMP
            WHERE petty_cash_code = $8
            RETURNING *
        `;
        const result = await this.db.query(query, [
            date,
            pettycashcategory,
            item,
            remarks,
            store,
            amount,
            status,
            pettyCashCode
        ]);
        return result.rows[0];
    }

    async deletePettyCashTransaction(pettyCashCode) {
        const query = 'DELETE FROM petty_cash WHERE petty_cash_code = $1';
        const result = await this.db.query(query, [pettyCashCode]);
        return result.rowCount > 0;
    }

    async getNextPettyCashId() {
        try {
            const query = "SELECT MAX(CAST(SUBSTRING(petty_cash_code FROM '\\d+') AS INTEGER)) as max_num FROM petty_cash";
            const result = await this.db.query(query);
            const maxNum = result.rows[0]?.max_num || 0;
            return maxNum + 1;
        } catch (error) {
            console.error('Error getting next petty cash ID:', error);
            return 1;
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
        `);
        const available = Number(availableResult.rows[0]?.available || 0);

        const currentMonthStart = new Date();
        currentMonthStart.setDate(1);
        currentMonthStart.setHours(0, 0, 0, 0);
        const monthStartStr = currentMonthStart.toISOString().split('T')[0];

        const monthlyExpenseResult = await this.db.query(`
            SELECT COALESCE(SUM(amount), 0) as monthly_expense
            FROM petty_cash
            WHERE date >= $1 AND pettycashcategory != 'Replenishment'
        `, [monthStartStr]);
        const monthlyExpense = Number(monthlyExpenseResult.rows[0]?.monthly_expense || 0);

        const monthlyReplenishResult = await this.db.query(`
            SELECT COUNT(*) as monthly_replenish
            FROM petty_cash
            WHERE date >= $1 AND pettycashcategory = 'Replenishment'
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
