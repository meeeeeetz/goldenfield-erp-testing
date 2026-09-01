const express = require('express');
const router = express.Router();
const OrderFeedController = require('../../Controllers/main-purchasing-controller/order-feed-controller');
const pool = require('../../config/database');
const controller = new OrderFeedController(pool);
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

router.get('/outstanding-balance', authenticateToken, async (req, res) => {
    try {
        const result = await controller.getOutstandingBalance();
        res.json(result);
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

router.post('/upload', authenticateToken, async (req, res) => {
    try {
        const { fileBase64, fileName } = req.body;
        if (!fileBase64) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const name = fileName || 'order-receipt.webp';
        res.status(201).json({ message: 'File uploaded successfully', fileName: name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/photo', authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { photoBase64 } = req.body;
        if (!photoBase64) {
            return res.status(400).json({ error: 'No photo provided' });
        }
        const fileName = `${orderId}_${Date.now()}.webp`;
        const result = await controller.updateOrderPhoto(orderId, `/uploads/feeds-receipts/${fileName}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id/photo', authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.id;
        const result = await controller.removeOrderPhoto(orderId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/claim-rebates', authenticateToken, async (req, res) => {
    try {
        const { order_ids, rebate_total, rebate_price } = req.body;
        if (!order_ids || !Array.isArray(order_ids) || order_ids.length === 0) {
            return res.status(400).json({ error: 'order_ids array is required' });
        }
        if (typeof rebate_total !== 'number') {
            return res.status(400).json({ error: 'rebate_total must be a number' });
        }
        const result = await controller.claimRebates(order_ids, rebate_total, rebate_price);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/settle', authenticateToken, async (req, res) => {
    try {
        const { order_ids } = req.body;
        if (!order_ids || !Array.isArray(order_ids) || order_ids.length === 0) {
            return res.status(400).json({ error: 'order_ids array is required' });
        }
        const updatedCount = await controller.settleOrders(order_ids);
        res.json({ message: `${updatedCount} order(s) settled successfully`, updated_count: updatedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/bulk', authenticateToken, async (req, res) => {
    try {
        const rows = req.body.rows || [];
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(400).json({ error: 'rows array is required' });
        }
        const result = await controller.bulkUploadOrders(rows);
        res.status(201).json({ message: `Bulk upload completed: ${result.length} orders saved`, orders: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
