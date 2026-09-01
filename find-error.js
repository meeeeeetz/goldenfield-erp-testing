const fs = require('fs');
const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
const content = fs.readFileSync(file, 'utf8');

// Split by semicolons and try to find the error
const statements = content.split(';').filter(s => s.trim());

console.log(`Total statements: ${statements.length}`);

// Try to find the problematic statement
for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    if (stmt.includes('next_id') || stmt.includes('RETURN') || stmt.includes('price_changes')) {
        console.log(`\n--- Statement ${i} ---`);
        console.log(stmt.substring(0, 200));
    }
}
