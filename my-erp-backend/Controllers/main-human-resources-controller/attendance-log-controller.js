const pool = require('../../config/database');

class AttendanceLogController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async searchActiveEmployees(query) {
        const term = `%${query}%`;
        const sql = `
            SELECT employee_id, last_name, first_name
            FROM employee_profile
            WHERE employment_status = 'Active'
              AND (
                last_name ILIKE $1
                OR first_name ILIKE $1
                OR employee_id ILIKE $1
              )
            ORDER BY last_name, first_name
            LIMIT 20
        `;
        const result = await this.db.query(sql, [term]);
        return result.rows;
    }

    async getEmployeeById(employeeId) {
        const query = `
            SELECT ep.employee_id, ep.last_name, ep.first_name, ec.shift_policy
            FROM employee_profile ep
            LEFT JOIN employee_compensation ec ON ec.employee_id = ep.employee_id
            WHERE ep.employee_id = $1
            ORDER BY ec.created_at DESC
            LIMIT 1
        `;
        const result = await this.db.query(query, [employeeId]);
        return result.rows[0];
    }

    async saveAttendanceLog(logs) {
        if (!logs.length) return [];

        const uniqueEmployees = [...new Set(logs.map(log => log.employee_id).filter(Boolean))];
        const missingShiftPolicy = [];
        
        for (const empId of uniqueEmployees) {
            const emp = await this.getEmployeeById(empId);
            if (!emp || !emp.shift_policy) {
                missingShiftPolicy.push(empId);
            }
        }

        if (missingShiftPolicy.length > 0) {
            throw new Error(`The following employees do not have a shift policy assigned: ${missingShiftPolicy.join(', ')}`);
        }

        const employeeId = logs[0].employee_id;
        const dates = logs.map(log => log.date).filter(Boolean);
        if (dates.length) {
            const placeholders = dates.map((_, idx) => `$${idx + 1}`).join(', ');
            await this.db.query(
                `DELETE FROM attendance_log WHERE employee_id = $${dates.length + 1} AND date IN (${placeholders})`,
                [...dates, employeeId]
            );
        }

        const values = [];
        const placeholders = [];
        let paramIndex = 1;

        for (const log of logs) {
            placeholders.push(
                `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, $${paramIndex + 5}, $${paramIndex + 6}, $${paramIndex + 7}, $${paramIndex + 8}, $${paramIndex + 9}, $${paramIndex + 10}, $${paramIndex + 11}, $${paramIndex + 12}, $${paramIndex + 13}, $${paramIndex + 14}, $${paramIndex + 15})`
            );
            values.push(
                log.employee_id,
                log.date || null,
                log.time_in || null,
                log.first_coffee_break_in || null,
                log.first_coffee_break_out || null,
                log.mid_day_break_in || null,
                log.mid_day_break_out || null,
                log.second_coffee_break_in || null,
                log.second_coffee_break_out || null,
                log.time_out || null,
                log.total_late_minutes || 0,
                log.total_early_out_minutes || 0,
                log.total_deductable_time || 0,
                log.actual_payable_hours || 0,
                null,
                log.status || 'Pending'
            );
            paramIndex += 16;
        }

        const sql = `
            INSERT INTO attendance_log
            (employee_id, date, time_in, first_coffee_break_in, first_coffee_break_out, mid_day_break_in, mid_day_break_out, second_coffee_break_in, second_coffee_break_out, time_out, total_late_minutes, total_early_out_minutes, total_deductable_time, actual_payable_hours, created_by, status)
            VALUES ${placeholders.join(', ')}
            RETURNING *
        `;

        const result = await this.db.query(sql, values);
        return result.rows;
    }

    async getShiftPolicyByType(shiftPolicy) {
        if (!shiftPolicy) return null;
        const query = `
            SELECT *
            FROM shift_policy
            WHERE (shift_policy_id = $1 OR shift_name = $1)
              AND status = 'Active'
            LIMIT 1
        `;
        const result = await this.db.query(query, [shiftPolicy]);
        return result.rows[0];
    }

    async getPendingAttendanceLogs() {
        const query = `
            SELECT 
                al.attendance_id,
                al.employee_id,
                al.date,
                al.time_in,
                al.time_out,
                al.total_late_minutes,
                al.total_early_out_minutes,
                al.total_deductable_time,
                al.actual_payable_hours,
                al.status,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                COALESCE(al.created_by, '') AS created_by
            FROM attendance_log al
            LEFT JOIN employee_profile ep ON ep.employee_id = al.employee_id
            WHERE al.status = 'Pending'
            ORDER BY al.date DESC, al.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getAllAttendanceLogs() {
        const query = `
            SELECT 
                al.attendance_id,
                al.employee_id,
                al.date,
                al.time_in,
                al.time_out,
                al.total_late_minutes,
                al.total_early_out_minutes,
                al.total_deductable_time,
                al.actual_payable_hours,
                al.status,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                COALESCE(al.created_by, '') AS created_by
            FROM attendance_log al
            LEFT JOIN employee_profile ep ON ep.employee_id = al.employee_id
            ORDER BY al.date DESC, al.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async approveAttendanceLog(attendanceId) {
        const query = `
            UPDATE attendance_log
            SET status = 'Approved', updated_at = CURRENT_TIMESTAMP
            WHERE attendance_id = $1 AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [attendanceId]);
        return result.rows[0];
    }

    async rejectAttendanceLog(attendanceId) {
        const query = `
            UPDATE attendance_log
            SET status = 'Rejected', updated_at = CURRENT_TIMESTAMP
            WHERE attendance_id = $1 AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [attendanceId]);
        return result.rows[0];
    }

    async bulkApproveAttendanceLogs(attendanceIds) {
        if (!attendanceIds || attendanceIds.length === 0) return { approved: [], skipped: [] };
        const query = `
            UPDATE attendance_log
            SET status = 'Approved', updated_at = CURRENT_TIMESTAMP
            WHERE attendance_id = ANY($1::text[]) AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [attendanceIds]);
        const approvedIds = new Set(result.rows.map(r => r.attendance_id));
        const skipped = attendanceIds.filter(id => !approvedIds.has(id)).map(id => ({ attendance_id: id, reason: 'Not pending' }));
        return { approved: result.rows, skipped };
    }

    async bulkRejectAttendanceLogs(attendanceIds) {
        if (!attendanceIds || attendanceIds.length === 0) return { rejected: [], skipped: [] };
        const query = `
            UPDATE attendance_log
            SET status = 'Rejected', updated_at = CURRENT_TIMESTAMP
            WHERE attendance_id = ANY($1::text[]) AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [attendanceIds]);
        const rejectedIds = new Set(result.rows.map(r => r.attendance_id));
        const skipped = attendanceIds.filter(id => !rejectedIds.has(id)).map(id => ({ attendance_id: id, reason: 'Not pending' }));
        return { rejected: result.rows, skipped };
    }
}

module.exports = AttendanceLogController;
