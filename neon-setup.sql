-- Goldenfield ERP - Combined Database Setup
-- Generated for Neon


-- ============================================
-- File: finance-database\finance-accounting-database\accounting-codes-database.sql
-- ============================================


CREATE TABLE IF NOT EXISTS accounting_codes (
    id SERIAL PRIMARY KEY,
    accounting_id VARCHAR(255) NOT NULL UNIQUE,
    accounting_type VARCHAR(255) NOT NULL,
    accounting_code VARCHAR(255) NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: finance-database\finance-bankmanagement-database\bank-account-database.sql
-- ============================================

CREATE TABLE IF NOT EXISTS bank_accounts (
    bank_account_id VARCHAR(50) PRIMARY KEY,
    bank VARCHAR(255) NOT NULL,
    bank_code VARCHAR(50) NOT NULL,
    address TEXT,
    bank_account_number VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active',
    starting_bank_cash DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: finance-database\finance-bankmanagement-database\check-database.sql
-- ============================================

CREATE TABLE IF NOT EXISTS check_database (
    check_transaction_id VARCHAR(50) PRIMARY KEY,
    bank_code VARCHAR(50),
    check_number VARCHAR(50),
    date DATE,
    recipient VARCHAR(255),
    recipient_account VARCHAR(100),
    amount NUMERIC(15, 2) DEFAULT 0,
    remarks TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    link_to_passbook TEXT DEFAULT ''
);
-- ============================================
-- File: finance-database\finance-bankmanagement-database\finance-passbook-statement.sql
-- ============================================

CREATE TABLE IF NOT EXISTS passbook_statements (
    statement_id SERIAL PRIMARY KEY,
    code_book_page VARCHAR(150),
    date DATE,
    debit NUMERIC(15, 2) DEFAULT 0,
    credit NUMERIC(15, 2) DEFAULT 0,
    balance NUMERIC(15, 2) DEFAULT 0,
    link TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: finance-database\finance-expenses-database\expense-categories.sql
-- ============================================

 
CREATE TABLE IF NOT EXISTS expense_categories (
    id SERIAL PRIMARY KEY,
    expense_type VARCHAR(255) NOT NULL UNIQUE,
    remarks TEXT,
    accounting_code VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: finance-expenses-database\expenses.sql
-- ============================================

CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    expense_list_id VARCHAR(50) UNIQUE NOT NULL,
    electric_bill_id VARCHAR(50) UNIQUE,
    date DATE NOT NULL,
    accounting_code VARCHAR(50) NOT NULL DEFAULT '5130',
    expense_type VARCHAR(255) NOT NULL DEFAULT 'Direct Utilities & Energy',
    description TEXT,
    remarks TEXT,
    total_amount DECIMAL(12, 2) DEFAULT 0,
    account_source VARCHAR(255),
    cleared_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\code-of-conduct\code-of-conduct.sql
-- ============================================

-- Code of Conduct table
CREATE TABLE IF NOT EXISTS code_of_conduct (
    coc_id SERIAL PRIMARY KEY,
    coc_code VARCHAR(50) UNIQUE NOT NULL DEFAULT 'COCID-0000001',
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    remarks TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resource-attendance-log\human-resource-attendance.sql
-- ============================================

-- Drop existing table if needed (optional)
-- DROP TABLE IF EXISTS attendance_log;
-- ============================================
-- File: human-resources-database\human-resource-cash-advance\cash-advance-repayment.sql
-- ============================================

-- Cash Advance Repayment table
CREATE TABLE IF NOT EXISTS cash_advance_repayment (
    cashadvance_repayment_id VARCHAR(50) PRIMARY KEY,
    cashadvance_id VARCHAR(50) NOT NULL,
    payroll_cycle_id VARCHAR(50),
    amount_paid DECIMAL(12,2),
    paid_at VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resource-cash-advance\cash-advance.sql
-- ============================================

-- Cash Advance table
CREATE TABLE IF NOT EXISTS cash_advance (
    cashadvance_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    ca_amount DECIMAL(12,2) NOT NULL,
    reason VARCHAR(255),
    no_of_payroll_cycle INT NOT NULL,
    installment_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'unpaid',
    created_by VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resource-cash-advance\lossesdamages.sql
-- ============================================

-- Loss/Damage table
CREATE TABLE IF NOT EXISTS loss_damage (
    lossdamage_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    loss_damage_amount DECIMAL(12,2) NOT NULL,
    reason VARCHAR(255),
    no_of_payroll_cycle INT NOT NULL,
    installment_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'unpaid',
    created_by VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resource-holiday\holiday.sql
-- ============================================

-- Holiday table
CREATE TABLE IF NOT EXISTS holiday (
    holiday_id VARCHAR(50) PRIMARY KEY,
    holiday_name VARCHAR(255) NOT NULL,
    date_of_holiday DATE NOT NULL,
    type_of_holiday VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resource-leave-log\leave_log.sql
-- ============================================

-- Leave Log table
CREATE TABLE IF NOT EXISTS leave_log (
    leave_id VARCHAR(20) PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL,
    last_name VARCHAR(100),
    first_name VARCHAR(100),
    date DATE NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    total_days NUMERIC,
    remarks VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    created_by VARCHAR(100),
    approved_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resource-offenses\offense-documents.sql
-- ============================================

-- Offense Documents table
CREATE TABLE IF NOT EXISTS offense_documents (
    doc_id SERIAL PRIMARY KEY,
    doc_type VARCHAR(50) UNIQUE NOT NULL,
    html_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resource-onboarding-documents\onboarding-documents.sql
-- ============================================

-- Onboarding Documents table
CREATE TABLE IF NOT EXISTS onboarding_documents (
    doc_id SERIAL PRIMARY KEY,
    doc_type VARCHAR(50) UNIQUE NOT NULL,
    html_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resource-overtime-log\human-resource-overtime-log.sql
-- ============================================

-- Drop existing table if needed (optional)
-- DROP TABLE IF EXISTS overtime_log;
-- ============================================
-- File: human-resources-database\human-resource-payroll\payroll.sql
-- ============================================

-- Payroll table
CREATE TABLE IF NOT EXISTS payroll (
    payroll_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    total_days_worked DECIMAL(12,2) DEFAULT 0,
    total_overtime_hours DECIMAL(12,2) DEFAULT 0,
    total_allowance DECIMAL(12,2) DEFAULT 0,
    total_leaves_usage DECIMAL(12,2) DEFAULT 0,
    regular_holiday DECIMAL(12,2) DEFAULT 0,
    special_holiday DECIMAL(12,2) DEFAULT 0,
    total_income_tax DECIMAL(12,2) DEFAULT 0,
    total_sss_payment DECIMAL(12,2) DEFAULT 0,
    total_sss_loan_payment DECIMAL(12,2) DEFAULT 0,
    total_philhealth_payment DECIMAL(12,2) DEFAULT 0,
    total_pagibig_payment DECIMAL(12,2) DEFAULT 0,
    total_pagibig_loan_payment DECIMAL(12,2) DEFAULT 0,
    total_cash_loan_deductions DECIMAL(12,2) DEFAULT 0,
    total_losses_damages DECIMAL(12,2) DEFAULT 0,
    net_pay DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resource-scheduling\employee-schedule.sql
-- ============================================

DROP TABLE IF EXISTS employee_schedule;
-- ============================================
-- File: human-resources-database\human-resource-scheduling\human-resource-shift-policy.sql
-- ============================================

-- Drop view if exists (to allow clean re-run)
DROP VIEW IF EXISTS public.shift_policy_with_unit_name;
-- ============================================
-- File: human-resources-database\human-resources-employee-details\employee-compensation.sql
-- ============================================

-- Employee Compensation table
CREATE TABLE IF NOT EXISTS employee_compensation (
    compensation_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    salary_pay_mode VARCHAR(50) NOT NULL,
    salary_amount DECIMAL(12,2),
    allowance_pay_mode VARCHAR(50),
    allowance_amount DECIMAL(12,2),
    pay_frequency VARCHAR(50) NOT NULL,
    payout_method VARCHAR(50) NOT NULL,
    department VARCHAR(255),
    role VARCHAR(255),
    yearly_sick_leave INT,
    yearly_vacation_leave INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\human-resources-employee-details\employee-profile.sql
-- ============================================

-- Employee Profile table
CREATE TABLE IF NOT EXISTS employee_profile (
    employee_id VARCHAR(50) PRIMARY KEY,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    address TEXT NOT NULL,
    contact_details VARCHAR(50) NOT NULL,
    email_address VARCHAR(255),
    birthdate DATE NOT NULL,
    gender VARCHAR(50) NOT NULL,
    civil_status VARCHAR(50) NOT NULL,
    emergency_contact VARCHAR(255) NOT NULL,
    emergency_contact_number VARCHAR(50) NOT NULL,
    date_of_hire DATE,
    employment_status VARCHAR(50),
    department VARCHAR(50),
    job_title VARCHAR(255),
    sss_number VARCHAR(50),
    philhealth_number VARCHAR(50),
    pagibig_number VARCHAR(50),
    tin_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\manage-organizational-database\organizational-role-database.sql
-- ============================================

-- Organizational Roles table
CREATE TABLE IF NOT EXISTS organizational_roles (
    role_id VARCHAR(50) PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    org_unit VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\manage-organizational-database\organizational-structure-today.sql
-- ============================================

-- Organizational Structure table
CREATE TABLE IF NOT EXISTS organizational_structure (
    org_unit_role_id VARCHAR(50) PRIMARY KEY,
    org_unit_id VARCHAR(50) NOT NULL,
    org_unit_name VARCHAR(255),
    role_title VARCHAR(255) NOT NULL,
    parent_id VARCHAR(50),
    employee_assigned VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\manage-organizational-database\organizational-unit-database.sql
-- ============================================

-- Organizational Units table
CREATE TABLE IF NOT EXISTS organizational_units (
    org_unit_id VARCHAR(50) PRIMARY KEY,
    unit_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: human-resources-database\manage-organizational-database\organiztional-unit-database.sql
-- ============================================



-- ============================================
-- File: purchasing-database\egg-tray-suppliers.sql
-- ============================================

CREATE TABLE IF NOT EXISTS egg_tray_suppliers (
    id SERIAL PRIMARY KEY,
    supplier_id VARCHAR(50) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    address TEXT,
    tin_number VARCHAR(20),
    contact_person VARCHAR(255),
    contact_number VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\egg-tray-types.sql
-- ============================================

CREATE TABLE IF NOT EXISTS egg_tray_types (
    id SERIAL PRIMARY KEY,
    type_id VARCHAR(50) UNIQUE NOT NULL,
    supplier_id VARCHAR(50) NOT NULL,
    price_per_piece DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    remarks TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\electric-bills.sql
-- ============================================

CREATE TABLE IF NOT EXISTS electric_bills (
    id SERIAL PRIMARY KEY,
    electric_bill_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    billing_start DATE NOT NULL,
    billing_end DATE NOT NULL,
    demand DECIMAL(10, 2),
    kwh DECIMAL(10, 2),
    rate_per_kwh DECIMAL(10, 2),
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_by INTEGER,
    payment_date DATE,
    payment_source VARCHAR(255),
    check_number VARCHAR(100),
    file_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\feed-types.sql
-- ============================================

CREATE TABLE IF NOT EXISTS feed_types (
    id SERIAL PRIMARY KEY,
    feed_type_id VARCHAR(50) UNIQUE NOT NULL,
    supplier_id VARCHAR(50) NOT NULL ,
    feed_type VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    remarks TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\feeds-suppliers.sql
-- ============================================

CREATE TABLE IF NOT EXISTS feeds_suppliers (
    id SERIAL PRIMARY KEY,
    supplier_id VARCHAR(50) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    address TEXT,
    tin_number VARCHAR(20),
    contact_person VARCHAR(255),
    contact_number VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\misc-suppliers.sql
-- ============================================

CREATE TABLE IF NOT EXISTS misc_suppliers (
    id SERIAL PRIMARY KEY,
    supplier_id VARCHAR(50) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    address TEXT,
    tin_number VARCHAR(20),
    contact_person VARCHAR(255),
    contact_number VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\order-egg-tray.sql
-- ============================================

CREATE TABLE IF NOT EXISTS order_egg_trays (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    supplier_id VARCHAR(50) NOT NULL,
    type_id VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    invoice VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    payment_date DATE,
    payment_source VARCHAR(100),
    check_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\order-feeds.sql
-- ============================================

CREATE TABLE IF NOT EXISTS order_feeds (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    due_date DATE NOT NULL,
    supplier_id VARCHAR(50) NOT NULL ,
    sales_invoice VARCHAR(255),
    feed_type_id VARCHAR(50) NOT NULL ,
    quantity DECIMAL(12,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(14,2) NOT NULL,
    receipt_path VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    rebate_status VARCHAR(20) NOT NULL DEFAULT 'Unclaimed',
    payment_date DATE,
    payment_source VARCHAR(255),
    check_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\order-misc-repayments.sql
-- ============================================

CREATE TABLE IF NOT EXISTS order_misc_repayments (
    id SERIAL PRIMARY KEY,
    repayment_id VARCHAR(50) UNIQUE NOT NULL,
    order_id VARCHAR(50) NOT NULL,
    payment_type VARCHAR(20) NOT NULL DEFAULT 'Partial',
    payment_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    starting_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    remaining_balance NUMERIC(12,2) NOT NULL DEFAULT 0,
    bank_source VARCHAR(255),
    check_number VARCHAR(100),
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\order-misc.sql
-- ============================================

CREATE TABLE IF NOT EXISTS order_misc (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    sales_invoice VARCHAR(255),
    customer VARCHAR(255),
    customer_name VARCHAR(255),
    expense_code VARCHAR(255),
    expense_type VARCHAR(255),
    grand_total NUMERIC(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    payment_date DATE,
    payment_source TEXT,
    check_number TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\order-rtl-repayments.sql
-- ============================================

CREATE TABLE IF NOT EXISTS order_rtl_repayments (
    id SERIAL PRIMARY KEY,
    repayment_id VARCHAR(50) UNIQUE NOT NULL,
    order_id VARCHAR(50) NOT NULL,
    payment_type VARCHAR(20) NOT NULL DEFAULT 'Partial',
    payment_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    starting_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    remaining_balance NUMERIC(12,2) NOT NULL DEFAULT 0,
    bank_source VARCHAR(255),
    check_number VARCHAR(100),
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\order-rtl.sql
-- ============================================

CREATE TABLE IF NOT EXISTS order_rtl (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    company VARCHAR(255) NOT NULL,
    sales_invoice VARCHAR(255),
    grand_total NUMERIC(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    payment_date DATE,
    payment_source TEXT,
    check_number TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\order-vet-supplies-repayment.sql
-- ============================================

CREATE TABLE IF NOT EXISTS order_vet_supplies_repayment (
    id SERIAL PRIMARY KEY,
    repayment_id VARCHAR(50) UNIQUE NOT NULL,
    order_id VARCHAR(50) NOT NULL,
    bank_source VARCHAR(255),
    check_number VARCHAR(100),
    total DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\order-vet-supplies.sql
-- ============================================

CREATE TABLE IF NOT EXISTS order_vet_supplies (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    sales_invoice VARCHAR(100),
    company_id VARCHAR(50) NOT NULL,
    product_item_code VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    package_size VARCHAR(50),
    unit VARCHAR(50),
    unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    free_units INTEGER NOT NULL DEFAULT 0,
    discount VARCHAR(10) NOT NULL DEFAULT '0%',
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    file_path TEXT,
    payment_date DATE,
    payment_source VARCHAR(100),
    check_number VARCHAR(100),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\rtl-suppliers.sql
-- ============================================

CREATE TABLE IF NOT EXISTS rtl_suppliers (
    id SERIAL PRIMARY KEY,
    supplier_id VARCHAR(50) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    address TEXT,
    tin_number VARCHAR(20),
    contact_person VARCHAR(255),
    contact_number VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\rtl-types.sql
-- ============================================

CREATE TABLE IF NOT EXISTS rtl_types (
    id SERIAL PRIMARY KEY,
    type_id VARCHAR(50) UNIQUE NOT NULL,
    company VARCHAR(255) NOT NULL,
    item VARCHAR(255) NOT NULL,
    remarks TEXT,
    price NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\vet-products-inventory.sql
-- ============================================

CREATE TABLE IF NOT EXISTS vet_products_inventory (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    item VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    unit VARCHAR(50),
    quantity INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\vet-products.sql
-- ============================================

CREATE TABLE IF NOT EXISTS vet_products (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    supplier_id VARCHAR(50) NOT NULL,
    item VARCHAR(255) NOT NULL,
    generic_name VARCHAR(255),
    category VARCHAR(255) NOT NULL,
    package_size VARCHAR(50),
    unit VARCHAR(50) NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    discount VARCHAR(10) NOT NULL DEFAULT '0%',
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    dosage_preventive_value DECIMAL(10,2),
    dosage_preventive_unit VARCHAR(50),
    dosage_preventive_water VARCHAR(50),
    dosage_treatment_value DECIMAL(10,2),
    dosage_treatment_unit VARCHAR(50),
    dosage_treatment_water VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\vet-suppliers.sql
-- ============================================

CREATE TABLE IF NOT EXISTS vet_suppliers (
    id SERIAL PRIMARY KEY,
    supplier_id VARCHAR(50) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    address TEXT,
    tin_number VARCHAR(20),
    contact_person VARCHAR(255),
    contact_number VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\vet-supplies-categories.sql
-- ============================================

CREATE TABLE IF NOT EXISTS vet_supplies_categories (
    id SERIAL PRIMARY KEY,
    category_id VARCHAR(50) UNIQUE NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: purchasing-database\vet-supplies-use.sql
-- ============================================

CREATE TABLE IF NOT EXISTS vet_supplies_use (
    id SERIAL PRIMARY KEY,
    use_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    building VARCHAR(255) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    item VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    unit VARCHAR(50),
    quantity INTEGER NOT NULL DEFAULT 0,
    prepared_by VARCHAR(255),
    use_time TIME,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-customer-directory-database\customer-directory.sql
-- ============================================

CREATE TABLE customer_list (
    id SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) UNIQUE NOT NULL,
    company VARCHAR(255) NOT NULL,
    address TEXT,
    tin_no VARCHAR(20),
    contact_name VARCHAR(255),
    contact_number VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-product-and-pricing-database\product-and-pricing-price-changes.sql
-- ============================================

CREATE TABLE price_changes (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    customer VARCHAR(255) NOT NULL,
    product VARCHAR(255) NOT NULL,
    old_price DECIMAL(10,2) NOT NULL,
    new_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-product-and-pricing-database\product-and-pricing-product-list.sql
-- ============================================

CREATE TABLE product_list (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    product VARCHAR(255) NOT NULL,
    remarks TEXT,
    no_of_eggs INT DEFAULT 0,
    egg_tray_used DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-product-and-pricing-database\product-and-pricing-viewlist\customer-price-today.sql
-- ============================================

DROP VIEW IF EXISTS customer_price_today;
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-product-and-pricing-database\product-and-pricing-viewlist\price-history-chart.sql
-- ============================================

CREATE OR REPLACE VIEW price_history_chart AS
SELECT 
    customer,
    product,
    date,
    old_price,
    new_price
FROM price_changes
ORDER BY date ASC, customer ASC, product ASC;
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-receipt-Issuance-database\receipt-issue-database.sql
-- ============================================

CREATE TABLE IF NOT EXISTS receipt_issues (
    id SERIAL PRIMARY KEY,
    si_number VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    customer VARCHAR(255) NOT NULL,
    qty INTEGER NOT NULL,
    product VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-receipt-Issuance-database\receipt-issue-summaries.sql
-- ============================================

CREATE TABLE IF NOT EXISTS receipt_issue_summaries (
    si_number VARCHAR(50) PRIMARY KEY,
    date DATE NOT NULL,
    customer VARCHAR(255) NOT NULL,
    grand_total DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending',
    posted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-receipt-Issuance-database\weekly-schedule-database.sql
-- ============================================

CREATE TABLE IF NOT EXISTS weekly_schedules (
    id SERIAL PRIMARY KEY,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    content TEXT DEFAULT '',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(day_of_week)
);
-- ============================================
-- File: user-management-database\users.sql
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    must_change_password BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-product-and-pricing-database\product-and-pricing-viewlist\customer-price-today.sql
-- ============================================

DROP VIEW IF EXISTS customer_price_today;
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-product-and-pricing-database\product-and-pricing-viewlist\price-history-chart.sql
-- ============================================

CREATE OR REPLACE VIEW price_history_chart AS
SELECT 
    customer,
    product,
    date,
    old_price,
    new_price
FROM price_changes
ORDER BY date ASC, customer ASC, product ASC;
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-receipt-Issuance-database\receipt-issue-database.sql
-- ============================================

CREATE TABLE IF NOT EXISTS receipt_issues (
    id SERIAL PRIMARY KEY,
    si_number VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    customer VARCHAR(255) NOT NULL,
    qty INTEGER NOT NULL,
    product VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-receipt-Issuance-database\receipt-issue-summaries.sql
-- ============================================

CREATE TABLE IF NOT EXISTS receipt_issue_summaries (
    si_number VARCHAR(50) PRIMARY KEY,
    date DATE NOT NULL,
    customer VARCHAR(255) NOT NULL,
    grand_total DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending',
    posted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- File: sales-and-marketing-database\sales-and-marketing-receipt-Issuance-database\weekly-schedule-database.sql
-- ============================================

CREATE TABLE IF NOT EXISTS weekly_schedules (
    id SERIAL PRIMARY KEY,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    content TEXT DEFAULT '',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(day_of_week)
);
-- ============================================
-- File: user-management-database\users.sql
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    must_change_password BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO expense_categories (expense_type, remarks, accounting_code) VALUES
    ('Salary', 'Employee salaries and wages', 'EXP-001'),
    ('Feeds', 'Animal feeds and supplements', 'EXP-002'),
    ('Flock', 'Poultry flock purchases', 'EXP-003'),
    ('Maintenance', 'Equipment and facility maintenance', 'EXP-004'),
    ('Construction', 'Building and infrastructure', 'EXP-005'),
    ('Office', 'Office supplies and expenses', 'EXP-006'),
    ('Legal and Accountant', 'Legal and accounting services', 'EXP-007'),
    ('Veterinary', 'Veterinary services and medicines', 'EXP-008'),
    ('Egg Tray', 'Egg trays and packaging materials', 'EXP-009'),
    ('Utilities', 'Electricity, water, and other utilities', 'EXP-010'),
    ('Others', 'Other miscellaneous expenses', 'EXP-011')
ON CONFLICT (expense_type) DO NOTHING;
CREATE TABLE attendance_log (
    attendance_id VARCHAR(20) PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time_in TIME,
    first_coffee_break_in TIME,
    first_coffee_break_out TIME,
    mid_day_break_in TIME,
    mid_day_break_out TIME,
    second_coffee_break_in TIME,
    second_coffee_break_out TIME,
    time_out TIME,
    total_hours NUMERIC,
    total_late_minutes NUMERIC,
    total_early_out_minutes NUMERIC,
    total_deductable_time NUMERIC,
    actual_payable_hours NUMERIC,
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_by VARCHAR(100),
    status VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER trigger_set_attendance_id
    BEFORE INSERT ON attendance_log
    FOR EACH ROW
    EXECUTE FUNCTION set_attendance_id();
CREATE TRIGGER trigger_update_attendance_updated_at
    BEFORE UPDATE ON attendance_log
    FOR EACH ROW
    EXECUTE FUNCTION update_attendance_updated_at();
CREATE TRIGGER trigger_set_cashadvance_repayment_id
    BEFORE INSERT ON cash_advance_repayment
    FOR EACH ROW
    EXECUTE FUNCTION set_cashadvance_repayment_id();
CREATE TRIGGER trigger_set_cashadvance_id
    BEFORE INSERT ON cash_advance
    FOR EACH ROW
    EXECUTE FUNCTION set_cashadvance_id();
CREATE TRIGGER trigger_set_cashadvance_created_by
    BEFORE INSERT ON cash_advance
    FOR EACH ROW
    EXECUTE FUNCTION set_cashadvance_created_by();
CREATE TRIGGER trigger_set_lossdamage_id
    BEFORE INSERT ON loss_damage
    FOR EACH ROW
    EXECUTE FUNCTION set_lossdamage_id();
CREATE TRIGGER trigger_set_lossdamage_created_by
    BEFORE INSERT ON loss_damage
    FOR EACH ROW
    EXECUTE FUNCTION set_lossdamage_created_by();
CREATE TRIGGER trigger_set_holiday_id
    BEFORE INSERT ON holiday
    FOR EACH ROW
    EXECUTE FUNCTION set_holiday_id();
CREATE TRIGGER trigger_set_leave_id
    BEFORE INSERT ON leave_log
    FOR EACH ROW
    EXECUTE FUNCTION set_leave_id();
CREATE TRIGGER trigger_update_leave_updated_at
    BEFORE UPDATE ON leave_log
    FOR EACH ROW
    EXECUTE FUNCTION update_leave_updated_at();
CREATE TABLE overtime_log (
    overtime_id VARCHAR(20) PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time_in TIME NOT NULL,
    time_out TIME NOT NULL,
    total_hours NUMERIC,
    remarks VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_by VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER trigger_set_overtime_id
    BEFORE INSERT ON overtime_log
    FOR EACH ROW
    EXECUTE FUNCTION set_overtime_id();
CREATE TRIGGER trigger_update_overtime_updated_at
    BEFORE UPDATE ON overtime_log
    FOR EACH ROW
    EXECUTE FUNCTION update_overtime_updated_at();
CREATE TRIGGER trigger_set_payroll_id
    BEFORE INSERT ON payroll
    FOR EACH ROW
    EXECUTE FUNCTION set_payroll_id();
CREATE TRIGGER trigger_update_payroll_updated_at
    BEFORE UPDATE ON payroll
    FOR EACH ROW
    EXECUTE FUNCTION update_payroll_updated_at();
CREATE TABLE employee_schedule (
    schedule_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    org_unit VARCHAR(100) NOT NULL,
    schedule_date DATE NOT NULL,
    half_month VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS yearly_vacation_leave INT;
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS sss_contribution_amount DECIMAL(12,2);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS sss_loan_payment_mode VARCHAR(50);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS sss_loan_amount DECIMAL(12,2);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS philhealth_contribution_mode VARCHAR(50);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS philhealth_contribution_amount DECIMAL(12,2);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS pagibig_contribution_mode VARCHAR(50);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS pagibig_contribution_amount DECIMAL(12,2);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS pagibig_loan_payment_mode VARCHAR(50);
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS pagibig_loan_amount DECIMAL(12,2);
CREATE TABLE IF NOT EXISTS order_misc_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    item VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit VARCHAR(50) DEFAULT 'Unit',
    price NUMERIC(12,2) NOT NULL DEFAULT 0,
    remarks TEXT,
    amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS order_rtl_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    item VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit VARCHAR(50) DEFAULT 'Heads',
    price NUMERIC(12,2) NOT NULL DEFAULT 0,
    total_price NUMERIC(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE customer_price_today (id SERIAL PRIMARY KEY,
                                             customer VARCHAR(255) NOT NULL,
                                                                   product VARCHAR(255) NOT NULL,
                                                                                        price DECIMAL(10, 2) NOT NULL,
                                                                                                             last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                            UNIQUE(customer, product));
CREATE TABLE IF NOT EXISTS receipt_issue_summaries (
    si_number VARCHAR(50) PRIMARY KEY,
    date DATE NOT NULL,
    customer VARCHAR(255) NOT NULL,
    grand_total DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending',
    posted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
) AS INTEGER)), 0) + 1 INTO next_id FROM price_changes;
END;
$ LANGUAGE plpgsql;
INSERT INTO price_changes (transaction_id, date, customer, product, old_price, new_price, created_at)
SELECT get_next_price_change_transaction_id(), d.date, 'Cha-cha Eggs Wholesaling', 'J - Tray', d.old_price, d.new_price, d.date::timestamp
FROM (
    VALUES
    ('2025-11-12'::DATE, 2500.00, 2520.00),
    ('2025-12-10'::DATE, 2520.00, 2480.00),
    ('2025-12-25'::DATE, 2480.00, 2750.00),
    ('2026-01-02'::DATE, 2750.00, 2900.00),
    ('2026-01-15'::DATE, 2900.00, 2050.00),
    ('2026-01-28'::DATE, 2050.00, 2100.00),
    ('2026-02-05'::DATE, 2100.00, 2200.00),
    ('2026-02-18'::DATE, 2200.00, 2350.00),
    ('2026-02-27'::DATE, 2350.00, 3300.00),
    ('2026-03-01'::DATE, 3300.00, 2400.00),
    ('2025-03-25'::DATE, 2400.00, 1750.00),
    ('2026-04-02'::DATE, 1750.00, 1900.00),
    ('2026-04-15'::DATE, 1900.00, 2050.00),
    ('2026-05-28'::DATE, 2050.00, 2100.00),
    ('2026-06-05'::DATE, 2100.00, 2200.00),
    ('2026-07-18'::DATE, 2200.00, 3350.00),
    ('2026-07-27'::DATE, 3350.00, 1300.00),
    ('2026-08-01'::DATE, 1300.00, 3000.00)
) AS d(date, old_price, new_price);
CREATE TABLE customer_price_today (id SERIAL PRIMARY KEY,
                                             customer VARCHAR(255) NOT NULL,
                                                                   product VARCHAR(255) NOT NULL,
                                                                                        price DECIMAL(10, 2) NOT NULL,
                                                                                                             last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                            UNIQUE(customer, product));
CREATE TABLE IF NOT EXISTS receipt_issue_summaries (
    si_number VARCHAR(50) PRIMARY KEY,
    date DATE NOT NULL,
    customer VARCHAR(255) NOT NULL,
    grand_total DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending',
    posted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_bank_code ON bank_accounts(bank_code);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_status ON bank_accounts(status);
CREATE INDEX IF NOT EXISTS idx_check_database_bank_code ON check_database(bank_code);
CREATE INDEX IF NOT EXISTS idx_check_database_date ON check_database(date);
CREATE INDEX IF NOT EXISTS idx_check_database_status ON check_database(status);
CREATE INDEX IF NOT EXISTS idx_passbook_statements_date ON passbook_statements(date);
CREATE INDEX IF NOT EXISTS idx_passbook_statements_code_book_page ON passbook_statements(code_book_page);
CREATE INDEX IF NOT EXISTS idx_expenses_expense_list_id ON expenses(expense_list_id);
CREATE INDEX IF NOT EXISTS idx_expenses_electric_bill_id ON expenses(electric_bill_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_status ON expenses(status);
CREATE INDEX idx_holiday_type ON holiday(type_of_holiday);
CREATE INDEX IF NOT EXISTS idx_offense_documents_doc_type ON offense_documents(doc_type);
CREATE INDEX IF NOT EXISTS idx_onboarding_documents_doc_type ON onboarding_documents(doc_type);
CREATE INDEX idx_payroll_date_start ON payroll(date_start);
CREATE INDEX idx_payroll_date_end ON payroll(date_end);
CREATE INDEX idx_payroll_status ON payroll(status);
CREATE INDEX IF NOT EXISTS idx_employee_schedule_org_unit ON employee_schedule(org_unit);
CREATE INDEX IF NOT EXISTS idx_employee_schedule_schedule_date ON employee_schedule(schedule_date);
CREATE INDEX IF NOT EXISTS idx_employee_schedule_employee_id ON employee_schedule(employee_id);
CREATE UNIQUE INDEX IF NOT EXISTS uniq_employee_schedule_assignment ON employee_schedule(employee_id, schedule_date, org_unit);
CREATE INDEX IF NOT EXISTS idx_shift_policy_status ON shift_policy(status);
CREATE INDEX IF NOT EXISTS idx_employee_compensation_department ON employee_compensation(department);
CREATE INDEX IF NOT EXISTS idx_employee_compensation_pay_frequency ON employee_compensation(pay_frequency);
CREATE INDEX IF NOT EXISTS idx_employee_compensation_payout_method ON employee_compensation(payout_method);
CREATE INDEX IF NOT EXISTS idx_employee_profile_department ON employee_profile(department);
CREATE INDEX IF NOT EXISTS idx_employee_profile_employment_status ON employee_profile(employment_status);
CREATE INDEX IF NOT EXISTS idx_organizational_roles_status ON organizational_roles(status);
CREATE INDEX IF NOT EXISTS idx_organizational_structure_parent ON organizational_structure(parent_id);
CREATE INDEX IF NOT EXISTS idx_organizational_structure_status ON organizational_structure(status);
CREATE INDEX IF NOT EXISTS idx_egg_tray_suppliers_supplier_id ON egg_tray_suppliers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_egg_tray_suppliers_company_name ON egg_tray_suppliers(company_name);
CREATE INDEX IF NOT EXISTS idx_egg_tray_suppliers_status ON egg_tray_suppliers(status);
CREATE INDEX IF NOT EXISTS idx_egg_tray_types_type_id ON egg_tray_types(type_id);
CREATE INDEX IF NOT EXISTS idx_egg_tray_types_supplier_id ON egg_tray_types(supplier_id);
CREATE INDEX IF NOT EXISTS idx_egg_tray_types_status ON egg_tray_types(status);
CREATE INDEX IF NOT EXISTS idx_electric_bills_id ON electric_bills(electric_bill_id);
CREATE INDEX IF NOT EXISTS idx_electric_bills_date ON electric_bills(date);
CREATE INDEX IF NOT EXISTS idx_electric_bills_status ON electric_bills(status);
CREATE INDEX IF NOT EXISTS idx_feed_types_feed_type_id ON feed_types(feed_type_id);
CREATE INDEX IF NOT EXISTS idx_feed_types_supplier_id ON feed_types(supplier_id);
CREATE INDEX IF NOT EXISTS idx_feed_types_status ON feed_types(status);
CREATE INDEX IF NOT EXISTS idx_feeds_suppliers_supplier_id ON feeds_suppliers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_feeds_suppliers_company_name ON feeds_suppliers(company_name);
CREATE INDEX IF NOT EXISTS idx_feeds_suppliers_status ON feeds_suppliers(status);
CREATE INDEX IF NOT EXISTS idx_misc_suppliers_supplier_id ON misc_suppliers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_misc_suppliers_company_name ON misc_suppliers(company_name);
CREATE INDEX IF NOT EXISTS idx_misc_suppliers_status ON misc_suppliers(status);
CREATE INDEX IF NOT EXISTS idx_order_egg_trays_order_id ON order_egg_trays(order_id);
CREATE INDEX IF NOT EXISTS idx_order_egg_trays_supplier_id ON order_egg_trays(supplier_id);
CREATE INDEX IF NOT EXISTS idx_order_egg_trays_type_id ON order_egg_trays(type_id);
CREATE INDEX IF NOT EXISTS idx_order_egg_trays_status ON order_egg_trays(status);
CREATE INDEX IF NOT EXISTS idx_order_feeds_order_id ON order_feeds(order_id);
CREATE INDEX IF NOT EXISTS idx_order_feeds_supplier_id ON order_feeds(supplier_id);
CREATE INDEX IF NOT EXISTS idx_order_feeds_feed_type_id ON order_feeds(feed_type_id);
CREATE INDEX IF NOT EXISTS idx_order_feeds_status ON order_feeds(status);
CREATE INDEX IF NOT EXISTS idx_order_feeds_date ON order_feeds(date);
CREATE INDEX IF NOT EXISTS idx_order_misc_repayments_repayment_id ON order_misc_repayments(repayment_id);
CREATE INDEX IF NOT EXISTS idx_order_misc_repayments_order_id ON order_misc_repayments(order_id);
CREATE INDEX IF NOT EXISTS idx_order_misc_repayments_date ON order_misc_repayments(date);
CREATE INDEX IF NOT EXISTS idx_order_misc_order_id ON order_misc(order_id);
CREATE INDEX IF NOT EXISTS idx_order_misc_customer ON order_misc(customer);
CREATE INDEX IF NOT EXISTS idx_order_misc_status ON order_misc(status);
CREATE INDEX IF NOT EXISTS idx_order_misc_items_order_id ON order_misc_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_rtl_repayments_repayment_id ON order_rtl_repayments(repayment_id);
CREATE INDEX IF NOT EXISTS idx_order_rtl_repayments_order_id ON order_rtl_repayments(order_id);
CREATE INDEX IF NOT EXISTS idx_order_rtl_repayments_date ON order_rtl_repayments(date);
CREATE INDEX IF NOT EXISTS idx_order_rtl_order_id ON order_rtl(order_id);
CREATE INDEX IF NOT EXISTS idx_order_rtl_company ON order_rtl(company);
CREATE INDEX IF NOT EXISTS idx_order_rtl_status ON order_rtl(status);
CREATE INDEX IF NOT EXISTS idx_order_rtl_items_order_id ON order_rtl_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_repayment_repayment_id ON order_vet_supplies_repayment(repayment_id);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_repayment_order_id ON order_vet_supplies_repayment(order_id);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_order_id ON order_vet_supplies(order_id);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_company_id ON order_vet_supplies(company_id);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_product_item_code ON order_vet_supplies(product_item_code);
CREATE INDEX IF NOT EXISTS idx_order_vet_supplies_status ON order_vet_supplies(status);
CREATE INDEX IF NOT EXISTS idx_rtl_suppliers_supplier_id ON rtl_suppliers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_rtl_suppliers_company_name ON rtl_suppliers(company_name);
CREATE INDEX IF NOT EXISTS idx_rtl_suppliers_status ON rtl_suppliers(status);
CREATE INDEX IF NOT EXISTS idx_rtl_types_type_id ON rtl_types(type_id);
CREATE INDEX IF NOT EXISTS idx_rtl_types_company ON rtl_types(company);
CREATE INDEX IF NOT EXISTS idx_rtl_types_status ON rtl_types(status);
CREATE INDEX IF NOT EXISTS idx_vet_products_inventory_product_id ON vet_products_inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_vet_products_inventory_category ON vet_products_inventory(category);
CREATE INDEX IF NOT EXISTS idx_vet_products_inventory_last_updated ON vet_products_inventory(last_updated);
CREATE INDEX IF NOT EXISTS idx_vet_products_product_id ON vet_products(product_id);
CREATE INDEX IF NOT EXISTS idx_vet_products_supplier_id ON vet_products(supplier_id);
CREATE INDEX IF NOT EXISTS idx_vet_products_category ON vet_products(category);
CREATE INDEX IF NOT EXISTS idx_vet_products_status ON vet_products(status);
CREATE INDEX IF NOT EXISTS idx_vet_suppliers_supplier_id ON vet_suppliers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_vet_suppliers_company_name ON vet_suppliers(company_name);
CREATE INDEX IF NOT EXISTS idx_vet_suppliers_status ON vet_suppliers(status);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_categories_category_id ON vet_supplies_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_categories_category_name ON vet_supplies_categories(category_name);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_use_use_id ON vet_supplies_use(use_id);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_use_date ON vet_supplies_use(date);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_use_building ON vet_supplies_use(building);
CREATE INDEX IF NOT EXISTS idx_vet_supplies_use_product_id ON vet_supplies_use(product_id);
CREATE INDEX idx_customer_list_customer_id ON customer_list(customer_id);
CREATE INDEX idx_price_changes_transaction_id ON price_changes(transaction_id);
CREATE INDEX idx_price_changes_date ON price_changes(date);
CREATE INDEX IF NOT EXISTS idx_customer_price_today_customer ON customer_price_today(customer);
CREATE INDEX IF NOT EXISTS idx_customer_price_today_product ON customer_price_today(product);
CREATE INDEX IF NOT EXISTS idx_receipt_issues_si_number ON receipt_issues(si_number);
CREATE INDEX IF NOT EXISTS idx_receipt_issues_customer ON receipt_issues(customer);
CREATE INDEX IF NOT EXISTS idx_receipt_issues_date ON receipt_issues(date);
CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_customer ON receipt_issue_summaries(customer);
CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_date ON receipt_issue_summaries(date);
CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_customer ON receipt_issue_summaries(customer);
CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_date ON receipt_issue_summaries(date);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_customer_price_today_customer ON customer_price_today(customer);
CREATE INDEX IF NOT EXISTS idx_customer_price_today_product ON customer_price_today(product);
CREATE INDEX IF NOT EXISTS idx_receipt_issues_si_number ON receipt_issues(si_number);
CREATE INDEX IF NOT EXISTS idx_receipt_issues_customer ON receipt_issues(customer);
CREATE INDEX IF NOT EXISTS idx_receipt_issues_date ON receipt_issues(date);
CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_customer ON receipt_issue_summaries(customer);
CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_date ON receipt_issue_summaries(date);
CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_customer ON receipt_issue_summaries(customer);
CREATE INDEX IF NOT EXISTS idx_receipt_issue_summaries_date ON receipt_issue_summaries(date);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
-- Sequence for generating attendance IDs
CREATE SEQUENCE IF NOT EXISTS attendance_log_seq START 1;
-- Function to generate attendance ID in AttLog-000000001 format
CREATE OR REPLACE FUNCTION generate_attendance_id()
RETURNS TEXT AS $$

    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('attendance_log_seq') INTO next_num;
    new_id := 'AttLog-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- Trigger to auto-generate attendance_id on insert
CREATE OR REPLACE FUNCTION set_attendance_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.attendance_id IS NULL THEN
        NEW.attendance_id := generate_attendance_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Index for fast lookups by employee and date
CREATE INDEX idx_attendance_log_employee_date ON attendance_log(employee_id, date);
-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_attendance_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Sequence for generating cash advance repayment IDs
CREATE SEQUENCE IF NOT EXISTS cash_advance_repayment_seq START 1;
-- Function to generate cash advance repayment ID in CaPayID-000000001 format
CREATE OR REPLACE FUNCTION generate_cashadvance_repayment_id()
RETURNS TEXT AS $$

    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('cash_advance_repayment_seq') INTO next_num;
    new_id := 'CaPayID-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- Trigger to auto-generate cashadvance_repayment_id on insert
CREATE OR REPLACE FUNCTION set_cashadvance_repayment_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cashadvance_repayment_id IS NULL THEN
        NEW.cashadvance_repayment_id := generate_cashadvance_repayment_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Index for fast lookups by cash advance
CREATE INDEX idx_cash_advance_repayment_cashadvance_id ON cash_advance_repayment(cashadvance_id);
-- Sequence for generating cash advance IDs
CREATE SEQUENCE IF NOT EXISTS cash_advance_seq START 1;
-- Function to generate cash advance ID in CaID-00000001 format
CREATE OR REPLACE FUNCTION generate_cashadvance_id()
RETURNS TEXT AS $$

    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('cash_advance_seq') INTO next_num;
    new_id := 'CaID-' || LPAD(next_num::TEXT, 8, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- Trigger to auto-generate cashadvance_id on insert
CREATE OR REPLACE FUNCTION set_cashadvance_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cashadvance_id IS NULL THEN
        NEW.cashadvance_id := generate_cashadvance_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Index for fast lookups by employee
CREATE INDEX idx_cash_advance_employee_id ON cash_advance(employee_id);
-- Trigger to update created_by if null
CREATE OR REPLACE FUNCTION set_cashadvance_created_by()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.created_by IS NULL THEN
        NEW.created_by := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Sequence for generating loss/damage IDs
CREATE SEQUENCE IF NOT EXISTS loss_damage_seq START 1;
-- Function to generate loss/damage ID in LoDaID-000000001 format
CREATE OR REPLACE FUNCTION generate_lossdamage_id()
RETURNS TEXT AS $$

    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('loss_damage_seq') INTO next_num;
    new_id := 'LoDaID-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- Trigger to auto-generate lossdamage_id on insert
CREATE OR REPLACE FUNCTION set_lossdamage_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.lossdamage_id IS NULL THEN
        NEW.lossdamage_id := generate_lossdamage_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Index for fast lookups by employee
CREATE INDEX idx_loss_damage_employee_id ON loss_damage(employee_id);
-- Trigger to update created_by if null
CREATE OR REPLACE FUNCTION set_lossdamage_created_by()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.created_by IS NULL THEN
        NEW.created_by := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Sequence for generating holiday IDs
CREATE SEQUENCE IF NOT EXISTS holiday_seq START 1;
-- Function to generate holiday ID in Holiday-000000001 format
CREATE OR REPLACE FUNCTION generate_holiday_id()
RETURNS TEXT AS $$

    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('holiday_seq') INTO next_num;
    new_id := 'Holiday-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- Trigger to auto-generate holiday_id on insert
CREATE OR REPLACE FUNCTION set_holiday_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.holiday_id IS NULL THEN
        NEW.holiday_id := generate_holiday_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Index for fast date lookups
CREATE INDEX idx_holiday_date ON holiday(date_of_holiday);
-- Sequence for generating leave IDs
CREATE SEQUENCE IF NOT EXISTS leave_log_seq START 1;
-- Function to generate leave ID in LeaveLog-000000001 format
CREATE OR REPLACE FUNCTION generate_leave_id()
RETURNS TEXT AS $$

    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('leave_log_seq') INTO next_num;
    new_id := 'LeaveLog-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- Trigger to auto-generate leave_id on insert
CREATE OR REPLACE FUNCTION set_leave_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.leave_id IS NULL THEN
        NEW.leave_id := generate_leave_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Index for fast lookups by employee and date
CREATE INDEX idx_leave_log_employee_date ON leave_log(employee_id, date);
-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_leave_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Sequence for generating overtime IDs
CREATE SEQUENCE IF NOT EXISTS overtime_log_seq START 1;
-- Function to generate overtime ID in OTLog-000000001 format
CREATE OR REPLACE FUNCTION generate_overtime_id()
RETURNS TEXT AS $$

    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('overtime_log_seq') INTO next_num;
    new_id := 'OTLog-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- Trigger to auto-generate overtime_id on insert
CREATE OR REPLACE FUNCTION set_overtime_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.overtime_id IS NULL THEN
        NEW.overtime_id := generate_overtime_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Index for fast lookups by employee and date
CREATE INDEX idx_overtime_log_employee_date ON overtime_log(employee_id, date);
-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_overtime_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Sequence for generating payroll IDs
CREATE SEQUENCE IF NOT EXISTS payroll_seq START 1;
-- Function to generate payroll ID in Payroll-000000001 format
CREATE OR REPLACE FUNCTION generate_payroll_id()
RETURNS TEXT AS $$

    next_num INTEGER;
    new_id TEXT;
BEGIN
    SELECT nextval('payroll_seq') INTO next_num;
    new_id := 'Payroll-' || LPAD(next_num::TEXT, 9, '0');
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;
-- Trigger to auto-generate payroll_id on insert
CREATE OR REPLACE FUNCTION set_payroll_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payroll_id IS NULL THEN
        NEW.payroll_id := generate_payroll_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Indexes for faster lookups
CREATE INDEX idx_payroll_employee_id ON payroll(employee_id);
-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_payroll_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Shift Policy table
CREATE TABLE IF NOT EXISTS shift_policy (
    shift_policy_id VARCHAR(50) PRIMARY KEY,
    shift_name VARCHAR(255) NOT NULL,
    shift_time_start TIME NOT NULL,
    shift_time_end TIME NOT NULL,
    first_coffee_break_start TIME,
    first_coffee_break_end TIME,
    mid_break_start TIME,
    mid_break_end TIME,
    second_coffee_break_start TIME,
    second_coffee_break_end TIME,
    org_unit VARCHAR(50) NOT NULL,
    remarks TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_shift_policy_org_unit ON shift_policy(org_unit);
-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_employee_compensation_employee_id ON employee_compensation(employee_id);
-- Add leave columns if missing
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS yearly_sick_leave INT;
-- Add contribution columns if missing
ALTER TABLE employee_compensation ADD COLUMN IF NOT EXISTS sss_contribution_mode VARCHAR(50);
-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_employee_profile_employee_id ON employee_profile(employee_id);
-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizational_roles_org_unit ON organizational_roles(org_unit);
-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizational_structure_org_unit ON organizational_structure(org_unit_id);
-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizational_units_status ON organizational_units(status);