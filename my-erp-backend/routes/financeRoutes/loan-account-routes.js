const express = require('express');
const router = express.Router();
const LoanAccountController = require('../../Controllers/main-finance-controller/loan-account-controller');
const pool = require('../../config/database');
const controller = new LoanAccountController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextAccountId();
        res.json({ loan_account_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { loan_account_id, company_individual, contact_details, status } = req.body;
        if (!loan_account_id || !company_individual) {
            return res.status(400).json({ error: 'loan_account_id and company_individual are required' });
        }
        const result = await controller.createAccount(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const search = req.query.search || '';
        const accounts = await controller.getAllAccounts(search);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:accountId', authenticateToken, async (req, res) => {
    try {
        const account = await controller.getAccountById(req.params.accountId);
        if (account) {
            res.json(account);
        } else {
            res.status(404).json({ error: 'Loan account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:accountId', authenticateToken, async (req, res) => {
    try {
        const result = await controller.updateAccount(req.params.accountId, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Loan account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
