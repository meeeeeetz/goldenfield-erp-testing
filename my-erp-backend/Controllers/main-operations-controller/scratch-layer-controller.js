const pool = require('../../config/database');

function parseRowData(raw) {
    if (Array.isArray(raw)) return raw;
    if (typeof raw !== 'string') return [];
    try {
        let parsed = JSON.parse(raw);
        while (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
        }
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

class ScratchLayerController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAll() {
        const query = 'SELECT * FROM scratch_layer_data ORDER BY updated_at DESC';
        const result = await this.db.query(query);
        return result.rows.map(row => ({
            ...row,
            row_data: parseRowData(row.row_data)
        }));
    }

    async getById(id) {
        const query = 'SELECT * FROM scratch_layer_data WHERE id = $1';
        const result = await this.db.query(query, [id]);
        const row = result.rows[0];
        if (!row) return null;
        return {
            ...row,
            row_data: parseRowData(row.row_data)
        };
    }

    async create(data) {
        const { name, row_data } = data;
        const query = `
            INSERT INTO scratch_layer_data (name, row_data)
            VALUES ($1, $2)
            RETURNING *
        `;
        const result = await this.db.query(query, [name || 'Untitled', JSON.stringify(row_data || [])]);
        return result.rows[0];
    }

    async update(id, data) {
        const { name, row_data } = data;
        const updates = [];
        const values = [];
        let counter = 1;

        if (name !== undefined) { updates.push(`name = $${counter++}`); values.push(name || 'Untitled'); }
        if (row_data !== undefined) { updates.push(`row_data = $${counter++}`); values.push(JSON.stringify(row_data)); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        const query = `
            UPDATE scratch_layer_data
            SET ${updates.join(', ')}
            WHERE id = $${counter}
            RETURNING *
        `;
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM scratch_layer_data WHERE id = $1 RETURNING *';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = ScratchLayerController;
