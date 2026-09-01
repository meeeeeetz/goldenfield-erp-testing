const fs = require('fs');
const file = 'C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-setup.sql';
let content = fs.readFileSync(file, 'utf8');

// Remove the broken function fragment
content = content.replace(/\) AS INTEGER\)\), 0\) \+ 1 INTO next_id FROM price_changes;\nEND;\n\$ LANGUAGE plpgsql;\n/, '');

// Remove the INSERT statement that uses the function - find by line content
const lines = content.split('\n');
const filteredLines = [];
let skipMode = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('INSERT INTO price_changes (transaction_id')) {
        skipMode = true;
        continue;
    }
    if (skipMode) {
        if (lines[i].trim() === ';') {
            skipMode = false;
        }
        continue;
    }
    filteredLines.push(lines[i]);
}
content = filteredLines.join('\n');

// Remove all function definitions that use $$ delimiters
content = content.replace(/CREATE OR REPLACE FUNCTION[\s\S]*?\$\$ LANGUAGE plpgsql;/g, '');

// Remove trigger statements
content = content.replace(/CREATE TRIGGER[\s\S]*?EXECUTE FUNCTION [^;]+;/g, '');

fs.writeFileSync('C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/neon-tables-only.sql', content);
console.log('Created neon-tables-only.sql without functions');
