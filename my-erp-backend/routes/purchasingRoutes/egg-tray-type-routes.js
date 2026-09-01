const express = require('express');
const router = express.Router();
const EggTrayTypeController = require('../../Controllers/main-purchasing-controller/egg-tray-type-controller');
const pool = require('../../config/database');
const controller = new EggTrayTypeController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/active', async (req, res) => {
    try {
        const types = await controller.getAllTypes('');
        const active = types.filter(t => t.status === 'Active');
        res.json(active);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const search = req.query.search || '';
        const types = await controller.getAllTypes(search);
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextTypeId();
        res.json({ type_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/active-suppliers', authenticateToken, async (req, res) => {
    try {
        const suppliers = await controller.getActiveSuppliers();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/code/:typeId', authenticateToken, async (req, res) => {
    try {
        const type = await controller.getTypeByCode(req.params.typeId);
        if (type) {
            res.json(type);
        } else {
            res.status(404).json({ error: 'Egg Tray Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const type = await controller.getTypeByCode(req.params.id);
        if (type) {
            res.json(type);
        } else {
            res.status(404).json({ error: 'Egg Tray Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const result = await controller.addType(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.updateType(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Egg Tray Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.deleteType(req.params.id);
        if (result) {
            res.json({ message: 'Egg Tray Type deleted successfully' });
        } else {
            res.status(404).json({ error: 'Egg Tray Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
