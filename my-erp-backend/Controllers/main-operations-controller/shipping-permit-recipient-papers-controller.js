const pool = require('../../config/database');

class ShippingPermitRecipientPapersController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllPapers(search = '', recipientId = null) {
        let query = `
            SELECT rp.*, spr.customer_name 
            FROM shipping_permit_recipient_papers rp
            LEFT JOIN shipping_permit_recipients spr ON rp.recipient_id = spr.recipient_id
        `;
        const values = [];
        let counter = 1;
        const conditions = [];

        if (recipientId) {
            conditions.push(`rp.recipient_id = $${counter++}`);
            values.push(recipientId);
        }

        if (search) {
            conditions.push(`(spr.customer_name ILIKE $${counter} OR rp.recipient_paper_id ILIKE $${counter} OR rp.registration_number ILIKE $${counter} OR rp.transport_carrier_name ILIKE $${counter})`);
            values.push(`%${search}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY rp.created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getPaperById(paperId) {
        const query = `
            SELECT rp.*, spr.customer_name 
            FROM shipping_permit_recipient_papers rp
            LEFT JOIN shipping_permit_recipients spr ON rp.recipient_id = spr.recipient_id
            WHERE rp.recipient_paper_id = $1
        `;
        const result = await this.db.query(query, [paperId]);
        return result.rows[0];
    }

    async getNextPaperId() {
        const query = "SELECT MAX(CAST(SUBSTRING(recipient_paper_id FROM '\\d+') AS INTEGER)) as max_num FROM shipping_permit_recipient_papers";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'RePerID-' + (maxNum + 1);
    }

    async createPaper(paperData) {
        const {
            recipient_paper_id,
            recipient_id,
            paper_type,
            registration_number,
            transport_carrier_name,
            license_plate,
            issued_date,
            expiration_date,
            issued_by,
            created_by,
            photo_path
        } = paperData;

        const query = `
            INSERT INTO shipping_permit_recipient_papers
            (recipient_paper_id, recipient_id, paper_type, registration_number, transport_carrier_name, license_plate, issued_date, expiration_date, issued_by, created_by, photo_path)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            recipient_paper_id,
            recipient_id,
            paper_type,
            registration_number || null,
            transport_carrier_name || null,
            license_plate || null,
            issued_date || null,
            expiration_date || null,
            issued_by || null,
            created_by || null,
            photo_path || null
        ]);
        return result.rows[0];
    }

    async updatePaper(paperId, paperData) {
        const {
            recipient_id,
            paper_type,
            registration_number,
            transport_carrier_name,
            license_plate,
            issued_date,
            expiration_date,
            issued_by,
            created_by,
            photo_path
        } = paperData;

        const query = `
            UPDATE shipping_permit_recipient_papers
            SET recipient_id = $1, paper_type = $2, registration_number = $3, transport_carrier_name = $4, license_plate = $5,
                issued_date = $6, expiration_date = $7, issued_by = $8, created_by = $9, photo_path = $10, updated_at = CURRENT_TIMESTAMP
            WHERE recipient_paper_id = $11
            RETURNING *
        `;
        const result = await this.db.query(query, [
            recipient_id,
            paper_type,
            registration_number || null,
            transport_carrier_name || null,
            license_plate || null,
            issued_date || null,
            expiration_date || null,
            issued_by || null,
            created_by || null,
            photo_path || null,
            paperId
        ]);
        return result.rows[0];
    }

    async deletePaper(paperId) {
        const query = 'DELETE FROM shipping_permit_recipient_papers WHERE recipient_paper_id = $1';
        const result = await this.db.query(query, [paperId]);
        return result.rowCount > 0;
    }
}

module.exports = ShippingPermitRecipientPapersController;