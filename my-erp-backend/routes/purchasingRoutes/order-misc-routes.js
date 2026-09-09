const express = require('express');
const router = express.Router();
const OrderMiscController = require('../../Controllers/main-purchasing-controller/order-misc-controller');
const pool = require('../../config/database');
const controller = new OrderMiscController(pool);
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');
const { uploadFile, getPublicUrl } = require('../../utils/supabaseStorage');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.use(authenticateToken);
router.use(requireModulePermission('purchasing-other-expenses'));

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextOrderId();
        res.json({ order_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const orders = await controller.getAllOrders(search);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats/outstanding-balance', async (req, res) => {
    try {
        const outstandingBalance = await controller.getOutstandingBalance();
        res.json({ outstanding_balance: outstandingBalance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats/monthly-expenses', async (req, res) => {
    try {
        const stats = await controller.getMonthlyExpenseStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:orderId', async (req, res) => {
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

router.delete('/:orderId', async (req, res) => {
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

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const timestamp = Date.now();
        const originalName = req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const destination = `misc-expenses/${timestamp}_${originalName}`;

        const result = await uploadFile(req.file.buffer, destination, {
            contentType: req.file.mimetype
        });

        res.status(201).json({
            message: 'File uploaded successfully',
            fileName: result.fileName,
            publicUrl: result.publicUrl,
            size: req.file.size
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/item/:itemId/photo', async (req, res) => {
    try {
        const { file_path } = req.body;
        const item = await controller.getOrderItemById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ error: 'Order item not found' });
        }
        if (file_path === null && item.file_path) {
            await controller.deleteOrderItemPhoto(req.params.itemId);
        } else {
            await controller.updateOrderItemPhoto(req.params.itemId, file_path);
        }
        const updated = await controller.getOrderItemById(req.params.itemId);
        res.json({
            ...updated,
            file_url: updated.file_path ? getPublicUrl(updated.file_path) : null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/item/:itemId/photo', async (req, res) => {
    try {
        const item = await controller.getOrderItemById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ error: 'Order item not found' });
        }
        await controller.deleteOrderItemPhoto(req.params.itemId);
        res.json({ message: 'Photo removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:orderId/photo', async (req, res) => {
    try {
        const { file_path } = req.body;
        const order = await controller.getOrderWithItems(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        if (file_path === null && order.file_path) {
            await controller.deleteOrderPhoto(req.params.orderId);
        } else {
            await controller.updateOrderPhoto(req.params.orderId, file_path);
        }
        const updated = await controller.getOrderWithItems(req.params.orderId);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:orderId/photo', async (req, res) => {
    try {
        const order = await controller.getOrderWithItems(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        await controller.deleteOrderPhoto(req.params.orderId);
        res.json({ message: 'Photo removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
