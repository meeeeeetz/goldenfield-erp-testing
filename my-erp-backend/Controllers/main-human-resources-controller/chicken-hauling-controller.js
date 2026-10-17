
const pool = require('../../config/database');

class ChickenHaulingController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async createHaulingLog(haulingData) {
        try {
            const query = 'INSERT INTO chicken_hauling_logs (hauling_id, building_id, days, day_entries, workers, status, grand_total, date_start, date_end, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *';
            const values = [
                haulingData.hauling_id,
                haulingData.building_id,
                haulingData.days,
                JSON.stringify(haulingData.day_entries),
                JSON.stringify(haulingData.workers),
                haulingData.status || 'pending',
                haulingData.grand_total || 0,
                haulingData.date_start || null,
                haulingData.date_end || null
            ];
            
            const result = await this.db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getHaulingLogsByStatus(status) {
        try {
            const query = 'SELECT * FROM chicken_hauling_logs WHERE status = $1 ORDER BY created_at DESC';
            const values = [status];
            
            const result = await this.db.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async getMaxHaulingId() {
        try {
            const query = 'SELECT hauling_id FROM chicken_hauling_logs ORDER BY hauling_id DESC LIMIT 1';
            const result = await this.db.query(query);
            if (result.rows.length > 0) {
                return result.rows[0].hauling_id;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

async getHaulingLogById(id) {
        try {
            const query = 'SELECT * FROM chicken_hauling_logs WHERE hauling_id = $1';
            const values = [id];
            
            const result = await this.db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async deleteHaulingLog(id) {
        try {
            const query = 'DELETE FROM chicken_hauling_logs WHERE hauling_id = $1 RETURNING *';
            const values = [id];
            
            const result = await this.db.query(query, values);
            return result.rows[0] || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ChickenHaulingController;

