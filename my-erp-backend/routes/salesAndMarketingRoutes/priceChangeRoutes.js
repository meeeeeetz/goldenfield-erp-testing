const express = require('express');
const router = express.Router();
const ProductListController = require('../../Controllers/main-sales-and-marketing-controller/product-and-pricing-controller');
const pool = require('../../config/database');
const controller = new ProductListController(pool);

router.get('/', async (req, res) => {
  try {
    const priceChanges = await controller.getAllPriceChanges();
    res.json(priceChanges.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const { customer, products, dateFrom, dateTo } = req.query;
    const productArray = products ? products.split(',') : [];
    const history = await controller.getPriceHistory({
      customer: customer || null,
      products: productArray,
      dateFrom: dateFrom || null,
      dateTo: dateTo || null
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/next-id', async (req, res) => {
  try {
    const nextId = await controller.getNextPriceChangeId();
    res.json({ transaction_id: nextId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/last', async (req, res) => {
  try {
    const customer = req.query.customer;
    const product = req.query.product;
    if (!customer || !product) {
      return res.status(400).json({ error: 'customer and product are required' });
    }
    const lastChange = await controller.getLastPriceChange(customer, product);
    res.json(lastChange || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/today', async (req, res) => {
  try {
    const { customer, products } = req.query;
    const productArray = products ? products.split(',') : [];
    await controller.syncCustomerPriceToday();
    const todayPrices = await controller.getCustomerPriceToday({
      customer: customer || null,
      products: productArray
    });
    res.json(todayPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sync', async (req, res) => {
  try {
    const result = await controller.syncCustomerPriceToday();
    res.json({ synced: result.rowCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await controller.savePriceChange(req.body);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

console.log('priceChangeRoutes loaded');

