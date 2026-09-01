class CustomerDirectoryController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllCustomers() {
        const query = 'SELECT * FROM customer_list ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result;
    }

    async getCustomerById(customerId) {
        const query = 'SELECT * FROM customer_list WHERE customer_id = $1';
        const result = await this.db.query(query, [customerId]);
        return result;
    }

    async addCustomer(customerData) {
        const { customer_id, company, address, tin_no, contact_name, contact_number, status } = customerData;
        const query = `
            INSERT INTO customer_list 
            (customer_id, company, address, tin_no, contact_name, contact_number, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const result = await this.db.query(query, [customer_id, company, address, tin_no, contact_name, contact_number, status]);
        return result;
    }

    async updateCustomer(customerId, customerData) {
        const { company, address, tin_no, contact_name, contact_number, status } = customerData;
        const query = `
            UPDATE customer_list 
            SET company = $2, address = $3, tin_no = $4, contact_name = $5, contact_number = $6, status = $7 
            WHERE customer_id = $1
        `;
        const result = await this.db.query(query, [customerId, company, address, tin_no, contact_name, contact_number, status]);
        return result;
    }

    async deleteCustomer(customerId) {
        const query = 'DELETE FROM customer_list WHERE customer_id = $1';
        const result = await this.db.query(query, [customerId]);
        return result;
    }

    async getNextCustomerId() {
        const query = 'SELECT customer_id FROM customer_list ORDER BY id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].customer_id;
            const match = lastId.match(/CusID-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1]) + 1;
                return 'CusID-' + String(nextNum).padStart(4, '0');
            }
        }
        return 'CusID-0001';
    }

    async getActiveCustomers() {
        const query = 'SELECT customer_id, company FROM customer_list WHERE status = $1 ORDER BY company ASC';
        const result = await this.db.query(query, ['Active']);
        return result;
    }

    async getTopCustomersByReceipts() {
        const query = `
            SELECT 
                cl.customer_id,
                cl.company,
                COALESCE(SUM(ris.grand_total), 0) as gross_receipts
            FROM customer_list cl
            INNER JOIN receipt_issue_summaries ris ON cl.company = ris.customer
            WHERE cl.status = 'Active'
              AND ris.status != 'Voided'
            GROUP BY cl.customer_id, cl.company
            ORDER BY gross_receipts DESC
            LIMIT 10
        `;
        const result = await this.db.query(query);
        return result.rows;
    }
}

module.exports = CustomerDirectoryController;
