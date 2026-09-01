const pool = require('../../config/database');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

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
                `INSERT INTO batch_payroll (batch_reference, pay_period_start, pay_period_end, payroll_count, total_gross_pay, total_gross_deduction, total_net_pay, status) VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending') RETURNING *`,
                [batchReference, payPeriodStart, payPeriodEnd, payrollData.rows.length, totalGrossPay.toFixed(2), totalGrossDeduction.toFixed(2), totalNetPay.toFixed(2)]
            );
            const batch = batchResult.rows[0];

            const updatedPayrolls = [];
            for (const payroll of payrollData.rows) {
                await client.query("UPDATE payroll SET status = 'Paid', updated_at = CURRENT_TIMESTAMP WHERE payroll_id = $1", [payroll.payroll_id]);

                await client.query(
                    'INSERT INTO batch_payroll_items (batch_payroll_id, payroll_id) VALUES ($1, $2)',
                    [batch.batch_payroll_id, payroll.payroll_id]
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

        const outputDir = 'C:/Users/ADMIN/Documents/uploads/batchpayroll';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const formatDate = (d) => {
            const date = new Date(d);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };
        const filename = `batchpayroll_${batch.batch_reference}_${formatDate(batch.pay_period_start)}_to_${formatDate(batch.pay_period_end)}.pdf`;
        const filePath = path.join(outputDir, filename);

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
        await page.pdf({
            path: filePath,
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        });
        await browser.close();

        return { filePath, filename };
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




