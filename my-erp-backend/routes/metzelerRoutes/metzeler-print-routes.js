const express = require('express');
const router = express.Router();
const MetzelerPrintController = require('../../Controllers/main-metzeler-controller/metzeler-print-controller');
const pool = require('../../config/database');
const { authenticateToken } = require('../../middleware/authMiddleware');

const controller = new MetzelerPrintController(pool);

router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const templates = await controller.getAllTemplates();
        res.json(templates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const template = await controller.getTemplateById(req.params.id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { filename, content_payload } = req.body;
        if (!filename) {
            return res.status(400).json({ error: 'filename is required' });
        }
        const template = await controller.createTemplate({ filename, content_payload });
        res.status(201).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { filename, content_payload } = req.body;
        const template = await controller.updateTemplate(req.params.id, { filename, content_payload });
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const template = await controller.deleteTemplate(req.params.id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json({ message: 'Template deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
