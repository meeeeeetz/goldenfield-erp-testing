const pool = require('../../config/database');

class OvertimeLogController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async saveOvertimeLogs(logs) {
        const values = [];
        const placeholders = [];
        let paramIndex = 1;

        for (const log of logs) {
            placeholders.push(
                `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, $${paramIndex + 5}, $${paramIndex + 6}, $${paramIndex + 7})`
            );
            values.push(
                log.employee_id,
                log.date || null,
                log.time_in || null,
                log.time_out || null,
                log.total_hours || 0,
                log.remarks || null,
                'Pending',
                null
            );
            paramIndex += 8;
        }

        const sql = `
            INSERT INTO overtime_log
            (employee_id, date, time_in, time_out, total_hours, remarks, status, created_by)
            VALUES ${placeholders.join(', ')}
            RETURNING *
        `;

        const result = await this.db.query(sql, values);
        return result.rows;
    }

    async getPendingOvertimeLogs() {
        const query = `
            SELECT 
                ol.overtime_id,
                ol.employee_id,
                ol.date,
                ol.time_in,
                ol.time_out,
                ol.total_hours,
                ol.remarks,
                ol.status,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                COALESCE(ol.created_by, '') AS created_by
            FROM overtime_log ol
            LEFT JOIN employee_profile ep ON ep.employee_id = ol.employee_id
            WHERE ol.status = 'Pending'
            ORDER BY ol.date DESC, ol.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getAllOvertimeLogs() {
        const query = `
            SELECT 
                ol.overtime_id,
                ol.employee_id,
                ol.date,
                ol.time_in,
                ol.time_out,
                ol.total_hours,
                ol.remarks,
                ol.status,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                COALESCE(ol.created_by, '') AS created_by
            FROM overtime_log ol
            LEFT JOIN employee_profile ep ON ep.employee_id = ol.employee_id
            ORDER BY ol.date DESC, ol.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async approveOvertimeLog(overtimeId) {
        const query = `
            UPDATE overtime_log
            SET status = 'Approved', updated_at = CURRENT_TIMESTAMP
            WHERE overtime_id = $1 AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [overtimeId]);
        return result.rows[0];
    }

    async rejectOvertimeLog(overtimeId) {
        const query = `
            UPDATE overtime_log
            SET status = 'Rejected', updated_at = CURRENT_TIMESTAMP
            WHERE overtime_id = $1 AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [overtimeId]);
        return result.rows[0];
    }

    async bulkApproveOvertimeLogs(overtimeIds) {
        if (!overtimeIds || overtimeIds.length === 0) return { approved: [], skipped: [] };
        const query = `
            UPDATE overtime_log
            SET status = 'Approved', updated_at = CURRENT_TIMESTAMP
            WHERE overtime_id = ANY($1::text[]) AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [overtimeIds]);
        const approvedIds = new Set(result.rows.map(r => r.overtime_id));
        const skipped = overtimeIds.filter(id => !approvedIds.has(id)).map(id => ({ overtime_id: id, reason: 'Not pending' }));
        return { approved: result.rows, skipped };
    }

    async bulkRejectOvertimeLogs(overtimeIds) {
        if (!overtimeIds || overtimeIds.length === 0) return { rejected: [], skipped: [] };
        const query = `
            UPDATE overtime_log
            SET status = 'Rejected', updated_at = CURRENT_TIMESTAMP
            WHERE overtime_id = ANY($1::text[]) AND status = 'Pending'
            RETURNING *
        `;
        const result = await this.db.query(query, [overtimeIds]);
        const rejectedIds = new Set(result.rows.map(r => r.overtime_id));
        const skipped = overtimeIds.filter(id => !rejectedIds.has(id)).map(id => ({ overtime_id: id, reason: 'Not pending' }));
        return { rejected: result.rows, skipped };
    }
}

module.exports = OvertimeLogController;
