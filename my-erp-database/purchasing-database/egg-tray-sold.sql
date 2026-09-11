CREATE TABLE IF NOT EXISTS egg_tray_sold (
    id SERIAL PRIMARY KEY,
    sold_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    invoice_number VARCHAR(100),
    customer VARCHAR(255) NOT NULL,
    pcs INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_egg_tray_sold_sold_id ON egg_tray_sold(sold_id);
CREATE INDEX IF NOT EXISTS idx_egg_tray_sold_customer ON egg_tray_sold(customer);
CREATE INDEX IF NOT EXISTS idx_egg_tray_sold_date ON egg_tray_sold(date);

CREATE SEQUENCE IF NOT EXISTS egg_tray_sold_seq START 1;

SELECT setval('egg_tray_sold_seq', COALESCE(GREATEST(MAX(CAST(REPLACE(sold_id, 'EgTrSoID-', '') AS INTEGER)), 1), 1), true) FROM egg_tray_sold;

CREATE OR REPLACE FUNCTION generate_egg_tray_sold_id()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('egg_tray_sold_seq') INTO next_num;
    new_id := 'EgTrSoID-' || next_num::TEXT;
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_egg_tray_sold_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_egg_tray_sold_timestamp_trigger ON egg_tray_sold;
CREATE TRIGGER update_egg_tray_sold_timestamp_trigger
    BEFORE UPDATE ON egg_tray_sold
    FOR EACH ROW
    EXECUTE FUNCTION update_egg_tray_sold_timestamp();
