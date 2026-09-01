const pool = require('../../config/database');

class LayerBuildingsController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllReports() {
        const query = `
            SELECT 
                r.*,
                COALESCE(json_agg(
                    json_build_object(
                        'medication_id', m.medication_id,
                        'medication_type', m.medication_type,
                        'quantity', m.quantity,
                        'unit', m.unit,
                        'water_ratio', m.water_ratio,
                        'time_start', m.time_start,
                        'time_finish', m.time_finish
                    )
                ) FILTER (WHERE m.medication_id IS NOT NULL), '[]') as medications,
                json_build_object(
                    'feed_id', f.feed_id,
                    'feed_type', f.feed_type,
                    'weight_kgs', f.weight_kgs
                ) as feed
            FROM daily_layer_reports r
            LEFT JOIN daily_layer_medications m ON m.report_id = r.report_id
            LEFT JOIN daily_layer_feeds f ON f.report_id = r.report_id
            GROUP BY r.report_id
            ORDER BY r.report_date DESC, r.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getReportById(reportId) {
        const reportQuery = 'SELECT * FROM daily_layer_reports WHERE report_id = $1';
        const reportResult = await this.db.query(reportQuery, [reportId]);
        if (!reportResult.rows.length) return null;

        const report = reportResult.rows[0];

        const medsQuery = 'SELECT * FROM daily_layer_medications WHERE report_id = $1 ORDER BY medication_id';
        const medsResult = await this.db.query(medsQuery, [reportId]);

        const feedQuery = 'SELECT * FROM daily_layer_feeds WHERE report_id = $1 LIMIT 1';
        const feedResult = await this.db.query(feedQuery, [reportId]);

        return {
            ...report,
            medications: medsResult.rows,
            feed: feedResult.rows[0] || null
        };
    }

    async saveReport(reportData) {
        const { 
            building, report_date, mortalities, electricity_prev, electricity_today,
            water_prev, water_today, production_prev, production_today,
            feeds_delivered, feed_type, feed_weight, medications
        } = reportData;

        const nextId = await this.getNextReportId();
        const reportId = `DLR-${String(nextId).padStart(7, '0')}`;

        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const reportQuery = `
                INSERT INTO daily_layer_reports 
                (report_id, building, report_date, mort_normal, mort_sipon, mort_prolapse, mort_others, mort_culled,
                 electricity_prev, electricity_today, water_prev, water_today, production_prev, production_today,
                 feeds_delivered)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                RETURNING *
            `;
            const reportResult = await client.query(reportQuery, [
                reportId,
                building,
                report_date,
                mortalities?.normal || 0,
                mortalities?.sipon || 0,
                mortalities?.prolapse || 0,
                mortalities?.others || 0,
                mortalities?.culled || 0,
                electricity_prev || null,
                electricity_today || null,
                water_prev || null,
                water_today || null,
                production_prev || null,
                production_today || null,
                feeds_delivered || 'No'
            ]);

            if (medications && Array.isArray(medications) && medications.length > 0) {
                for (const med of medications) {
                    if (!med.type) continue;
                    const medQuery = `
                        INSERT INTO daily_layer_medications 
                        (report_id, medication_type, quantity, unit, water_ratio, time_start, time_finish)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                    `;
                    await client.query(medQuery, [
                        reportId,
                        med.type,
                        med.quantity || null,
                        med.unit || null,
                        med.water_ratio || null,
                        med.time_start || null,
                        med.time_finish || null
                    ]);
                }
            }

            if (feeds_delivered === 'Yes' && feed_type) {
                const feedQuery = `
                    INSERT INTO daily_layer_feeds 
                    (report_id, feed_type, weight_kgs)
                    VALUES ($1, $2, $3)
                `;
                await client.query(feedQuery, [
                    reportId,
                    feed_type,
                    feed_weight || null
                ]);
            }

            await client.query('COMMIT');
            return reportResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getNextReportId() {
        const query = 'SELECT report_id FROM daily_layer_reports ORDER BY report_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].report_id;
            const match = lastId.match(/DLR-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return nextNum;
            }
        }
        return 1;
    }

    async getAllBuildings() {
        const query = 'SELECT * FROM layer_buildings ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getBuildingById(buildingId) {
        const query = 'SELECT * FROM layer_buildings WHERE building_id = $1';
        const result = await this.db.query(query, [buildingId]);
        return result.rows[0];
    }

    async getActiveBuildings() {
        const query = "SELECT * FROM layer_buildings WHERE status = 'Active' ORDER BY building_name";
        const result = await this.db.query(query);
        return result.rows;
    }

    async getNextBuildingId() {
        const query = 'SELECT building_id FROM layer_buildings ORDER BY building_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].building_id;
            const match = lastId.match(/BldgID-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'BldgID-' + String(nextNum).padStart(3, '0');
            }
        }
        return 'BldgID-001';
    }

    async createBuilding(buildingData) {
        const { building_id, building_name, status, created_by } = buildingData;
        const query = `
            INSERT INTO layer_buildings (building_id, building_name, status, created_by)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            building_id,
            building_name,
            status || 'Active',
            created_by || null
        ]);
        return result.rows[0];
    }

    async updateBuilding(buildingId, buildingData) {
        const { building_name, status } = buildingData;
        const query = `
            UPDATE layer_buildings
            SET building_name = $1, status = $2, updated_at = CURRENT_TIMESTAMP
            WHERE building_id = $3
            RETURNING *
        `;
        const result = await this.db.query(query, [building_name, status, buildingId]);
        return result.rows[0];
    }

    async deleteBuilding(buildingId) {
        const query = 'DELETE FROM layer_buildings WHERE building_id = $1';
        const result = await this.db.query(query, [buildingId]);
        return result.rowCount > 0;
    }
}

module.exports = LayerBuildingsController;
