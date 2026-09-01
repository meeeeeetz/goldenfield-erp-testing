const pool = require('../../config/database');

class CodeOfConductController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllCodeOfConduct(searchQuery, statusFilter) {
        const conditions = [];
        const params = [];
        let idx = 1;

        if (searchQuery) {
            conditions.push(`(coc_code ILIKE $${idx} OR title ILIKE $${idx} OR category ILIKE $${idx} OR remarks ILIKE $${idx})`);
            params.push(`%${searchQuery}%`);
            idx++;
        }

        if (statusFilter) {
            conditions.push(`status = $${idx}`);
            params.push(statusFilter);
            idx++;
        }

        const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
        const sql = `SELECT * FROM code_of_conduct ${whereClause} ORDER BY created_at DESC`;
        const result = await this.db.query(sql, params);
        return result.rows;
    }

    async getCodeOfConductById(cocId) {
        const query = 'SELECT * FROM code_of_conduct WHERE coc_id = $1';
        const result = await this.db.query(query, [cocId]);
        return result.rows[0];
    }

    async getCodeOfConductByCode(cocCode) {
        const query = 'SELECT * FROM code_of_conduct WHERE coc_code = $1';
        const result = await this.db.query(query, [cocCode]);
        return result.rows[0];
    }

    async getNextCocId() {
        const query = 'SELECT coc_code FROM code_of_conduct ORDER BY coc_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastCode = result.rows[0].coc_code;
            const match = lastCode.match(/COCID-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'COCID-' + String(nextNum).padStart(7, '0');
            }
        }
        return 'COCID-0000001';
    }

    async addCodeOfConduct(data) {
        const { coc_code, category, title, remarks, status } = data;
        const query = `
            INSERT INTO code_of_conduct (coc_code, category, title, remarks, status, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *
        `;
        const result = await this.db.query(query, [coc_code, category, title, remarks, status]);
        return result.rows[0];
    }

    async updateCodeOfConduct(cocId, data) {
        const { category, title, remarks, status } = data;
        const query = `
            UPDATE code_of_conduct
            SET category = $1, title = $2, remarks = $3, status = $4, updated_at = CURRENT_TIMESTAMP
            WHERE coc_id = $5
            RETURNING *
        `;
        const result = await this.db.query(query, [category, title, remarks, status, cocId]);
        return result.rows[0];
    }

    async deleteCodeOfConduct(cocId) {
        const query = 'DELETE FROM code_of_conduct WHERE coc_id = $1';
        const result = await this.db.query(query, [cocId]);
        return result;
    }
}

module.exports = CodeOfConductController;
