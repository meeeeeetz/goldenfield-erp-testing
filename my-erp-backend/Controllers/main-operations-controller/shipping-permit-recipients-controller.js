const pool = require('../../config/database');

class ShippingPermitRecipientsController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllRecipients(search = '') {
        let query = 'SELECT * FROM shipping_permit_recipients';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE customer_name ILIKE $${counter++} OR recipient_id ILIKE $${counter++} OR plate_number ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getRecipientById(recipientId) {
        const query = 'SELECT * FROM shipping_permit_recipients WHERE recipient_id = $1';
        const result = await this.db.query(query, [recipientId]);
        return result.rows[0];
    }

    async getNextRecipientId() {
        const query = "SELECT MAX(CAST(SUBSTRING(recipient_id FROM '\\d+') AS INTEGER)) as max_num FROM shipping_permit_recipients";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'ShReID-' + (maxNum + 1);
    }

    async createRecipient(recipientData) {
        const {
            recipient_id,
            customer_name,
            province,
            city,
            barangay,
            transport_type,
            plate_number,
            contact,
            contact_number,
            handlers_license,
            handlers_issued_date,
            handlers_expiration,
            transport_carrier,
            transport_issued_date,
            transport_expiration,
            status,
            created_by
        } = recipientData;

        const query = `
            INSERT INTO shipping_permit_recipients
            (recipient_id, customer_name, province, city, barangay, transport_type, plate_number, contact, contact_number, handlers_license, handlers_issued_date, handlers_expiration, transport_carrier, transport_issued_date, transport_expiration, status, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            recipient_id,
            customer_name,
            province || null,
            city || null,
            barangay || null,
            transport_type || null,
            plate_number || null,
            contact || null,
            contact_number || null,
            handlers_license || null,
            handlers_issued_date || null,
            handlers_expiration || null,
            transport_carrier || null,
            transport_issued_date || null,
            transport_expiration || null,
            status || 'Active',
            created_by || null
        ]);
        return result.rows[0];
    }

    async updateRecipient(recipientId, recipientData) {
        const {
            customer_name,
            province,
            city,
            barangay,
            transport_type,
            plate_number,
            contact,
            contact_number,
            handlers_license,
            handlers_issued_date,
            handlers_expiration,
            transport_carrier,
            transport_issued_date,
            transport_expiration,
            status,
            created_by
        } = recipientData;

        const query = `
            UPDATE shipping_permit_recipients
            SET customer_name = $1, province = $2, city = $3, barangay = $4, transport_type = $5, plate_number = $6, contact = $7, contact_number = $8, handlers_license = $9, handlers_issued_date = $10, handlers_expiration = $11, transport_carrier = $12, transport_issued_date = $13, transport_expiration = $14, status = $15, created_by = $16, updated_at = CURRENT_TIMESTAMP
            WHERE recipient_id = $17
            RETURNING *
        `;
        const result = await this.db.query(query, [
            customer_name,
            province || null,
            city || null,
            barangay || null,
            transport_type || null,
            plate_number || null,
            contact || null,
            contact_number || null,
            handlers_license || null,
            handlers_issued_date || null,
            handlers_expiration || null,
            transport_carrier || null,
            transport_issued_date || null,
            transport_expiration || null,
            status,
            created_by || null,
            recipientId
        ]);
        return result.rows[0];
    }

    async deleteRecipient(recipientId) {
        const query = 'DELETE FROM shipping_permit_recipients WHERE recipient_id = $1';
        const result = await this.db.query(query, [recipientId]);
        return result.rowCount > 0;
    }
}

module.exports = ShippingPermitRecipientsController;
