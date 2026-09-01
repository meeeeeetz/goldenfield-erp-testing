const express = require('express');
const router = express.Router();
const ShiftPolicyController = require('../../Controllers/main-human-resources-controller/shift-policy-controller');
const pool = require('../../config/database');
const controller = new ShiftPolicyController(pool);

router.get('/', async (req, res) => {
    try {
        const status = req.query.status;
        const shiftPolicies = await controller.getActiveShiftPolicies(status);
        res.json(shiftPolicies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextShiftPolicyId();
        res.json({ shift_policy_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const shiftPolicy = await controller.getShiftPolicyById(req.params.id);
        if (shiftPolicy) {
            res.json(shiftPolicy);
        } else {
            res.status(404).json({ error: 'Shift policy not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addShiftPolicy(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateShiftPolicy(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Shift policy not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteShiftPolicy(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Shift policy deleted successfully' });
        } else {
            res.status(404).json({ error: 'Shift policy not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
