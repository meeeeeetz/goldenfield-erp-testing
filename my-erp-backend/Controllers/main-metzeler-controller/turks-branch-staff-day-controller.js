class TurksBranchStaffDayController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllStaffDay() {
        const query = `
            SELECT 
                tbsd.id,
                tbsd.branch_code,
                tbsd.day_of_week,
                tbsd.pax,
                tbsd.created_by,
                tbsd.created_at,
                tbsd.updated_at,
                tb.branch_name
            FROM turks_branch_staff_day tbsd
            LEFT JOIN turks_branches tb ON tbsd.branch_code = tb.branch_code
            ORDER BY tb.branch_name,
                CASE tbsd.day_of_week
                    WHEN 'Sunday' THEN 1
                    WHEN 'Monday' THEN 2
                    WHEN 'Tuesday' THEN 3
                    WHEN 'Wednesday' THEN 4
                    WHEN 'Thursday' THEN 5
                    WHEN 'Friday' THEN 6
                    WHEN 'Saturday' THEN 7
                END
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getStaffDayByBranch(branchCode) {
        const query = `
            SELECT 
                tbsd.id,
                tbsd.branch_code,
                tbsd.day_of_week,
                tbsd.pax,
                tbsd.created_by,
                tbsd.created_at,
                tbsd.updated_at,
                tb.branch_name
            FROM turks_branch_staff_day tbsd
            LEFT JOIN turks_branches tb ON tbsd.branch_code = tb.branch_code
            WHERE tbsd.branch_code = $1
            ORDER BY 
                CASE tbsd.day_of_week
                    WHEN 'Sunday' THEN 1
                    WHEN 'Monday' THEN 2
                    WHEN 'Tuesday' THEN 3
                    WHEN 'Wednesday' THEN 4
                    WHEN 'Thursday' THEN 5
                    WHEN 'Friday' THEN 6
                    WHEN 'Saturday' THEN 7
                END
        `;
        const result = await this.db.query(query, [branchCode]);
        return result.rows;
    }

    async saveStaffDay(branchCode, staffDayData, createdBy) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            
            const saved = [];
            for (const item of staffDayData) {
                const query = `
                    INSERT INTO turks_branch_staff_day (branch_code, day_of_week, pax, created_by)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (branch_code, day_of_week) 
                    DO UPDATE SET pax = EXCLUDED.pax, updated_at = CURRENT_TIMESTAMP
                    RETURNING *
                `;
                const result = await client.query(query, [branchCode, item.day_of_week, item.pax, createdBy || null]);
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

    async deleteStaffDay(id) {
        const query = 'DELETE FROM turks_branch_staff_day WHERE id = $1 RETURNING *';
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }
}

module.exports = TurksBranchStaffDayController;