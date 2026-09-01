const http = require('http');

const data = JSON.stringify({
    employee_id: 'GefiEmp-00006',
    date_of_hire: '',
    employment_status: 'Probation',
    sss_number: '',
    philhealth_number: '',
    pagibig_number: '',
    tin_number: ''
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/employee-profiles/GefiEmp-00006',
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
