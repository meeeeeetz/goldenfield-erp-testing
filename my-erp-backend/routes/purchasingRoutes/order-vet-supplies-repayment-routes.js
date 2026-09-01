const express = require('express');
const router = express.Router();
const OrderVetSuppliesRepaymentController = require('../../Controllers/main-purchasing-controller/order-vet-supplies-repayment-controller');
const pool = require('../../config/database');
const controller = new OrderVetSuppliesRepaymentController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextRepaymentId();
        res.json({ repayment_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const repayments = await controller.getAllRepayments();
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { repayment_id, order_id, bank_source, check_number, total } = req.body;

        if (!repayment_id || !order_id || typeof total !== 'number') {
            return res.status(400).json({ error: 'repayment_id, order_id, and total are required' });
        }

        const result = await controller.createRepayment({
            repayment_id,
            order_id,
            bank_source,
            check_number,
            total
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/batch', authenticateToken, async (req, res) => {
    try {
        const { items, bank_source, check_number } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'items array is required' });
        }

        const results = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const uniqueRepaymentId = await controller.getNextRepaymentId();
            const result = await controller.createRepayment({
                repayment_id: uniqueRepaymentId,
                order_id: item.order_id,
                bank_source: bank_source || null,
                check_number: check_number || null,
                total: parseFloat(item.total) || 0
            });
            results.push(result);
        }
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
