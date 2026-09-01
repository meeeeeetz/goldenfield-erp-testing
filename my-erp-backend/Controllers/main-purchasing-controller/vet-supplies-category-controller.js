const pool = require('../../config/database');

class VetSuppliesCategoryController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllCategories() {
        const query = 'SELECT * FROM vet_supplies_categories ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getCategoryById(id) {
        const query = 'SELECT * FROM vet_supplies_categories WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getCategoryByCode(categoryId) {
        const query = 'SELECT * FROM vet_supplies_categories WHERE category_id = $1';
        const result = await this.db.query(query, [categoryId]);
        return result.rows[0];
    }

    async addCategory(categoryData) {
        const { category_id, category_name, created_by } = categoryData;
        const query = `
            INSERT INTO vet_supplies_categories 
            (category_id, category_name, created_by) 
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            category_id,
            category_name,
            created_by || null
        ]);
        return result.rows[0];
    }

    async updateCategory(categoryId, categoryData) {
        const { category_id, category_name, created_by } = categoryData;
        const query = `
            UPDATE vet_supplies_categories 
            SET category_id = $1, category_name = $2, created_by = $3
            WHERE category_id = $4
            RETURNING *
        `;
        const result = await this.db.query(query, [
            category_id,
            category_name,
            created_by || null,
            categoryId
        ]);
        return result.rows[0];
    }

    async deleteCategory(categoryId) {
        const query = 'DELETE FROM vet_supplies_categories WHERE category_id = $1';
        const result = await this.db.query(query, [categoryId]);
        return result.rowCount > 0;
    }

    async getNextCategoryId() {
        const query = "SELECT MAX(CAST(SUBSTRING(category_id FROM '\\d+') AS INTEGER)) as max_num FROM vet_supplies_categories";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'VeSuCatID-' + (maxNum + 1);
    }
}

module.exports = VetSuppliesCategoryController;
