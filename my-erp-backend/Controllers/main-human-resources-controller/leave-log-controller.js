const pool = require('../../config/database');

class LeaveLogController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async saveLeaveLogs(logs) {
        const values = [];
        const placeholders = [];
        let paramIndex = 1;

        for (const log of logs) {
            placeholders.push(
                `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, $${paramIndex + 5}, $${paramIndex + 6}, $${paramIndex + 7}, $${paramIndex + 8})`
            );
            values.push(
                log.employee_id || null,
                log.last_name || null,
                log.first_name || null,
                log.date || null,
                log.leave_type || null,
                log.total_days || 0,
                log.remarks || null,
                'Pending',
                null
            );
            paramIndex += 9;
        }

        const sql = `
            INSERT INTO leave_log
            (employee_id, last_name, first_name, date, leave_type, total_days, remarks, status, created_by)
            VALUES ${placeholders.join(', ')}
            RETURNING *
        `;

        const result = await this.db.query(sql, values);
        return result.rows;
    }

    async getPendingLeaveLogs() {
        const query = `
            SELECT 
                ll.leave_id,
                ll.employee_id,
                ll.date,
                ll.leave_type,
                ll.total_days,
                ll.remarks,
                ll.status,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                COALESCE(ll.created_by, '') AS created_by
            FROM leave_log ll
            LEFT JOIN employee_profile ep ON ep.employee_id = ll.employee_id
            WHERE ll.status = 'Pending'
            ORDER BY ll.date DESC, ll.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getAllLeaveLogs() {
        const query = `
            SELECT 
                ll.leave_id,
                ll.employee_id,
                ll.date,
                ll.leave_type,
                ll.total_days,
                ll.remarks,
                ll.status,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                COALESCE(ll.created_by, '') AS created_by
            FROM leave_log ll
            LEFT JOIN employee_profile ep ON ep.employee_id = ll.employee_id
            ORDER BY ll.date DESC, ll.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async approveLeaveLog(leaveId) {
        const query = `
            UPDATE leave_log
            SET status = 'Approved', updated_at = CURRENT_TIMESTAMP
            WHERE leave_id = $1 AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [leaveId]);
        return result.rows[0];
    }

    async rejectLeaveLog(leaveId) {
        const query = `
            UPDATE leave_log
            SET status = 'Rejected', updated_at = CURRENT_TIMESTAMP
            WHERE leave_id = $1 AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [leaveId]);
        return result.rows[0];
    }

    async getLeaveLogsByEmployee(employeeId) {
        const query = `
            SELECT leave_type, total_days, date, status
            FROM leave_log
            WHERE employee_id = $1
            ORDER BY date DESC
        `;
        const result = await this.db.query(query, [employeeId]);
        return result.rows;
    }
}

module.exports = LeaveLogController;
