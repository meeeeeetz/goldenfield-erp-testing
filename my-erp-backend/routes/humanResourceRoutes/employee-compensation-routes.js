const express = require('express');
const router = express.Router();
const EmployeeCompensationController = require('../../Controllers/main-human-resources-controller/employee-compensation-controller');
const pool = require('../../config/database');
const controller = new EmployeeCompensationController(pool);
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/template', async (req, res) => {
    try {
        const headers = [
            'compensation_id',
            'employee_id',
            'salary_pay_mode',
            'salary_amount',
            'allowance_pay_mode',
            'allowance_amount',
            'pay_frequency',
            'payout_method',
            'department',
            'role',
            'yearly_sick_leave',
            'yearly_vacation_leave',
            'created_at',
            'updated_at',
            'sss_contribution_amount',
            'sss_loan_payment_mode',
            'sss_loan_amount',
            'philhealth_contribution_mode',
            'philhealth_contribution_amount',
            'pagibig_contribution_mode',
            'pagibig_contribution_amount',
            'pagibig_loan_payment_mode',
            'pagibig_loan_amount',
            'sss_contribution_mode',
            'shift_policy'
        ];
        const csv = headers.join(',') + '\n';
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=employee_compensation_template.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/bulk-upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const csvText = req.file.buffer.toString('utf-8');
        const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) {
            return res.status(400).json({ error: 'CSV file is empty or has no data rows' });
        }
        const headers = lines[0].split(',').map(h => h.trim());
        const rows = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const row = { _row: i + 1 };
            headers.forEach((header, index) => {
                row[header] = values[index] !== undefined ? values[index] : '';
            });
            rows.push(row);
        }
        const result = await controller.bulkUploadCompensation(rows);
        res.json({ success: true, inserted: result.inserted });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const compensations = await controller.getAllCompensations();
        res.json(compensations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextCompensationId();
        res.json({ compensation_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const compensation = await controller.getCompensationById(req.params.id);
        if (compensation) {
            res.json(compensation);
        } else {
            res.status(404).json({ error: 'Compensation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const compensation = await controller.getCompensationByEmployeeId(req.params.employeeId);
        if (compensation) {
            res.json(compensation);
        } else {
            res.status(404).json({ error: 'Compensation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addCompensation(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateCompensation(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Compensation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteCompensation(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Compensation deleted successfully' });
        } else {
            res.status(404).json({ error: 'Compensation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/sync-department/:employeeId', async (req, res) => {
    try {
        const result = await controller.syncDepartmentToProfile(req.params.employeeId);
        if (result) {
            res.json({ message: 'Department synced successfully', data: result });
        } else {
            res.status(404).json({ error: 'No compensation record found for this employee' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/sync-all-departments', async (req, res) => {
    try {
        const result = await controller.syncAllDepartmentsToProfile();
        res.json({ message: 'All departments synced successfully', count: result.length, data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
