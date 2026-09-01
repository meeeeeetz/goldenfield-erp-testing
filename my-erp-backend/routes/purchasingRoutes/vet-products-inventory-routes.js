const express = require('express');
const router = express.Router();
const VetProductsInventoryController = require('../../Controllers/main-purchasing-controller/vet-products-inventory-controller');
const pool = require('../../config/database');
const controller = new VetProductsInventoryController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const search = req.query.search || '';
        const inventory = await controller.getAllInventory(search);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/product/:productId', authenticateToken, async (req, res) => {
    try {
        const inventory = await controller.getInventoryByProductId(req.params.productId);
        if (inventory) {
            res.json(inventory);
        } else {
            res.status(404).json({ error: 'Inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/add', authenticateToken, async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        if (!product_id || quantity === undefined) {
            return res.status(400).json({ error: 'product_id and quantity are required' });
        }
        const result = await controller.addInventory(product_id, quantity);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/subtract', authenticateToken, async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        if (!product_id || quantity === undefined) {
            return res.status(400).json({ error: 'product_id and quantity are required' });
        }
        const result = await controller.subtractInventory(product_id, quantity);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:productId', authenticateToken, async (req, res) => {
    try {
        const { quantity } = req.body;
        if (quantity === undefined) {
            return res.status(400).json({ error: 'quantity is required' });
        }
        const result = await controller.updateInventory(req.params.productId, quantity);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
