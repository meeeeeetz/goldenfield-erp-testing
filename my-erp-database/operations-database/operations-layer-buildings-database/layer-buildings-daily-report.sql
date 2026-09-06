CREATE TABLE IF NOT EXISTS daily_layer_reports (
    report_id VARCHAR(20) PRIMARY KEY,
    building VARCHAR(10) NOT NULL,
    report_date DATE NOT NULL,
    mort_normal INTEGER NOT NULL DEFAULT 0,
    mort_sipon INTEGER NOT NULL DEFAULT 0,
    mort_prolapse INTEGER NOT NULL DEFAULT 0,
    mort_others INTEGER NOT NULL DEFAULT 0,
    mort_culled INTEGER NOT NULL DEFAULT 0,
    electricity_prev VARCHAR(50),
    electricity_today VARCHAR(50),
    water_prev VARCHAR(50),
    water_today VARCHAR(50),
    production_prev VARCHAR(50),
    production_today VARCHAR(50),
    feeds_delivered VARCHAR(10) NOT NULL DEFAULT 'No',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_layer_medications (
    medication_id SERIAL PRIMARY KEY,
    report_id VARCHAR(20) NOT NULL REFERENCES daily_layer_reports(report_id) ON DELETE CASCADE,
    medication_type VARCHAR(100) NOT NULL,
    quantity VARCHAR(50),
    unit VARCHAR(50),
    water_ratio VARCHAR(50),
    time_start VARCHAR(50),
    time_finish VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_layer_feeds (
    feed_id SERIAL PRIMARY KEY,
    report_id VARCHAR(20) NOT NULL REFERENCES daily_layer_reports(report_id) ON DELETE CASCADE,
    feed_type VARCHAR(50) NOT NULL,
    weight_kgs VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_daily_layer_reports_date ON daily_layer_reports(report_date);
CREATE INDEX IF NOT EXISTS idx_daily_layer_reports_building ON daily_layer_reports(building);
CREATE INDEX IF NOT EXISTS idx_daily_layer_medications_report ON daily_layer_medications(report_id);
CREATE INDEX IF NOT EXISTS idx_daily_layer_feeds_report ON daily_layer_feeds(report_id);
