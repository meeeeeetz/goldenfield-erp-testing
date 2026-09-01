class OrganizationalUnitController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllUnits(status) {
        if (status) {
            const query = 'SELECT * FROM organizational_units WHERE status = $1 ORDER BY unit_name ASC';
            const result = await this.db.query(query, [status]);
            return result.rows;
        }
        const query = 'SELECT * FROM organizational_units ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getUnitById(orgUnitId) {
        const query = 'SELECT * FROM organizational_units WHERE org_unit_id = $1';
        const result = await this.db.query(query, [orgUnitId]);
        return result.rows[0];
    }

    async addUnit(unitData) {
        const { org_unit_id, unit_name, status } = unitData;
        const query = `
            INSERT INTO organizational_units
            (org_unit_id, unit_name, status)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            org_unit_id,
            unit_name,
            status
        ]);
        return result.rows[0];
    }

    async updateUnit(orgUnitId, unitData) {
        const { unit_name, status } = unitData;
        const query = `
            UPDATE organizational_units
            SET unit_name = $2, status = $3, updated_at = CURRENT_TIMESTAMP
            WHERE org_unit_id = $1
            RETURNING *
        `;
        const result = await this.db.query(query, [
            orgUnitId,
            unit_name,
            status
        ]);
        return result.rows[0];
    }

    async deleteUnit(orgUnitId) {
        const query = 'DELETE FROM organizational_units WHERE org_unit_id = $1';
        const result = await this.db.query(query, [orgUnitId]);
        return result;
    }

    async getNextUnitId() {
        const query = 'SELECT org_unit_id FROM organizational_units ORDER BY org_unit_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].org_unit_id;
            const match = lastId.match(/OrgUn-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'OrgUn-' + String(nextNum).padStart(3, '0');
            }
        }
        return 'OrgUn-001';
    }
}

module.exports = OrganizationalUnitController;
