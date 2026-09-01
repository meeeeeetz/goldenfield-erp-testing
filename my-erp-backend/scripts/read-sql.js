const fs = require('fs');
const path = require('path');
const fp = path.join(__dirname, '..', 'Database Scripts', 'human-resource-cash-advance', 'batch-payroll.sql');
const sql = fs.readFileSync(fp, 'utf8');
