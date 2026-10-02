ALTER TABLE IF EXISTS shipping_permit_recipients DROP COLUMN IF EXISTS handlers_license;
ALTER TABLE IF EXISTS shipping_permit_recipients DROP COLUMN IF EXISTS handlers_issued_date;
ALTER TABLE IF EXISTS shipping_permit_recipients DROP COLUMN IF EXISTS handlers_expiration;
ALTER TABLE IF EXISTS shipping_permit_recipients DROP COLUMN IF EXISTS transport_carrier;
ALTER TABLE IF EXISTS shipping_permit_recipients DROP COLUMN IF EXISTS transport_issued_date;
ALTER TABLE IF EXISTS shipping_permit_recipients DROP COLUMN IF EXISTS transport_expiration;
