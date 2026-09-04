const express = require('express');
const router = express.Router();
const CustomerDirectoryController = require('../../Controllers/main-sales-and-marketing-controller/customer-directory-controller');
const pool = require('../../config/database');
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');
const controller = new CustomerDirectoryController(pool);

router.use(authenticateToken);
router.use(requireModulePermission('sales-product-pricing'));

router.get('/', async (req, res) => {
  try {
    const customers = await controller.getAllCustomers();
    res.json(customers.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/next-id', async (req, res) => {
  try {
    const nextId = await controller.getNextCustomerId();
    res.json({ customer_id: nextId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/active', async (req, res) => {
  try {
    const customers = await controller.getActiveCustomers();
    res.json(customers.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/top-by-receipts', async (req, res) => {
  try {
    const customers = await controller.getTopCustomersByReceipts();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const customer = await controller.getCustomerById(req.params.id);
    if (customer.rows.length > 0) {
      res.json(customer.rows[0]);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await controller.addCustomer(req.body);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await controller.updateCustomer(req.params.id, req.body);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await controller.deleteCustomer(req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

