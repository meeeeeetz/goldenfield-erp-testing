ALTER TABLE IF EXISTS shipping_permit_recipients ADD COLUMN IF NOT EXISTS created_by VARCHAR(255);
ALTER TABLE IF EXISTS shipping_permit_recipients ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_shipping_permit_recipients_created_by ON shipping_permit_recipients(created_by);
