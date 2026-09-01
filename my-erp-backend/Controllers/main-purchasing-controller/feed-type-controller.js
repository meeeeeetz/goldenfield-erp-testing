const pool = require('../../config/database');

class FeedTypeController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllFeedTypes(search = '') {
        let query = 'SELECT * FROM feed_types';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE feed_type ILIKE $${counter++}`;
            values.push(`%${search}%`);
        }

        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getFeedTypeById(id) {
        const query = 'SELECT * FROM feed_types WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getFeedTypeByCode(feedTypeId) {
        const query = 'SELECT * FROM feed_types WHERE feed_type_id = $1';
        const result = await this.db.query(query, [feedTypeId]);
        return result.rows[0];
    }

    async addFeedType(feedTypeData) {
        const { feed_type_id, supplier_id, feed_type, category, unit, price, remarks, status } = feedTypeData;
        const query = `
            INSERT INTO feed_types 
            (feed_type_id, supplier_id, feed_type, category, unit, price, remarks, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            feed_type_id,
            supplier_id,
            feed_type,
            category || null,
            unit,
            price,
            remarks || null,
            status || 'Active'
        ]);
        return result.rows[0];
    }

    async updateFeedType(feedTypeId, feedTypeData) {
        const { feed_type_id, supplier_id, feed_type, category, unit, price, remarks, status } = feedTypeData;
        const query = `
            UPDATE feed_types 
            SET feed_type_id = $1, supplier_id = $2, feed_type = $3, category = $4, unit = $5, price = $6, remarks = $7, status = $8, updated_at = CURRENT_TIMESTAMP
            WHERE feed_type_id = $9
            RETURNING *
        `;
        const result = await this.db.query(query, [
            feed_type_id,
            supplier_id,
            feed_type,
            category || null,
            unit,
            price,
            remarks || null,
            status || 'Active',
            feedTypeId
        ]);
        return result.rows[0];
    }

    async deleteFeedType(feedTypeId) {
        const query = 'DELETE FROM feed_types WHERE feed_type_id = $1';
        const result = await this.db.query(query, [feedTypeId]);
        return result.rowCount > 0;
    }

    async getNextFeedTypeId() {
        const query = "SELECT MAX(CAST(SUBSTRING(feed_type_id FROM '\\d+') AS INTEGER)) as max_num FROM feed_types";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'FeTyID-' + (maxNum + 1);
    }

    async getActiveSuppliers() {
        const query = 'SELECT supplier_id, company_name FROM feeds_suppliers WHERE status = $1 ORDER BY company_name ASC';
        const result = await this.db.query(query, ['Active']);
        return result.rows;
    }
}

module.exports = FeedTypeController;
