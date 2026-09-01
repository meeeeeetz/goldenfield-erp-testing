const pool = require('../../config/database');

class CashAdvanceRepaymentController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllRepayments() {
        const query = 'SELECT * FROM cash_advance_repayment ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getRepaymentsByCashAdvance(cashAdvanceId) {
        const query = 'SELECT * FROM cash_advance_repayment WHERE cashadvance_id = $1 ORDER BY created_at DESC';
        const result = await this.db.query(query, [cashAdvanceId]);
        return result.rows;
    }

    async addRepayment(repaymentData) {
        const { cashadvance_id, payroll_cycle_id, amount_paid, paid_at } = repaymentData;
        const query = `
            INSERT INTO cash_advance_repayment (cashadvance_id, payroll_cycle_id, amount_paid, paid_at)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await this.db.query(query, [cashadvance_id, payroll_cycle_id, amount_paid, paid_at]);
        return result.rows[0];
    }
}

module.exports = CashAdvanceRepaymentController;
