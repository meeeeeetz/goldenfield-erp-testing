const express = require('express');
const router = express.Router();
const AttendanceLogController = require('../../Controllers/main-human-resources-controller/attendance-log-controller');
const pool = require('../../config/database');
const controller = new AttendanceLogController(pool);

router.get('/search-employee', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.json([]);
        }
        const employees = await controller.searchActiveEmployees(query);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/employee/:id', async (req, res) => {
    try {
        const employee = await controller.getEmployeeById(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/save', async (req, res) => {
    try {
        const logs = req.body.logs || [];
        if (!Array.isArray(logs) || logs.length === 0) {
            return res.status(400).json({ error: 'No attendance logs provided' });
        }
        const result = await controller.saveAttendanceLog(logs);
        res.status(201).json({ message: 'Attendance logs saved successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/shift-policy/:type', async (req, res) => {
    try {
        const shiftType = req.params.type;
        const policy = await controller.getShiftPolicyByType(shiftType);
        if (policy) {
            res.json(policy);
        } else {
            res.status(404).json({ error: 'Shift policy not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/pending', async (req, res) => {
    try {
        const logs = await controller.getPendingAttendanceLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const logs = await controller.getAllAttendanceLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/approve', async (req, res) => {
    try {
        const attendanceId = req.params.id;
        const result = await controller.approveAttendanceLog(attendanceId);
        if (result) {
            res.json({ message: 'Attendance log approved successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending attendance log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/reject/:id', async (req, res) => {
    try {
        const attendanceId = req.params.id;
        const result = await controller.rejectAttendanceLog(attendanceId);
        if (result) {
            res.json({ message: 'Attendance log rejected successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending attendance log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/bulk-approve', async (req, res) => {
    try {
        const { attendance_ids } = req.body;
        if (!attendance_ids || !Array.isArray(attendance_ids) || attendance_ids.length === 0) {
            return res.status(400).json({ error: 'attendance_ids array is required' });
        }
        const result = await controller.bulkApproveAttendanceLogs(attendance_ids);
        const message = `${result.approved.length} attendance log(s) approved successfully`;
        const response = { message, data: result.approved };
        if (result.skipped.length > 0) {
            response.skipped = result.skipped;
            response.warning = `${result.skipped.length} record(s) were skipped because they are not pending`;
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/bulk-reject', async (req, res) => {
    try {
        const { attendance_ids } = req.body;
        if (!attendance_ids || !Array.isArray(attendance_ids) || attendance_ids.length === 0) {
            return res.status(400).json({ error: 'attendance_ids array is required' });
        }
        const result = await controller.bulkRejectAttendanceLogs(attendance_ids);
        const message = `${result.rejected.length} attendance log(s) rejected successfully`;
        const response = { message, data: result.rejected };
        if (result.skipped.length > 0) {
            response.skipped = result.skipped;
            response.warning = `${result.skipped.length} record(s) were skipped because they are not pending`;
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
