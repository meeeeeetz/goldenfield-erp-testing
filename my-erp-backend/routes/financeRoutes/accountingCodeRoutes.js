const express = require('express');
const router = express.Router();
const AccountingCodeController = require('../../Controllers/main-finance-controller/accounting-code-controller');
const pool = require('../../config/database');

const controller = new AccountingCodeController(pool);

router.get('/', async (req, res) => {
  try {
    const codes = await controller.getAllAccountingCodes();
    res.json(codes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/next-id', async (req, res) => {
  try {
    const nextId = await controller.getNextAccountingCodeId();
    res.json({ accounting_id: nextId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const code = await controller.getAccountingCodeById(req.params.id);
    if (code) {
      res.json(code);
    } else {
      res.status(404).json({ error: 'Accounting code not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await controller.addAccountingCode(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await controller.updateAccountingCode(req.params.id, req.body);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Accounting code not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const success = await controller.deleteAccountingCode(req.params.id);
    if (success) {
      res.json({ message: 'Accounting code deleted successfully' });
    } else {
      res.status(404).json({ error: 'Accounting code not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
