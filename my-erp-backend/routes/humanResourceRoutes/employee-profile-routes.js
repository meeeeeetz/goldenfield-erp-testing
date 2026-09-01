const express = require('express');
const router = express.Router();
const EmployeeProfileController = require('../../Controllers/main-human-resources-controller/employee-profile-controller');
const pool = require('../../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const controller = new EmployeeProfileController(pool);

const uploadBase = 'C:\\Users\\ADMIN\\Documents\\uploads\\photos';
const tempUploadBase = path.join(uploadBase, 'temp');

const safeFileName = (s = '') => {
    const cleaned = String(s).trim().replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_');
    return cleaned.replace(/^_+|_+$/g, '') || 'file';
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tempDir = path.join(tempUploadBase, `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
        fs.promises.mkdir(tempDir, { recursive: true }).then(() => cb(null, tempDir)).catch(cb);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname || 'document.webp';
        cb(null, originalName);
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 } });

router.post('/upload-documents', upload.array('files', 50), async (req, res) => {
    try {
        const files = req.files || [];
        const labels = req.body.labels ? (Array.isArray(req.body.labels) ? req.body.labels : [req.body.labels]) : [];
        let employeeId = req.body.employeeId || req.query.employeeId || 'unknown';
        if (Array.isArray(employeeId)) {
            employeeId = employeeId[0] || 'unknown';
        }

        const folderName = await controller.computeEmployeeFolderName(employeeId);
        const targetDir = path.join(uploadBase, folderName);
        await fs.promises.mkdir(targetDir, { recursive: true });

        const savedFiles = [];
        const tempDirs = new Set();

        for (const file of files) {
            const tempDir = path.dirname(file.path);
            tempDirs.add(tempDir);

            const ext = path.extname(file.originalname || '');
            const baseName = path.basename(file.originalname || 'document', ext).replace(/[^a-zA-Z0-9_-]/g, '_');
            const label = labels.shift() || baseName;
            const finalName = `${safeFileName(employeeId)}_${safeFileName(label)}.webp`;
            const finalPath = path.join(targetDir, finalName);

            try {
                await fs.promises.rename(file.path, finalPath);
            } catch (e) {
                console.error('Failed to move file:', e.message);
            }

            savedFiles.push({
                employeeId,
                label,
                fileName: finalName,
                path: finalPath,
                size: file.size
            });
        }

        for (const tempDir of tempDirs) {
            try {
                await fs.promises.rm(tempDir, { recursive: true, force: true });
            } catch (e) {
                console.error('Failed to remove temp dir:', e.message);
            }
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
