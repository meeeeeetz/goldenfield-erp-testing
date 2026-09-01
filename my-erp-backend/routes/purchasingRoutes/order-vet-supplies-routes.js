const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const OrderVetSuppliesController = require('../../Controllers/main-purchasing-controller/order-vet-supplies-controller');
const pool = require('../../config/database');
const controller = new OrderVetSuppliesController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

const uploadBase = 'C:\\Users\\ADMIN\\Documents\\uploads\\Veterinary Supplies';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.promises.mkdir(uploadBase, { recursive: true }).then(() => cb(null, uploadBase)).catch(cb);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname || 'order-photo.webp';
        cb(null, originalName);
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

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
        const items = req.body.items || [req.body];
        const invoiceFileBase64 = req.body.invoice_file_base64 || null;
        const invoiceNumber = req.body.sales_invoice || null;
        const invoiceDate = req.body.date || new Date().toISOString().split('T')[0];
        
        const createdOrders = [];
        let firstOrderId = null;
        let filePath = null;
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const nextId = await controller.getNextOrderId();
            if (i === 0) firstOrderId = nextId;
            const result = await controller.addOrder({
                ...item,
                order_id: nextId
            });
            createdOrders.push(result);
        }
        
        if (invoiceFileBase64 && firstOrderId) {
            const fs = require('fs');
            const path = require('path');
            
            const uploadDir = 'C:\\Users\\ADMIN\\Documents\\uploads\\Veterinary Supplies';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            
            const sanitizedInvoice = (invoiceNumber || 'N/A').replace(/[^a-zA-Z0-9-_]/g, '_');
            const sanitizedDate = invoiceDate.replace(/[^0-9-]/g, '_');
            const fileName = `${firstOrderId}_Invoice_${sanitizedInvoice}_${sanitizedDate}.webp`;
            const fullPath = path.join(uploadDir, fileName);
            const urlPath = `/uploads/veterinary-supplies/${fileName}`;
            
            const base64Data = invoiceFileBase64.replace(/^data:image\/webp;base64,/, '');
            fs.writeFileSync(fullPath, base64Data, 'base64');
            
            const updatedOrders = [];
            for (const order of createdOrders) {
                const updated = await controller.updateOrder(order.order_id, { file_path: urlPath });
                updatedOrders.push(updated);
            }
            res.status(201).json(updatedOrders);
        } else {
            res.status(201).json(createdOrders);
        }
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

router.put('/:id/photo', authenticateToken, upload.single('file'), async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const result = await controller.updateOrderPhoto(orderId, `/uploads/veterinary-supplies/${req.file.filename}`);
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
