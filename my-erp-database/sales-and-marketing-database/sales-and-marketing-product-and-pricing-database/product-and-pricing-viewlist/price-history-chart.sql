CREATE OR REPLACE VIEW price_history_chart AS
SELECT 
    customer,
    product,
    date,
    old_price,
    new_price
FROM price_changes
ORDER BY date ASC, customer ASC, product ASC;
