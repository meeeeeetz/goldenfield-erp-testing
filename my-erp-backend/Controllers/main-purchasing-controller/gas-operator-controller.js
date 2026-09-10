const pool = require('../../config/database');

class GasOperatorController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllOperators(search = '') {
        let query = 'SELECT * FROM gas_operators';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE gas_station_name ILIKE $${counter++}`;
            values.push(`%${search}%`);
        }

        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getOperatorById(id) {
        const query = 'SELECT * FROM gas_operators WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getOperatorByCode(gasOperatorId) {
        const query = 'SELECT * FROM gas_operators WHERE gas_operator_id = $1';
        const result = await this.db.query(query, [gasOperatorId]);
        return result.rows[0];
    }

    async addOperator(operatorData) {
        const { gas_operator_id, gas_station_name, address, tin_number, contact_person, contact_number, status } = operatorData;
        const query = `
            INSERT INTO gas_operators 
            (gas_operator_id, gas_station_name, address, tin_number, contact_person, contact_number, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            gas_operator_id,
            gas_station_name,
            address,
            tin_number || null,
            contact_person || null,
            contact_number || null,
            status || 'Active'
        ]);
        return result.rows[0];
    }

    async updateOperator(gasOperatorId, operatorData) {
        const { gas_operator_id, gas_station_name, address, tin_number, contact_person, contact_number, status } = operatorData;
        const query = `
            UPDATE gas_operators 
            SET gas_operator_id = $1, gas_station_name = $2, address = $3, tin_number = $4, contact_person = $5, contact_number = $6, status = $7, updated_at = CURRENT_TIMESTAMP
            WHERE gas_operator_id = $8
            RETURNING *
        `;
        const result = await this.db.query(query, [
            gas_operator_id,
            gas_station_name,
            address,
            tin_number || null,
            contact_person || null,
            contact_number || null,
            status || 'Active',
            gasOperatorId
        ]);
        return result.rows[0];
    }

    async deleteOperator(gasOperatorId) {
        const query = 'DELETE FROM gas_operators WHERE gas_operator_id = $1';
        const result = await this.db.query(query, [gasOperatorId]);
        return result.rowCount > 0;
    }

    async getNextOperatorId() {
        const query = "SELECT MAX(CAST(SUBSTRING(gas_operator_id FROM '\\d+') AS INTEGER)) as max_num FROM gas_operators";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'GasOpID-' + (maxNum + 1);
    }
}

module.exports = GasOperatorController;
