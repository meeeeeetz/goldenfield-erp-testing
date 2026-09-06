const { createClient } = require('@supabase/supabase-js');

let supabase;

function initializeSupabase() {
    if (supabase) return supabase;

    const url = process.env.SUPABASE_URL || 'https://lhypktkkymfkdkcrtvik.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!serviceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY is required');
    }

    supabase = createClient(url, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    return supabase;
}

async function uploadFile(buffer, destination, options = {}) {
    const client = initializeSupabase();
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'uploads';

    const { data, error } = await client.storage
        .from(bucketName)
        .upload(destination, buffer, {
            contentType: options.contentType || 'application/octet-stream',
            upsert: true,
            ...options.metadata
        });

    if (error) {
        console.error('Supabase upload error:', error);
        throw error;
    }

    return {
        fileName: destination,
        publicUrl: getPublicUrl(destination),
        bucket: bucketName,
        path: data.path
    };
}

async function deleteFile(fileName) {
    const client = initializeSupabase();
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'uploads';

    const { error } = await client.storage
        .from(bucketName)
        .remove([fileName]);

    if (error) {
        console.error('Supabase delete error:', error);
        throw error;
    }
}

function getPublicUrl(fileName) {
    const projectId = process.env.SUPABASE_PROJECT_ID || 'lhypktkkymfkdkcrtvik';
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'uploads';
    return `https://${projectId}.supabase.co/storage/v1/object/public/${bucketName}/${fileName}`;
}

async function fileExists(fileName) {
    const client = initializeSupabase();
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'uploads';

    const { data, error } = await client.storage
        .from(bucketName)
        .listPublicUrls(fileName);

    if (error) {
        return false;
    }

    return data && data.length > 0;
}

module.exports = {
    initializeSupabase,
    uploadFile,
    deleteFile,
    getPublicUrl,
    fileExists
};
