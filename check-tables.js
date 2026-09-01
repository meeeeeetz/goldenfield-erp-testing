const fs = require('fs');
const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
const content = fs.readFileSync(file, 'utf8');

// Extract just CREATE TABLE statements
const tableMatches = content.match(/CREATE TABLE[\s\S]*?;/g) || [];
console.log(`Found ${tableMatches.length} CREATE TABLE statements`);

// Find the first problematic statement
for (let i = 0; i < tableMatches.length; i++) {
    const stmt = tableMatches[i];
    if (stmt.includes('next_id') || stmt.includes('RETURN') || stmt.includes('price_changes')) {
        console.log(`\n--- Problematic statement ${i} ---`);
        console.log(stmt.substring(0, 300));
    }
}
