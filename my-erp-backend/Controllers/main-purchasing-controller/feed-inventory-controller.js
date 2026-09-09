const pool = require('../../config/database');

class FeedInventoryController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getNextFeedUseId() {
        const result = await this.db.query("SELECT nextval('feed_inventory_feed_use_id_seq') as next_num");
        const nextNum = result.rows[0]?.next_num || 1;
        return 'FeConID-' + nextNum;
    }

    async addFeedInventoryItem(itemData) {
        const { feed_use_id, source_type, building_tracking_receipt, category, unit, quantity, driver, feed_time, status, created_by } = itemData;

        const numericQuantity = parseFloat(quantity);
        if (isNaN(numericQuantity) || numericQuantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        const signedQuantity = source_type === 'consumption' ? -Math.abs(numericQuantity) : Math.abs(numericQuantity);
        const now = new Date().toISOString();

        const query = `
            INSERT INTO feed_inventory 
            (feed_use_id, source_type, building_tracking_receipt, category, unit, quantity, driver, feed_time, status, created_by, created_at, updated_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            feed_use_id,
            source_type,
            building_tracking_receipt,
            category,
            unit || 'Kilos',
            signedQuantity,
            driver || null,
            feed_time || null,
            status || 'Pending',
            created_by || null,
            now,
            now
        ]);
        return result.rows[0];
    }

    async bulkAddFeedInventory(rows) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const results = [];

            for (const row of rows) {
                const nextNumResult = await client.query("SELECT nextval('feed_inventory_feed_use_id_seq') as next_num");
                const feedUseId = 'FeConID-' + nextNumResult.rows[0].next_num;

                const quantity = parseFloat(row.quantity);
                if (isNaN(quantity) || quantity <= 0) {
                    throw new Error('Quantity must be greater than 0 for all rows');
                }

                const signedQuantity = row.source_type === 'consumption' ? -Math.abs(quantity) : Math.abs(quantity);

                const result = await client.query(
                    `INSERT INTO feed_inventory 
                     (feed_use_id, source_type, building_tracking_receipt, category, unit, quantity, driver, feed_time, status, created_by, created_at, updated_at) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                     RETURNING *`,
                    [
                        feedUseId,
                        row.source_type,
                        row.building_tracking_receipt,
                        row.category,
                        row.unit || 'Kilos',
                        signedQuantity,
                        row.driver || null,
                        row.feed_time || null,
                        row.status || 'Pending',
                        row.created_by || null,
                        new Date().toISOString(),
                        new Date().toISOString()
                    ]
                );

                results.push(result.rows[0]);
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

    async getFeedInventorySummary() {
        const query = 'SELECT * FROM feed_inventory_summary';
        const result = await this.db.query(query);
        return result.rows;
    }
}

module.exports = FeedInventoryController;
