CREATE TABLE IF NOT EXISTS vet_supplies_categories (
    id SERIAL PRIMARY KEY,
    category_id VARCHAR(50) UNIQUE NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vet_supplies_categories_category_id ON vet_supplies_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_categories_category_name ON vet_supplies_categories(category_name);
