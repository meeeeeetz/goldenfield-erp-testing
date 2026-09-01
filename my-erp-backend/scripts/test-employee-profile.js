const http = require('http');

const data = JSON.stringify({
    employee_id: 'GefiEmp-00004',
    last_name: 'Test',
    first_name: 'User',
    address: 'Test Address',
    contact_details: '1234567890',
    birthdate: '1990-01-01',
    gender: 'Male',
    civil_status: 'Single',
    emergency_contact: 'Emergency',
    emergency_contact_number: '0987654321'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/employee-profiles',
    method: 'POST',
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
