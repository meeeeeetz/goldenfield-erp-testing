const pool = require('../../config/database');
const ExpenseController = require('../main-finance-controller/expense-controller');
const { getPublicUrl } = require('../../utils/gcs');

class ElectricBillController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllElectricBills() {
        const query = `
            SELECT eb.*, 
                   u.email as created_by_email,
                   ba.bank,
                   ba.bank_account_number
            FROM electric_bills eb
            LEFT JOIN users u ON eb.created_by = u.id
            LEFT JOIN bank_accounts ba ON eb.payment_source = ba.bank_account_id
            ORDER BY eb.date DESC, eb.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows.map(row => ({
            ...row,
            file_url: row.file_path ? getPublicUrl(row.file_path) : null
        }));
    }

    async getElectricBillById(id) {
        const query = `
            SELECT eb.*, u.email as created_by_email 
            FROM electric_bills eb
            LEFT JOIN users u ON eb.created_by = u.id
            WHERE eb.id = $1
        `;
        const result = await this.db.query(query, [id]);
        return result.rows[0];
    }

    async getElectricBillByCode(electricBillId) {
        const query = 'SELECT * FROM electric_bills WHERE electric_bill_id = $1';
        const result = await this.db.query(query, [electricBillId]);
        return result.rows[0];
    }

    async addElectricBill(billData, createdBy) {
        const { electric_bill_id, date, billing_start, billing_end, demand, kwh, rate_per_kwh, amount, status, payment_source, payment_date, file_path } = billData;
        
        console.log('addElectricBill received:', { electric_bill_id, date, billing_start, billing_end, demand, kwh, rate_per_kwh, amount, status, payment_source, payment_date, file_path });
        
        if (!date) {
            console.error('Date is missing or empty in billData');
            throw new Error('Date is required');
        }
        
        const finalDate = date || new Date().toISOString().split('T')[0];
        console.log('Using finalDate:', finalDate);
        const query = `
            INSERT INTO electric_bills 
            (electric_bill_id, date, billing_start, billing_end, demand, kwh, rate_per_kwh, amount, status, created_by, payment_source, payment_date, file_path) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            electric_bill_id,
            finalDate,
            billing_start,
            billing_end,
            demand || null,
            kwh || null,
            rate_per_kwh || null,
            amount,
            status || 'Pending',
            createdBy,
            payment_source || null,
            payment_date || null,
            file_path || null
        ]);

        try {
            const expenseController = new ExpenseController(pool);
            const nextExpenseId = await expenseController.getNextExpenseId();
            
            const description = `Electric Bill from ${billing_start} to ${billing_end}`;
            const remarks = `Total KWH used ${kwh || 0} at ${rate_per_kwh || 0}`;
            
            await expenseController.addExpense({
                expense_list_id: nextExpenseId,
                electric_bill_id: electric_bill_id,
                date: finalDate,
                accounting_code: '5130',
                expense_type: 'Direct Utilities & Energy',
                description: description,
                remarks: remarks,
                total_amount: amount,
                account_source: payment_source || null,
                cleared_date: payment_date || null,
                status: 'Pending'
            });
        } catch (expenseError) {
            console.error('Failed to create expense record:', expenseError);
        }

        return result.rows[0];
    }

    async updateElectricBill(electricBillId, billData) {
        const { date, billing_start, billing_end, demand, kwh, rate_per_kwh, amount, status, payment_date, payment_source, check_number, file_path } = billData;
        
        const updates = [];
        const values = [];
        let counter = 1;

        if (date !== undefined) { updates.push(`date = $${counter++}`); values.push(date); }
        if (billing_start !== undefined) { updates.push(`billing_start = $${counter++}`); values.push(billing_start); }
        if (billing_end !== undefined) { updates.push(`billing_end = $${counter++}`); values.push(billing_end); }
        if (demand !== undefined) { updates.push(`demand = $${counter++}`); values.push(demand || null); }
        if (kwh !== undefined) { updates.push(`kwh = $${counter++}`); values.push(kwh || null); }
        if (rate_per_kwh !== undefined) { updates.push(`rate_per_kwh = $${counter++}`); values.push(rate_per_kwh || null); }
        if (amount !== undefined) { updates.push(`amount = $${counter++}`); values.push(amount); }
        if (status !== undefined) { updates.push(`status = $${counter++}`); values.push(status); }
        if (payment_date !== undefined) { updates.push(`payment_date = $${counter++}`); values.push(payment_date || null); }
        if (payment_source !== undefined) { updates.push(`payment_source = $${counter++}`); values.push(payment_source || null); }
        if (check_number !== undefined) { updates.push(`check_number = $${counter++}`); values.push(check_number || null); }
        if (file_path !== undefined) { updates.push(`file_path = $${counter++}`); values.push(file_path || null); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(electricBillId);

        const query = `
            UPDATE electric_bills 
            SET ${updates.join(', ')}
            WHERE electric_bill_id = $${counter}
            RETURNING *
        `;
        
        const result = await this.db.query(query, values);

        const updatedBill = result.rows[0];
        
        if (updatedBill) {
            const expenseResult = await this.db.query('SELECT id FROM expenses WHERE tracking_id = $1', [electricBillId]);
            if (expenseResult.rows.length > 0) {
                const expenseId = expenseResult.rows[0].id;
                const expenseStatus = payment_date && payment_source ? 'Paid' : 'Pending';
                
                await this.db.query(
                    `UPDATE expenses 
                    SET account_source = $1, cleared_date = $2, status = $3, updated_at = CURRENT_TIMESTAMP 
                    WHERE id = $4`,
                    [
                        payment_source || null,
                        payment_date || null,
                        expenseStatus,
                        expenseId
                    ]
                );
            }
        }

        return updatedBill;
    }

    async deleteElectricBill(id) {
        const query = 'DELETE FROM electric_bills WHERE id = $1';
        const result = await this.db.query(query, [id]);
        return result.rowCount > 0;
    }

    async getNextElectricBillId() {
        const query = "SELECT MAX(CAST(SUBSTRING(electric_bill_id FROM '\\d+') AS INTEGER)) as max_num FROM electric_bills";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'ElBiID-' + (maxNum + 1);
    }

    async getChartData() {
        const currentYearResult = await this.db.query("SELECT EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER as current_year");
        const currentYear = currentYearResult.rows[0].current_year;
        const years = [currentYear - 2, currentYear - 1, currentYear];

        const monthlyQuery = `
            SELECT 
                EXTRACT(YEAR FROM date)::INTEGER as year,
                EXTRACT(MONTH FROM date)::INTEGER as month,
                COALESCE(SUM(kwh), 0) as total_kwh,
                COALESCE(SUM(amount), 0) as total_amount
            FROM electric_bills
            WHERE date IS NOT NULL
            GROUP BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date)
            ORDER BY year, month
        `;
        const monthlyResult = await this.db.query(monthlyQuery);

        const kwh = {};
        const amount = {};
        
        years.forEach(year => {
            kwh[year] = {};
            amount[year] = {};
            for (let month = 1; month <= 12; month++) {
                kwh[year][month] = 0;
                amount[year][month] = 0;
            }
        });

        monthlyResult.rows.forEach(row => {
            const year = row.year;
            const month = row.month;
            if (kwh[year] && month >= 1 && month <= 12) {
                kwh[year][month] = parseFloat(row.total_kwh) || 0;
                amount[year][month] = parseFloat(row.total_amount) || 0;
            }
        });

        return { years, kwh, amount };
    }

    async getLatestMonthComparison() {
        const query = `
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
        `;
        const result = await this.db.query(query);

        if (result.rows.length < 2) {
            return {
                latest: { kwh: 0, amount: 0, month: null },
                previous: { kwh: 0, amount: 0, month: null },
                kwhChange: 0,
                amountChange: 0,
                kwhTrend: 'neutral',
                amountTrend: 'neutral'
            };
        }

        const previous = result.rows[0];
        const latest = result.rows[1];

        const kwhChange = previous.total_kwh > 0 ? ((latest.total_kwh - previous.total_kwh) / previous.total_kwh) * 100 : 0;
        const amountChange = previous.total_amount > 0 ? ((latest.total_amount - previous.total_amount) / previous.total_amount) * 100 : 0;

        return {
            latest: {
                kwh: parseFloat(latest.total_kwh) || 0,
                amount: parseFloat(latest.total_amount) || 0,
                month: latest.month_start
            },
            previous: {
                kwh: parseFloat(previous.total_kwh) || 0,
                amount: parseFloat(previous.total_amount) || 0,
                month: previous.month_start
            },
            kwhChange: Math.round(kwhChange * 100) / 100,
            amountChange: Math.round(amountChange * 100) / 100,
            kwhTrend: latest.total_kwh >= previous.total_kwh ? 'up' : 'down',
            amountTrend: latest.total_amount >= previous.total_amount ? 'up' : 'down'
        };
    }
}

module.exports = ElectricBillController;
