const express = require('express');
const multer = require('multer');
const pool = require('../../config/database');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
});

router.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        const { bankCode, bookNo, pageNo, lastBalance, rows, photoBase64 } = req.body;

        if (!bankCode || !bookNo || !pageNo) {
            return res.status(400).json({ error: 'Bank code, book no, and page no are required' });
        }

        const photoData = req.file ? req.file.buffer : (photoBase64 ? Buffer.from(photoBase64, 'base64') : null);

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
            message: 'Passbook data saved successfully',
            bankCode: bankCode,
            bookNo: bookNo,
            pageNo: pageNo,
            lastBalance: lastBalance || '0.00',
            rowsCount: parsedRows.length,
            savedStatements: savedStatements.length,
            hasPhoto: !!photoData,
            savedAt: new Date().toISOString()
        };

        res.json(response);
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Failed to upload passbook photo' });
    }
});

module.exports = router;
