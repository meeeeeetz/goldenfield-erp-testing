const express = require('express');
const router = express.Router();
const ElectricBillController = require('../../Controllers/main-purchasing-controller/electric-bill-controller');
const pool = require('../../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const controller = new ElectricBillController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

const uploadBase = 'C:\\Users\\ADMIN\\Documents\\uploads\\Electric Bill';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.promises.mkdir(uploadBase, { recursive: true }).then(() => cb(null, uploadBase)).catch(cb);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname || 'electric-bill.webp';
        cb(null, originalName);
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const fileName = req.file.filename;
        const fileUrl = `/uploads/electric-bills/${fileName}`;
        res.status(201).json({ message: 'File uploaded successfully', filePath: fileUrl, fileName });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/chart-data', authenticateToken, async (req, res) => {
    try {
        const chartData = await controller.getChartData();
        res.json(chartData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/latest-comparison', authenticateToken, async (req, res) => {
    try {
        const comparison = await controller.getLatestMonthComparison();
        res.json(comparison);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const bills = await controller.getAllElectricBills();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextElectricBillId();
        res.json({ electric_bill_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const bill = await controller.getElectricBillById(req.params.id);
        if (bill) {
            res.json(bill);
        } else {
            res.status(404).json({ error: 'Electric bill not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const result = await controller.addElectricBill(req.body, req.user.id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.updateElectricBill(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Electric bill not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.deleteElectricBill(req.params.id);
        if (result) {
            res.json({ message: 'Electric bill deleted successfully' });
        } else {
            res.status(404).json({ error: 'Electric bill not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
