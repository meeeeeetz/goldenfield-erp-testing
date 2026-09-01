const pool = require('../../config/database');

class OnboardingDocumentsController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async saveDocument(doc_type, html_content) {
        const query = `
            INSERT INTO onboarding_documents (doc_type, html_content, created_at, updated_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT (doc_type) 
            DO UPDATE SET html_content = EXCLUDED.html_content, updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `;
        const result = await this.db.query(query, [doc_type, html_content]);
        return result.rows[0];
    }

    async getDocument(doc_type) {
        const query = 'SELECT * FROM onboarding_documents WHERE doc_type = $1 ORDER BY created_at DESC LIMIT 1';
        const result = await this.db.query(query, [doc_type]);
        const row = result.rows[0] || null;
        if (row) return row;
        return { doc_type, html_content: '', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    }
}

module.exports = OnboardingDocumentsController;
