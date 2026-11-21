const express = require('express');
const router = express.Router();
const TurksEmployeeController = require('../../Controllers/main-metzeler-controller/turks-employee-controller');
const pool = require('../../config/database');
const { authenticateToken } = require('../../middleware/authMiddleware');

const controller = new TurksEmployeeController(pool);

router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const employees = await controller.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-code', async (req, res) => {
    try {
        const nextCode = await controller.getNextEmployeeCode();
        res.json({ employee_code: nextCode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Query parameter q is required' });
        }
        const employees = await controller.searchEmployees(q);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employee = await controller.getEmployeeById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/code/:employeeCode', async (req, res) => {
    try {
        const employee = await controller.getEmployeeByCode(req.params.employeeCode);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { employee_code, employee_name, employee_department } = req.body;
        if (!employee_code || !employee_name || !employee_department) {
            return res.status(400).json({ error: 'employee_code, employee_name, and employee_department are required' });
        }
        const employee = await controller.createEmployee({
            employee_code,
            employee_name,
            employee_department,
            created_by: req.user.id
        });
        res.status(201).json(employee);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Employee code already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { employee_name, employee_department, status } = req.body;
        const employee = await controller.updateEmployee(req.params.id, { employee_name, employee_department, status });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const employee = await controller.deleteEmployee(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;