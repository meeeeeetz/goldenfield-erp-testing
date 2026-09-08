const express = require('express');
const router = express.Router();
const FeedTypeController = require('../../Controllers/main-purchasing-controller/feed-type-controller');
const pool = require('../../config/database');
const controller = new FeedTypeController(pool);
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

router.use(authenticateToken);
router.use(requireModulePermission('purchasing-feeds'));

router.get('/active', async (req, res) => {
    try {
        const feedTypes = await controller.getAllFeedTypes('');
        const active = feedTypes.filter(ft => ft.status === 'Active');
        res.json(active);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const feedTypes = await controller.getAllFeedTypes(search);
        res.json(feedTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextFeedTypeId();
        res.json({ feed_type_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/active-suppliers', async (req, res) => {
    try {
        const suppliers = await controller.getActiveSuppliers();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/code/:feedTypeId', async (req, res) => {
    try {
        const feedType = await controller.getFeedTypeByCode(req.params.feedTypeId);
        if (feedType) {
            res.json(feedType);
        } else {
            res.status(404).json({ error: 'Feed Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const feedType = await controller.getFeedTypeByCode(req.params.id);
        if (feedType) {
            res.json(feedType);
        } else {
            res.status(404).json({ error: 'Feed Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addFeedType(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateFeedType(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Feed Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteFeedType(req.params.id);
        if (result) {
            res.json({ message: 'Feed Type deleted successfully' });
        } else {
            res.status(404).json({ error: 'Feed Type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
