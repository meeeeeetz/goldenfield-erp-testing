const fs = require('fs');
const path = 'C:\\Users\\ADMIN\\Documents\\Coding\\goldenfield-erp-testing\\main-landing-page\\Operations Folder\\Operations-petty-cash.js';

let content = fs.readFileSync(path, 'utf8');

// Find the last occurrence of "function initializeModule(contentArea) {" 
// and make sure loadPettyCashTransactions is called before it, inside the arrow function
const initIndex = content.lastIndexOf('function initializeModule(contentArea) {');

if (initIndex > 0) {
    const beforeInit = content.substring(0, initIndex);
    const afterInit = content.substring(initIndex);
    
    // Check if loadPettyCashTransactions is already before initializeModule
    if (!beforeInit.trim().endsWith('loadPettyCashTransactions();')) {
        // Remove any existing loadPettyCashTransactions calls before initializeModule
        const cleanedBefore = beforeInit.replace(/\s*loadPettyCashTransactions\(\);\s*/g, '');
        
        // Add it back right before initializeModule
        const newContent = cleanedBefore.trim() + '\n    loadPettyCashTransactions();\n\n' + afterInit;
        fs.writeFileSync(path, newContent, 'utf8');
        console.log('Fixed loadPettyCashTransactions call');
    } else {
        console.log('loadPettyCashTransactions already properly placed');
    }
} else {
    console.log('Could not find initializeModule');
}
