const http = require('http');

const data = JSON.stringify({
    shift_policy_id: 'ShfPo-0001',
    shift_name: 'Morning Shift',
    shift_time_start: '08:00',
    shift_time_end: '17:00',
    first_coffee_break_start: '10:00',
    first_coffee_break_end: '10:15',
    mid_break_start: '12:00',
    mid_break_end: '13:00',
    second_coffee_break_start: '15:00',
    second_coffee_break_end: '15:15',
    org_unit: 'OU001',
    remarks: 'Test shift with breaks',
    status: 'Active'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/shift-policies',
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
