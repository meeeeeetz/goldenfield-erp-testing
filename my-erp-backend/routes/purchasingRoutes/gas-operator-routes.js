const express = require('express');
const router = express.Router();
const GasOperatorController = require('../../Controllers/main-purchasing-controller/gas-operator-controller');
const pool = require('../../config/database');
const controller = new GasOperatorController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const search = req.query.search || '';
        const operators = await controller.getAllOperators(search);
        res.json(operators);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextOperatorId();
        res.json({ gas_operator_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const operator = await controller.getOperatorByCode(req.params.id);
        if (operator) {
            res.json(operator);
        } else {
            res.status(404).json({ error: 'Gas operator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/code/:gasOperatorId', authenticateToken, async (req, res) => {
    try {
        const operator = await controller.getOperatorByCode(req.params.gasOperatorId);
        if (operator) {
            res.json(operator);
        } else {
            res.status(404).json({ error: 'Gas operator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const result = await controller.addOperator(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.updateOperator(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Gas operator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await controller.deleteOperator(req.params.id);
        if (result) {
            res.json({ message: 'Gas operator deleted successfully' });
        } else {
            res.status(404).json({ error: 'Gas operator not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
