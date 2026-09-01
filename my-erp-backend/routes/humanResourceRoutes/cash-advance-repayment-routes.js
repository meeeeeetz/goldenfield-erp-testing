const express = require('express');
const router = express.Router();
const CashAdvanceRepaymentController = require('../../Controllers/main-human-resources-controller/cash-advance-repayment-controller');
const pool = require('../../config/database');
const controller = new CashAdvanceRepaymentController(pool);

router.get('/', async (req, res) => {
    try {
        const repayments = await controller.getAllRepayments();
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/cash-advance/:cashAdvanceId', async (req, res) => {
    try {
        const repayments = await controller.getRepaymentsByCashAdvance(req.params.cashAdvanceId);
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { cashadvance_id, payroll_cycle_id, amount_paid, paid_at } = req.body;
        if (!cashadvance_id || !payroll_cycle_id || !amount_paid || !paid_at) {
            return res.status(400).json({ error: 'cashadvance_id, payroll_cycle_id, amount_paid, and paid_at are required' });
        }
        const repayment = await controller.addRepayment({ cashadvance_id, payroll_cycle_id, amount_paid, paid_at });
        res.status(201).json(repayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
