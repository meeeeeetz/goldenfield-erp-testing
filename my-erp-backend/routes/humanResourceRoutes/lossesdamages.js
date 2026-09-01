const express = require('express');
const router = express.Router();
const LossDamageController = require('../../Controllers/main-human-resources-controller/lossesdamages-controller');
const pool = require('../../config/database');
const controller = new LossDamageController(pool);

router.get('/', async (req, res) => {
    try {
        const lossDamages = await controller.getAllLossDamages();
        res.json(lossDamages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const lossDamages = await controller.getLossDamagesByEmployee(req.params.employeeId);
        res.json(lossDamages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { employee_id, loss_damage_amount, reason, no_of_payroll_cycle, installment_amount } = req.body;
        if (!employee_id || !loss_damage_amount || !no_of_payroll_cycle || !installment_amount) {
            return res.status(400).json({ error: 'employee_id, loss_damage_amount, no_of_payroll_cycle, and installment_amount are required' });
        }
        const lossDamage = await controller.addLossDamage({ employee_id, loss_damage_amount, reason, no_of_payroll_cycle, installment_amount });
        res.status(201).json(lossDamage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextLossDamageId();
        res.json({ lossdamage_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/pending', async (req, res) => {
    try {
        const lossDamages = await controller.getPendingLossDamages();
        res.json(lossDamages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const lossDamages = await controller.getLossDamageHistoryWithRepayments();
        res.json(lossDamages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/approve', async (req, res) => {
    try {
        const lossDamageId = req.params.id;
        const result = await controller.approveLossDamage(lossDamageId);
        if (result) {
            res.json({ message: 'Loss/Damage approved successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending loss/damage not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/reject', async (req, res) => {
    try {
        const lossDamageId = req.params.id;
        const result = await controller.rejectLossDamage(lossDamageId);
        if (result) {
            res.json({ message: 'Loss/Damage rejected successfully', data: result });
        } else {
            res.status(404).json({ error: 'Pending loss/damage not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
