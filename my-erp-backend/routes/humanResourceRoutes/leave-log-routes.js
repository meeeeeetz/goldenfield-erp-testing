const express = require('express');
const router = express.Router();
const LeaveLogController = require('../../Controllers/main-human-resources-controller/leave-log-controller');
const pool = require('../../config/database');
const controller = new LeaveLogController(pool);

router.post('/save', async (req, res) => {
    try {
        const logs = req.body.logs || [];
        if (!Array.isArray(logs) || logs.length === 0) {
            return res.status(400).json({ error: 'No leave logs provided' });
        }
        const result = await controller.saveLeaveLogs(logs);
        res.status(201).json({ message: 'Leave logs saved successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/pending', async (req, res) => {
    try {
        const logs = await controller.getPendingLeaveLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const logs = await controller.getAllLeaveLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/approve', async (req, res) => {
    try {
        const leaveId = req.params.id;
        const result = await controller.approveLeaveLog(leaveId);
        if (result) {
            res.json({ message: 'Leave log approved successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending leave log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/test-reject-route', async (req, res) => {
    res.json({ message: 'test route works' });
});

router.put('/reject/:id', async (req, res) => {
    try {
        const leaveId = req.params.id;
        const result = await controller.rejectLeaveLog(leaveId);
        if (result) {
            res.json({ message: 'Leave log rejected successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending leave log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const logs = await controller.getLeaveLogsByEmployee(req.params.employeeId);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
