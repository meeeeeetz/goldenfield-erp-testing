const pool = require('../../config/database');
const ExpenseController = require('../main-finance-controller/expense-controller');
const { getPublicUrl, deleteFile } = require('../../utils/supabaseStorage');

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
        const { order_id, date, sales_invoice, customer, customer_name, expense_code, expense_type, items, grand_total, file_path } = orderData;

        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const orderResult = await client.query(
                `INSERT INTO order_misc (order_id, date, sales_invoice, customer, customer_name, expense_code, expense_type, grand_total, status, file_path)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                 RETURNING *`,
                [order_id, date, sales_invoice || null, customer || null, customer_name || null, expense_code || null, expense_type || null, parseFloat(grand_total) || 0, 'Pending', file_path || null]
            );

            for (const item of items) {
                await client.query(
                    `INSERT INTO order_misc_items
                    (order_id, item, quantity, unit, price, remarks, amount, file_path)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    [
                        order_id,
                        item.item,
                        parseInt(item.qty) || 1,
                        item.unit || 'Unit',
                        parseFloat(item.price) || 0,
                        item.remarks || null,
                        (parseFloat(item.price) || 0) * (parseInt(item.qty) || 1),
                        item.file_path || null
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

            const itemsResult = await this.db.query('SELECT * FROM order_misc_items WHERE order_id = $1', [order_id]);
            const itemsWithUrls = itemsResult.rows.map(row => ({
                ...row,
                file_url: row.file_path ? getPublicUrl(row.file_path) : null
            }));

            return {
                ...orderResult.rows[0],
                items: itemsWithUrls
            };
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
        return result.rows.map(row => ({
            ...row,
            file_url: row.file_path ? getPublicUrl(row.file_path) : null
        }));
    }

    async getOrderWithItems(orderId) {
        const orderResult = await this.db.query('SELECT * FROM order_misc WHERE order_id = $1', [orderId]);
        const order = orderResult.rows[0];

        if (!order) return null;

        const itemsResult = await this.db.query('SELECT * FROM order_misc_items WHERE order_id = $1', [orderId]);
        const items = itemsResult.rows.map(row => ({
            ...row,
            file_url: row.file_path ? getPublicUrl(row.file_path) : null
        }));
        return {
            ...order,
            file_url: order.file_path ? getPublicUrl(order.file_path) : null,
            items
        };
    }

    async updateOrderPhoto(orderId, filePath) {
        const query = 'UPDATE order_misc SET file_path = $2 WHERE order_id = $1 RETURNING *';
        const result = await this.db.query(query, [orderId, filePath]);
        return result.rows[0];
    }

    async deleteOrderPhoto(orderId) {
        const existing = await this.db.query('SELECT file_path FROM order_misc WHERE order_id = $1', [orderId]);
        const filePath = existing.rows[0]?.file_path;
        if (filePath) {
            try { await deleteFile(filePath); } catch (e) { console.error('Failed to delete file', e); }
        }
        const query = 'UPDATE order_misc SET file_path = NULL WHERE order_id = $1 RETURNING *';
        const result = await this.db.query(query, [orderId]);
        return result.rows[0];
    }

    async deleteOrder(orderId) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            await client.query('DELETE FROM order_misc_items WHERE order_id = $1', [orderId]);
            await client.query('DELETE FROM order_misc WHERE order_id = $1 RETURNING *', [orderId]);
            await client.query('DELETE FROM expenses WHERE tracking_id = $1', [orderId]);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updateOrderItemPhoto(itemId, filePath) {
        const query = 'UPDATE order_misc_items SET file_path = $2 WHERE id = $1 RETURNING *';
        const result = await this.db.query(query, [itemId, filePath]);
        return result.rows[0];
    }

    async getOrderItemById(itemId) {
        const query = 'SELECT * FROM order_misc_items WHERE id = $1';
        const result = await this.db.query(query, [itemId]);
        return result.rows[0];
    }

    async deleteOrderItemPhoto(itemId) {
        const existing = await this.db.query('SELECT file_path FROM order_misc_items WHERE id = $1', [itemId]);
        const filePath = existing.rows[0]?.file_path;
        if (filePath) {
            try { await deleteFile(filePath); } catch (e) { console.error('Failed to delete file', e); }
        }
        const query = 'UPDATE order_misc_items SET file_path = NULL WHERE id = $1 RETURNING *';
        const result = await this.db.query(query, [itemId]);
        return result.rows[0];
    }
}

module.exports = OrderMiscController;
