const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function test() {
    // Test the sales comparison query
    const currentQuery = `
        SELECT COALESCE(SUM(actual_total), 0) as total_sales
        FROM (
            SELECT si_number, SUM(total) as actual_total, MAX(date) as date
            FROM receipt_issues
            GROUP BY si_number
        ) sub
        JOIN receipt_issue_summaries ris ON sub.si_number = ris.si_number
        WHERE ris.status != 'Voided'
          AND ris.posted = TRUE
          AND EXTRACT(YEAR FROM sub.date) = EXTRACT(YEAR FROM CURRENT_DATE)
          AND EXTRACT(MONTH FROM sub.date) = EXTRACT(MONTH FROM CURRENT_DATE)
    `;

    const lastQuery = `
        SELECT COALESCE(SUM(actual_total), 0) as total_sales
        FROM (
            SELECT si_number, SUM(total) as actual_total, MAX(date) as date
            FROM receipt_issues
            GROUP BY si_number
        ) sub
        JOIN receipt_issue_summaries ris ON sub.si_number = ris.si_number
        WHERE ris.status != 'Voided'
          AND ris.posted = TRUE
          AND sub.date >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1 MONTH')
          AND sub.date < DATE_TRUNC('MONTH', CURRENT_DATE)
    `;

    const current = await pool.query(currentQuery);
    const last = await pool.query(lastQuery);

    console.log('Current month:', current.rows[0]);
    console.log('Last month:', last.rows[0]);

    const curr = parseFloat(current.rows[0].total_sales) || 0;
    const lst = parseFloat(last.rows[0].total_sales) || 0;
    let pct = 0;
    let trend = 'neutral';

    if (lst > 0) {
        pct = ((curr - lst) / lst * 100);
        trend = pct >= 0 ? 'up' : 'down';
    } else if (curr > 0) {
        pct = 100;
        trend = 'up';
    }

    console.log('Comparison:', { current: curr, last: lst, pct: Math.abs(pct).toFixed(1), trend });
    pool.end();
}

test().catch(e => { console.error(e); pool.end(); });