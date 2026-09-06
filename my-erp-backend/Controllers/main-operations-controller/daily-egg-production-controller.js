const pool = require('../../config/database');

class DailyEggProductionController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllReports() {
        const query = `
            SELECT * FROM daily_egg_production
            ORDER BY report_date DESC, created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getReportById(reportId) {
        const query = 'SELECT * FROM daily_egg_production WHERE daily_egg_production_id = $1';
        const result = await this.db.query(query, [reportId]);
        return result.rows[0] || null;
    }

    async saveReport(reportData) {
        const {
            report_date, beginning_inventory, total_eggs_sold_today,
            weighed_nw, weighed_pw, weighed_xs, weighed_s, weighed_m, weighed_l, weighed_xl, weighed_j, weighed_others,
            unweighed_dirty, unweighed_clean, sellable_broken,
            ending_inventory, time_worked, created_by, updated_by
        } = reportData;

        const nextId = await this.getNextReportId();
        const reportId = `DaEgPrID-${String(nextId).padStart(5, '0')}`;

        const query = `
            INSERT INTO daily_egg_production 
            (daily_egg_production_id, report_date, beginning_inventory, total_eggs_sold_today,
             weighed_nw, weighed_pw, weighed_xs, weighed_s, weighed_m, weighed_l, weighed_xl, weighed_j, weighed_others,
             total_weighed, unweighed_dirty, unweighed_clean, sellable_broken,
             total_unweighed, total_broken, ending_inventory, time_worked, created_by, updated_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
            RETURNING *
        `;

        const totalWeighed = (weighed_nw || 0) + (weighed_pw || 0) + (weighed_xs || 0) + (weighed_s || 0) +
                             (weighed_m || 0) + (weighed_l || 0) + (weighed_xl || 0) + (weighed_j || 0) + (weighed_others || 0);
        const totalUnweighed = (unweighed_dirty || 0) + (unweighed_clean || 0);
        const totalBroken = totalUnweighed + (sellable_broken || 0);

        const result = await this.db.query(query, [
            reportId,
            report_date,
            beginning_inventory || 0,
            total_eggs_sold_today || 0,
            weighed_nw || 0,
            weighed_pw || 0,
            weighed_xs || 0,
            weighed_s || 0,
            weighed_m || 0,
            weighed_l || 0,
            weighed_xl || 0,
            weighed_j || 0,
            weighed_others || 0,
            totalWeighed,
            unweighed_dirty || 0,
            unweighed_clean || 0,
            sellable_broken || 0,
            totalUnweighed,
            totalBroken,
            ending_inventory || 0,
            time_worked || 0,
            created_by || null,
            updated_by || null
        ]);

        return result.rows[0];
    }

    async getNextReportId() {
        const query = 'SELECT daily_egg_production_id FROM daily_egg_production ORDER BY daily_egg_production_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].daily_egg_production_id;
            const match = lastId.match(/DaEgPrID-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return nextNum;
            }
        }
        return 1;
    }
}

module.exports = DailyEggProductionController;
