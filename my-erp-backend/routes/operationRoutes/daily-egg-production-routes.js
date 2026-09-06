const express = require('express');
const router = express.Router();
const DailyEggProductionController = require('../../Controllers/main-operations-controller/daily-egg-production-controller');
const pool = require('../../config/database');
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

const controller = new DailyEggProductionController(pool);

router.use(authenticateToken);
router.use(requireModulePermission('operations-egg-production'));

router.get('/', async (req, res) => {
    try {
        const reports = await controller.getAllReports();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:reportId', async (req, res) => {
    try {
        const report = await controller.getReportById(req.params.reportId);
        if (report) {
            res.json(report);
        } else {
            res.status(404).json({ error: 'Report not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const report = await controller.saveReport(req.body);
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
