const express = require('express');
const router = express.Router();
const multer = require('multer');
const EmployeeProfileController = require('../../Controllers/main-human-resources-controller/employee-profile-controller');
const { uploadFile, getPublicUrl } = require('../../utils/gcs');
const pool = require('../../config/database');
const controller = new EmployeeProfileController(pool);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/upload-documents', upload.array('files', 50), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const { employeeId, labels } = req.body;
        const employeeIdValue = Array.isArray(employeeId) ? employeeId[0] : employeeId || 'unknown';
        const labelsArray = labels ? (Array.isArray(labels) ? labels : [labels]) : [];

        const savedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const label = labelsArray[i] || `file_${i}`;
            const extension = file.originalname.split('.').pop() || '';
            const safeLabel = label.replace(/[^a-zA-Z0-9_-]/g, '_');
            const fileName = extension ? `${employeeIdValue}_${safeLabel}.${extension}` : `${employeeIdValue}_${safeLabel}`;
            const destination = `employee-photos/${employeeIdValue}/${fileName}`;

            const result = await uploadFile(file.buffer, destination, {
                contentType: file.mimetype
            });

            savedFiles.push({
                employeeId: employeeIdValue,
                label,
                fileName: result.fileName,
                publicUrl: result.publicUrl,
                size: file.size
            });
        }

        res.json({ message: 'Documents uploaded successfully', files: savedFiles });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const query = req.query.search;
        const status = req.query.status;
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

router.get('/:id/13th-month', async (req, res) => {
    try {
        const { id } = req.params;
        const year = req.query.year;
        if (!year) {
            return res.status(400).json({ error: 'Year query parameter is required' });
        }
        const data = await controller.get13thMonthData(id, year);
        res.json(data);
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
