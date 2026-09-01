const express = require('express');
const router = express.Router();
const ExpenseCategoryController = require('../../Controllers/main-finance-controller/expense-category-controller');
const pool = require('../../config/database');

const controller = new ExpenseCategoryController(pool);

router.get('/', async (req, res) => {
  try {
    const categories = await controller.getAllExpenseCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/next-id', async (req, res) => {
  try {
    const nextId = await controller.getNextExpenseCategoryId();
    res.json({ expense_id: 'ExpID-' + String(nextId).padStart(4, '0') });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await controller.getExpenseCategoryById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Expense category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await controller.addExpenseCategory(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await controller.updateExpenseCategory(req.params.id, req.body);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Expense category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const success = await controller.deleteExpenseCategory(req.params.id);
    if (success) {
      res.json({ message: 'Expense category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Expense category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
