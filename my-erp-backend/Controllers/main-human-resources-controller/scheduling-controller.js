class SchedulingController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getSchedulesByFilters({ orgUnit, startDate, endDate }) {
        const conditions = [];
        const params = [];
        let index = 1;

        if (orgUnit) {
            conditions.push(`org_unit = $${index}`);
            params.push(orgUnit);
            index++;
        }

        if (startDate) {
            conditions.push(`schedule_date >= $${index}`);
            params.push(startDate);
            index++;
        }

        if (endDate) {
            conditions.push(`schedule_date <= $${index}`);
            params.push(endDate);
            index++;
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
        const query = `
            SELECT es.*, ep.employee_id, ep.last_name, ep.first_name, ep.middle_name
            FROM employee_schedule es
            LEFT JOIN employee_profile ep ON es.employee_id = ep.employee_id
            ${whereClause}
            ORDER BY es.schedule_date ASC, es.created_at ASC
        `;
        const result = await this.db.query(query, params);
        return result.rows;
    }

    async getScheduleById(scheduleId) {
        const query = 'SELECT * FROM employee_schedule WHERE schedule_id = $1';
        const result = await this.db.query(query, [scheduleId]);
        return result.rows[0];
    }

    async addSchedule(scheduleData) {
        const {
            schedule_id,
            employee_id,
            org_unit,
            schedule_date,
            half_month,
            status
        } = scheduleData;

        const query = `
            INSERT INTO employee_schedule
            (schedule_id, employee_id, org_unit, schedule_date, half_month, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        try {
            const result = await this.db.query(query, [
                schedule_id,
                employee_id,
                org_unit,
                schedule_date,
                half_month,
                status || 'Active'
            ]);
            return result.rows[0];
        } catch (err) {
            if (err.code === '23505') {
                const existing = await this.db.query(
                    'SELECT * FROM employee_schedule WHERE employee_id = $1 AND schedule_date = $2 AND org_unit = $3',
                    [employee_id, schedule_date, org_unit]
                );
                if (existing.rows.length > 0) {
                    const conflictErr = new Error('Schedule assignment already exists');
                    conflictErr.status = 409;
                    throw conflictErr;
                }
            }
            throw err;
        }
    }

    async updateSchedule(scheduleId, scheduleData) {
        const allowedFields = [
            'employee_id', 'org_unit', 'schedule_date', 'half_month', 'status'
        ];
        const updates = [];
        const values = [scheduleId];
        let index = 2;

        allowedFields.forEach(field => {
            if (scheduleData[field] !== undefined && scheduleData[field] !== null && scheduleData[field] !== '') {
                updates.push(`${field} = $${index}`);
                values.push(scheduleData[field]);
                index++;
            }
        });

        if (updates.length === 0) {
            return await this.getScheduleById(scheduleId);
        }

        updates.push('updated_at = CURRENT_TIMESTAMP');
        const query = `UPDATE employee_schedule SET ${updates.join(', ')} WHERE schedule_id = $1 RETURNING *`;
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async deleteSchedule(scheduleId) {
        const query = 'DELETE FROM employee_schedule WHERE schedule_id = $1';
        const result = await this.db.query(query, [scheduleId]);
        return result;
    }

    async getNextScheduleId() {
        const query = 'SELECT schedule_id FROM employee_schedule ORDER BY schedule_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].schedule_id;
            const match = lastId.match(/Sch-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'Sch-' + String(nextNum).padStart(4, '0');
            }
        }
        return 'Sch-0001';
    }
}

module.exports = SchedulingController;
