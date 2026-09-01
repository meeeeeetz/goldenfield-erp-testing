const http = require('http');

const data = JSON.stringify({
    employee_assigned: 'GefiEmp-00002'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/organizational-structure/OrgStr-029',
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => {
        responseData += chunk;
    });
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Response:', responseData);
    });
});

req.on('error', (error) => {
    console.error('Error:', error.message);
});

req.write(data);
req.end();
