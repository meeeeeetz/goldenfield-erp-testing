const express = require('express');
const router = express.Router();
const CashAdvanceController = require('../../Controllers/main-human-resources-controller/cash-advance-controller');
const pool = require('../../config/database');
const controller = new CashAdvanceController(pool);

router.get('/', async (req, res) => {
    try {
        const cashAdvances = await controller.getAllCashAdvances();
        res.json(cashAdvances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const cashAdvances = await controller.getCashAdvancesByEmployee(req.params.employeeId);
        res.json(cashAdvances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { employee_id, ca_amount, reason, no_of_payroll_cycle, installment_amount } = req.body;
        if (!employee_id || !ca_amount || !no_of_payroll_cycle || !installment_amount) {
            return res.status(400).json({ error: 'employee_id, ca_amount, no_of_payroll_cycle, and installment_amount are required' });
        }
        const cashAdvance = await controller.addCashAdvance({ employee_id, ca_amount, reason, no_of_payroll_cycle, installment_amount });
        res.status(201).json(cashAdvance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/outstanding/:employeeId', async (req, res) => {
    try {
        const result = await controller.getOutstandingCashAdvance(req.params.employeeId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/pending', async (req, res) => {
    try {
        const cashAdvances = await controller.getPendingCashAdvances();
        res.json(cashAdvances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/unrecovered-debt', async (req, res) => {
    try {
        const result = await controller.getTotalUnrecoveredDebt();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const cashAdvances = await controller.getCashAdvanceHistoryWithRepayments();
        res.json(cashAdvances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/approve', async (req, res) => {
    try {
        const cashAdvanceId = req.params.id;
        const result = await controller.approveCashAdvance(cashAdvanceId);
        if (result) {
            res.json({ message: 'Cash advance approved successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending cash advance not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/reject', async (req, res) => {
    try {
        const cashAdvanceId = req.params.id;
        const result = await controller.rejectCashAdvance(cashAdvanceId);
        if (result) {
            res.json({ message: 'Cash advance rejected successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending cash advance not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const cashAdvanceId = req.params.id;
        await controller.deleteCashAdvance(cashAdvanceId);
        res.json({ message: 'Cash advance deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
