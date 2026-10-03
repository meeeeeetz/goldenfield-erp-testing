const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, deleteFile, getPublicUrl } = require('../../utils/supabaseStorage');
const { authenticateToken, requireModulePermission } = require('../../middleware/authMiddleware');

router.use(authenticateToken);
router.use(requireModulePermission('operations-shipping-permit'));

// Configure multer to use memory storage (for Supabase upload)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedTypes.test(file.originalname.toLowerCase().split('.').pop());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, and PDF files are allowed'));
        }
    }
});

// Upload photo for recipient permit to Supabase Storage
router.post('/upload-photo', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const recipientId = req.body.recipient_id;
        const paperType = req.body.paper_type;

        if (!recipientId || !paperType) {
            return res.status(400).json({ error: 'recipient_id and paper_type are required' });
        }

        // Generate file path in Supabase Storage: shipping-permit-recipients/{recipient_id}/permits/{paperType}-{timestamp}.{ext}
        const ext = req.file.originalname.split('.').pop();
        const timestamp = Date.now();
        const fileName = `shipping-permit-recipients/${recipientId}/permits/${paperType}-${timestamp}.${ext}`;

        // Upload to Supabase Storage
        const result = await uploadFile(req.file.buffer, fileName, {
            contentType: req.file.mimetype
        });

        // Return the Supabase storage path (relative path in bucket)
        res.json({
            success: true,
            file_path: result.fileName,
            public_url: result.publicUrl,
            original_name: req.file.originalname,
            size: req.file.size
        });
    } catch (error) {
        console.error('Photo upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Delete photo from Supabase Storage
router.delete('/photo', async (req, res) => {
    try {
        const { file_path } = req.body;
        if (!file_path) {
            return res.status(400).json({ error: 'file_path is required' });
        }

        await deleteFile(file_path);

        res.json({ success: true, message: 'Photo deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;