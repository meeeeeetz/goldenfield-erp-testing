const pool = require('../../config/database');

class HolidayController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllHolidays() {
        const query = 'SELECT * FROM holiday ORDER BY date_of_holiday DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async addHoliday(holidayData) {
        const { holiday_name, date_of_holiday, type_of_holiday } = holidayData;
        const query = `
            INSERT INTO holiday (holiday_name, date_of_holiday, type_of_holiday)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await this.db.query(query, [holiday_name, date_of_holiday, type_of_holiday]);
        return result.rows[0];
    }

    async getHolidaysByDateRange(dateFrom, dateTo) {
        const query = `
            SELECT holiday_name, date_of_holiday, type_of_holiday
            FROM holiday
            WHERE date_of_holiday BETWEEN $1 AND $2
            ORDER BY date_of_holiday ASC
        `;
        const result = await this.db.query(query, [dateFrom, dateTo]);
        return result.rows;
    }

    async deleteHoliday(holidayId) {
        const query = 'DELETE FROM holiday WHERE holiday_id = $1';
        const result = await this.db.query(query, [holidayId]);
        return result;
    }
}

module.exports = HolidayController;
