const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
(async () => {
  const query = `
    SELECT eb.*, 
           u.email as created_by_email,
           ba.bank,
           ba.bank_account_number
    FROM electric_bills eb
    LEFT JOIN users u ON eb.created_by = u.id
    LEFT JOIN bank_accounts ba ON eb.payment_source = ba.bank_account_id
    WHERE eb.payment_source IS NOT NULL
    LIMIT 1
  `;
  const result = await pool.query(query);
  console.log(JSON.stringify(result.rows[0], null, 2));
  await pool.end();
})();
