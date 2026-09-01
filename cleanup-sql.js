const fs = require('fs');
const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
let content = fs.readFileSync(file, 'utf8');

// Remove the broken function
content = content.replace(/CREATE OR REPLACE FUNCTION get_next_price_change_transaction_id\(\)[\s\S]*?\$\s*\n/, '');

// Remove the broken INSERT statement
content = content.replace(/SELECT get_next_price_change_transaction_id\(\)[^;]+;/, '');

fs.writeFileSync(file, content);
console.log('Broken function and INSERT removed');
