class ShiftPolicyController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllShiftPolicies() {
        const query = 'SELECT * FROM shift_policy ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getActiveShiftPolicies(statusFilter) {
        let query = 'SELECT * FROM shift_policy';
        const params = [];
        if (statusFilter) {
            query += ' WHERE status = $1';
            params.push(statusFilter);
        }
        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, params);
        return result.rows;
    }

    async getShiftPolicyById(shiftPolicyId) {
        const query = 'SELECT * FROM shift_policy WHERE shift_policy_id = $1';
        const result = await this.db.query(query, [shiftPolicyId]);
        return result.rows[0];
    }

    async addShiftPolicy(shiftData) {
        const {
            shift_policy_id,
            shift_name,
            shift_time_start,
            shift_time_end,
            first_coffee_break_start,
            first_coffee_break_end,
            mid_break_start,
            mid_break_end,
            second_coffee_break_start,
            second_coffee_break_end,
            org_unit,
            remarks,
            status
        } = shiftData;
        const query = `
            INSERT INTO shift_policy
            (shift_policy_id, shift_name, shift_time_start, shift_time_end, first_coffee_break_start, first_coffee_break_end, mid_break_start, mid_break_end, second_coffee_break_start, second_coffee_break_end, org_unit, remarks, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            shift_policy_id,
            shift_name,
            shift_time_start,
            shift_time_end,
            first_coffee_break_start,
            first_coffee_break_end,
            mid_break_start,
            mid_break_end,
            second_coffee_break_start,
            second_coffee_break_end,
            org_unit,
            remarks,
            status || 'Active'
        ]);
        return result.rows[0];
    }

    async updateShiftPolicy(shiftPolicyId, shiftData) {
        const allowedFields = [
            'shift_name', 'shift_time_start', 'shift_time_end',
            'first_coffee_break_start', 'first_coffee_break_end',
            'mid_break_start', 'mid_break_end',
            'second_coffee_break_start', 'second_coffee_break_end',
            'org_unit', 'remarks', 'status'
        ];
        const updates = [];
        const values = [shiftPolicyId];
        let index = 2;
        allowedFields.forEach(field => {
            if (shiftData[field] !== undefined && shiftData[field] !== null && shiftData[field] !== '') {
                updates.push(`${field} = $${index}`);
                values.push(shiftData[field]);
                index++;
            }
        });
        if (updates.length === 0) {
            return await this.getShiftPolicyById(shiftPolicyId);
        }
        updates.push('updated_at = CURRENT_TIMESTAMP');
        const query = `UPDATE shift_policy SET ${updates.join(', ')} WHERE shift_policy_id = $1 RETURNING *`;
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async deleteShiftPolicy(shiftPolicyId) {
        const query = 'DELETE FROM shift_policy WHERE shift_policy_id = $1';
        const result = await this.db.query(query, [shiftPolicyId]);
        return result;
    }

    async getNextShiftPolicyId() {
        const query = 'SELECT shift_policy_id FROM shift_policy ORDER BY shift_policy_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].shift_policy_id;
            const match = lastId.match(/ShfPo-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'ShfPo-' + String(nextNum).padStart(4, '0');
            }
        }
        return 'ShfPo-0001';
    }
}

module.exports = ShiftPolicyController;
