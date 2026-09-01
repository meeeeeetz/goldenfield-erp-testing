const fs = require('fs');
const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
let content = fs.readFileSync(file, 'utf8');

const func = `
CREATE OR REPLACE FUNCTION get_next_price_change_transaction_id()
RETURNS VARCHAR(50) AS $$
DECLARE
    next_id INTEGER;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(transaction_id FROM '([0-9]+)$') AS INTEGER)), 0) + 1 INTO next_id FROM price_changes;
    RETURN 'PC-' || next_id;
END;
$$ LANGUAGE plpgsql;

`;

content = content.replace('INSERT INTO price_changes', func + 'INSERT INTO price_changes');

fs.writeFileSync(file, content);
console.log('Function added');
