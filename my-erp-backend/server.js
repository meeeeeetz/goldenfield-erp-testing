
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
const chickenHaulingRoutes = require('./routes/humanResourceRoutes/chicken-hauling');
const codeOfConductRoutes = require('./routes/humanResourceRoutes/code-of-conduct-routes');
const onboardingDocumentsRoutes = require('./routes/humanResourceRoutes/onboarding-documents-routes');
const uploadRoutes = require('./routes/uploadRoutes');
const userManagementRoutes = require('./routes/userManagementRoutes');
const electricBillRoutes = require('./routes/purchasingRoutes/electricBillRoutes');
const orderFeedsRoutes = require('./routes/purchasingRoutes/order-feeds-routes');
const orderFeedsRepaymentRoutes = require('./routes/purchasingRoutes/order-feeds-repayment-routes');
const eggTraySupplierRoutes = require('./routes/purchasingRoutes/egg-tray-supplier-routes');
const eggTrayTypeRoutes = require('./routes/purchasingRoutes/egg-tray-type-routes');
const orderEggTrayRoutes = require('./routes/purchasingRoutes/order-egg-tray-routes');
const vetSuppliesCategoriesRoutes = require('./routes/purchasingRoutes/vet-supplies-category-routes');
const vetSuppliesRoutes = require('./routes/purchasingRoutes/vet-supplier-routes');
const vetProductsRoutes = require('./routes/purchasingRoutes/vet-product-routes');
const orderVetSuppliesRoutes = require('./routes/purchasingRoutes/order-vet-supplies-routes');
const orderVetSuppliesRepaymentRoutes = require('./routes/purchasingRoutes/order-vet-supplies-repayment-routes');
const vetProductsInventoryRoutes = require('./routes/purchasingRoutes/vet-products-inventory-routes');
const vetSuppliesUseRoutes = require('./routes/purchasingRoutes/vet-supplies-use-routes');
const rtlSuppliersRoutes = require('./routes/purchasingRoutes/rtl-suppliers-routes');
const rtlTypesRoutes = require('./routes/purchasingRoutes/rtl-types-routes');
const orderRtlRoutes = require('./routes/purchasingRoutes/order-rtl-routes');
const orderRtlRepaymentRoutes = require('./routes/purchasingRoutes/order-rtl-repayments-routes');
const miscSuppliersRoutes = require('./routes/purchasingRoutes/misc-suppliers-routes');
const orderMiscRoutes = require('./routes/purchasingRoutes/order-misc-routes');
const orderMiscRepaymentRoutes = require('./routes/purchasingRoutes/order-misc-repayments-routes');
const gasOperatorRoutes = require('./routes/purchasingRoutes/gas-operator-routes');
const loanAccountRoutes = require('./routes/financeRoutes/loan-account-routes');
const loanTransactionRoutes = require('./routes/financeRoutes/loan-transaction-routes');
const expenseRoutes = require('./routes/financeRoutes/expenseRoutes');
const layerBuildingsRoutes = require('./routes/operationRoutes/layer-buildings-routes');
const layerBuildingsCullingRoutes = require('./routes/operationRoutes/layer-buildings-culling-routes');
const pettyCashRoutes = require('./routes/operationRoutes/petty-cash-routes');
const scratchLayerRoutes = require('./routes/operationRoutes/scratch-layer-routes');
const shippingPermitRecipientsRoutes = require('./routes/operationRoutes/shipping-permit-recipients-routes');
const shippingPermitRecipientPapersRoutes = require('./routes/operationRoutes/shipping-permit-recipient-papers-routes');
const shippingPermitRecipientPhotoRoutes = require('./routes/operationRoutes/shipping-permit-recipient-photo-routes');
const shippingPermitLicensesRoutes = require('./routes/operationRoutes/shipping-permit-licenses-routes');
const eggProductsRoutes = require('./routes/operationRoutes/egg-products-routes');
const dailyEggProductionRoutes = require('./routes/operationRoutes/daily-egg-production-routes');



const app = express();
const PORT = process.env.PORT || 5000;

