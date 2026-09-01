const pool = require('../../config/database');

class OrderVetSuppliesController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllOrders(search = '') {
        let query = `
            SELECT o.*, 
                   s.company_name,
                   p.item as product_name,
                   b.bank,
                   b.bank_account_number
            FROM order_vet_supplies o
            LEFT JOIN vet_suppliers s ON o.company_id = s.supplier_id
            LEFT JOIN vet_products p ON o.product_item_code = p.product_id
            LEFT JOIN bank_accounts b ON o.payment_source = b.bank_account_id
        `;
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE o.order_id ILIKE $${counter++} OR s.company_name ILIKE $${counter++} OR p.item ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY o.date DESC, o.created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getOrderById(id) {
        const query = `SELECT * FROM order_vet_supplies WHERE id = $1`;
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getOrderByCode(orderId) {
        const query = `
            SELECT o.*, 
                   s.company_name,
                   p.item as product_name,
                   b.bank,
                   b.bank_account_number
            FROM order_vet_supplies o
            LEFT JOIN vet_suppliers s ON o.company_id = s.supplier_id
            LEFT JOIN vet_products p ON o.product_item_code = p.product_id
            LEFT JOIN bank_accounts b ON o.payment_source = b.bank_account_id
            WHERE o.order_id = $1
        `;
        const result = await this.db.query(query, [orderId]);
        return result.rows[0];
    }

    async addOrder(orderData) {
        const { order_id, date, due_date, sales_invoice, company_id, product_item_code, quantity, package_size, unit, unit_price, free_units, discount, total_price, status, file_path, payment_date, payment_source, check_number, created_by } = orderData;
        const query = `
            INSERT INTO order_vet_supplies 
            (order_id, date, due_date, sales_invoice, company_id, product_item_code, quantity, package_size, unit, unit_price, free_units, discount, total_price, status, file_path, payment_date, payment_source, check_number, created_by) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            order_id,
            date || new Date().toISOString().split('T')[0],
            due_date || null,
            sales_invoice || null,
            company_id,
            product_item_code,
            quantity || 0,
            package_size || null,
            unit || null,
            unit_price || 0,
            free_units || 0,
            discount || '0%',
            total_price || 0,
            status || 'Pending',
            file_path || null,
            payment_date || null,
            payment_source || null,
            check_number || null,
            created_by || null
        ]);
        return result.rows[0];
    }

    async updateOrder(orderId, orderData) {
        const allowedFields = ['order_id', 'date', 'due_date', 'sales_invoice', 'company_id', 'product_item_code', 'quantity', 'package_size', 'unit', 'unit_price', 'free_units', 'discount', 'total_price', 'status', 'file_path', 'payment_date', 'payment_source', 'check_number', 'created_by'];
        const setClauses = [];
        const values = [];
        let counter = 1;

        for (const field of allowedFields) {
            if (orderData.hasOwnProperty(field)) {
                setClauses.push(`${field} = $${counter++}`);
                values.push(orderData[field] !== undefined ? orderData[field] : null);
            }
        }

        if (setClauses.length === 0) {
            return null;
        }

        values.push(orderId);
        const query = `UPDATE order_vet_supplies SET ${setClauses.join(', ')} WHERE order_id = $${counter} RETURNING *`;
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async updateOrderPhoto(orderId, filePath) {
        const query = `
            UPDATE order_vet_supplies 
            SET file_path = $1, updated_at = CURRENT_TIMESTAMP
            WHERE order_id = $2
            RETURNING *
        `;
        const result = await this.db.query(query, [filePath, orderId]);
        return result.rows[0];
    }

    async removeOrderPhoto(orderId) {
        const query = `
            UPDATE order_vet_supplies 
            SET file_path = NULL, updated_at = CURRENT_TIMESTAMP
            WHERE order_id = $1
            RETURNING *
        `;
        const result = await this.db.query(query, [orderId]);
        return result.rows[0];
    }

    async deleteOrder(orderId) {
        const query = 'DELETE FROM order_vet_supplies WHERE order_id = $1';
        const result = await this.db.query(query, [orderId]);
        return result.rowCount > 0;
    }

    async getNextOrderId() {
        const query = "SELECT MAX(CAST(SUBSTRING(order_id FROM '\\d+') AS INTEGER)) as max_num FROM order_vet_supplies";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'OrVeSupID-' + (maxNum + 1);
    }
}

module.exports = OrderVetSuppliesController;
