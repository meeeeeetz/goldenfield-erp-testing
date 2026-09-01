const express = require('express');
const router = express.Router();
const OrganizationalStructureController = require('../../Controllers/main-human-resources-controller/organizational-structure-controller');
const pool = require('../../config/database');
const controller = new OrganizationalStructureController(pool);

router.get('/', async (req, res) => {
    try {
        const employeeAssigned = req.query.employee_assigned;
        if (employeeAssigned) {
            const structures = await controller.getStructureByEmployeeAssigned(employeeAssigned);
            return res.json(structures);
        }
        const structures = await controller.getAllStructure();
        res.json(structures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextStructureId();
        res.json({ org_unit_role_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/org-unit/:orgUnitId', async (req, res) => {
    try {
        const structures = await controller.getStructureByOrgUnit(req.params.orgUnitId);
        res.json(structures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/by-org-unit-name', async (req, res) => {
    try {
        const orgUnitName = req.query.org_unit_name || null;
        if (!orgUnitName) {
            return res.json([]);
        }
        const structures = await controller.getRolesByOrgUnitName(orgUnitName);
        res.json(structures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/unassigned-roles', async (req, res) => {
    try {
        const orgUnitName = req.query.org_unit_name || null;
        const roles = await controller.getUnassignedRoles(orgUnitName);
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/active-employees/org-unit-name/:orgUnitName', async (req, res) => {
    try {
        const employees = await controller.getActiveEmployeesByOrgUnitName(req.params.orgUnitName);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const structure = await controller.getStructureById(req.params.id);
        if (structure) {
            res.json(structure);
        } else {
            res.status(404).json({ error: 'Organizational structure not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await controller.addStructure(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await controller.updateStructure(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Organizational structure not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await controller.deleteStructure(req.params.id);
        if (result.rowCount > 0) {
            res.json({ message: 'Organizational structure deleted successfully' });
        } else {
            res.status(404).json({ error: 'Organizational structure not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
