const http = require('http');

async function test() {
    const nextIdRes = await new Promise((resolve, reject) => {
        http.get('http://localhost:5000/api/employee-compensations/next-id', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) resolve(JSON.parse(data));
                else reject(new Error('Failed to get next ID'));
            });
        }).on('error', reject);
    });

    console.log('Next ID:', nextIdRes.compensation_id);

    const data = JSON.stringify({
        compensation_id: nextIdRes.compensation_id,
        employee_id: 'GefiEmp-00002',
        salary_pay_mode: 'Monthly',
        salary_amount: 15000,
        allowance_pay_mode: 'Monthly',
        allowance_amount: 2000,
        pay_frequency: 'Semi monthly',
        payout_method: 'Bank',
        department: 'Office',
        role: 'OrgStr-029'
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/employee-compensations',
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
}

test();
