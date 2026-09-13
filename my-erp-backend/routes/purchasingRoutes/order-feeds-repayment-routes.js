const express = require('express');
const router = express.Router();
const OrderFeedRepaymentController = require('../../Controllers/main-purchasing-controller/order-feeds-repayment-controller');
const pool = require('../../config/database');
const controller = new OrderFeedRepaymentController(pool);
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

router.use(authenticateToken);
router.use(requireModulePermission('purchasing-feeds'));

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextRepaymentId();
        res.json({ repayment_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const repayments = await controller.getAllRepayments();
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
        try {
            const { repayment_id, order_id, bank_source, check_number, total, date } = req.body;
            
            if (!repayment_id || !order_id || typeof total !== 'number') {
                return res.status(400).json({ error: 'repayment_id, order_id, and total are required' });
            }

            const result = await controller.createRepayment(repayment_id, order_id, bank_source, check_number, total, date);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

module.exports = router;
