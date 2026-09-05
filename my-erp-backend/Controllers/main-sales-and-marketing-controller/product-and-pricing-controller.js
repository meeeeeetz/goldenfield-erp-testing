class ProductListController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllProducts() {
        const query = 'SELECT * FROM product_list ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result;
    }

    async getProductById(productId) {
        const query = 'SELECT * FROM product_list WHERE product_id = $1';
        const result = await this.db.query(query, [productId]);
        return result;
    }

    async addProduct(productData) {
        const { product_id, product, remarks, no_of_eggs, egg_tray_used, status } = productData;
        const query = `
            INSERT INTO product_list 
            (product_id, product, remarks, no_of_eggs, egg_tray_used, status) 
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const result = await this.db.query(query, [
            product_id, 
            product, 
            remarks, 
            no_of_eggs === '' ? 0 : no_of_eggs, 
            egg_tray_used === '' ? 0 : egg_tray_used, 
            status
        ]);
        return result;
    }

    async updateProduct(productId, productData) {
        const { product, remarks, no_of_eggs, egg_tray_used, status } = productData;
        const query = `
            UPDATE product_list 
            SET product = $2, remarks = $3, no_of_eggs = $4, egg_tray_used = $5, status = $6 
            WHERE product_id = $1
        `;
        const result = await this.db.query(query, [
            productId, 
            product, 
            remarks, 
            no_of_eggs === '' ? 0 : no_of_eggs, 
            egg_tray_used === '' ? 0 : egg_tray_used, 
            status
        ]);
        return result;
    }

    async deleteProduct(productId) {
        const query = 'DELETE FROM product_list WHERE product_id = $1';
        const result = await this.db.query(query, [productId]);
        return result;
    }

    async getNextProductId() {
        const query = 'SELECT product_id FROM product_list ORDER BY id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].product_id;
            const match = lastId.match(/ProID-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1]) + 1;
                return 'ProID-' + String(nextNum).padStart(4, '0');
            }
        }
        return 'ProID-0001';
    }

    async getActiveCustomers() {
        const query = 'SELECT customer_id, company FROM customer_list WHERE status = $1 ORDER BY company ASC';
        const result = await this.db.query(query, ['Active']);
        return result;
    }

    async getNextPriceChangeId() {
        const query = 'SELECT transaction_id FROM price_changes ORDER BY created_at DESC LIMIT 1';
        const result = await this.db.query(query);
        let nextNum = 1;
        if (result.rows.length > 0) {
            const lastId = result.rows[0].transaction_id || '';
            const match = lastId.match(/(\d+)$/);
            if (match) {
                nextNum = parseInt(match[1], 10) + 1;
            }
        }
        return 'EPCh-' + String(nextNum).padStart(6, '0');
    }

    async savePriceChange(priceData) {
        const { transaction_id, date, customer, product, old_price, new_price } = priceData;
        const query = `
            INSERT INTO price_changes 
            (transaction_id, date, customer, product, old_price, new_price) 
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        try {
            const result = await this.db.query(query, [transaction_id, date, customer, product, old_price, new_price]);
            return result;
        } catch (error) {
            console.error('Failed to save price change:', { transaction_id, date, customer, product, old_price, new_price, error: error.message });
            throw error;
        }
    }

    async getAllPriceChanges() {
        const query = 'SELECT * FROM price_changes ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result;
    }

    async getLastPriceChange(customer, product) {
        const query = `
            SELECT new_price AS old_price, created_at AS date 
            FROM price_changes 
            WHERE customer = $1 AND product = $2 
            ORDER BY id DESC 
            LIMIT 1
        `;
        const result = await this.db.query(query, [customer, product]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    async getPriceHistory(filters) {
        const { customer, products, dateFrom, dateTo } = filters;
        let query = 'SELECT * FROM price_history_chart WHERE 1=1';
        const params = [];
        let paramCount = 0;

        if (customer) {
            paramCount++;
            query += ` AND customer = $${paramCount}`;
            params.push(customer);
        }
        if (products && products.length > 0) {
            paramCount++;
            query += ` AND product = ANY($${paramCount}::text[])`;
            params.push(products);
        }
        if (dateFrom) {
            paramCount++;
            query += ` AND date >= $${paramCount}`;
            params.push(dateFrom);
        }
        if (dateTo) {
            paramCount++;
            query += ` AND date <= $${paramCount}`;
            params.push(dateTo);
        }
        query += ' ORDER BY date ASC';

        const result = await this.db.query(query, params);
        return result.rows;
    }

    async getCustomerPriceToday(filters) {
        const { customer, products } = filters;
        let query = 'SELECT * FROM customer_price_today WHERE 1=1';
        const params = [];
        let paramCount = 0;

        if (customer) {
            paramCount++;
            query += ` AND customer = $${paramCount}`;
            params.push(customer);
        }
        if (products && products.length > 0) {
            paramCount++;
            query += ` AND product = ANY($${paramCount}::text[])`;
            params.push(products);
        }
        query += ' ORDER BY product ASC';

        const result = await this.db.query(query, params);
        return result.rows;
    }

    async syncCustomerPriceToday() {
        const query = `
            WITH latest_prices AS (
                SELECT DISTINCT ON (customer, product)
                    customer,
                    product,
                    new_price AS price
                FROM price_changes
                ORDER BY customer, product, date DESC
            )
            INSERT INTO customer_price_today (customer, product, price, last_updated)
            SELECT customer, product, price, CURRENT_TIMESTAMP
            FROM latest_prices
            ON CONFLICT (customer, product) 
            DO UPDATE SET 
                price = EXCLUDED.price,
                last_updated = EXCLUDED.last_updated
        `;
        const result = await this.db.query(query);
        return result.rowCount;
    }
}

module.exports = ProductListController;
