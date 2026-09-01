const pool = require('../../config/database');

class OrderRtlController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getNextOrderId() {
        const query = "SELECT MAX(CAST(SUBSTRING(order_id FROM '\\d+') AS INTEGER)) as max_num FROM order_rtl";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'OrRTLID-' + (maxNum + 1);
    }

    async createOrder(orderData) {
        const { order_id, date, company, sales_invoice, items, status, grand_total } = orderData;
        
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            
            const orderResult = await client.query(
                `INSERT INTO order_rtl (order_id, date, company, sales_invoice, grand_total, status) 
                 VALUES ($1, $2, $3, $4, $5, $6) 
                 RETURNING *`,
                [order_id, date, company, sales_invoice || null, parseFloat(grand_total) || 0, status || 'Pending']
            );
            
            for (const item of items) {
                await client.query(
                    `INSERT INTO order_rtl_items 
                    (order_id, item, quantity, unit, price, total_price) 
                    VALUES ($1, $2, $3, $4, $5, $6)`,
                    [
                        order_id,
                        item.item,
                        parseInt(item.quantity) || 1,
                        item.unit || 'Heads',
                        parseFloat(item.price) || 0,
                        (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)
                    ]
                );
            }
            
            await client.query('COMMIT');
            return orderResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getAllOrders(search = '') {
        let query = 'SELECT * FROM order_rtl';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE order_id ILIKE $${counter++} OR company ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getOrderWithItems(orderId) {
        const orderResult = await this.db.query('SELECT * FROM order_rtl WHERE order_id = $1', [orderId]);
        const order = orderResult.rows[0];
        
        if (!order) return null;
        
        const itemsResult = await this.db.query('SELECT * FROM order_rtl_items WHERE order_id = $1', [orderId]);
        return {
            ...order,
            items: itemsResult.rows
        };
    }

    async updateOrder(orderId, updateData) {
        const { status, payment_date, payment_source, check_number, created_by } = updateData;
        const query = `
            UPDATE order_rtl 
            SET status = COALESCE($1, status),
                payment_date = COALESCE($2, payment_date),
                payment_source = COALESCE($3, payment_source),
                check_number = COALESCE($4, check_number),
                created_by = COALESCE($5, created_by)
            WHERE order_id = $6
            RETURNING *
        `;
        const result = await this.db.query(query, [
            status || null,
            payment_date || null,
            payment_source || null,
            check_number || null,
            created_by || null,
            orderId
        ]);
        return result.rows[0];
    }

    async deleteOrder(orderId) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            
            await client.query('DELETE FROM order_rtl_items WHERE order_id = $1', [orderId]);
            const result = await client.query('DELETE FROM order_rtl WHERE order_id = $1 RETURNING *', [orderId]);
            
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

module.exports = OrderRtlController;
