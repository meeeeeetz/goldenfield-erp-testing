CREATE TABLE IF NOT EXISTS shipping_permit_recipient_papers (
    id SERIAL PRIMARY KEY,
    recipient_paper_id VARCHAR(50) UNIQUE NOT NULL,
    recipient_id VARCHAR(50) NOT NULL REFERENCES shipping_permit_recipients(recipient_id) ON DELETE CASCADE,
    paper_type VARCHAR(20) NOT NULL CHECK (paper_type IN ('handlers_certificate', 'transport_carrier')),
    registration_number VARCHAR(100),
    transport_carrier_name VARCHAR(100),
    license_plate VARCHAR(50),
    issued_date DATE,
    expiration_date DATE,
    issued_by VARCHAR(255),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipient_papers_recipient_paper_id ON shipping_permit_recipient_papers(recipient_paper_id);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipient_papers_recipient_id ON shipping_permit_recipient_papers(recipient_id);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipient_papers_paper_type ON shipping_permit_recipient_papers(paper_type);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipient_papers_created_by ON shipping_permit_recipient_papers(created_by);