if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['purchasing-ready-to-lay'] = (container) => {
        container.innerHTML = `
            <div class="rtl-layout">
                <div class="header-actions">
                    <h2>Order Ready-to-Lay</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="open-rtl-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Order Ready-to-Lay</span>
                    </button>
                    <button id="pay-rtl-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Pay Ready to Lay</span>
                    </button>
                    <button id="add-rtl-suppliers-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add RTL Suppliers</span>
                    </button>
                    <button id="add-rtl-type-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add RTL Type</span>
                    </button>
                </div>
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                    <div class="card tracking-card available-rtl-card" style="flex: 1;">
                        <h3>Available RTL</h3>
                        <p class="card-sub-label">live Quantity Heads available on the Farm</p>
                        <p class="card-value">235,000 heads</p>
                    </div>
                    <div class="card shipping-box culling-box" style="flex: 2;">
                        <h3>Culling Date</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Layer Buidling</th>
                                    <th>Culling Date</th>
                                    <th>Arrival Date</th>
                                    <th>Company</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>701</td><td>2027-01-15</td><td>2025-08-10</td><td>ABC Hatchery</td></tr>
                                <tr><td>702</td><td>2026-12-20</td><td>2025-09-01</td><td>XYZ Hatchery</td></tr>
                                <tr><td>703</td><td>2027-02-28</td><td>2025-07-20</td><td>Prime Hatchery</td></tr>
                                <tr><td>704</td><td>2026-11-15</td><td>2025-10-05</td><td>Metro Hatchery</td></tr>
                                <tr><td>705</td><td>2027-03-10</td><td>2025-06-15</td><td>ABC Hatchery</td></tr>
                                <tr><td>706</td><td>2026-12-30</td><td>2025-08-25</td><td>XYZ Hatchery</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination">
                        <button class="page-btn">&laquo; Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">2</button>
                        <button class="page-btn">3</button>
                         <button class="page-btn">Next &raquo;</button>
                     </div>
                 </div>
                 </div>
                 </div>
                 <div class="rtl-bottom-row">
                     <div class="card shipping-box rtl-transactions-box">
                         <h3>Ready to lay Transactions</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Order RTL ID</th>
                                    <th>Date</th>
                                    <th>Company</th>
                                    <th>Sales Invoice</th>
                                    <th>Amount</th>
                                    <th>Payment Date</th>
                                    <th>Payment Source</th>
                                    <th>Check Number</th>
                                    <th>Status</th>
                                    <th style="width: 40px;"></th>
                                </tr>
                            </thead>
                            <tbody id="rtl-transactions-table-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination">
                        <button class="page-btn">&laquo; Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">2</button>
                        <button class="page-btn">Next &raquo;</button>
                    </div>
                </div>
                </div>
                <div class="rtl-bottom-row">
                    <div class="card shipping-box rtl-payments-box" style="width: 100%;">
                        <h3>RTL Transaction Payments</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Repayment ID</th>
                                    <th>Order RTL ID</th>
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
                            <tbody id="rtl-payments-table-body">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="rtl-bottom-row rtl-bottom-row-2">
                <div class="card shipping-box rtl-suppliers-box">
                    <h3>Ready to Lay Suppliers</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>RTL Supplier ID</th>
                                    <th>Company Name</th>
                                    <th>Address</th>
                                    <th>TIN Number</th>
                                    <th>Contact Person</th>
                                    <th>Contact Number</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="rtl-suppliers-table-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination">
                        <button class="page-btn">&laquo; Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">2</button>
                        <button class="page-btn">Next &raquo;</button>
                    </div>
                </div>
                <div class="card shipping-box rtl-types-box">
                    <h3>Ready to Lay Types</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>RTL Type ID</th>
                                    <th>Company</th>
                                    <th>Item</th>
                                    <th>Remarks</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="rtl-types-table-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination">
                        <button class="page-btn">&laquo; Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">Next &raquo;</button>
                    </div>
                </div>
            <div id="rtl-suppliers-modal" class="modal hidden">
                <div class="modal-content" style="max-width: 900px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>RTL Suppliers Management</h3>
                        <button class="modal-close-btn" id="close-rtl-suppliers-modal">&times;</button>
                    </div>
                    <div class="modal-tabs">
                        <button class="modal-tab active" id="tab-create-rtl-supplier" onclick="switchRtlSupplierTab('create')">Create New RTL Supplier</button>
                        <button class="modal-tab" id="tab-edit-rtl-supplier" onclick="switchRtlSupplierTab('edit')">Edit RTL Supplier</button>
                    </div>
                    <div id="panel-create-rtl-supplier" class="modal-tab-panel" style="display: block;">
                        <div class="modal-field">
                            <label>RTL Suppliers ID</label>
                            <input type="text" id="create-rtl-supplier-id" readonly />
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Company Name</label>
                                <input type="text" id="create-rtl-company-name" placeholder="Enter company name" />
                            </div>
                            <div class="modal-field">
                                <label>Address</label>
                                <input type="text" id="create-rtl-address" placeholder="Enter address" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>TIN Number</label>
                                <input type="text" id="create-rtl-tin-number" placeholder="TIN Number" maxlength="20" />
                            </div>
                            <div class="modal-field">
                                <label>Contact Person</label>
                                <input type="text" id="create-rtl-contact-person" placeholder="Enter contact person" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Contact Number</label>
                                <input type="text" id="create-rtl-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                            </div>
                            <div class="modal-field">
                                <label>Status</label>
                                <select id="create-rtl-supplier-status" class="modal-select">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-create-rtl-supplier-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                    <div id="panel-edit-rtl-supplier" class="modal-tab-panel" style="display: none;">
                        <div class="modal-field">
                            <label>Search Supplier</label>
                            <div style="position: relative;">
                                <input type="text" id="edit-rtl-supplier-search" placeholder="Search by company name..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                                <div id="edit-rtl-supplier-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                            </div>
                        </div>
                        <div class="modal-field">
                            <label>RTL Suppliers ID</label>
                            <input type="text" id="edit-rtl-supplier-id" readonly />
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Company Name</label>
                                <input type="text" id="edit-rtl-company-name" placeholder="Enter company name" />
                            </div>
                            <div class="modal-field">
                                <label>Address</label>
                                <input type="text" id="edit-rtl-address" placeholder="Enter address" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>TIN Number</label>
                                <input type="text" id="edit-rtl-tin-number" placeholder="TIN Number" maxlength="20" />
                            </div>
                            <div class="modal-field">
                                <label>Contact Person</label>
                                <input type="text" id="edit-rtl-contact-person" placeholder="Enter contact person" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Contact Number</label>
                                <input type="text" id="edit-rtl-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                            </div>
                            <div class="modal-field">
                                <label>Status</label>
                                <select id="edit-rtl-supplier-status" class="modal-select">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-edit-rtl-supplier-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="rtl-types-modal" class="modal hidden">
                <div class="modal-content" style="max-width: 900px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>RTL Type Management</h3>
                        <button class="modal-close-btn" id="close-rtl-types-modal">&times;</button>
                    </div>
                    <div class="modal-tabs">
                        <button class="modal-tab active" id="tab-create-rtl-type" onclick="switchRtlTypeTab('create')">Create New RTL Type</button>
                        <button class="modal-tab" id="tab-edit-rtl-type" onclick="switchRtlTypeTab('edit')">Edit RTL Type</button>
                    </div>
                    <div id="panel-create-rtl-type" class="modal-tab-panel" style="display: block;">
                        <div class="modal-field">
                            <label>RTL Type ID</label>
                            <input type="text" id="create-rtl-type-id" readonly />
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Company</label>
                                <select id="create-rtl-type-company" class="modal-select">
                                    <option value="">Select Company</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label>Item</label>
                                <input type="text" id="create-rtl-type-item" placeholder="Enter item" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Remarks</label>
                                <textarea id="create-rtl-type-remarks" rows="3" placeholder="Enter remarks" style="width: 100%; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; resize: vertical;"></textarea>
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Price</label>
                                <input type="text" id="create-rtl-type-price" placeholder="0,000.00" />
                            </div>
                            <div class="modal-field">
                                <label>Status</label>
                                <select id="create-rtl-type-status" class="modal-select">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-create-rtl-type-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                    <div id="panel-edit-rtl-type" class="modal-tab-panel" style="display: none;">
                        <div class="modal-field">
                            <label>Search RTL Type</label>
                            <div style="position: relative;">
                                <input type="text" id="edit-rtl-type-search" placeholder="Search by item or RTL Type ID..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                                <div id="edit-rtl-type-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                            </div>
                        </div>
                        <div class="modal-field">
                            <label>RTL Type ID</label>
                            <input type="text" id="edit-rtl-type-id" readonly />
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Company</label>
                                <select id="edit-rtl-type-company" class="modal-select">
                                    <option value="">Select Company</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label>Item</label>
                                <input type="text" id="edit-rtl-type-item" placeholder="Enter item" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Remarks</label>
                                <textarea id="edit-rtl-type-remarks" rows="3" placeholder="Enter remarks" style="width: 100%; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; resize: vertical;"></textarea>
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Price</label>
                                <input type="text" id="edit-rtl-type-price" placeholder="0,000.00" />
                            </div>
                            <div class="modal-field">
                                <label>Status</label>
                                <select id="edit-rtl-type-status" class="modal-select">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-edit-rtl-type-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="order-rtl-modal" class="modal hidden">
                <div class="modal-content" style="max-width: 1100px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Order Ready to Lay</h3>
                        <button class="modal-close-btn" id="close-order-rtl-modal">&times;</button>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Order RTL ID</label>
                            <input type="text" id="order-rtl-id" readonly />
                        </div>
                        <div class="modal-field">
                            <label>Date</label>
                            <input type="date" id="order-rtl-date" />
                        </div>
                        <div class="modal-field">
                            <label>Sales Invoice</label>
                            <input type="text" id="order-rtl-invoice" placeholder="Enter sales invoice" />
                        </div>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Company</label>
                            <select id="order-rtl-company" class="modal-select">
                                <option value="">Select Company</option>
                            </select>
                        </div>
                        <div class="modal-field">
                            <label>Product</label>
                            <select id="order-rtl-product" class="modal-select">
                                <option value="">Select Product</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-wrap" style="max-height: 300px; overflow-y: auto; border-radius: 6px; margin-top: 12px;">
                        <table class="data-table product-table" style="border-spacing: 0 4px; border-collapse: separate; border: none !important;">
                            <thead>
                                <tr>
                                    <th style="padding: 6px 8px; border: none !important;">Item</th>
                                    <th style="padding: 6px 8px; border: none !important;">Quantity</th>
                                    <th style="padding: 6px 8px; border: none !important;">Unit</th>
                                    <th style="padding: 6px 8px; border: none !important;">Price</th>
                                    <th style="padding: 6px 8px; border: none !important;">Total Price</th>
                                    <th style="padding: 6px 8px; width: 40px; border: none !important;"></th>
                                </tr>
                            </thead>
                            <tbody id="order-rtl-items-table-body">
                            </tbody>
                        </table>
                        <style>
                            #order-rtl-items-table-body td { padding: 0 !important; border: none !important; }
                            #order-rtl-items-table-body .modal-input { width: 100%; border-radius: 0; border: 1px solid #D6D6D6; padding: 6px 8px; font-size: 13px; box-sizing: border-box; }
                        </style>
                    </div>
                    <div class="modal-meta-row" style="margin-top: 12px; justify-content: flex-end;">
                        <div class="modal-field" style="flex: 0 0 200px;">
                            <label>Grand Total</label>
                            <input type="text" id="order-rtl-grand-total" readonly style="background: #f1f5f9; font-weight: 600;" />
                        </div>
                    </div>
                    <div class="modal-tab-actions" style="margin-top: 16px;">
                        <button id="save-order-rtl-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>

            <div id="pay-rtl-modal" class="modal hidden">
                <div class="modal-content" style="max-width: 900px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Payment of Ready to Lay</h3>
                        <button class="modal-close-btn" id="close-pay-rtl-modal">&times;</button>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Ready to Lay Payment ID</label>
                            <input type="text" id="pay-rtl-id" readonly />
                        </div>
                        <div class="modal-field">
                            <label>Sales Invoice</label>
                            <select id="pay-rtl-invoice" class="modal-select">
                                <option value="">Select Invoice</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Payment</label>
                            <select id="pay-rtl-type" class="modal-select">
                                <option value="Partial">Partial</option>
                                <option value="Full">Full</option>
                            </select>
                        </div>
                        <div class="modal-field">
                            <label>Balance</label>
                            <input type="text" id="pay-rtl-balance" readonly style="background: #f1f5f9;" />
                        </div>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Payment Amount</label>
                            <input type="text" id="pay-rtl-amount" placeholder="0,000.00" />
                        </div>
                        <div class="modal-field">
                            <label>Bank Source</label>
                            <select id="pay-rtl-bank-source" class="modal-select">
                                <option value="">-- Select Bank --</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Check Number</label>
                            <input type="text" id="pay-rtl-check-number" placeholder="Enter check number" />
                        </div>
                    </div>
                    <div class="modal-tab-actions" style="margin-top: 16px;">
                        <button id="save-pay-rtl-btn" class="btn-primary">Save</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;

        var API_BASE_RTL_SUPPLIERS = 'http://localhost:5000/api/rtl-suppliers';

        async function loadRtlSuppliers() {
            const tbody = document.getElementById('rtl-suppliers-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_RTL_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch RTL suppliers');
                const data = await res.json();

                if (data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #94a3b8;">No suppliers found</td></tr>';
                    return;
                }

                tbody.innerHTML = data.map(row => {
                    return `<tr><td>${row.supplier_id || ''}</td><td>${row.company_name || ''}</td><td>${row.address || ''}</td><td>${row.tin_number || ''}</td><td>${row.contact_person || ''}</td><td>${row.contact_number || ''}</td><td>${row.status || ''}</td></tr>`;
                }).join('');
            } catch (err) {
                console.error('Failed to load RTL suppliers:', err);
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        var API_BASE_RTL_TYPES = 'http://localhost:5000/api/rtl-types';
        var API_BASE_ORDER_RTL = 'http://localhost:5000/api/order-rtl';
        var API_BASE_ORDER_RTL_REPAYMENTS = 'http://localhost:5000/api/order-rtl-repayments';

        async function loadRtlTypes() {
            const tbody = document.getElementById('rtl-types-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_RTL_TYPES, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch RTL types');
                const data = await res.json();

                if (data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: #94a3b8;">No types found</td></tr>';
                    return;
                }

                tbody.innerHTML = data.map(row => {
                    return `<tr><td>${row.type_id || ''}</td><td>${row.company || ''}</td><td>${row.item || ''}</td><td>${row.remarks || ''}</td><td>${(parseFloat(row.price) || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td><td>${row.status || ''}</td></tr>`;
                }).join('');
            } catch (err) {
                console.error('Failed to load RTL types:', err);
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

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

        document.getElementById('open-rtl-modal').onclick = () => {
            alert('Add Ready-to Lay batch...');
        };

        function switchRtlSupplierTab(tab) {
            const createPanel = document.getElementById('panel-create-rtl-supplier');
            const editPanel = document.getElementById('panel-edit-rtl-supplier');
            const createTab = document.getElementById('tab-create-rtl-supplier');
            const editTab = document.getElementById('tab-edit-rtl-supplier');

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

        function openRtlSuppliersModal() {
            const modal = document.getElementById('rtl-suppliers-modal');
            if (!modal) return;

            document.getElementById('create-rtl-supplier-id').value = 'RTLSuID-1';
            switchRtlSupplierTab('create');
            modal.classList.remove('hidden');
        }

        function closeRtlSuppliersModal() {
            const modal = document.getElementById('rtl-suppliers-modal');
            if (modal) modal.classList.add('hidden');
        }

        function renderRtlSupplierSearchResults(suppliers) {
            const searchResults = document.getElementById('edit-rtl-supplier-search-results');
            if (!searchResults) return;

            if (!suppliers || suppliers.length === 0) {
                searchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No suppliers found</div>';
                searchResults.style.display = 'block';
                return;
            }

            searchResults.innerHTML = suppliers.map(s => `
                <div class="supplier-search-result" data-supplier-id="${s.supplier_id}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                    <div style="font-weight: 600; color: #1a1f2e;">${s.company_name || ''}</div>
                    <div style="font-size: 12px; color: #64748b;">${s.supplier_id || ''}</div>
                </div>
            `).join('');
            searchResults.style.display = 'block';

            searchResults.querySelectorAll('.supplier-search-result').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const supplierId = item.getAttribute('data-supplier-id');
                    selectRtlSupplier(supplierId);
                });
            });
        }

        if (document.getElementById('edit-rtl-supplier-search-results')) {
            document.getElementById('edit-rtl-supplier-search-results').addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        document.getElementById('edit-rtl-supplier-search').addEventListener('focus', () => {
            const query = document.getElementById('edit-rtl-supplier-search').value.trim();
            if (query.length >= 1) {
                document.getElementById('edit-rtl-supplier-search-results').style.display = 'block';
            }
        });

        document.addEventListener('click', (e) => {
            const searchResults = document.getElementById('edit-rtl-supplier-search-results');
            const searchInput = document.getElementById('edit-rtl-supplier-search');
            if (searchResults && searchInput && !searchResults.contains(e.target) && e.target !== searchInput) {
                searchResults.style.display = 'none';
            }
        });

        window.selectRtlSupplier = async (supplierId) => {
            const searchResults = document.getElementById('edit-rtl-supplier-search-results');
            if (searchResults) searchResults.style.display = 'none';

            try {
                const res = await fetch(`${API_BASE_RTL_SUPPLIERS}/code/${encodeURIComponent(supplierId)}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const supplier = await res.json();
                    document.getElementById('edit-rtl-supplier-id').value = supplier.supplier_id || '';
                    document.getElementById('edit-rtl-company-name').value = supplier.company_name || '';
                    document.getElementById('edit-rtl-address').value = supplier.address || '';
                    document.getElementById('edit-rtl-tin-number').value = supplier.tin_number || '';
                    document.getElementById('edit-rtl-contact-person').value = supplier.contact_person || '';
                    document.getElementById('edit-rtl-contact-number').value = supplier.contact_number || '';
                    document.getElementById('edit-rtl-supplier-status').value = supplier.status || 'Active';
                }
            } catch (err) {
                alert('Error loading supplier: ' + err.message);
            }
        };

        const addRtlSuppliersBtn = document.getElementById('add-rtl-suppliers-btn');
        if (addRtlSuppliersBtn) {
            addRtlSuppliersBtn.onclick = openRtlSuppliersModal;
        }

        const closeRtlSuppliersBtn = document.getElementById('close-rtl-suppliers-modal');
        if (closeRtlSuppliersBtn) {
            closeRtlSuppliersBtn.onclick = closeRtlSuppliersModal;
        }

        if (document.getElementById('rtl-suppliers-modal')) {
            const modal = document.getElementById('rtl-suppliers-modal');
            let mouseDownOnBackdrop = false;
            modal.addEventListener('mousedown', (e) => {
                mouseDownOnBackdrop = e.target === modal;
            });
            modal.addEventListener('mouseup', (e) => {
                if (mouseDownOnBackdrop && e.target === modal) {
                    modal.classList.add('hidden');
                }
                mouseDownOnBackdrop = false;
            });
        }

        const editRtlSearchInput = document.getElementById('edit-rtl-supplier-search');
        const rtlSearchResults = document.getElementById('edit-rtl-supplier-search-results');
        let rtlSearchDebounce = null;

        if (editRtlSearchInput && rtlSearchResults) {
            editRtlSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (rtlSearchDebounce) clearTimeout(rtlSearchDebounce);
                if (query.length < 1) {
                    rtlSearchResults.style.display = 'none';
                    return;
                }
                rtlSearchDebounce = setTimeout(async () => {
                    try {
                        const res = await fetch(API_BASE_RTL_SUPPLIERS + '?search=' + encodeURIComponent(query), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const suppliers = await res.json();
                            renderRtlSupplierSearchResults(suppliers);
                        }
                    } catch (err) {
                        console.error('Search failed', err);
                    }
                }, 300);
            });
        }

        const saveCreateRtlSupplierBtn = document.getElementById('save-create-rtl-supplier-btn');
        if (saveCreateRtlSupplierBtn) {
            saveCreateRtlSupplierBtn.onclick = async () => {
                const supplierId = document.getElementById('create-rtl-supplier-id').value;
                const companyName = document.getElementById('create-rtl-company-name').value.trim();
                const address = document.getElementById('create-rtl-address').value.trim();
                const tinNumber = document.getElementById('create-rtl-tin-number').value.trim();
                const contactPerson = document.getElementById('create-rtl-contact-person').value.trim();
                const contactNumber = document.getElementById('create-rtl-contact-number').value.trim();
                const status = document.getElementById('create-rtl-supplier-status').value;

                if (!supplierId || !companyName) {
                    alert('Supplier ID and Company Name are required');
                    return;
                }

                try {
                    const res = await fetch('http://localhost:5000/api/rtl-suppliers', {
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
                        throw new Error(errData.error || 'Failed to create RTL supplier');
                    }

                    alert('RTL Supplier created successfully');
                    closeRtlSuppliersModal();
                    loadRtlSuppliers();
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            };
        }

        const saveEditRtlSupplierBtn = document.getElementById('save-edit-rtl-supplier-btn');
        if (saveEditRtlSupplierBtn) {
            saveEditRtlSupplierBtn.onclick = async () => {
                const supplierId = document.getElementById('edit-rtl-supplier-id').value;
                const companyName = document.getElementById('edit-rtl-company-name').value.trim();
                const address = document.getElementById('edit-rtl-address').value.trim();
                const tinNumber = document.getElementById('edit-rtl-tin-number').value.trim();
                const contactPerson = document.getElementById('edit-rtl-contact-person').value.trim();
                const contactNumber = document.getElementById('edit-rtl-contact-number').value.trim();
                const status = document.getElementById('edit-rtl-supplier-status').value;

                if (!supplierId || !companyName) {
                    alert('Supplier ID and Company Name are required');
                    return;
                }

                try {
                    const res = await fetch(`http://localhost:5000/api/rtl-suppliers/${encodeURIComponent(supplierId)}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: JSON.stringify({
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
                        throw new Error(errData.error || 'Failed to update RTL supplier');
                    }

                    alert('RTL Supplier updated successfully');
                    closeRtlSuppliersModal();
                    loadRtlSuppliers();
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            };
        }

        window.switchRtlSupplierTab = switchRtlSupplierTab;
        window.openRtlSuppliersModal = openRtlSuppliersModal;
        window.closeRtlSuppliersModal = closeRtlSuppliersModal;

        function switchRtlTypeTab(tab) {
            const createPanel = document.getElementById('panel-create-rtl-type');
            const editPanel = document.getElementById('panel-edit-rtl-type');
            const createTab = document.getElementById('tab-create-rtl-type');
            const editTab = document.getElementById('tab-edit-rtl-type');

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

        async function openRtlTypesModal() {
            const modal = document.getElementById('rtl-types-modal');
            if (!modal) return;

            try {
                const idRes = await fetch('http://localhost:5000/api/rtl-types/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-rtl-type-id').value = idData.type_id || 'RTLTyID-1';
            } catch (err) {
                document.getElementById('create-rtl-type-id').value = 'RTLTyID-1';
            }

            const companySelect = document.getElementById('create-rtl-type-company');
            if (companySelect && companySelect.options.length <= 1) {
                try {
                    const suppliersRes = await fetch(API_BASE_RTL_SUPPLIERS, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (suppliersRes.ok) {
                        const suppliers = await suppliersRes.json();
                        companySelect.innerHTML = '<option value="">Select Company</option>' +
                            suppliers.filter(s => s.status === 'Active').map(s =>
                                `<option value="${s.company_name}">${s.company_name}</option>`
                            ).join('');
                    }
                } catch (err) {
                    console.error('Failed to load companies:', err);
                }
            }

            switchRtlTypeTab('create');
            modal.classList.remove('hidden');
        }

        function closeRtlTypesModal() {
            const modal = document.getElementById('rtl-types-modal');
            if (modal) modal.classList.add('hidden');
        }

        function renderRtlTypeSearchResults(types) {
            const searchResults = document.getElementById('edit-rtl-type-search-results');
            if (!searchResults) return;

            if (!types || types.length === 0) {
                searchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No types found</div>';
                searchResults.style.display = 'block';
                return;
            }

            searchResults.innerHTML = types.map(t => `
                <div class="supplier-search-result" data-type-id="${t.type_id}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                    <div style="font-weight: 600; color: #1a1f2e;">${t.item || ''}</div>
                    <div style="font-size: 12px; color: #64748b;">${t.type_id || ''} - ${t.company || ''}</div>
                </div>
            `).join('');
            searchResults.style.display = 'block';

            searchResults.querySelectorAll('.supplier-search-result').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const typeId = item.getAttribute('data-type-id');
                    selectRtlType(typeId);
                });
            });
        }

        window.selectRtlType = async (typeId) => {
            const searchResults = document.getElementById('edit-rtl-type-search-results');
            if (searchResults) searchResults.style.display = 'none';

            try {
                const res = await fetch(`http://localhost:5000/api/rtl-types/code/${encodeURIComponent(typeId)}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const type = await res.json();
                    document.getElementById('edit-rtl-type-id').value = type.type_id || '';
                    document.getElementById('edit-rtl-type-item').value = type.item || '';
                    document.getElementById('edit-rtl-type-remarks').value = type.remarks || '';
                    document.getElementById('edit-rtl-type-price').value = type.price || '';
                    document.getElementById('edit-rtl-type-status').value = type.status || 'Active';
                    const companySelect = document.getElementById('edit-rtl-type-company');
                    if (companySelect && type.company) {
                        companySelect.value = type.company;
                    }
                }
            } catch (err) {
                alert('Error loading RTL type: ' + err.message);
            }
        };

        function formatPrice(e) {
            let val = e.target.value.replace(/[^0-9.]/g, '');
            const parts = val.split('.');
            if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('');
            if (parts[1] && parts[1].length > 2) val = parts[0] + '.' + parts[1].substring(0, 2);
            e.target.value = val;
        }

        function setupPrice(input) {
            if (!input) return;
            input.addEventListener('input', formatPrice);
            input.addEventListener('blur', (e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && val >= 0) {
                    e.target.value = val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
            });
        }

        const addRtlTypeBtn = document.getElementById('add-rtl-type-btn');
        const rtlTypesModal = document.getElementById('rtl-types-modal');

        if (addRtlTypeBtn && rtlTypesModal) {
            addRtlTypeBtn.onclick = openRtlTypesModal;
        }

        const closeRtlTypesBtn = document.getElementById('close-rtl-types-modal');
        if (closeRtlTypesBtn && rtlTypesModal) {
            closeRtlTypesBtn.onclick = closeRtlTypesModal;
        }

        if (rtlTypesModal) {
            let mouseDownOnBackdrop = false;
            rtlTypesModal.addEventListener('mousedown', (e) => {
                mouseDownOnBackdrop = e.target === rtlTypesModal;
            });
            rtlTypesModal.addEventListener('mouseup', (e) => {
                if (mouseDownOnBackdrop && e.target === rtlTypesModal) {
                    rtlTypesModal.classList.add('hidden');
                }
                mouseDownOnBackdrop = false;
            });
        }

        const saveCreateRtlTypeBtn = document.getElementById('save-create-rtl-type-btn');
        if (saveCreateRtlTypeBtn) {
            saveCreateRtlTypeBtn.onclick = async () => {
                const typeId = document.getElementById('create-rtl-type-id').value;
                const company = document.getElementById('create-rtl-type-company').value;
                const item = document.getElementById('create-rtl-type-item').value.trim();
                const remarks = document.getElementById('create-rtl-type-remarks').value.trim();
                const priceVal = document.getElementById('create-rtl-type-price').value.trim();
                const status = document.getElementById('create-rtl-type-status').value;

                if (!typeId || !company || !item) {
                    alert('RTL Type ID, Company, and Item are required');
                    return;
                }

                try {
                    const res = await fetch('http://localhost:5000/api/rtl-types', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: JSON.stringify({
                            type_id: typeId,
                            company: company,
                            item: item,
                            remarks: remarks || null,
                            price: priceVal ? parseFloat(priceVal.replace(/,/g, '')) : 0,
                            status: status
                        })
                    });

                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to create RTL type');
                    }

                    alert('RTL Type created successfully');
                    closeRtlTypesModal();
                    loadRtlTypes();
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            };
        }

        const saveEditRtlTypeBtn = document.getElementById('save-edit-rtl-type-btn');
        if (saveEditRtlTypeBtn) {
            saveEditRtlTypeBtn.onclick = async () => {
                const typeId = document.getElementById('edit-rtl-type-id').value;
                const company = document.getElementById('edit-rtl-type-company').value;
                const item = document.getElementById('edit-rtl-type-item').value.trim();
                const remarks = document.getElementById('edit-rtl-type-remarks').value.trim();
                const priceVal = document.getElementById('edit-rtl-type-price').value.trim();
                const status = document.getElementById('edit-rtl-type-status').value;

                if (!typeId || !company || !item) {
                    alert('RTL Type ID, Company, and Item are required');
                    return;
                }

                try {
                    const res = await fetch(`http://localhost:5000/api/rtl-types/${encodeURIComponent(typeId)}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: JSON.stringify({
                            company: company,
                            item: item,
                            remarks: remarks || null,
                            price: priceVal ? parseFloat(priceVal.replace(/,/g, '')) : 0,
                            status: status
                        })
                    });

                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to update RTL type');
                    }

                    alert('RTL Type updated successfully');
                    closeRtlTypesModal();
                    loadRtlTypes();
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            };
        }

        const editRtlTypeSearchInput = document.getElementById('edit-rtl-type-search');
        const rtlTypeSearchResults = document.getElementById('edit-rtl-type-search-results');
        let rtlTypeSearchDebounce = null;

        if (editRtlTypeSearchInput && rtlTypeSearchResults) {
            editRtlTypeSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (rtlTypeSearchDebounce) clearTimeout(rtlTypeSearchDebounce);
                if (query.length < 1) {
                    rtlTypeSearchResults.style.display = 'none';
                    return;
                }
                rtlTypeSearchDebounce = setTimeout(async () => {
                    try {
                        const res = await fetch('http://localhost:5000/api/rtl-types?search=' + encodeURIComponent(query), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const types = await res.json();
                            renderRtlTypeSearchResults(types);
                        }
                    } catch (err) {
                        console.error('Search failed', err);
                    }
                }, 300);
            });
        }

        if (document.getElementById('edit-rtl-type-search-results')) {
            document.getElementById('edit-rtl-type-search-results').addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        document.getElementById('edit-rtl-type-search').addEventListener('focus', () => {
            const query = document.getElementById('edit-rtl-type-search').value.trim();
            if (query.length >= 1) {
                document.getElementById('edit-rtl-type-search-results').style.display = 'block';
            }
        });

        document.addEventListener('click', (e) => {
            const searchResults = document.getElementById('edit-rtl-type-search-results');
            const searchInput = document.getElementById('edit-rtl-type-search');
            if (searchResults && searchInput && !searchResults.contains(e.target) && e.target !== searchInput) {
                searchResults.style.display = 'none';
            }
        });

        window.switchRtlTypeTab = switchRtlTypeTab;
        window.openRtlTypesModal = openRtlTypesModal;
        window.closeRtlTypesModal = closeRtlTypesModal;

        setupPrice(document.getElementById('create-rtl-type-price'));
        setupPrice(document.getElementById('edit-rtl-type-price'));

        var orderRtlItems = [];
        var API_BASE_ORDER_RTL = 'http://localhost:5000/api/order-rtl';

        function formatNumber(num) {
            return (num || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function renderOrderRtlItems() {
            const tbody = document.getElementById('order-rtl-items-table-body');
            if (!tbody) return;

            if (orderRtlItems.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: #94a3b8;">No items added</td></tr>';
                document.getElementById('order-rtl-grand-total').value = '';
                return;
            }

            tbody.innerHTML = orderRtlItems.map((item, index) => {
                const totalPrice = item.quantity * item.price;
                return `
                    <tr>
                        <td><div class="building-name-cell">${item.item}</div></td>
                        <td><input type="number" value="${item.quantity}" min="1" style="width: 80px; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px;" onchange="updateOrderRtlItemQuantity(${index}, this.value)" /></td>
                        <td><div class="building-name-cell">${item.unit || 'Heads'}</div></td>
                        <td><div class="building-name-cell">P ${formatNumber(item.price)}</div></td>
                        <td><div class="building-name-cell">P ${formatNumber(totalPrice)}</div></td>
                        <td style="text-align: center;">
                            <button onclick="removeOrderRtlItem(${index})" style="background: none; border: none; cursor: pointer; color: #ef4444; font-size: 18px; font-weight: bold; padding: 4px;" title="Remove">&times;</button>
                        </td>
                    </tr>
                `;
            }).join('');

            const grandTotal = orderRtlItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
            document.getElementById('order-rtl-grand-total').value = 'P ' + formatNumber(grandTotal);
        }

        window.updateOrderRtlItemQuantity = (index, value) => {
            const qty = parseInt(value) || 1;
            if (qty < 1) {
                orderRtlItems[index].quantity = 1;
            } else {
                orderRtlItems[index].quantity = qty;
            }
            renderOrderRtlItems();
        };

        window.removeOrderRtlItem = (index) => {
            orderRtlItems.splice(index, 1);
            renderOrderRtlItems();
        };

        async function openOrderRtlModal() {
            const modal = document.getElementById('order-rtl-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_ORDER_RTL + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('order-rtl-id').value = idData.order_id || 'OrRTLID-1';
            } catch (err) {
                document.getElementById('order-rtl-id').value = 'OrRTLID-1';
            }

            document.getElementById('order-rtl-date').value = new Date().toISOString().split('T')[0];
            document.getElementById('order-rtl-invoice').value = '';
            document.getElementById('order-rtl-company').innerHTML = '<option value="">Select Company</option>';
            document.getElementById('order-rtl-product').innerHTML = '<option value="">Select Product</option>';
            document.getElementById('order-rtl-grand-total').value = '';
            orderRtlItems = [];
            renderOrderRtlItems();

            loadActiveCompaniesForOrderRtl();
            modal.classList.remove('hidden');
        }

        function closeOrderRtlModal() {
            const modal = document.getElementById('order-rtl-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadActiveCompaniesForOrderRtl() {
            const companySelect = document.getElementById('order-rtl-company');
            if (!companySelect) return;

            try {
                const res = await fetch(API_BASE_RTL_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const suppliers = await res.json();
                    const activeSuppliers = suppliers.filter(s => s.status === 'Active');
                    companySelect.innerHTML = '<option value="">Select Company</option>';
                    activeSuppliers.forEach(s => {
                        const option = document.createElement('option');
                        option.value = s.company_name;
                        option.textContent = s.company_name;
                        companySelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load companies for order RTL', err);
            }
        }

        async function loadRtlTypesByCompany(companyName) {
            const productSelect = document.getElementById('order-rtl-product');
            if (!productSelect) return;

            try {
                const res = await fetch(API_BASE_RTL_TYPES, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const types = await res.json();
                    const companyTypes = types.filter(t => t.company === companyName && t.status === 'Active');
                    productSelect.innerHTML = '<option value="">Select Product</option>';
                    companyTypes.forEach(t => {
                        const option = document.createElement('option');
                        option.value = t.type_id;
                        option.textContent = t.item;
                        option.setAttribute('data-item', t.item);
                        option.setAttribute('data-price', t.price || 0);
                        productSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load RTL types', err);
            }
        }

        async function loadOrderRtlTransactions() {
            const tbody = document.getElementById('rtl-transactions-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_ORDER_RTL, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch RTL orders');
                const orders = await res.json();

                if (orders.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #94a3b8;">No transactions found</td></tr>';
                    return;
                }

                tbody.innerHTML = orders.map(order => {
                    const date = order.date ? new Date(order.date).toISOString().split('T')[0] : '';
                    const paymentDate = order.payment_date ? new Date(order.payment_date).toISOString().split('T')[0] : '';
                    return `<tr>
                        <td>${order.order_id || ''}</td>
                        <td>${date}</td>
                        <td>${order.company || ''}</td>
                        <td>${order.sales_invoice || ''}</td>
                        <td>P ${formatNumber(parseFloat(order.grand_total) || 0)}</td>
                        <td>${paymentDate}</td>
                        <td>${order.payment_source || ''}</td>
                        <td>${order.check_number || ''}</td>
                        <td>${order.status || ''}</td>
                        <td style="text-align: center;">
                            <button onclick="deleteOrderRtl('${order.order_id}')" style="background: none; border: none; cursor: pointer; color: #ef4444; font-size: 18px; font-weight: bold; padding: 4px;" title="Delete">&times;</button>
                        </td>
                    </tr>`;
                }).join('');
            } catch (err) {
                console.error('Failed to load RTL transactions:', err);
                tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        async function loadRtlPayments() {
            const tbody = document.getElementById('rtl-payments-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_ORDER_RTL_REPAYMENTS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch RTL repayments');
                const repayments = await res.json();

                if (repayments.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #94a3b8;">No payment records found</td></tr>';
                    return;
                }

                tbody.innerHTML = repayments.map(repayment => {
                    const date = repayment.date ? new Date(repayment.date).toISOString().split('T')[0] : '';
                    return `<tr>
                        <td>${repayment.repayment_id || ''}</td>
                        <td>${repayment.order_id || ''}</td>
                        <td>${repayment.payment_type || ''}</td>
                        <td>P ${formatNumber(parseFloat(repayment.payment_amount) || 0)}</td>
                        <td>P ${formatNumber(parseFloat(repayment.starting_amount) || 0)}</td>
                        <td>P ${formatNumber(parseFloat(repayment.remaining_balance) || 0)}</td>
                        <td>${repayment.bank_source || ''}</td>
                        <td>${repayment.check_number || ''}</td>
                        <td>${date}</td>
                        <td>${repayment.status || ''}</td>
                        <td style="text-align: center;">
                            <button onclick="deleteRtlPayment('${repayment.repayment_id}')" style="background: none; border: none; cursor: pointer; color: #ef4444; font-size: 18px; font-weight: bold; padding: 4px;" title="Delete">&times;</button>
                        </td>
                    </tr>`;
                }).join('');
            } catch (err) {
                console.error('Failed to load RTL payments:', err);
                tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function addOrderRtlItem() {
            const productSelect = document.getElementById('order-rtl-product');
            const selectedOption = productSelect.options[productSelect.selectedIndex];

            if (!selectedOption || !selectedOption.value) {
                alert('Please select a product');
                return;
            }

            const typeId = selectedOption.value;
            const item = selectedOption.getAttribute('data-item') || selectedOption.textContent;
            const price = parseFloat(selectedOption.getAttribute('data-price') || 0);

            const existingItem = orderRtlItems.find(i => i.typeId === typeId);
            if (existingItem) {
                alert('Item already added');
                return;
            }

            orderRtlItems.push({
                typeId: typeId,
                item: item,
                quantity: 1,
                unit: 'Heads',
                price: price
            });

            renderOrderRtlItems();
            productSelect.value = '';
        }

        async function saveOrderRtl() {
            const orderId = document.getElementById('order-rtl-id').value;
            const date = document.getElementById('order-rtl-date').value;
            const invoice = document.getElementById('order-rtl-invoice').value.trim();
            const company = document.getElementById('order-rtl-company').value;
            const grandTotal = orderRtlItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

            if (!date) {
                alert('Date is required');
                return;
            }
            if (!company) {
                alert('Company is required');
                return;
            }
            if (orderRtlItems.length === 0) {
                alert('Please add at least one item');
                return;
            }

            try {
                const res = await fetch(API_BASE_ORDER_RTL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        order_id: orderId,
                        date: date,
                        sales_invoice: invoice || null,
                        company: company,
                        items: orderRtlItems,
                        grand_total: grandTotal
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save order');
                }

                try {
                    const expenseNextRes = await fetch('http://localhost:5000/api/expenses/next-id', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (expenseNextRes.ok) {
                        const expenseNextData = await expenseNextRes.json();
                        const expenseListId = expenseNextData.expense_list_id;
                        const remarks = orderRtlItems.map(item => `${item.item} priced at ${formatNumber(item.price)}`).join(', ');
                        if (expenseListId) {
                            await fetch('http://localhost:5000/api/expenses', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                                },
                                body: JSON.stringify({
                                    expense_list_id: expenseListId,
                                    tracking_id: orderId,
                                    date: date,
                                    accounting_code: '5105',
                                    expense_type: 'Flock Acquisition',
                                    description: `RTL from ${company} with SI# ${invoice || 'N/A'}`,
                                    remarks: remarks,
                                    total_amount: grandTotal,
                                    account_source: null,
                                    cleared_date: null,
                                    status: 'Pending'
                                })
                            });
                        }
                    }
                } catch (expenseErr) {
                    console.error('Error creating expense:', expenseErr);
                }

                alert('Order Ready to Lay saved successfully');
                closeOrderRtlModal();
                loadOrderRtlTransactions();
                loadRtlPayments();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        const orderRtlCompanySelect = document.getElementById('order-rtl-company');
        if (orderRtlCompanySelect) {
            orderRtlCompanySelect.addEventListener('change', (e) => {
                const company = e.target.value;
                if (company) {
                    loadRtlTypesByCompany(company);
                } else {
                    document.getElementById('order-rtl-product').innerHTML = '<option value="">Select Product</option>';
                }
            });
        }

        const orderRtlProductSelect = document.getElementById('order-rtl-product');
        if (orderRtlProductSelect) {
            orderRtlProductSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    addOrderRtlItem();
                    e.target.value = '';
                }
            });
        }

        const saveOrderRtlBtn = document.getElementById('save-order-rtl-btn');
        if (saveOrderRtlBtn) {
            saveOrderRtlBtn.onclick = saveOrderRtl;
        }

        const closeOrderRtlBtn = document.getElementById('close-order-rtl-modal');
        const orderRtlModal = document.getElementById('order-rtl-modal');
        if (closeOrderRtlBtn && orderRtlModal) {
            closeOrderRtlBtn.onclick = closeOrderRtlModal;
        }

        if (orderRtlModal) {
            let mouseDownOnBackdrop = false;
            orderRtlModal.addEventListener('mousedown', (e) => {
                mouseDownOnBackdrop = e.target === orderRtlModal;
            });
            orderRtlModal.addEventListener('mouseup', (e) => {
                if (mouseDownOnBackdrop && e.target === orderRtlModal) {
                    orderRtlModal.classList.add('hidden');
                }
                mouseDownOnBackdrop = false;
            });
        }

        const openOrderRtlBtn = document.getElementById('open-rtl-modal');
        if (openOrderRtlBtn) {
            openOrderRtlBtn.onclick = openOrderRtlModal;
        }

        function maskBankAccount(accountNumber) {
            if (!accountNumber) return '';
            const str = String(accountNumber);
            if (str.length <= 4) return str;
            return str.slice(0, 4) + '****' + str.slice(-4);
        }

        async function openPayRtlModal() {
            const modal = document.getElementById('pay-rtl-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_ORDER_RTL_REPAYMENTS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('pay-rtl-id').value = idData.repayment_id || 'RTLPayID-1';
            } catch (err) {
                document.getElementById('pay-rtl-id').value = 'RTLPayID-1';
            }

            document.getElementById('pay-rtl-invoice').innerHTML = '<option value="">Select Invoice</option>';
            document.getElementById('pay-rtl-type').value = 'Partial';
            document.getElementById('pay-rtl-balance').value = '';
            document.getElementById('pay-rtl-amount').value = '';
            document.getElementById('pay-rtl-check-number').value = '';
            const bankSelect = document.getElementById('pay-rtl-bank-source');
            bankSelect.innerHTML = '<option value="">-- Select Bank --</option>';

            loadBanksForPayRtl();
            loadUnpaidInvoicesForPayRtl();

            modal.classList.remove('hidden');
        }

        function closePayRtlModal() {
            const modal = document.getElementById('pay-rtl-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadBanksForPayRtl() {
            const bankSelect = document.getElementById('pay-rtl-bank-source');
            if (!bankSelect) return;

            try {
                const res = await fetch('http://localhost:5000/api/bank-accounts', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const accounts = await res.json();
                    const activeAccounts = accounts.filter(acc => acc.status === 'Active');
                    activeAccounts.forEach(acc => {
                        const option = document.createElement('option');
                        option.value = acc.bank_account_id;
                        option.textContent = `${acc.bank} - ${maskBankAccount(acc.bank_account_number)}`;
                        bankSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load banks for pay RTL', err);
            }
        }

        async function loadUnpaidInvoicesForPayRtl() {
            const invoiceSelect = document.getElementById('pay-rtl-invoice');
            if (!invoiceSelect) return;

            try {
                const res = await fetch(API_BASE_ORDER_RTL, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const orders = await res.json();
                    const pendingOrders = orders.filter(o => o.status === 'Pending');
                    invoiceSelect.innerHTML = '<option value="">Select Invoice</option>';
                    pendingOrders.forEach(order => {
                        const option = document.createElement('option');
                        option.value = order.order_id;
                        option.textContent = `${order.order_id} - ${order.company} (P ${formatNumber(parseFloat(order.grand_total) || 0)})`;
                        option.setAttribute('data-date', order.date || '');
                        invoiceSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load unpaid invoices', err);
            }
        }

        async function loadUnpaidInvoicesForPayRtl() {
            const invoiceSelect = document.getElementById('pay-rtl-invoice');
            if (!invoiceSelect) return;

            try {
                const res = await fetch(API_BASE_ORDER_RTL, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const orders = await res.json();
                    const pendingOrders = orders.filter(o => o.status === 'Pending');
                    invoiceSelect.innerHTML = '<option value="">Select Invoice</option>';
                    pendingOrders.forEach(order => {
                        const option = document.createElement('option');
                        option.value = order.order_id;
                        option.textContent = `${order.order_id} - ${order.company} (P ${formatNumber(parseFloat(order.grand_total) || 0)})`;
                        option.setAttribute('data-date', order.date || '');
                        option.setAttribute('data-grand-total', order.grand_total || 0);
                        invoiceSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load unpaid invoices', err);
            }
        }

        async function updatePayRtlBalance() {
            const invoiceSelect = document.getElementById('pay-rtl-invoice');
            const balanceInput = document.getElementById('pay-rtl-balance');
            if (!invoiceSelect || !balanceInput) return;

            const selectedOption = invoiceSelect.options[invoiceSelect.selectedIndex];
            if (!selectedOption || !selectedOption.value) {
                balanceInput.value = '';
                return;
            }

            const orderId = selectedOption.value;
            const grandTotal = parseFloat(selectedOption.getAttribute('data-grand-total') || 0);

            try {
                const res = await fetch(API_BASE_ORDER_RTL_REPAYMENTS + '/order/' + encodeURIComponent(orderId), {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                let totalPaid = 0;
                if (res.ok) {
                    const repayments = await res.json();
                    totalPaid = repayments.reduce((sum, r) => sum + (parseFloat(r.payment_amount) || 0), 0);
                }

                const remainingBalance = Math.max(0, grandTotal - totalPaid);
                balanceInput.value = 'P ' + formatNumber(remainingBalance);
            } catch (err) {
                console.error('Failed to calculate balance', err);
                balanceInput.value = 'P ' + formatNumber(grandTotal);
            }
        }

        const payRtlBtn = document.getElementById('pay-rtl-btn');
        if (payRtlBtn) {
            payRtlBtn.onclick = openPayRtlModal;
        }

        const closePayRtlBtn = document.getElementById('close-pay-rtl-modal');
        const payRtlModal = document.getElementById('pay-rtl-modal');
        if (closePayRtlBtn && payRtlModal) {
            closePayRtlBtn.onclick = closePayRtlModal;
        }

        if (payRtlModal) {
            let mouseDownOnBackdrop = false;
            payRtlModal.addEventListener('mousedown', (e) => {
                mouseDownOnBackdrop = e.target === payRtlModal;
            });
            payRtlModal.addEventListener('mouseup', (e) => {
                if (mouseDownOnBackdrop && e.target === payRtlModal) {
                    payRtlModal.classList.add('hidden');
                }
                mouseDownOnBackdrop = false;
            });
        }

        const payRtlInvoiceSelect = document.getElementById('pay-rtl-invoice');
        if (payRtlInvoiceSelect) {
            payRtlInvoiceSelect.addEventListener('change', updatePayRtlBalance);
        }

        const payRtlTypeSelect = document.getElementById('pay-rtl-type');
        const payRtlAmountInput = document.getElementById('pay-rtl-amount');
        if (payRtlTypeSelect && payRtlAmountInput) {
            payRtlTypeSelect.addEventListener('change', (e) => {
                if (e.target.value === 'Full') {
                    const balanceStr = document.getElementById('pay-rtl-balance').value.replace(/P /g, '').replace(/,/g, '');
                    const balance = parseFloat(balanceStr) || 0;
                    payRtlAmountInput.value = balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                } else {
                    payRtlAmountInput.value = '';
                }
            });
        }

        const savePayRtlBtn = document.getElementById('save-pay-rtl-btn');
        if (savePayRtlBtn) {
            savePayRtlBtn.onclick = async () => {
                const repaymentId = document.getElementById('pay-rtl-id').value;
                const invoiceSelect = document.getElementById('pay-rtl-invoice');
                const orderId = invoiceSelect ? invoiceSelect.value : '';
                const paymentType = document.getElementById('pay-rtl-type').value;
                const amountStr = document.getElementById('pay-rtl-amount').value.replace(/,/g, '');
                const paymentAmount = parseFloat(amountStr) || 0;
                const balanceStr = document.getElementById('pay-rtl-balance').value.replace(/P /g, '').replace(/,/g, '');
                const balance = parseFloat(balanceStr) || 0;
                const bankSource = document.getElementById('pay-rtl-bank-source').value;
                const checkNumber = document.getElementById('pay-rtl-check-number').value.trim();
                const date = document.getElementById('pay-rtl-invoice').options[invoiceSelect.selectedIndex]?.getAttribute('data-date') || new Date().toISOString().split('T')[0];

                if (!orderId) {
                    alert('Please select a sales invoice');
                    return;
                }
                if (paymentAmount <= 0) {
                    alert('Please enter a valid payment amount');
                    return;
                }
                if (!bankSource) {
                    alert('Please select a bank source');
                    return;
                }

                try {
                    const res = await fetch(API_BASE_ORDER_RTL_REPAYMENTS, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: JSON.stringify({
                            repayment_id: repaymentId,
                            order_id: orderId,
                            payment_type: paymentType,
                            payment_amount: paymentAmount,
                            starting_amount: balance,
                            remaining_balance: Math.max(0, balance - paymentAmount),
                            bank_source: bankSource,
                            check_number: checkNumber || null,
                            date: new Date().toISOString().split('T')[0],
                            status: 'Pending'
                        })
                    });

                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to save payment');
                    }

                    const orderRes = await fetch(API_BASE_ORDER_RTL, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    const orders = orderRes.ok ? await orderRes.json() : [];
                    const order = orders.find(o => o.order_id === orderId);

                    if (paymentType === 'Full') {
                        const createdBy = (() => {
                            try {
                                const token = localStorage.getItem('goldenfield_auth_token');
                                if (token) {
                                    const payload = JSON.parse(atob(token.split('.')[1]));
                                    return payload.email || 'Admin';
                                }
                            } catch (e) {
                                console.error('Failed to decode token', e);
                            }
                            return 'Admin';
                        })();

                        await fetch(`${API_BASE_ORDER_RTL}/${encodeURIComponent(orderId)}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                            },
                            body: JSON.stringify({
                                status: 'Paid',
                                payment_date: date,
                                payment_source: bankSource,
                                check_number: checkNumber,
                                created_by: createdBy
                            })
                        });

                        const expenseRes = await fetch('http://localhost:5000/api/expenses/by-tracking-id/' + encodeURIComponent(orderId), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });

                        let expenseUpdated = false;
                        if (expenseRes.ok) {
                            const expenses = await expenseRes.json();
                            if (expenses.length > 0) {
                                const existingExpense = expenses[0];
                                const updateRes = await fetch('http://localhost:5000/api/expenses/' + encodeURIComponent(existingExpense.id), {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                                    },
                                    body: JSON.stringify({
                                        status: 'Paid',
                                        cleared_date: date,
                                        payment_date: date,
                                        account_source: bankSource
                                    })
                                });
                                expenseUpdated = updateRes.ok;
                            }
                        }

                        if (!expenseUpdated) {
                            try {
                                const expenseNextRes = await fetch('http://localhost:5000/api/expenses/next-id', {
                                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                                });
                                if (expenseNextRes.ok) {
                                    const expenseNextData = await expenseNextRes.json();
                                    const expenseListId = expenseNextData.expense_list_id;
                                    if (expenseListId) {
                                        const createRes = await fetch('http://localhost:5000/api/expenses', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                                            },
                                            body: JSON.stringify({
                                                expense_list_id: expenseListId,
                                                tracking_id: orderId,
                                                date: date,
                                                accounting_code: '5105',
                                                expense_type: 'Flock Acquisition',
                                                description: `RTL from ${order?.company || ''} with SI# ${order?.sales_invoice || 'N/A'}`,
                                                remarks: orderRtlItems.map(item => `${item.item} priced at ${formatNumber(item.price)}`).join(', '),
                                                total_amount: parseFloat(order?.grand_total || 0),
                                                account_source: bankSource,
                                                cleared_date: date,
                                                payment_date: date,
                                                status: 'Paid'
                                            })
                                        });
                                        if (!createRes.ok) {
                                            const errData = await createRes.json().catch(() => ({}));
                                            console.error('Failed to create fallback expense:', errData);
                                        }
                                    }
                                }
                            } catch (expenseErr) {
                                console.error('Error creating fallback expense:', expenseErr);
                            }
                        }
                    } else {
                        const expenseNextRes = await fetch('http://localhost:5000/api/expenses/next-id', {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (expenseNextRes.ok) {
                            const expenseNextData = await expenseNextRes.json();
                            const expenseListId = expenseNextData.expense_list_id;
                            if (expenseListId) {
                                const createRes = await fetch('http://localhost:5000/api/expenses', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                                    },
                                body: JSON.stringify({
                                    expense_list_id: expenseListId,
                                    tracking_id: repaymentId,
                                    date: date,
                                    accounting_code: '',
                                    expense_type: '',
                                    description: `Partial Payment to ${orderId} from ${order?.company || ''}`,
                                    remarks: `${paymentAmount} out of ${balance}`,
                                    total_amount: null,
                                    account_source: bankSource,
                                    cleared_date: date,
                                    status: 'Pending'
                                })
                                });
                                if (!createRes.ok) {
                                    const errData = await createRes.json().catch(() => ({}));
                                    console.error('Failed to create partial expense:', errData);
                                }
                            }
                        }

                        const repaymentsRes = await fetch(API_BASE_ORDER_RTL_REPAYMENTS + '/order/' + encodeURIComponent(orderId), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (repaymentsRes.ok) {
                            const allRepayments = await repaymentsRes.json();
                            const totalPaid = allRepayments.reduce((sum, r) => sum + (parseFloat(r.payment_amount) || 0), 0);
                            const grandTotal = parseFloat(order?.grand_total || 0);

                            if (totalPaid >= grandTotal && grandTotal > 0) {
                                const sortedRepayments = allRepayments
                                    .filter(r => r.date)
                                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                                const lastPaymentDate = sortedRepayments.length > 0 ? sortedRepayments[0].date : new Date().toISOString().split('T')[0];
                                const paymentSources = [...new Set(allRepayments.map(r => r.bank_source).filter(Boolean))].join(', ');
                                const checkNumbers = [...new Set(allRepayments.map(r => r.check_number).filter(Boolean))].join(', ');

                                const createdBy = (() => {
                                    try {
                                        const token = localStorage.getItem('goldenfield_auth_token');
                                        if (token) {
                                            const payload = JSON.parse(atob(token.split('.')[1]));
                                            return payload.email || 'Admin';
                                        }
                                    } catch (e) {
                                        console.error('Failed to decode token', e);
                                    }
                                    return 'Admin';
                                })();

                                await fetch(`${API_BASE_ORDER_RTL}/${encodeURIComponent(orderId)}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                                    },
                                    body: JSON.stringify({
                                        status: 'Paid',
                                        payment_date: lastPaymentDate,
                                        payment_source: paymentSources || bankSource,
                                        check_number: checkNumbers || checkNumber,
                                        created_by: createdBy
                                    })
                                });

                                const expenseRes = await fetch('http://localhost:5000/api/expenses/by-tracking-id/' + encodeURIComponent(orderId), {
                                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                                });
                                if (expenseRes.ok) {
                                    const expenses = await expenseRes.json();
                                    for (const expense of expenses) {
                                        await fetch('http://localhost:5000/api/expenses/' + encodeURIComponent(expense.id), {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                                            },
                                            body: JSON.stringify({
                                                status: 'Paid',
                                                cleared_date: date,
                                                payment_date: date,
                                                account_source: bankSource
                                            })
                                        });
                                    }
                                }
                            }
                        }
                    }

                    alert('Payment saved successfully');
                    closePayRtlModal();
                    loadOrderRtlTransactions();
                    loadRtlPayments();
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            };
        }

        window.deleteOrderRtl = async (orderId) => {
            if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
                return;
            }

            try {
                const res = await fetch(`${API_BASE_ORDER_RTL}/${encodeURIComponent(orderId)}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    }
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to delete order');
                }

                alert('Order deleted successfully');
                loadOrderRtlTransactions();
                loadRtlPayments();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };

        window.deleteRtlPayment = async (repaymentId) => {
            if (!confirm('Are you sure you want to delete this payment record? This action cannot be undone.')) {
                return;
            }

            try {
                const res = await fetch(`${API_BASE_ORDER_RTL_REPAYMENTS}/repayment-id/${encodeURIComponent(repaymentId)}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    }
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to delete payment');
                }

                alert('Payment deleted successfully');
                loadRtlPayments();
                loadOrderRtlTransactions();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };

        loadRtlSuppliers();
        loadRtlTypes();
        loadOrderRtlTransactions();
        loadRtlPayments();
    };

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'purchasing';
    const render = ModuleComponents[currentTab] || ModuleComponents['purchasing'];
    render(contentArea);
}
