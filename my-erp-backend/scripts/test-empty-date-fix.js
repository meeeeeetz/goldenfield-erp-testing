const http = require('http');

// Test 1: Update with empty string for date_of_hire (should convert to null)
const data1 = JSON.stringify({
    employee_id: 'GefiEmp-00006',
    date_of_hire: '',
    employment_status: 'Probation'
});

const req1 = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/employee-profiles/GefiEmp-00006',
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data1)
    }
}, (res) => {
    let responseData = '';
    res.on('data', chunk => responseData += chunk);
    res.on('end', () => {
        console.log('Test 1 - Empty date_of_hire:');
        console.log('Status:', res.statusCode);
        console.log('Response:', responseData);
        console.log('---');

        // Test 2: Update with normal values
        const data2 = JSON.stringify({
            employee_id: 'GefiEmp-00006',
            date_of_hire: '01/15/2024',
            employment_status: 'Regular'
        });

        const req2 = http.request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/employee-profiles/GefiEmp-00006',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data2)
            }
        }, (res2) => {
            let responseData2 = '';
            res2.on('data', chunk => responseData2 += chunk);
            res2.on('end', () => {
                console.log('Test 2 - Normal update:');
                console.log('Status:', res2.statusCode);
                console.log('Response:', responseData2);
            });
        });

        req2.on('error', (error) => {
            console.error('Test 2 Error:', error.message);
        });

        req2.write(data2);
        req2.end();
    });
});

req1.on('error', (error) => {
    console.error('Test 1 Error:', error.message);
});

req1.write(data1);
req1.end();
