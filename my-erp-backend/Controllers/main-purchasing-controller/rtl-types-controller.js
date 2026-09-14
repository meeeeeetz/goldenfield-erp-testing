const pool = require('../../config/database');

class RtlTypesController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllTypes(search = '') {
        let query = 'SELECT * FROM rtl_types';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE item ILIKE $${counter++} OR type_id ILIKE $${counter++} OR company ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getTypeByCode(typeId) {
        const query = 'SELECT * FROM rtl_types WHERE type_id = $1';
        const result = await this.db.query(query, [typeId]);
        return result.rows[0];
    }

    async getNextTypeId() {
        const query = "SELECT MAX(CAST(SUBSTRING(type_id FROM '\\d+') AS INTEGER)) as max_num FROM rtl_types";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'RTLTyID-' + (maxNum + 1);
    }

    async createType(typeData) {
        const { type_id, company, item, remarks, price, status } = typeData;
        const query = `
            INSERT INTO rtl_types
            (type_id, company, item, remarks, price, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [
            type_id,
            company,
            item,
            remarks || null,
            parseFloat(price) || 0,
            status || 'Active'
        ];
        try {
            const result = await this.db.query(query, values);
            return result.rows[0];
        } catch (error) {
            if (error.code === '23505' && error.constraint === 'rtl_types_pkey') {
                await this.db.query("SELECT setval('rtl_types_id_seq', COALESCE((SELECT MAX(id) FROM rtl_types), 1), (SELECT MAX(id) FROM rtl_types) IS NOT NULL)");
                const result = await this.db.query(query, values);
                return result.rows[0];
            }
            throw error;
        }
    }

    async updateType(typeId, typeData) {
        const { company, item, remarks, price, status } = typeData;
        const query = `
            UPDATE rtl_types 
            SET company = $1, item = $2, remarks = $3, price = $4, status = $5, updated_at = CURRENT_TIMESTAMP
            WHERE type_id = $6
            RETURNING *
        `;
        const result = await this.db.query(query, [
            company,
            item,
            remarks || null,
            parseFloat(price) || 0,
            status,
            typeId
        ]);
        return result.rows[0];
    }
}

module.exports = RtlTypesController;
