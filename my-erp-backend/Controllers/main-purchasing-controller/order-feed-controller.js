const pool = require('../../config/database');
const FeedInventoryController = require('./feed-inventory-controller');

class OrderFeedController {
    constructor(dbConnection) {
        this.db = dbConnection;
        this.feedInventoryController = new FeedInventoryController(dbConnection);
    }

    async getAllOrders(search = '') {
        let query = `
            SELECT o.*, 
                   s.company_name,
                   f.feed_type,
                   f.unit as feed_unit,
                   b.bank_account_number,
                   b.bank_code
            FROM order_feeds o
            LEFT JOIN feeds_suppliers s ON o.supplier_id = s.supplier_id
            LEFT JOIN feed_types f ON o.feed_type_id = f.feed_type_id
            LEFT JOIN bank_accounts b ON o.payment_source = b.bank_code
        `;
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE o.order_id ILIKE $${counter++} OR s.company_name ILIKE $${counter++} OR f.feed_type ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY o.date DESC, o.created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getOrderById(id) {
        const query = 'SELECT * FROM order_feeds WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getOrderByCode(orderId) {
        const query = `
            SELECT o.*, 
                   s.company_name,
                   f.feed_type,
                   f.unit as feed_unit
            FROM order_feeds o
            LEFT JOIN feeds_suppliers s ON o.supplier_id = s.supplier_id
            LEFT JOIN feed_types f ON o.feed_type_id = f.feed_type_id
            WHERE o.order_id = $1
        `;
        const result = await this.db.query(query, [orderId]);
        return result.rows[0];
    }

    async addOrder(orderData) {
        const { order_id, date, due_date, supplier_id, sales_invoice, feed_type_id, quantity, unit, price, total_price, receipt_path, status, rebate_status } = orderData;
        
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const orderQuery = `
                INSERT INTO order_feeds 
                (order_id, date, due_date, supplier_id, sales_invoice, feed_type_id, quantity, unit, price, total_price, receipt_path, status, rebate_status) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                RETURNING *
            `;
            const orderResult = await client.query(orderQuery, [
                order_id,
                date,
                due_date,
                supplier_id,
                sales_invoice || null,
                feed_type_id,
                quantity,
                unit,
                price,
                total_price,
                receipt_path || null,
                status || 'Pending',
                rebate_status || 'Unclaimed'
            ]);

            const order = orderResult.rows[0];

            if (feed_type_id && quantity) {
                const feedTypeResult = await client.query('SELECT category FROM feed_types WHERE feed_type_id = $1', [feed_type_id]);
                const category = feedTypeResult.rows[0]?.category || null;

                if (category) {
                    let quantityInKilos = parseFloat(quantity) || 0;
                    if (unit && String(unit).toLowerCase() === 'sack') {
                        quantityInKilos = quantityInKilos * 50;
                    }

                    const nextNumResult = await client.query("SELECT nextval('feed_inventory_feed_use_id_seq') as next_num");
                    const feedUseId = 'FeConID-' + nextNumResult.rows[0].next_num;

                    await client.query(
                        `INSERT INTO feed_inventory 
                        (feed_use_id, source_type, building_tracking_receipt, category, unit, quantity, driver, feed_time, status, created_by) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                        [feedUseId, 'order', `OF-${order_id}`, category, 'Kilos', quantityInKilos, null, null, 'Pending', null]
                    );
                }
            }

            await client.query('COMMIT');
            return order;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updateOrder(orderId, orderData) {
        const { order_id, date, due_date, supplier_id, sales_invoice, feed_type_id, quantity, unit, price, total_price, receipt_path, status } = orderData;
        const query = `
            UPDATE order_feeds 
            SET order_id = $1, date = $2, due_date = $3, supplier_id = $4, sales_invoice = $5, feed_type_id = $6, quantity = $7, unit = $8, price = $9, total_price = $10, receipt_path = $11, status = $12, updated_at = CURRENT_TIMESTAMP
            WHERE order_id = $13
            RETURNING *
        `;
        const result = await this.db.query(query, [
            order_id,
            date,
            due_date,
            supplier_id,
            sales_invoice || null,
            feed_type_id,
            quantity,
            unit,
            price,
            total_price,
            receipt_path || null,
            status || 'Pending',
            orderId
        ]);
        return result.rows[0];
    }

    async updateOrderPhoto(orderId, receiptPath) {
        const query = `
            UPDATE order_feeds 
            SET receipt_path = $1, updated_at = CURRENT_TIMESTAMP
            WHERE order_id = $2
            RETURNING *
        `;
        const result = await this.db.query(query, [receiptPath, orderId]);
        return result.rows[0];
    }

    async removeOrderPhoto(orderId) {
        const query = `
            UPDATE order_feeds 
            SET receipt_path = NULL, updated_at = CURRENT_TIMESTAMP
            WHERE order_id = $1
            RETURNING *
        `;
        const result = await this.db.query(query, [orderId]);
        return result.rows[0];
    }

    async deleteOrder(orderId) {
        const query = 'DELETE FROM order_feeds WHERE order_id = $1';
        const result = await this.db.query(query, [orderId]);
        return result.rowCount > 0;
    }

    async getNextOrderId() {
        const query = "SELECT MAX(CAST(SUBSTRING(order_id FROM '\\d+') AS INTEGER)) as max_num FROM order_feeds";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'OrFeID-' + (maxNum + 1);
    }

    async claimRebates(orderIds, rebateTotal, rebatePrice = 0) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const updateQuery = 'UPDATE order_feeds SET rebate_status = $1, updated_at = CURRENT_TIMESTAMP WHERE order_id = ANY($2::text[])';
            await client.query(updateQuery, ['Claimed', orderIds]);

            const newOrderId = await this.getNextOrderId();

            let supplierId = null;

            if (orderIds.length > 0) {
                const firstOrder = await this.getOrderByCode(orderIds[0]);
                if (firstOrder) {
                    supplierId = firstOrder.supplier_id;
                }
            }

            if (!supplierId) {
                const defaultSupplier = await this.db.query('SELECT supplier_id FROM feeds_suppliers ORDER BY supplier_id LIMIT 1');
                supplierId = defaultSupplier.rows[0] && defaultSupplier.rows[0].supplier_id;
            }

            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 7);

            const insertQuery = `
                INSERT INTO order_feeds 
                (order_id, date, due_date, supplier_id, sales_invoice, feed_type_id, quantity, unit, price, total_price, receipt_path, status, rebate_status) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                RETURNING *
            `;
            const result = await client.query(insertQuery, [
                newOrderId,
                new Date().toISOString(),
                dueDate.toISOString().split('T')[0],
                supplierId,
                null,
                null,
                0,
                '-',
                rebatePrice,
                rebateTotal,
                null,
                'Rebate',
                'Rebate'
            ]);

            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getOutstandingBalance() {
        const transactionQuery = "SELECT COALESCE(SUM(total_price), 0) as transaction_total FROM order_feeds WHERE status NOT IN ('Paid')";
        const transactionResult = await this.db.query(transactionQuery);
        const transactionTotal = parseFloat(transactionResult.rows[0]?.transaction_total || 0);

        return {
            transaction_total: transactionTotal,
            repayment_total: 0,
            outstanding_balance: transactionTotal
        };
    }

    async settleOrders(orderIds) {
        const query = 'UPDATE order_feeds SET status = $1, rebate_status = $2, updated_at = CURRENT_TIMESTAMP WHERE order_id = ANY($3::text[])';
        const result = await this.db.query(query, ['Paid', 'Paid', orderIds]);
        return result.rowCount;
    }

    async bulkUploadOrders(rows) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            let nextOrderNum = await this.getNextOrderIdNum();
            let nextExpenseNum = await this.getNextExpenseNum();

            const results = [];

            const validFeedTypes = new Set();
            const validSuppliers = new Set();

            for (const row of rows) {
                const orderId = 'OrFeID-' + nextOrderNum++;
                const date = row.date || new Date().toISOString().split('T')[0];
                const dueDate = row.due_date || null;
                const rawSupplierId = row.supplier_id || null;
                const salesInvoice = row.sales_invoice || null;
                const rawFeedTypeId = row.feed_type_id || null;
                const quantity = parseFloat(row.quantity) || 0;
                const unit = row.unit || '-';
                const price = parseFloat(row.price) || 0;
                const totalPrice = parseFloat(row.total_price) || 0;
                const receiptPath = row.receipt_path || null;
                const status = row.status || 'Pending';
                const rebateStatus = row.rebate_status || 'Unclaimed';

                let supplierId = null;
                if (rawSupplierId) {
                    if (!validSuppliers.has(rawSupplierId)) {
                        const supplierResult = await client.query('SELECT supplier_id FROM feeds_suppliers WHERE supplier_id = $1', [rawSupplierId]);
                        if (supplierResult.rows.length > 0) {
                            validSuppliers.add(rawSupplierId);
                            supplierId = rawSupplierId;
                        }
                    } else {
                        supplierId = rawSupplierId;
                    }
                }

                let feedTypeId = null;
                if (rawFeedTypeId) {
                    if (!validFeedTypes.has(rawFeedTypeId)) {
                        const feedTypeResult = await client.query('SELECT feed_type_id FROM feed_types WHERE feed_type_id = $1', [rawFeedTypeId]);
                        if (feedTypeResult.rows.length > 0) {
                            validFeedTypes.add(rawFeedTypeId);
                            feedTypeId = rawFeedTypeId;
                        }
                    } else {
                        feedTypeId = rawFeedTypeId;
                    }
                }

                const orderResult = await client.query(
                    `INSERT INTO order_feeds (order_id, date, due_date, supplier_id, sales_invoice, feed_type_id, quantity, unit, price, total_price, receipt_path, status, rebate_status) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
                    [orderId, date, dueDate, supplierId, salesInvoice, feedTypeId, quantity, unit, price, totalPrice, receiptPath, status, rebateStatus]
                );

                const order = orderResult.rows[0];

                let description = 'Order Feed';
                let remarks = '';

                if (supplierId) {
                    const supplierResult = await client.query('SELECT company_name FROM feeds_suppliers WHERE supplier_id = $1', [supplierId]);
                    const companyName = supplierResult.rows[0]?.company_name || supplierId;
                    description = `Sales Invoice: ${salesInvoice || 'N/A'} from ${companyName}`;
                }

                if (feedTypeId) {
                    const feedTypeResult = await client.query('SELECT feed_type, remarks FROM feed_types WHERE feed_type_id = $1', [feedTypeId]);
                    const feedType = feedTypeResult.rows[0];
                    if (feedType) {
                        description += ` at the price of ${feedType.feed_type}`;
                        remarks = feedType.remarks || '';
                    }
                }

                const expenseListId = 'ExLiID-' + nextExpenseNum++;
                await client.query(
                    `INSERT INTO expenses (expense_list_id, tracking_id, date, accounting_code, expense_type, description, remarks, total_amount, account_source, cleared_date, status) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                    [expenseListId, orderId, date, '5110', 'Direct Raw Materials & Feed', description, remarks, totalPrice, null, null, 'Pending']
                );

                if (feedTypeId && quantity) {
                    const feedTypeResult = await client.query('SELECT category FROM feed_types WHERE feed_type_id = $1', [feedTypeId]);
                    const category = feedTypeResult.rows[0]?.category || null;

                    if (category) {
                        let quantityInKilos = parseFloat(quantity) || 0;
                        if (unit && String(unit).toLowerCase() === 'sack') {
                            quantityInKilos = quantityInKilos * 50;
                        }

                        const nextNumResult = await client.query("SELECT nextval('feed_inventory_feed_use_id_seq') as next_num");
                        const feedUseId = 'FeConID-' + nextNumResult.rows[0].next_num;

                        await client.query(
                            `INSERT INTO feed_inventory 
                            (feed_use_id, source_type, building_tracking_receipt, category, unit, quantity, driver, feed_time, status, created_by) 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                            [feedUseId, 'order', `OF-${orderId}`, category, 'Kilos', quantityInKilos, null, null, 'Pending', null]
                        );
                    }
                }

                results.push(order);
            }

            await client.query('COMMIT');
            return results;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getNextOrderIdNum() {
        const query = "SELECT MAX(CAST(SUBSTRING(order_id FROM '\\d+') AS INTEGER)) as max_num FROM order_feeds";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return maxNum + 1;
    }

    async getNextExpenseNum() {
        const query = "SELECT MAX(CAST(SUBSTRING(expense_list_id FROM '\\d+') AS INTEGER)) as max_num FROM expenses";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return maxNum + 1;
    }
}

module.exports = OrderFeedController;
