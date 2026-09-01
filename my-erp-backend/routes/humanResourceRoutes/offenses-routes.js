const express = require('express');
const router = express.Router();
const OffensesController = require('../../Controllers/main-human-resources-controller/offenses-controller');
const pool = require('../../config/database');
const controller = new OffensesController(pool);

router.get('/stats', async (req, res) => {
    try {
        const stats = await controller.getOffenseStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const offenses = await controller.getAllOffenses();
        res.json(offenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const offense = await controller.getOffenseById(req.params.id);
        if (offense) {
            res.json(offense);
        } else {
            res.status(404).json({ error: 'Offense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const offense = await controller.addOffense(req.body);
        res.status(201).json(offense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteOffense(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Offense deleted successfully' });
        } else {
            res.status(404).json({ error: 'Offense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/documents', async (req, res) => {
    try {
        const { doc_type, html_content } = req.body;
        if (!doc_type || html_content === undefined) {
            return res.status(400).json({ error: 'doc_type and html_content are required' });
        }
        
        const result = await controller.saveDocument(doc_type, html_content);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/documents/:doc_type', async (req, res) => {
    try {
        const { doc_type } = req.params;
        const result = await controller.getDocument(doc_type);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
