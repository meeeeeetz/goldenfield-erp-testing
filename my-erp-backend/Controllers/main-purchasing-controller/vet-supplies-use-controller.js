const pool = require('../../config/database');

class VetSuppliesUseController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getNextUseId() {
        const query = "SELECT MAX(CAST(SUBSTRING(use_id FROM '\\d+') AS INTEGER)) as max_num FROM vet_supplies_use";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'VeSuUseID-' + (maxNum + 1);
    }

    async getAllUseRecords(search = '') {
        let query = 'SELECT * FROM vet_supplies_use';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE use_id ILIKE $${counter++} OR item ILIKE $${counter++} OR building ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY date DESC, created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getUseRecordById(id) {
        const query = 'SELECT * FROM vet_supplies_use WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async addUseRecord(recordData) {
        const { use_id, date, building, product_id, item, category, unit, quantity, prepared_by, use_time, status } = recordData;
        const query = `
            INSERT INTO vet_supplies_use 
            (use_id, date, building, product_id, item, category, unit, quantity, prepared_by, use_time, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            use_id,
            date,
            building,
            product_id,
            item,
            category || null,
            unit || null,
            parseInt(quantity) || 0,
            prepared_by || null,
            use_time || null,
            status || 'Pending'
        ]);
        return result.rows[0];
    }

    async bulkAddUseRecords(records) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            const results = [];

            for (const record of records) {
                const nextIdResult = await client.query("SELECT MAX(CAST(SUBSTRING(use_id FROM '\\d+') AS INTEGER)) as max_num FROM vet_supplies_use");
                const maxNum = nextIdResult.rows[0]?.max_num || 0;
                const useId = 'VeSuUseID-' + (maxNum + 1);

                const result = await client.query(
                    `INSERT INTO vet_supplies_use 
                    (use_id, date, building, product_id, item, category, unit, quantity, prepared_by, use_time, status) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                    RETURNING *`,
                    [
                        useId,
                        record.date,
                        record.building,
                        record.product_id,
                        record.item,
                        record.category || null,
                        record.unit || null,
                        parseInt(record.quantity) || 0,
                        record.prepared_by || null,
                        record.use_time || null,
                        record.status || 'Pending'
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
}

module.exports = VetSuppliesUseController;
