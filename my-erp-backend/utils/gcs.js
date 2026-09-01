const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

let storage;
let bucket;

function initializeGCS() {
    if (storage) return { storage, bucket };

    let credentials;
    
    // Try to load from environment variable (Vercel)
    if (process.env.GCP_KEY_CONTENT) {
        try {
            credentials = JSON.parse(process.env.GCP_KEY_CONTENT);
        } catch (e) {
            console.error('Failed to parse GCP_KEY_CONTENT:', e.message);
        }
    }
    
    // Try to load from file (local development)
    if (!credentials && process.env.GCP_KEY_FILE) {
        const keyPath = path.resolve(process.env.GCP_KEY_FILE);
        if (fs.existsSync(keyPath)) {
            credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
        }
    }

    storage = new Storage(credentials ? { credentials } : undefined);
    bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
    
    return { storage, bucket };
}

async function uploadFile(buffer, destination, options = {}) {
    const { bucket } = initializeGCS();
    
    const file = bucket.file(destination);
    
    const stream = file.createWriteStream({
        metadata: {
            contentType: options.contentType || 'application/octet-stream',
            ...options.metadata
        },
        resumable: false
    });

    return new Promise((resolve, reject) => {
        stream.on('error', (err) => {
            console.error('GCS upload error:', err);
            reject(err);
        });
        
        stream.on('finish', async () => {
            try {
                await file.makePublic();
                resolve({
                    fileName: destination,
                    publicUrl: getPublicUrl(destination),
                    bucket: process.env.GCP_BUCKET_NAME
                });
            } catch (e) {
                resolve({
                    fileName: destination,
                    publicUrl: getPublicUrl(destination),
                    bucket: process.env.GCP_BUCKET_NAME
                });
            }
        });
        
        stream.end(buffer);
    });
}

async function deleteFile(fileName) {
    const { bucket } = initializeGCS();
    const file = bucket.file(fileName);
    await file.delete();
}

function getPublicUrl(fileName) {
    return `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/${fileName}`;
}

async function fileExists(fileName) {
    const { bucket } = initializeGCS();
    const file = bucket.file(fileName);
    const [exists] = await file.exists();
    return exists;
}

module.exports = {
    initializeGCS,
    uploadFile,
    deleteFile,
    getPublicUrl,
    fileExists
};
