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
            console.log('Compensation Status:', res.statusCode);
            console.log('Compensation Response:', responseData);
            
            if (res.statusCode === 201) {
                const roleData = JSON.stringify({ employee_assigned: 'GefiEmp-00002' });
                const roleOptions = {
                    hostname: 'localhost',
                    port: 5000,
                    path: '/api/organizational-structure/OrgStr-029',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(roleData)
                    }
                };
                const roleReq = http.request(roleOptions, (roleRes) => {
                    let roleResponseData = '';
                    roleRes.on('data', (chunk) => {
                        roleResponseData += chunk;
                    });
                    roleRes.on('end', () => {
                        console.log('Role Assign Status:', roleRes.statusCode);
                        console.log('Role Assign Response:', roleResponseData);
                    });
                });
                roleReq.on('error', (error) => {
                    console.error('Role Assign Error:', error.message);
                });
                roleReq.write(roleData);
                roleReq.end();
            }
        });
    });

    req.on('error', (error) => {
        console.error('Error:', error.message);
    });

    req.write(data);
    req.end();
}

test();
