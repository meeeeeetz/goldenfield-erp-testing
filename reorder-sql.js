const fs = require('fs');
const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
let content = fs.readFileSync(file, 'utf8');

// Separate CREATE TABLE statements from CREATE INDEX statements
const lines = content.split('\n');
const tableStatements = [];
const indexStatements = [];
const otherStatements = [];

let currentStatement = '';
let inFunction = false;

for (const line of lines) {
    currentStatement += line + '\n';
    
    if (line.includes('$$') && !inFunction) {
        inFunction = true;
    } else if (line.includes('$$') && inFunction) {
        inFunction = false;
    }
    
    if (line.trim().endsWith(';') && !inFunction) {
        const stmt = currentStatement.trim();
        currentStatement = '';
        
        if (stmt.startsWith('--') || !stmt) {
            otherStatements.push(stmt);
        } else if (stmt.startsWith('CREATE INDEX') || stmt.startsWith('CREATE UNIQUE INDEX')) {
            indexStatements.push(stmt);
        } else {
            tableStatements.push(stmt);
        }
    }
}

// Recombine: tables first, then indexes, then others
const reordered = [
    ...otherStatements.filter(s => s.includes('-- File:') || s.includes('-- ====')),
    ...tableStatements,
    ...indexStatements,
    ...otherStatements.filter(s => !s.includes('-- File:') && !s.includes('-- ===='))
].join('\n');

fs.writeFileSync(file, reordered);
console.log(`Reordered: ${tableStatements.length} table statements, ${indexStatements.length} index statements`);
