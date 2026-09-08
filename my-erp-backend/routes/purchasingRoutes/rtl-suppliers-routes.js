const express = require('express');
const router = express.Router();
const RtlSuppliersController = require('../../Controllers/main-purchasing-controller/rtl-suppliers-controller');
const pool = require('../../config/database');
const controller = new RtlSuppliersController(pool);
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

router.use(authenticateToken);
router.use(requireModulePermission('purchasing-ready-to-lay'));

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextSupplierId();
        res.json({ supplier_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { supplier_id, company_name, address, tin_number, contact_person, contact_number, status } = req.body;
        if (!supplier_id || !company_name) {
            return res.status(400).json({ error: 'supplier_id and company_name are required' });
        }
        const result = await controller.createSupplier(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const suppliers = await controller.getAllSuppliers(search);
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/code/:supplierId', async (req, res) => {
    try {
        const supplier = await controller.getSupplierByCode(req.params.supplierId);
        if (supplier) {
            res.json(supplier);
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:supplierId', async (req, res) => {
    try {
        const result = await controller.updateSupplier(req.params.supplierId, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
