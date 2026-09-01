const pool = require('../../config/database');

class SalaryComputationController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async searchEmployees(query) {
        const term = `%${query}%`;
        const sql = `
            SELECT employee_id, last_name, first_name, middle_name
            FROM employee_profile
            WHERE employee_id ILIKE $1
               OR last_name ILIKE $1
               OR first_name ILIKE $1
               OR middle_name ILIKE $1
            ORDER BY created_at DESC
            LIMIT 20
        `;
        const result = await this.db.query(sql, [term]);
        return result.rows;
    }

    async getAttendanceTotals(employeeId, dateFrom, dateTo) {
        const query = `
            SELECT 
                COALESCE(SUM(actual_payable_hours), 0) AS total_payable_hours
            FROM attendance_log
            WHERE employee_id = $1
              AND date BETWEEN $2 AND $3
              AND status = 'Approved'
        `;
        const result = await this.db.query(query, [employeeId, dateFrom, dateTo]);
        return result.rows[0] || { total_payable_hours: 0 };
    }

    async getOvertimeTotals(employeeId, dateFrom, dateTo) {
        const query = `
            SELECT 
                COALESCE(SUM(total_hours), 0) AS total_overtime_hours
            FROM overtime_log
            WHERE employee_id = $1
              AND date BETWEEN $2 AND $3
              AND status = 'Approved'
        `;
        const result = await this.db.query(query, [employeeId, dateFrom, dateTo]);
        return result.rows[0] || { total_overtime_hours: 0 };
    }

    async getLeaveTotals(employeeId, dateFrom, dateTo) {
        const query = `
            SELECT 
                COALESCE(SUM(total_days), 0) AS total_leaves_usage
            FROM leave_log
            WHERE employee_id = $1
              AND date BETWEEN $2 AND $3
              AND status = 'Approved'
        `;
        const result = await this.db.query(query, [employeeId, dateFrom, dateTo]);
        return result.rows[0] || { total_leaves_usage: 0 };
    }

    async getLatestCompensation(employeeId) {
        const query = `
            SELECT salary_amount, allowance_amount, salary_pay_mode, allowance_pay_mode, pay_frequency, sss_contribution_amount, sss_loan_amount, philhealth_contribution_amount, pagibig_contribution_amount, pagibig_loan_amount
            FROM employee_compensation
            WHERE employee_id = $1
            ORDER BY created_at DESC
            LIMIT 1
        `;
        const result = await this.db.query(query, [employeeId]);
        return result.rows[0] || {};
    }

    async getPerJobAttendanceCount(employeeId, dateFrom, dateTo) {
        const query = `
            SELECT COUNT(*) AS per_job_days
            FROM attendance_log
            WHERE employee_id = $1
              AND date BETWEEN $2 AND $3
              AND status = 'Approved'
        `;
        const result = await this.db.query(query, [employeeId, dateFrom, dateTo]);
        return result.rows[0] || { per_job_days: 0 };
    }

    async getTotalCashLoanDeductions(employeeId) {
        const cashAdvancesResult = await this.db.query(
            `SELECT ca.cashadvance_id, ca.ca_amount, ca.installment_amount,
                    COALESCE(SUM(car.amount_paid), 0) AS total_repaid
             FROM cash_advance ca
             LEFT JOIN cash_advance_repayment car ON car.cashadvance_id = ca.cashadvance_id
             WHERE ca.employee_id = $1 AND ca.status = 'Approved'
             GROUP BY ca.cashadvance_id, ca.ca_amount, ca.installment_amount
             HAVING (ca.ca_amount - COALESCE(SUM(car.amount_paid), 0)) > 0`,
            [employeeId]
        );
        const cashAdvances = cashAdvancesResult.rows;

        let totalCashLoanDeductions = 0;
        let totalRepaid = 0;
        let totalCaAmount = 0;

        for (const ca of cashAdvances) {
            totalCaAmount += Number(ca.ca_amount);
            totalRepaid += Number(ca.total_repaid);
            const remainingBalance = Number(ca.ca_amount) - Number(ca.total_repaid);
            const installment = Number(ca.installment_amount);
            totalCashLoanDeductions += Math.min(installment, remainingBalance);
        }

        const endingCashLoan = totalCaAmount - totalRepaid - totalCashLoanDeductions;

        return {
            starting_cash_loan: parseFloat(totalCaAmount.toFixed(2)),
            total_cash_loan_deductions: parseFloat(totalCashLoanDeductions.toFixed(2)),
            ending_cash_loan: parseFloat(Math.max(endingCashLoan, 0).toFixed(2))
        };
    }

    async getTotalLossesDamages(employeeId) {
        const query = `
            SELECT 
                COALESCE(SUM(loss_damage_amount), 0) AS starting_losses,
                COALESCE(SUM(COALESCE(total_paid, 0)), 0) AS total_deductions,
                COALESCE(SUM(GREATEST(loss_damage_amount - COALESCE(total_paid, 0), 0)), 0) AS ending_losses
            FROM loss_damage ld
            LEFT JOIN (
                SELECT lossdamage_id, SUM(amount_paid) AS total_paid
                FROM lossdamage_repayment
                GROUP BY lossdamage_id
            ) lr ON lr.lossdamage_id = ld.lossdamage_id
            WHERE ld.employee_id = $1
              AND ld.status IN ('unpaid', 'Approved')
              AND (ld.loss_damage_amount - COALESCE(lr.total_paid, 0)) > 0
        `;
        const result = await this.db.query(query, [employeeId]);
        const row = result.rows[0] || {};
        return {
            starting_losses: parseFloat(Number(row.starting_losses).toFixed(2)),
            total_losses_deductions: parseFloat(Number(row.total_deductions).toFixed(2)),
            ending_losses: parseFloat(Number(row.ending_losses).toFixed(2))
        };
    }

    async getOutstandingLossesDamages(employeeId) {
        const query = `
            SELECT COALESCE(SUM(loss_damage_amount), 0) AS outstanding
            FROM loss_damage
            WHERE employee_id = $1 AND status IN ('unpaid', 'Approved')
        `;
        const result = await this.db.query(query, [employeeId]);
        const outstanding = Number(result.rows[0]?.outstanding) || 0;
        return { outstanding: parseFloat(outstanding.toFixed(2)) };
    }

    async getSalaryTotals(employeeId, dateFrom, dateTo) {
        const attendance = await this.getAttendanceTotals(employeeId, dateFrom, dateTo);
        const overtime = await this.getOvertimeTotals(employeeId, dateFrom, dateTo);
        const leaves = await this.getLeaveTotals(employeeId, dateFrom, dateTo);
        const compensation = await this.getLatestCompensation(employeeId);
        const cashLoanDeductions = await this.getTotalCashLoanDeductions(employeeId);
        const lossesDamages = await this.getTotalLossesDamages(employeeId);
        const perJobAttendance = await this.getPerJobAttendanceCount(employeeId, dateFrom, dateTo);

        const salaryAmount = Number(compensation.salary_amount) || 0;
        const allowanceAmount = Number(compensation.allowance_amount) || 0;
        const payFrequency = compensation.pay_frequency || '';
        const salaryPayMode = compensation.salary_pay_mode || '';

        const totalHours = Number(attendance.total_payable_hours) || 0;
        const totalOvertimeHours = Number(overtime.total_overtime_hours) || 0;
        const totalLeavesUsage = Number(leaves.total_leaves_usage) || 0;
        const perJobDays = salaryPayMode === 'Per Job' ? (Number(perJobAttendance.per_job_days) || 0) : 0;

        const totalDaysWorkedAmount = (totalHours / 8) * salaryAmount;
        const totalOvertimeAmount = totalOvertimeHours * (salaryAmount / 8 * 1.25);
        const totalAllowanceAmount = (totalHours / 8) * allowanceAmount;
        const totalLeavesAmount = totalLeavesUsage * salaryAmount;
        const perJobAmount = salaryPayMode === 'Per Job' ? (perJobDays * salaryAmount) : 0;

        let regularHolidayAmount = 0;
        let specialHolidayAmount = 0;

        try {
            const holidayQuery = `
                SELECT type_of_holiday, COUNT(*) as count
                FROM holiday
                WHERE date_of_holiday BETWEEN $1 AND $2
                GROUP BY type_of_holiday
            `;
            const holidayResult = await this.db.query(holidayQuery, [dateFrom, dateTo]);
            const dailyRate = salaryAmount;

            holidayResult.rows.forEach(row => {
                const count = Number(row.count) || 0;
                if (row.type_of_holiday === 'Regular Holiday') {
                    regularHolidayAmount = count * dailyRate;
                } else if (row.type_of_holiday === 'Special Holiday') {
                    specialHolidayAmount = count * dailyRate * 0.3;
                }
            });
        } catch (err) {
            console.error('Holiday calculation error:', err);
        }

        const showContributions = this.shouldShowContribution(payFrequency, dateFrom, dateTo);
        const sssPayment = showContributions ? (Number(compensation.sss_contribution_amount) || 0) : 0;
        const sssLoanPayment = showContributions ? (Number(compensation.sss_loan_amount) || 0) : 0;
        const philhealthPayment = showContributions ? (Number(compensation.philhealth_contribution_amount) || 0) : 0;
        const pagibigPayment = showContributions ? (Number(compensation.pagibig_contribution_amount) || 0) : 0;
        const pagibigLoanPayment = showContributions ? (Number(compensation.pagibig_loan_amount) || 0) : 0;

        const baseAmount = salaryPayMode === 'Per Job' ? perJobAmount : totalDaysWorkedAmount;

        return {
            total_days_worked: parseFloat(totalDaysWorkedAmount.toFixed(2)),
            total_allowance: parseFloat(totalAllowanceAmount.toFixed(2)),
            total_overtime: parseFloat(totalOvertimeAmount.toFixed(2)),
            total_leaves: parseFloat(totalLeavesAmount.toFixed(2)),
            regular_holiday: parseFloat(regularHolidayAmount.toFixed(2)),
            special_holiday: parseFloat(specialHolidayAmount.toFixed(2)),
            total_income_tax: 0,
            total_sss_payment: sssPayment,
            total_sss_loan_payment: sssLoanPayment,
            total_philhealth_payment: philhealthPayment,
            total_pagibig_payment: pagibigPayment,
            total_pagibig_loan_payment: pagibigLoanPayment,
            total_cash_loan_deductions: Number(cashLoanDeductions.total_cash_loan_deductions) || 0,
            starting_losses: Number(lossesDamages.starting_losses) || 0,
            total_losses_deductions: Number(lossesDamages.total_losses_deductions) || 0,
            ending_losses: Number(lossesDamages.ending_losses) || 0,
            per_job_days: perJobDays,
            per_job_amount: parseFloat(perJobAmount.toFixed(2)),
            salary_pay_mode: salaryPayMode,
            base_amount: parseFloat(baseAmount.toFixed(2))
        };
    }

    shouldShowContribution(payFrequency, dateFrom, dateTo) {
        if (!payFrequency || !dateFrom || !dateTo) return false;

        const from = new Date(dateFrom);
        const to = new Date(dateTo);

        if (payFrequency === 'Semi monthly') {
            let current = new Date(from);
            while (current <= to) {
                const year = current.getFullYear();
                const month = current.getMonth();
                
                const period1Start = new Date(year, month, 1);
                const period1End = new Date(year, month, 15);
                
                const period2Start = new Date(year, month, 16);
                const period2End = new Date(year, month + 1, 0);
                
                const overlapsPeriod1 = from <= period1End && to >= period1Start;
                const overlapsPeriod2 = from <= period2End && to >= period2Start;
                
                if (overlapsPeriod1 || overlapsPeriod2) {
                    return true;
                }
                
                current.setMonth(month + 1);
                current.setDate(1);
            }
            return false;
        } else if (payFrequency === 'Monthly') {
            let current = new Date(from);
            while (current <= to) {
                if (current.getDate() === 1) {
                    return true;
                }
                current.setDate(current.getDate() + 1);
            }
            return false;
        }
        
        return false;
    }
}

module.exports = SalaryComputationController;
