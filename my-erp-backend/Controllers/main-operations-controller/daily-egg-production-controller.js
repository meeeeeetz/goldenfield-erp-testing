const pool = require('../../config/database');

class DailyEggProductionController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllDailyEggProductions() {
        const query = 'SELECT * FROM daily_egg_production ORDER BY date DESC, id DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getDailyEggProductionById(id) {
        const query = 'SELECT * FROM daily_egg_production WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getDailyEggProductionByProductionId(productionId) {
        const query = 'SELECT * FROM daily_egg_production WHERE production_id = $1';
        const result = await this.db.query(query, [productionId]);
        return result.rows[0];
    }

    async getDailyEggProductionByDate(date) {
        const query = 'SELECT * FROM daily_egg_production WHERE date = $1 ORDER BY id DESC LIMIT 1';
        const result = await this.db.query(query, [date]);
        return result.rows[0];
    }

    async getLatestDailyEggProduction() {
        const query = 'SELECT * FROM daily_egg_production ORDER BY date DESC, id DESC LIMIT 1';
        const result = await this.db.query(query);
        return result.rows[0];
    }

    async getNextProductionId() {
        const query = 'SELECT production_id FROM daily_egg_production ORDER BY id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].production_id;
            const match = lastId.match(/DaEggProdID-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return `DaEggProdID-${nextNum}`;
            }
        }
        return 'DaEggProdID-1';
    }

    async createDailyEggProduction(data) {
        const {
            production_id,
            date,
            e_nw, e_pw, e_xs, e_s, e_m, e_l, e_xl, e_j,
            e_broken, e_dirty, e_unweighed,
            egg_waste,
            total_eggs_sold,
            egg_production,
            s_nw, s_pw, s_xs, s_s, s_m, s_l, s_xl, s_j,
            s_broken, s_dirty, s_unweighed,
            total_hours_operated,
            created_by
        } = data;

        const query = `
            INSERT INTO daily_egg_production (
                production_id, date,
                e_nw, e_pw, e_xs, e_s, e_m, e_l, e_xl, e_j,
                e_broken, e_dirty, e_unweighed,
                egg_waste,
                total_eggs_sold,
                egg_production,
                s_nw, s_pw, s_xs, s_s, s_m, s_l, s_xl, s_j,
                s_broken, s_dirty, s_unweighed,
                total_hours_operated,
                created_by
            )
            VALUES (
                $1, $2,
                $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13,
                $14,
                $15,
                $16,
                $17, $18, $19, $20, $21, $22, $23, $24,
                $25, $26, $27,
                $28,
                $29
            )
            RETURNING *
        `;

        const result = await this.db.query(query, [
            production_id,
            date,
            e_nw || 0, e_pw || 0, e_xs || 0, e_s || 0, e_m || 0, e_l || 0, e_xl || 0, e_j || 0,
            e_broken || 0, e_dirty || 0, e_unweighed || 0,
            egg_waste || 0,
            total_eggs_sold || 0,
            egg_production || 0,
            s_nw || 0, s_pw || 0, s_xs || 0, s_s || 0, s_m || 0, s_l || 0, s_xl || 0, s_j || 0,
            s_broken || 0, s_dirty || 0, s_unweighed || 0,
            total_hours_operated || 0,
            created_by || null
        ]);

        return result.rows[0];
    }

    async updateDailyEggProduction(id, data) {
        const {
            date,
            e_nw, e_pw, e_xs, e_s, e_m, e_l, e_xl, e_j,
            e_broken, e_dirty, e_unweighed,
            egg_waste,
            total_eggs_sold,
            egg_production,
            s_nw, s_pw, s_xs, s_s, s_m, s_l, s_xl, s_j,
            s_broken, s_dirty, s_unweighed,
            total_hours_operated,
            created_by
        } = data;

        const query = `
            UPDATE daily_egg_production
            SET
                date = $2,
                e_nw = $3, e_pw = $4, e_xs = $5, e_s = $6, e_m = $7, e_l = $8, e_xl = $9, e_j = $10,
                e_broken = $11, e_dirty = $12, e_unweighed = $13,
                egg_waste = $14,
                total_eggs_sold = $15,
                egg_production = $16,
                s_nw = $17, s_pw = $18, s_xs = $19, s_s = $20, s_m = $21, s_l = $22, s_xl = $23, s_j = $24,
                s_broken = $25, s_dirty = $26, s_unweighed = $27,
                total_hours_operated = $28,
                created_by = $29,
                created_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *
        `;

        const result = await this.db.query(query, [
            id,
            date,
            e_nw || 0, e_pw || 0, e_xs || 0, e_s || 0, e_m || 0, e_l || 0, e_xl || 0, e_j || 0,
            e_broken || 0, e_dirty || 0, e_unweighed || 0,
            egg_waste || 0,
            total_eggs_sold || 0,
            egg_production || 0,
            s_nw || 0, s_pw || 0, s_xs || 0, s_s || 0, s_m || 0, s_l || 0, s_xl || 0, s_j || 0,
            s_broken || 0, s_dirty || 0, s_unweighed || 0,
            total_hours_operated || 0,
            created_by || null
        ]);

        return result.rows[0];
    }

    async deleteDailyEggProduction(id) {
        const query = 'DELETE FROM daily_egg_production WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rowCount > 0;
    }
}

module.exports = DailyEggProductionController;
