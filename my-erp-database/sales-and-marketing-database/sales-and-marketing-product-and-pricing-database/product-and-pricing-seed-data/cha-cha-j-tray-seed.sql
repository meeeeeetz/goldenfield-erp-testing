INSERT INTO price_changes (transaction_id, date, customer, product, old_price, new_price, created_at)
SELECT get_next_price_change_transaction_id(), d.date, 'Cha-cha Eggs Wholesaling', 'J - Tray', d.old_price, d.new_price, d.date::timestamp
FROM (
    VALUES
    ('2025-11-12'::DATE, 2500.00, 2520.00),
    ('2025-12-10'::DATE, 2520.00, 2480.00),
    ('2025-12-25'::DATE, 2480.00, 2750.00),
    ('2026-01-02'::DATE, 2750.00, 2900.00),
    ('2026-01-15'::DATE, 2900.00, 2050.00),
    ('2026-01-28'::DATE, 2050.00, 2100.00),
    ('2026-02-05'::DATE, 2100.00, 2200.00),
    ('2026-02-18'::DATE, 2200.00, 2350.00),
    ('2026-02-27'::DATE, 2350.00, 3300.00),
    ('2026-03-01'::DATE, 3300.00, 2400.00),
    ('2025-03-25'::DATE, 2400.00, 1750.00),
    ('2026-04-02'::DATE, 1750.00, 1900.00),
    ('2026-04-15'::DATE, 1900.00, 2050.00),
    ('2026-05-28'::DATE, 2050.00, 2100.00),
    ('2026-06-05'::DATE, 2100.00, 2200.00),
    ('2026-07-18'::DATE, 2200.00, 3350.00),
    ('2026-07-27'::DATE, 3350.00, 1300.00),
    ('2026-08-01'::DATE, 1300.00, 3000.00)
) AS d(date, old_price, new_price);