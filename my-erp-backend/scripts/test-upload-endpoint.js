require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const FormData = require('form-data');
const form = new FormData();

const uploadDir = 'C:\\Users\\ADMIN\\Documents\\uploads\\photos\\test-upload';
fs.mkdirSync(uploadDir, { recursive: true });

const filePath = path.join(__dirname, 'test-doc.txt');
fs.writeFileSync(filePath, 'Test document content');

form.append('employeeId', 'GefiEmp-00001');
form.append('files', fs.createReadStream(filePath), { filename: 'GefiEmp-00001_2x2 pic.webp' });
form.append('labels', '2x2 Pic');

const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/employee-profiles/upload-documents',
    method: 'POST',
    headers: form.getHeaders()
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', data);
        fs.unlinkSync(filePath);
        if (res.statusCode === 200 || res.statusCode === 201) {
            console.log('Save endpoint is working.');
        } else {
            console.log('Save endpoint returned an error.');
        }
    });
});

req.on('error', (err) => {
    console.error('Request failed:', err.message);
    fs.unlinkSync(filePath);
});

form.pipe(req);
