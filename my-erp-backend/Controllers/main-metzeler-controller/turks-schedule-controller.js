class TurksScheduleController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getSchedulesByDateRange(dateStart, dateEnd) {
        const query = `
            SELECT 
                ts.id,
                ts.branch_code,
                ts.schedule_date,
                ts.day_of_week,
                ts.pax,
                ts.created_by,
                ts.created_at,
                ts.updated_at,
                tb.branch_name
            FROM turks_schedules ts
            LEFT JOIN turks_branches tb ON ts.branch_code = tb.branch_code
            WHERE ts.schedule_date BETWEEN $1 AND $2
            ORDER BY ts.schedule_date, tb.branch_name
        `;
        const result = await this.db.query(query, [dateStart, dateEnd]);
        return result.rows;
    }

    async saveSchedules(scheduleData, createdBy) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            
            const saved = [];
            for (const item of scheduleData) {
                const query = `
                    INSERT INTO turks_schedules (branch_code, schedule_date, day_of_week, pax, created_by)
                    VALUES ($1, $2, $3, $4, $5)
                    ON CONFLICT (branch_code, schedule_date) 
                    DO UPDATE SET pax = EXCLUDED.pax, updated_at = CURRENT_TIMESTAMP
                    RETURNING *
                `;
                const result = await client.query(query, [item.branch_code, item.date, item.day_of_week, item.pax, createdBy || null]);
                saved.push(result.rows[0]);
            }
            
            await client.query('COMMIT');
            return saved;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async deleteSchedule(id) {
        const query = 'DELETE FROM turks_schedules WHERE id = $1 RETURNING *';
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }
}

module.exports = TurksScheduleController;