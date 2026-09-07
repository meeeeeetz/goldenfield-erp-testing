const express = require('express');
const router = express.Router();
const EggProductsController = require('../../Controllers/main-operations-controller/egg-products-controller');
const pool = require('../../config/database');

const controller = new EggProductsController(pool);

router.get('/', async (req, res) => {
    try {
        const products = await controller.getAllEggProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextEggProductId();
        res.json({ product_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:productId', async (req, res) => {
    try {
        const product = await controller.getEggProductById(req.params.productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Egg product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { product_id, product_name, remarks, status } = req.body;
        if (!product_id || !product_name) {
            return res.status(400).json({ error: 'product_id and product_name are required' });
        }
        const product = await controller.createEggProduct({
            product_id,
            product_name,
            remarks,
            status
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const product = await controller.updateEggProduct(req.params.productId, req.body);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Egg product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        const success = await controller.deleteEggProduct(req.params.productId);
        if (success) {
            res.json({ message: 'Egg product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Egg product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
