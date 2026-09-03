const express = require('express');
const router = express.Router();
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
        const result = await controller.generateBatchPdf(batchId, null);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${result.filename}"`);
        res.send(result.buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:batchId/acknowledgement-pdf', async (req, res) => {
    try {
        const { batchId } = req.params;
        const result = await controller.generateAcknowledgementPdf(batchId);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${result.filename}"`);
        res.send(result.buffer);
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
