const express = require('express');
const router = express.Router();
const LayerBuildingsController = require('../../Controllers/main-operations-controller/layer-buildings-controller');
const pool = require('../../config/database');

const controller = new LayerBuildingsController(pool);

router.get('/buildings', async (req, res) => {
    try {
        const buildings = await controller.getAllBuildings();
        res.json(buildings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/buildings/active', async (req, res) => {
    try {
        const buildings = await controller.getActiveBuildings();
        res.json(buildings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/buildings/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextBuildingId();
        res.json({ building_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/buildings/:buildingId', async (req, res) => {
    try {
        const building = await controller.getBuildingById(req.params.buildingId);
        if (building) {
            res.json(building);
        } else {
            res.status(404).json({ error: 'Building not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/buildings', async (req, res) => {
    try {
        const building = await controller.createBuilding(req.body);
        res.status(201).json(building);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/buildings/:buildingId', async (req, res) => {
    try {
        const building = await controller.updateBuilding(req.params.buildingId, req.body);
        if (building) {
            res.json(building);
        } else {
            res.status(404).json({ error: 'Building not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/buildings/:buildingId', async (req, res) => {
    try {
        const deleted = await controller.deleteBuilding(req.params.buildingId);
        if (deleted) {
            res.json({ message: 'Building deleted successfully' });
        } else {
            res.status(404).json({ error: 'Building not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
