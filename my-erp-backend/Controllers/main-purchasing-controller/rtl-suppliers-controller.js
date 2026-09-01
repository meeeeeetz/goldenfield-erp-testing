const pool = require('../../config/database');

class RtlSuppliersController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllSuppliers(search = '') {
        let query = 'SELECT * FROM rtl_suppliers';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE company_name ILIKE $${counter++} OR supplier_id ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getSupplierByCode(supplierId) {
        const query = 'SELECT * FROM rtl_suppliers WHERE supplier_id = $1';
        const result = await this.db.query(query, [supplierId]);
        return result.rows[0];
    }

    async getNextSupplierId() {
        const query = "SELECT MAX(CAST(SUBSTRING(supplier_id FROM '\\d+') AS INTEGER)) as max_num FROM rtl_suppliers";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'RTLSuID-' + (maxNum + 1);
    }

    async createSupplier(supplierData) {
        const { supplier_id, company_name, address, tin_number, contact_person, contact_number, status } = supplierData;
        const query = `
            INSERT INTO rtl_suppliers 
            (supplier_id, company_name, address, tin_number, contact_person, contact_number, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            supplier_id,
            company_name,
            address || null,
            tin_number || null,
            contact_person || null,
            contact_number || null,
            status || 'Active'
        ]);
        return result.rows[0];
    }

    async updateSupplier(supplierId, supplierData) {
        const { company_name, address, tin_number, contact_person, contact_number, status } = supplierData;
        const query = `
            UPDATE rtl_suppliers 
            SET company_name = $1, address = $2, tin_number = $3, contact_person = $4, contact_number = $5, status = $6, updated_at = CURRENT_TIMESTAMP
            WHERE supplier_id = $7
            RETURNING *
        `;
        const result = await this.db.query(query, [
            company_name,
            address || null,
            tin_number || null,
            contact_person || null,
            contact_number || null,
            status,
            supplierId
        ]);
        return result.rows[0];
    }
}

module.exports = RtlSuppliersController;
