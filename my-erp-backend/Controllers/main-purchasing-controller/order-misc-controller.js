const pool = require('../../config/database');
const ExpenseController = require('../main-finance-controller/expense-controller');

class OrderMiscController {
    constructor(dbConnection) {
        this.db = dbConnection;
        this.expenseController = new ExpenseController(dbConnection);
    }

    async getNextOrderId() {
        const query = "SELECT MAX(CAST(SUBSTRING(order_id FROM '\\d+') AS INTEGER)) as max_num FROM order_misc";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'OrMiscID-' + (maxNum + 1);
    }

    async createOrder(orderData) {
        const { order_id, date, sales_invoice, customer, customer_name, expense_code, expense_type, items, grand_total } = orderData;

        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const orderResult = await client.query(
                `INSERT INTO order_misc (order_id, date, sales_invoice, customer, customer_name, expense_code, expense_type, grand_total, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                 RETURNING *`,
                [order_id, date, sales_invoice || null, customer || null, customer_name || null, expense_code || null, expense_type || null, parseFloat(grand_total) || 0, 'Pending']
            );

            for (const item of items) {
                await client.query(
                    `INSERT INTO order_misc_items
                    (order_id, item, quantity, unit, price, remarks, amount)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [
                        order_id,
                        item.item,
                        parseInt(item.qty) || 1,
                        item.unit || 'Unit',
                        parseFloat(item.price) || 0,
                        item.remarks || null,
                        (parseFloat(item.price) || 0) * (parseInt(item.qty) || 1)
                    ]
                );
            }

            await client.query('COMMIT');

            const expenseNextId = await this.expenseController.getNextExpenseId();
            const expenseListId = expenseNextId;
            const description = `${sales_invoice || 'N/A'} from ${customer_name || customer || 'N/A'}`;
            const remarks = `${items.length} items amounting to ${parseFloat(grand_total).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

            await this.expenseController.addExpense({
                expense_list_id: expenseListId,
                tracking_id: order_id,
                date: date,
                accounting_code: expense_code,
                expense_type: expense_type,
                description: description,
                remarks: remarks,
                total_amount: parseFloat(grand_total) || 0,
                account_source: null,
                cleared_date: null,
                status: 'Pending'
            });

            return orderResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getAllOrders(search = '') {
        let query = 'SELECT * FROM order_misc';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE order_id ILIKE $${counter++} OR customer ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getOrderWithItems(orderId) {
        const orderResult = await this.db.query('SELECT * FROM order_misc WHERE order_id = $1', [orderId]);
        const order = orderResult.rows[0];

        if (!order) return null;

        const itemsResult = await this.db.query('SELECT * FROM order_misc_items WHERE order_id = $1', [orderId]);
        return {
            ...order,
            items: itemsResult.rows
        };
    }

    async deleteOrder(orderId) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            await client.query('DELETE FROM order_misc_items WHERE order_id = $1', [orderId]);
            const result = await client.query('DELETE FROM order_misc WHERE order_id = $1 RETURNING *', [orderId]);

            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = OrderMiscController;
