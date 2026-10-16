
const express = require('express');
const router = express.Router();
const ChickenHaulingController = require('../../Controllers/main-human-resources-controller/chicken-hauling-controller');
const pool = require('../../config/database');
const controller = new ChickenHaulingController(pool);

// POST /api/chicken-hauling - Save a new chicken hauling log
router.post('/', async (req, res) => {
    try {
        const { hauling_id, building_id, days, day_entries, workers, grand_total, date_start, date_end, status } = req.body;
        
        if (!hauling_id || !building_id || !days || !day_entries || !workers) {
            return res.status(400).json({ 
                error: 'hauling_id, building_id, days, day_entries, and workers are required' 
            });
        }
        
        const haulingLog = await controller.createHaulingLog({
            hauling_id,
            building_id,
            days,
            day_entries,
            workers,
            grand_total,
            date_start,
            date_end,
            status: status || 'pending'
        });
        
        res.status(201).json(haulingLog);
    } catch (error) {
        console.error('Error creating chicken hauling log:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/chicken-hauling?status=pending - Get hauling logs by status
router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        
        if (!status) {
            return res.status(400).json({ error: 'status query parameter is required' });
        }
        
        const haulingLogs = await controller.getHaulingLogsByStatus(status);
        res.json(haulingLogs);
    } catch (error) {
        console.error('Error fetching chicken hauling logs:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/chicken-hauling/max-id - Get the max hauling ID for counter initialization
router.get('/max-id', async (req, res) => {
    try {
        const maxId = await controller.getMaxHaulingId();
        res.json({ max_id: maxId });
    } catch (error) {
        console.error('Error fetching max hauling ID:', error);
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: 'hauling ID is required' });
        }
        
        const haulingLog = await controller.getHaulingLogById(id);
        
        if (!haulingLog) {
            return res.status(404).json({ error: 'Chicken hauling log not found' });
        }
        
        res.json(haulingLog);
    } catch (error) {
        console.error('Error fetching chicken hauling log by ID:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

