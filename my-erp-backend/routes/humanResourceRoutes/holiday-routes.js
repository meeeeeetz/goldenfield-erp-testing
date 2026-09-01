const express = require('express');
const router = express.Router();
const HolidayController = require('../../Controllers/main-human-resources-controller/holiday-controller');
const pool = require('../../config/database');
const controller = new HolidayController(pool);

router.get('/', async (req, res) => {
    try {
        const holidays = await controller.getAllHolidays();
        res.json(holidays);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { holiday_name, date_of_holiday, type_of_holiday } = req.body;
        if (!holiday_name || !date_of_holiday || !type_of_holiday) {
            return res.status(400).json({ error: 'holiday_name, date_of_holiday, and type_of_holiday are required' });
        }
        const holiday = await controller.addHoliday({ holiday_name, date_of_holiday, type_of_holiday });
        res.status(201).json(holiday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/range', async (req, res) => {
    try {
        const dateFrom = req.query.date_from;
        const dateTo = req.query.date_to;
        if (!dateFrom || !dateTo) {
            return res.status(400).json({ error: 'date_from and date_to are required' });
        }
        const holidays = await controller.getHolidaysByDateRange(dateFrom, dateTo);
        res.json(holidays);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteHoliday(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Holiday deleted successfully' });
        } else {
            res.status(404).json({ error: 'Holiday not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
