CREATE TABLE IF NOT EXISTS daily_egg_production (
    daily_egg_production_id VARCHAR(20) PRIMARY KEY,
    report_date DATE NOT NULL,
    beginning_inventory INTEGER NOT NULL DEFAULT 0,
    total_eggs_sold_today INTEGER NOT NULL DEFAULT 0,
    weighed_nw INTEGER NOT NULL DEFAULT 0,
    weighed_pw INTEGER NOT NULL DEFAULT 0,
    weighed_xs INTEGER NOT NULL DEFAULT 0,
    weighed_s INTEGER NOT NULL DEFAULT 0,
    weighed_m INTEGER NOT NULL DEFAULT 0,
    weighed_l INTEGER NOT NULL DEFAULT 0,
    weighed_xl INTEGER NOT NULL DEFAULT 0,
    weighed_j INTEGER NOT NULL DEFAULT 0,
    weighed_others INTEGER NOT NULL DEFAULT 0,
    total_weighed INTEGER NOT NULL DEFAULT 0,
    unweighed_dirty INTEGER NOT NULL DEFAULT 0,
    unweighed_clean INTEGER NOT NULL DEFAULT 0,
    sellable_broken INTEGER NOT NULL DEFAULT 0,
    total_unweighed INTEGER NOT NULL DEFAULT 0,
    total_broken INTEGER NOT NULL DEFAULT 0,
    ending_inventory INTEGER NOT NULL DEFAULT 0,
    time_worked DECIMAL(4,2) NOT NULL DEFAULT 0,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_daily_egg_production_date ON daily_egg_production(report_date);
CREATE INDEX IF NOT EXISTS idx_daily_egg_production_created_at ON daily_egg_production(created_at);
