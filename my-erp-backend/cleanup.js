const http = require('http');

const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/schedules/Sch-0003',
    method: 'DELETE'
}, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('DELETE Sch-0003:', res.statusCode, body);
    });
});
req.end();