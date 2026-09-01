const pool = require('../../config/database');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PayrollController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllPayrolls() {
        const query = 'SELECT * FROM payroll ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getAllPayrollsWithNames() {
        const query = `
            SELECT p.*, ep.last_name, ep.first_name
            FROM payroll p
            LEFT JOIN employee_profile ep ON p.employee_id = ep.employee_id
            ORDER BY p.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getPayrollById(payrollId) {
        const query = 'SELECT * FROM payroll WHERE payroll_id = $1';
        const result = await this.db.query(query, [payrollId]);
        return result.rows[0];
    }

    async getPayrollsByEmployee(employeeId) {
        const query = 'SELECT * FROM payroll WHERE employee_id = $1 ORDER BY date_start DESC';
        const result = await this.db.query(query, [employeeId]);
        return result.rows;
    }

    async getPayrollsByStatus(status) {
        const query = `
            SELECT p.*, ep.last_name, ep.first_name
            FROM payroll p
            LEFT JOIN employee_profile ep ON p.employee_id = ep.employee_id
            WHERE p.status = $1
            ORDER BY p.created_at DESC
        `;
        const result = await this.db.query(query, [status]);
        return result.rows;
    }

    async getPaidPayrollTotals() {
        const query = `
            SELECT 
                COALESCE(SUM(gross_pay), 0) as total_gross_pay,
                COALESCE(SUM(net_pay), 0) as total_net_pay
            FROM payroll
        `;
        const result = await this.db.query(query);
        return result.rows[0];
    }

    async getPaidPayrollTotalsByEmployee() {
        const query = `
            SELECT 
                employee_id,
                COALESCE(SUM(gross_pay), 0) as total_gross_pay,
                COALESCE(SUM(net_pay), 0) as total_net_pay
            FROM payroll
            GROUP BY employee_id
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getMonthlySalaryComparison() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        const currentMonthStart = new Date(currentYear, currentMonth, 1);
        const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);

        let lastMonthStart, lastMonthEnd;
        if (currentMonth === 0) {
            lastMonthStart = new Date(currentYear - 1, 11, 1);
            lastMonthEnd = new Date(currentYear - 1, 11, 31, 23, 59, 59, 999);
        } else {
            lastMonthStart = new Date(currentYear, currentMonth - 1, 1);
            lastMonthEnd = new Date(currentYear, currentMonth - 1, 0, 23, 59, 59, 999);
        }

        const currentQuery = `
            SELECT COALESCE(SUM(net_pay), 0) as total_net_pay
            FROM payroll
            WHERE date_start >= $1 AND date_end <= $2
        `;
        const currentResult = await this.db.query(currentQuery, [currentMonthStart, currentMonthEnd]);
        const currentNetPay = parseFloat(currentResult.rows[0].total_net_pay) || 0;

        const lastQuery = `
            SELECT COALESCE(SUM(net_pay), 0) as total_net_pay
            FROM payroll
            WHERE date_start >= $1 AND date_end <= $2
        `;
        const lastResult = await this.db.query(lastQuery, [lastMonthStart, lastMonthEnd]);
        const lastNetPay = parseFloat(lastResult.rows[0].total_net_pay) || 0;

        let percentageChange = 0;
        let trend = 'neutral';
        let arrow = '';
        let arrowColor = '';

        if (lastNetPay === 0) {
            if (currentNetPay > 0) {
                percentageChange = 100;
                trend = 'increase';
                arrow = '↑';
                arrowColor = '#dc3545';
            } else {
                percentageChange = 0;
                trend = 'neutral';
                arrow = '→';
                arrowColor = '#6c757d';
            }
        } else {
            percentageChange = ((currentNetPay - lastNetPay) / lastNetPay) * 100;
            if (percentageChange > 0) {
                trend = 'increase';
                arrow = '↑';
                arrowColor = '#dc3545';
            } else if (percentageChange < 0) {
                trend = 'decrease';
                arrow = '↓';
                arrowColor = '#28a745';
                percentageChange = Math.abs(percentageChange);
            } else {
                trend = 'neutral';
                arrow = '→';
                arrowColor = '#6c757d';
                percentageChange = 0;
            }
        }

        return {
            currentNetPay: currentNetPay.toFixed(2),
            lastNetPay: lastNetPay.toFixed(2),
            percentageChange: percentageChange.toFixed(1),
            trend,
            arrow,
            arrowColor
        };
    }

    async addPayroll(payrollData) {
        const { employee_id, date_start, date_end, total_days_worked, total_overtime_hours, total_allowance, total_leaves_usage, regular_holiday, special_holiday, total_income_tax, total_sss_payment, total_sss_loan_payment, total_philhealth_payment, total_pagibig_payment, total_pagibig_loan_payment, total_cash_loan_deductions, starting_cash_loan, ending_cash_loan, total_losses_damages, starting_losses_damages, ending_losses_damages, net_pay, status, gross_pay, gross_deduction } = payrollData;
        const query = `
            INSERT INTO payroll
            (employee_id, date_start, date_end, total_days_worked, total_overtime_hours, total_allowance, total_leaves_usage, regular_holiday, special_holiday, total_income_tax, total_sss_payment, total_sss_loan_payment, total_philhealth_payment, total_pagibig_payment, total_pagibig_loan_payment, total_cash_loan_deductions, starting_cash_loan, ending_cash_loan, total_losses_damages, starting_losses_damages, ending_losses_damages, net_pay, status, gross_pay, gross_deduction)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            employee_id,
            date_start,
            date_end,
            total_days_worked || 0,
            total_overtime_hours || 0,
            total_allowance || 0,
            total_leaves_usage || 0,
            regular_holiday || 0,
            special_holiday || 0,
            total_income_tax || 0,
            total_sss_payment || 0,
            total_sss_loan_payment || 0,
            total_philhealth_payment || 0,
            total_pagibig_payment || 0,
            total_pagibig_loan_payment || 0,
            total_cash_loan_deductions || 0,
            starting_cash_loan || 0,
            ending_cash_loan || 0,
            total_losses_damages || 0,
            starting_losses_damages || 0,
            ending_losses_damages || 0,
            net_pay || 0,
            status || 'Pending',
            gross_pay || 0,
            gross_deduction || 0
        ]);
        return result.rows[0];
    }

    async generatePayslipPdf(payrollId) {
        const payroll = await this.getPayrollById(payrollId);
        if (!payroll) {
            throw new Error('Payroll not found');
        }

        let employeeName = '-';
        try {
            const empResult = await this.db.query('SELECT first_name, middle_name, last_name FROM employee_profile WHERE employee_id = $1', [payroll.employee_id]);
            if (empResult.rows.length > 0) {
                const emp = empResult.rows[0];
                employeeName = [emp.first_name, emp.middle_name, emp.last_name].filter(Boolean).join(' ') || '-';
            }
        } catch (err) {
            console.error('Failed to load employee name for PDF:', err);
        }

        const outputDir = 'C:/Users/ADMIN/Documents/uploads/payslips';
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
        const filename = `payslip_${payroll.employee_id}_${formatDate(payroll.date_start)}_to_${formatDate(payroll.date_end)}.pdf`;
        const filePath = path.join(outputDir, filename);

        const doc = new PDFDocument({ size: 'A4', margin: 0 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        const fmt = (val) => {
            const n = Number(val) || 0;
            return 'P ' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        const grossPay = (Number(payroll.total_days_worked) || 0) + (Number(payroll.total_overtime_hours) || 0) + (Number(payroll.total_allowance) || 0) + (Number(payroll.total_leaves_usage) || 0) + (Number(payroll.regular_holiday) || 0) + (Number(payroll.special_holiday) || 0);
        const grossDeduction = (Number(payroll.total_income_tax) || 0) + (Number(payroll.total_sss_payment) || 0) + (Number(payroll.total_sss_loan_payment) || 0) + (Number(payroll.total_philhealth_payment) || 0) + (Number(payroll.total_pagibig_payment) || 0) + (Number(payroll.total_pagibig_loan_payment) || 0) + (Number(payroll.total_cash_loan_deductions) || 0) + (Number(payroll.total_losses_damages) || 0);
        const netPay = grossPay - grossDeduction;

        const pageWidth = doc.page.width;
        const margin = 50;
        const usableWidth = pageWidth - margin * 2;
        const colGap = 12;
        const colWidth = (usableWidth - colGap) / 2;
        const valueWidth = 90;

        let y = margin;

        const drawHeader = () => {
            doc.rect(margin, y, usableWidth, 2).fill('#000');
            y += 10;
            doc.fontSize(18).font('Helvetica-Bold').fillColor('#000').text('GOLDEN FIELD', margin, y, { width: usableWidth, align: 'center' });
            y += 22;
            doc.fontSize(10).font('Helvetica').fillColor('#555').text('OFFICIAL PAYSLIP', margin, y, { width: usableWidth, align: 'center' });
            y += 16;
            doc.rect(margin, y, usableWidth, 2).fill('#000');
            y += 12;
        };

        const drawInfoRow = (label, value) => {
            const labelY = y;
            doc.font('Helvetica-Bold').fillColor('#000').text(label, margin, labelY, { width: 110, align: 'left' });
            doc.font('Helvetica').fillColor('#000').text(value || '-', margin + 110, labelY, { width: usableWidth - 110, align: 'left' });
            y = labelY + 20;
        };

        const drawInfoBlock = () => {
            doc.rect(margin, y, usableWidth, 1).fill('#000');
            y += 8;
            drawInfoRow('Employee Name', employeeName);
            drawInfoRow('Employee ID', payroll.employee_id);
            drawInfoRow('Pay Period', `${formatDate(payroll.date_start)} to ${formatDate(payroll.date_end)}`);
            y += 4;
        };

        const earnings = [
            ['Base Salary', payroll.total_days_worked],
            ['Overtime', payroll.total_overtime_hours],
            ['Allowance', payroll.total_allowance],
            ['Sick Leave', payroll.total_leaves_usage],
            ['Vacation Leave', 0],
            ['Regular Holiday Pay', payroll.regular_holiday],
            ['Special Holiday Pay', payroll.special_holiday],
            ['Total Gross Pay', grossPay]
        ];

        const deductions = [
            ['Income Tax', payroll.total_income_tax],
            ['SSS', payroll.total_sss_payment],
            ['SSS Loan', payroll.total_sss_loan_payment],
            ['PhilHealth', payroll.total_philhealth_payment],
            ['Pag-IBIG', payroll.total_pagibig_payment],
            ['Pag-IBIG Loan', payroll.total_pagibig_loan_payment],
            ['Cash Loan Deduction', payroll.total_cash_loan_deductions],
            ['Losses / Damages', payroll.total_losses_damages],
            ['Total Gross Deductions', grossDeduction]
        ];

        const drawTwoColumnSection = () => {
            const headerY = y;
            doc.rect(margin, headerY, usableWidth, 20).fill('#f4f4f4');
            doc.font('Helvetica-Bold').fillColor('#000').text('EARNINGS', margin + 8, headerY + 6, { width: colWidth - 16, align: 'left' });
            doc.font('Helvetica-Bold').fillColor('#000').text('DEDUCTIONS', margin + colWidth + colGap + 8, headerY + 6, { width: colWidth - 16, align: 'left' });
            y = headerY + 22;

            const maxRows = Math.max(earnings.length, deductions.length);
            const labelWidth = colWidth - 100;
            const pad = 8;

            for (let i = 0; i < maxRows; i++) {
                const [earnLabel, earnValue] = earnings[i] || ['', ''];
                const [dedLabel, dedValue] = deductions[i] || ['', ''];
                const isEarnTotal = earnLabel === 'Total Gross Pay';
                const isDedTotal = dedLabel === 'Total Gross Deductions';

                doc.rect(margin, y, usableWidth, 1).fill('#eee');
                const rowY = y + 6;

                if (isEarnTotal || isDedTotal) {
                    doc.font('Helvetica-Bold').fontSize(9).fillColor('#000');
                    doc.text(earnLabel || '', margin + pad, rowY, { width: labelWidth, align: 'left' });
                    doc.text(fmt(earnValue), margin + colWidth - 92, rowY, { width: 90, align: 'right' });
                    doc.text(dedLabel || '', margin + colWidth + colGap + pad, rowY, { width: labelWidth, align: 'left' });
                    doc.text(fmt(dedValue), margin + usableWidth - 92, rowY, { width: 90, align: 'right' });
                } else {
                    doc.font('Helvetica').fontSize(9).fillColor('#333');
                    doc.text(earnLabel || '', margin + pad, rowY, { width: labelWidth, align: 'left' });
                    doc.text(fmt(earnValue), margin + colWidth - 92, rowY, { width: 90, align: 'right' });
                    doc.text(dedLabel || '', margin + colWidth + colGap + pad, rowY, { width: labelWidth, align: 'left' });
                    doc.text(fmt(dedValue), margin + usableWidth - 92, rowY, { width: 90, align: 'right' });
                }
                y += 20;
            }

            doc.rect(margin, y, usableWidth, 2).fill('#000');
            y += 8;
        };

        const drawNetPay = () => {
            const boxY = y;
            const boxHeight = 32;
            doc.rect(margin, boxY, usableWidth, boxHeight).fill('#f9f9f9');
            doc.rect(margin, boxY, usableWidth, boxHeight).stroke('#e5e5e5');
            doc.rect(margin, boxY, usableWidth, 1).fill('#000');
            doc.font('Helvetica-Bold').fillColor('#000').text('NET PAY', margin + 10, boxY + 10, { width: usableWidth - 20, align: 'left' });
            doc.font('Helvetica-Bold').fillColor('#000').text(netPay > 0 ? fmt(netPay) : '-', margin + 10, boxY + 10, { width: usableWidth - 20, align: 'right' });
            y = boxY + boxHeight + 10;
        };

        const drawCashInfo = () => {
            doc.rect(margin, y, usableWidth, 1).fill('#000');
            y += 8;
            const cashLabelWidth = colWidth - 100;
            doc.font('Helvetica').fillColor('#333').text('Starting Cash Advance', margin + 8, y, { width: cashLabelWidth, align: 'left' });
            doc.text((payroll.starting_cash_loan || 0).toString(), margin + colWidth - 92, y, { width: 90, align: 'right' });
            y += 20;
            doc.font('Helvetica').fillColor('#333').text('Ending Cash Advance', margin + 8, y, { width: cashLabelWidth, align: 'left' });
            doc.text((payroll.ending_cash_loan || 0).toString(), margin + colWidth - 92, y, { width: 90, align: 'right' });
            y += 20;
            doc.font('Helvetica').fillColor('#333').text('Starting Losses/ Damages', margin + 8, y, { width: cashLabelWidth, align: 'left' });
            doc.text((payroll.starting_losses_damages || 0).toString(), margin + colWidth - 92, y, { width: 90, align: 'right' });
            y += 20;
            doc.font('Helvetica').fillColor('#333').text('Ending Losses/ Damages', margin + 8, y, { width: cashLabelWidth, align: 'left' });
            doc.text((payroll.ending_losses_damages || 0).toString(), margin + colWidth - 92, y, { width: 90, align: 'right' });
            y += 20;
        };

        drawHeader();
        drawInfoBlock();
        drawTwoColumnSection();
        drawNetPay();
        drawCashInfo();

        doc.end();

        return new Promise((resolve, reject) => {
            stream.on('finish', () => resolve({ filePath, filename }));
            stream.on('error', reject);
        });
    }

    async getPayslipPdfPath(payrollId) {
        const payroll = await this.getPayrollById(payrollId);
        if (!payroll) {
            throw new Error('Payroll not found');
        }

        const formatDate = (d) => {
            const date = new Date(d);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };
        const filename = `payslip_${payroll.employee_id}_${formatDate(payroll.date_start)}_to_${formatDate(payroll.date_end)}.pdf`;
        const filePath = path.join('C:/Users/ADMIN/Documents/uploads/payslips', filename);

        if (!fs.existsSync(filePath)) {
            throw new Error('PDF not found');
        }

        return { filePath, filename };
    }

    async deletePayroll(payrollId) {
        const payroll = await this.getPayrollById(payrollId);
        if (!payroll) {
            throw new Error('Payroll not found');
        }

        const formatDate = (d) => {
            const date = new Date(d);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };
        const filename = `payslip_${payroll.employee_id}_${formatDate(payroll.date_start)}_to_${formatDate(payroll.date_end)}.pdf`;
        const filePath = path.join('C:/Users/ADMIN/Documents/uploads/payslips', filename);

        await this.db.query('DELETE FROM batch_payroll_items WHERE payroll_id = $1', [payrollId]);
        await this.db.query('DELETE FROM payroll WHERE payroll_id = $1', [payrollId]);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return { success: true };
    }

    async generatePayrollTemplate() {
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet('Payroll Template');
        worksheet.columns = [
            { header: 'employee_id', key: 'employee_id', width: 15 },
            { header: 'date_start', key: 'date_start', width: 15 },
            { header: 'date_end', key: 'date_end', width: 15 },
            { header: 'total_days_worked', key: 'total_days_worked', width: 18 },
            { header: 'total_overtime_hours', key: 'total_overtime_hours', width: 22 },
            { header: 'total_allowance', key: 'total_allowance', width: 18 },
            { header: 'total_leaves_usage', key: 'total_leaves_usage', width: 20 },
            { header: 'regular_holiday', key: 'regular_holiday', width: 18 },
            { header: 'special_holiday', key: 'special_holiday', width: 18 },
            { header: 'total_income_tax', key: 'total_income_tax', width: 18 },
            { header: 'total_sss_payment', key: 'total_sss_payment', width: 20 },
            { header: 'total_sss_loan_payment', key: 'total_sss_loan_payment', width: 24 },
            { header: 'total_philhealth_payment', key: 'total_philhealth_payment', width: 26 },
            { header: 'total_pagibig_payment', key: 'total_pagibig_payment', width: 24 },
            { header: 'total_pagibig_loan_payment', key: 'total_pagibig_loan_payment', width: 28 },
            { header: 'total_cash_loan_deductions', key: 'total_cash_loan_deductions', width: 28 },
            { header: 'total_losses_damages', key: 'total_losses_damages', width: 22 },
            { header: 'net_pay', key: 'net_pay', width: 15 },
            { header: 'status', key: 'status', width: 12 },
            { header: 'created_at', key: 'created_at', width: 20 },
            { header: 'updated_at', key: 'updated_at', width: 20 },
            { header: 'starting_cash_loan', key: 'starting_cash_loan', width: 20 },
            { header: 'ending_cash_loan', key: 'ending_cash_loan', width: 18 },
            { header: 'starting_losses_damages', key: 'starting_losses_damages', width: 26 },
            { header: 'ending_losses_damages', key: 'ending_losses_damages', width: 24 },
            { header: 'gross_pay', key: 'gross_pay', width: 15 },
            { header: 'gross_deduction', key: 'gross_deduction', width: 18 }
        ];

        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).alignment = { horizontal: 'center' };

        const sampleRow = worksheet.addRow({
            employee_id: 'EMP001',
            date_start: '2024-01-01',
            date_end: '2024-01-31',
            total_days_worked: 22,
            total_overtime_hours: 5,
            total_allowance: 1000,
            total_leaves_usage: 0,
            regular_holiday: 0,
            special_holiday: 0,
            total_income_tax: 1500,
            total_sss_payment: 1200,
            total_sss_loan_payment: 500,
            total_philhealth_payment: 400,
            total_pagibig_payment: 200,
            total_pagibig_loan_payment: 300,
            total_cash_loan_deductions: 200,
            total_losses_damages: 0,
            net_pay: 14700,
            status: 'Pending',
            created_at: '2024-02-01 00:00:00',
            updated_at: '2024-02-01 00:00:00',
            starting_cash_loan: 1000,
            ending_cash_loan: 800,
            starting_losses_damages: 0,
            ending_losses_damages: 0,
            gross_pay: 20000,
            gross_deduction: 5300
        });

        sampleRow.eachCell((cell) => {
            cell.alignment = { horizontal: 'center' };
        });

        const employeeSheet = workbook.addWorksheet('Active Employees');
        employeeSheet.columns = [
            { header: 'employee_id', key: 'employee_id', width: 15 },
            { header: 'last_name', key: 'last_name', width: 20 },
            { header: 'first_name', key: 'first_name', width: 20 }
        ];

        employeeSheet.getRow(1).font = { bold: true };
        employeeSheet.getRow(1).alignment = { horizontal: 'center' };

        const employees = await this.db.query(
            'SELECT employee_id, last_name, first_name FROM employee_profile WHERE employment_status = $1 ORDER BY employee_id',
            ['Active']
        );

        employees.rows.forEach((emp) => {
            const row = employeeSheet.addRow({
                employee_id: emp.employee_id,
                last_name: emp.last_name,
                first_name: emp.first_name
            });
            row.eachCell((cell) => {
                cell.alignment = { horizontal: 'center' };
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }

    async importPayrollsFromExcel(buffer) {
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet('Payroll Template');

        if (!worksheet) {
            throw new Error('Worksheet "Payroll Template" not found in the uploaded file');
        }

        const normalizeEmployeeId = (empId) => {
            const id = String(empId || '').trim();
            const match = id.match(/GefiEmp-?(\d+)/i);
            if (match) {
                return 'GefiEmp-' + String(parseInt(match[1], 10)).padStart(5, '0');
            }
            return id;
        };

        const payrolls = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            const values = row.values;
            const employee_id = values[1];
            if (!employee_id) return;

            payrolls.push({
                employee_id: normalizeEmployeeId(employee_id),
                date_start: values[2] ? new Date(values[2]).toISOString().split('T')[0] : null,
                date_end: values[3] ? new Date(values[3]).toISOString().split('T')[0] : null,
                total_days_worked: values[4] || 0,
                total_overtime_hours: values[5] || 0,
                total_allowance: values[6] || 0,
                total_leaves_usage: values[7] || 0,
                regular_holiday: values[8] || 0,
                special_holiday: values[9] || 0,
                total_income_tax: values[10] || 0,
                total_sss_payment: values[11] || 0,
                total_sss_loan_payment: values[12] || 0,
                total_philhealth_payment: values[13] || 0,
                total_pagibig_payment: values[14] || 0,
                total_pagibig_loan_payment: values[15] || 0,
                total_cash_loan_deductions: values[16] || 0,
                total_losses_damages: values[17] || 0,
                net_pay: values[18] || 0,
                status: values[19] || 'Pending',
                created_at: values[20] || null,
                updated_at: values[21] || null,
                starting_cash_loan: values[22] || 0,
                ending_cash_loan: values[23] || 0,
                starting_losses_damages: values[24] || 0,
                ending_losses_damages: values[25] || 0,
                gross_pay: values[26] || 0,
                gross_deduction: values[27] || 0
            });
        });

        if (payrolls.length === 0) {
            throw new Error('No valid payroll data found in the uploaded file');
        }

        for (const payroll of payrolls) {
            await this.db.query(
                `INSERT INTO payroll (
                    employee_id, date_start, date_end, total_days_worked, total_overtime_hours,
                    total_allowance, total_leaves_usage, regular_holiday, special_holiday,
                    total_income_tax, total_sss_payment, total_sss_loan_payment,
                    total_philhealth_payment, total_pagibig_payment, total_pagibig_loan_payment,
                    total_cash_loan_deductions, total_losses_damages, net_pay, status,
                    created_at, updated_at, starting_cash_loan, ending_cash_loan,
                    starting_losses_damages, ending_losses_damages, gross_pay, gross_deduction
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27
                )`,
                [
                    payroll.employee_id,
                    payroll.date_start,
                    payroll.date_end,
                    payroll.total_days_worked,
                    payroll.total_overtime_hours,
                    payroll.total_allowance,
                    payroll.total_leaves_usage,
                    payroll.regular_holiday,
                    payroll.special_holiday,
                    payroll.total_income_tax,
                    payroll.total_sss_payment,
                    payroll.total_sss_loan_payment,
                    payroll.total_philhealth_payment,
                    payroll.total_pagibig_payment,
                    payroll.total_pagibig_loan_payment,
                    payroll.total_cash_loan_deductions,
                    payroll.total_losses_damages,
                    payroll.net_pay,
                    payroll.status,
                    payroll.created_at,
                    payroll.updated_at,
                    payroll.starting_cash_loan,
                    payroll.ending_cash_loan,
                    payroll.starting_losses_damages,
                    payroll.ending_losses_damages,
                    payroll.gross_pay,
                    payroll.gross_deduction
                ]
            );
        }

        return { success: true, imported: payrolls.length };
    }

    async validatePayrollImport(buffer) {
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet('Payroll Template');

        if (!worksheet) {
            return { valid: false, errors: ['Worksheet "Payroll Template" not found in the uploaded file'], summary: { totalRows: 0, validRows: 0, invalidRows: 0 } };
        }

        const errors = [];
        let totalRows = 0;
        let validRows = 0;
        let invalidRows = 0;

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            totalRows++;
            const values = row.values;
            const employee_id = values[1];
            if (!employee_id) return;

            const rowErrors = [];

            if (!employee_id || String(employee_id).trim() === '') {
                rowErrors.push(`Row ${rowNumber}: employee_id is required`);
            }

            const dateStart = values[2];
            const dateEnd = values[3];
            if (!dateStart) {
                rowErrors.push(`Row ${rowNumber}: date_start is required`);
            }
            if (!dateEnd) {
                rowErrors.push(`Row ${rowNumber}: date_end is required`);
            }

            const numericFields = [
                { key: 4, label: 'total_days_worked' },
                { key: 5, label: 'total_overtime_hours' },
                { key: 6, label: 'total_allowance' },
                { key: 7, label: 'total_leaves_usage' },
                { key: 8, label: 'regular_holiday' },
                { key: 9, label: 'special_holiday' },
                { key: 10, label: 'total_income_tax' },
                { key: 11, label: 'total_sss_payment' },
                { key: 12, label: 'total_sss_loan_payment' },
                { key: 13, label: 'total_philhealth_payment' },
                { key: 14, label: 'total_pagibig_payment' },
                { key: 15, label: 'total_pagibig_loan_payment' },
                { key: 16, label: 'total_cash_loan_deductions' },
                { key: 17, label: 'total_losses_damages' },
                { key: 18, label: 'net_pay' },
                { key: 22, label: 'starting_cash_loan' },
                { key: 23, label: 'ending_cash_loan' },
                { key: 24, label: 'starting_losses_damages' },
                { key: 25, label: 'ending_losses_damages' },
                { key: 26, label: 'gross_pay' },
                { key: 27, label: 'gross_deduction' }
            ];

            numericFields.forEach((field) => {
                const value = values[field.key];
                if (value !== undefined && value !== null && String(value).trim() !== '') {
                    const num = Number(value);
                    if (isNaN(num)) {
                        rowErrors.push(`Row ${rowNumber}: ${field.label} must be a number`);
                    }
                }
            });

            if (rowErrors.length > 0) {
                invalidRows++;
                errors.push(...rowErrors);
            } else {
                validRows++;
            }
        });

        return {
            valid: invalidRows === 0,
            errors,
            summary: {
                totalRows,
                validRows,
                invalidRows
            }
        };
    }
}

module.exports = PayrollController;
