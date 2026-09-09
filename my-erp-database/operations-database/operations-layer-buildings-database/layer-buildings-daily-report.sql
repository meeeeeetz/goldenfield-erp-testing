CREATE TABLE IF NOT EXISTS daily_layer_reports (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    building_id VARCHAR(20) NOT NULL,
    morta_normal INTEGER NOT NULL DEFAULT 0,
    morta_sipon INTEGER NOT NULL DEFAULT 0,
    morta_prolapse INTEGER NOT NULL DEFAULT 0,
    morta_others INTEGER NOT NULL DEFAULT 0,
    morta_culled INTEGER NOT NULL DEFAULT 0,
    electricity_reading VARCHAR(50),
    water_reading VARCHAR(50),
    production_reading VARCHAR(50),
    created_by VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_layer_medications (
    medication_id SERIAL PRIMARY KEY,
    report_id INTEGER NOT NULL REFERENCES daily_layer_reports(id) ON DELETE CASCADE,
    medication_type VARCHAR(100) NOT NULL,
    quantity VARCHAR(50),
    unit VARCHAR(50),
    water_ratio VARCHAR(50),
    time_start VARCHAR(50),
    time_finish VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_daily_layer_reports_date ON daily_layer_reports(date);
CREATE INDEX IF NOT EXISTS idx_daily_layer_reports_building ON daily_layer_reports(building_id);
CREATE INDEX IF NOT EXISTS idx_daily_layer_medications_report ON daily_layer_medications(report_id);
