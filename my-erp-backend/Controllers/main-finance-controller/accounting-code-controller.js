class AccountingCodeController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllAccountingCodes() {
        const query = "SELECT *, CONCAT('AccID-', LPAD(id::text, 4, '0')) as accounting_id FROM accounting_codes ORDER BY id ASC";
        const result = await this.db.query(query);
        return result.rows;
    }

    async getAccountingCodeById(id) {
        const query = "SELECT *, CONCAT('AccID-', LPAD(id::text, 4, '0')) as accounting_id FROM accounting_codes WHERE id = $1";
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async addAccountingCode(accountingData) {
        const { accounting_id, accounting_type, accounting_code, remarks } = accountingData;
        const query = `
            INSERT INTO accounting_codes 
            (accounting_id, accounting_type, accounting_code, remarks) 
            VALUES ($1, $2, $3, $4)
            RETURNING *, CONCAT('AccID-', LPAD(id::text, 4, '0')) as accounting_id
        `;
        const result = await this.db.query(query, [
            accounting_id, 
            accounting_type, 
            accounting_code, 
            remarks
        ]);
        return result.rows[0];
    }

    async updateAccountingCode(id, accountingData) {
        const { accounting_id, accounting_type, accounting_code, remarks } = accountingData;
        const query = `
            UPDATE accounting_codes 
            SET accounting_id = $1, accounting_type = $2, accounting_code = $3, remarks = $4, updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *, CONCAT('AccID-', LPAD(id::text, 4, '0')) as accounting_id
        `;
        const result = await this.db.query(query, [
            accounting_id, 
            accounting_type, 
            accounting_code, 
            remarks, 
            id
        ]);
        return result.rows[0];
    }

    async deleteAccountingCode(id) {
        const query = 'DELETE FROM accounting_codes WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rowCount > 0;
    }

    async getNextAccountingCodeId() {
        const query = "SELECT MAX(id) as max_id FROM accounting_codes";
        const result = await this.db.query(query);
        const maxId = result.rows[0]?.max_id || 0;
        const nextId = maxId + 1;
        return 'AccID-' + String(nextId).padStart(4, '0');
    }
}

module.exports = AccountingCodeController;
