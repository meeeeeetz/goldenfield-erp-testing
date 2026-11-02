CREATE TABLE IF NOT EXISTS metzeler_print_templates (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    content_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_metzeler_print_templates_filename ON metzeler_print_templates(filename);
