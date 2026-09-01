const fs = require('fs');
const path = require('path');

class OrganizationalStructureController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllStructure() {
        const query = 'SELECT * FROM organizational_structure ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getStructureById(orgUnitRoleId) {
        const query = 'SELECT * FROM organizational_structure WHERE org_unit_role_id = $1';
        const result = await this.db.query(query, [orgUnitRoleId]);
        return result.rows[0];
    }

    async getStructureByOrgUnit(orgUnitId) {
        const query = `
            SELECT 
                os.*,
                ep.employee_id,
                ep.last_name,
                ep.first_name,
                ep.middle_name
            FROM organizational_structure os
            LEFT JOIN employee_profile ep ON os.employee_assigned = ep.employee_id
            WHERE os.org_unit_id = $1
            ORDER BY os.created_at DESC
        `;
        const result = await this.db.query(query, [orgUnitId]);
        const rows = result.rows;
        
        const baseDir = 'C:\\Users\\ADMIN\\Documents\\uploads\\photos';
        const assignedIds = rows.map(r => r.employee_assigned).filter(Boolean);
        
        let profileMap = {};
        if (assignedIds.length > 0) {
            const profileQuery = 'SELECT employee_id, last_name, first_name, middle_name FROM employee_profile WHERE employee_id = ANY($1::text[])';
            const profileResult = await this.db.query(profileQuery, [assignedIds]);
            profileMap = profileResult.rows.reduce((acc, p) => {
                acc[p.employee_id] = p;
                return acc;
            }, {});
        }
        
        for (const row of rows) {
            const empId = row.employee_assigned;
            if (empId && profileMap[empId]) {
                const profile = profileMap[empId];
                row.employee_id = profile.employee_id;
                row.last_name = profile.last_name;
                row.first_name = profile.first_name;
                row.middle_name = profile.middle_name;
                
                const safe = (s = '') => {
                    const cleaned = String(s).trim().replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_');
                    return cleaned.replace(/^_+|_+$/g, '');
                };
                const folderName = `${safe(profile.employee_id)}_${safe(profile.last_name)}_${safe(profile.first_name)}`;
                row.folder_name = folderName;
                const folderPath = path.join(baseDir, folderName);
                let photo = null;
                try {
                    const files = await fs.promises.readdir(folderPath);
                    const match = files.find(f => {
                        const lower = f.toLowerCase();
                        return lower.startsWith(String(profile.employee_id).toLowerCase()) && lower.includes('2x2');
                    });
                    if (match) photo = match;
                } catch (e) {
                    // folder doesn't exist yet
                }
                row.photo_file_name = photo;
            } else {
                row.folder_name = null;
                row.photo_file_name = null;
            }
        }
        
        return rows;
    }

    async getRolesByOrgUnitName(orgUnitName) {
        const query = 'SELECT * FROM organizational_structure WHERE org_unit_name = $1 ORDER BY created_at DESC';
        const result = await this.db.query(query, [orgUnitName]);
        return result.rows;
    }

    async getStructureByEmployeeAssigned(employeeId) {
        const query = 'SELECT * FROM organizational_structure WHERE employee_assigned = $1 ORDER BY created_at DESC';
        const result = await this.db.query(query, [employeeId]);
        return result.rows;
    }

    async addStructure(structureData) {
        const { org_unit_role_id, org_unit_id, org_unit_name, role_title, parent_id, employee_assigned, status } = structureData;
        const query = `
            INSERT INTO organizational_structure
            (org_unit_role_id, org_unit_id, org_unit_name, role_title, parent_id, employee_assigned, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            org_unit_role_id,
            org_unit_id,
            org_unit_name,
            role_title,
            parent_id,
            employee_assigned || null,
            status
        ]);
        return result.rows[0];
    }

    async updateStructure(orgUnitRoleId, structureData) {
        const allowedFields = [
            'org_unit_id', 'org_unit_name', 'role_title', 'parent_id', 'employee_assigned', 'status'
        ];
        const updates = [];
        const values = [orgUnitRoleId];
        let index = 2;
        allowedFields.forEach(field => {
            if (structureData[field] !== undefined) {
                let value = structureData[field];
                if (value === '') value = null;
                updates.push(`${field} = $${index}`);
                values.push(value);
                index++;
            }
        });
        if (updates.length === 0) {
            return await this.getStructureById(orgUnitRoleId);
        }
        updates.push('updated_at = CURRENT_TIMESTAMP');
        const query = `UPDATE organizational_structure SET ${updates.join(', ')} WHERE org_unit_role_id = $1 RETURNING *`;
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async deleteStructure(orgUnitRoleId) {
        const query = 'DELETE FROM organizational_structure WHERE org_unit_role_id = $1';
        const result = await this.db.query(query, [orgUnitRoleId]);
        return result;
    }

    async getUnassignedRoles(orgUnitName = null) {
        let query = 'SELECT org_unit_role_id, org_unit_name, org_unit_id, role_title FROM organizational_structure WHERE employee_assigned IS NULL';
        const params = [];
        if (orgUnitName) {
            query += ' AND org_unit_name = $1';
            params.push(orgUnitName);
        }
        query += ' ORDER BY org_unit_name, org_unit_role_id';
        const result = await this.db.query(query, params);
        return result.rows;
    }

    async getActiveEmployeesByOrgUnitName(orgUnitName) {
        const query = `
            SELECT 
                os.org_unit_role_id,
                os.org_unit_id,
                os.org_unit_name,
                os.role_title,
                os.parent_id,
                os.employee_assigned,
                os.status,
                ep.employee_id,
                ep.last_name,
                ep.first_name,
                ep.middle_name
            FROM organizational_structure os
            LEFT JOIN employee_profile ep ON os.employee_assigned = ep.employee_id
            WHERE os.org_unit_name = $1 
              AND os.employee_assigned IS NOT NULL
              AND ep.employment_status = 'Active'
            ORDER BY ep.last_name ASC, ep.first_name ASC
        `;
        const result = await this.db.query(query, [orgUnitName]);
        return result.rows;
    }

    async getNextStructureId() {
        const query = 'SELECT org_unit_role_id FROM organizational_structure ORDER BY org_unit_role_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].org_unit_role_id;
            const match = lastId.match(/OrgStr-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'OrgStr-' + String(nextNum).padStart(3, '0');
            }
        }
        return 'OrgStr-001';
    }
}

module.exports = OrganizationalStructureController;
