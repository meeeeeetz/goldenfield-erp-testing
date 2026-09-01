const express = require('express');
const router = express.Router();
const OnboardingDocumentsController = require('../../Controllers/main-human-resources-controller/onboarding-documents-controller');
const pool = require('../../config/database');
const controller = new OnboardingDocumentsController(pool);

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
