const express = require('express');
const router = express.Router();
const CheckDatabaseController = require('../../Controllers/main-finance-controller/check-database-controller');
const pool = require('../../config/database');
const controller = new CheckDatabaseController(pool);

router.get('/', async (req, res) => {
    try {
        const { bank_code } = req.query;
        const checks = await controller.getAllChecks(bank_code);
        res.json(checks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextCheckTransactionId();
        res.json({ check_transaction_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/template', async (req, res) => {
    try {
        const header = 'bank_code,check_number,date,recipient,recipient_account,amount,remarks,status,link_to_passbook';
        const sample = 'PNB,12345,2026-07-20,Recipient Name,Account No,0.00,Remarks,Pending,';
        const csv = `${header}\n${sample}\n`;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="check_template.csv"');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const check = await controller.getCheckById(req.params.id);
        if (check) {
            res.json(check);
        } else {
            res.status(404).json({ error: 'Check not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/bulk', async (req, res) => {
    try {
        const { rows } = req.body;
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(400).json({ error: 'rows must be a non-empty array' });
        }
        const result = await controller.bulkAddChecks(rows);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addCheck(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
