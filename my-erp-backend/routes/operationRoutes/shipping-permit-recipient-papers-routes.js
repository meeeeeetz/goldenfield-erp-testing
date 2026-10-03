const express = require('express');
const router = express.Router();
const ShippingPermitRecipientPapersController = require('../../Controllers/main-operations-controller/shipping-permit-recipient-papers-controller');
const pool = require('../../config/database');
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

const controller = new ShippingPermitRecipientPapersController(pool);

router.use(authenticateToken);
router.use(requireModulePermission('operations-shipping-permit'));

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextPaperId();
        res.json({ recipient_paper_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const recipientId = req.query.recipient_id || null;
        const papers = await controller.getAllPapers(search, recipientId);
        res.json(papers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:paperId', async (req, res) => {
    try {
        const paper = await controller.getPaperById(req.params.paperId);
        if (paper) {
            res.json(paper);
        } else {
            res.status(404).json({ error: 'Paper not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            recipient_id,
            paper_type,
            registration_number,
            transport_carrier_name,
            license_plate,
            issued_date,
            expiration_date,
            issued_by,
            photo_path
        } = req.body;

        if (!recipient_id || !paper_type) {
            return res.status(400).json({ error: 'recipient_id and paper_type are required' });
        }

        const paperId = req.body.recipient_paper_id || await controller.getNextPaperId();
        const created_by = req.user
            ? (req.user.first_name && req.user.last_name
                ? `${req.user.first_name} ${req.user.last_name}`
                : req.user.name || req.user.username || req.user.role || 'Super Admin')
            : 'Super Admin';

        const paper = await controller.createPaper({
            recipient_paper_id: paperId,
            recipient_id,
            paper_type,
            registration_number,
            transport_carrier_name,
            license_plate,
            issued_date,
            expiration_date,
            issued_by,
            created_by,
            photo_path
        });

        res.status(201).json(paper);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:paperId', async (req, res) => {
    try {
        const {
            recipient_id,
            paper_type,
            registration_number,
            transport_carrier_name,
            license_plate,
            issued_date,
            expiration_date,
            issued_by,
            photo_path
        } = req.body;

        if (!recipient_id || !paper_type) {
            return res.status(400).json({ error: 'recipient_id and paper_type are required' });
        }

        const created_by = req.user
            ? (req.user.first_name && req.user.last_name
                ? `${req.user.first_name} ${req.user.last_name}`
                : req.user.name || req.user.username || req.user.role || 'Super Admin')
            : 'Super Admin';

        const paper = await controller.updatePaper(req.params.paperId, {
            recipient_id,
            paper_type,
            registration_number,
            transport_carrier_name,
            license_plate,
            issued_date,
            expiration_date,
            issued_by,
            created_by,
            photo_path
        });

        if (paper) {
            res.json(paper);
        } else {
            res.status(404).json({ error: 'Paper not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:paperId', async (req, res) => {
    try {
        const success = await controller.deletePaper(req.params.paperId);
        if (success) {
            res.json({ message: 'Paper deleted successfully' });
        } else {
            res.status(404).json({ error: 'Paper not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;