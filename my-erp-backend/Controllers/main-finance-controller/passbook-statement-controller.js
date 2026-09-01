const fs = require('fs');
const path = require('path');

class PassbookStatementController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllStatements() {
        const query = 'SELECT * FROM passbook_statements ORDER BY date ASC, statement_id ASC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getDistinctBankCodes() {
        const query = `SELECT DISTINCT code_book_page FROM passbook_statements WHERE code_book_page IS NOT NULL AND code_book_page <> ''`;
        const result = await this.db.query(query);
        const banks = new Set();
        for (const row of result.rows) {
            const parts = String(row.code_book_page).trim().split(/\s+/);
            if (parts[0]) banks.add(parts[0]);
        }
        return Array.from(banks).sort();
    }

    async getDistinctBookNos(bankCode) {
        const query = `SELECT DISTINCT code_book_page FROM passbook_statements WHERE code_book_page IS NOT NULL AND code_book_page <> ''`;
        const result = await this.db.query(query);
        const prefix = bankCode ? bankCode + ' ' : '';
        const books = new Set();
        for (const row of result.rows) {
            const parts = String(row.code_book_page).trim().split(/\s+/);
            if (parts[0] === bankCode && parts[1]) books.add(parts[1]);
        }
        return Array.from(books).sort();
    }

    async getDistinctPageNos(bankCode, bookNo) {
        const query = `SELECT DISTINCT code_book_page FROM passbook_statements WHERE code_book_page IS NOT NULL AND code_book_page <> ''`;
        const result = await this.db.query(query);
        const pages = new Set();
        for (const row of result.rows) {
            const parts = String(row.code_book_page).trim().split(/\s+/);
            if (parts[0] === bankCode && parts[1] === bookNo && parts[2]) pages.add(parts[2]);
        }
        return Array.from(pages).sort();
    }

    async getStatementById(statementId) {
        const query = 'SELECT * FROM passbook_statements WHERE statement_id = $1';
        const result = await this.db.query(query, [statementId]);
        return result.rows[0];
    }

    async addStatement(statementData) {
        const { date, debit, credit, balance, link } = statementData;
        const query = `
            INSERT INTO passbook_statements
            (date, debit, credit, balance, link)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            date,
            debit,
            credit,
            balance,
            link
        ]);
        return result.rows[0];
    }

    async updateStatement(statementId, statementData) {
        const { date, debit, credit, balance, link } = statementData;
        const query = `
            UPDATE passbook_statements
            SET date = $2, debit = $3, credit = $4, balance = $5, link = $6
            WHERE statement_id = $1
            RETURNING *
        `;
        const result = await this.db.query(query, [
            statementId,
            date,
            debit,
            credit,
            balance,
            link
        ]);
        return result.rows[0];
    }

    async deleteStatement(statementId) {
        const query = 'DELETE FROM passbook_statements WHERE statement_id = $1';
        const result = await this.db.query(query, [statementId]);
        return result;
    }

    async getNextPageNo(bankCode, bookNo) {
        const prefix = `${bankCode} ${bookNo} `.trim();
        const query = `
            SELECT code_book_page FROM passbook_statements
            WHERE code_book_page LIKE $1 AND code_book_page IS NOT NULL AND code_book_page <> ''
        `;
        const result = await this.db.query(query, [prefix + '%']);
        let maxNum = 0;
        for (const row of result.rows) {
            const match = String(row.code_book_page).match(/(\d+)\s*$/);
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxNum) maxNum = num;
            }
        }
        const nextNum = maxNum + 1;
        return 'PG-' + String(nextNum).padStart(3, '0');
    }

    async getLastPageBalance(bankCode, bookNo, pageNo) {
        const codeBookPage = `${bankCode} ${bookNo} ${pageNo}`.trim();
        const query = `
            SELECT balance FROM passbook_statements
            WHERE code_book_page = $1 AND balance IS NOT NULL
            ORDER BY statement_id DESC
            LIMIT 1
        `;
        const result = await this.db.query(query, [codeBookPage]);
        if (result.rows.length > 0) {
            return parseFloat(result.rows[0].balance);
        }
        return null;
    }

    async getPreviousPageNo(bankCode, bookNo, currentPageNo) {
        const prefix = `${bankCode} ${bookNo} `.trim();
        const query = `
            SELECT code_book_page FROM passbook_statements
            WHERE code_book_page LIKE $1 AND code_book_page IS NOT NULL AND code_book_page <> ''
        `;
        const result = await this.db.query(query, [prefix + '%']);
        let prevNum = 0;
        const match = String(currentPageNo).match(/(\d+)\s*$/);
        const currentNum = match ? parseInt(match[1], 10) : 0;
        for (const row of result.rows) {
            const m = String(row.code_book_page).match(/(\d+)\s*$/);
            if (m) {
                const num = parseInt(m[1], 10);
                if (num < currentNum && num > prevNum) prevNum = num;
            }
        }
        if (prevNum === 0) return null;
        return 'PG-' + String(prevNum).padStart(3, '0');
    }

    async getStatementsByCodeBookPage(bankCode, bookNo, pageNo) {
        const codeBookPage = `${bankCode} ${bookNo} ${pageNo}`.trim();
        const query = `
            SELECT statement_id, date, debit, credit, balance
            FROM passbook_statements
            WHERE code_book_page = $1
            ORDER BY statement_id ASC
        `;
        const result = await this.db.query(query, [codeBookPage]);
        return result.rows;
    }

    async getPagesNeedingPhotos() {
        const query = `
            SELECT DISTINCT code_book_page
            FROM passbook_statements
            WHERE code_book_page IS NOT NULL AND code_book_page <> ''
            ORDER BY code_book_page
        `;
        const result = await this.db.query(query);
        const photosDir = path.join(__dirname, '..', '..', 'passbook-photos');
        const needingPhotos = [];
        for (const row of result.rows) {
            const code = String(row.code_book_page).trim();
            const parts = code.split(/\s+/);
            const bankCode = parts[0] || '';
            const bookNo = parts[1] || '';
            const pageNo = parts[2] || '';
            const sanitizedBankCode = String(bankCode).replace(/[^a-zA-Z0-9]/g, '');
            const sanitizedBookNo = String(bookNo).replace(/[^a-zA-Z0-9]/g, '');
            const sanitizedPageNo = String(pageNo).replace(/[^a-zA-Z0-9]/g, '');
            const filename = `${sanitizedBankCode}_${sanitizedBookNo}_${sanitizedPageNo}.webp`;
            const filepath = path.join(photosDir, filename);
            if (!fs.existsSync(filepath)) {
                needingPhotos.push({ bankCode, bookNo, pageNo, code_book_page: code });
            }
        }
        return needingPhotos;
    }

    async bulkUploadStatements(rows) {
        if (!Array.isArray(rows) || rows.length === 0) {
            throw new Error('No rows provided for bulk upload');
        }
        const values = [];
        const params = [];
        let paramIndex = 0;
        for (const row of rows) {
            const base = ++paramIndex;
            params.push(row.code_book_page);
            params.push(row.date);
            params.push(row.debit);
            params.push(row.credit);
            params.push(row.balance);
            values.push(`($${base}, $${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`);
            paramIndex = base + 4;
        }
        const query = `
            INSERT INTO passbook_statements (code_book_page, date, debit, credit, balance)
            VALUES ${values.join(', ')}
            RETURNING *
        `;
        const result = await this.db.query(query, params);
        return result.rows;
    }
}

module.exports = PassbookStatementController;
