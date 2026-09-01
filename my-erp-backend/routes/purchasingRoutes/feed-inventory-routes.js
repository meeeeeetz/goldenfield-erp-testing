const express = require('express');
const router = express.Router();
const FeedInventoryController = require('../../Controllers/main-purchasing-controller/feed-inventory-controller');
const pool = require('../../config/database');
const controller = new FeedInventoryController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextFeedUseId();
        res.json({ feed_use_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/bulk', authenticateToken, async (req, res) => {
    try {
        const rows = req.body.rows || [];
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(400).json({ error: 'rows array is required' });
        }
        const result = await controller.bulkAddFeedInventory(rows);
        res.status(201).json({ message: `Saved ${result.length} feed inventory records`, records: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/summary', authenticateToken, async (req, res) => {
    try {
        const summary = await controller.getFeedInventorySummary();
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
