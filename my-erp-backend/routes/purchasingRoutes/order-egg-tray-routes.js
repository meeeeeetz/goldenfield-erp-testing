const express = require('express');
const router = express.Router();
const OrderEggTrayController = require('../../Controllers/main-purchasing-controller/order-egg-tray-controller');
const pool = require('../../config/database');
const controller = new OrderEggTrayController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const search = req.query.search || '';
        const orders = await controller.getAllOrders(search);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextOrderId();
        res.json({ order_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats/total-quantity', authenticateToken, async (req, res) => {
    try {
        const totalQuantity = await controller.getTotalQuantityOrdered();
        res.json({ total_quantity: totalQuantity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats/outstanding-balance', authenticateToken, async (req, res) => {
    try {
        const outstandingBalance = await controller.getOutstandingBalance();
        res.json({ outstanding_balance: outstandingBalance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const order = await controller.getOrderByCode(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const result = await controller.addOrder(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.updateOrder(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.deleteOrder(req.params.id);
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
