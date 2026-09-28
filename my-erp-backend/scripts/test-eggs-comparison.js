const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function test() {
    const currentQuery = `
        SELECT COALESCE(SUM(ri.qty * pl.no_of_eggs), 0) as total_eggs
        FROM receipt_issues ri
        JOIN receipt_issue_summaries ris ON ri.si_number = ris.si_number
        LEFT JOIN product_list pl
            ON pl.product = TRIM(ri.product)
            OR pl.product = TRIM(SPLIT_PART(ri.product, ' - ', 1))
            OR TRIM(ri.product) LIKE pl.product || '%'
        WHERE ris.status != 'Voided'
          AND ris.posted = TRUE
          AND pl.no_of_eggs > 0
          AND EXTRACT(YEAR FROM ri.date) = EXTRACT(YEAR FROM CURRENT_DATE)
          AND EXTRACT(MONTH FROM ri.date) = EXTRACT(MONTH FROM CURRENT_DATE)
    `;

    const lastQuery = `
        SELECT COALESCE(SUM(ri.qty * pl.no_of_eggs), 0) as total_eggs
        FROM receipt_issues ri
        JOIN receipt_issue_summaries ris ON ri.si_number = ris.si_number
        LEFT JOIN product_list pl
            ON pl.product = TRIM(ri.product)
            OR pl.product = TRIM(SPLIT_PART(ri.product, ' - ', 1))
            OR TRIM(ri.product) LIKE pl.product || '%'
        WHERE ris.status != 'Voided'
          AND ris.posted = TRUE
          AND pl.no_of_eggs > 0
          AND ri.date >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1 MONTH')
          AND ri.date < DATE_TRUNC('MONTH', CURRENT_DATE)
    `;

    const current = await pool.query(currentQuery);
    const last = await pool.query(lastQuery);

    console.log('Current month eggs:', current.rows[0]);
    console.log('Last month eggs:', last.rows[0]);

    pool.end();
}

test().catch(e => { console.error(e); pool.end(); });