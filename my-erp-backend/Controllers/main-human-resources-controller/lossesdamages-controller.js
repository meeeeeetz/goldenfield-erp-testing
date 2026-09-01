const pool = require('../../config/database');

class LossDamageController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllLossDamages() {
        const query = 'SELECT * FROM loss_damage ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getLossDamagesByEmployee(employeeId) {
        const query = 'SELECT * FROM loss_damage WHERE employee_id = $1 ORDER BY created_at DESC';
        const result = await this.db.query(query, [employeeId]);
        return result.rows;
    }

    async addLossDamage(lossDamageData) {
        const { employee_id, loss_damage_amount, reason, no_of_payroll_cycle, installment_amount } = lossDamageData;
        const query = `
            INSERT INTO loss_damage (employee_id, loss_damage_amount, reason, no_of_payroll_cycle, installment_amount)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const result = await this.db.query(query, [employee_id, loss_damage_amount, reason, no_of_payroll_cycle, installment_amount]);
        return result.rows[0];
    }

    async getNextLossDamageId() {
        const query = `SELECT nextval('loss_damage_seq') AS next_num`;
        const result = await this.db.query(query);
        const nextNum = result.rows[0]?.next_num;
        if (!nextNum) return null;
        return 'LoDaID-' + String(nextNum).padStart(9, '0');
    }

    async getPendingLossDamages() {
        const query = `
            SELECT 
                ld.lossdamage_id,
                ld.employee_id,
                ld.created_at,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                ld.reason,
                ld.loss_damage_amount as amount,
                ld.no_of_payroll_cycle,
                ld.installment_amount,
                COALESCE(ld.created_by, '') AS created_by,
                COALESCE(ld.status, 'Pending') AS status
            FROM loss_damage ld
            LEFT JOIN employee_profile ep ON ep.employee_id = ld.employee_id
            WHERE ld.status = 'unpaid'
            ORDER BY ld.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getAllLossDamages() {
        const query = `
            SELECT 
                ld.lossdamage_id,
                ld.employee_id,
                ld.created_at,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                ld.reason,
                ld.loss_damage_amount as amount,
                ld.no_of_payroll_cycle,
                ld.installment_amount,
                COALESCE(ld.created_by, '') AS created_by,
                COALESCE(ld.status, 'Pending') AS status
            FROM loss_damage ld
            LEFT JOIN employee_profile ep ON ep.employee_id = ld.employee_id
            ORDER BY ld.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getLossDamageHistoryWithRepayments() {
        const query = `
            SELECT 
                ld.lossdamage_id,
                lr.lossdamage_repayment_id,
                lr.payrollcycle_id,
                ld.employee_id,
                ld.created_at,
                lr.paid_at,
                COALESCE(ep.last_name, '') AS last_name,
                COALESCE(ep.first_name, '') AS first_name,
                ld.loss_damage_amount as amount,
                COALESCE(lr.amount_paid, 0) as amount_paid,
                ld.reason,
                ld.no_of_payroll_cycle,
                ld.installment_amount,
                COALESCE(ld.created_by, '') AS created_by,
                CASE 
                    WHEN ld.loss_damage_amount <= COALESCE(SUM(lr.amount_paid) OVER (PARTITION BY ld.lossdamage_id), 0) THEN 'Fully Paid'
                    ELSE COALESCE(ld.status, 'Pending')
                END AS status
            FROM loss_damage ld
            LEFT JOIN employee_profile ep ON ep.employee_id = ld.employee_id
            LEFT JOIN lossdamage_repayment lr ON lr.lossdamage_id = ld.lossdamage_id
            ORDER BY ld.created_at DESC, lr.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async approveLossDamage(lossDamageId) {
        const query = `
            UPDATE loss_damage
            SET status = 'Approved'
            WHERE lossdamage_id = $1 AND status IN ('Pending', 'unpaid')
            RETURNING *
        `;
        const result = await this.db.query(query, [lossDamageId]);
        return result.rows[0];
    }

    async rejectLossDamage(lossDamageId) {
        const query = `
            UPDATE loss_damage
            SET status = 'Rejected'
            WHERE lossdamage_id = $1 AND status IN ('Pending', 'unpaid')
            RETURNING *
        `;
        const result = await this.db.query(query, [lossDamageId]);
        return result.rows[0];
    }
}

module.exports = LossDamageController;
