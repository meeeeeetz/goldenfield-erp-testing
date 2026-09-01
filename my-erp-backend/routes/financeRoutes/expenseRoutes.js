const express = require('express');
const router = express.Router();
const ExpenseController = require('../../Controllers/main-finance-controller/expense-controller');
const pool = require('../../config/database');
const controller = new ExpenseController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const expenses = await controller.getAllExpenses();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextExpenseId();
        res.json({ expense_list_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const expense = await controller.getExpenseById(req.params.id);
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const result = await controller.addExpense(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.updateExpense(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.deleteExpense(req.params.id);
        if (result) {
            res.json({ message: 'Expense deleted successfully' });
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/by-tracking-id/:trackingId', authenticateToken, async (req, res) => {
    try {
        const expenses = await controller.getExpenseByTrackingId(req.params.trackingId);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/by-tracking-id/:trackingId', authenticateToken, async (req, res) => {
    try {
        const result = await controller.updateExpenseByTrackingId(req.params.trackingId, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
