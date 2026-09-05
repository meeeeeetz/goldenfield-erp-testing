if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['purchasing-egg-tray'] = (container) => {
        container.innerHTML = `
            <div class="egg-tray-layout">
                <div class="header-actions">
                    <h2>Egg Tray Inventory</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="open-tray-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Order Egg Tray</span>
                    </button>
                    <button id="add-tray-suppliers-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Egg Tray Suppliers</span>
                    </button>
                    <button id="add-tray-type-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Egg Tray Type</span>
                    </button>
                </div>
                <div class="tracking-cards-row">
                    <div class="card tracking-card">
                        <h3>Egg Tray Available</h3>
                        <p class="card-sub-label">Egg tray Stocks in the warehouse</p>
                        <div class="card-value-row">
                            <div class="card-value" id="egg-tray-total-quantity">0 pcs</div>
                        </div>
                    </div>
                    <div class="card tracking-card">
                        <h3>Monthly Egg Trays Sold</h3>
                        <p class="card-sub-label">Egg Trays sold this month</p>
                        <div class="card-value-row">
                            <div class="card-value">456,023 pcs</div>
                            <span class="trend-up">▲ 5%</span>
                        </div>
                        <p class="vs-last-month">VS last month</p>
                    </div>
                    <div class="card tracking-card">
                        <h3>Monthly Egg Trays Waste</h3>
                        <p class="card-sub-label">Egg Trays Waste this month</p>
                        <div class="card-value-row">
                            <div class="card-value">3,000 pcs</div>
                            <span class="trend-up">▲ 1%</span>
                        </div>
                        <p class="vs-last-month">VS last month</p>
                    </div>
                    <div class="card tracking-card">
                        <h3>Outstanding Balance</h3>
                        <p class="card-sub-label">Balance to suppliers</p>
                        <div class="card-value-row">
                            <div class="card-value" id="egg-tray-outstanding-balance">P 0.00</div>
                        </div>
                    </div>
                </div>
                <div class="card graph-placeholder">
                    <h3>Egg Tray Transactions</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Order Egg Tray ID</th>
                                    <th>Date</th>
                                    <th>Supplier</th>
                                    <th>Invoice</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th>Payment</th>
                                    <th>Payment Date</th>
                                    <th>Payment Source</th>
                                    <th>Check Number</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="egg-tray-transactions-page-table-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="egg-tray-transactions-page-pagination">
                    </div>
                </div>
                <div class="bottom-cards-row">
                    <div class="card graph-placeholder tray-suppliers-card">
                        <h3>Egg Tray Suppliers</h3>
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
                                <tbody id="egg-tray-suppliers-page-table-body">
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination" id="egg-tray-suppliers-page-pagination">
                        </div>
                    </div>
                    <div class="card graph-placeholder tray-type-card">
                        <h3>Egg Tray Type</h3>
                        <div class="table-wrap">
                            <table class="data-table product-table">
                                <thead>
                                    <tr>
                                        <th>Egg Tray ID</th>
                                        <th>Supplier ID</th>
                                        <th>Remarks</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="egg-tray-types-page-table-body">
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination" id="egg-tray-types-page-pagination">
                        </div>
                    </div>
                </div>
                <div id="tray-modal" class="modal hidden">
                    <div class="modal-content">
                        <h3>Log Egg Tray</h3>
                        <input type="number" placeholder="Tray Count" id="tray-count-input" />
                        <button id="save-tray-btn" class="btn-primary">Save Tray</button>
                    </div>
                </div>

                <div id="egg-tray-suppliers-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Egg Tray Suppliers Management</h3>
                            <button class="modal-close-btn" id="close-egg-tray-suppliers-modal">&times;</button>
                        </div>
                        <div class="modal-tabs">
                            <button class="modal-tab active" id="tab-create-egg-tray-supplier" onclick="switchEggTraySupplierTab('create')">New Egg Tray Supplier</button>
                            <button class="modal-tab" id="tab-edit-egg-tray-supplier" onclick="switchEggTraySupplierTab('edit')">Manage Egg Tray Supplier</button>
                        </div>
                        <div id="panel-create-egg-tray-supplier" class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Egg Tray Supplier ID</label>
                                <input type="text" id="create-egg-tray-supplier-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company Name</label>
                                    <input type="text" id="create-egg-tray-company-name" placeholder="Enter company name" />
                                </div>
                                <div class="modal-field">
                                    <label>Address</label>
                                    <input type="text" id="create-egg-tray-address" placeholder="Enter address" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>TIN Number</label>
                                    <input type="text" id="create-egg-tray-tin-number" placeholder="TIN Number" maxlength="20" />
                                </div>
                                <div class="modal-field">
                                    <label>Contact Person</label>
                                    <input type="text" id="create-egg-tray-contact-person" placeholder="Enter contact person" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Contact Number</label>
                                    <input type="text" id="create-egg-tray-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="create-egg-tray-supplier-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-create-egg-tray-supplier-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                        <div id="panel-edit-egg-tray-supplier" class="modal-tab-panel" style="display: none;">
                            <div class="modal-field">
                                <label>Search Egg Tray Supplier</label>
                                <div style="position: relative;">
                                    <input type="text" id="edit-egg-tray-supplier-search" placeholder="Search by company name..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                                    <div id="edit-egg-tray-supplier-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                                </div>
                            </div>
                            <div class="modal-field">
                                <label>Egg Tray Supplier ID</label>
                                <input type="text" id="edit-egg-tray-supplier-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company Name</label>
                                    <input type="text" id="edit-egg-tray-company-name" placeholder="Enter company name" />
                                </div>
                                <div class="modal-field">
                                    <label>Address</label>
                                    <input type="text" id="edit-egg-tray-address" placeholder="Enter address" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>TIN Number</label>
                                    <input type="text" id="edit-egg-tray-tin-number" placeholder="TIN Number" maxlength="20" />
                                </div>
                                <div class="modal-field">
                                    <label>Contact Person</label>
                                    <input type="text" id="edit-egg-tray-contact-person" placeholder="Enter contact person" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Contact Number</label>
                                    <input type="text" id="edit-egg-tray-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="edit-egg-tray-supplier-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-edit-egg-tray-supplier-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="egg-tray-type-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Egg Tray Type</h3>
                            <button class="modal-close-btn" id="close-egg-tray-type-modal">&times;</button>
                        </div>
                        <div class="modal-tabs">
                            <button class="modal-tab active" id="tab-create-egg-tray-type" onclick="switchEggTrayTypeTab('create')">Create New Egg Tray Type</button>
                            <button class="modal-tab" id="tab-edit-egg-tray-type" onclick="switchEggTrayTypeTab('edit')">Manage Egg Tray Type</button>
                        </div>
                        <div id="panel-create-egg-tray-type" class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Egg Tray Type ID</label>
                                <input type="text" id="create-egg-tray-type-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Supplier</label>
                                    <select id="create-egg-tray-type-supplier" class="modal-select">
                                        <option value="">Select Supplier</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Price Per Piece</label>
                                    <input type="text" id="create-egg-tray-type-price" placeholder="0.00" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Remarks</label>
                                    <textarea id="create-egg-tray-type-remarks" placeholder="Enter remarks" rows="3" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; resize: vertical;"></textarea>
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="create-egg-tray-type-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-create-egg-tray-type-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                        <div id="panel-edit-egg-tray-type" class="modal-tab-panel" style="display: none;">
                            <div class="modal-field">
                                <label>Search Egg Tray Type</label>
                                <div style="position: relative;">
                                    <input type="text" id="edit-egg-tray-type-search" placeholder="Search by type ID..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                                    <div id="edit-egg-tray-type-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                                </div>
                            </div>
                            <div class="modal-field">
                                <label>Egg Tray Type ID</label>
                                <input type="text" id="edit-egg-tray-type-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Supplier</label>
                                    <select id="edit-egg-tray-type-supplier" class="modal-select">
                                        <option value="">Select Supplier</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Price Per Piece</label>
                                    <input type="text" id="edit-egg-tray-type-price" placeholder="0.00" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Remarks</label>
                                    <textarea id="edit-egg-tray-type-remarks" placeholder="Enter remarks" rows="3" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; resize: vertical;"></textarea>
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="edit-egg-tray-type-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-edit-egg-tray-type-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="order-egg-tray-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 600px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Order Egg Tray</h3>
                            <button class="modal-close-btn" id="close-order-egg-tray-modal">&times;</button>
                        </div>
                        <div class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Order Egg Tray ID</label>
                                <input type="text" id="order-egg-tray-id" readonly />
                            </div>
                            <div class="modal-field">
                                <label>Date</label>
                                <input type="date" id="order-egg-tray-date" />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Supplier</label>
                                    <select id="order-egg-tray-supplier" class="modal-select">
                                        <option value="">Select Supplier</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Invoice</label>
                                    <input type="text" id="order-egg-tray-invoice" placeholder="Enter invoice number" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Product</label>
                                    <select id="order-egg-tray-product" class="modal-select">
                                        <option value="">Select Product</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Price/pc</label>
                                    <input type="text" id="order-egg-tray-unit-price" readonly />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Quantity</label>
                                    <input type="text" id="order-egg-tray-quantity" placeholder="0" />
                                </div>
                                <div class="modal-field">
                                    <label>Price</label>
                                    <input type="text" id="order-egg-tray-price" readonly />
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-order-egg-tray-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="egg-tray-payment-modal" class="modal hidden">
                <div class="modal-content" style="max-width: 500px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Add Payment</h3>
                        <button class="modal-close-btn" id="close-egg-tray-payment-modal">&times;</button>
                    </div>
                    <div class="modal-tab-panel" style="display: block;">
                        <input type="hidden" id="egg-tray-payment-order-id" />
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Payment Date</label>
                                <input type="date" id="egg-tray-payment-date" />
                            </div>
                            <div class="modal-field">
                                <label>Payment Source</label>
                                <select id="egg-tray-payment-source" class="modal-select">
                                    <option value="">Select Bank Account</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Check Number</label>
                                <input type="text" id="egg-tray-payment-check-number" placeholder="Enter check number (optional)" />
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-egg-tray-payment-btn" class="btn-primary">Save Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

        function formatNumber(num) {
            if (isNaN(num)) return '-';
            return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function formatDate(dateStr) {
            if (!dateStr) return '-';
            if (dateStr.includes('T')) {
                return dateStr.split('T')[0];
            }
            return dateStr;
        }

        function maskAccountNumber(accountNumber) {
            if (!accountNumber) return '';
            const str = String(accountNumber);
            if (str.length <= 5) return str;
            const first3 = str.slice(0, 3);
            const last2 = str.slice(-2);
            const middle = '*'.repeat(str.length - 5);
            return first3 + middle + last2;
        }

        document.getElementById('save-tray-btn').onclick = () => {
            const count = document.getElementById('tray-count-input').value;
            alert(`Logging ${count} egg trays...`);
            document.getElementById('tray-modal').classList.add('hidden');
        };

        var currentEggTrayUnitPrice = 0;

        async function openOrderEggTrayModal() {
            const modal = document.getElementById('order-egg-tray-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_ORDER_EGG_TRAY + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('order-egg-tray-id').value = idData.order_id || 'OrTraID-1';
            } catch (err) {
                document.getElementById('order-egg-tray-id').value = 'OrTraID-1';
            }

            await loadActiveSuppliersForOrder();
            document.getElementById('order-egg-tray-product').innerHTML = '<option value="">Select Product</option>';
            document.getElementById('order-egg-tray-unit-price').value = '';
            document.getElementById('order-egg-tray-quantity').value = '';
            document.getElementById('order-egg-tray-price').value = '';
            document.getElementById('order-egg-tray-invoice').value = '';
            document.getElementById('order-egg-tray-date').value = new Date().toISOString().split('T')[0];
            currentEggTrayUnitPrice = 0;

            modal.classList.remove('hidden');
        }

        function closeOrderEggTrayModal() {
            const modal = document.getElementById('order-egg-tray-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadActiveSuppliersForOrder() {
            const supplierSelect = document.getElementById('order-egg-tray-supplier');
            if (!supplierSelect) return;

            try {
                const res = await fetch(API_BASE_EGG_TRAY_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const suppliers = await res.json();
                    const activeSuppliers = suppliers.filter(s => s.status === 'Active');
                    supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
                    activeSuppliers.forEach(s => {
                        const option = document.createElement('option');
                        option.value = s.supplier_id;
                        option.textContent = s.company_name;
                        supplierSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load suppliers for order', err);
            }
        }

        async function loadEggTrayTypesBySupplier(supplierId) {
            const productSelect = document.getElementById('order-egg-tray-product');
            if (!productSelect) return;

            try {
                const res = await fetch(API_BASE_EGG_TRAY_TYPES, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const types = await res.json();
                    const supplierTypes = types.filter(t => t.supplier_id === supplierId && t.status === 'Active');
                    productSelect.innerHTML = '<option value="">Select Product</option>';
                    supplierTypes.forEach(t => {
                        const option = document.createElement('option');
                        option.value = t.type_id;
                        option.textContent = t.type_id;
                        option.setAttribute('data-price', t.price_per_piece || 0);
                        productSelect.appendChild(option);
                    });
                    currentEggTrayUnitPrice = 0;
                    document.getElementById('order-egg-tray-unit-price').value = '';
                    document.getElementById('order-egg-tray-price').value = '';
                }
            } catch (err) {
                console.error('Failed to load egg tray types', err);
            }
        }

        function computeOrderPrice() {
            const productSelect = document.getElementById('order-egg-tray-product');
            const quantityInput = document.getElementById('order-egg-tray-quantity');
            const priceInput = document.getElementById('order-egg-tray-price');

            if (!productSelect || !quantityInput || !priceInput) return;

            const selectedOption = productSelect.options[productSelect.selectedIndex];
            const unitPrice = selectedOption ? parseFloat(selectedOption.getAttribute('data-price') || 0) : 0;
            currentEggTrayUnitPrice = unitPrice;

            const quantity = parseInt(quantityInput.value.replace(/,/g, '')) || 0;
            const totalPrice = unitPrice * quantity;

            priceInput.value = totalPrice > 0 ? formatNumber(totalPrice) : '';
        }

        async function saveOrderEggTray() {
            const orderId = document.getElementById('order-egg-tray-id').value;
            const supplierId = document.getElementById('order-egg-tray-supplier').value;
            const invoice = document.getElementById('order-egg-tray-invoice').value.trim();
            const date = document.getElementById('order-egg-tray-date').value;
            const productId = document.getElementById('order-egg-tray-product').value;
            const quantity = parseInt(document.getElementById('order-egg-tray-quantity').value.replace(/,/g, '')) || 0;
            const unitPrice = currentEggTrayUnitPrice || 0;
            const totalPrice = unitPrice * quantity;

            if (!supplierId) {
                alert('Supplier is required');
                return;
            }
            if (!productId) {
                alert('Product is required');
                return;
            }
            if (quantity <= 0) {
                alert('Quantity is required');
                return;
            }

            try {
                const res = await fetch(API_BASE_ORDER_EGG_TRAY, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        order_id: orderId,
                        date: date,
                        supplier_id: supplierId,
                        type_id: productId,
                        quantity: quantity,
                        unit_price: unitPrice,
                        total_price: totalPrice,
                        invoice: invoice || null,
                        status: 'Pending'
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save order');
                }

                alert('Order Egg Tray saved successfully\n\nOrder ID: ' + orderId + '\nDate: ' + date + '\nSupplier: ' + supplierId + '\nInvoice: ' + (invoice || 'N/A') + '\nProduct: ' + productId + '\nQuantity: ' + quantity + '\nTotal Price: P ' + formatNumber(totalPrice));
                closeOrderEggTrayModal();
                loadEggTrayTransactionsPage();
                loadEggTrayTotalQuantity();
                loadEggTrayOutstandingBalance();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        var currentEggTrayPaymentOrderId = null;

        window.openEggTrayPaymentModal = async (orderId, paymentDate, paymentSource, checkNumber) => {
            currentEggTrayPaymentOrderId = orderId;
            document.getElementById('egg-tray-payment-order-id').value = orderId;
            document.getElementById('egg-tray-payment-date').value = paymentDate || new Date().toISOString().split('T')[0];
            document.getElementById('egg-tray-payment-check-number').value = checkNumber || '';

            const sourceSelect = document.getElementById('egg-tray-payment-source');
            if (sourceSelect) {
                sourceSelect.innerHTML = '<option value="">Select Bank Account</option>';
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
                            option.textContent = `${acc.bank} - ${maskAccountNumber(acc.bank_account_number)}`;
                            if (acc.bank_account_id === paymentSource) option.selected = true;
                            sourceSelect.appendChild(option);
                        });
                    }
                } catch (err) {
                    console.error('Failed to load bank accounts', err);
                }
            }

            document.getElementById('egg-tray-payment-modal').classList.remove('hidden');
        };

        function closeEggTrayPaymentModal() {
            document.getElementById('egg-tray-payment-modal').classList.add('hidden');
            currentEggTrayPaymentOrderId = null;
        }

        async function saveEggTrayPayment() {
            const orderId = document.getElementById('egg-tray-payment-order-id').value;
            const paymentDate = document.getElementById('egg-tray-payment-date').value;
            const paymentSource = document.getElementById('egg-tray-payment-source').value;
            const checkNumber = document.getElementById('egg-tray-payment-check-number').value.trim();

            if (!paymentDate) {
                alert('Payment Date is required');
                return;
            }
            if (!paymentSource) {
                alert('Payment Source is required');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_ORDER_EGG_TRAY}/${encodeURIComponent(orderId)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        payment_date: paymentDate,
                        payment_source: paymentSource,
                        check_number: checkNumber || null,
                        status: 'Paid'
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save payment');
                }

                alert('Payment saved successfully');

                try {
                    await fetch(`/api/expenses/by-tracking-id/${encodeURIComponent(orderId)}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: JSON.stringify({
                            account_source: paymentSource,
                            cleared_date: paymentDate,
                            status: 'Paid'
                        })
                    });
                } catch (expenseErr) {
                    console.error('Failed to update expense for order', orderId, expenseErr);
                }

                closeEggTrayPaymentModal();
                loadEggTrayTransactionsPage();
                loadEggTrayOutstandingBalance();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        var API_BASE_EGG_TRAY_SUPPLIERS = '/api/egg-tray-suppliers';
        var API_BASE_EGG_TRAY_TYPES = '/api/egg-tray-types';
        var API_BASE_ORDER_EGG_TRAY = '/api/order-egg-trays';
        var eggTraySuppliersData = [];
        var currentEggTraySupplierPage = 1;
        var eggTraySuppliersPerPage = 10;

        async function loadEggTraySuppliers() {
            const tbody = document.getElementById('egg-tray-suppliers-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_EGG_TRAY_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch egg tray suppliers');
                eggTraySuppliersData = await res.json();
                currentEggTraySupplierPage = 1;
                renderEggTraySuppliersPage();
                renderEggTraySuppliersPagination();
            } catch (err) {
                console.error('Failed to load egg tray suppliers', err);
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderEggTraySuppliersPage() {
            const tbody = document.getElementById('egg-tray-suppliers-table-body');
            if (!tbody) return;

            const start = (currentEggTraySupplierPage - 1) * eggTraySuppliersPerPage;
            const end = start + eggTraySuppliersPerPage;
            const pageData = eggTraySuppliersData.slice(start, end);

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

            const totalPages = Math.max(1, Math.ceil(eggTraySuppliersData.length / eggTraySuppliersPerPage));
            renderEggTraySuppliersPagination(totalPages);
        }

        function renderEggTraySuppliersPagination(totalPages) {
            const container = document.getElementById('egg-tray-suppliers-pagination');
            if (!container) return;

            let html = '';
            if (totalPages > 10) {
                html += `<button class="page-btn" id="egg-tray-suppliers-first-btn" ${currentEggTraySupplierPage === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            html += `<button class="page-btn" id="egg-tray-suppliers-prev-btn" ${currentEggTraySupplierPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentEggTraySupplierPage ? 'active' : ''}" id="egg-tray-suppliers-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="egg-tray-suppliers-next-btn" ${currentEggTraySupplierPage >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                html += `<button class="page-btn" id="egg-tray-suppliers-last-btn" ${currentEggTraySupplierPage >= totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }

            container.innerHTML = html;

            document.getElementById('egg-tray-suppliers-first-btn')?.addEventListener('click', () => {
                if (currentEggTraySupplierPage !== 1) {
                    currentEggTraySupplierPage = 1;
                    renderEggTraySuppliersPage();
                }
            });

            document.getElementById('egg-tray-suppliers-prev-btn')?.addEventListener('click', () => {
                if (currentEggTraySupplierPage > 1) {
                    currentEggTraySupplierPage--;
                    renderEggTraySuppliersPage();
                }
            });

            document.getElementById('egg-tray-suppliers-next-btn')?.addEventListener('click', () => {
                if (currentEggTraySupplierPage < totalPages) {
                    currentEggTraySupplierPage++;
                    renderEggTraySuppliersPage();
                }
            });

            document.getElementById('egg-tray-suppliers-last-btn')?.addEventListener('click', () => {
                if (currentEggTraySupplierPage !== totalPages) {
                    currentEggTraySupplierPage = totalPages;
                    renderEggTraySuppliersPage();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`egg-tray-suppliers-page-${i}`)?.addEventListener('click', () => {
                    currentEggTraySupplierPage = i;
                    renderEggTraySuppliersPage();
                });
            }
        }

        async function openEggTraySuppliersModal() {
            const modal = document.getElementById('egg-tray-suppliers-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_EGG_TRAY_SUPPLIERS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-egg-tray-supplier-id').value = idData.supplier_id || 'EgTrSuID-1';
            } catch (err) {
                document.getElementById('create-egg-tray-supplier-id').value = 'EgTrSuID-1';
            }

            switchEggTraySupplierTab('create');
            modal.classList.remove('hidden');
            loadEggTraySuppliers();
        }

        function closeEggTraySuppliersModal() {
            const modal = document.getElementById('egg-tray-suppliers-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function saveCreateEggTraySupplier() {
            const supplierId = document.getElementById('create-egg-tray-supplier-id').value;
            const companyName = document.getElementById('create-egg-tray-company-name').value.trim();
            const address = document.getElementById('create-egg-tray-address').value.trim();
            const tinNumber = document.getElementById('create-egg-tray-tin-number').value.trim();
            const contactPerson = document.getElementById('create-egg-tray-contact-person').value.trim();
            const contactNumber = document.getElementById('create-egg-tray-contact-number').value.trim();
            const status = document.getElementById('create-egg-tray-supplier-status').value;

            if (!companyName) {
                alert('Company Name is required');
                return;
            }

            try {
                const res = await fetch(API_BASE_EGG_TRAY_SUPPLIERS, {
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
                document.getElementById('create-egg-tray-company-name').value = '';
                document.getElementById('create-egg-tray-address').value = '';
                document.getElementById('create-egg-tray-tin-number').value = '';
                document.getElementById('create-egg-tray-contact-person').value = '';
                document.getElementById('create-egg-tray-contact-number').value = '';
                document.getElementById('create-egg-tray-supplier-status').value = 'Active';

                const idRes = await fetch(API_BASE_EGG_TRAY_SUPPLIERS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-egg-tray-supplier-id').value = idData.supplier_id || 'EgTrSuID-1';

                loadEggTraySuppliers();
                loadEggTraySuppliersPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function saveEditEggTraySupplier() {
            const supplierId = document.getElementById('edit-egg-tray-supplier-id').value;
            const companyName = document.getElementById('edit-egg-tray-company-name').value.trim();
            const address = document.getElementById('edit-egg-tray-address').value.trim();
            const tinNumber = document.getElementById('edit-egg-tray-tin-number').value.trim();
            const contactPerson = document.getElementById('edit-egg-tray-contact-person').value.trim();
            const contactNumber = document.getElementById('edit-egg-tray-contact-number').value.trim();
            const status = document.getElementById('edit-egg-tray-supplier-status').value;

            if (!supplierId || !companyName) {
                alert('Supplier ID and Company Name are required');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_EGG_TRAY_SUPPLIERS}/${encodeURIComponent(supplierId)}`, {
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
                loadEggTraySuppliers();
                loadEggTraySuppliersPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        function formatPrice(value) {
            const num = parseFloat(value.replace(/[^0-9.]/g, ''));
            if (isNaN(num)) return '';
            return num.toFixed(2);
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

        function switchEggTraySupplierTab(tab) {
            const createPanel = document.getElementById('panel-create-egg-tray-supplier');
            const editPanel = document.getElementById('panel-edit-egg-tray-supplier');
            const createTab = document.getElementById('tab-create-egg-tray-supplier');
            const editTab = document.getElementById('tab-edit-egg-tray-supplier');

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

        window.switchEggTraySupplierTab = switchEggTraySupplierTab;
        window.openEggTraySuppliersModal = openEggTraySuppliersModal;
        window.closeEggTraySuppliersModal = closeEggTraySuppliersModal;
        window.saveCreateEggTraySupplier = saveCreateEggTraySupplier;
        window.saveEditEggTraySupplier = saveEditEggTraySupplier;

        const addBtn = document.getElementById('add-tray-suppliers-btn');
        if (addBtn) {
            addBtn.onclick = openEggTraySuppliersModal;
        }

        const closeBtn = document.getElementById('close-egg-tray-suppliers-modal');
        if (closeBtn) {
            closeBtn.onclick = closeEggTraySuppliersModal;
        }

        const saveCreateBtn = document.getElementById('save-create-egg-tray-supplier-btn');
        if (saveCreateBtn) {
            saveCreateBtn.onclick = saveCreateEggTraySupplier;
        }

        const saveEditBtn = document.getElementById('save-edit-egg-tray-supplier-btn');
        if (saveEditBtn) {
            saveEditBtn.onclick = saveEditEggTraySupplier;
        }

        setupContactNumber(document.getElementById('create-egg-tray-contact-number'));
        setupContactNumber(document.getElementById('edit-egg-tray-contact-number'));

        const editSearchInput = document.getElementById('edit-egg-tray-supplier-search');
        const searchResults = document.getElementById('edit-egg-tray-supplier-search-results');
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
                    try {
                        const res = await fetch(API_BASE_EGG_TRAY_SUPPLIERS + '?search=' + encodeURIComponent(query), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const suppliers = await res.json();
                            renderEggTraySupplierSearchResults(suppliers);
                        }
                    } catch (err) {
                        console.error('Search failed', err);
                    }
                }, 300);
            });

            document.addEventListener('click', (e) => {
                if (!editSearchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        }

        function renderEggTraySupplierSearchResults(suppliers) {
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
                item.addEventListener('click', () => {
                    const supplierId = item.getAttribute('data-supplier-id');
                    selectEggTraySupplier(supplierId);
                });
            });
        }

        window.selectEggTraySupplier = async (supplierId) => {
            const searchResults = document.getElementById('edit-egg-tray-supplier-search-results');
            if (searchResults) searchResults.style.display = 'none';

            try {
                const res = await fetch(`${API_BASE_EGG_TRAY_SUPPLIERS}/code/${encodeURIComponent(supplierId)}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const supplier = await res.json();
                    document.getElementById('edit-egg-tray-supplier-id').value = supplier.supplier_id || '';
                    document.getElementById('edit-egg-tray-company-name').value = supplier.company_name || '';
                    document.getElementById('edit-egg-tray-address').value = supplier.address || '';
                    document.getElementById('edit-egg-tray-tin-number').value = supplier.tin_number || '';
                    document.getElementById('edit-egg-tray-contact-person').value = supplier.contact_person || '';
                    document.getElementById('edit-egg-tray-contact-number').value = supplier.contact_number || '';
                    document.getElementById('edit-egg-tray-supplier-status').value = supplier.status || 'Active';
                }
            } catch (err) {
                alert('Error loading supplier: ' + err.message);
            }
        };

        window.selectEggTraySupplier = selectEggTraySupplier;

        var eggTraySuppliersPageData = [];
        var currentEggTraySuppliersPageNum = 1;
        var eggTraySuppliersPagePerPage = 10;

        async function loadEggTraySuppliersPage() {
            const tbody = document.getElementById('egg-tray-suppliers-page-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_EGG_TRAY_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch egg tray suppliers');
                eggTraySuppliersPageData = await res.json();
                currentEggTraySuppliersPageNum = 1;
                renderEggTraySuppliersPageTable();
                renderEggTraySuppliersPagePagination();
            } catch (err) {
                console.error('Failed to load egg tray suppliers page', err);
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderEggTraySuppliersPageTable() {
            const tbody = document.getElementById('egg-tray-suppliers-page-table-body');
            if (!tbody) return;

            const start = (currentEggTraySuppliersPageNum - 1) * eggTraySuppliersPagePerPage;
            const end = start + eggTraySuppliersPagePerPage;
            const pageData = eggTraySuppliersPageData.slice(start, end);

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
        }

        function renderEggTraySuppliersPagePagination() {
            const container = document.getElementById('egg-tray-suppliers-page-pagination');
            if (!container) return;

            const totalPages = Math.max(1, Math.ceil(eggTraySuppliersPageData.length / eggTraySuppliersPagePerPage));

            let html = '';
            if (totalPages > 10) {
                html += `<button class="page-btn" id="egg-tray-suppliers-page-first" ${currentEggTraySuppliersPageNum === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            html += `<button class="page-btn" id="egg-tray-suppliers-page-prev" ${currentEggTraySuppliersPageNum === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentEggTraySuppliersPageNum ? 'active' : ''}" id="egg-tray-suppliers-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="egg-tray-suppliers-page-next" ${currentEggTraySuppliersPageNum >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                html += `<button class="page-btn" id="egg-tray-suppliers-page-last" ${currentEggTraySuppliersPageNum >= totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }

            container.innerHTML = html;

            document.getElementById('egg-tray-suppliers-page-first')?.addEventListener('click', () => {
                if (currentEggTraySuppliersPageNum !== 1) {
                    currentEggTraySuppliersPageNum = 1;
                    renderEggTraySuppliersPageTable();
                    renderEggTraySuppliersPagePagination();
                }
            });

            document.getElementById('egg-tray-suppliers-page-prev')?.addEventListener('click', () => {
                if (currentEggTraySuppliersPageNum > 1) {
                    currentEggTraySuppliersPageNum--;
                    renderEggTraySuppliersPageTable();
                    renderEggTraySuppliersPagePagination();
                }
            });

            document.getElementById('egg-tray-suppliers-page-next')?.addEventListener('click', () => {
                if (currentEggTraySuppliersPageNum < totalPages) {
                    currentEggTraySuppliersPageNum++;
                    renderEggTraySuppliersPageTable();
                    renderEggTraySuppliersPagePagination();
                }
            });

            document.getElementById('egg-tray-suppliers-page-last')?.addEventListener('click', () => {
                if (currentEggTraySuppliersPageNum !== totalPages) {
                    currentEggTraySuppliersPageNum = totalPages;
                    renderEggTraySuppliersPageTable();
                    renderEggTraySuppliersPagePagination();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`egg-tray-suppliers-page-${i}`)?.addEventListener('click', () => {
                    currentEggTraySuppliersPageNum = i;
                    renderEggTraySuppliersPageTable();
                    renderEggTraySuppliersPagePagination();
                });
            }
        }

        const orderEggTrayBtn = document.getElementById('open-tray-modal');
        if (orderEggTrayBtn) {
            orderEggTrayBtn.onclick = openOrderEggTrayModal;
        }

        const closeOrderBtn = document.getElementById('close-order-egg-tray-modal');
        if (closeOrderBtn) {
            closeOrderBtn.onclick = closeOrderEggTrayModal;
        }

        const saveOrderBtn = document.getElementById('save-order-egg-tray-btn');
        if (saveOrderBtn) {
            saveOrderBtn.onclick = saveOrderEggTray;
        }

        const orderSupplierSelect = document.getElementById('order-egg-tray-supplier');
        if (orderSupplierSelect) {
            orderSupplierSelect.addEventListener('change', (e) => {
                const supplierId = e.target.value;
                if (supplierId) {
                    loadEggTrayTypesBySupplier(supplierId);
                } else {
                    document.getElementById('order-egg-tray-product').innerHTML = '<option value="">Select Product</option>';
                    document.getElementById('order-egg-tray-unit-price').value = '';
                    document.getElementById('order-egg-tray-price').value = '';
                    currentEggTrayUnitPrice = 0;
                }
            });
        }

        const orderProductSelect = document.getElementById('order-egg-tray-product');
        if (orderProductSelect) {
            orderProductSelect.addEventListener('change', () => {
                const selectedOption = orderProductSelect.options[orderProductSelect.selectedIndex];
                const unitPrice = selectedOption ? parseFloat(selectedOption.getAttribute('data-price') || 0) : 0;
                currentEggTrayUnitPrice = unitPrice;
                document.getElementById('order-egg-tray-unit-price').value = unitPrice > 0 ? formatNumber(unitPrice) : '';
                computeOrderPrice();
            });
        }

        const orderQuantityInput = document.getElementById('order-egg-tray-quantity');
        if (orderQuantityInput) {
            orderQuantityInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/[^0-9]/g, '');
                if (val) {
                    val = parseInt(val).toLocaleString('en-US');
                }
                e.target.value = val;
                computeOrderPrice();
            });
        }

        function switchEggTrayTypeTab(tab) {
            const createPanel = document.getElementById('panel-create-egg-tray-type');
            const editPanel = document.getElementById('panel-edit-egg-tray-type');
            const createTab = document.getElementById('tab-create-egg-tray-type');
            const editTab = document.getElementById('tab-edit-egg-tray-type');

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

        async function openEggTrayTypeModal() {
            const modal = document.getElementById('egg-tray-type-modal');
            if (!modal) return;

            document.getElementById('create-egg-tray-type-id').value = 'EgTraTyID-1';

            await loadActiveEggTraySuppliers();
            switchEggTrayTypeTab('create');
            modal.classList.remove('hidden');
        }

        function closeEggTrayTypeModal() {
            const modal = document.getElementById('egg-tray-type-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadActiveEggTraySuppliers() {
            const selects = [
                document.getElementById('create-egg-tray-type-supplier'),
                document.getElementById('edit-egg-tray-type-supplier')
            ];

            try {
                const res = await fetch(API_BASE_EGG_TRAY_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const suppliers = await res.json();
                    selects.forEach(select => {
                        if (!select) return;
                        const currentValue = select.value;
                        select.innerHTML = '<option value="">Select Supplier</option>';
                        suppliers.forEach(s => {
                            const option = document.createElement('option');
                            option.value = s.supplier_id;
                            option.textContent = s.company_name;
                            select.appendChild(option);
                        });
                        if (currentValue) select.value = currentValue;
                    });
                }
            } catch (err) {
                console.error('Failed to load suppliers', err);
            }
        }

        async function saveCreateEggTrayType() {
            const typeId = document.getElementById('create-egg-tray-type-id').value;
            const supplierId = document.getElementById('create-egg-tray-type-supplier').value;
            const pricePerPiece = document.getElementById('create-egg-tray-type-price').value.trim();
            const remarks = document.getElementById('create-egg-tray-type-remarks').value.trim();
            const status = document.getElementById('create-egg-tray-type-status').value;

            if (!supplierId) {
                alert('Supplier is required');
                return;
            }

            try {
                const res = await fetch(API_BASE_EGG_TRAY_TYPES, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        type_id: typeId,
                        supplier_id: supplierId,
                        price_per_piece: pricePerPiece || 0,
                        remarks: remarks || null,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save egg tray type');
                }

                alert('Egg Tray Type created successfully');
                document.getElementById('create-egg-tray-type-supplier').value = '';
                document.getElementById('create-egg-tray-type-price').value = '';
                document.getElementById('create-egg-tray-type-remarks').value = '';
                document.getElementById('create-egg-tray-type-status').value = 'Active';

                const idRes = await fetch(API_BASE_EGG_TRAY_TYPES + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-egg-tray-type-id').value = idData.type_id || 'EgTraTyID-1';

                loadEggTrayTypesPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function saveEditEggTrayType() {
            const typeId = document.getElementById('edit-egg-tray-type-id').value;
            const supplierId = document.getElementById('edit-egg-tray-type-supplier').value;
            const pricePerPiece = document.getElementById('edit-egg-tray-type-price').value.trim();
            const remarks = document.getElementById('edit-egg-tray-type-remarks').value.trim();
            const status = document.getElementById('edit-egg-tray-type-status').value;

            if (!typeId) {
                alert('Egg Tray Type ID is required');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_EGG_TRAY_TYPES}/${encodeURIComponent(typeId)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        type_id: typeId,
                        supplier_id: supplierId,
                        price_per_piece: pricePerPiece || 0,
                        remarks: remarks || null,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to update egg tray type');
                }

                alert('Egg Tray Type updated successfully');
                loadEggTrayTypesPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        function renderEggTrayTypeSearchResults(types) {
            const searchResults = document.getElementById('edit-egg-tray-type-search-results');
            if (!searchResults) return;
            if (!types || types.length === 0) {
                searchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No types found</div>';
                searchResults.style.display = 'block';
                return;
            }
            searchResults.innerHTML = types.map(t => `
                <div class="supplier-search-result" data-type-id="${t.type_id}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                    <div style="font-weight: 600; color: #1a1f2e;">${t.type_id || ''}</div>
                    <div style="font-size: 12px; color: #64748b;">${t.supplier_id || ''}</div>
                </div>
            `).join('');
            searchResults.style.display = 'block';

            searchResults.querySelectorAll('.supplier-search-result').forEach(item => {
                item.addEventListener('click', () => {
                    const typeId = item.getAttribute('data-type-id');
                    selectEggTrayType(typeId);
                });
            });
        }

        window.selectEggTrayType = async (typeId) => {
            const searchResults = document.getElementById('edit-egg-tray-type-search-results');
            if (searchResults) searchResults.style.display = 'none';

            try {
                const res = await fetch(`${API_BASE_EGG_TRAY_TYPES}/code/${encodeURIComponent(typeId)}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const type = await res.json();
                    document.getElementById('edit-egg-tray-type-id').value = type.type_id || '';
                    document.getElementById('edit-egg-tray-type-supplier').value = type.supplier_id || '';
                    document.getElementById('edit-egg-tray-type-price').value = type.price_per_piece || '';
                    document.getElementById('edit-egg-tray-type-remarks').value = type.remarks || '';
                    document.getElementById('edit-egg-tray-type-status').value = type.status || 'Active';
                    switchEggTrayTypeTab('edit');
                }
            } catch (err) {
                alert('Error loading egg tray type: ' + err.message);
            }
        };

        window.switchEggTrayTypeTab = switchEggTrayTypeTab;
        window.openEggTrayTypeModal = openEggTrayTypeModal;
        window.closeEggTrayTypeModal = closeEggTrayTypeModal;
        window.saveCreateEggTrayType = saveCreateEggTrayType;
        window.saveEditEggTrayType = saveEditEggTrayType;
        window.selectEggTrayType = selectEggTrayType;

        const addTrayTypeBtn = document.getElementById('add-tray-type-btn');
        if (addTrayTypeBtn) {
            addTrayTypeBtn.onclick = openEggTrayTypeModal;
        }

        const closeTrayTypeBtn = document.getElementById('close-egg-tray-type-modal');
        if (closeTrayTypeBtn) {
            closeTrayTypeBtn.onclick = closeEggTrayTypeModal;
        }

        const saveCreateTrayTypeBtn = document.getElementById('save-create-egg-tray-type-btn');
        if (saveCreateTrayTypeBtn) {
            saveCreateTrayTypeBtn.onclick = saveCreateEggTrayType;
        }

        const saveEditTrayTypeBtn = document.getElementById('save-edit-egg-tray-type-btn');
        if (saveEditTrayTypeBtn) {
            saveEditTrayTypeBtn.onclick = saveEditEggTrayType;
        }

        const createPriceInput = document.getElementById('create-egg-tray-type-price');
        if (createPriceInput) {
            createPriceInput.addEventListener('blur', (e) => {
                const val = formatPrice(e.target.value);
                if (val) e.target.value = val;
            });
        }

        const editPriceInput = document.getElementById('edit-egg-tray-type-price');
        if (editPriceInput) {
            editPriceInput.addEventListener('blur', (e) => {
                const val = formatPrice(e.target.value);
                if (val) e.target.value = val;
            });
        }

        const editTrayTypeSearchInput = document.getElementById('edit-egg-tray-type-search');
        const trayTypeSearchResults = document.getElementById('edit-egg-tray-type-search-results');
        let trayTypeSearchDebounce = null;

        if (editTrayTypeSearchInput && trayTypeSearchResults) {
            editTrayTypeSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (trayTypeSearchDebounce) clearTimeout(trayTypeSearchDebounce);
                if (query.length < 1) {
                    trayTypeSearchResults.style.display = 'none';
                    return;
                }
                trayTypeSearchDebounce = setTimeout(async () => {
                    try {
                        const res = await fetch(API_BASE_EGG_TRAY_TYPES + '?search=' + encodeURIComponent(query), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const types = await res.json();
                            renderEggTrayTypeSearchResults(types);
                        }
                    } catch (err) {
                        console.error('Search failed', err);
                    }
                }, 300);
            });

            document.addEventListener('click', (e) => {
                if (!editTrayTypeSearchInput.contains(e.target) && !trayTypeSearchResults.contains(e.target)) {
                    trayTypeSearchResults.style.display = 'none';
                }
            });
        }

        var eggTrayTypesPageData = [];
        var currentEggTrayTypesPageNum = 1;
        var eggTrayTypesPagePerPage = 10;

        async function loadEggTrayTypesPage() {
            const tbody = document.getElementById('egg-tray-types-page-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_EGG_TRAY_TYPES, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch egg tray types');
                eggTrayTypesPageData = await res.json();
                currentEggTrayTypesPageNum = 1;
                renderEggTrayTypesPageTable();
                renderEggTrayTypesPagePagination();
            } catch (err) {
                console.error('Failed to load egg tray types page', err);
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderEggTrayTypesPageTable() {
            const tbody = document.getElementById('egg-tray-types-page-table-body');
            if (!tbody) return;

            const start = (currentEggTrayTypesPageNum - 1) * eggTrayTypesPagePerPage;
            const end = start + eggTrayTypesPagePerPage;
            const pageData = eggTrayTypesPageData.slice(start, end);

            if (pageData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No types found</td></tr>';
                return;
            }

            tbody.innerHTML = pageData.map(type => `
                <tr>
                    <td>${type.type_id || '-'}</td>
                    <td>${type.supplier_id || '-'}</td>
                    <td>${type.remarks || '-'}</td>
                    <td>P ${parseFloat(type.price_per_piece || 0).toFixed(2)}</td>
                    <td>${type.status || '-'}</td>
                </tr>
            `).join('');
        }

        function renderEggTrayTypesPagePagination() {
            const container = document.getElementById('egg-tray-types-page-pagination');
            if (!container) return;

            const totalPages = Math.max(1, Math.ceil(eggTrayTypesPageData.length / eggTrayTypesPagePerPage));

            let html = '';
            if (totalPages > 10) {
                html += `<button class="page-btn" id="egg-tray-types-page-first" ${currentEggTrayTypesPageNum === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            html += `<button class="page-btn" id="egg-tray-types-page-prev" ${currentEggTrayTypesPageNum === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentEggTrayTypesPageNum ? 'active' : ''}" id="egg-tray-types-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="egg-tray-types-page-next" ${currentEggTrayTypesPageNum >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                html += `<button class="page-btn" id="egg-tray-types-page-last" ${currentEggTrayTypesPageNum >= totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }

            container.innerHTML = html;

            document.getElementById('egg-tray-types-page-first')?.addEventListener('click', () => {
                if (currentEggTrayTypesPageNum !== 1) {
                    currentEggTrayTypesPageNum = 1;
                    renderEggTrayTypesPageTable();
                    renderEggTrayTypesPagePagination();
                }
            });

            document.getElementById('egg-tray-types-page-prev')?.addEventListener('click', () => {
                if (currentEggTrayTypesPageNum > 1) {
                    currentEggTrayTypesPageNum--;
                    renderEggTrayTypesPageTable();
                    renderEggTrayTypesPagePagination();
                }
            });

            document.getElementById('egg-tray-types-page-next')?.addEventListener('click', () => {
                if (currentEggTrayTypesPageNum < totalPages) {
                    currentEggTrayTypesPageNum++;
                    renderEggTrayTypesPageTable();
                    renderEggTrayTypesPagePagination();
                }
            });

            document.getElementById('egg-tray-types-page-last')?.addEventListener('click', () => {
                if (currentEggTrayTypesPageNum !== totalPages) {
                    currentEggTrayTypesPageNum = totalPages;
                    renderEggTrayTypesPageTable();
                    renderEggTrayTypesPagePagination();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`egg-tray-types-page-${i}`)?.addEventListener('click', () => {
                    currentEggTrayTypesPageNum = i;
                    renderEggTrayTypesPageTable();
                    renderEggTrayTypesPagePagination();
                });
            }
        }

        var eggTrayTransactionsPageData = [];
        var currentEggTrayTransactionsPageNum = 1;
        var eggTrayTransactionsPagePerPage = 10;

        async function loadEggTrayTransactionsPage() {
            const tbody = document.getElementById('egg-tray-transactions-page-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_ORDER_EGG_TRAY, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch egg tray transactions');
                eggTrayTransactionsPageData = await res.json();
                currentEggTrayTransactionsPageNum = 1;
                renderEggTrayTransactionsPageTable();
                renderEggTrayTransactionsPagePagination();
            } catch (err) {
                console.error('Failed to load egg tray transactions page', err);
                tbody.innerHTML = '<tr><td colspan="12" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderEggTrayTransactionsPageTable() {
            const tbody = document.getElementById('egg-tray-transactions-page-table-body');
            if (!tbody) return;

            const start = (currentEggTrayTransactionsPageNum - 1) * eggTrayTransactionsPagePerPage;
            const end = start + eggTrayTransactionsPagePerPage;
            const pageData = eggTrayTransactionsPageData.slice(start, end);

            if (pageData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="12" style="text-align:center;">No transactions found</td></tr>';
                return;
            }

            tbody.innerHTML = pageData.map(order => `
                <tr>
                    <td>${order.order_id || '-'}</td>
                    <td>${formatDate(order.date)}</td>
                    <td>${order.company_name || '-'}</td>
                    <td>${order.invoice || '-'}</td>
                    <td>${order.quantity || '-'}</td>
                    <td>P ${formatNumber(order.unit_price || 0)}</td>
                    <td>P ${formatNumber(order.total_price || 0)}</td>
                    <td>
                        <button class="btn-payment" onclick="openEggTrayPaymentModal('${order.order_id}', '${formatDate(order.payment_date)}', '${order.payment_source || ''}', '${order.check_number || ''}')" title="Add Payment">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#1ea672" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                        </button>
                    </td>
                    <td>${formatDate(order.payment_date)}</td>
                    <td>${order.bank ? order.bank + ' - ' + maskAccountNumber(order.bank_account_number) : (order.payment_source || '-')}</td>
                    <td>${order.check_number || '-'}</td>
                    <td>${order.status || '-'}</td>
                </tr>
            `).join('');
        }

        function renderEggTrayTransactionsPagePagination() {
            const container = document.getElementById('egg-tray-transactions-page-pagination');
            if (!container) return;

            const totalPages = Math.max(1, Math.ceil(eggTrayTransactionsPageData.length / eggTrayTransactionsPagePerPage));

            let html = '';
            if (totalPages > 10) {
                html += `<button class="page-btn" id="egg-tray-transactions-page-first" ${currentEggTrayTransactionsPageNum === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            html += `<button class="page-btn" id="egg-tray-transactions-page-prev" ${currentEggTrayTransactionsPageNum === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentEggTrayTransactionsPageNum ? 'active' : ''}" id="egg-tray-transactions-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="egg-tray-transactions-page-next" ${currentEggTrayTransactionsPageNum >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                html += `<button class="page-btn" id="egg-tray-transactions-page-last" ${currentEggTrayTransactionsPageNum >= totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }

            container.innerHTML = html;

            document.getElementById('egg-tray-transactions-page-first')?.addEventListener('click', () => {
                if (currentEggTrayTransactionsPageNum !== 1) {
                    currentEggTrayTransactionsPageNum = 1;
                    renderEggTrayTransactionsPageTable();
                    renderEggTrayTransactionsPagePagination();
                }
            });

            document.getElementById('egg-tray-transactions-page-prev')?.addEventListener('click', () => {
                if (currentEggTrayTransactionsPageNum > 1) {
                    currentEggTrayTransactionsPageNum--;
                    renderEggTrayTransactionsPageTable();
                    renderEggTrayTransactionsPagePagination();
                }
            });

            document.getElementById('egg-tray-transactions-page-next')?.addEventListener('click', () => {
                if (currentEggTrayTransactionsPageNum < totalPages) {
                    currentEggTrayTransactionsPageNum++;
                    renderEggTrayTransactionsPageTable();
                    renderEggTrayTransactionsPagePagination();
                }
            });

            document.getElementById('egg-tray-transactions-page-last')?.addEventListener('click', () => {
                if (currentEggTrayTransactionsPageNum !== totalPages) {
                    currentEggTrayTransactionsPageNum = totalPages;
                    renderEggTrayTransactionsPageTable();
                    renderEggTrayTransactionsPagePagination();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`egg-tray-transactions-page-${i}`)?.addEventListener('click', () => {
                    currentEggTrayTransactionsPageNum = i;
                    renderEggTrayTransactionsPageTable();
                    renderEggTrayTransactionsPagePagination();
                });
            }
        }

        loadEggTrayTypesPage();
        loadEggTraySuppliersPage();
        loadEggTraySuppliers();
        loadEggTrayTransactionsPage();
        loadEggTrayTotalQuantity();
        loadEggTrayOutstandingBalance();

        const closePaymentBtn = document.getElementById('close-egg-tray-payment-modal');
        if (closePaymentBtn) {
            closePaymentBtn.onclick = closeEggTrayPaymentModal;
        }

        const savePaymentBtn = document.getElementById('save-egg-tray-payment-btn');
        if (savePaymentBtn) {
            savePaymentBtn.onclick = saveEggTrayPayment;
        }

        async function loadEggTrayTotalQuantity() {
            const totalQuantityEl = document.getElementById('egg-tray-total-quantity');
            if (!totalQuantityEl) return;

            try {
                const res = await fetch(API_BASE_ORDER_EGG_TRAY + '/stats/total-quantity', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    totalQuantityEl.textContent = (data.total_quantity || 0).toLocaleString('en-US') + ' pcs';
                }
            } catch (err) {
                console.error('Failed to load total quantity', err);
            }
        }

        async function loadEggTrayOutstandingBalance() {
            const outstandingBalanceEl = document.getElementById('egg-tray-outstanding-balance');
            if (!outstandingBalanceEl) return;

            try {
                const res = await fetch(API_BASE_ORDER_EGG_TRAY + '/stats/outstanding-balance', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    const balance = data.outstanding_balance || 0;
                    outstandingBalanceEl.textContent = 'P ' + balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
            } catch (err) {
                console.error('Failed to load outstanding balance', err);
            }
        }
    };

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'purchasing';
    const render = ModuleComponents[currentTab] || ModuleComponents['purchasing'];
    render(contentArea);
}