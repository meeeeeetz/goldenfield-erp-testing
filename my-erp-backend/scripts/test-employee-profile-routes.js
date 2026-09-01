require('dotenv').config();
const { Pool } = require('pg');
const EmployeeProfileController = require('../Controllers/main-human-resources-controller/employee-profile-controller');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const controller = new EmployeeProfileController(pool);

async function test() {
  try {
    console.log('Testing getAllProfiles...');
    const profiles = await controller.getAllProfiles();
    console.log('getAllProfiles succeeded, rows:', profiles.length);
  } catch (err) {
    console.error('getAllProfiles failed:', err.message);
    console.error('Stack:', err.stack);
  }

  try {
    console.log('Testing getNextEmployeeId...');
    const nextId = await controller.getNextEmployeeId();
    console.log('getNextEmployeeId succeeded:', nextId);
  } catch (err) {
    console.error('getNextEmployeeId failed:', err.message);
    console.error('Stack:', err.stack);
  }

  await pool.end();
}

test();
