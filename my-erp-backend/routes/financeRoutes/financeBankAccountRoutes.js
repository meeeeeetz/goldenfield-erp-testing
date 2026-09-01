const express = require('express');
const router = express.Router();
const BankAccountController = require('../../Controllers/main-finance-controller/bank-account-controller');
const pool = require('../../config/database');
const controller = new BankAccountController(pool);

router.get('/', async (req, res) => {
  try {
    const accounts = await controller.getAllBankAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/next-id', async (req, res) => {
  try {
    const nextId = await controller.getNextBankAccountId();
    res.json({ bank_account_id: nextId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const account = await controller.getBankAccountById(req.params.id);
    if (account) {
      res.json(account);
    } else {
      res.status(404).json({ error: 'Bank account not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/code/:bankCode', async (req, res) => {
  try {
    const accounts = await controller.getBankAccountByCode(req.params.bankCode);
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await controller.addBankAccount(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await controller.updateBankAccount(req.params.id, req.body);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Bank account not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await controller.deleteBankAccount(req.params.id);
    if (result.rowCount > 0) {
      res.json({ message: 'Bank account deleted successfully' });
    } else {
      res.status(404).json({ error: 'Bank account not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
