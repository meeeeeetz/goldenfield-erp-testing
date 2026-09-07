const pool = require('../../config/database');

class EggProductsController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllEggProducts() {
        const query = 'SELECT * FROM egg_products ORDER BY id ASC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getEggProductById(productId) {
        const query = 'SELECT * FROM egg_products WHERE product_id = $1';
        const result = await this.db.query(query, [productId]);
        return result.rows[0];
    }

    async getNextEggProductId() {
        const query = 'SELECT product_id FROM egg_products ORDER BY id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].product_id;
            const match = lastId.match(/EgRoProID-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return `EgRoProID-${nextNum}`;
            }
        }
        return 'EgRoProID-1';
    }

    async createEggProduct(productData) {
        const { product_id, product_name, remarks, status } = productData;
        const query = `
            INSERT INTO egg_products (product_id, product_name, remarks, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            product_id,
            product_name,
            remarks || null,
            status || 'Active'
        ]);
        return result.rows[0];
    }

    async updateEggProduct(productId, productData) {
        const { product_name, remarks, status } = productData;
        const query = `
            UPDATE egg_products
            SET product_name = $1, remarks = $2, status = $3, updated_at = CURRENT_TIMESTAMP
            WHERE product_id = $4
            RETURNING *
        `;
        const result = await this.db.query(query, [
            product_name,
            remarks || null,
            status || 'Active',
            productId
        ]);
        return result.rows[0];
    }

    async deleteEggProduct(productId) {
        const query = 'DELETE FROM egg_products WHERE product_id = $1';
        const result = await this.db.query(query, [productId]);
        return result.rowCount > 0;
    }
}

module.exports = EggProductsController;
