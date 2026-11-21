class TurksEmployeeController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllEmployees() {
        const query = `
            SELECT 
                te.id,
                te.employee_code,
                te.employee_name,
                te.employee_department,
                te.status,
                te.created_by,
                te.created_at,
                te.updated_at
            FROM turks_employees te
            ORDER BY te.updated_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getEmployeeById(id) {
        const query = `
            SELECT 
                te.id,
                te.employee_code,
                te.employee_name,
                te.employee_department,
                te.status,
                te.created_by,
                te.created_at,
                te.updated_at
            FROM turks_employees te
            WHERE te.id = $1
        `;
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }

    async getEmployeeByCode(employeeCode) {
        const query = `
            SELECT 
                te.id,
                te.employee_code,
                te.employee_name,
                te.employee_department,
                te.status,
                te.created_by,
                te.created_at,
                te.updated_at
            FROM turks_employees te
            WHERE te.employee_code = $1
        `;
        const result = await this.db.query(query, [employeeCode]);
        return result.rows[0] || null;
    }

    async searchEmployees(query) {
        const searchQuery = `
            SELECT 
                te.id,
                te.employee_code,
                te.employee_name,
                te.employee_department,
                te.status,
                te.created_by,
                te.created_at,
                te.updated_at
            FROM turks_employees te
            WHERE te.employee_code ILIKE $1 OR te.employee_name ILIKE $1
            ORDER BY te.updated_at DESC
            LIMIT 20
        `;
        const result = await this.db.query(searchQuery, [`%${query}%`]);
        return result.rows;
    }

    async createEmployee({ employee_code, employee_name, employee_department, created_by }) {
        const query = `
            INSERT INTO turks_employees (employee_code, employee_name, employee_department, created_by)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await this.db.query(query, [employee_code, employee_name, employee_department, created_by || null]);
        return result.rows[0];
    }

    async updateEmployee(id, { employee_name, employee_department, status }) {
        const updates = [];
        const values = [];
        let counter = 1;

        if (employee_name !== undefined) { updates.push(`employee_name = $${counter++}`); values.push(employee_name); }
        if (employee_department !== undefined) { updates.push(`employee_department = $${counter++}`); values.push(employee_department); }
        if (status !== undefined) { updates.push(`status = $${counter++}`); values.push(status); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        if (updates.length === 1) {
            return null;
        }

        const query = `
            UPDATE turks_employees
            SET ${updates.join(', ')}
            WHERE id = $${counter}
            RETURNING *
        `;
        const result = await this.db.query(query, values);
        return result.rows[0] || null;
    }

    async deleteEmployee(id) {
        const query = 'DELETE FROM turks_employees WHERE id = $1 RETURNING *';
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }

    async getNextEmployeeCode() {
        const query = `
            SELECT employee_code FROM turks_employees 
            WHERE employee_code LIKE 'TuEmpID-%' 
            ORDER BY id DESC LIMIT 1
        `;
        const result = await this.db.query(query);
        if (result.rows.length === 0) {
            return 'TuEmpID-1';
        }
        const lastCode = result.rows[0].employee_code;
        const lastNumber = parseInt(lastCode.replace('TuEmpID-', ''), 10);
        return `TuEmpID-${lastNumber + 1}`;
    }
}

module.exports = TurksEmployeeController;