CREATE TABLE IF NOT EXISTS vet_supplies_use (
    id SERIAL PRIMARY KEY,
    use_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    building VARCHAR(255) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    item VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    unit VARCHAR(50),
    quantity INTEGER NOT NULL DEFAULT 0,
    prepared_by VARCHAR(255),
    use_time TIME,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vet_supplies_use_use_id ON vet_supplies_use(use_id);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_use_date ON vet_supplies_use(date);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_use_building ON vet_supplies_use(building);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_use_product_id ON vet_supplies_use(product_id);
