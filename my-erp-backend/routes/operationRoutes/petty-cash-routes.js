const express = require('express');
const router = express.Router();
const PettyCashController = require('../../Controllers/main-operations-controller/petty-cash-controller');
const pool = require('../../config/database');

const controller = new PettyCashController(pool);

router.get('/', async (req, res) => {
    try {
        const transactions = await controller.getAllPettyCashTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/status/:status', async (req, res) => {
    try {
        const transactions = await controller.getPettyCashTransactionsByStatus(req.params.status);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await controller.getPettyCashStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pettyCashId', async (req, res) => {
    try {
        const transaction = await controller.getPettyCashTransactionById(req.params.pettyCashId);
        if (transaction) {
            res.json(transaction);
        } else {
            res.status(404).json({ error: 'Petty cash transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { date, pettycashcategory, item, remarks, store, amount, status, replenish_amount } = req.body;
        if (!date || !pettycashcategory || !item || !amount) {
            return res.status(400).json({ error: 'date, pettycashcategory, item, and amount are required' });
        }
        const transaction = await controller.addPettyCashTransaction({
            date,
            pettycashcategory,
            item,
            remarks,
            store,
            amount,
            status,
            replenish_amount
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/replenish', async (req, res) => {
    try {
        const { date, source, replenish_amount, check_number, status } = req.body;
        if (!date || !source || !replenish_amount) {
            return res.status(400).json({ error: 'date, source, and replenish_amount are required' });
        }
        const transaction = await controller.addReplenishTransaction({
            date,
            source,
            replenish_amount,
            check_number,
            status
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:pettyCashId', async (req, res) => {
    try {
        const transaction = await controller.updatePettyCashTransaction(req.params.pettyCashId, req.body);
        if (transaction) {
            res.json(transaction);
        } else {
            res.status(404).json({ error: 'Petty cash transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:pettyCashId', async (req, res) => {
    try {
        const success = await controller.deletePettyCashTransaction(req.params.pettyCashId);
        if (success) {
            res.json({ message: 'Petty cash transaction deleted successfully' });
        } else {
            res.status(404).json({ error: 'Petty cash transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
