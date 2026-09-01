const fs = require('fs');
const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
let content = fs.readFileSync(file, 'utf8');

// Remove leftover function code
content = content.replace(/next_id INTEGER;\s*BEGIN\s*SELECT COALESCE[\s\S]*?created_at\)/, '');
content = content.replace(/SELECT COALESCE[\s\S]*?price_changes;/, '');
content = content.replace(/RETURN 'PC-' \|\| next_id;/, '');

fs.writeFileSync(file, content);
console.log('Cleaned up leftover function code');
