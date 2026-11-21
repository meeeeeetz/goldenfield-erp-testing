const express = require('express');
const router = express.Router();
const TurksBranchStaffDayController = require('../../Controllers/main-metzeler-controller/turks-branch-staff-day-controller');
const pool = require('../../config/database');
const { authenticateToken } = require('../../middleware/authMiddleware');

const controller = new TurksBranchStaffDayController(pool);

router.use(authenticateToken);

router.post('/', async (req, res) => {
    try {
        const { branch_code, staff_day } = req.body;
        if (!branch_code || !staff_day || !Array.isArray(staff_day) || staff_day.length === 0) {
            return res.status(400).json({ error: 'branch_code and staff_day array are required' });
        }
        
        // Validate each item has required fields
        for (const item of staff_day) {
            if (!item.day_of_week || item.pax === undefined) {
                return res.status(400).json({ error: 'Each staff_day item must have day_of_week and pax' });
            }
        }
        
        const saved = await controller.saveStaffDay(branch_code, staff_day, req.user.id);
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const staffDay = await controller.getAllStaffDay();
        res.json(staffDay);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:branchCode', async (req, res) => {
    try {
        const staffDay = await controller.getStaffDayByBranch(req.params.branchCode);
        res.json(staffDay);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const staffDay = await controller.deleteStaffDay(req.params.id);
        if (!staffDay) {
            return res.status(404).json({ error: 'Staff day not found' });
        }
        res.json({ message: 'Staff day deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;