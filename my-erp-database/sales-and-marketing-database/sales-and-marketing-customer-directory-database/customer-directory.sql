CREATE TABLE customer_list (
    id SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) UNIQUE NOT NULL,
    company VARCHAR(255) NOT NULL,
    address TEXT,
    tin_no VARCHAR(20),
    contact_name VARCHAR(255),
    contact_number VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customer_list_customer_id ON customer_list(customer_id);
