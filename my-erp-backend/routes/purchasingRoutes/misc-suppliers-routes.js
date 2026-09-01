const express = require('express');
const router = express.Router();
const MiscSuppliersController = require('../../Controllers/main-purchasing-controller/misc-suppliers-controller');
const pool = require('../../config/database');
const controller = new MiscSuppliersController(pool);
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/next-id', authenticateToken, async (req, res) => {
    try {
        const nextId = await controller.getNextSupplierId();
        res.json({ supplier_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
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

router.get('/', authenticateToken, async (req, res) => {
    try {
        const search = req.query.search || '';
        const suppliers = await controller.getAllSuppliers(search);
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/code/:supplierId', authenticateToken, async (req, res) => {
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

router.put('/:supplierId', authenticateToken, async (req, res) => {
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
