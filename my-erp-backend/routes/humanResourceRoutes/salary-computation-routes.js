const express = require('express');
const router = express.Router();
const SalaryComputationController = require('../../Controllers/main-human-resources-controller/salary-computation-controller');
const pool = require('../../config/database');
const controller = new SalaryComputationController(pool);

router.get('/search', async (req, res) => {
    try {
        const query = req.query.q || '';
        if (!query || query.length < 2) {
            return res.json([]);
        }
        const results = await controller.searchEmployees(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/totals/attendance', async (req, res) => {
    try {
        const employeeId = req.query.employee_id;
        const dateFrom = req.query.date_from;
        const dateTo = req.query.date_to;
        if (!employeeId || !dateFrom || !dateTo) {
            return res.status(400).json({ error: 'employee_id, date_from, and date_to are required' });
        }
        const result = await controller.getAttendanceTotals(employeeId, dateFrom, dateTo);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/totals/overtime', async (req, res) => {
    try {
        const employeeId = req.query.employee_id;
        const dateFrom = req.query.date_from;
        const dateTo = req.query.date_to;
        if (!employeeId || !dateFrom || !dateTo) {
            return res.status(400).json({ error: 'employee_id, date_from, and date_to are required' });
        }
        const result = await controller.getOvertimeTotals(employeeId, dateFrom, dateTo);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/totals/leaves', async (req, res) => {
    try {
        const employeeId = req.query.employee_id;
        const dateFrom = req.query.date_from;
        const dateTo = req.query.date_to;
        if (!employeeId || !dateFrom || !dateTo) {
            return res.status(400).json({ error: 'employee_id, date_from, and date_to are required' });
        }
        const result = await controller.getLeaveTotals(employeeId, dateFrom, dateTo);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/totals/salary', async (req, res) => {
    try {
        const employeeId = req.query.employee_id;
        const dateFrom = req.query.date_from;
        const dateTo = req.query.date_to;
        if (!employeeId || !dateFrom || !dateTo) {
            return res.status(400).json({ error: 'employee_id, date_from, and date_to are required' });
        }
        const result = await controller.getSalaryTotals(employeeId, dateFrom, dateTo);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/outstanding/losses-damages/:employeeId', async (req, res) => {
    try {
        const result = await controller.getOutstandingLossesDamages(req.params.employeeId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
