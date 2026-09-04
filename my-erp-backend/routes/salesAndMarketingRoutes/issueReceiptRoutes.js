const express = require('express');
const router = express.Router();
const ReceiptIssueController = require('../../Controllers/main-sales-and-marketing-controller/issue-receipt-controller');
const pool = require('../../config/database');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { authenticateToken } = require('../middleware/authMiddleware');

const controller = new ReceiptIssueController(pool);

router.use(authenticateToken);

router.post('/', async (req, res) => {
  try {
    const result = await controller.createReceiptIssue({ ...req.body, created_by: req.user?.id || null });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/batch', async (req, res) => {
  try {
    const receipts = req.body.receipts;
    if (!Array.isArray(receipts)) {
      return res.status(400).json({ error: 'Receipts must be an array' });
    }
    const result = await controller.createReceiptIssuesBatch(receipts, req.user?.id || null);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const receipts = await controller.getAllReceiptIssues();
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/next-si', async (req, res) => {
  try {
    const nextSi = await controller.getNextSINumber();
    res.json({ si_number: nextSi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/aggregated', async (req, res) => {
  try {
    const receipts = await controller.getAggregatedReceipts();
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/pending-receivables', async (req, res) => {
  try {
    const receivables = await controller.getPendingReceivables();
    res.json(receivables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:siNumber/void', async (req, res) => {
  try {
    const success = await controller.voidReceipt(req.params.siNumber);
    if (!success) {
      return res.status(404).json({ error: 'Receipt not found' });
    }
    res.json({ message: 'Receipt voided successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/monthly-sales', async (req, res) => {
  try {
    const sales = await controller.getMonthlySales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/weekly-schedule', async (req, res) => {
  try {
    const schedule = await controller.getWeeklySchedule();
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/weekly-schedule', async (req, res) => {
  try {
    const { schedule } = req.body;
    if (!Array.isArray(schedule)) {
      return res.status(400).json({ error: 'Schedule must be an array' });
    }
    const result = await controller.saveWeeklyScheduleBatch(schedule);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/template', async (req, res) => {
  try {
    const csv = controller.getTemplate();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=receipt_issues_template.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/bulk-upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const csvText = req.file.buffer.toString('utf-8');
    const result = await controller.bulkUploadReceipts(csvText, req.user?.id || null);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:siNumber/pdf', async (req, res) => {
  try {
    const result = await controller.generateReceiptPdf(req.params.siNumber);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:siNumber', async (req, res) => {
  try {
    const receipts = await controller.getReceiptIssuesBySiNumber(req.params.siNumber);
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
