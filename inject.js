const fs=require('fs');
const p='C:/Users/ADMIN/Documents/Coding/goldenfield-erp-testing/main-landing-page/Human Resource Folder/Human-Salary-attendance.js';
let c=fs.readFileSync(p,'utf8');
c=c.replace('    \;\n\n    const attendanceSubtabAddBtn', m+'\n    \;\n\n    const attendanceSubtabAddBtn');
fs.writeFileSync(p,c);
console.log('done');
