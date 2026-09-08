const express = require('express');
const router = express.Router();
const VetSuppliesUseController = require('../../Controllers/main-purchasing-controller/vet-supplies-use-controller');
const pool = require('../../config/database');
const controller = new VetSuppliesUseController(pool);
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

router.use(authenticateToken);
router.use(requireModulePermission('purchasing-veterinary-supplies'));

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextUseId();
        res.json({ use_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const records = req.body.records || [req.body];
        if (!Array.isArray(records) || records.length === 0) {
            return res.status(400).json({ error: 'records array is required' });
        }

        const validRecords = records.filter(r => r.item && r.item.trim() !== '');
        if (validRecords.length === 0) {
            return res.status(400).json({ error: 'No valid records to save' });
        }

        const result = await controller.bulkAddUseRecords(validRecords);
        res.status(201).json({ message: `Saved ${result.length} records`, records: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const records = await controller.getAllUseRecords(search);
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const record = await controller.getUseRecordById(req.params.id);
        if (record) {
            res.json(record);
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
