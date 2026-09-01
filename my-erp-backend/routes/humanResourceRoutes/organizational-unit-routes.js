const express = require('express');
const router = express.Router();
const OrganizationalUnitController = require('../../Controllers/main-human-resources-controller/organizational-unit-controller');
const pool = require('../../config/database');
const controller = new OrganizationalUnitController(pool);

router.get('/', async (req, res) => {
    try {
        const status = req.query.status || '';
        const units = await controller.getAllUnits(status);
        res.json(units);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextUnitId();
        res.json({ org_unit_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const unit = await controller.getUnitById(req.params.id);
        if (unit) {
            res.json(unit);
        } else {
            res.status(404).json({ error: 'Organizational unit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addUnit(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateUnit(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Organizational unit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteUnit(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Organizational unit deleted successfully' });
        } else {
            res.status(404).json({ error: 'Organizational unit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
