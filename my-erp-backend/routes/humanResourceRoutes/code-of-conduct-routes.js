const express = require('express');
const router = express.Router();
const CodeOfConductController = require('../../Controllers/main-human-resources-controller/code-of-conduct-controller');
const pool = require('../../config/database');
const controller = new CodeOfConductController(pool);

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const status = req.query.status || '';
        const records = await controller.getAllCodeOfConduct(search, status);
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextCocId();
        res.json({ coc_code: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/code/:cocCode', async (req, res) => {
    try {
        const record = await controller.getCodeOfConductByCode(req.params.cocCode);
        if (record) {
            res.json(record);
        } else {
            res.status(404).json({ error: 'Code of Conduct not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const record = await controller.getCodeOfConductById(req.params.id);
        if (record) {
            res.json(record);
        } else {
            res.status(404).json({ error: 'Code of Conduct not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addCodeOfConduct(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateCodeOfConduct(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Code of Conduct not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteCodeOfConduct(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Code of Conduct deleted successfully' });
        } else {
            res.status(404).json({ error: 'Code of Conduct not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
