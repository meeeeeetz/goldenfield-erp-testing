const express = require('express');
const router = express.Router();
const VetSupplierController = require('../../Controllers/main-purchasing-controller/vet-supplier-controller');
const pool = require('../../config/database');
const controller = new VetSupplierController(pool);
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

router.use(authenticateToken);
router.use(requireModulePermission('purchasing-veterinary-supplies'));

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const suppliers = await controller.getAllSuppliers(search);
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextSupplierId();
        res.json({ supplier_id: nextId });
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

router.get('/:id', async (req, res) => {
    try {
        const supplier = await controller.getSupplierByCode(req.params.id);
        if (supplier) {
            res.json(supplier);
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addSupplier(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateSupplier(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteSupplier(req.params.id);
        if (result) {
            res.json({ message: 'Supplier deleted successfully' });
        } else {
            res.status(404).json({ error: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
