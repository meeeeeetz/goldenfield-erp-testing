-- Offense Documents table
CREATE TABLE IF NOT EXISTS offense_documents (
    doc_id SERIAL PRIMARY KEY,
    doc_type VARCHAR(50) UNIQUE NOT NULL,
    html_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_offense_documents_doc_type ON offense_documents(doc_type);
