class TurksBranchController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllBranches() {
        const query = `
            SELECT 
                tb.id,
                tb.branch_code,
                tb.branch_name,
                tb.branch_location,
                tb.status,
                tb.created_by,
                tb.created_at,
                tb.updated_at
            FROM turks_branches tb
            ORDER BY tb.updated_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getBranchById(id) {
        const query = `
            SELECT 
                tb.id,
                tb.branch_code,
                tb.branch_name,
                tb.branch_location,
                tb.status,
                tb.created_by,
                tb.created_at,
                tb.updated_at
            FROM turks_branches tb
            WHERE tb.id = $1
        `;
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }

    async getBranchByCode(branchCode) {
        const query = `
            SELECT 
                tb.id,
                tb.branch_code,
                tb.branch_name,
                tb.branch_location,
                tb.status,
                tb.created_by,
                tb.created_at,
                tb.updated_at
            FROM turks_branches tb
            WHERE tb.branch_code = $1
        `;
        const result = await this.db.query(query, [branchCode]);
        return result.rows[0] || null;
    }

    async searchBranches(query) {
        const searchQuery = `
            SELECT 
                tb.id,
                tb.branch_code,
                tb.branch_name,
                tb.branch_location,
                tb.status,
                tb.created_by,
                tb.created_at,
                tb.updated_at
            FROM turks_branches tb
            WHERE tb.branch_code ILIKE $1 OR tb.branch_name ILIKE $1
            ORDER BY tb.updated_at DESC
            LIMIT 20
        `;
        const result = await this.db.query(searchQuery, [`%${query}%`]);
        return result.rows;
    }

    async createBranch({ branch_code, branch_name, branch_location, created_by }) {
        const query = `
            INSERT INTO turks_branches (branch_code, branch_name, branch_location, created_by)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await this.db.query(query, [branch_code, branch_name, branch_location || null, created_by || null]);
        return result.rows[0];
    }

    async updateBranch(id, { branch_name, branch_location, status }) {
        const updates = [];
        const values = [];
        let counter = 1;

        if (branch_name !== undefined) { updates.push(`branch_name = $${counter++}`); values.push(branch_name); }
        if (branch_location !== undefined) { updates.push(`branch_location = $${counter++}`); values.push(branch_location); }
        if (status !== undefined) { updates.push(`status = $${counter++}`); values.push(status); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        if (updates.length === 1) {
            return null;
        }

        const query = `
            UPDATE turks_branches
            SET ${updates.join(', ')}
            WHERE id = $${counter}
            RETURNING *
        `;
        const result = await this.db.query(query, values);
        return result.rows[0] || null;
    }

    async deleteBranch(id) {
        const query = 'DELETE FROM turks_branches WHERE id = $1 RETURNING *';
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }

    async getNextBranchCode() {
        const query = `
            SELECT branch_code FROM turks_branches 
            WHERE branch_code LIKE 'TuBrID-%' 
            ORDER BY id DESC LIMIT 1
        `;
        const result = await this.db.query(query);
        if (result.rows.length === 0) {
            return 'TuBrID-1';
        }
        const lastCode = result.rows[0].branch_code;
        const lastNumber = parseInt(lastCode.replace('TuBrID-', ''), 10);
        return `TuBrID-${lastNumber + 1}`;
    }
}

module.exports = TurksBranchController;