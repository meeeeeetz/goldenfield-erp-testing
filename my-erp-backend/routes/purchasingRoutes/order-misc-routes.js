const express = require('express');
const router = express.Router();
const OrderMiscController = require('../../Controllers/main-purchasing-controller/order-misc-controller');
const pool = require('../../config/database');
const controller = new OrderMiscController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextOrderId();
        res.json({ order_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { order_id, date, items } = req.body;
        if (!order_id || !date || !items || items.length === 0) {
            return res.status(400).json({ error: 'order_id, date, and items are required' });
        }
        const result = await controller.createOrder(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const search = req.query.search || '';
        const orders = await controller.getAllOrders(search);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:orderId', authenticateToken, async (req, res) => {
    try {
        const order = await controller.getOrderWithItems(req.params.orderId);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:orderId', authenticateToken, async (req, res) => {
    try {
        const result = await controller.deleteOrder(req.params.orderId);
        if (result) {
            res.json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
