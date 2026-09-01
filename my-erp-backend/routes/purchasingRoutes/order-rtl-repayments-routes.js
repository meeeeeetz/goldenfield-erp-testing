const express = require('express');
const router = express.Router();
const OrderRtlRepaymentsController = require('../../Controllers/main-purchasing-controller/order-rtl-repayments-controller');
const pool = require('../../config/database');
const controller = new OrderRtlRepaymentsController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const repayments = await controller.getAllRepayments();
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextRepaymentId();
        res.json({ repayment_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { repayment_id, order_id, payment_type, payment_amount, starting_amount, remaining_balance, bank_source, check_number, date, status } = req.body;
        if (!repayment_id || !order_id || !payment_amount || !date) {
            return res.status(400).json({ error: 'repayment_id, order_id, payment_amount, and date are required' });
        }
        const result = await controller.createRepayment(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/order/:orderId', authenticateToken, async (req, res) => {
    try {
        const repayments = await controller.getRepaymentByOrderId(req.params.orderId);
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/repayment-id/:repaymentId', authenticateToken, async (req, res) => {
    try {
        const result = await controller.deleteRepayment(req.params.repaymentId);
        if (result) {
            res.json({ message: 'Repayment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Repayment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
