const express = require('express');
const router = express.Router();
const TurksScheduleController = require('../../Controllers/main-metzeler-controller/turks-schedule-controller');
const pool = require('../../config/database');
const { authenticateToken } = require('../../middleware/authMiddleware');

const controller = new TurksScheduleController(pool);

router.use(authenticateToken);

router.post('/', async (req, res) => {
    try {
        const { schedule } = req.body;
        if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
            return res.status(400).json({ error: 'Schedule array is required' });
        }
        
        // Validate each item has required fields
        for (const item of schedule) {
            if (!item.branch_code || !item.date || !item.day_of_week || item.pax === undefined) {
                return res.status(400).json({ error: 'Each schedule item must have branch_code, date, day_of_week, and pax' });
            }
        }
        
        const saved = await controller.saveSchedules(schedule, req.user.id);
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const { dateStart, dateEnd } = req.query;
        if (!dateStart || !dateEnd) {
            return res.status(400).json({ error: 'dateStart and dateEnd query parameters are required' });
        }
        const schedules = await controller.getSchedulesByDateRange(dateStart, dateEnd);
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const schedule = await controller.deleteSchedule(req.params.id);
        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }
        res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;