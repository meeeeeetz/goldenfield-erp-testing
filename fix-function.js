const fs = require('fs');
const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
let content = fs.readFileSync(file, 'utf8');

// Replace the INSERT statement with one that uses ROW_NUMBER
content = content.replace(
    /INSERT INTO price_changes \(transaction_id, date, customer, product, old_price, new_price, created_at\)\nSELECT 'PC-' \|\| COALESCE\(MAX\(CAST\(SUBSTRING\(transaction_id FROM '\\(\(\[0-9\]\+\)\$'\) AS INTEGER\)\), 0\) \+ 1 FROM price_changes\), d\.date, 'Cha-cha Eggs Wholesaling', 'J - Tray', d\.old_price, d\.new_price, d\.date::timestamp\nFROM \(/,
    `INSERT INTO price_changes (transaction_id, date, customer, product, old_price, new_price, created_at)
SELECT 'PC-' || (ROW_NUMBER() OVER () + COALESCE((SELECT MAX(CAST(SUBSTRING(transaction_id FROM '([0-9]+)$') AS INTEGER)) FROM price_changes), 0)), d.date, 'Cha-cha Eggs Wholesaling', 'J - Tray', d.old_price, d.new_price, d.date::timestamp
FROM (`
);

fs.writeFileSync(file, content);
console.log('INSERT statement fixed');
