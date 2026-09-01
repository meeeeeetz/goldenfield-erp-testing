const express = require('express');
const router = express.Router();
const OrganizationalRoleController = require('../../Controllers/main-human-resources-controller/organizational-role-controller');
const pool = require('../../config/database');
const controller = new OrganizationalRoleController(pool);

router.get('/', async (req, res) => {
    try {
        const roles = await controller.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextRoleId();
        res.json({ role_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const role = await controller.getRoleById(req.params.id);
        if (role) {
            res.json(role);
        } else {
            res.status(404).json({ error: 'Organizational role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addRole(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateRole(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Organizational role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteRole(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Organizational role deleted successfully' });
        } else {
            res.status(404).json({ error: 'Organizational role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
