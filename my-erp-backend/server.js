require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/salesAndMarketingRoutes/productRoutes');
const customerRoutes = require('./routes/salesAndMarketingRoutes/customerRoutes');
const priceChangeRoutes = require('./routes/salesAndMarketingRoutes/priceChangeRoutes');
const issueReceiptRoutes = require('./routes/salesAndMarketingRoutes/issueReceiptRoutes');
const financeBankAccountRoutes = require('./routes/financeRoutes/financeBankAccountRoutes');
const expenseCategoryRoutes = require('./routes/financeRoutes/expenseCategoryRoutes');
const accountingCodeRoutes = require('./routes/financeRoutes/accountingCodeRoutes');
const passbookPhotoRoutes = require('./routes/financeRoutes/passbookPhotoRoutes');
const passbookStatementRoutes = require('./routes/financeRoutes/passbookStatementRoutes');
const checkDatabaseRoutes = require('./routes/financeRoutes/checkDatabaseRoutes');
const organizationalUnitRoutes = require('./routes/humanResourceRoutes/organizational-unit-routes');
const organizationalRoleRoutes = require('./routes/humanResourceRoutes/organizational-role-routes');
const organizationalStructureRoutes = require('./routes/humanResourceRoutes/organizational-structure-routes');
    const employeeProfileRoutes = require('./routes/humanResourceRoutes/employee-profile-routes');
    const shiftPolicyRoutes = require('./routes/humanResourceRoutes/shift-policy-routes');
    const employeeCompensationRoutes = require('./routes/humanResourceRoutes/employee-compensation-routes');
    const attendanceLogRoutes = require('./routes/humanResourceRoutes/attendance-log-routes');
    const overtimeLogRoutes = require('./routes/humanResourceRoutes/overtime-log-routes');
    const leaveLogRoutes = require('./routes/humanResourceRoutes/leave-log-routes');
    const salaryComputationRoutes = require('./routes/humanResourceRoutes/salary-computation-routes');
    const holidayRoutes = require('./routes/humanResourceRoutes/holiday-routes');
    const cashAdvanceRoutes = require('./routes/humanResourceRoutes/cash-advance-routes');
    const cashAdvanceRepaymentRoutes = require('./routes/humanResourceRoutes/cash-advance-repayment-routes');
    const payrollRoutes = require('./routes/humanResourceRoutes/payroll-routes');
    const lossesDamagesRoutes = require('./routes/humanResourceRoutes/lossesdamages');
    const lossesDamagesRepaymentRoutes = require('./routes/humanResourceRoutes/lossesdamages-repayment');
    const batchPayrollRoutes = require('./routes/humanResourceRoutes/batch-payroll');
    const codeOfConductRoutes = require('./routes/humanResourceRoutes/code-of-conduct-routes');
    const onboardingDocumentsRoutes = require('./routes/humanResourceRoutes/onboarding-documents-routes');
    const offensesRoutes = require('./routes/humanResourceRoutes/offenses-routes');
    const schedulingRoutes = require('./routes/humanResourceRoutes/scheduling-routes');
    const pettyCashRoutes = require('./routes/operationRoutes/petty-cash-routes');
    const layerBuildingsRoutes = require('./routes/operationRoutes/layer-buildings-routes');
    const feedsSupplierRoutes = require('./routes/purchasingRoutes/feeds-supplier-routes');
    const feedTypeRoutes = require('./routes/purchasingRoutes/feed-type-routes');
    const feedInventoryRoutes = require('./routes/purchasingRoutes/feed-inventory-routes');
    const orderFeedsRoutes = require('./routes/purchasingRoutes/order-feeds-routes');
    const orderFeedsRepaymentRoutes = require('./routes/purchasingRoutes/order-feeds-repayment-routes');
    const userManagementRoutes = require('./routes/userManagementRoutes');
    const electricBillRoutes = require('./routes/purchasingRoutes/electricBillRoutes');
    const expenseRoutes = require('./routes/financeRoutes/expenseRoutes');
    const eggTraySupplierRoutes = require('./routes/purchasingRoutes/egg-tray-supplier-routes');
    const eggTrayTypeRoutes = require('./routes/purchasingRoutes/egg-tray-type-routes');
    const orderEggTrayRoutes = require('./routes/purchasingRoutes/order-egg-tray-routes');
    const vetSuppliesCategoryRoutes = require('./routes/purchasingRoutes/vet-supplies-category-routes');
    const vetSupplierRoutes = require('./routes/purchasingRoutes/vet-supplier-routes');
    const vetProductRoutes = require('./routes/purchasingRoutes/vet-product-routes');
    const orderVetSuppliesRoutes = require('./routes/purchasingRoutes/order-vet-supplies-routes');
    const orderVetSuppliesRepaymentRoutes = require('./routes/purchasingRoutes/order-vet-supplies-repayment-routes');
    const vetProductsInventoryRoutes = require('./routes/purchasingRoutes/vet-products-inventory-routes');
    const vetSuppliesUseRoutes = require('./routes/purchasingRoutes/vet-supplies-use-routes');
    const rtlSuppliersRoutes = require('./routes/purchasingRoutes/rtl-suppliers-routes');
    const rtlTypesRoutes = require('./routes/purchasingRoutes/rtl-types-routes');
    const orderRtlRoutes = require('./routes/purchasingRoutes/order-rtl-routes');
    const orderRtlRepaymentsRoutes = require('./routes/purchasingRoutes/order-rtl-repayments-routes');
    const miscSuppliersRoutes = require('./routes/purchasingRoutes/misc-suppliers-routes');
    const orderMiscRoutes = require('./routes/purchasingRoutes/order-misc-routes');
    const orderMiscRepaymentsRoutes = require('./routes/purchasingRoutes/order-misc-repayments-routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Global error handler to catch unhandled rejections and JSON parse errors
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/price-changes', priceChangeRoutes);
app.use('/api/receipt-issues', issueReceiptRoutes);
app.use('/api/bank-accounts', financeBankAccountRoutes);
app.use('/api/expense-categories', expenseCategoryRoutes);
app.use('/api/accounting-codes', accountingCodeRoutes);
app.use('/api/passbook-photos', passbookPhotoRoutes);
app.use('/api/passbook-statements', passbookStatementRoutes);
app.use('/api/check-database', checkDatabaseRoutes);
app.use('/api/organizational-units', organizationalUnitRoutes);
app.use('/api/organizational-roles', organizationalRoleRoutes);
app.use('/api/organizational-structure', organizationalStructureRoutes);
app.use('/api/employee-profiles', employeeProfileRoutes);
app.use('/api/shift-policies', shiftPolicyRoutes);
app.use('/api/employee-compensations', employeeCompensationRoutes);
app.use('/api/attendance-logs', attendanceLogRoutes);
app.use('/api/overtime-logs', overtimeLogRoutes);
app.use('/api/leave-logs', leaveLogRoutes);
app.use('/api/salary-computation', salaryComputationRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/cash-advances', cashAdvanceRoutes);
app.use('/api/cash-advance-repayments', cashAdvanceRepaymentRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/loss-damages', lossesDamagesRoutes);
app.use('/api/loss-damage-repayments', lossesDamagesRepaymentRoutes);
app.use('/api/batch-payroll', batchPayrollRoutes);
app.use('/api/code-of-conduct', codeOfConductRoutes);
app.use('/api/onboarding-documents', onboardingDocumentsRoutes);
app.use('/api/offenses', offensesRoutes);
app.use('/api/schedules', schedulingRoutes);
app.use('/api/petty-cash', pettyCashRoutes);
app.use('/api/layer-buildings-reports', layerBuildingsRoutes);
app.use('/api/feeds-suppliers', feedsSupplierRoutes);
app.use('/api/feed-types', feedTypeRoutes);
app.use('/api/feed-inventory', feedInventoryRoutes);
app.use('/api/users', userManagementRoutes);
app.use('/api/electric-bills', electricBillRoutes);
app.use('/api/order-feeds', orderFeedsRoutes);
app.use('/api/order-feeds-repayment', orderFeedsRepaymentRoutes);
app.use('/api/egg-tray-suppliers', eggTraySupplierRoutes);
app.use('/api/egg-tray-types', eggTrayTypeRoutes);
app.use('/api/order-egg-trays', orderEggTrayRoutes);
app.use('/api/vet-supplies-categories', vetSuppliesCategoryRoutes);
app.use('/api/vet-suppliers', vetSupplierRoutes);
app.use('/api/vet-products', vetProductRoutes);
app.use('/api/order-vet-supplies', orderVetSuppliesRoutes);
app.use('/api/order-vet-supplies-repayment', orderVetSuppliesRepaymentRoutes);
app.use('/api/vet-products-inventory', vetProductsInventoryRoutes);
app.use('/api/vet-supplies-use', vetSuppliesUseRoutes);
app.use('/api/rtl-suppliers', rtlSuppliersRoutes);
app.use('/api/rtl-types', rtlTypesRoutes);
app.use('/api/order-rtl', orderRtlRoutes);
app.use('/api/order-rtl-repayments', orderRtlRepaymentsRoutes);
app.use('/api/miscellaneous-suppliers', miscSuppliersRoutes);
app.use('/api/order-misc', orderMiscRoutes);
app.use('/api/order-misc-repayments', orderMiscRepaymentsRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/uploads/passbook-photos', express.static(path.join(__dirname, 'passbook-photos')));
app.use('/uploads/employee-photos', express.static('C:\\Users\\ADMIN\\Documents\\uploads\\photos'));
app.use('/uploads/payslips', express.static('C:\\Users\\ADMIN\\Documents\\uploads\\payslips'));
app.use('/uploads/feeds-receipts', express.static('C:\\Users\\ADMIN\\Documents\\uploads\\Feeds Receipts'));
app.use('/uploads/electric-bills', express.static('C:\\Users\\ADMIN\\Documents\\uploads\\Electric Bill'));
app.use('/uploads/veterinary-supplies', express.static('C:\\Users\\ADMIN\\Documents\\uploads\\Veterinary Supplies'));

// Express error handler - MUST come AFTER all routes
app.use((err, req, res, next) => {
    if (err) {
        const isJsonError = err.type === 'entity.parse.error' ||
                           err.message?.includes('Unexpected token') ||
                           err.message?.includes('JSON');
        if (isJsonError) {
            console.error('JSON Parse Error:', err.message);
            return res.status(400).json({ error: 'Invalid JSON' });
        }
        console.error('Unhandled route error:', err);
        return res.status(500).json({ error: err.message || 'Internal server error' });
    }
    next(err);
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

