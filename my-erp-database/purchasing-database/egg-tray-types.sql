CREATE TABLE IF NOT EXISTS egg_tray_types (
    id SERIAL PRIMARY KEY,
    type_id VARCHAR(50) UNIQUE NOT NULL,
    supplier_id VARCHAR(50) NOT NULL,
    price_per_piece DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    remarks TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_egg_tray_types_type_id ON egg_tray_types(type_id);
CREATE INDEX IF NOT EXISTS idx_egg_tray_types_supplier_id ON egg_tray_types(supplier_id);
CREATE INDEX IF NOT EXISTS idx_egg_tray_types_status ON egg_tray_types(status);
