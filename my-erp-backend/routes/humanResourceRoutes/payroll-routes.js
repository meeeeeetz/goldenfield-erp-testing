const express = require('express');
const router = express.Router();
const PayrollController = require('../../Controllers/main-human-resources-controller/payroll-controller');
const pool = require('../../config/database');
const controller = new PayrollController(pool);

router.get('/', async (req, res) => {
    try {
        const payrolls = await controller.getAllPayrolls();
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const payrolls = await controller.getAllPayrollsWithNames();
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const payrolls = await controller.getPayrollsByEmployee(req.params.employeeId);
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/template', async (req, res) => {
    try {
        const result = await controller.generatePayrollTemplate();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=payroll_template.xlsx');
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/validate', upload.single('payrollFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const result = await controller.validatePayrollImport(req.file.buffer);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/upload', upload.single('payrollFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const result = await controller.importPayrollsFromExcel(req.file.buffer);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:payrollId', async (req, res) => {
    try {
        const payroll = await controller.getPayrollById(req.params.payrollId);
        if (payroll) {
            res.json(payroll);
        } else {
            res.status(404).json({ error: 'Payroll not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { employee_id, date_start, date_end, total_days_worked, total_overtime_hours, total_allowance, total_leaves_usage, regular_holiday, special_holiday, total_income_tax, total_sss_payment, total_sss_loan_payment, total_philhealth_payment, total_pagibig_payment, total_pagibig_loan_payment, total_cash_loan_deductions, starting_cash_loan, ending_cash_loan, total_losses_damages, starting_losses_damages, ending_losses_damages, net_pay, status } = req.body;
        if (!employee_id || !date_start || !date_end) {
            return res.status(400).json({ error: 'employee_id, date_start, and date_end are required' });
        }
        const payroll = await controller.addPayroll({
            employee_id,
            date_start,
            date_end,
            total_days_worked,
            total_overtime_hours,
            total_allowance,
            total_leaves_usage,
            regular_holiday,
            special_holiday,
            total_income_tax,
            total_sss_payment,
            total_sss_loan_payment,
            total_philhealth_payment,
            total_pagibig_payment,
            total_pagibig_loan_payment,
            total_cash_loan_deductions,
            starting_cash_loan,
            ending_cash_loan,
            total_losses_damages,
            starting_losses_damages,
            ending_losses_damages,
            net_pay,
            status
        });
        res.status(201).json(payroll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/status/:status', async (req, res) => {
    try {
        const payrolls = await controller.getPayrollsByStatus(req.params.status);
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/totals/paid', async (req, res) => {
    try {
        const totals = await controller.getPaidPayrollTotals();
        res.json(totals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/totals/paid/by-employee', async (req, res) => {
    try {
        const totals = await controller.getPaidPayrollTotalsByEmployee();
        res.json(totals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/totals/monthly-comparison', async (req, res) => {
    try {
        const comparison = await controller.getMonthlySalaryComparison();
        res.json(comparison);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:payrollId/pdf-file', async (req, res) => {
    try {
        const { payrollId } = req.params;
        const result = await controller.generatePayslipPdf(payrollId);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${result.filename}"`);
        res.send(result.buffer);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/:payrollId', async (req, res) => {
    try {
        const { payrollId } = req.params;
        await controller.deletePayroll(payrollId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
