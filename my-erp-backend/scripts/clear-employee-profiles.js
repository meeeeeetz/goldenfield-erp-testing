require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function clearEmployeeProfiles() {
  try {
    const result = await pool.query('TRUNCATE TABLE employee_profile RESTART IDENTITY CASCADE');
    console.log('employee_profile table cleared successfully.');
  } catch (err) {
    console.error('Failed to clear employee_profile:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

clearEmployeeProfiles();
