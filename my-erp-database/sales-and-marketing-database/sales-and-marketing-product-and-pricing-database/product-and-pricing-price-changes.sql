CREATE TABLE price_changes (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    customer VARCHAR(255) NOT NULL,
    product VARCHAR(255) NOT NULL,
    old_price DECIMAL(10,2) NOT NULL,
    new_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_price_changes_transaction_id ON price_changes(transaction_id);
CREATE INDEX idx_price_changes_date ON price_changes(date);

CREATE SEQUENCE IF NOT EXISTS price_change_seq START 1;

SELECT setval('price_change_seq', COALESCE(MAX(CAST(SUBSTRING(transaction_id FROM 4) AS INTEGER)), 0), true) FROM price_changes;

CREATE OR REPLACE FUNCTION get_next_price_change_transaction_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('price_change_seq') INTO next_num;
    new_id := 'EP-' || LPAD(next_num::TEXT, 3, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;
