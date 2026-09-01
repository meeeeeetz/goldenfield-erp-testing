const fs = require('fs');
const path = require('path');

const databaseDir = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/my-erp-database';
const outputFile = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';

function getSqlFiles(dir) {
    let results = [];
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(getSqlFiles(fullPath));
        } else if (item.endsWith('.sql')) {
            results.push(fullPath);
        }
    }
    return results;
}

const sqlFiles = getSqlFiles(databaseDir);
let combinedSql = '-- Goldenfield ERP - Combined Database Setup\n-- Generated for Neon\n\n';

for (const file of sqlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(databaseDir, file);
    combinedSql += `\n-- ============================================\n-- File: ${relativePath}\n-- ============================================\n\n`;
    combinedSql += content;
    combinedSql += '\n';
}

fs.writeFileSync(outputFile, combinedSql);
console.log(`Combined ${sqlFiles.length} SQL files into ${outputFile}`);
console.log(`Total size: ${combinedSql.length} characters`);
