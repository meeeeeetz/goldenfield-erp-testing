const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, deleteFile, getPublicUrl } = require('../utils/gcs');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { folder } = req.body;
        const folderName = folder || 'uploads';
        
        const timestamp = Date.now();
        const originalName = req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const destination = `${folderName}/${timestamp}_${originalName}`;

        const result = await uploadFile(req.file.buffer, destination, {
            contentType: req.file.mimetype
        });

        res.json({
            message: 'File uploaded successfully',
            fileName: result.fileName,
            publicUrl: result.publicUrl,
            originalName: req.file.originalname
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

router.post('/upload-multiple', upload.array('files', 50), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const { folder } = req.body;
        const folderName = folder || 'uploads';

        const results = [];
        for (const file of req.files) {
            const timestamp = Date.now();
            const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
            const destination = `${folderName}/${timestamp}_${originalName}`;

            const result = await uploadFile(file.buffer, destination, {
                contentType: file.mimetype
            });
            results.push({
                fileName: result.fileName,
                publicUrl: result.publicUrl,
                originalName: file.originalname
            });
        }

        res.json({
            message: `${results.length} files uploaded successfully`,
            files: results
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload files' });
    }
});

router.delete('/delete/:folder/:fileName', async (req, res) => {
    try {
        const { folder, fileName } = req.params;
        const filePath = `${folder}/${fileName}`;
        await deleteFile(filePath);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

module.exports = router;
