if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['purchasing-other-expenses'] = (container) => {
        container.innerHTML = `
            <div class="expenses-layout">
                <div class="header-actions">
                    <h2>Other Expenses</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="open-expense-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Order Miscellaneous Items</span>
                    </button>
                    <button id="pay-misc-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                        <span class="btn-label">Pay Other Expenses</span>
                    </button>
                    <button id="add-misc-supplier-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Miscellaneous Supplier</span>
                    </button>
                </div>
                <div class="tracking-cards-row">
                    <div class="card tracking-card">
                        <h3>Outstanding Balance</h3>
                        <p class="card-sub-label">Pending Payments to Suppliers</p>
                        <div class="card-value-row">
                            <div class="card-value">P 150,000.00</div>
                        </div>
                    </div>
                    <div class="card tracking-card">
                        <h3>Miscellaneous Expenses</h3>
                        <p class="card-sub-label">Monthly miscellaneous Expense</p>
                        <div class="card-value-row">
                            <div class="card-value">P 30,000.00</div>
                            <span class="trend-up">▲ 8%</span>
                        </div>
                        <p class="vs-last-month">VS last month</p>
                    </div>
                </div>
                <div class="vet-bottom-row-2" style="grid-template-columns: 1fr;">
                <div class="card graph-placeholder vet-tracking-card">
                    <h3>Miscellaneous Expense Transaction</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Order Misc ID</th>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Expense Code</th>
                                    <th>Expense Type</th>
                                    <th>Amount</th>
                                    <th>Payment Date</th>
                                    <th>Payment Source</th>
                                    <th>Check Number</th>
                                    <th>Status</th>
                                    <th style="width: 40px;"></th>
                                </tr>
                            </thead>
                            <tbody id="misc-transactions-table-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="misc-transactions-pagination">
                        <button class="page-btn">&laquo; Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">Next &raquo;</button>
                    </div>
                </div>
                <div class="card shipping-box rtl-payments-box" style="width: 100%; margin-top: 15px;">
                    <h3>Miscellaneous Expense Payments</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Repayment ID</th>
                                    <th>Order Misc ID</th>
                                    <th>Payment Type</th>
                                    <th>Payment Amount</th>
                                    <th>Starting Amount</th>
                                    <th>Remaining Balance</th>
                                    <th>Bank Source</th>
                                    <th>Check Number</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th style="width: 40px;"></th>
                                </tr>
                            </thead>
                            <tbody id="misc-payments-table-body">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card graph-placeholder vet-tracking-card">
                    <h3>Miscellaneous Suppliers</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Supplier ID</th>
                                    <th>Company Name</th>
                                    <th>Address</th>
                                    <th>TIN No.</th>
                                    <th>Contact Person</th>
                                    <th>Contact No.</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="misc-suppliers-table-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="misc-suppliers-pagination">
                        <button class="page-btn">&laquo; Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">2</button>
                        <button class="page-btn">3</button>
                        <button class="page-btn">Next &raquo;</button>
                    </div>
                </div>
                </div>
                <div id="misc-suppliers-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Miscellaneous Suppliers Management</h3>
                            <button class="modal-close-btn" id="close-misc-suppliers-modal">&times;</button>
                        </div>
                        <div class="modal-tabs">
                            <button class="modal-tab active" id="tab-create-misc-supplier" onclick="switchMiscSupplierTab('create')">Create New Supplier</button>
                            <button class="modal-tab" id="tab-edit-misc-supplier" onclick="switchMiscSupplierTab('edit')">Edit Supplier</button>
                        </div>
                        <div id="panel-create-misc-supplier" class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Miscellaneous Suppliers ID</label>
                                <input type="text" id="create-misc-supplier-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company Name</label>
                                    <input type="text" id="create-misc-company-name" placeholder="Enter company name" />
                                </div>
                                <div class="modal-field">
                                    <label>Address</label>
                                    <input type="text" id="create-misc-address" placeholder="Enter address" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>TIN Number</label>
                                    <input type="text" id="create-misc-tin-number" placeholder="TIN Number" maxlength="20" />
                                </div>
                                <div class="modal-field">
                                    <label>Contact Person</label>
                                    <input type="text" id="create-misc-contact-person" placeholder="Enter contact person" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Contact Number</label>
                                    <input type="text" id="create-misc-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="create-misc-supplier-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-create-misc-supplier-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                        <div id="panel-edit-misc-supplier" class="modal-tab-panel" style="display: none;">
                            <div class="modal-field">
                                <label>Search Supplier</label>
                                <div style="position: relative;">
                                    <input type="text" id="edit-misc-supplier-search" placeholder="Search by company name..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                                    <div id="edit-misc-supplier-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                                </div>
                            </div>
                            <div class="modal-field">
                                <label>Miscellaneous Suppliers ID</label>
                                <input type="text" id="edit-misc-supplier-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company Name</label>
                                    <input type="text" id="edit-misc-company-name" placeholder="Enter company name" />
                                </div>
                                <div class="modal-field">
                                    <label>Address</label>
                                    <input type="text" id="edit-misc-address" placeholder="Enter address" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>TIN Number</label>
                                    <input type="text" id="edit-misc-tin-number" placeholder="TIN Number" maxlength="20" />
                                </div>
                                <div class="modal-field">
                                    <label>Contact Person</label>
                                    <input type="text" id="edit-misc-contact-person" placeholder="Enter contact person" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Contact Number</label>
                                    <input type="text" id="edit-misc-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="edit-misc-supplier-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-edit-misc-supplier-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="order-misc-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Order Miscellaneous Items</h3>
                            <button class="modal-close-btn" id="close-order-misc-modal">&times;</button>
                        </div>
                        <div class="modal-field">
                            <label>Order Miscellaneous Item ID</label>
                            <input type="text" id="order-misc-id" readonly />
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Date</label>
                                <input type="date" id="order-misc-date" />
                            </div>
                            <div class="modal-field">
                                <label>Sales Invoice</label>
                                <input type="text" id="order-misc-invoice" placeholder="Enter sales invoice" />
                            </div>
                            <div class="modal-field">
                                <label>Customer</label>
                                <select id="order-misc-customer" class="modal-select">
                                    <option value="">Select Customer</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field" style="flex: 1; margin-right: 8px;">
                                <label>Expense Code</label>
                                <select id="order-misc-expense-code" class="modal-select">
                                    <option value="">Select Expense Code</option>
                                </select>
                            </div>
                            <div class="modal-field" style="flex: 0 0 20%;">
                                <label>Accounting Code</label>
                                <input type="text" id="order-misc-accounting-code" readonly style="background: #f1f5f9;" placeholder="Auto-filled" />
                            </div>
                        </div>
                        <div class="table-wrap" style="max-height: 300px; overflow-y: auto; border-radius: 6px; margin-top: 12px;">
                            <table class="data-table product-table" style="border-spacing: 0 4px; border-collapse: separate; border: none !important;">
                                <thead>
                                    <tr>
                                        <th style="padding: 6px 8px; border: none !important; width: 10%;">Qty</th>
                                        <th style="padding: 6px 8px; border: none !important; width: 10%;">Unit</th>
                                        <th style="padding: 6px 8px; border: none !important; width: 25%;">Item</th>
                                        <th style="padding: 6px 8px; border: none !important; width: 15%;">Price</th>
                                        <th style="padding: 6px 8px; border: none !important; width: 25%;">Remarks</th>
                                        <th style="padding: 6px 8px; border: none !important; width: 25%;">Amount</th>
                                        <th style="padding: 6px 8px; width: 40px; border: none !important;"></th>
                                    </tr>
                                </thead>
                                <tbody id="order-misc-items-table-body">
                                </tbody>
                            </table>
                            <style>
                                #order-misc-items-table-body td { padding: 0 !important; border: none !important; }
                                #order-misc-items-table-body .modal-input { width: 100%; border-radius: 0; border: 1px solid #D6D6D6; padding: 6px 8px; font-size: 13px; box-sizing: border-box; }
                            </style>
                            <button type="button" id="add-order-misc-item-btn" style="margin-top: 8px; padding: 6px 12px; border: 1px dashed #94a3b8; background: #fff; cursor: pointer; border-radius: 4px; font-size: 13px; color: #64748b;">+ Add Row</button>
                        </div>
                        <div class="modal-meta-row" style="margin-top: 12px; justify-content: flex-end;">
                            <div class="modal-field" style="flex: 0 0 200px;">
                                <label>Grand Total</label>
                                <input type="text" id="order-misc-grand-total" readonly style="background: #f1f5f9; font-weight: 600;" />
                            </div>
                        </div>
                        <div class="modal-tab-actions" style="margin-top: 16px;">
                            <button id="save-order-misc-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
                <div id="pay-misc-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Payment of Other Expenses</h3>
                            <button class="modal-close-btn" id="close-pay-misc-modal">&times;</button>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Payment ID</label>
                                <input type="text" id="pay-misc-id" readonly />
                            </div>
                            <div class="modal-field">
                                <label>Order Misc ID</label>
                                <select id="pay-misc-invoice" class="modal-select">
                                    <option value="">Select Order</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Payment</label>
                                <select id="pay-misc-type" class="modal-select">
                                    <option value="Partial">Partial</option>
                                    <option value="Full">Full</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label>Balance</label>
                                <input type="text" id="pay-misc-balance" readonly style="background: #f1f5f9;" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Payment Amount</label>
                                <input type="text" id="pay-misc-amount" placeholder="0,000.00" />
                            </div>
                            <div class="modal-field">
                                <label>Bank Source</label>
                                <select id="pay-misc-bank-source" class="modal-select">
                                    <option value="">-- Select Bank --</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Check Number</label>
                                <input type="text" id="pay-misc-check-number" placeholder="Enter check number" />
                            </div>
                        </div>
                        <div class="modal-tab-actions" style="margin-top: 16px;">
                            <button id="save-pay-misc-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('open-expense-modal').onclick = () => {
            openOrderMiscModal();
        };

        var orderMiscItems = [];

        async function openOrderMiscModal() {
            const modal = document.getElementById('order-misc-modal');
            if (!modal) return;

            document.getElementById('order-misc-date').value = new Date().toISOString().split('T')[0];
            document.getElementById('order-misc-invoice').value = '';
            orderMiscItems = [];
            renderOrderMiscItems();
            modal.classList.remove('hidden');

            try {
                const idRes = await fetch(API_BASE_ORDER_MISC + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (idRes.ok) {
                    const idData = await idRes.json();
                    document.getElementById('order-misc-id').value = idData.order_id || 'OrMiscID-1';
                } else {
                    document.getElementById('order-misc-id').value = 'OrMiscID-1';
                }
            } catch (err) {
                document.getElementById('order-misc-id').value = 'OrMiscID-1';
            }

            Promise.all([
                fetch('/api/miscellaneous-suppliers', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                }).then(async res => {
                    if (!res.ok) throw new Error('Unauthorized');
                    const data = await res.json();
                    return Array.isArray(data) ? data : [];
                }).catch(() => []),
                fetch('/api/expense-categories', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                }).then(async res => {
                    if (!res.ok) throw new Error('Unauthorized');
                    const data = await res.json();
                    return Array.isArray(data) ? data : [];
                }).catch(() => [])
            ]).then(([suppliers, categories]) => {
                const customerSelect = document.getElementById('order-misc-customer');
                if (customerSelect) {
                    customerSelect.innerHTML = '<option value="">Select Customer</option>' +
                        suppliers.filter(s => s.status === 'Active').map(s =>
                            `<option value="${s.supplier_id}" data-company-name="${s.company_name || ''}">${s.company_name}</option>`
                        ).join('');
                }

                const expenseSelect = document.getElementById('order-misc-expense-code');
                if (expenseSelect) {
                    expenseSelect.innerHTML = '<option value="">Select Expense Code</option>' +
                        categories.map(c =>
                            `<option value="${c.expense_type || c.accounting_code || ''}" data-accounting-code="${c.accounting_code || ''}">${c.expense_type || c.accounting_code}</option>`
                        ).join('');
                    expenseSelect.onchange = function() {
                        const selectedOption = this.options[this.selectedIndex];
                        const accountingCode = selectedOption.getAttribute('data-accounting-code') || '';
                        document.getElementById('order-misc-accounting-code').value = accountingCode;
                    };
                }
            }).catch(err => {
                console.error('Failed to load dropdown data', err);
            });
        }

        function closeOrderMiscModal() {
            const modal = document.getElementById('order-misc-modal');
            if (modal) modal.classList.add('hidden');
        }

        function addOrderMiscItemRow() {
            orderMiscItems.push({ qty: 1, unit: '', item: '', price: 0, remarks: '' });
            renderOrderMiscItems();
        }

        function removeOrderMiscItemRow(index) {
            orderMiscItems.splice(index, 1);
            renderOrderMiscItems();
        }

        function updateOrderMiscItem(index, field, value) {
            if (field === 'qty') {
                orderMiscItems[index][field] = parseInt(value) || 0;
            } else if (field === 'price') {
                orderMiscItems[index][field] = parseFloat(value) || 0;
            } else {
                orderMiscItems[index][field] = value;
            }
            renderOrderMiscItems();
        }

        function renderOrderMiscItems() {
            const tbody = document.getElementById('order-misc-items-table-body');
            if (!tbody) return;

            if (orderMiscItems.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #94a3b8;">No items added</td></tr>';
                document.getElementById('order-misc-grand-total').value = '';
                return;
            }

            tbody.innerHTML = orderMiscItems.map((item, index) => {
                const amount = item.qty * item.price;
                return `
                    <tr>
                        <td><input type="number" class="modal-input" value="${item.qty}" min="0" onchange="updateOrderMiscItem(${index}, 'qty', this.value)" /></td>
                        <td><input type="text" class="modal-input" value="${item.unit}" onchange="updateOrderMiscItem(${index}, 'unit', this.value)" /></td>
                        <td><input type="text" class="modal-input" value="${item.item}" onchange="updateOrderMiscItem(${index}, 'item', this.value)" /></td>
                        <td><input type="number" class="modal-input" value="${item.price}" min="0" step="0.01" onchange="updateOrderMiscItem(${index}, 'price', this.value)" /></td>
                        <td><input type="text" class="modal-input" value="${item.remarks}" onchange="updateOrderMiscItem(${index}, 'remarks', this.value)" /></td>
                        <td>P ${amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td style="text-align: center;">
                            <button onclick="removeOrderMiscItemRow(${index})" style="background: none; border: none; cursor: pointer; color: #ef4444; font-size: 18px; font-weight: bold; padding: 4px;" title="Remove">&times;</button>
                        </td>
                    </tr>
                `;
            }).join('');

            const grandTotal = orderMiscItems.reduce((sum, item) => sum + (item.qty * item.price), 0);
            document.getElementById('order-misc-grand-total').value = 'P ' + grandTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }

        async function saveOrderMisc() {
            const orderId = document.getElementById('order-misc-id').value;
            const date = document.getElementById('order-misc-date').value;
            const invoice = document.getElementById('order-misc-invoice').value.trim();
            const customerSelect = document.getElementById('order-misc-customer');
            const customer = customerSelect.value;
            const customerName = customerSelect.options[customerSelect.selectedIndex]?.getAttribute('data-company-name') || customer;
            const expenseCode = document.getElementById('order-misc-expense-code').value;
            const accountingCode = document.getElementById('order-misc-accounting-code').value;
            const grandTotal = orderMiscItems.reduce((sum, item) => sum + (item.qty * item.price), 0);

            if (!date) {
                alert('Date is required');
                return;
            }
            if (orderMiscItems.length === 0) {
                alert('Please add at least one item');
                return;
            }

            try {
                const res = await fetch('/api/order-misc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        order_id: orderId,
                        date: date,
                        sales_invoice: invoice || null,
                        customer: customer || null,
                        customer_name: customerName || null,
                        expense_code: accountingCode || null,
                        expense_type: expenseCode || null,
                        items: orderMiscItems,
                        grand_total: grandTotal
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save order');
                }

                alert('Order saved successfully');
                closeOrderMiscModal();
                loadMiscTransactions();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        var API_BASE_ORDER_MISC_REPAYMENTS = '/api/order-misc-repayments';

        async function openPayMiscModal() {
            const modal = document.getElementById('pay-misc-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_ORDER_MISC_REPAYMENTS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (idRes.ok) {
                    const idData = await idRes.json();
                    document.getElementById('pay-misc-id').value = idData.repayment_id || 'MiscPayID-1';
                } else {
                    document.getElementById('pay-misc-id').value = 'MiscPayID-1';
                }
            } catch (err) {
                document.getElementById('pay-misc-id').value = 'MiscPayID-1';
            }

            document.getElementById('pay-misc-invoice').innerHTML = '<option value="">Select Order</option>';
            document.getElementById('pay-misc-type').value = 'Partial';
            document.getElementById('pay-misc-balance').value = '';
            document.getElementById('pay-misc-amount').value = '';
            document.getElementById('pay-misc-check-number').value = '';

            const bankSelect = document.getElementById('pay-misc-bank-source');
            bankSelect.innerHTML = '<option value="">-- Select Bank --</option>';

            loadBanksForPayMisc();
            loadUnpaidOrdersForPayMisc();

            modal.classList.remove('hidden');
        }

        function closePayMiscModal() {
            const modal = document.getElementById('pay-misc-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadBanksForPayMisc() {
            const bankSelect = document.getElementById('pay-misc-bank-source');
            if (!bankSelect) return;

            try {
                const res = await fetch('/api/bank-accounts', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const accounts = await res.json();
                    const activeAccounts = accounts.filter(acc => acc.status === 'Active');
                    activeAccounts.forEach(acc => {
                        const option = document.createElement('option');
                        option.value = acc.bank_account_id;
                        option.textContent = `${acc.bank} - ${acc.bank_account_number}`;
                        bankSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load banks for pay misc', err);
            }
        }

        async function loadUnpaidOrdersForPayMisc() {
            const invoiceSelect = document.getElementById('pay-misc-invoice');
            if (!invoiceSelect) return;

            try {
                const res = await fetch(API_BASE_ORDER_MISC, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const orders = await res.json();
                    const pendingOrders = orders.filter(o => o.status === 'Pending');
                    invoiceSelect.innerHTML = '<option value="">Select Order</option>';
                    pendingOrders.forEach(order => {
                        const option = document.createElement('option');
                        option.value = order.order_id;
                        option.textContent = `${order.order_id} - ${order.customer_name || order.customer || 'N/A'} (P ${parseFloat(order.grand_total || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})})`;
                        option.setAttribute('data-date', order.date || '');
                        option.setAttribute('data-grand-total', order.grand_total || 0);
                        option.setAttribute('data-customer', order.customer || '');
                        option.setAttribute('data-customer-name', order.customer_name || '');
                        invoiceSelect.appendChild(option);
                    });

                    invoiceSelect.onchange = async function() {
                        const selected = this.options[this.selectedIndex];
                        const grandTotal = parseFloat(selected.getAttribute('data-grand-total')) || 0;
                        const orderId = selected.value;

                        if (orderId) {
                            try {
                                const paymentsRes = await fetch(API_BASE_ORDER_MISC_REPAYMENTS + '/order/' + encodeURIComponent(orderId), {
                                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                                });
                                if (paymentsRes.ok) {
                                    const existingPayments = await paymentsRes.json();
                                    const totalPaid = existingPayments.reduce((sum, p) => sum + (parseFloat(p.payment_amount) || 0), 0);
                                    const remainingBalance = Math.max(0, grandTotal - totalPaid);
                                    document.getElementById('pay-misc-balance').value = 'P ' + remainingBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                                } else {
                                    document.getElementById('pay-misc-balance').value = 'P ' + grandTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                                }
                            } catch (err) {
                                document.getElementById('pay-misc-balance').value = 'P ' + grandTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                            }
                        } else {
                            document.getElementById('pay-misc-balance').value = '';
                        }
                    };
                }
            } catch (err) {
                console.error('Failed to load unpaid orders for pay misc', err);
            }
        }

        function formatNumber(num) {
            return parseFloat(num || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }

        async function savePayMisc() {
            const paymentId = document.getElementById('pay-misc-id').value;
            const orderId = document.getElementById('pay-misc-invoice').value;
            const paymentType = document.getElementById('pay-misc-type').value;
            const paymentAmount = parseFloat(document.getElementById('pay-misc-amount').value.trim()) || 0;
            const bankSource = document.getElementById('pay-misc-bank-source').value;
            const checkNumber = document.getElementById('pay-misc-check-number').value.trim();
            const invoiceSelect = document.getElementById('pay-misc-invoice');
            const selectedOption = invoiceSelect.options[invoiceSelect.selectedIndex];
            const date = selectedOption.getAttribute('data-date') || new Date().toISOString().split('T')[0];
            const grandTotal = parseFloat(selectedOption.getAttribute('data-grand-total')) || 0;

            if (!orderId) {
                alert('Please select an order');
                return;
            }
            if (!paymentAmount || paymentAmount <= 0) {
                alert('Please enter a valid payment amount');
                return;
            }

            try {
                const existingRes = await fetch(API_BASE_ORDER_MISC_REPAYMENTS + '/order/' + encodeURIComponent(orderId), {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const existingPayments = existingRes.ok ? await existingRes.json() : [];
                const totalPaid = existingPayments.reduce((sum, p) => sum + (parseFloat(p.payment_amount) || 0), 0);
                const startingAmount = grandTotal - totalPaid;
                const remainingBalance = Math.max(0, startingAmount - paymentAmount);

                const res = await fetch(API_BASE_ORDER_MISC_REPAYMENTS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        repayment_id: paymentId,
                        order_id: orderId,
                        payment_type: paymentType,
                        payment_amount: paymentAmount,
                        starting_amount: startingAmount,
                        remaining_balance: remainingBalance,
                        bank_source: bankSource || null,
                        check_number: checkNumber || null,
                        date: date,
                        status: remainingBalance <= 0 ? 'Paid' : 'Pending'
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save payment');
                }

                alert('Payment saved successfully');
                closePayMiscModal();
                loadMiscTransactions();
                loadMiscPayments();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        window.openPayMiscModal = openPayMiscModal;
        window.closePayMiscModal = closePayMiscModal;
        window.savePayMisc = savePayMisc;

        window.updateOrderMiscItem = updateOrderMiscItem;
        window.removeOrderMiscItemRow = removeOrderMiscItemRow;
        window.openOrderMiscModal = openOrderMiscModal;
        window.closeOrderMiscModal = closeOrderMiscModal;
        window.saveOrderMisc = saveOrderMisc;
        window.addOrderMiscItemRow = addOrderMiscItemRow;

        const addOrderMiscItemBtn = document.getElementById('add-order-misc-item-btn');
        if (addOrderMiscItemBtn) {
            addOrderMiscItemBtn.onclick = addOrderMiscItemRow;
        }

        const saveOrderMiscBtn = document.getElementById('save-order-misc-btn');
        if (saveOrderMiscBtn) {
            saveOrderMiscBtn.onclick = saveOrderMisc;
        }

        const closeOrderMiscBtn = document.getElementById('close-order-misc-modal');
        if (closeOrderMiscBtn) {
            closeOrderMiscBtn.onclick = closeOrderMiscModal;
        }

        if (document.getElementById('order-misc-modal')) {
            document.getElementById('order-misc-modal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('order-misc-modal')) {
                    document.getElementById('order-misc-modal').classList.add('hidden');
                }
            });
        }

        const payMiscBtn = document.getElementById('pay-misc-btn');
        if (payMiscBtn) {
            payMiscBtn.onclick = openPayMiscModal;
        }

        const closePayMiscBtn = document.getElementById('close-pay-misc-modal');
        if (closePayMiscBtn) {
            closePayMiscBtn.onclick = closePayMiscModal;
        }

        const savePayMiscBtn = document.getElementById('save-pay-misc-btn');
        if (savePayMiscBtn) {
            savePayMiscBtn.onclick = savePayMisc;
        }

        if (document.getElementById('pay-misc-modal')) {
            document.getElementById('pay-misc-modal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('pay-misc-modal')) {
                    document.getElementById('pay-misc-modal').classList.add('hidden');
                }
            });
        }

        const payMiscTypeSelect = document.getElementById('pay-misc-type');
        if (payMiscTypeSelect) {
            payMiscTypeSelect.addEventListener('change', function() {
                const balanceInput = document.getElementById('pay-misc-balance');
                const amountInput = document.getElementById('pay-misc-amount');
                if (this.value === 'Full' && balanceInput && amountInput) {
                    amountInput.value = balanceInput.value.replace(/[P,]/g, '').trim();
                }
            });
        }

        var API_BASE_MISC_SUPPLIERS = '/api/miscellaneous-suppliers';
        var miscSuppliersData = [];
        var currentMiscSupplierPage = 1;
        var miscSuppliersPerPage = 5;

        function formatContactNumber(e) {
            let val = e.target.value.replace(/[^0-9+]/g, '');
            if (val.startsWith('+63')) {
                val = val.substring(3);
            } else if (val.startsWith('63')) {
                val = val.substring(2);
            } else if (val.startsWith('0')) {
                val = val.substring(1);
            }
            val = val.slice(0, 10);
            let formatted = '+63 ';
            if (val.length > 0) formatted += val.substring(0, 3);
            if (val.length > 3) formatted += '-' + val.substring(3, 6);
            if (val.length > 6) formatted += '-' + val.substring(6, 10);
            e.target.value = formatted;
        }

        function setupContactNumber(input) {
            if (!input) return;
            input.addEventListener('input', formatContactNumber);
            input.addEventListener('blur', (e) => {
                let val = e.target.value.replace(/[^0-9+]/g, '');
                if (val.startsWith('+63')) val = val.substring(3);
                else if (val.startsWith('63')) val = val.substring(2);
                else if (val.startsWith('0')) val = val.substring(1);
                val = val.slice(0, 10);
                let formatted = '+63 ';
                if (val.length > 0) formatted += val.substring(0, 3);
                if (val.length > 3) formatted += '-' + val.substring(3, 6);
                if (val.length > 6) formatted += '-' + val.substring(6, 10);
                e.target.value = formatted;
            });
        }

        async function loadMiscSuppliers() {
            const tbody = document.getElementById('misc-suppliers-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_MISC_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch suppliers');
                miscSuppliersData = await res.json();
                currentMiscSupplierPage = 1;
                renderMiscSuppliersPage();
                renderMiscSuppliersPagination();
            } catch (err) {
                console.error('Failed to load miscellaneous suppliers', err);
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderMiscSuppliersPage() {
            const tbody = document.getElementById('misc-suppliers-table-body');
            if (!tbody) return;

            const start = (currentMiscSupplierPage - 1) * miscSuppliersPerPage;
            const end = start + miscSuppliersPerPage;
            const pageData = miscSuppliersData.slice(start, end);

            if (pageData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No suppliers found</td></tr>';
                return;
            }

            tbody.innerHTML = pageData.map(supplier => `
                <tr>
                    <td>${supplier.supplier_id || '-'}</td>
                    <td>${supplier.company_name || '-'}</td>
                    <td>${supplier.address || '-'}</td>
                    <td>${supplier.tin_number || '-'}</td>
                    <td>${supplier.contact_person || '-'}</td>
                    <td>${supplier.contact_number || '-'}</td>
                    <td>${supplier.status || '-'}</td>
                </tr>
            `).join('');

            const totalPages = Math.max(1, Math.ceil(miscSuppliersData.length / miscSuppliersPerPage));
            renderMiscSuppliersPagination(totalPages);
        }

        function renderMiscSuppliersPagination(totalPages) {
            const container = document.getElementById('misc-suppliers-pagination');
            if (!container) return;

            let html = '';
            if (totalPages > 10) {
                html += `<button class="page-btn" id="misc-suppliers-first-btn" ${currentMiscSupplierPage === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            html += `<button class="page-btn" id="misc-suppliers-prev-btn" ${currentMiscSupplierPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentMiscSupplierPage ? 'active' : ''}" id="misc-suppliers-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="misc-suppliers-next-btn" ${currentMiscSupplierPage >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                html += `<button class="page-btn" id="misc-suppliers-last-btn" ${currentMiscSupplierPage >= totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }

            container.innerHTML = html;

            document.getElementById('misc-suppliers-first-btn')?.addEventListener('click', () => {
                if (currentMiscSupplierPage !== 1) {
                    currentMiscSupplierPage = 1;
                    renderMiscSuppliersPage();
                }
            });

            document.getElementById('misc-suppliers-prev-btn')?.addEventListener('click', () => {
                if (currentMiscSupplierPage > 1) {
                    currentMiscSupplierPage--;
                    renderMiscSuppliersPage();
                }
            });

            document.getElementById('misc-suppliers-next-btn')?.addEventListener('click', () => {
                if (currentMiscSupplierPage < totalPages) {
                    currentMiscSupplierPage++;
                    renderMiscSuppliersPage();
                }
            });

            document.getElementById('misc-suppliers-last-btn')?.addEventListener('click', () => {
                if (currentMiscSupplierPage !== totalPages) {
                    currentMiscSupplierPage = totalPages;
                    renderMiscSuppliersPage();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`misc-suppliers-page-${i}`)?.addEventListener('click', () => {
                    currentMiscSupplierPage = i;
                    renderMiscSuppliersPage();
                });
            }
        }

        var API_BASE_ORDER_MISC = '/api/order-misc';
        var miscTransactionsData = [];
        var currentMiscTransactionPage = 1;
        var miscTransactionsPerPage = 5;

        async function loadMiscTransactions() {
            const tbody = document.getElementById('misc-transactions-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_ORDER_MISC, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch transactions');
                miscTransactionsData = await res.json();
                currentMiscTransactionPage = 1;
                renderMiscTransactionsPage();
            } catch (err) {
                console.error('Failed to load miscellaneous transactions', err);
                tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderMiscTransactionsPage() {
            const tbody = document.getElementById('misc-transactions-table-body');
            if (!tbody) return;

            const start = (currentMiscTransactionPage - 1) * miscTransactionsPerPage;
            const end = start + miscTransactionsPerPage;
            const pageData = miscTransactionsData.slice(start, end);

            if (pageData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;">No transactions found</td></tr>';
                return;
            }

            tbody.innerHTML = pageData.map(order => `
                <tr>
                    <td>${order.order_id || '-'}</td>
                    <td>${order.date ? new Date(order.date).toISOString().split('T')[0] : '-'}</td>
                    <td>${order.customer || '-'}</td>
                    <td>${order.expense_code || '-'}</td>
                    <td>${order.expense_type || '-'}</td>
                    <td>P ${parseFloat(order.grand_total || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td>${order.payment_date ? new Date(order.payment_date).toISOString().split('T')[0] : '-'}</td>
                    <td>${order.payment_source || '-'}</td>
                    <td>${order.check_number || '-'}</td>
                    <td>${order.status || '-'}</td>
                    <td style="text-align: center;">
                        <button onclick="deleteMiscTransaction('${order.order_id}')" style="background: none; border: none; cursor: pointer; color: #ef4444; font-size: 18px; font-weight: bold; padding: 4px;" title="Delete">&times;</button>
                    </td>
                </tr>
            `).join('');

            const totalPages = Math.max(1, Math.ceil(miscTransactionsData.length / miscTransactionsPerPage));
            renderMiscTransactionsPagination(totalPages);
        }

        function renderMiscTransactionsPagination(totalPages) {
            const container = document.getElementById('misc-transactions-pagination');
            if (!container) return;

            let html = '';
            if (totalPages > 10) {
                html += `<button class="page-btn" id="misc-transactions-first-btn" ${currentMiscTransactionPage === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            html += `<button class="page-btn" id="misc-transactions-prev-btn" ${currentMiscTransactionPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentMiscTransactionPage ? 'active' : ''}" id="misc-transactions-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="misc-transactions-next-btn" ${currentMiscTransactionPage >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                html += `<button class="page-btn" id="misc-transactions-last-btn" ${currentMiscTransactionPage >= totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }

            container.innerHTML = html;

            document.getElementById('misc-transactions-first-btn')?.addEventListener('click', () => {
                if (currentMiscTransactionPage !== 1) {
                    currentMiscTransactionPage = 1;
                    renderMiscTransactionsPage();
                }
            });

            document.getElementById('misc-transactions-prev-btn')?.addEventListener('click', () => {
                if (currentMiscTransactionPage > 1) {
                    currentMiscTransactionPage--;
                    renderMiscTransactionsPage();
                }
            });

            document.getElementById('misc-transactions-next-btn')?.addEventListener('click', () => {
                if (currentMiscTransactionPage < totalPages) {
                    currentMiscTransactionPage++;
                    renderMiscTransactionsPage();
                }
            });

            document.getElementById('misc-transactions-last-btn')?.addEventListener('click', () => {
                if (currentMiscTransactionPage !== totalPages) {
                    currentMiscTransactionPage = totalPages;
                    renderMiscTransactionsPage();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`misc-transactions-page-${i}`)?.addEventListener('click', () => {
                    currentMiscTransactionPage = i;
                    renderMiscTransactionsPage();
                });
            }
        }

        async function loadMiscPayments() {
            const tbody = document.getElementById('misc-payments-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_ORDER_MISC_REPAYMENTS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch miscellaneous payments');
                const repayments = await res.json();

                if (repayments.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; color: #94a3b8;">No payment records found</td></tr>';
                    return;
                }

                tbody.innerHTML = repayments.map(repayment => {
                    const date = repayment.date ? new Date(repayment.date).toISOString().split('T')[0] : '';
                    return `<tr>
                        <td>${repayment.repayment_id || ''}</td>
                        <td>${repayment.order_id || ''}</td>
                        <td>${repayment.payment_type || ''}</td>
                        <td>P ${parseFloat(repayment.payment_amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td>P ${parseFloat(repayment.starting_amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td>P ${parseFloat(repayment.remaining_balance || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td>${repayment.bank_source || ''}</td>
                        <td>${repayment.check_number || ''}</td>
                        <td>${date}</td>
                        <td>${repayment.status || ''}</td>
                        <td style="text-align: center;">
                            <button onclick="deleteMiscPayment('${repayment.repayment_id}')" style="background: none; border: none; cursor: pointer; color: #ef4444; font-size: 18px; font-weight: bold; padding: 4px;" title="Delete">&times;</button>
                        </td>
                    </tr>`;
                }).join('');
            } catch (err) {
                console.error('Failed to load miscellaneous payments:', err);
                tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        async function deleteMiscPayment(repaymentId) {
            if (!confirm('Are you sure you want to delete this payment?')) return;

            try {
                const res = await fetch(API_BASE_ORDER_MISC_REPAYMENTS + '/repayment-id/' + encodeURIComponent(repaymentId), {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to delete payment');
                }

                alert('Payment deleted successfully');
                loadMiscPayments();
                loadMiscTransactions();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function deleteMiscTransaction(orderId) {
            if (!confirm('Are you sure you want to delete this transaction? This will also delete all associated payments.')) return;

            try {
                const res = await fetch(API_BASE_ORDER_MISC + '/' + encodeURIComponent(orderId), {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to delete transaction');
                }

                alert('Transaction deleted successfully');
                loadMiscTransactions();
                loadMiscPayments();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function openMiscSuppliersModal() {
            const modal = document.getElementById('misc-suppliers-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_MISC_SUPPLIERS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-misc-supplier-id').value = idData.supplier_id || 'MiscSuID-1';
            } catch (err) {
                document.getElementById('create-misc-supplier-id').value = 'MiscSuID-1';
            }

            switchMiscSupplierTab('create');
            modal.classList.remove('hidden');
            loadMiscSuppliers();
        }

        function closeMiscSuppliersModal() {
            const modal = document.getElementById('misc-suppliers-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function saveCreateMiscSupplier() {
            const supplierId = document.getElementById('create-misc-supplier-id').value;
            const companyName = document.getElementById('create-misc-company-name').value.trim();
            const address = document.getElementById('create-misc-address').value.trim();
            const tinNumber = document.getElementById('create-misc-tin-number').value.trim();
            const contactPerson = document.getElementById('create-misc-contact-person').value.trim();
            const contactNumber = document.getElementById('create-misc-contact-number').value.trim();
            const status = document.getElementById('create-misc-supplier-status').value;

            if (!companyName) {
                alert('Company Name is required');
                return;
            }

            try {
                const res = await fetch(API_BASE_MISC_SUPPLIERS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        supplier_id: supplierId,
                        company_name: companyName,
                        address: address || null,
                        tin_number: tinNumber || null,
                        contact_person: contactPerson || null,
                        contact_number: contactNumber || null,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save supplier');
                }

                alert('Supplier created successfully');
                document.getElementById('create-misc-company-name').value = '';
                document.getElementById('create-misc-address').value = '';
                document.getElementById('create-misc-tin-number').value = '';
                document.getElementById('create-misc-contact-person').value = '';
                document.getElementById('create-misc-contact-number').value = '';
                document.getElementById('create-misc-supplier-status').value = 'Active';

                const idRes = await fetch(API_BASE_MISC_SUPPLIERS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-misc-supplier-id').value = idData.supplier_id || 'MiscSuID-1';

                loadMiscSuppliers();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function saveEditMiscSupplier() {
            const supplierId = document.getElementById('edit-misc-supplier-id').value;
            const companyName = document.getElementById('edit-misc-company-name').value.trim();
            const address = document.getElementById('edit-misc-address').value.trim();
            const tinNumber = document.getElementById('edit-misc-tin-number').value.trim();
            const contactPerson = document.getElementById('edit-misc-contact-person').value.trim();
            const contactNumber = document.getElementById('edit-misc-contact-number').value.trim();
            const status = document.getElementById('edit-misc-supplier-status').value;

            if (!supplierId || !companyName) {
                alert('Supplier ID and Company Name are required');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_MISC_SUPPLIERS}/${encodeURIComponent(supplierId)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        supplier_id: supplierId,
                        company_name: companyName,
                        address: address || null,
                        tin_number: tinNumber || null,
                        contact_person: contactPerson || null,
                        contact_number: contactNumber || null,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to update supplier');
                }

                alert('Supplier updated successfully');
                document.getElementById('edit-misc-company-name').value = '';
                document.getElementById('edit-misc-address').value = '';
                document.getElementById('edit-misc-tin-number').value = '';
                document.getElementById('edit-misc-contact-person').value = '';
                document.getElementById('edit-misc-contact-number').value = '';
                document.getElementById('edit-misc-supplier-status').value = 'Active';
                document.getElementById('edit-misc-supplier-id').value = '';
                document.getElementById('edit-misc-supplier-search').value = '';
                document.getElementById('edit-misc-supplier-search-results').style.display = 'none';

                loadMiscSuppliers();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function searchMiscSuppliers(query) {
            const searchResults = document.getElementById('edit-misc-supplier-search-results');
            if (!searchResults) return;

            try {
                const res = await fetch(API_BASE_MISC_SUPPLIERS + '?search=' + encodeURIComponent(query), {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const suppliers = await res.json();
                    renderMiscSupplierSearchResults(suppliers);
                }
            } catch (err) {
                console.error('Search failed', err);
            }
        }

        function renderMiscSupplierSearchResults(suppliers) {
            const searchResults = document.getElementById('edit-misc-supplier-search-results');
            if (!searchResults) return;

            if (suppliers.length === 0) {
                searchResults.innerHTML = '<div style="padding: 8px; color: #999;">No results found</div>';
                searchResults.style.display = 'block';
                return;
            }

            searchResults.innerHTML = suppliers.map(supplier => `
                <div class="search-result-item" data-supplier-id="${supplier.supplier_id}" style="padding: 8px; cursor: pointer; border-bottom: 1px solid #f0f0f0;">
                    <strong>${supplier.supplier_id}</strong> - ${supplier.company_name}
                </div>
            `).join('');
            searchResults.style.display = 'block';

            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', async (e) => {
                    const supplierId = e.currentTarget.dataset.supplierId;
                    try {
                        const res = await fetch(`${API_BASE_MISC_SUPPLIERS}/code/${encodeURIComponent(supplierId)}`, {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const supplier = await res.json();
                            document.getElementById('edit-misc-supplier-id').value = supplier.supplier_id || '';
                            document.getElementById('edit-misc-company-name').value = supplier.company_name || '';
                            document.getElementById('edit-misc-address').value = supplier.address || '';
                            document.getElementById('edit-misc-tin-number').value = supplier.tin_number || '';
                            document.getElementById('edit-misc-contact-person').value = supplier.contact_person || '';
                            document.getElementById('edit-misc-contact-number').value = supplier.contact_number || '';
                            document.getElementById('edit-misc-supplier-status').value = supplier.status || 'Active';
                            searchResults.style.display = 'none';
                        }
                    } catch (err) {
                        console.error('Failed to load supplier details', err);
                    }
                });
            });
        }

        function switchMiscSupplierTab(tab) {
            const createPanel = document.getElementById('panel-create-misc-supplier');
            const editPanel = document.getElementById('panel-edit-misc-supplier');
            const createTab = document.getElementById('tab-create-misc-supplier');
            const editTab = document.getElementById('tab-edit-misc-supplier');

            if (tab === 'create') {
                createPanel.style.display = 'block';
                editPanel.style.display = 'none';
                createTab.classList.add('active');
                editTab.classList.remove('active');
            } else {
                createPanel.style.display = 'none';
                editPanel.style.display = 'block';
                createTab.classList.remove('active');
                editTab.classList.add('active');
            }
        }

        const addMiscSupplierBtn = document.getElementById('add-misc-supplier-btn');
        if (addMiscSupplierBtn) {
            addMiscSupplierBtn.onclick = openMiscSuppliersModal;
        }

        const closeMiscSuppliersBtn = document.getElementById('close-misc-suppliers-modal');
        if (closeMiscSuppliersBtn) {
            closeMiscSuppliersBtn.onclick = closeMiscSuppliersModal;
        }

        if (document.getElementById('misc-suppliers-modal')) {
            document.getElementById('misc-suppliers-modal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('misc-suppliers-modal')) {
                    document.getElementById('misc-suppliers-modal').classList.add('hidden');
                }
            });
        }

        const saveCreateMiscSupplierBtn = document.getElementById('save-create-misc-supplier-btn');
        if (saveCreateMiscSupplierBtn) {
            saveCreateMiscSupplierBtn.onclick = saveCreateMiscSupplier;
        }

        const saveEditMiscSupplierBtn = document.getElementById('save-edit-misc-supplier-btn');
        if (saveEditMiscSupplierBtn) {
            saveEditMiscSupplierBtn.onclick = saveEditMiscSupplier;
        }

        setupContactNumber(document.getElementById('create-misc-contact-number'));
        setupContactNumber(document.getElementById('edit-misc-contact-number'));

        const editSearchInput = document.getElementById('edit-misc-supplier-search');
        const searchResults = document.getElementById('edit-misc-supplier-search-results');
        let searchDebounce = null;

        if (editSearchInput && searchResults) {
            editSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (searchDebounce) clearTimeout(searchDebounce);
                if (query.length < 1) {
                    searchResults.style.display = 'none';
                    return;
                }
                searchDebounce = setTimeout(async () => {
                    await searchMiscSuppliers(query);
                }, 300);
            });

            document.addEventListener('click', (e) => {
                if (!editSearchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        }

        window.switchMiscSupplierTab = switchMiscSupplierTab;
        window.openMiscSuppliersModal = openMiscSuppliersModal;
        window.closeMiscSuppliersModal = closeMiscSuppliersModal;
        window.renderMiscSupplierSearchResults = renderMiscSupplierSearchResults;
        window.saveEditMiscSupplier = saveEditMiscSupplier;
        window.deleteMiscPayment = deleteMiscPayment;
        window.deleteMiscTransaction = deleteMiscTransaction;

        loadMiscSuppliers();
        loadMiscTransactions();
        loadMiscPayments();
    };

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'purchasing';
    const render = ModuleComponents[currentTab] || ModuleComponents['purchasing'];
    render(contentArea);
}
