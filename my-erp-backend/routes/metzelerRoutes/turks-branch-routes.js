const express = require('express');
const router = express.Router();
const TurksBranchController = require('../../Controllers/main-metzeler-controller/turks-branch-controller');
const pool = require('../../config/database');
const { authenticateToken } = require('../../middleware/authMiddleware');

const controller = new TurksBranchController(pool);

router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const branches = await controller.getAllBranches();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-code', async (req, res) => {
    try {
        const nextCode = await controller.getNextBranchCode();
        res.json({ branch_code: nextCode });
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
        const branches = await controller.searchBranches(q);
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const branch = await controller.getBranchById(req.params.id);
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        res.json(branch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/code/:branchCode', async (req, res) => {
    try {
        const branch = await controller.getBranchByCode(req.params.branchCode);
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        res.json(branch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { branch_code, branch_name, branch_location } = req.body;
        if (!branch_code || !branch_name) {
            return res.status(400).json({ error: 'branch_code and branch_name are required' });
        }
        const branch = await controller.createBranch({
            branch_code,
            branch_name,
            branch_location: branch_location || null,
            created_by: req.user.id
        });
        res.status(201).json(branch);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Branch code already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { branch_name, branch_location, status } = req.body;
        const branch = await controller.updateBranch(req.params.id, { branch_name, branch_location, status });
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        res.json(branch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const branch = await controller.deleteBranch(req.params.id);
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        res.json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;