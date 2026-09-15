const express = require('express');
const router = express.Router();
const multer = require('multer');
const ShippingPermitLicensesController = require('../../Controllers/main-operations-controller/shipping-permit-licenses-controller');
const pool = require('../../config/database');
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

const controller = new ShippingPermitLicensesController(pool);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
            cb(null, true);
        } else {
            cb(new Error('Only JPG/JPEG/WebP files are allowed'), false);
        }
    }
});

router.use(authenticateToken);
router.use(requireModulePermission('operations-shipping-permit'));

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextLicenseId();
        res.json({ license_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const licenses = await controller.getAllLicenses(search);
        res.json(licenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:licenseId', async (req, res) => {
    try {
        const license = await controller.getLicenseById(req.params.licenseId);
        if (license) {
            res.json(license);
        } else {
            res.status(404).json({ error: 'License not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const {
            license_name,
            reg_no,
            issued_date,
            expiration_date,
            status
        } = req.body;

        if (!license_name || !reg_no) {
            return res.status(400).json({ error: 'license_name and reg_no are required' });
        }

        const licenseId = req.body.license_id || await controller.getNextLicenseId();
        const created_by = req.user ? (req.user.first_name + ' ' + req.user.last_name) : null;

        const fileBuffer = req.file ? req.file.buffer : null;

        const license = await controller.createLicense({
            license_id: licenseId,
            license_name,
            reg_no,
            issued_date: issued_date || null,
            expiration_date: expiration_date || null,
            status: status || 'Active',
            created_by
        }, fileBuffer);

        res.status(201).json(license);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:licenseId', upload.single('photo'), async (req, res) => {
    try {
        const {
            license_name,
            reg_no,
            issued_date,
            expiration_date,
            status
        } = req.body;

        if (!license_name || !reg_no) {
            return res.status(400).json({ error: 'license_name and reg_no are required' });
        }

        const created_by = req.user ? (req.user.first_name + ' ' + req.user.last_name) : null;
        const fileBuffer = req.file ? req.file.buffer : null;

        const license = await controller.updateLicense(req.params.licenseId, {
            license_name,
            reg_no,
            issued_date: issued_date || null,
            expiration_date: expiration_date || null,
            status,
            created_by
        }, fileBuffer);

        if (license) {
            res.json(license);
        } else {
            res.status(404).json({ error: 'License not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:licenseId', async (req, res) => {
    try {
        const success = await controller.deleteLicense(req.params.licenseId);
        if (success) {
            res.json({ message: 'License deleted successfully' });
        } else {
            res.status(404).json({ error: 'License not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;