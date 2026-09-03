class EmployeeCompensationController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllCompensations() {
        const query = 'SELECT * FROM employee_compensation ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getCompensationByEmployeeId(employeeId) {
        const query = 'SELECT * FROM employee_compensation WHERE employee_id = $1 ORDER BY compensation_id DESC LIMIT 1';
        const result = await this.db.query(query, [employeeId]);
        return result.rows[0];
    }

    async getCompensationById(compensationId) {
        const query = 'SELECT * FROM employee_compensation WHERE compensation_id = $1';
        const result = await this.db.query(query, [compensationId]);
        return result.rows[0];
    }

    async addCompensation(compensationData) {
        const { compensation_id, employee_id, salary_pay_mode, salary_amount, allowance_pay_mode, allowance_amount, pay_frequency, payout_method, department, role, sss_contribution_mode, sss_contribution_amount, sss_loan_payment_mode, sss_loan_amount, philhealth_contribution_mode, philhealth_contribution_amount, pagibig_contribution_mode, pagibig_contribution_amount, pagibig_loan_payment_mode, pagibig_loan_amount, shift_policy, yearly_sick_leave, yearly_vacation_leave } = compensationData;
        const query = `
            INSERT INTO employee_compensation
            (compensation_id, employee_id, salary_pay_mode, salary_amount, allowance_pay_mode, allowance_amount, pay_frequency, payout_method, department, role, sss_contribution_mode, sss_contribution_amount, sss_loan_payment_mode, sss_loan_amount, philhealth_contribution_mode, philhealth_contribution_amount, pagibig_contribution_mode, pagibig_contribution_amount, pagibig_loan_payment_mode, pagibig_loan_amount, shift_policy, yearly_sick_leave, yearly_vacation_leave)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            compensation_id,
            employee_id,
            salary_pay_mode || null,
            salary_amount || null,
            allowance_pay_mode || null,
            allowance_amount || null,
            pay_frequency,
            payout_method,
            department || null,
            role || null,
            sss_contribution_mode || null,
            sss_contribution_amount || null,
            sss_loan_payment_mode || null,
            sss_loan_amount || null,
            philhealth_contribution_mode || null,
            philhealth_contribution_amount || null,
            pagibig_contribution_mode || null,
            pagibig_contribution_amount || null,
            pagibig_loan_payment_mode || null,
            pagibig_loan_amount || null,
            shift_policy || null,
            yearly_sick_leave || null,
            yearly_vacation_leave || null
        ]);

        if (result.rows[0] && department) {
            await this.db.query(
                `UPDATE employee_profile SET department = $1, updated_at = CURRENT_TIMESTAMP WHERE employee_id = $2`,
                [department, employee_id]
            );
        }

        return result.rows[0];
    }

    async updateCompensation(compensationId, compensationData) {
        const allowedFields = [
            'employee_id', 'salary_pay_mode', 'salary_amount', 'allowance_pay_mode', 'allowance_amount',
            'pay_frequency', 'payout_method', 'department', 'role',
            'sss_contribution_mode', 'sss_contribution_amount', 'sss_loan_payment_mode', 'sss_loan_amount',
            'philhealth_contribution_mode', 'philhealth_contribution_amount',
            'pagibig_contribution_mode', 'pagibig_contribution_amount', 'pagibig_loan_payment_mode', 'pagibig_loan_amount',
            'shift_policy', 'yearly_sick_leave', 'yearly_vacation_leave'
        ];
        const updates = [];
        const values = [compensationId];
        let index = 2;
        allowedFields.forEach(field => {
            if (compensationData[field] !== undefined && compensationData[field] !== null && compensationData[field] !== '') {
                updates.push(`${field} = $${index}`);
                values.push(compensationData[field]);
                index++;
            }
        });
        if (updates.length === 0) {
            return await this.getCompensationById(compensationId);
        }
        updates.push('updated_at = CURRENT_TIMESTAMP');
        const query = `UPDATE employee_compensation SET ${updates.join(', ')} WHERE compensation_id = $1 RETURNING *`;
        const result = await this.db.query(query, values);

        if (result.rows[0] && compensationData.department) {
            const employeeId = compensationData.employee_id || result.rows[0].employee_id;
            await this.db.query(
                `UPDATE employee_profile SET department = $1, updated_at = CURRENT_TIMESTAMP WHERE employee_id = $2`,
                [compensationData.department, employeeId]
            );
        }

        return result.rows[0];
    }

    async deleteCompensation(compensationId) {
        const query = 'DELETE FROM employee_compensation WHERE compensation_id = $1';
        const result = await this.db.query(query, [compensationId]);
        return result;
    }

    async getNextCompensationId() {
        const query = 'SELECT compensation_id FROM employee_compensation ORDER BY compensation_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].compensation_id;
            const match = lastId.match(/EmpComp-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'EmpComp-' + String(nextNum).padStart(4, '0');
            }
        }
        return 'EmpComp-0001';
    }

    async syncDepartmentToProfile(employeeId) {
        const query = `
            UPDATE employee_profile ep
            SET department = ec.department, updated_at = CURRENT_TIMESTAMP
            FROM (
                SELECT employee_id, department
                FROM employee_compensation
                WHERE employee_id = $1 AND department IS NOT NULL AND department <> ''
                ORDER BY updated_at DESC, created_at DESC
                LIMIT 1
            ) ec
            WHERE ep.employee_id = ec.employee_id
            RETURNING ep.employee_id, ep.department
        `;
        const result = await this.db.query(query, [employeeId]);
        return result.rows[0] || null;
    }

    async bulkUploadCompensation(rows) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            for (const row of rows) {
                const errors = [];
                if (!row.employee_id) errors.push('employee_id is required');
                if (!row.salary_pay_mode) errors.push('salary_pay_mode is required');
                if (row.salary_amount === undefined || row.salary_amount === null || row.salary_amount === '') errors.push('salary_amount is required');
                if (errors.length > 0) {
                    throw new Error(`Validation error for row ${row._row || 'unknown'}: ${errors.join(', ')}`);
                }

                const compensationId = row.compensation_id && String(row.compensation_id).trim() !== '' ? String(row.compensation_id).trim() : null;
                const salaryAmount = Number(row.salary_amount);
                if (isNaN(salaryAmount) || salaryAmount < 0) {
                    throw new Error(`Invalid salary_amount for row ${row._row || 'unknown'}: ${row.salary_amount}`);
                }

                const values = [
                    compensationId,
                    String(row.employee_id).trim(),
                    String(row.salary_pay_mode).trim() || null,
                    salaryAmount,
                    row.allowance_pay_mode && String(row.allowance_pay_mode).trim() !== '' ? String(row.allowance_pay_mode).trim() : null,
                    row.allowance_amount !== undefined && row.allowance_amount !== null && row.allowance_amount !== '' ? Number(row.allowance_amount) : null,
                    row.pay_frequency && String(row.pay_frequency).trim() !== '' ? String(row.pay_frequency).trim() : null,
                    row.payout_method && String(row.payout_method).trim() !== '' ? String(row.payout_method).trim() : null,
                    row.department && String(row.department).trim() !== '' ? String(row.department).trim() : null,
                    row.role && String(row.role).trim() !== '' ? String(row.role).trim() : null,
                    row.yearly_sick_leave !== undefined && row.yearly_sick_leave !== null && row.yearly_sick_leave !== '' ? Number(row.yearly_sick_leave) : null,
                    row.yearly_vacation_leave !== undefined && row.yearly_vacation_leave !== null && row.yearly_vacation_leave !== '' ? Number(row.yearly_vacation_leave) : null,
                    row.created_at && String(row.created_at).trim() !== '' ? String(row.created_at).trim() : new Date().toISOString(),
                    row.updated_at && String(row.updated_at).trim() !== '' ? String(row.updated_at).trim() : new Date().toISOString(),
                    row.sss_contribution_amount !== undefined && row.sss_contribution_amount !== null && row.sss_contribution_amount !== '' ? Number(row.sss_contribution_amount) : null,
                    row.sss_loan_payment_mode && String(row.sss_loan_payment_mode).trim() !== '' ? String(row.sss_loan_payment_mode).trim() : null,
                    row.sss_loan_amount !== undefined && row.sss_loan_amount !== null && row.sss_loan_amount !== '' ? Number(row.sss_loan_amount) : null,
                    row.philhealth_contribution_mode && String(row.philhealth_contribution_mode).trim() !== '' ? String(row.philhealth_contribution_mode).trim() : null,
                    row.philhealth_contribution_amount !== undefined && row.philhealth_contribution_amount !== null && row.philhealth_contribution_amount !== '' ? Number(row.philhealth_contribution_amount) : null,
                    row.pagibig_contribution_mode && String(row.pagibig_contribution_mode).trim() !== '' ? String(row.pagibig_contribution_mode).trim() : null,
                    row.pagibig_contribution_amount !== undefined && row.pagibig_contribution_amount !== null && row.pagibig_contribution_amount !== '' ? Number(row.pagibig_contribution_amount) : null,
                    row.pagibig_loan_payment_mode && String(row.pagibig_loan_payment_mode).trim() !== '' ? String(row.pagibig_loan_payment_mode).trim() : null,
                    row.pagibig_loan_amount !== undefined && row.pagibig_loan_amount !== null && row.pagibig_loan_amount !== '' ? Number(row.pagibig_loan_amount) : null,
                    row.sss_contribution_mode && String(row.sss_contribution_mode).trim() !== '' ? String(row.sss_contribution_mode).trim() : null,
                    row.shift_policy && String(row.shift_policy).trim() !== '' ? String(row.shift_policy).trim() : null
                ];

                const query = `
                    INSERT INTO employee_compensation
                    (compensation_id, employee_id, salary_pay_mode, salary_amount, allowance_pay_mode, allowance_amount, pay_frequency, payout_method, department, role, yearly_sick_leave, yearly_vacation_leave, created_at, updated_at, sss_contribution_amount, sss_loan_payment_mode, sss_loan_amount, philhealth_contribution_mode, philhealth_contribution_amount, pagibig_contribution_mode, pagibig_contribution_amount, pagibig_loan_payment_mode, pagibig_loan_amount, sss_contribution_mode, shift_policy)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
                    RETURNING compensation_id
                `;
                await client.query(query, values);
            }

            await client.query('COMMIT');
            return { success: true, inserted: rows.length };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async syncAllDepartmentsToProfile() {
        const query = `
            UPDATE employee_profile ep
            SET department = ec.department, updated_at = CURRENT_TIMESTAMP
            FROM (
                SELECT DISTINCT ON (employee_id) employee_id, department
                FROM employee_compensation
                WHERE department IS NOT NULL AND department <> ''
                ORDER BY employee_id, updated_at DESC, created_at DESC
            ) ec
            WHERE ep.employee_id = ec.employee_id
            RETURNING ep.employee_id, ep.department
        `;
        const result = await this.db.query(query);
        return result.rows;
    }
}

module.exports = EmployeeCompensationController;
