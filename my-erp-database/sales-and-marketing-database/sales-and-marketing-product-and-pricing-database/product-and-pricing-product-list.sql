CREATE TABLE product_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    product VARCHAR(255) NOT NULL,
    remarks TEXT,
    no_of_eggs INT DEFAULT 0,
    egg_tray_used DECIMAL(10,2) DEFAULT 0,
    status ENUM('Active', 'Terminated') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
