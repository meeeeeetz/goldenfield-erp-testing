const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const PassbookStatementController = require('../../Controllers/main-finance-controller/passbook-statement-controller');
const pool = require('../../config/database');
const controller = new PassbookStatementController(pool);

const passbookPhotosDir = path.join(__dirname, '..', '..', 'passbook-photos');

router.get('/photo', (req, res) => {
    try {
        const { bankCode, bookNo, pageNo } = req.query;
        if (!bankCode || !bookNo || !pageNo) {
            return res.status(400).json({ error: 'bankCode, bookNo and pageNo are required' });
        }
        const sanitizedBankCode = String(bankCode).replace(/[^a-zA-Z0-9]/g, '');
        const sanitizedBookNo = String(bookNo).replace(/[^a-zA-Z0-9]/g, '');
        const sanitizedPageNo = String(pageNo).replace(/[^a-zA-Z0-9]/g, '');
        const filename = `${sanitizedBankCode}_${sanitizedBookNo}_${sanitizedPageNo}.webp`;
        const filepath = path.join(passbookPhotosDir, filename);
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        res.sendFile(filepath);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const statements = await controller.getAllStatements();
        res.json(statements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-page-no', async (req, res) => {
    try {
        const { bankCode, bookNo } = req.query;
        if (!bankCode || !bookNo) {
            return res.status(400).json({ error: 'bankCode and bookNo are required' });
        }
        const nextPageNo = await controller.getNextPageNo(bankCode, bookNo);
        res.json({ page_no: nextPageNo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/last-page-balance', async (req, res) => {
    try {
        const { bankCode, bookNo, pageNo } = req.query;
        if (!bankCode || !bookNo || !pageNo) {
            return res.status(400).json({ error: 'bankCode, bookNo and pageNo are required' });
        }
        const prevPageNo = await controller.getPreviousPageNo(bankCode, bookNo, pageNo);
        let lastBalance = null;
        if (prevPageNo) {
            lastBalance = await controller.getLastPageBalance(bankCode, bookNo, prevPageNo);
        }
        res.json({ previous_page_no: prevPageNo, last_balance: lastBalance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/distinct-bank-codes', async (req, res) => {
    try {
        const banks = await controller.getDistinctBankCodes();
        res.json({ bank_codes: banks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/distinct-book-nos', async (req, res) => {
    try {
        const { bankCode } = req.query;
        if (!bankCode) return res.status(400).json({ error: 'bankCode is required' });
        const books = await controller.getDistinctBookNos(bankCode);
        res.json({ book_nos: books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/distinct-page-nos', async (req, res) => {
    try {
        const { bankCode, bookNo } = req.query;
        if (!bankCode || !bookNo) return res.status(400).json({ error: 'bankCode and bookNo are required' });
        const pages = await controller.getDistinctPageNos(bankCode, bookNo);
        res.json({ page_nos: pages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/by-code-book-page', async (req, res) => {
    try {
        const { bankCode, bookNo, pageNo } = req.query;
        if (!bankCode || !bookNo || !pageNo) {
            return res.status(400).json({ error: 'bankCode, bookNo and pageNo are required' });
        }
        const statements = await controller.getStatementsByCodeBookPage(bankCode, bookNo, pageNo);
        res.json({ statements });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/pages-needing-photos', async (req, res) => {
    try {
        const pages = await controller.getPagesNeedingPhotos();
        res.json({ pages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const statement = await controller.getStatementById(req.params.id);
        if (statement) {
            res.json(statement);
        } else {
            res.status(404).json({ error: 'Passbook statement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addStatement(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/bulk', async (req, res) => {
    try {
        const rows = await controller.bulkUploadStatements(req.body.rows || []);
        res.status(201).json({ inserted: rows.length, rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateStatement(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Passbook statement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteStatement(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Passbook statement deleted successfully' });
        } else {
            res.status(404).json({ error: 'Passbook statement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

