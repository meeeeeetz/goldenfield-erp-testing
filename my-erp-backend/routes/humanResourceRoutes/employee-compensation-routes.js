const express = require('express');
const router = express.Router();
const EmployeeCompensationController = require('../../Controllers/main-human-resources-controller/employee-compensation-controller');
const pool = require('../../config/database');
const controller = new EmployeeCompensationController(pool);

router.get('/', async (req, res) => {
    try {
        const compensations = await controller.getAllCompensations();
        res.json(compensations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextCompensationId();
        res.json({ compensation_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const compensation = await controller.getCompensationById(req.params.id);
        if (compensation) {
            res.json(compensation);
        } else {
            res.status(404).json({ error: 'Compensation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const compensation = await controller.getCompensationByEmployeeId(req.params.employeeId);
        if (compensation) {
            res.json(compensation);
        } else {
            res.status(404).json({ error: 'Compensation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addCompensation(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateCompensation(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Compensation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteCompensation(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Compensation deleted successfully' });
        } else {
            res.status(404).json({ error: 'Compensation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/sync-department/:employeeId', async (req, res) => {
    try {
        const result = await controller.syncDepartmentToProfile(req.params.employeeId);
        if (result) {
            res.json({ message: 'Department synced successfully', data: result });
        } else {
            res.status(404).json({ error: 'No compensation record found for this employee' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/sync-all-departments', async (req, res) => {
    try {
        const result = await controller.syncAllDepartmentsToProfile();
        res.json({ message: 'All departments synced successfully', count: result.length, data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
