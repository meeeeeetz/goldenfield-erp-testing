DROP VIEW IF EXISTS customer_price_today;


CREATE TABLE customer_price_today (id SERIAL PRIMARY KEY,
                                             customer VARCHAR(255) NOT NULL,
                                                                   product VARCHAR(255) NOT NULL,
                                                                                        price DECIMAL(10, 2) NOT NULL,
                                                                                                             last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                            UNIQUE(customer, product));


CREATE INDEX IF NOT EXISTS idx_customer_price_today_customer ON customer_price_today(customer);


CREATE INDEX IF NOT EXISTS idx_customer_price_today_product ON customer_price_today(product);