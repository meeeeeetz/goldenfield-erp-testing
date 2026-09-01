class CheckDatabaseController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllChecks(bankCode) {
        let query = 'SELECT * FROM check_database';
        let params = [];
        if (bankCode) {
            query += ' WHERE bank_code = $1';
            params = [bankCode];
        }
        query += ' ORDER BY date DESC, check_transaction_id DESC';
        const result = await this.db.query(query, params);
        return result.rows;
    }

    async getCheckById(checkTransactionId) {
        const query = 'SELECT * FROM check_database WHERE check_transaction_id = $1';
        const result = await this.db.query(query, [checkTransactionId]);
        return result.rows[0];
    }

    async addCheck(checkData) {
        const { check_transaction_id, bank_code, check_number, date, recipient, recipient_account, amount, remarks, status, link_to_passbook } = checkData;
        const query = `
            INSERT INTO check_database
            (check_transaction_id, bank_code, check_number, date, recipient, recipient_account, amount, remarks, status, link_to_passbook)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            check_transaction_id,
            bank_code,
            check_number,
            date,
            recipient,
            recipient_account,
            typeof amount === 'string' ? amount.replace(/,/g, '') : amount,
            remarks,
            status,
            link_to_passbook
        ]);
        return result.rows[0];
    }

    async bulkAddChecks(rows) {
        let nextId = await this.getNextCheckTransactionId();
        let inserted = 0;
        const skipped = [];
        for (const row of rows) {
            const check_transaction_id = nextId;
            const { bank_code, check_number, date, recipient, recipient_account, amount, remarks, status, link_to_passbook } = row;
            try {
                await this.db.query(
                    `INSERT INTO check_database
                     (check_transaction_id, bank_code, check_number, date, recipient, recipient_account, amount, remarks, status, link_to_passbook)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                    [
                        check_transaction_id,
                        bank_code,
                        check_number,
                        date,
                        recipient,
                        recipient_account,
                        typeof amount === 'string' ? amount.replace(/,/g, '') : amount,
                        remarks,
                        status,
                        link_to_passbook
                    ]
                );
                inserted++;
            } catch (err) {
                skipped.push({ check_transaction_id, error: err.message });
            }
            const match = nextId.match(/ChkTra-(\d+)/);
            const num = match ? parseInt(match[1], 10) + 1 : 1;
            nextId = 'ChkTra-' + String(num).padStart(6, '0');
        }
        return { inserted, skipped: skipped.length, skippedRows: skipped };
    }

    async getNextCheckTransactionId() {
        const query = 'SELECT check_transaction_id FROM check_database ORDER BY check_transaction_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].check_transaction_id;
            const match = lastId.match(/ChkTra-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'ChkTra-' + String(nextNum).padStart(6, '0');
            }
        }
        return 'ChkTra-000001';
    }
}

module.exports = CheckDatabaseController;
