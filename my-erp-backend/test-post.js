const http = require('http');

const data = JSON.stringify({
    schedule_id: 'Sch-0004',
    employee_id: 'GefiEmp-00001',
    org_unit: 'Office',
    schedule_date: '2026-08-05',
    half_month: 'August 1 - 15, 2026',
    status: 'Active'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/schedules',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', body);
    });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();