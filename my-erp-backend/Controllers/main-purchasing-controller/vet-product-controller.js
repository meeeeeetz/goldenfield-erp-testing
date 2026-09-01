const pool = require('../../config/database');

class VetProductController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllProducts(search = '') {
        let query = `
            SELECT p.*, 
                   s.company_name
            FROM vet_products p
            LEFT JOIN vet_suppliers s ON p.supplier_id = s.supplier_id
        `;
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE p.item ILIKE $${counter++} OR p.product_id ILIKE $${counter++} OR p.category ILIKE $${counter++} OR s.company_name ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY p.created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getProductById(id) {
        const query = `
            SELECT p.*, 
                   s.company_name
            FROM vet_products p
            LEFT JOIN vet_suppliers s ON p.supplier_id = s.supplier_id
            WHERE p.id = $1
        `;
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getProductByCode(productId) {
        const query = `
            SELECT p.*, 
                   s.company_name
            FROM vet_products p
            LEFT JOIN vet_suppliers s ON p.supplier_id = s.supplier_id
            WHERE p.product_id = $1
        `;
        const result = await this.db.query(query, [productId]);
        return result.rows[0];
    }

    async addProduct(productData) {
        const { product_id, supplier_id, item, generic_name, category, package_size, unit, unit_cost, discount, status, dosage_preventive_value, dosage_preventive_unit, dosage_preventive_water, dosage_treatment_value, dosage_treatment_unit, dosage_treatment_water } = productData;
        const query = `
            INSERT INTO vet_products 
            (product_id, supplier_id, item, generic_name, category, package_size, unit, unit_cost, discount, status, dosage_preventive_value, dosage_preventive_unit, dosage_preventive_water, dosage_treatment_value, dosage_treatment_unit, dosage_treatment_water) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            product_id,
            supplier_id,
            item,
            generic_name || null,
            category,
            package_size || null,
            unit,
            unit_cost || 0,
            discount || '0%',
            status || 'Active',
            dosage_preventive_value || null,
            dosage_preventive_unit || null,
            dosage_preventive_water || null,
            dosage_treatment_value || null,
            dosage_treatment_unit || null,
            dosage_treatment_water || null
        ]);
        return result.rows[0];
    }

    async updateProduct(productId, productData) {
        const { product_id, supplier_id, item, generic_name, category, package_size, unit, unit_cost, discount, status, dosage_preventive_value, dosage_preventive_unit, dosage_preventive_water, dosage_treatment_value, dosage_treatment_unit, dosage_treatment_water } = productData;
        const query = `
            UPDATE vet_products 
            SET product_id = $1, supplier_id = $2, item = $3, generic_name = $4, category = $5, package_size = $6, unit = $7, unit_cost = $8, discount = $9, status = $10, dosage_preventive_value = $11, dosage_preventive_unit = $12, dosage_preventive_water = $13, dosage_treatment_value = $14, dosage_treatment_unit = $15, dosage_treatment_water = $16, updated_at = CURRENT_TIMESTAMP
            WHERE product_id = $17
            RETURNING *
        `;
        const result = await this.db.query(query, [
            product_id,
            supplier_id,
            item,
            generic_name || null,
            category,
            package_size || null,
            unit,
            unit_cost || 0,
            discount || '0%',
            status || 'Active',
            dosage_preventive_value || null,
            dosage_preventive_unit || null,
            dosage_preventive_water || null,
            dosage_treatment_value || null,
            dosage_treatment_unit || null,
            dosage_treatment_water || null,
            productId
        ]);
        return result.rows[0];
    }

    async deleteProduct(productId) {
        const query = 'DELETE FROM vet_products WHERE product_id = $1';
        const result = await this.db.query(query, [productId]);
        return result.rowCount > 0;
    }

    async getNextProductId() {
        const query = "SELECT MAX(CAST(SUBSTRING(product_id FROM '\\d+') AS INTEGER)) as max_num FROM vet_products";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'VetProdID-' + (maxNum + 1);
    }
}

module.exports = VetProductController;
