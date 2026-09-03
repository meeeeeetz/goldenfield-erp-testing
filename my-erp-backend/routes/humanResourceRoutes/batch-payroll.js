const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const BatchPayrollController = require('../../Controllers/main-human-resources-controller/batch-payroll-controller');
const pool = require('../../config/database');
const controller = new BatchPayrollController(pool);

router.post('/confirm', async (req, res) => {
    try {
        const { payroll_ids, pay_period_start, pay_period_end } = req.body;
        if (!payroll_ids || !Array.isArray(payroll_ids) || payroll_ids.length === 0) {
            return res.status(400).json({ error: 'payroll_ids array is required' });
        }
        const result = await controller.confirmBatchPayroll(payroll_ids, pay_period_start, pay_period_end);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const batches = await controller.getAllBatches();
        res.json(batches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/id/:batchId', async (req, res) => {
    try {
        const batch = await controller.getBatchById(req.params.batchId);
        if (batch) {
            res.json(batch);
        } else {
            res.status(404).json({ error: 'Batch not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:batch_reference/items', async (req, res) => {
    try {
        const batch = await controller.getBatchByReference(req.params.batch_reference);
        if (!batch) {
            return res.status(404).json({ error: 'Batch not found' });
        }
        const items = await controller.getBatchItems(batch.batch_payroll_id);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:batchId/print-data', async (req, res) => {
    try {
        const { batchId } = req.params;
        const result = await controller.getBatchPrintData(batchId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:batchId/pdf', async (req, res) => {
    try {
        const { batchId } = req.params;
        const batch = await controller.getBatchById(batchId);
        if (!batch) {
            return res.status(404).json({ error: 'Batch not found' });
        }

        const formatDate = (d) => {
            const date = new Date(d);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };

        const filename = `batchpayroll_${batch.batch_reference}_${formatDate(batch.pay_period_start)}_to_${formatDate(batch.pay_period_end)}.pdf`;
        const filePath = path.join('C:/Users/ADMIN/Documents/uploads/batchpayroll', filename);

        if (!fs.existsSync(filePath)) {
            try {
                await controller.generateBatchPdf(batchId, null);
            } catch (genErr) {
                console.error('Auto PDF generation failed:', genErr);
                return res.status(500).json({ error: 'PDF not found and auto-generation failed: ' + genErr.message });
            }
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'PDF file not found on server' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:batchId/acknowledgement-pdf', async (req, res) => {
    try {
        const { batchId } = req.params;
        const batch = await controller.getBatchById(batchId);
        if (!batch) {
            return res.status(404).json({ error: 'Batch not found' });
        }

        const formatDate = (d) => {
            const date = new Date(d);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };

        const filename = `batchpayroll_acknowledgement_${batch.batch_reference}_${formatDate(batch.pay_period_start)}_to_${formatDate(batch.pay_period_end)}.pdf`;
        const filePath = path.join('C:/Users/ADMIN/Documents/uploads/batchpayroll', filename);

        if (!fs.existsSync(filePath)) {
            try {
                await controller.generateAcknowledgementPdf(batchId);
            } catch (genErr) {
                console.error('Auto acknowledgement PDF generation failed:', genErr);
                return res.status(500).json({ error: 'PDF not found and auto-generation failed: ' + genErr.message });
            }
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'PDF file not found on server' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:batchReference', async (req, res) => {
    try {
        const batch = await controller.getBatchByReference(req.params.batchReference);
        if (batch) {
            res.json(batch);
        } else {
            res.status(404).json({ error: 'Batch not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
