-- Chicken Hauling Logs Table
CREATE TABLE IF NOT EXISTS chicken_hauling_logs (
    id SERIAL PRIMARY KEY,
    hauling_id VARCHAR(50) UNIQUE NOT NULL,
    building_id VARCHAR(100) NOT NULL,
    days INTEGER DEFAULT 1,
    day_entries JSONB DEFAULT '[]',
    workers JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'pending',
    grand_total NUMERIC DEFAULT 0,
    date_start DATE,
    date_end DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster search
CREATE INDEX IF NOT EXISTS idx_chicken_hauling_logs_hauling_id ON chicken_hauling_logs(hauling_id);
CREATE INDEX IF NOT EXISTS idx_chicken_hauling_logs_building_id ON chicken_hauling_logs(building_id);
CREATE INDEX IF NOT EXISTS idx_chicken_hauling_logs_status ON chicken_hauling_logs(status);
CREATE INDEX IF NOT EXISTS idx_chicken_hauling_logs_created_at ON chicken_hauling_logs(created_at);