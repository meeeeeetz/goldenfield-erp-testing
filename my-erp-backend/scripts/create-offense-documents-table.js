const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function createOffenseDocumentsTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS offense_documents (
                doc_id SERIAL PRIMARY KEY,
                doc_type VARCHAR(50) UNIQUE NOT NULL,
                html_content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await pool.query('CREATE INDEX IF NOT EXISTS idx_offense_documents_doc_type ON offense_documents(doc_type)');
        
        console.log('offense_documents table created successfully');
    } catch (error) {
        console.error('Migration error:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

createOffenseDocumentsTable();
