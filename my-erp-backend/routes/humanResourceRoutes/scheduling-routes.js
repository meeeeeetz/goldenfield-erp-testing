const express = require('express');
const router = express.Router();
const SchedulingController = require('../../Controllers/main-human-resources-controller/scheduling-controller');
const pool = require('../../config/database');
const controller = new SchedulingController(pool);

router.get('/', async (req, res) => {
    try {
        const { org_unit, start_date, end_date } = req.query;
        const schedules = await controller.getSchedulesByFilters({
            orgUnit: org_unit || null,
            startDate: start_date || null,
            endDate: end_date || null
        });
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextScheduleId();
        res.json({ schedule_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const schedule = await controller.getScheduleById(req.params.id);
        if (schedule) {
            res.json(schedule);
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addSchedule(req.body);
        res.status(201).json(result);
    } catch (error) {
        if (error.status === 409) {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateSchedule(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteSchedule(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Schedule deleted successfully' });
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
