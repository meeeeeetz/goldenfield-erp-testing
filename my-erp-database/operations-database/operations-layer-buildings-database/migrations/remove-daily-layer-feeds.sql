-- Migration: Remove feeds section from Daily Layer Report
-- Date: 2026-09-09

-- Remove feeds_delivered column from daily_layer_reports
ALTER TABLE IF EXISTS daily_layer_reports DROP COLUMN IF EXISTS feeds_delivered;

-- Drop daily_layer_feeds table if exists
DROP TABLE IF EXISTS daily_layer_feeds CASCADE;

-- Drop index if exists
DROP INDEX IF EXISTS idx_daily_layer_feeds_report;