// Global error handler to catch unhandled rejections and JSON parse errors
process.on('unhandledRejection', (err) => {
    console.error('Uncaught Exception:', err);
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Routes
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
app.use('/api/chicken-hauling', chickenHaulingRoutes);
app.use('/api/layer-buildings-reports', layerBuildingsRoutes);
app.use('/api/layer-buildings-culling', layerBuildingsCullingRoutes);
app.use('/api/petty-cash', pettyCashRoutes);
app.use('/api/scratch-layer', scratchLayerRoutes);
app.use('/api/shipping-permit-recipients', shippingPermitRecipientsRoutes);
app.use('/api/shipping-permit-recipient-papers', shippingPermitRecipientPapersRoutes);
app.use('/api/shipping-permit-recipient-photo', shippingPermitRecipientPhotoRoutes);
app.use('/api/shipping-permit-licenses', shippingPermitLicensesRoutes);
app.use('/api/egg-products', eggProductsRoutes);
app.use('/api/daily-egg-production', dailyEggProductionRoutes);
app.use('/api/code-of-conduct', codeOfConductRoutes);
app.use('/api/onboarding-documents', onboardingDocumentsRoutes);
app.use('/api/vet-supplies-categories', vetSuppliesCategoriesRoutes);
app.use('/api/vet-supplies', vetSuppliesRoutes);
app.use('/api/vet-products', vetProductsRoutes);
app.use('/api/order-vet-supplies', orderVetSuppliesRoutes);
app.use('/api/order-vet-supplies-repayment', orderVetSuppliesRepaymentRoutes);
app.use('/api/vet-products-inventory', vetProductsInventoryRoutes);
app.use('/api/vet-supplies-use', vetSuppliesUseRoutes);
app.use('/api/rtl-suppliers', rtlSuppliersRoutes);
app.use('/api/rtl-types', rtlTypesRoutes);
app.use('/api/order-rtl', orderRtlRoutes);
app.use('/api/order-rtl-repayments', orderRtlRepaymentRoutes);
app.use('/api/miscellaneous-suppliers', miscSuppliersRoutes);
app.use('/api/order-misc', orderMiscRoutes);
app.use('/api/order-misc-repayments', orderMiscRepaymentRoutes);
app.use('/api/gas-operators', gasOperatorRoutes);
app.use('/api/loan-accounts', loanAccountRoutes);
app.use('/api/loan-transactions', loanTransactionRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userManagementRoutes);
app.use('/api/electric-bills', electricBillRoutes);
app.use('/api/order-feeds', orderFeedsRoutes);
app.use('/api/order-feeds-repayment', orderFeedsRepaymentRoutes);
app.use('/api/egg-tray-suppliers', eggTraySupplierRoutes);
app.use('/api/egg-tray-types', eggTrayTypeRoutes);
app.use('/api/order-egg-trays', orderEggTrayRoutes);
app.use('/api/vet-supplies-categories', vetSuppliesCategoriesRoutes);
app.use('/api/vet-supplies', vetSuppliesRoutes);
app.use('/api/vet-products', vetProductsRoutes);
app.use('/api/order-vet-supplies', orderVetSuppliesRoutes);
app.use('/api/order-vet-supplies-repayment', orderVetSuppliesRepaymentRoutes);
app.use('/api/vet-products-inventory', vetProductsInventoryRoutes);
app.use('/api/vet-supplies-use', vetSuppliesUseRoutes);

// Note: File uploads now use Supabase Storage
// Static file serving is only for backward compatibility during migration

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..')));
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    }
});

// Express error handler - MUST come AFTER all routes
app.use((err, req, res, next) => {
    if (err) {
        const isJsonError = err.type === 'entity.parse.error' ||
                           err.message?.includes('Unexpected token');
                           
        if (isJsonError) {
            return res.status(400).json({ error: 'Invalid JSON' });
        }
        
        // Default error handler
        console.error(err);
        res.status(err.status || 500).json({
            error: err.message || 'Something went wrong!'
        });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});



