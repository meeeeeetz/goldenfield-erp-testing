const express = require('express');
const router = express.Router();
const OvertimeLogController = require('../../Controllers/main-human-resources-controller/overtime-log-controller');
const pool = require('../../config/database');
const controller = new OvertimeLogController(pool);

router.post('/save', async (req, res) => {
    try {
        const logs = req.body.logs || [];
        if (!Array.isArray(logs) || logs.length === 0) {
            return res.status(400).json({ error: 'No overtime logs provided' });
        }
        const result = await controller.saveOvertimeLogs(logs);
        res.status(201).json({ message: 'Overtime logs saved successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/pending', async (req, res) => {
    try {
        const logs = await controller.getPendingOvertimeLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const logs = await controller.getAllOvertimeLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/approve', async (req, res) => {
    try {
        const overtimeId = req.params.id;
        const result = await controller.approveOvertimeLog(overtimeId);
        if (result) {
            res.json({ message: 'Overtime log approved successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending overtime log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/reject/:id', async (req, res) => {
    try {
        const overtimeId = req.params.id;
        const result = await controller.rejectOvertimeLog(overtimeId);
        if (result) {
            res.json({ message: 'Overtime log rejected successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending overtime log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/bulk-approve', async (req, res) => {
    try {
        const { overtime_ids } = req.body;
        if (!Array.isArray(overtime_ids) || overtime_ids.length === 0) {
            return res.status(400).json({ error: 'No overtime IDs provided' });
        }
        const result = await controller.bulkApproveOvertimeLogs(overtime_ids);
        res.json({ message: `Approved ${result.approved.length} overtime log(s)`, data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/bulk-reject', async (req, res) => {
    try {
        const { overtime_ids } = req.body;
        if (!Array.isArray(overtime_ids) || overtime_ids.length === 0) {
            return res.status(400).json({ error: 'No overtime IDs provided' });
        }
        const result = await controller.bulkRejectOvertimeLogs(overtime_ids);
        res.json({ message: `Rejected ${result.rejected.length} overtime log(s)`, data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
