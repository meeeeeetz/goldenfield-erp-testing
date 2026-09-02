const pool = require('../../config/database');

class CashAdvanceController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllCashAdvances() {
        const query = 'SELECT * FROM cash_advance ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getCashAdvancesByEmployee(employeeId) {
        const query = 'SELECT * FROM cash_advance WHERE employee_id = $1 ORDER BY created_at DESC';
        const result = await this.db.query(query, [employeeId]);
        return result.rows;
    }

    async addCashAdvance(cashAdvanceData) {
        const { employee_id, ca_amount, reason, no_of_payroll_cycle, installment_amount } = cashAdvanceData;
        const query = `
            INSERT INTO cash_advance (employee_id, ca_amount, reason, no_of_payroll_cycle, installment_amount)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const result = await this.db.query(query, [employee_id, ca_amount, reason, no_of_payroll_cycle, installment_amount]);
        return result.rows[0];
    }

    async getOutstandingCashAdvance(employeeId) {
        const totalQuery = `
            SELECT COALESCE(SUM(ca_amount), 0) AS total_ca_amount
            FROM cash_advance
            WHERE employee_id = $1
        `;
        const totalResult = await this.db.query(totalQuery, [employeeId]);
        const totalCaAmount = Number(totalResult.rows[0]?.total_ca_amount) || 0;

        const paidQuery = `
            SELECT COALESCE(SUM(car.amount_paid), 0) AS total_paid
            FROM cash_advance_repayment car
            JOIN cash_advance ca ON ca.cashadvance_id = car.cashadvance_id
            WHERE ca.employee_id = $1
        `;
        const paidResult = await this.db.query(paidQuery, [employeeId]);
        const totalPaid = Number(paidResult.rows[0]?.total_paid) || 0;

        const outstanding = totalCaAmount - totalPaid;
        return { outstanding: parseFloat(outstanding.toFixed(2)) };
    }

    async getTotalUnrecoveredDebt() {
        const totalQuery = `
            SELECT COALESCE(SUM(ca_amount), 0) AS total_ca_amount
            FROM cash_advance
        `;
        const totalResult = await this.db.query(totalQuery);
        const totalCaAmount = Number(totalResult.rows[0]?.total_ca_amount) || 0;

        const paidQuery = `
            SELECT COALESCE(SUM(amount_paid), 0) AS total_paid
            FROM cash_advance_repayment
        `;
        const paidResult = await this.db.query(paidQuery);
        const totalPaid = Number(paidResult.rows[0]?.total_paid) || 0;

        const unrecovered = totalCaAmount - totalPaid;
        return { unrecovered: parseFloat(unrecovered.toFixed(2)) };
    }

    async getPendingCashAdvances() {
        const query = `
            SELECT 
                ca.cashadvance_id,
                ca.employee_id,
                ca.created_at,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                ca.reason,
                ca.ca_amount as amount,
                ca.no_of_payroll_cycle,
                ca.installment_amount,
                COALESCE(ca.created_by, '') AS created_by,
                COALESCE(ca.status, 'unpaid') AS status
            FROM cash_advance ca
            LEFT JOIN employee_profile ep ON ep.employee_id = ca.employee_id
            WHERE ca.status = 'unpaid'
            ORDER BY ca.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getCashAdvanceHistoryWithRepayments() {
        const query = `
            SELECT 
                ca.cashadvance_id,
                car.cashadvance_repayment_id,
                car.payroll_cycle_id,
                ca.employee_id,
                ca.created_at,
                car.paid_at,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                ca.ca_amount as amount,
                COALESCE(car.amount_paid, 0) as amount_paid,
                ca.reason,
                ca.no_of_payroll_cycle,
                ca.installment_amount,
                COALESCE(ca.created_by, '') AS created_by,
                CASE 
                    WHEN ca.ca_amount <= COALESCE(SUM(car.amount_paid) OVER (PARTITION BY ca.cashadvance_id), 0) THEN 'Fully Paid'
                    ELSE COALESCE(ca.status, 'unpaid')
                END AS status
            FROM cash_advance ca
            LEFT JOIN employee_profile ep ON ep.employee_id = ca.employee_id
            LEFT JOIN cash_advance_repayment car ON car.cashadvance_id = ca.cashadvance_id
            ORDER BY ca.created_at DESC, car.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async approveCashAdvance(cashAdvanceId) {
        const query = `
            UPDATE cash_advance
            SET status = 'Approved'
            WHERE cashadvance_id = $1 AND status IN ('Pending', 'unpaid')
            RETURNING *
        `;
        const result = await this.db.query(query, [cashAdvanceId]);
        return result.rows[0];
    }

    async rejectCashAdvance(cashAdvanceId) {
        const query = `
            UPDATE cash_advance
            SET status = 'Rejected'
            WHERE cashadvance_id = $1 AND status IN ('Pending', 'unpaid', 'Approved')
            RETURNING *
        `;
        const result = await this.db.query(query, [cashAdvanceId]);
        return result.rows[0];
    }

    async deleteCashAdvance(cashAdvanceId) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');
            await client.query('DELETE FROM cash_advance_repayment WHERE cashadvance_id = $1', [cashAdvanceId]);
            await client.query('DELETE FROM cash_advance WHERE cashadvance_id = $1', [cashAdvanceId]);
            await client.query('COMMIT');
            return { success: true };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = CashAdvanceController;
