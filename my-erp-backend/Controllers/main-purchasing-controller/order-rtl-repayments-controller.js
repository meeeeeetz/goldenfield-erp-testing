const pool = require('../../config/database');

class OrderRtlRepaymentsController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getNextRepaymentId() {
        const query = "SELECT MAX(CAST(SUBSTRING(repayment_id FROM '\\d+') AS INTEGER)) as max_num FROM order_rtl_repayments";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'RTLPayID-' + (maxNum + 1);
    }

    async createRepayment(repaymentData) {
        const { repayment_id, order_id, payment_type, payment_amount, starting_amount, remaining_balance, bank_source, check_number, date, status } = repaymentData;
        const query = `
            INSERT INTO order_rtl_repayments 
            (repayment_id, order_id, payment_type, payment_amount, starting_amount, remaining_balance, bank_source, check_number, date, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            repayment_id,
            order_id,
            payment_type || 'Partial',
            parseFloat(payment_amount) || 0,
            parseFloat(starting_amount) || 0,
            parseFloat(remaining_balance) || 0,
            bank_source || null,
            check_number || null,
            date,
            status || 'Pending'
        ]);
        return result.rows[0];
    }

    async getRepaymentByOrderId(orderId) {
        const query = 'SELECT * FROM order_rtl_repayments WHERE order_id = $1 ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query, [orderId]);
        return result.rows;
    }

    async getAllRepayments() {
        const query = 'SELECT * FROM order_rtl_repayments ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async deleteRepayment(repaymentId) {
        const query = 'DELETE FROM order_rtl_repayments WHERE repayment_id = $1 RETURNING *';
        const result = await this.db.query(query, [repaymentId]);
        return result.rows[0];
    }
}

module.exports = OrderRtlRepaymentsController;
