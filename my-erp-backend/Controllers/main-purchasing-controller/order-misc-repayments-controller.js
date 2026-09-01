const pool = require('../../config/database');
const ExpenseController = require('../main-finance-controller/expense-controller');

class OrderMiscRepaymentsController {
    constructor(dbConnection) {
        this.db = dbConnection;
        this.expenseController = new ExpenseController(dbConnection);
    }

    async getNextRepaymentId() {
        const query = "SELECT MAX(CAST(SUBSTRING(repayment_id FROM '\\d+') AS INTEGER)) as max_num FROM order_misc_repayments";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'MiscPayID-' + (maxNum + 1);
    }

    async createRepayment(repaymentData) {
        const { repayment_id, order_id, payment_type, payment_amount, starting_amount, remaining_balance, bank_source, check_number, date, status } = repaymentData;

        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const repaymentResult = await client.query(
                `INSERT INTO order_misc_repayments 
                (repayment_id, order_id, payment_type, payment_amount, starting_amount, remaining_balance, bank_source, check_number, date, status) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *`,
                [
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
                ]
            );

            const remaining = parseFloat(remaining_balance) || 0;
            const isFullyPaid = remaining <= 0 || payment_type === 'Full';

            if (isFullyPaid) {
                await client.query(
                    `UPDATE order_misc SET status = 'Paid', payment_date = $1, payment_source = $2, check_number = $3 WHERE order_id = $4`,
                    [date, bank_source || null, check_number || null, order_id]
                );

                await client.query(
                    `UPDATE expenses SET status = 'Paid', cleared_date = $1, account_source = $2 WHERE tracking_id = $3`,
                    [date, bank_source || null, order_id]
                );
            } else {
                const orderResult = await client.query('SELECT customer_name, customer FROM order_misc WHERE order_id = $1', [order_id]);
                const order = orderResult.rows[0];
                const customerName = order?.customer_name || order?.customer || '';

                const expenseNextId = await this.expenseController.getNextExpenseId();
                const expenseListId = expenseNextId;

                await this.expenseController.addExpense({
                    expense_list_id: expenseListId,
                    tracking_id: repayment_id,
                    date: date,
                    accounting_code: '',
                    expense_type: '',
                    description: `Partial Payment to ${order_id} from ${customerName}`,
                    remarks: `${parseFloat(payment_amount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} out of ${parseFloat(starting_amount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
                    total_amount: null,
                    account_source: bank_source || null,
                    cleared_date: date,
                    status: 'Pending'
                });
            }

            await client.query('COMMIT');
            return repaymentResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getRepaymentByOrderId(orderId) {
        const query = 'SELECT * FROM order_misc_repayments WHERE order_id = $1 ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query, [orderId]);
        return result.rows;
    }

    async getAllRepayments() {
        const query = 'SELECT * FROM order_misc_repayments ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async deleteRepayment(repaymentId) {
        const query = 'DELETE FROM order_misc_repayments WHERE repayment_id = $1 RETURNING *';
        const result = await this.db.query(query, [repaymentId]);
        return result.rows[0];
    }
}

module.exports = OrderMiscRepaymentsController;
