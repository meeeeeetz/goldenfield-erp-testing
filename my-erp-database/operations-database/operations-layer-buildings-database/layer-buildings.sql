CREATE TABLE IF NOT EXISTS layer_buildings (
    building_id VARCHAR(20) PRIMARY KEY,
    building_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_by VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_layer_buildings_status ON layer_buildings(status);
CREATE INDEX IF NOT EXISTS idx_layer_buildings_name ON layer_buildings(building_name);
