const pool = require('../../config/database');
const puppeteer = require('puppeteer');
const { uploadFile, getPublicUrl } = require('../../utils/gcs');

class BatchPayrollController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getNextBatchReference() {
        const query = `SELECT nextval('batch_payroll_seq') AS next_num`;
        const result = await this.db.query(query);
        const nextNum = result.rows[0]?.next_num;
        if (!nextNum) return null;
        return 'BtPaRol-' + String(nextNum).padStart(9, '0');
    }

    async getAllBatches() {
        const query = 'SELECT * FROM batch_payroll ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getBatchByReference(batchReference) {
        const query = 'SELECT * FROM batch_payroll WHERE batch_reference = $1';
        const result = await this.db.query(query, [batchReference]);
        return result.rows[0];
    }

    async getBatchById(batchId) {
        const query = 'SELECT * FROM batch_payroll WHERE batch_payroll_id = $1';
        const result = await this.db.query(query, [batchId]);
        return result.rows[0];
    }

    async getBatchItems(batchPayrollId) {
        const query = 'SELECT * FROM batch_payroll_items WHERE batch_payroll_id = $1 ORDER BY created_at DESC';
        const result = await this.db.query(query, [batchPayrollId]);
        return result.rows;
    }

    async getBatchPrintData(batchId) {
        const batchResult = await this.db.query('SELECT * FROM batch_payroll WHERE batch_payroll_id = $1', [batchId]);
        const batch = batchResult.rows[0];
        if (!batch) {
            throw new Error('Batch not found');
        }

        const itemsResult = await this.db.query(
            `SELECT bi.*, p.employee_id, ep.last_name, ep.first_name, p.date_start, p.date_end, p.total_days_worked, p.total_overtime_hours, p.total_allowance, p.total_leaves_usage, p.regular_holiday, p.special_holiday, p.total_income_tax, p.total_sss_payment, p.total_sss_loan_payment, p.total_philhealth_payment, p.total_pagibig_payment, p.total_pagibig_loan_payment, p.total_cash_loan_deductions, p.total_losses_damages, p.gross_deduction, p.starting_cash_loan, p.ending_cash_loan, p.starting_losses_damages, p.ending_losses_damages, p.net_pay FROM batch_payroll_items bi JOIN payroll p ON bi.payroll_id = p.payroll_id LEFT JOIN employee_profile ep ON p.employee_id = ep.employee_id WHERE bi.batch_payroll_id = $1 ORDER BY p.employee_id ASC`,
            [batchId]
        );

        const formatDate = (d) => {
            const date = new Date(d);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };

        const formatPayPeriod = (date) => {
            if (!date || isNaN(new Date(date).getTime())) return '';
            return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        };

        const payPeriodFrom = batch.pay_period_start ? formatPayPeriod(batch.pay_period_start) : '';
        const payPeriodTo = batch.pay_period_end ? formatPayPeriod(batch.pay_period_end) : '';

        const summaryData = {
            payPeriod: payPeriodFrom && payPeriodTo ? `${payPeriodFrom} - ${payPeriodTo}` : '-',
            payPeriodFrom,
            payPeriodTo,
            employeeCount: batch.payroll_count || itemsResult.rows.length,
            grossPay: Number(batch.total_gross_pay).toFixed(2),
            grossDeduction: Number(batch.total_gross_deduction).toFixed(2),
            netPay: Number(batch.total_net_pay).toFixed(2)
        };

        const tableData = itemsResult.rows.map(item => {
            const grossPay = (Number(item.total_days_worked) || 0) + (Number(item.total_overtime_hours) || 0) + (Number(item.total_allowance) || 0) + (Number(item.total_leaves_usage) || 0) + (Number(item.regular_holiday) || 0) + (Number(item.special_holiday) || 0);
            return {
                payrollId: item.payroll_id || '',
                employeeId: item.employee_id || '',
                lastName: item.last_name || '',
                firstName: item.first_name || '',
                totalDays: Number(item.total_days_worked) || 0,
                totalOvertime: Number(item.total_overtime_hours) || 0,
                totalAllowance: Number(item.total_allowance) || 0,
                totalLeaves: Number(item.total_leaves_usage) || 0,
                regularHoliday: Number(item.regular_holiday) || 0,
                specialHoliday: Number(item.special_holiday) || 0,
                grossPay,
                totalTax: Number(item.total_income_tax) || 0,
                totalSss: Number(item.total_sss_payment) || 0,
                totalSssLoan: Number(item.total_sss_loan_payment) || 0,
                totalPhilhealth: Number(item.total_philhealth_payment) || 0,
                totalPagibig: Number(item.total_pagibig_payment) || 0,
                totalPagibigLoan: Number(item.total_pagibig_loan_payment) || 0,
                totalCashLoanDeductions: Number(item.total_cash_loan_deductions) || 0,
                totalLossesDeductions: Number(item.total_losses_damages) || 0,
                grossDeduction: Number(item.gross_deduction) || 0,
                netPay: Number(item.net_pay) || 0,
                startingCashLoan: Number(item.starting_cash_loan) || 0,
                endingCashLoan: Number(item.ending_cash_loan) || 0,
                startingLosses: Number(item.starting_losses_damages) || 0,
                endingLosses: Number(item.ending_losses_damages) || 0,
                date_start: item.date_start || '',
                date_end: item.date_end || ''
            };
        });

        return { summaryData, tableData };
    }

    async confirmBatchPayroll(payrollIds, payPeriodStart, payPeriodEnd) {
        if (!payrollIds || payrollIds.length === 0) {
            throw new Error('No payroll IDs provided');
        }

        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const batchReference = await this.getNextBatchReference();
            if (!batchReference) {
                throw new Error('Failed to generate batch reference');
            }

            const payrollData = await client.query(
                `SELECT payroll_id, employee_id, date_start, date_end, total_days_worked, total_overtime_hours, total_allowance, total_leaves_usage, regular_holiday, special_holiday, total_income_tax, total_sss_payment, total_sss_loan_payment, total_philhealth_payment, total_pagibig_payment, total_pagibig_loan_payment, total_cash_loan_deductions, total_losses_damages, net_pay FROM payroll WHERE payroll_id = ANY($1) AND status = 'Pending'`,
                [payrollIds]
            );

            if (payrollData.rows.length === 0) {
                throw new Error('No pending payrolls found for the provided IDs');
            }

            let totalGrossPay = 0;
            let totalGrossDeduction = 0;
            let totalNetPay = 0;
            let payPeriodStart = null;
            let payPeriodEnd = null;

            for (const row of payrollData.rows) {
                const grossPay = (Number(row.total_days_worked) || 0) + (Number(row.total_overtime_hours) || 0) + (Number(row.total_allowance) || 0) + (Number(row.total_leaves_usage) || 0) + (Number(row.regular_holiday) || 0) + (Number(row.special_holiday) || 0);
                const grossDeduction = (Number(row.total_income_tax) || 0) + (Number(row.total_sss_payment) || 0) + (Number(row.total_sss_loan_payment) || 0) + (Number(row.total_philhealth_payment) || 0) + (Number(row.total_pagibig_payment) || 0) + (Number(row.total_pagibig_loan_payment) || 0) + (Number(row.total_cash_loan_deductions) || 0) + (Number(row.total_losses_damages) || 0);
                totalGrossPay += grossPay;
                totalGrossDeduction += grossDeduction;
                totalNetPay += Number(row.net_pay) || 0;

                if (row.date_start) {
                    const startDate = new Date(row.date_start);
                    if (!payPeriodStart || startDate < new Date(payPeriodStart)) {
                        payPeriodStart = row.date_start;
                    }
                }
                if (row.date_end) {
                    const endDate = new Date(row.date_end);
                    if (!payPeriodEnd || endDate > new Date(payPeriodEnd)) {
                        payPeriodEnd = row.date_end;
                    }
                }
            }

            const batchResult = await client.query(
                `INSERT INTO batch_payroll (batch_payroll_id, batch_id, batch_reference, date_start, date_end, pay_period_start, pay_period_end, payroll_count, total_gross_pay, total_gross_deduction, total_net_pay, status) VALUES (nextval('batch_payroll_seq'), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'Pending') RETURNING *`,
                [batchReference, batchReference, payPeriodStart, payPeriodEnd, payPeriodStart, payPeriodEnd, payrollData.rows.length, totalGrossPay.toFixed(2), totalGrossDeduction.toFixed(2), totalNetPay.toFixed(2)]
            );
            const batch = batchResult.rows[0];

            const updatedPayrolls = [];
            for (const payroll of payrollData.rows) {
                await client.query("UPDATE payroll SET status = 'Paid', updated_at = CURRENT_TIMESTAMP WHERE payroll_id = $1", [payroll.payroll_id]);

                await client.query(
                    'INSERT INTO batch_payroll_items (batch_id, batch_payroll_id, payroll_id, employee_id) VALUES ($1, $2, $3, $4)',
                    [batchReference, batch.batch_payroll_id, payroll.payroll_id, payroll.employee_id]
                );

                if (Number(payroll.total_cash_loan_deductions) > 0) {
                    await this._createCashLoanRepayments(client, payroll.employee_id, payroll.payroll_id, Number(payroll.total_cash_loan_deductions));
                }

                if (Number(payroll.total_losses_damages) > 0) {
                    await this._createLossDamageRepayments(client, payroll.employee_id, payroll.payroll_id, Number(payroll.total_losses_damages));
                }

                await this._promoteAttendanceToDisbursement(client, payroll.employee_id, payroll.date_start, payroll.date_end);
                await this._promoteOvertimeToDisbursement(client, payroll.employee_id, payroll.date_start, payroll.date_end);
                await this._promoteLeaveToDisbursement(client, payroll.employee_id, payroll.date_start, payroll.date_end);

                updatedPayrolls.push(payroll.payroll_id);
            }

            await client.query('COMMIT');
            return {
                batch: batch,
                updatedPayrolls: updatedPayrolls,
                message: 'Batch ' + batchReference + ' confirmed successfully'
            };
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async generateBatchPdf(batchId, html) {
        const batchResult = await this.db.query('SELECT * FROM batch_payroll WHERE batch_payroll_id = $1', [batchId]);
        const batch = batchResult.rows[0];
        if (!batch) {
            throw new Error('Batch not found');
        }

        const itemsResult = await this.db.query(
            `SELECT bi.*, p.employee_id, ep.last_name, ep.first_name, p.date_start, p.date_end, p.total_days_worked, p.total_overtime_hours, p.total_allowance, p.total_leaves_usage, p.regular_holiday, p.special_holiday, p.total_income_tax, p.total_sss_payment, p.total_sss_loan_payment, p.total_philhealth_payment, p.total_pagibig_payment, p.total_pagibig_loan_payment, p.total_cash_loan_deductions, p.total_losses_damages, p.gross_deduction, p.starting_cash_loan, p.ending_cash_loan, p.starting_losses_damages, p.ending_losses_damages, p.net_pay FROM batch_payroll_items bi JOIN payroll p ON bi.payroll_id = p.payroll_id LEFT JOIN employee_profile ep ON p.employee_id = ep.employee_id WHERE bi.batch_payroll_id = $1 ORDER BY p.employee_id ASC`,
            [batchId]
        );
        const items = itemsResult.rows;

        const formatDate = (d) => {
            const date = new Date(d);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };
        const filename = `${formatDate(batch.pay_period_start)} - overall summary - ${batch.batch_reference}.pdf`;
        const gcsPath = `batch-payroll/summary/${filename}`;

        let previewHtml = html;
        if (!previewHtml) {
            const fmt = (val) => {
                const n = Number(val) || 0;
                return 'P ' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            };

            const tableRows = items.map(item => {
                const grossPay = (Number(item.total_days_worked) || 0) + (Number(item.total_overtime_hours) || 0) + (Number(item.total_allowance) || 0) + (Number(item.total_leaves_usage) || 0) + (Number(item.regular_holiday) || 0) + (Number(item.special_holiday) || 0);
                return `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">${item.employee_id || ''}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">${item.last_name || ''}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">${item.first_name || ''}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_days_worked || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_overtime_hours || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_allowance || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_leaves_usage || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.regular_holiday || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.special_holiday || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right; font-weight: 600;">${(Number(item.total_days_worked || 0) + Number(item.total_overtime_hours || 0) + Number(item.total_allowance || 0) + Number(item.total_leaves_usage || 0) + Number(item.regular_holiday || 0) + Number(item.special_holiday || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_income_tax || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_sss_payment || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_sss_loan_payment || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_philhealth_payment || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_pagibig_payment || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_pagibig_loan_payment || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_cash_loan_deductions || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.total_losses_damages || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right; font-weight: 600;">${(Number(item.gross_deduction || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right; font-weight: 600;">${(Number(item.net_pay || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.starting_cash_loan || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.ending_cash_loan || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.starting_losses_damages || 0)).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 4px; font-size: 9px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; text-align: right;">${(Number(item.ending_losses_damages || 0)).toFixed(2)}</td>
                    </tr>
                `;
            });

            previewHtml = `
                <div style="font-family: Arial, sans-serif; color: #000;">
                    <h2 style="text-align: center; margin-bottom: 2px; font-size: 16px;">GOLDEN FIELD</h2>
                    <div class="print-subtitle" style="text-align: center; color: #555; margin-bottom: 10px; font-size: 11px;">BATCH PAYROLL SUMMARY</div>
                    <div class="print-summary" style="display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: nowrap;">
                        <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                            <label style="display: block; font-size: 9px; color: #666;">Pay Period</label>
                            <input readonly value="${formatDate(batch.pay_period_start)} to ${formatDate(batch.pay_period_end)}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                        </div>
                        <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                            <label style="display: block; font-size: 9px; color: #666;">Employee Count</label>
                            <input readonly value="${batch.payroll_count || 0}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                        </div>
                        <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                            <label style="display: block; font-size: 9px; color: #666;">Total Gross Pay</label>
                            <input readonly value="${fmt(batch.total_gross_pay)}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                        </div>
                        <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                            <label style="display: block; font-size: 9px; color: #666;">Total Gross Deduction</label>
                            <input readonly value="${fmt(batch.total_gross_deduction)}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                        </div>
                        <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                            <label style="display: block; font-size: 9px; color: #666;">Total Net Pay</label>
                            <input readonly value="${fmt(batch.total_net_pay)}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                        </div>
                    </div>
                    <div class="print-table-wrap" style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 9px; table-layout: fixed;">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: left; width: 4%;">Employee ID</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: left; width: 6%; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">Last Name</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: left; width: 6%; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">First Name</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Days Worked</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">OT</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Allowance</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Leaves</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Reg Holiday</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Spec Holiday</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 5%;">Gross Pay</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Income Tax</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">SSS</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">SSS Loan</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">PhilHealth</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Pag-IBIG</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Pag-IBIG Loan</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Cash Loan</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 6%;">Losses/Damages</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 5%;">Gross Deduction</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 5%;">Net Pay</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Starting Cash</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%;">Ending Cash</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">Starting Losses</th>
                                    <th style="border: 1px solid #ddd; padding: 4px; background: #f4f4f4; font-weight: 700; text-align: right; width: 4%; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">Ending Losses</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows.join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 900 });
        await page.setContent(previewHtml, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        });
        await browser.close();

        await uploadFile(pdfBuffer, gcsPath, { contentType: 'application/pdf' });

        return { publicUrl: getPublicUrl(gcsPath), filename, gcsPath };
    }

    async generateAcknowledgementPdf(batchId) {
        const batchResult = await this.db.query('SELECT * FROM batch_payroll WHERE batch_payroll_id = $1', [batchId]);
        const batch = batchResult.rows[0];
        if (!batch) {
            throw new Error('Batch not found');
        }

        const itemsResult = await this.db.query(
            `SELECT bi.*, p.employee_id, ep.last_name, ep.first_name, p.date_start, p.date_end, p.total_days_worked, p.total_overtime_hours, p.total_allowance, p.total_leaves_usage, p.regular_holiday, p.special_holiday, p.total_income_tax, p.total_sss_payment, p.total_sss_loan_payment, p.total_philhealth_payment, p.total_pagibig_payment, p.total_pagibig_loan_payment, p.total_cash_loan_deductions, p.total_losses_damages, p.net_pay FROM batch_payroll_items bi JOIN payroll p ON bi.payroll_id = p.payroll_id LEFT JOIN employee_profile ep ON p.employee_id = ep.employee_id WHERE bi.batch_payroll_id = $1 ORDER BY p.employee_id ASC`,
            [batchId]
        );
        const items = itemsResult.rows;

        const formatDate = (d) => {
            const date = new Date(d);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };
        const filename = `${formatDate(batch.pay_period_start)} - payslip acknowledge - ${batch.batch_reference}.pdf`;
        const gcsPath = `batch-payroll/acknowledgement/${filename}`;

        const fmtNum = (val) => {
            const n = Number(val) || 0;
            return 'P ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        const formatDateShort = (d) => {
            if (!d) return '-';
            const date = new Date(d);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        };

        const pages = [];
        for (let i = 0; i < items.length; i += 6) {
            pages.push(items.slice(i, i + 6));
        }

        const previewHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #000; }
                    .acknowledgement-page { display: flex; gap: 0; border: 1px solid #000; padding: 0; margin: 0; height: 57.4mm; page-break-inside: avoid; box-sizing: border-box; }
                    .acknowledgement-page > div:first-child { flex: 0 0 60%; border-right: 2px dashed #000; padding: 3mm; box-sizing: border-box; }
                    .acknowledgement-page > div:last-child { flex: 0 0 40%; padding: 3mm; box-sizing: border-box; }
                    .acknowledgement-header { text-align: center; margin-bottom: 4px; }
                    .acknowledgement-header h2 { margin: 0; font-size: 12px; font-weight: bold; }
                    .acknowledgement-header .subtitle { font-size: 9px; color: #333; }
                    .acknowledgement-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 4px; }
                    .acknowledgement-grid .field { font-size: 8px; }
                    .acknowledgement-grid .field-label { font-weight: bold; font-size: 8px; }
                    .acknowledgement-grid .field-value { font-size: 8px; }
                    .acknowledgement-table { width: 100%; border-collapse: collapse; font-size: 8px; margin-bottom: 4px; }
                    .acknowledgement-table th, .acknowledgement-table td { border: 1px solid #000; padding: 1px 2px; font-size: 8px; }
                    .acknowledgement-table th { background: #f0f0f0; font-weight: bold; }
                </style>
            </head>
            <body>
                ${pages.map(page => {
                    const rows = page.map(item => {
                        const grossPay = Number(item.gross_pay) || 0;
                        const grossDeduction = (Number(item.total_income_tax) || 0) + (Number(item.total_sss_payment) || 0) + (Number(item.total_sss_loan_payment) || 0) + (Number(item.total_philhealth_payment) || 0) + (Number(item.total_pagibig_payment) || 0) + (Number(item.total_pagibig_loan_payment) || 0) + (Number(item.total_cash_loan_deductions) || 0) + (Number(item.total_losses_damages) || 0);
                        const netPay = Number(item.net_pay) || 0;
                        const basicAmount = grossPay - (Number(item.total_allowance) || 0) - (Number(item.total_overtime_hours) || 0) - (Number(item.regular_holiday) || 0) - (Number(item.special_holiday) || 0) - (Number(item.total_leaves_usage) || 0);

                        const earningsRows = [];
                        earningsRows.push(`<tr>
                            <td style="text-align: left;">Basic</td>
                            <td style="text-align: right;">${fmtNum(basicAmount)}</td>
                            <td style="text-align: left;"></td>
                            <td style="text-align: right;"></td>
                        </tr>`);

                        if ((Number(item.total_allowance) || 0) > 0) {
                            earningsRows.push(`<tr>
                                <td style="text-align: left;">Allowance</td>
                                <td style="text-align: right;">${fmtNum(item.total_allowance || 0)}</td>
                                <td style="text-align: left;"></td>
                                <td style="text-align: right;"></td>
                            </tr>`);
                        }

                        earningsRows.push(`<tr>
                            <td style="text-align: left;">OT</td>
                            <td style="text-align: right;">${fmtNum(item.total_overtime_hours || 0)}</td>
                            <td style="text-align: left;"></td>
                            <td style="text-align: right;"></td>
                        </tr>`);

                        if ((Number(item.total_others || 0)) > 0) {
                            earningsRows.push(`<tr>
                                <td style="text-align: left;">Others</td>
                                <td style="text-align: right;">${fmtNum(item.total_others || 0)}</td>
                                <td style="text-align: left;"></td>
                                <td style="text-align: right;"></td>
                            </tr>`);
                        }

                        const deductions = [];
                        if ((Number(item.total_sss_payment) || 0) > 0) deductions.push({ label: 'SSS', amount: item.total_sss_payment });
                        if ((Number(item.total_philhealth_payment) || 0) > 0) deductions.push({ label: 'PhilHealth', amount: item.total_philhealth_payment });
                        if ((Number(item.total_pagibig_payment) || 0) > 0) deductions.push({ label: 'Pag-IBIG', amount: item.total_pagibig_payment });
                        if ((Number(item.total_cash_loan_deductions) || 0) > 0) deductions.push({ label: 'Cash Loan', amount: item.total_cash_loan_deductions });
                        if ((Number(item.total_losses_damages) || 0) > 0) deductions.push({ label: 'Losses/Damages', amount: item.total_losses_damages });

                        const deductionRows = deductions.map(d => `
                            <tr>
                                <td style="text-align: left;"></td>
                                <td style="text-align: right;"></td>
                                <td style="text-align: left;">${d.label}</td>
                                <td style="text-align: right;">${fmtNum(d.amount)}</td>
                            </tr>
                        `).join('');

                        const noDeductionsRow = deductions.length === 0 ? `<tr>
                            <td style="text-align: left;" colspan="2"></td>
                            <td style="text-align: left;">No deductions</td>
                            <td style="text-align: right;"></td>
                        </tr>` : '';

                        return `
                            <div class="acknowledgement-page" style="display: flex; gap: 0; border: 1px solid #000; padding: 0; margin-bottom: 5mm;">
                                <div style="flex: 0 0 60%; border-right: 2px dashed #000; padding: 3mm; display: flex; flex-direction: column;">
                                    <div class="acknowledgement-grid">
                                        <div class="field"><span class="field-label">Name:</span> <span class="field-value">${item.last_name || ''}, ${item.first_name || ''}</span></div>
                                        <div class="field"><span class="field-label">Code:</span> <span class="field-value">${item.employee_id || ''}</span></div>
                                        <div class="field"><span class="field-label">From:</span> <span class="field-value">${formatDateShort(item.date_start)}</span></div>
                                        <div class="field"><span class="field-label">To:</span> <span class="field-value">${formatDateShort(item.date_end)}</span></div>
                                    </div>
                                    <table class="acknowledgement-table" style="width: 100%; border-collapse: collapse; font-size: 9px; margin-bottom: 6px; flex: 1;">
                                        <thead>
                                            <tr>
                                                <th style="width: 70%;">EARNINGS</th>
                                                <th style="width: 30%; text-align: right;">AMOUNT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${earningsRows.join('')}
                                        </tbody>
                                    </table>
                                    <table class="acknowledgement-table" style="width: 100%; border-collapse: collapse; font-size: 9px; margin-bottom: 6px; flex: 1;">
                                        <thead>
                                            <tr>
                                                <th style="width: 70%;">DEDUCTIONS</th>
                                                <th style="width: 30%; text-align: right;">AMOUNT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${deductionRows}
                                            ${noDeductionsRow}
                                        </tbody>
                                    </table>
                                    <div style="display: flex; justify-content: flex-end; font-size: 9px; margin-bottom: 6px; padding-right: 4px;">
                                        <div style="display: flex; flex-direction: column; gap: 2px; align-items: flex-end;">
                                            <div><strong>Gross Pay:</strong> ${fmtNum(grossPay)}</div>
                                            <div><strong>Deductions:</strong> ${fmtNum(grossDeduction)}</div>
                                            <div><strong>Net Pay:</strong> ${fmtNum(netPay)}</div>
                                        </div>
                                    </div>
                                    <div style="height: 10px;"></div>
                                    <div style="margin-top: auto; display: flex; justify-content: space-between; font-size: 9px; padding-top: 8px; border-top: 1px solid #000;">
                                        <div>
                                            <div style="border-top: 1px solid #000; width: 100px; text-align: center; padding-top: 2px;">Authorized Signature</div>
                                        </div>
                                        <div>
                                            <div style="border-top: 1px solid #000; width: 100px; text-align: center; padding-top: 2px;">Date</div>
                                        </div>
                                    </div>
                                </div>
                                <div style="flex: 0 0 40%; padding: 3mm; display: flex; flex-direction: column; background: #fff;">
                                    <div style="font-weight: bold; font-size: 10px; text-align: center; margin-bottom: 6px; border-bottom: 1px solid #000; padding-bottom: 4px;">TEAR-OUT SECTION</div>
                                    <div style="font-size: 9px; margin-bottom: 6px;">
                                        <div><strong>Employee:</strong> ${item.last_name || ''}, ${item.first_name || ''}</div>
                                        <div><strong>Code:</strong> ${item.employee_id || ''}</div>
                                        <div><strong>Period:</strong> ${formatDateShort(item.date_start)} - ${formatDateShort(item.date_end)}</div>
                                    </div>
                                    <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-bottom: 6px;">
                                        <tbody>
                                            <tr><td style="border-bottom: 1px solid #ccc; padding: 2px 0;">Basic</td><td style="border-bottom: 1px solid #ccc; padding: 2px 0; text-align: right;">${fmtNum(basicAmount)}</td></tr>
                                            ${(Number(item.total_allowance) || 0) > 0 ? `<tr><td style="border-bottom: 1px solid #ccc; padding: 2px 0;">Allowance</td><td style="border-bottom: 1px solid #ccc; padding: 2px 0; text-align: right;">${fmtNum(item.total_allowance || 0)}</td></tr>` : ''}
                                            <tr><td style="border-bottom: 1px solid #ccc; padding: 2px 0;">OT</td><td style="border-bottom: 1px solid #ccc; padding: 2px 0; text-align: right;">${fmtNum(item.total_overtime_hours || 0)}</td></tr>
                                        </tbody>
                                    </table>
                                    <div style="font-size: 9px; margin-bottom: 6px;">
                                        <div><strong>Deductions:</strong> ${fmtNum(grossDeduction)}</div>
                                        ${deductions.map(d => `<div style="padding-left: 8px;">• ${d.label}: ${fmtNum(d.amount)}</div>`).join('')}
                                    </div>
                                    <div style="font-size: 9px; margin-bottom: 6px; font-weight: bold; border-top: 1px solid #000; padding-top: 4px;">
                                        <div>Net Pay: ${fmtNum(netPay)}</div>
                                    </div>
                                    <div style="font-size: 9px; margin-top: auto; border-top: 1px solid #000; padding-top: 4px;">
                                        <div>Start Cash: ${fmtNum(Number(item.starting_cash_loan) || 0)}</div>
                                        <div>End Cash: ${fmtNum(Number(item.ending_cash_loan) || 0)}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('');

                return `<div>${rows}</div>`;
            }).join('')}
        </body>
        </html>
    `;

    const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 794, height: 1123 });
        await page.setContent(previewHtml, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            portrait: true,
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        });
        await browser.close();

        await uploadFile(pdfBuffer, gcsPath, { contentType: 'application/pdf' });

        return { publicUrl: getPublicUrl(gcsPath), filename, gcsPath };
    }

    async _createCashLoanRepayments(client, employeeId, payrollId, totalDeduction) {
        const cashAdvancesResult = await client.query(
            "SELECT cashadvance_id, ca_amount, installment_amount, status FROM cash_advance WHERE employee_id = $1 AND status IN ('unpaid', 'Approved') ORDER BY created_at ASC",
            [employeeId]
        );
        const cashAdvances = cashAdvancesResult.rows;
        if (cashAdvances.length === 0) return;

        let remaining = totalDeduction;
        for (const ca of cashAdvances) {
            if (remaining <= 0) break;

            const totalRepaidResult = await client.query(
                'SELECT COALESCE(SUM(amount_paid), 0) as total_repaid FROM cash_advance_repayment WHERE cashadvance_id = $1',
                [ca.cashadvance_id]
            );
            const totalRepaid = Number(totalRepaidResult.rows[0]?.total_repaid || 0);
            const remainingBalance = Number(ca.ca_amount) - totalRepaid;

            if (remainingBalance <= 0) {
                await client.query("UPDATE cash_advance SET status = 'paid' WHERE cashadvance_id = $1", [ca.cashadvance_id]);
                continue;
            }

            const amount = Number(ca.installment_amount);
            const toPay = Math.min(amount, remainingBalance, remaining);
            if (toPay > 0) {
                await client.query(
                    'INSERT INTO cash_advance_repayment (cashadvance_id, payroll_cycle_id, amount_paid, paid_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)',
                    [ca.cashadvance_id, payrollId, toPay.toFixed(2)]
                );
                remaining -= toPay;

                const newTotalRepaid = totalRepaid + toPay;
                const newRemaining = Number(ca.ca_amount) - newTotalRepaid;
                if (newRemaining <= 0) {
                    await client.query("UPDATE cash_advance SET status = 'paid' WHERE cashadvance_id = $1", [ca.cashadvance_id]);
                }
            }
        }
    }

    async _createLossDamageRepayments(client, employeeId, payrollId, totalDeduction) {
        const lossDamagesResult = await client.query(
            "SELECT lossdamage_id, loss_damage_amount, installment_amount, status FROM loss_damage WHERE employee_id = $1 AND status IN ('unpaid', 'Approved') ORDER BY created_at ASC",
            [employeeId]
        );
        const lossDamages = lossDamagesResult.rows;
        if (lossDamages.length === 0) return;

        let remaining = totalDeduction;
        for (const ld of lossDamages) {
            if (remaining <= 0) break;

            const totalRepaidResult = await client.query(
                'SELECT COALESCE(SUM(amount_paid), 0) as total_repaid FROM lossdamage_repayment WHERE lossdamage_id = $1',
                [ld.lossdamage_id]
            );
            const totalRepaid = Number(totalRepaidResult.rows[0]?.total_repaid || 0);
            const remainingBalance = Number(ld.loss_damage_amount) - totalRepaid;

            if (remainingBalance <= 0) {
                await client.query("UPDATE loss_damage SET status = 'paid' WHERE lossdamage_id = $1", [ld.lossdamage_id]);
                continue;
            }

            const amount = Number(ld.installment_amount);
            const toPay = Math.min(amount, remainingBalance, remaining);
            if (toPay > 0) {
                await client.query(
                    'INSERT INTO lossdamage_repayment (lossdamage_id, payrollcycle_id, amount_paid, paid_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)',
                    [ld.lossdamage_id, payrollId, toPay.toFixed(2)]
                );
                remaining -= toPay;

                const newTotalRepaid = totalRepaid + toPay;
                const newRemaining = Number(ld.loss_damage_amount) - newTotalRepaid;
                if (newRemaining <= 0) {
                    await client.query("UPDATE loss_damage SET status = 'paid' WHERE lossdamage_id = $1", [ld.lossdamage_id]);
                }
            }
        }
    }

    async _promoteAttendanceToDisbursement(client, employeeId, dateFrom, dateTo) {
        await client.query(
            `UPDATE attendance_log SET status = 'For Disbursement', updated_at = CURRENT_TIMESTAMP WHERE employee_id = $1 AND date BETWEEN $2 AND $3 AND status = 'Approved'`,
            [employeeId, dateFrom, dateTo]
        );
    }

    async _promoteOvertimeToDisbursement(client, employeeId, dateFrom, dateTo) {
        await client.query(
            `UPDATE overtime_log SET status = 'For Disbursement', updated_at = CURRENT_TIMESTAMP WHERE employee_id = $1 AND date BETWEEN $2 AND $3 AND status = 'Approved'`,
            [employeeId, dateFrom, dateTo]
        );
    }

    async _promoteLeaveToDisbursement(client, employeeId, dateFrom, dateTo) {
        await client.query(
            `UPDATE leave_log SET status = 'For Disbursement', updated_at = CURRENT_TIMESTAMP WHERE employee_id = $1 AND date BETWEEN $2 AND $3 AND status = 'Approved'`,
            [employeeId, dateFrom, dateTo]
        );
    }
}

module.exports = BatchPayrollController;




