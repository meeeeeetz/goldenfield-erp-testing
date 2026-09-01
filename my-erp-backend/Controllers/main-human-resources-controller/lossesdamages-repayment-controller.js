const pool = require('../../config/database');

class LossDamageRepaymentController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllRepayments() {
        const query = 'SELECT * FROM lossdamage_repayment ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getRepaymentsByLossDamage(lossDamageId) {
        const query = 'SELECT * FROM lossdamage_repayment WHERE lossdamage_id = $1 ORDER BY created_at DESC';
        const result = await this.db.query(query, [lossDamageId]);
        return result.rows;
    }

    async getRepaymentsByPayrollCycle(payrollCycleId) {
        const query = 'SELECT * FROM lossdamage_repayment WHERE payrollcycle_id = $1 ORDER BY created_at DESC';
        const result = await this.db.query(query, [payrollCycleId]);
        return result.rows;
    }

    async addRepayment(repaymentData) {
        const { lossdamage_id, payrollcycle_id, amount_paid, paid_at } = repaymentData;
        const query = `
            INSERT INTO lossdamage_repayment (lossdamage_id, payrollcycle_id, amount_paid, paid_at)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await this.db.query(query, [lossdamage_id, payrollcycle_id, amount_paid, paid_at]);
        return result.rows[0];
    }
}

module.exports = LossDamageRepaymentController;
