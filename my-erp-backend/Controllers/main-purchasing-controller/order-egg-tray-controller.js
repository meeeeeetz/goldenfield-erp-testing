const pool = require('../../config/database');
const ExpenseController = require('../main-finance-controller/expense-controller');

class OrderEggTrayController {
    constructor(dbConnection) {
        this.db = dbConnection;
        this.expenseController = new ExpenseController(dbConnection);
    }

    async getAllOrders(search = '') {
        let query = `
            SELECT o.id, o.order_id, o.supplier_id, o.type_id, o.quantity, o.unit_price, o.total_price, 
                   o.invoice, o.status, o.payment_date, o.payment_source, o.check_number, o.created_at, o.updated_at,
                   TO_CHAR(o.date, 'YYYY-MM-DD') as date,
                   s.company_name,
                   et.remarks,
                   ba.bank,
                   ba.bank_account_number
            FROM order_egg_trays o
            LEFT JOIN egg_tray_suppliers s ON o.supplier_id = s.supplier_id
            LEFT JOIN egg_tray_types et ON o.type_id = et.type_id
            LEFT JOIN bank_accounts ba ON o.payment_source = ba.bank_account_id
        `;
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE o.order_id ILIKE $${counter++} OR s.company_name ILIKE $${counter++} OR et.remarks ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY o.date DESC, o.created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getOrderById(id) {
        const query = `SELECT id, order_id, supplier_id, type_id, quantity, unit_price, total_price, invoice, status, payment_date, payment_source, check_number, created_at, updated_at, TO_CHAR(date, 'YYYY-MM-DD') as date, TO_CHAR(payment_date, 'YYYY-MM-DD') as payment_date, ba.bank, ba.bank_account_number FROM order_egg_trays o LEFT JOIN bank_accounts ba ON o.payment_source = ba.bank_account_id WHERE id = $1`;
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getOrderByCode(orderId) {
        const query = `
            SELECT o.id, o.order_id, o.supplier_id, o.type_id, o.quantity, o.unit_price, o.total_price,
                   o.invoice, o.status, o.payment_date, o.payment_source, o.check_number, o.created_at, o.updated_at,
                   TO_CHAR(o.date, 'YYYY-MM-DD') as date,
                   TO_CHAR(o.payment_date, 'YYYY-MM-DD') as payment_date,
                   s.company_name,
                   et.remarks,
                   ba.bank,
                   ba.bank_account_number
            FROM order_egg_trays o
            LEFT JOIN egg_tray_suppliers s ON o.supplier_id = s.supplier_id
            LEFT JOIN egg_tray_types et ON o.type_id = et.type_id
            LEFT JOIN bank_accounts ba ON o.payment_source = ba.bank_account_id
            WHERE o.order_id = $1
        `;
        const result = await this.db.query(query, [orderId]);
        return result.rows[0];
    }

    async addOrder(orderData) {
        const { order_id, date, supplier_id, type_id, quantity, unit_price, total_price, invoice, status, payment_date, payment_source, check_number } = orderData;
        const query = `
            INSERT INTO order_egg_trays 
            (order_id, date, supplier_id, type_id, quantity, unit_price, total_price, invoice, status, payment_date, payment_source, check_number) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id, order_id, supplier_id, type_id, quantity, unit_price, total_price, invoice, status, TO_CHAR(date, 'YYYY-MM-DD') as date, TO_CHAR(payment_date, 'YYYY-MM-DD') as payment_date, payment_source, check_number, created_at, updated_at
        `;
        const result = await this.db.query(query, [
            order_id,
            date || new Date().toISOString().split('T')[0],
            supplier_id,
            type_id,
            quantity || 0,
            unit_price || 0,
            total_price || 0,
            invoice || null,
            status || 'Pending',
            payment_date || null,
            payment_source || null,
            check_number || null
        ]);

        const order = result.rows[0];

        try {
            const nextExpenseId = await this.expenseController.getNextExpenseId();
            await this.expenseController.addExpense({
                expense_list_id: nextExpenseId,
                tracking_id: order_id,
                date: date || new Date().toISOString().split('T')[0],
                accounting_code: '5140',
                expense_type: 'Packaging & Production Consumables',
                description: `${quantity || 0} pieces bought at ${unit_price || 0}`,
                remarks: invoice || null,
                total_amount: total_price || 0,
                account_source: null,
                cleared_date: null,
                status: 'Pending'
            });
        } catch (expenseErr) {
            console.error('Failed to create expense for order', order_id, expenseErr);
        }

        return order;
    }

    async updateOrder(orderId, orderData) {
        const updates = [];
        const values = [];
        let counter = 1;

        if (orderData.date !== undefined) { updates.push(`date = $${counter++}`); values.push(orderData.date); }
        if (orderData.supplier_id !== undefined) { updates.push(`supplier_id = $${counter++}`); values.push(orderData.supplier_id); }
        if (orderData.type_id !== undefined) { updates.push(`type_id = $${counter++}`); values.push(orderData.type_id); }
        if (orderData.quantity !== undefined) { updates.push(`quantity = $${counter++}`); values.push(orderData.quantity); }
        if (orderData.unit_price !== undefined) { updates.push(`unit_price = $${counter++}`); values.push(orderData.unit_price); }
        if (orderData.total_price !== undefined) { updates.push(`total_price = $${counter++}`); values.push(orderData.total_price); }
        if (orderData.invoice !== undefined) { updates.push(`invoice = $${counter++}`); values.push(orderData.invoice || null); }
        if (orderData.status !== undefined) { updates.push(`status = $${counter++}`); values.push(orderData.status); }
        if (orderData.payment_date !== undefined) { updates.push(`payment_date = $${counter++}`); values.push(orderData.payment_date || null); }
        if (orderData.payment_source !== undefined) { updates.push(`payment_source = $${counter++}`); values.push(orderData.payment_source || null); }
        if (orderData.check_number !== undefined) { updates.push(`check_number = $${counter++}`); values.push(orderData.check_number || null); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(orderId);

        const query = `
            UPDATE order_egg_trays 
            SET ${updates.join(', ')}
            WHERE order_id = $${counter}
            RETURNING id, order_id, supplier_id, type_id, quantity, unit_price, total_price, invoice, status, TO_CHAR(date, 'YYYY-MM-DD') as date, TO_CHAR(payment_date, 'YYYY-MM-DD') as payment_date, payment_source, check_number, created_at, updated_at
        `;
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async deleteOrder(orderId) {
        const query = 'DELETE FROM order_egg_trays WHERE order_id = $1';
        const result = await this.db.query(query, [orderId]);
        return result.rowCount > 0;
    }

    async getNextOrderId() {
        const query = "SELECT MAX(CAST(SUBSTRING(order_id FROM '\\d+') AS INTEGER)) as max_num FROM order_egg_trays";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'OrTraID-' + (maxNum + 1);
    }

    async getTotalQuantityOrdered() {
        const query = 'SELECT COALESCE(SUM(quantity), 0) as total_quantity FROM order_egg_trays';
        const result = await this.db.query(query);
        return result.rows[0]?.total_quantity || 0;
    }

    async getOutstandingBalance() {
        const query = "SELECT COALESCE(SUM(total_price), 0) as outstanding_balance FROM order_egg_trays WHERE status NOT IN ('Paid')";
        const result = await this.db.query(query);
        return result.rows[0]?.outstanding_balance || 0;
    }
}

module.exports = OrderEggTrayController;
