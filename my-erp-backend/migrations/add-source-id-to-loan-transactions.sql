-- Add source_id column to loan_transactions table if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'loan_transactions' AND column_name = 'source_id'
    ) THEN
        ALTER TABLE loan_transactions ADD COLUMN source_id VARCHAR(255);
    ELSE
        ALTER TABLE loan_transactions ALTER COLUMN source_id TYPE VARCHAR(255);
    END IF;
END $$;