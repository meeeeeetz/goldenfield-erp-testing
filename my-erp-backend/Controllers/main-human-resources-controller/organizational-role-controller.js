class OrganizationalRoleController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllRoles() {
        const query = 'SELECT * FROM organizational_roles ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getRoleById(roleId) {
        const query = 'SELECT * FROM organizational_roles WHERE role_id = $1';
        const result = await this.db.query(query, [roleId]);
        return result.rows[0];
    }

    async addRole(roleData) {
        const { role_id, role_name, org_unit, level, status } = roleData;
        const query = `
            INSERT INTO organizational_roles
            (role_id, role_name, org_unit, level, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            role_id,
            role_name,
            org_unit,
            level,
            status
        ]);
        return result.rows[0];
    }

    async updateRole(roleId, roleData) {
        const { role_name, org_unit, level, status } = roleData;
        const query = `
            UPDATE organizational_roles
            SET role_name = $2, org_unit = $3, level = $4, status = $5, updated_at = CURRENT_TIMESTAMP
            WHERE role_id = $1
            RETURNING *
        `;
        const result = await this.db.query(query, [
            roleId,
            role_name,
            org_unit,
            level,
            status
        ]);
        return result.rows[0];
    }

    async deleteRole(roleId) {
        const query = 'DELETE FROM organizational_roles WHERE role_id = $1';
        const result = await this.db.query(query, [roleId]);
        return result;
    }

    async getNextRoleId() {
        const query = 'SELECT role_id FROM organizational_roles ORDER BY role_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].role_id;
            const match = lastId.match(/OrgRol-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'OrgRol-' + String(nextNum).padStart(3, '0');
            }
        }
        return 'OrgRol-001';
    }
}

module.exports = OrganizationalRoleController;
