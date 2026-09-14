CREATE TABLE IF NOT EXISTS shipping_permit_recipients (
    id SERIAL PRIMARY KEY,
    recipient_id VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    province VARCHAR(100),
    city VARCHAR(100),
    barangay VARCHAR(100),
    transport_type VARCHAR(50),
    plate_number VARCHAR(50),
    contact VARCHAR(255),
    contact_number VARCHAR(20),
    handlers_license VARCHAR(100),
    handlers_issued_date DATE,
    handlers_expiration DATE,
    transport_carrier VARCHAR(100),
    transport_issued_date DATE,
    transport_expiration DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipients_recipient_id ON shipping_permit_recipients(recipient_id);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipients_customer_name ON shipping_permit_recipients(customer_name);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipients_plate_number ON shipping_permit_recipients(plate_number);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipients_status ON shipping_permit_recipients(status);
CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipients_created_by ON shipping_permit_recipients(created_by);
