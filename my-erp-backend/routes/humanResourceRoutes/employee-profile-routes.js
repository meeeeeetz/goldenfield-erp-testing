const express = require('express');
const router = express.Router();
const EmployeeProfileController = require('../../Controllers/main-human-resources-controller/employee-profile-controller');
const pool = require('../../config/database');
const controller = new EmployeeProfileController(pool);

router.post('/upload-documents', async (req, res) => {
    try {
        const files = req.body.files || [];
        const labels = req.body.labels || [];
        let employeeId = req.body.employeeId || req.query.employeeId || 'unknown';
        if (Array.isArray(employeeId)) {
            employeeId = employeeId[0] || 'unknown';
        }

        const savedFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const label = labels[i] || `file_${i}`;
            const fileName = `${employeeId}_${label}_${Date.now()}.webp`;
            savedFiles.push({
                employeeId,
                label,
                fileName,
                path: `/uploads/photos/${fileName}`,
                size: file.base64 ? Buffer.from(file.base64, 'base64').length : 0
            });
        }

        res.json({ message: 'Documents uploaded successfully', files: savedFiles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const query = req.query.search;
        const status = req.query.status === 'inactive' ? 'inactive' : 'active';
        if (query) {
            const profiles = await controller.searchProfiles(query, status);
            return res.json(profiles);
        }
        const profiles = await controller.getAllProfiles();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/department/:department', async (req, res) => {
    try {
        const employees = await controller.getActiveEmployeesByDepartment(req.params.department);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/active', async (req, res) => {
    try {
        const employees = await controller.getAllActiveEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/active-with-compensation', async (req, res) => {
    try {
        const employees = await controller.getAllActiveEmployeesWithCompensation();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextEmployeeId();
        res.json({ employee_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats/monthly-new', async (req, res) => {
    try {
        const count = await controller.getMonthlyNewEmployeeCount();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats/total-count', async (req, res) => {
    try {
        const count = await controller.getTotalEmployeeCount();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/summary', async (req, res) => {
    try {
        const summaries = await controller.getAllEmployeeSummaries();
        res.json(summaries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all-active', async (req, res) => {
    try {
        const employees = await controller.getAllActiveEmployeesWithCompensation();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const status = req.query.status === 'inactive' ? 'inactive' : 'active';
        const employees = await controller.getAllEmployeeSummaries(status);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/documents', async (req, res) => {
    try {
        const documents = await controller.getEmployeeDocuments(req.params.id);
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/compensation', async (req, res) => {
    try {
        const compensation = await controller.getLatestCompensation(req.params.id);
        res.json(compensation || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const profile = await controller.getProfileById(req.params.id);
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ error: 'Employee profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addProfile(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateProfile(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Employee profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteProfile(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Employee profile deleted successfully' });
        } else {
            res.status(404).json({ error: 'Employee profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/create-folder', async (req, res) => {
    try {
        const { employee_id, last_name, first_name } = req.body || {};
        if (!employee_id) {
            return res.status(400).json({ error: 'employee_id is required' });
        }
        const result = await controller.createEmployeeFolder({ employee_id, last_name, first_name });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
