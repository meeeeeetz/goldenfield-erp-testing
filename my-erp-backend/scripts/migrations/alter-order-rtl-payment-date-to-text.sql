-- Alter payment_date from DATE to TEXT to store comma-separated dates
ALTER TABLE order_rtl ALTER COLUMN payment_date TYPE TEXT;