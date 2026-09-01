const pool = require('../../config/database');

class OrderVetSuppliesRepaymentController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getNextRepaymentId() {
        const query = "SELECT MAX(CAST(SUBSTRING(repayment_id FROM '\\d+') AS INTEGER)) as max_num FROM order_vet_supplies_repayment";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'VeSupPayID-' + (maxNum + 1);
    }

    async createRepayment(repaymentData) {
        const { repayment_id, order_id, bank_source, check_number, total } = repaymentData;
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const insertQuery = `
                INSERT INTO order_vet_supplies_repayment 
                (repayment_id, order_id, bank_source, check_number, total) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;
            const result = await client.query(insertQuery, [
                repayment_id,
                order_id,
                bank_source || null,
                check_number || null,
                total
            ]);
            const repayment = result.rows[0];

            const updateQuery = `
                UPDATE order_vet_supplies 
                SET payment_date = $1, 
                    payment_source = $2, 
                    check_number = $3, 
                    status = 'Paid',
                    updated_at = CURRENT_TIMESTAMP
                WHERE order_id = $4
            `;
            await client.query(updateQuery, [
                repayment.created_at,
                bank_source || null,
                check_number || null,
                order_id
            ]);

            await client.query('COMMIT');
            return repayment;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async createBatchRepayments(repayments) {
        const client = await this.db.connect();
        try {
            await client.query('BEGIN');

            const results = [];
            for (const data of repayments) {
                const insertQuery = `
                    INSERT INTO order_vet_supplies_repayment 
                    (repayment_id, order_id, bank_source, check_number, total) 
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *
                `;
                const result = await client.query(insertQuery, [
                    data.repayment_id,
                    data.order_id,
                    data.bank_source || null,
                    data.check_number || null,
                    data.total
                ]);
                const repayment = result.rows[0];

                const updateQuery = `
                    UPDATE order_vet_supplies 
                    SET payment_date = $1, 
                        payment_source = $2, 
                        check_number = $3, 
                        status = 'Paid',
                        updated_at = CURRENT_TIMESTAMP
                    WHERE order_id = $4
                `;
                await client.query(updateQuery, [
                    repayment.created_at,
                    data.bank_source || null,
                    data.check_number || null,
                    data.order_id
                ]);

                results.push(repayment);
            }

            await client.query('COMMIT');
            return results;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getAllRepayments() {
        const query = `
            SELECT r.*, 
                   o.sales_invoice,
                   o.company_id,
                   s.company_name
            FROM order_vet_supplies_repayment r
            LEFT JOIN order_vet_supplies o ON r.order_id = o.order_id
            LEFT JOIN vet_suppliers s ON o.company_id = s.supplier_id
            ORDER BY r.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }
}

module.exports = OrderVetSuppliesRepaymentController;
