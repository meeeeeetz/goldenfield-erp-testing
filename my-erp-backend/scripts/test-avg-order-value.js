const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function test() {
    const query = `
        SELECT COALESCE(AVG(ris.grand_total), 0) as avg_order_value
        FROM receipt_issue_summaries ris
        WHERE ris.status != 'Voided'
          AND ris.posted = TRUE
          AND EXTRACT(YEAR FROM ris.date) = EXTRACT(YEAR FROM CURRENT_DATE)
          AND EXTRACT(MONTH FROM ris.date) = EXTRACT(MONTH FROM CURRENT_DATE)
    `;

    const result = await pool.query(query);
    console.log('Avg order value:', result.rows[0]);
    pool.end();
}

test().catch(e => { console.error(e); pool.end(); });