const pool = require('../../config/database');

class LoanAccountController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllAccounts(search = '') {
        let query = 'SELECT * FROM loan_accounts';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE company_individual ILIKE $${counter++} OR loan_account_id ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getAccountById(loanAccountId) {
        const query = 'SELECT * FROM loan_accounts WHERE loan_account_id = $1';
        const result = await this.db.query(query, [loanAccountId]);
        return result.rows[0];
    }

    async getNextAccountId() {
        const query = "SELECT MAX(CAST(SUBSTRING(loan_account_id FROM '\\d+') AS INTEGER)) as max_num FROM loan_accounts";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'LoAcID-' + (maxNum + 1);
    }

    async createAccount(accountData) {
        const { loan_account_id, company_individual, contact_details, status } = accountData;
        const query = `
            INSERT INTO loan_accounts
            (loan_account_id, company_individual, contact_details, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            loan_account_id,
            company_individual,
            contact_details || null,
            status || 'Active'
        ]);
        return result.rows[0];
    }

    async updateAccount(loanAccountId, accountData) {
        const { company_individual, contact_details, status } = accountData;
        const query = `
            UPDATE loan_accounts
            SET company_individual = $1, contact_details = $2, status = $3, updated_at = CURRENT_TIMESTAMP
            WHERE loan_account_id = $4
            RETURNING *
        `;
        const result = await this.db.query(query, [
            company_individual,
            contact_details || null,
            status,
            loanAccountId
        ]);
        return result.rows[0];
    }
}

module.exports = LoanAccountController;
