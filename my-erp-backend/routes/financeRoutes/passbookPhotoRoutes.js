const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../../config/database');
const router = express.Router();

const uploadDir = path.join(__dirname, '..', '..', 'passbook-photos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
});

router.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        const { bankCode, bookNo, pageNo, lastBalance, rows } = req.body;

        if (!bankCode || !bookNo || !pageNo) {
            return res.status(400).json({ error: 'Bank code, book no, and page no are required' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No photo uploaded' });
        }

        const sanitizedBankCode = bankCode.replace(/[^a-zA-Z0-9]/g, '');
        const sanitizedBookNo = bookNo.replace(/[^a-zA-Z0-9]/g, '');
        const sanitizedPageNo = pageNo.replace(/[^a-zA-Z0-9]/g, '');

        const baseFilename = `${sanitizedBankCode}_${sanitizedBookNo}_${sanitizedPageNo}`;
        const filename = `${baseFilename}.webp`;
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, req.file.buffer);

        let parsedRows = [];
        if (rows) {
            try {
                parsedRows = JSON.parse(rows);
            } catch (e) {
                console.error('Failed to parse rows:', e);
            }
        }

        const parseAmount = (value) => {
            const n = parseFloat(String(value || '').replace(/,/g, '').replace(/[^0-9.\-]/g, '').trim());
            return isNaN(n) ? 0 : n;
        };

        const toSqlDate = (value) => {
            const v = String(value || '').trim();
            if (!v) return null;
            const parts = v.split('/');
            if (parts.length === 3) {
                let [mm, dd, yyyy] = parts;
                mm = mm.padStart(2, '0');
                dd = dd.padStart(2, '0');
                if (yyyy.length === 2) yyyy = '20' + yyyy;
                return `${yyyy}-${mm}-${dd}`;
            }
            return v;
        };

        const savedStatements = [];
        for (const row of parsedRows) {
            const date = toSqlDate(row.date);
            if (!date) continue;
            const debit = parseAmount(row.debit);
            const credit = parseAmount(row.credit);
            const balance = parseAmount(row.balance);
            const link = '';
            try {
                const codeBookPage = `${bankCode} ${bookNo} ${pageNo}`.trim();
                const insertResult = await pool.query(
                    `INSERT INTO passbook_statements (code_book_page, date, debit, credit, balance, link)
                     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                    [codeBookPage, date, debit, credit, balance, link]
                );
                savedStatements.push(insertResult.rows[0]);
            } catch (dbErr) {
                console.error('Failed to insert passbook statement row:', dbErr);
            }
        }

        const response = {
            message: 'Passbook photo uploaded successfully',
            filename: filename,
            bankCode: bankCode,
            bookNo: bookNo,
            pageNo: pageNo,
            lastBalance: lastBalance || '0.00',
            rowsCount: parsedRows.length,
            savedStatements: savedStatements.length,
            savedAt: new Date().toISOString()
        };

        res.json(response);
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Failed to upload passbook photo' });
    }
});

module.exports = router;
