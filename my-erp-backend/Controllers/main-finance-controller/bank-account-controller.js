class BankAccountController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllBankAccounts() {
        const query = 'SELECT * FROM bank_accounts ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getBankAccountById(bankAccountId) {
        const query = 'SELECT * FROM bank_accounts WHERE bank_account_id = $1';
        const result = await this.db.query(query, [bankAccountId]);
        return result.rows[0];
    }

    async getBankAccountByCode(bankCode) {
        const query = 'SELECT * FROM bank_accounts WHERE bank_code = $1';
        const result = await this.db.query(query, [bankCode]);
        return result.rows;
    }

    async addBankAccount(accountData) {
        const { bank_account_id, bank, bank_code, address, bank_account_number, status, starting_bank_cash } = accountData;
        const query = `
            INSERT INTO bank_accounts 
            (bank_account_id, bank, bank_code, address, bank_account_number, status, starting_bank_cash) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            bank_account_id,
            bank,
            bank_code,
            address,
            bank_account_number,
            status,
            starting_bank_cash || 0
        ]);
        return result.rows[0];
    }

    async updateBankAccount(bankAccountId, accountData) {
        const { bank, bank_code, address, bank_account_number, status, starting_bank_cash } = accountData;
        const query = `
            UPDATE bank_accounts 
            SET bank = $2, bank_code = $3, address = $4, bank_account_number = $5, status = $6, starting_bank_cash = $7, updated_at = CURRENT_TIMESTAMP
            WHERE bank_account_id = $1
            RETURNING *
        `;
        const result = await this.db.query(query, [
            bankAccountId,
            bank,
            bank_code,
            address,
            bank_account_number,
            status,
            starting_bank_cash
        ]);
        return result.rows[0];
    }

    async deleteBankAccount(bankAccountId) {
        const query = 'DELETE FROM bank_accounts WHERE bank_account_id = $1';
        const result = await this.db.query(query, [bankAccountId]);
        return result;
    }

    async getNextBankAccountId() {
        const query = 'SELECT bank_account_id FROM bank_accounts ORDER BY bank_account_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].bank_account_id;
            const match = lastId.match(/BnkAc-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1]) + 1;
                return 'BnkAc-' + String(nextNum).padStart(3, '0');
            }
        }
        return 'BnkAc-001';
    }
}

module.exports = BankAccountController;
