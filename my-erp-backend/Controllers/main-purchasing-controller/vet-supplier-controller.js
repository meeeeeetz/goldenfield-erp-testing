const pool = require('../../config/database');

class VetSupplierController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllSuppliers(search = '') {
        let query = 'SELECT * FROM vet_suppliers';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE company_name ILIKE $${counter++}`;
            values.push(`%${search}%`);
        }

        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getSupplierById(id) {
        const query = 'SELECT * FROM vet_suppliers WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getSupplierByCode(supplierId) {
        const query = 'SELECT * FROM vet_suppliers WHERE supplier_id = $1';
        const result = await this.db.query(query, [supplierId]);
        return result.rows[0];
    }

    async addSupplier(supplierData) {
        const { supplier_id, company_name, address, tin_number, contact_person, contact_number, status } = supplierData;
        const query = `
            INSERT INTO vet_suppliers 
            (supplier_id, company_name, address, tin_number, contact_person, contact_number, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            supplier_id,
            company_name,
            address,
            tin_number || null,
            contact_person || null,
            contact_number || null,
            status || 'Active'
        ]);
        return result.rows[0];
    }

    async updateSupplier(supplierId, supplierData) {
        const { supplier_id, company_name, address, tin_number, contact_person, contact_number, status } = supplierData;
        const query = `
            UPDATE vet_suppliers 
            SET supplier_id = $1, company_name = $2, address = $3, tin_number = $4, contact_person = $5, contact_number = $6, status = $7, updated_at = CURRENT_TIMESTAMP
            WHERE supplier_id = $8
            RETURNING *
        `;
        const result = await this.db.query(query, [
            supplier_id,
            company_name,
            address,
            tin_number || null,
            contact_person || null,
            contact_number || null,
            status || 'Active',
            supplierId
        ]);
        return result.rows[0];
    }

    async deleteSupplier(supplierId) {
        const query = 'DELETE FROM vet_suppliers WHERE supplier_id = $1';
        const result = await this.db.query(query, [supplierId]);
        return result.rowCount > 0;
    }

    async getNextSupplierId() {
        const query = "SELECT MAX(CAST(SUBSTRING(supplier_id FROM '\\d+') AS INTEGER)) as max_num FROM vet_suppliers";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'VetSuID-' + (maxNum + 1);
    }
}

module.exports = VetSupplierController;
