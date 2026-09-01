const http = require('http');

const postData = JSON.stringify({
  employee_id: 'GefiEmp-00001',
  last_name: 'TEE',
  first_name: 'METZELER',
  middle_name: 'LEXUZ',
  address: 'ALVARADO ST',
  contact_details: '+63 123-123-1231',
  birthdate: '1993-01-11',
  gender: 'Male',
  civil_status: 'Single',
  emergency_contact: 'Evelyn',
  emergency_contact_number: '+63 917-841-8225'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/employee-profiles',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', data);
  });
});

req.on('error', (err) => {
  console.error('Request failed:', err.message);
});

req.write(postData);
req.end();
