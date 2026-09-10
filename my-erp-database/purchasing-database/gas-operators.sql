CREATE TABLE IF NOT EXISTS gas_operators (
    id SERIAL PRIMARY KEY,
    gas_operator_id VARCHAR(50) UNIQUE NOT NULL,
    gas_station_name VARCHAR(255) NOT NULL,
    address TEXT,
    tin_number VARCHAR(20),
    contact_person VARCHAR(255),
    contact_number VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gas_operators_gas_operator_id ON gas_operators(gas_operator_id);
CREATE INDEX IF NOT EXISTS idx_gas_operators_gas_station_name ON gas_operators(gas_station_name);
CREATE INDEX IF NOT EXISTS idx_gas_operators_status ON gas_operators(status);
