class MetzelerPrintController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllTemplates() {
        const query = 'SELECT id, filename, created_at, updated_at FROM metzeler_print_templates ORDER BY updated_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getTemplateById(id) {
        const query = 'SELECT * FROM metzeler_print_templates WHERE id = $1';
        const result = await this.db.query(query, [id]);
        const row = result.rows[0];
        if (!row) return null;
        let payload = row.content_payload;
        if (typeof payload === 'string') {
            try { payload = JSON.parse(payload); } catch (e) { payload = {}; }
        }
        return { ...row, content_payload: payload };
    }

    async createTemplate({ filename, content_payload }) {
        const query = `
            INSERT INTO metzeler_print_templates (filename, content_payload)
            VALUES ($1, $2)
            RETURNING *
        `;
        const result = await this.db.query(query, [filename || 'Untitled', JSON.stringify(content_payload || {})]);
        return result.rows[0];
    }

    async updateTemplate(id, { filename, content_payload }) {
        const updates = [];
        const values = [];
        let counter = 1;

        if (filename !== undefined) { updates.push(`filename = $${counter++}`); values.push(filename || 'Untitled'); }
        if (content_payload !== undefined) { updates.push(`content_payload = $${counter++}`); values.push(JSON.stringify(content_payload)); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        const query = `
            UPDATE metzeler_print_templates
            SET ${updates.join(', ')}
            WHERE id = $${counter}
            RETURNING *
        `;
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async deleteTemplate(id) {
        const query = 'DELETE FROM metzeler_print_templates WHERE id = $1 RETURNING *';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = MetzelerPrintController;
