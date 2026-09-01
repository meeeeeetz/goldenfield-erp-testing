CREATE TABLE IF NOT EXISTS receipt_issue_summaries (
    si_number VARCHAR(50) PRIMARY KEY,
    date DATE NOT NULL,
    customer VARCHAR(255) NOT NULL,
    grand_total DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending',
    posted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_customer ON receipt_issue_summaries(customer);
CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_date ON receipt_issue_summaries(date);
