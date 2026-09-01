CREATE TABLE IF NOT EXISTS lossdamage_repayment (
    lossdamage_repayment_id SERIAL PRIMARY KEY,
    lossdamage_id VARCHAR(50) NOT NULL REFERENCES loss_damage(lossdamage_id),
    payrollcycle_id VARCHAR(50) NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    paid_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lossdamage_repayment_lossdamage_id ON lossdamage_repayment(lossdamage_id);
CREATE INDEX IF NOT EXISTS idx_lossdamage_repayment_payrollcycle_id ON lossdamage_repayment(payrollcycle_id);
