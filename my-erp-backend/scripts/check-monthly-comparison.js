const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function checkMonthlyComparison() {
    try {
        const result = await pool.query(`
            WITH monthly_data AS (
                SELECT 
                    DATE_TRUNC('month', date)::DATE as month_start,
                    COALESCE(SUM(kwh), 0) as total_kwh,
                    COALESCE(SUM(amount), 0) as total_amount
                FROM electric_bills
                WHERE date IS NOT NULL
                GROUP BY DATE_TRUNC('month', date)
                ORDER BY month_start DESC
                LIMIT 2
            )
            SELECT * FROM monthly_data ORDER BY month_start ASC
        `);
        
        console.log('Monthly comparison data:', JSON.stringify(result.rows, null, 2));
        
        if (result.rows.length === 2) {
            const previous = result.rows[0];
            const latest = result.rows[1];
            
            const kwhChange = previous.total_kwh > 0 ? ((latest.total_kwh - previous.total_kwh) / previous.total_kwh) * 100 : 0;
            const amountChange = previous.total_amount > 0 ? ((latest.total_amount - previous.total_amount) / previous.total_amount) * 100 : 0;
            
            console.log('\nCalculated changes:');
            console.log(`KWH: ${previous.total_kwh} -> ${latest.total_kwh} = ${kwhChange.toFixed(2)}%`);
            console.log(`Amount: ${previous.total_amount} -> ${latest.total_amount} = ${amountChange.toFixed(2)}%`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkMonthlyComparison();
