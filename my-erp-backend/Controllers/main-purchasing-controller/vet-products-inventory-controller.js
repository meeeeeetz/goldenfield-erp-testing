const pool = require('../../config/database');

class VetProductsInventoryController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllInventory(search = '') {
        let query = 'SELECT * FROM vet_products_inventory';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE item ILIKE $${counter++} OR category ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY last_updated DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getInventoryByProductId(productId) {
        const query = 'SELECT * FROM vet_products_inventory WHERE product_id = $1';
        const result = await this.db.query(query, [productId]);
        return result.rows[0];
    }

    async addInventory(productId, quantity) {
        const productResult = await this.db.query(
            'SELECT item, category, unit FROM vet_products WHERE product_id = $1',
            [productId]
        );
        const product = productResult.rows[0];

        if (!product) {
            throw new Error('Product not found');
        }

        const query = `
            INSERT INTO vet_products_inventory (product_id, item, category, unit, quantity, last_updated)
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
            ON CONFLICT (product_id)
            DO UPDATE SET quantity = vet_products_inventory.quantity + EXCLUDED.quantity, last_updated = CURRENT_TIMESTAMP
            RETURNING *
        `;
        const result = await this.db.query(query, [
            productId,
            product.item,
            product.category,
            product.unit,
            parseInt(quantity) || 0
        ]);
        return result.rows[0];
    }

    async subtractInventory(productId, quantity) {
        const query = `
            UPDATE vet_products_inventory
            SET quantity = GREATEST(0, quantity - $2), last_updated = CURRENT_TIMESTAMP
            WHERE product_id = $1
            RETURNING *
        `;
        const result = await this.db.query(query, [productId, parseInt(quantity) || 0]);
        return result.rows[0];
    }

    async updateInventory(productId, quantity) {
        const query = `
            UPDATE vet_products_inventory
            SET quantity = $2, last_updated = CURRENT_TIMESTAMP
            WHERE product_id = $1
            RETURNING *
        `;
        const result = await this.db.query(query, [productId, parseInt(quantity) || 0]);
        return result.rows[0];
    }
}

module.exports = VetProductsInventoryController;
