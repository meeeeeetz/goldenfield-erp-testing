const express = require('express');
const router = express.Router();
const ShippingPermitRecipientsController = require('../../Controllers/main-operations-controller/shipping-permit-recipients-controller');
const pool = require('../../config/database');
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

const controller = new ShippingPermitRecipientsController(pool);

router.use(authenticateToken);
router.use(requireModulePermission('operations-shipping-permit'));

router.get('/next-id', async (req, res) => {
    try {
        const nextId = await controller.getNextRecipientId();
        res.json({ recipient_id: nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const recipients = await controller.getAllRecipients(search);
        res.json(recipients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:recipientId', async (req, res) => {
    try {
        const recipient = await controller.getRecipientById(req.params.recipientId);
        if (recipient) {
            res.json(recipient);
        } else {
            res.status(404).json({ error: 'Recipient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            customer_name,
            province,
            city,
            barangay,
            transport_type,
            plate_number,
            contact,
            contact_number,
            handlers_license,
            handlers_issued_date,
            handlers_expiration,
            transport_carrier,
            transport_issued_date,
            transport_expiration,
            status
        } = req.body;

        if (!customer_name) {
            return res.status(400).json({ error: 'customer_name is required' });
        }

        const recipientId = req.body.recipient_id || await controller.getNextRecipientId();
        const created_by = req.user ? (req.user.first_name + ' ' + req.user.last_name) : null;

        const recipient = await controller.createRecipient({
            recipient_id: recipientId,
            customer_name,
            province,
            city,
            barangay,
            transport_type,
            plate_number,
            contact,
            contact_number,
            handlers_license,
            handlers_issued_date,
            handlers_expiration,
            transport_carrier,
            transport_issued_date,
            transport_expiration,
            status,
            created_by
        });

        res.status(201).json(recipient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:recipientId', async (req, res) => {
    try {
        const {
            customer_name,
            province,
            city,
            barangay,
            transport_type,
            plate_number,
            contact,
            contact_number,
            handlers_license,
            handlers_issued_date,
            handlers_expiration,
            transport_carrier,
            transport_issued_date,
            transport_expiration,
            status
        } = req.body;

        const created_by = req.user ? (req.user.first_name + ' ' + req.user.last_name) : null;

        const recipient = await controller.updateRecipient(req.params.recipientId, {
            customer_name,
            province,
            city,
            barangay,
            transport_type,
            plate_number,
            contact,
            contact_number,
            handlers_license,
            handlers_issued_date,
            handlers_expiration,
            transport_carrier,
            transport_issued_date,
            transport_expiration,
            status,
            created_by
        });

        if (recipient) {
            res.json(recipient);
        } else {
            res.status(404).json({ error: 'Recipient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:recipientId', async (req, res) => {
    try {
        const success = await controller.deleteRecipient(req.params.recipientId);
        if (success) {
            res.json({ message: 'Recipient deleted successfully' });
        } else {
            res.status(404).json({ error: 'Recipient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
