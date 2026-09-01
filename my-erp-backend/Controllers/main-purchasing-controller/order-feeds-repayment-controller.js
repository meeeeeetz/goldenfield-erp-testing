const pool = require('../../config/database');

class OrderFeedRepaymentController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getNextRepaymentId() {
        const query = "SELECT MAX(CAST(SUBSTRING(repayment_id FROM '\\d+') AS INTEGER)) as max_num FROM order_feeds_repayment";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'ReOrFeID-' + (maxNum + 1);
    }

    async createRepayment(repaymentId, orderId, bankSource, checkNumber, total) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const insertQuery = `
                INSERT INTO order_feeds_repayment 
                (repayment_id, order_id, bank_source, check_number, total) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;
            const result = await client.query(insertQuery, [
                repaymentId,
                orderId,
                bankSource || null,
                checkNumber || null,
                total
            ]);
            const repayment = result.rows[0];

            const updateQuery = `
                UPDATE order_feeds 
                SET payment_date = $1, 
                    payment_source = $2, 
                    check_number = $3, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE order_id = $4
            `;
            await client.query(updateQuery, [
                repayment.created_at,
                bankSource || null,
                checkNumber || null,
                orderId
            ]);

            await client.query('COMMIT');
            return repayment;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getAllRepayments() {
        const query = `
            SELECT r.*, 
                   o.sales_invoice,
                   b.bank_account_number,
                   b.bank_code
            FROM order_feeds_repayment r
            LEFT JOIN order_feeds o ON r.order_id = o.order_id
            LEFT JOIN bank_accounts b ON r.bank_source = b.bank
            ORDER BY r.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }
}

module.exports = OrderFeedRepaymentController;
