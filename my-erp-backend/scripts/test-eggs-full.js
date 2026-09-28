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

    const curr = parseFloat(current.rows[0].total_eggs) || 0;
    const lst = parseFloat(last.rows[0].total_eggs) || 0;
    let pct = 0;
    let trend = 'neutral';

    if (lst > 0) {
        pct = ((curr - lst) / lst * 100);
        trend = pct >= 0 ? 'up' : 'down';
    } else if (curr > 0) {
        pct = 100;
        trend = 'up';
    }

    console.log('API Response:', { 
        current_month_eggs: curr, 
        last_month_eggs: lst, 
        percentage_difference: Math.abs(pct).toFixed(1), 
        trend 
    });
    pool.end();
}

test().catch(e => { console.error(e); pool.end(); });