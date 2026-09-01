const fs = require('fs');
const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
let content = fs.readFileSync(file, 'utf8');

// Remove the broken seed data section entirely
const startMarker = '-- File: sales-and-marketing-database\\sales-and-marketing-product-and-pricing-database\\product-and-pricing-seed-data\\cha-cha-j-tray-seed.sql';
const endMarker = '-- File: sales-and-marketing-database\\sales-and-marketing-product-and-pricing-database\\product-and-pricing-viewlist\\customer-price-today.sql';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + content.substring(endIdx);
}

// Also remove any broken function code that might remain
content = content.replace(/DECLARE\s*next_id INTEGER;\s*BEGIN\s*SELECT COALESCE[\s\S]*?price_changes;/g, '');
content = content.replace(/RETURN 'PC-' \|\| next_id;/g, '');

fs.writeFileSync(file, content);
console.log('Removed broken seed data section');
