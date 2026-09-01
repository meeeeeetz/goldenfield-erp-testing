const pool = require('../../config/database');

class EggTrayTypeController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllTypes(search = '') {
        let query = 'SELECT * FROM egg_tray_types';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE type_id ILIKE $${counter++}`;
            values.push(`%${search}%`);
        }

        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getTypeById(id) {
        const query = 'SELECT * FROM egg_tray_types WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getTypeByCode(typeId) {
        const query = 'SELECT * FROM egg_tray_types WHERE type_id = $1';
        const result = await this.db.query(query, [typeId]);
        return result.rows[0];
    }

    async addType(typeData) {
        const { type_id, supplier_id, price_per_piece, remarks, status } = typeData;
        const query = `
            INSERT INTO egg_tray_types 
            (type_id, supplier_id, price_per_piece, remarks, status) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            type_id,
            supplier_id,
            price_per_piece || 0,
            remarks || null,
            status || 'Active'
        ]);
        return result.rows[0];
    }

    async updateType(typeId, typeData) {
        const { type_id, supplier_id, price_per_piece, remarks, status } = typeData;
        const query = `
            UPDATE egg_tray_types 
            SET type_id = $1, supplier_id = $2, price_per_piece = $3, remarks = $4, status = $5, updated_at = CURRENT_TIMESTAMP
            WHERE type_id = $6
            RETURNING *
        `;
        const result = await this.db.query(query, [
            type_id,
            supplier_id,
            price_per_piece || 0,
            remarks || null,
            status || 'Active',
            typeId
        ]);
        return result.rows[0];
    }

    async deleteType(typeId) {
        const query = 'DELETE FROM egg_tray_types WHERE type_id = $1';
        const result = await this.db.query(query, [typeId]);
        return result.rowCount > 0;
    }

    async getNextTypeId() {
        const query = "SELECT MAX(CAST(SUBSTRING(type_id FROM '\\d+') AS INTEGER)) as max_num FROM egg_tray_types";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'EgTraTyID-' + (maxNum + 1);
    }

    async getActiveSuppliers() {
        const query = 'SELECT supplier_id, company_name FROM egg_tray_suppliers WHERE status = $1 ORDER BY company_name ASC';
        const result = await this.db.query(query, ['Active']);
        return result.rows;
    }
}

module.exports = EggTrayTypeController;
