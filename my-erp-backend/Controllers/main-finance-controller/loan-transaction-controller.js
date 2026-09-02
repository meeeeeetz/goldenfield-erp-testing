const pool = require('../../config/database');

class LoanTransactionController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllTransactions(search = '') {
        let query = `
            SELECT lt.*, 
                   u.email as created_by_email,
                   la.company_individual as account_name
            FROM loan_transactions lt
            LEFT JOIN users u ON lt.created_by = u.id
            LEFT JOIN loan_accounts la ON lt.loan_account_id = la.loan_account_id
        `;
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE lt.loan_transaction_id ILIKE $${counter++} OR lt.loan_account_id ILIKE $${counter++} OR la.company_individual ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY lt.date DESC, lt.created_at DESC';
        const result = await this.db.query(query, values);
        return result.rows;
    }

    async getTransactionById(transactionId) {
        const query = `
            SELECT lt.*, 
                   u.email as created_by_email,
                   la.company_individual as account_name
            FROM loan_transactions lt
            LEFT JOIN users u ON lt.created_by = u.id
            LEFT JOIN loan_accounts la ON lt.loan_account_id = la.loan_account_id
            WHERE lt.loan_transaction_id = $1
        `;
        const result = await this.db.query(query, [transactionId]);
        return result.rows[0];
    }

    async getNextTransactionId(prefix) {
        const query = `
            SELECT MAX(CAST(SUBSTRING(loan_transaction_id FROM '\\d+') AS INTEGER)) as max_num 
            FROM loan_transactions 
            WHERE loan_transaction_id LIKE $1
        `;
        const result = await this.db.query(query, [`${prefix}%`]);
        const maxNum = result.rows[0]?.max_num || 0;
        return `${prefix}${maxNum + 1}`;
    }

    async createTransaction(transactionData) {
        const { loan_transaction_id, date, loan_account_id, borrow_amount, payment_interest_amount, payment_principal_amount, created_by } = transactionData;
        const query = `
            INSERT INTO loan_transactions 
            (loan_transaction_id, date, loan_account_id, borrow_amount, payment_interest_amount, payment_principal_amount, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            loan_transaction_id,
            date,
            loan_account_id,
            borrow_amount || 0,
            payment_interest_amount || 0,
            payment_principal_amount || 0,
            created_by || null
        ]);
        return result.rows[0];
    }

    async getTransactionsByAccount(accountId) {
        const query = `
            SELECT lt.*, 
                   u.email as created_by_email,
                   la.company_individual as account_name
            FROM loan_transactions lt
            LEFT JOIN users u ON lt.created_by = u.id
            LEFT JOIN loan_accounts la ON lt.loan_account_id = la.loan_account_id
            WHERE lt.loan_account_id = $1
            ORDER BY lt.date DESC, lt.created_at DESC
        `;
        const result = await this.db.query(query, [accountId]);
        return result.rows;
    }

    async getAccountSummary(accountId) {
        const query = `
            SELECT 
                COALESCE(SUM(borrow_amount), 0) as total_loans,
                COALESCE(SUM(payment_principal_amount), 0) as total_principal_paid,
                COALESCE(SUM(payment_interest_amount), 0) as total_interest_paid,
                COALESCE(SUM(borrow_amount), 0) - COALESCE(SUM(payment_principal_amount), 0) as total_balance
            FROM loan_transactions
            WHERE loan_account_id = $1
        `;
        const result = await this.db.query(query, [accountId]);
        return result.rows[0];
    }

    async getAllAccountSummaries() {
        const query = `
            SELECT 
                la.loan_account_id,
                la.company_individual as account_name,
                COALESCE(SUM(lt.borrow_amount), 0) as total_loans,
                COALESCE(SUM(lt.payment_principal_amount), 0) as total_principal_paid,
                COALESCE(SUM(lt.payment_interest_amount), 0) as total_interest_paid,
                COALESCE(SUM(lt.borrow_amount), 0) - COALESCE(SUM(lt.payment_principal_amount), 0) as total_balance
            FROM loan_accounts la
            LEFT JOIN loan_transactions lt ON la.loan_account_id = lt.loan_account_id
            WHERE la.status = 'Active'
            GROUP BY la.loan_account_id, la.company_individual
            ORDER BY la.company_individual
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getAccountBalance(accountId) {
        const query = `
            SELECT 
                COALESCE(SUM(borrow_amount), 0) - COALESCE(SUM(payment_principal_amount), 0) as balance
            FROM loan_transactions
            WHERE loan_account_id = $1
        `;
        const result = await this.db.query(query, [accountId]);
        return result.rows[0]?.balance || 0;
    }
}

module.exports = LoanTransactionController;
