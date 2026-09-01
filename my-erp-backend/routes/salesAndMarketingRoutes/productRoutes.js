const express = require('express');
const router = express.Router();
const ProductListController = require('../../Controllers/main-sales-and-marketing-controller/product-and-pricing-controller');
const pool = require('../../config/database');

const controller = new ProductListController(pool);

router.get('/', async (req, res) => {
  try {
    const products = await controller.getAllProducts();
    res.json(products.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/next-id', async (req, res) => {
  try {
    const nextId = await controller.getNextProductId();
    res.json({ product_id: nextId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await controller.getProductById(req.params.id);
    if (product.rows.length > 0) {
      res.json(product.rows[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await controller.addProduct(req.body);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await controller.updateProduct(req.params.id, req.body);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await controller.deleteProduct(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
