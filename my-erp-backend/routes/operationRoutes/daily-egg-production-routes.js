const express = require('express');
const router = express.Router();
const DailyEggProductionController = require('../../Controllers/main-operations-controller/daily-egg-production-controller');
const pool = require('../../config/database');
const { authenticateToken } = require('../../middleware/authMiddleware');

const controller = new DailyEggProductionController(pool);

router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const records = await controller.getAllDailyEggProductions();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextProductionId();
        res.json({ production_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/latest', async (req, res) => {
    try {
        const record = await controller.getLatestDailyEggProduction();
        if (record) {
            res.json(record);
        } else {
            res.status(404).json({ error: 'No daily egg production records found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/check-date/:date', async (req, res) => {
    try {
        const record = await controller.getDailyEggProductionByDate(req.params.date);
        if (record) {
            res.json({ exists: true, record });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const record = await controller.getDailyEggProductionById(req.params.id);
        if (record) {
            res.json(record);
        } else {
            res.status(404).json({ error: 'Daily egg production record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        if (!data.production_id || !data.date) {
            return res.status(400).json({ error: 'production_id and date are required' });
        }
        const record = await controller.createDailyEggProduction({ ...data, created_by: req.user?.id || null });
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const record = await controller.updateDailyEggProduction(req.params.id, { ...req.body, created_by: req.user?.id || null });
        if (record) {
            res.json(record);
        } else {
            res.status(404).json({ error: 'Daily egg production record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const success = await controller.deleteDailyEggProduction(req.params.id);
        if (success) {
            res.json({ message: 'Daily egg production record deleted successfully' });
        } else {
            res.status(404).json({ error: 'Daily egg production record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
