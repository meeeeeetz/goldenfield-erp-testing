const express = require('express');
const router = express.Router();
const LoanTransactionController = require('../../Controllers/main-finance-controller/loan-transaction-controller');
const pool = require('../../config/database');
const controller = new LoanTransactionController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const { prefix } = req.query;
        const nextId = await controller.getNextTransactionId(prefix || 'LoAp');
        res.json({ next_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/account-balance/:accountId', authenticateToken, async (req, res) => {
    try {
        const balance = await controller.getAccountBalance(req.params.accountId);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/account-summary', authenticateToken, async (req, res) => {
    try {
        const summaries = await controller.getAllAccountSummaries();
        res.json(summaries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/account/:accountId', authenticateToken, async (req, res) => {
    try {
        const transactions = await controller.getTransactionsByAccount(req.params.accountId);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const search = req.query.search || '';
        const transactions = await controller.getAllTransactions(search);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const transaction = await controller.getTransactionById(req.params.id);
        if (transaction) {
            res.json(transaction);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { loan_transaction_id, date, loan_account_id, borrow_amount, payment_interest_amount, payment_principal_amount, source_account, check_number } = req.body;
        
        if (!loan_transaction_id || !date || !loan_account_id) {
            return res.status(400).json({ error: 'loan_transaction_id, date, and loan_account_id are required' });
        }

        const result = await controller.createTransaction({
            loan_transaction_id,
            date,
            loan_account_id,
            borrow_amount: borrow_amount || 0,
            payment_interest_amount: payment_interest_amount || 0,
            payment_principal_amount: payment_principal_amount || 0,
            source_account: source_account || null,
            check_number: check_number || null,
            created_by: req.user?.id || null
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.deleteTransaction(req.params.id);
        if (result) {
            res.json({ message: 'Transaction deleted successfully' });
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
