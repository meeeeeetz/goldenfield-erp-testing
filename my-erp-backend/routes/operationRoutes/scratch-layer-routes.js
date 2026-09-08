const express = require('express');
const router = express.Router();
const ScratchLayerController = require('../../Controllers/main-operations-controller/scratch-layer-controller');
const pool = require('../../config/database');
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

const controller = new ScratchLayerController(pool);

router.use(authenticateToken);
router.use(requireModulePermission('operations-layer-buildings'));

router.get('/', async (req, res) => {
    try {
        const entries = await controller.getAll();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const entry = await controller.getById(req.params.id);
        if (!entry) {
            return res.status(404).json({ error: 'Scratch entry not found' });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, row_data } = req.body;
        if (!row_data) {
            return res.status(400).json({ error: 'row_data is required' });
        }
        const entry = await controller.create({ name, row_data });
        res.status(201).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, row_data } = req.body;
        const entry = await controller.update(req.params.id, { name, row_data });
        if (!entry) {
            return res.status(404).json({ error: 'Scratch entry not found' });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const entry = await controller.delete(req.params.id);
        if (!entry) {
            return res.status(404).json({ error: 'Scratch entry not found' });
        }
        res.json({ message: 'Scratch entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
