CREATE TABLE IF NOT EXISTS vet_products_inventory (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    item VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    unit VARCHAR(50),
    quantity INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vet_products_inventory_product_id ON vet_products_inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_vet_products_inventory_category ON vet_products_inventory(category);
CREATE INDEX IF NOT EXISTS idx_vet_products_inventory_last_updated ON vet_products_inventory(last_updated);
