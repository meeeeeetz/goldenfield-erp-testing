const express = require('express');
const router = express.Router();
const RtlTypesController = require('../../Controllers/main-purchasing-controller/rtl-types-controller');
const pool = require('../../config/database');
const controller = new RtlTypesController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextTypeId();
        res.json({ type_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { type_id, company, item, remarks, price, status } = req.body;
        if (!type_id || !company || !item) {
            return res.status(400).json({ error: 'type_id, company, and item are required' });
        }
        const result = await controller.createType(req.body);
        res.status(201).json(result);
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

router.get('/code/:typeId', authenticateToken, async (req, res) => {
    try {
        const type = await controller.getTypeByCode(req.params.typeId);
        if (type) {
            res.json(type);
        } else {
            res.status(404).json({ error: 'RTL Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:typeId', authenticateToken, async (req, res) => {
    try {
        const result = await controller.updateType(req.params.typeId, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'RTL Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
