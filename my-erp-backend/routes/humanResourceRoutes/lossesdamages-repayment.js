const express = require('express');
const router = express.Router();
const LossDamageRepaymentController = require('../../Controllers/main-human-resources-controller/lossesdamages-repayment-controller');
const pool = require('../../config/database');
const controller = new LossDamageRepaymentController(pool);

router.get('/', async (req, res) => {
    try {
        const repayments = await controller.getAllRepayments();
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/loss-damage/:lossDamageId', async (req, res) => {
    try {
        const repayments = await controller.getRepaymentsByLossDamage(req.params.lossDamageId);
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/payroll-cycle/:payrollCycleId', async (req, res) => {
    try {
        const repayments = await controller.getRepaymentsByPayrollCycle(req.params.payrollCycleId);
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { lossdamage_id, payrollcycle_id, amount_paid, paid_at } = req.body;
        if (!lossdamage_id || !payrollcycle_id || !amount_paid || !paid_at) {
            return res.status(400).json({ error: 'lossdamage_id, payrollcycle_id, amount_paid, and paid_at are required' });
        }
        const repayment = await controller.addRepayment({ lossdamage_id, payrollcycle_id, amount_paid, paid_at });
        res.status(201).json(repayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
