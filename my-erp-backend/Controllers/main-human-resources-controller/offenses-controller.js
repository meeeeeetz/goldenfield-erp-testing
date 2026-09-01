const pool = require('../../config/database');

class OffensesController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllOffenses() {
        const query = 'SELECT * FROM offenses ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getOffenseById(offenseId) {
        const query = 'SELECT * FROM offenses WHERE offense_id = $1';
        const result = await this.db.query(query, [offenseId]);
        return result.rows[0];
    }

    async addOffense(data) {
        const { employee_id, employee_name, offense_type, description, date_committed, severity, action_taken } = data;
        const query = `
            INSERT INTO offenses (employee_id, employee_name, offense_type, description, date_committed, severity, action_taken, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *
        `;
        const result = await this.db.query(query, [employee_id, employee_name, offense_type, description, date_committed, severity, action_taken]);
        return result.rows[0];
    }

    async deleteOffense(offenseId) {
        const query = 'DELETE FROM offenses WHERE offense_id = $1';
        const result = await this.db.query(query, [offenseId]);
        return result;
    }

    async getOffenseStats() {
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const totalQuery = 'SELECT COUNT(*) as count FROM offenses';
        const monthlyQuery = 'SELECT COUNT(*) as count FROM offenses WHERE date_committed >= $1';
        const pendingQuery = "SELECT COUNT(*) as count FROM offenses WHERE action_taken IS NULL OR action_taken = ''";

        const [totalResult, monthlyResult, pendingResult] = await Promise.all([
            this.db.query(totalQuery),
            this.db.query(monthlyQuery, [currentMonthStart]),
            this.db.query(pendingQuery)
        ]);

        return {
            total: parseInt(totalResult.rows[0].count) || 0,
            monthly: parseInt(monthlyResult.rows[0].count) || 0,
            pending: parseInt(pendingResult.rows[0].count) || 0
        };
    }

    async saveDocument(doc_type, html_content) {
        const query = `
            INSERT INTO offense_documents (doc_type, html_content, created_at, updated_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT (doc_type) 
            DO UPDATE SET html_content = EXCLUDED.html_content, updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `;
        const result = await this.db.query(query, [doc_type, html_content]);
        return result.rows[0];
    }

    async getDocument(doc_type) {
        const query = 'SELECT * FROM offense_documents WHERE doc_type = $1 ORDER BY created_at DESC LIMIT 1';
        const result = await this.db.query(query, [doc_type]);
        const row = result.rows[0] || null;
        if (row) return row;
        return { doc_type, html_content: '', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    }
}

module.exports = OffensesController;
