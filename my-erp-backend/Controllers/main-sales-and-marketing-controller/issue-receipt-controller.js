class ReceiptIssueController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async createReceiptIssue(receiptData) {
        const { si_number, date, customer, qty, product, total, created_by } = receiptData;
        const query = `
            INSERT INTO receipt_issues 
            (si_number, date, customer, qty, product, total) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            si_number,
            date,
            customer,
            qty,
            product,
            total
        ]);
        
        await this.upsertSummary(si_number, date, customer, total, 'Pending', true, created_by);
        
        return result.rows[0];
    }

    async createReceiptIssuesBatch(receipts, created_by) {
        if (!receipts || receipts.length === 0) return [];
        const values = [];
        const params = [];
        let paramCount = 0;
        
        receipts.forEach((receipt) => {
            paramCount++;
            params.push(receipt.si_number);
            paramCount++;
            params.push(receipt.date);
            paramCount++;
            params.push(receipt.customer);
            paramCount++;
            params.push(receipt.qty);
            paramCount++;
            params.push(receipt.product);
            paramCount++;
            params.push(receipt.total);
            values.push(`($${paramCount - 5}, $${paramCount - 4}, $${paramCount - 3}, $${paramCount - 2}, $${paramCount - 1}, $${paramCount})`);
        });
        
        const query = `
            INSERT INTO receipt_issues 
            (si_number, date, customer, qty, product, total) 
            VALUES ${values.join(', ')}
            RETURNING *
        `;
        const result = await this.db.query(query, params);
        
        const summaryUpdates = new Map();
        receipts.forEach(receipt => {
            if (!summaryUpdates.has(receipt.si_number)) {
                summaryUpdates.set(receipt.si_number, {
                    date: receipt.date,
                    customer: receipt.customer,
                    total: 0,
                    status: 'Pending',
                    posted: true
                });
            }
            summaryUpdates.get(receipt.si_number).total += parseFloat(receipt.total);
        });
        
        for (const [si_number, data] of summaryUpdates) {
            await this.upsertSummary(si_number, data.date, data.customer, data.total, data.status, data.posted, created_by);
        }
        
        return result.rows;
    }

    async getAllReceiptIssues() {
        const query = 'SELECT * FROM receipt_issues ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async getReceiptIssuesBySiNumber(siNumber) {
        const query = 'SELECT * FROM receipt_issues WHERE si_number = $1 ORDER BY id ASC';
        const result = await this.db.query(query, [siNumber]);
        return result.rows;
    }

    async getAggregatedReceipts() {
        const query = `
            SELECT 
                ri.si_number,
                ri.date,
                ri.customer,
                COALESCE(SUM(ri.total), 0) as grand_total,
                COALESCE(MAX(ris.status), 'Pending') as status,
                COALESCE(BOOL_OR(ris.posted), true) as posted,
                MIN(ri.created_at) as created_at,
                MAX(ris.created_by) as created_by
            FROM receipt_issues ri
            LEFT JOIN receipt_issue_summaries ris ON ri.si_number = ris.si_number
            GROUP BY ri.si_number, ri.date, ri.customer
            ORDER BY ri.si_number
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getNextSINumber() {
        const query = "SELECT MAX(CAST(SUBSTRING(si_number FROM 5) AS INTEGER)) as max_si FROM receipt_issue_summaries";
        const result = await this.db.query(query);
        const maxSi = result.rows[0]?.max_si || 0;
        const nextSi = maxSi + 1;
        return `SI# ${String(nextSi).padStart(6, '0')}`;
    }

    async getPendingReceivables() {
        const query = `
            SELECT sub.customer, SUM(sub.actual_total) as receivables
            FROM (
                SELECT si_number, date, customer, SUM(total) as actual_total
                FROM receipt_issues
                GROUP BY si_number, date, customer
            ) sub
            JOIN receipt_issue_summaries ris ON sub.si_number = ris.si_number
            WHERE ris.status = 'Pending'
            GROUP BY sub.customer
            ORDER BY sub.customer
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async voidReceipt(siNumber) {
        const query = 'UPDATE receipt_issue_summaries SET status = $1, posted = FALSE WHERE si_number = $2';
        const result = await this.db.query(query, ['Voided', siNumber]);
        return result.rowCount > 0;
    }

    async getMonthlySales() {
        const query = `
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
        const result = await this.db.query(query);
        return result.rows[0];
    }

    async getWeeklySchedule() {
        const query = 'SELECT * FROM weekly_schedules ORDER BY day_of_week ASC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async saveWeeklySchedule(dayOfWeek, content) {
        const query = `
            INSERT INTO weekly_schedules (day_of_week, content, updated_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP)
            ON CONFLICT (day_of_week)
            DO UPDATE SET content = $2, updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `;
        const result = await this.db.query(query, [dayOfWeek, content]);
        return result.rows[0];
    }

    async saveWeeklyScheduleBatch(scheduleData) {
        if (!scheduleData || scheduleData.length === 0) return [];
        const values = [];
        const params = [];
        let paramCount = 0;
        
        scheduleData.forEach((item) => {
            paramCount++;
            params.push(item.day_of_week);
            paramCount++;
            params.push(item.content);
            values.push(`($${paramCount - 1}, $${paramCount}, CURRENT_TIMESTAMP)`);
        });
        
        const query = `
            INSERT INTO weekly_schedules (day_of_week, content, updated_at)
            VALUES ${values.join(', ')}
            ON CONFLICT (day_of_week)
            DO UPDATE SET content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `;
        const result = await this.db.query(query, params);
        return result.rows;
    }

    getTemplate() {
        const headers = ['si_number', 'date', 'customer', 'qty', 'product', 'total', 'status', 'posted', 'created_at'];
        const sampleRow = ['SI# 000001', '2026-07-19', 'Customer Name', '10', 'Product Name', '1200.00', 'Pending', 'false', '2026-07-19'];
        const csvContent = headers.join(',') + '\n' + sampleRow.join(',') + '\n';
        return csvContent;
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }

    async bulkUploadReceipts(csvText, created_by = null) {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) {
            throw new Error('CSV file is empty or has no data rows');
        }

        const expectedHeaders = ['si_number', 'date', 'customer', 'qty', 'product', 'total', 'status', 'posted', 'created_at'];
        const actualHeaders = this.parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
        
        const headerErrors = [];
        expectedHeaders.forEach((expected, index) => {
            if (actualHeaders[index] !== expected) {
                headerErrors.push(`Column ${index + 1}: expected "${expected}", got "${actualHeaders[index] || 'MISSING'}"`);
            }
        });

        if (headerErrors.length > 0) {
            throw new Error('Invalid CSV headers: ' + headerErrors.join('; '));
        }

        const values = [];
        const params = [];
        let paramCount = 0;
        const errors = [];

        for (let i = 1; i < lines.length; i++) {
            const cols = this.parseCSVLine(lines[i]);
            if (cols.length !== expectedHeaders.length) {
                errors.push(`Row ${i + 1}: expected ${expectedHeaders.length} columns, got ${cols.length}`);
                continue;
            }

            const [si_number, date, customer, qty, product, total, status, posted, created_at] = cols;
            
            if (!si_number || !date || !customer || !product) {
                errors.push(`Row ${i + 1}: missing required fields (si_number, date, customer, product)`);
                continue;
            }

            if (isNaN(parseInt(qty.replace(/,/g, '')))) {
                errors.push(`Row ${i + 1}: qty must be a number`);
                continue;
            }

            if (isNaN(parseFloat(total.replace(/,/g, '')))) {
                errors.push(`Row ${i + 1}: total must be a number`);
                continue;
            }

            if (status && !['Pending', 'Paid', 'Cancelled'].includes(status)) {
                errors.push(`Row ${i + 1}: status must be Pending, Paid, or Cancelled`);
                continue;
            }

            if (posted && !['true', 'false', 'TRUE', 'FALSE', 'True', 'False', '1', '0'].includes(posted)) {
                errors.push(`Row ${i + 1}: posted must be true or false`);
                continue;
            }

            paramCount++;
            params.push(si_number);
            paramCount++;
            params.push(date);
            paramCount++;
            params.push(customer);
            paramCount++;
            params.push(parseInt(qty.replace(/,/g, '')));
            paramCount++;
            params.push(product);
            paramCount++;
            params.push(parseFloat(total.replace(/,/g, '')));
            paramCount++;
            params.push(created_at || date);
            
            values.push(`($${paramCount - 6}, $${paramCount - 5}, $${paramCount - 4}, $${paramCount - 3}, $${paramCount - 2}, $${paramCount - 1}, $${paramCount})`);
        }

        if (errors.length > 0) {
            throw new Error('Validation errors: ' + errors.join('; '));
        }

        if (values.length === 0) {
            throw new Error('No valid rows to insert');
        }

        const query = `
            INSERT INTO receipt_issues 
            (si_number, date, customer, qty, product, total, created_at)
            VALUES ${values.join(', ')}
            RETURNING *
        `;
        const result = await this.db.query(query, params);
        
        const summaryUpdates = new Map();
        for (let i = 1; i < lines.length; i++) {
            const cols = this.parseCSVLine(lines[i]);
            if (cols.length !== expectedHeaders.length) continue;
            
            const [si_number, date, customer, qty, product, total, status, posted] = cols;
            if (!si_number || !date || !customer || !product) continue;
            
            if (!summaryUpdates.has(si_number)) {
                summaryUpdates.set(si_number, {
                    date: date,
                    customer: customer,
                    total: 0,
                    status: status || 'Pending',
                    posted: posted ? posted.toLowerCase() === 'true' || posted === '1' : true
                });
            }
            summaryUpdates.get(si_number).total += parseFloat(total);
        }
        
        for (const [si_number, data] of summaryUpdates) {
            await this.upsertSummary(si_number, data.date, data.customer, data.total, data.status, data.posted, created_by);
        }
        
        return { inserted: result.rows.length, rows: result.rows };
    }

    async upsertSummary(siNumber, date, customer, totalDelta, status = 'Pending', posted = true, created_by = null) {
        const query = `
            INSERT INTO receipt_issue_summaries (si_number, date, customer, grand_total, status, posted, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (si_number)
            DO UPDATE SET 
                grand_total = receipt_issue_summaries.grand_total + $4,
                date = EXCLUDED.date,
                customer = EXCLUDED.customer,
                status = EXCLUDED.status,
                posted = EXCLUDED.posted,
                created_by = COALESCE(EXCLUDED.created_by, receipt_issue_summaries.created_by)
            RETURNING *
        `;
        await this.db.query(query, [siNumber, date, customer, parseFloat(totalDelta), status, posted, created_by]);
    }
}

module.exports = ReceiptIssueController;
