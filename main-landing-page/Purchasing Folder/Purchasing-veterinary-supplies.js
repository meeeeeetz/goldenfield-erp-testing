if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['purchasing-veterinary-supplies'] = (container) => {
        container.innerHTML = `
            <div class="vet-layout">
                <div class="header-actions">
                    <h2>Veterinary Supplies</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="open-vet-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Order Veterinary Supplies</span>
                    </button>
                    <button id="open-vet-payment-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Pay Veterinary Supplies</span>
                    </button>
                    <button id="calculate-vet-products-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Calculate Vet Products</span>
                    </button>
                    <button id="record-vet-use-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Record Internal Use</span>
                    </button>
                    <button id="add-vet-suppliers-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Veterinary Suppliers</span>
                    </button>
                    <button id="add-rtl-suppliers-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add RTL Suppliers</span>
                    </button>
                    <button id="add-vet-products-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Veterinary Products</span>
                    </button>
                    <button id="add-vet-category-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Category</span>
                    </button>
                </div>
                <div class="vet-content-grid">
                    <div class="tracking-cards-row">
                        <div class="card tracking-card">
                            <h3>Outstanding Balance</h3>
                            <p class="card-sub-label">Balance to Suppliers</p>
                            <div class="card-value-row">
                                <div class="card-value">P 135,999.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="card graph-placeholder vet-transaction-card">
                        <h3>Veterinary Supplies Transaction</h3>
                        <div class="table-wrap">
                            <table class="data-table product-table">
                                <thead>
                                    <tr>
                                        <th>Order Vet Supplies ID</th>
                                        <th>Date</th>
                                        <th>Due Date</th>
                                        <th>Sales Invoice</th>
                                        <th>Company</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Free Units</th>
                                        <th>Discount</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Photo</th>
                                        <th>Payment Date</th>
                                        <th>Payment Source</th>
                                        <th>Check Number</th>
                                        <th style="color: #e74c3c;">Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="vet-transactions-page-table-body">
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination" id="vet-transactions-page-pagination">
                        </div>
                    </div>
                    <div class="vet-bottom-row">
                    <div class="card graph-placeholder vet-tracking-card building-compact">
                            <h3>Stocks Availability</h3>
                        <div class="table-wrap">
                            <table class="data-table product-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Category</th>
                                        <th>Unit</th>
                                        <th>Quantity</th>
                                        <th>Last Updated</th>
                                    </tr>
                                </thead>
                                <tbody id="vet-stocks-availability-table-body">
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
                    <div class="card graph-placeholder vet-tracking-card">
                        <h3>Internal Use Transaction</h3>
                        <div class="table-wrap">
                            <table class="data-table product-table">
                                <thead>
                                    <tr>
                                        <th>Vet Supplies Use ID</th>
                                        <th>Date</th>
                                        <th>Building</th>
                                        <th>Item</th>
                                        <th>Category</th>
                                        <th>Unit</th>
                                        <th>Qty</th>
                                        <th>Prepared by</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="vet-use-transactions-table-body">
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
                <div class="vet-bottom-row-2">
                <div class="card graph-placeholder vet-tracking-card">
                    <h3>Veterinary Supplies Suppliers</h3>
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
                            <tbody id="vet-suppliers-page-table-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="vet-suppliers-page-pagination">
                    </div>
                </div>
                <div class="card graph-placeholder vet-tracking-card">
                    <h3>Veterinary Supplies Type</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Vet Supplies ID</th>
                                    <th>Supplier ID</th>
                                    <th>Item</th>
                                    <th>Generic Name</th>
                                    <th>Category</th>
                                    <th>Package size</th>
                                    <th>Unit</th>
                                    <th>Unit Cost</th>
                                    <th>Discount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="vet-products-page-table-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="vet-products-page-pagination">
                    </div>
                </div>
                        </table>
                    </div>
                </div>
                <div id="vet-computations-view" style="display: none;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1f2e;">Veterinary Product Computations</h2>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; gap: 12px;">
                        <input type="text" id="vet-computations-search" placeholder="Search active veterinary products..." style="flex: 1; max-width: 350px; padding: 8px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                        <button id="vet-computations-back-btn" class="btn-icon-circle" style="margin-left: auto;">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span class="btn-label">Back</span>
                        </button>
                    </div>
                    <div id="vet-computations-results" class="card graph-placeholder" style="padding: 20px; text-align: center; color: #64748b; margin-top: 16px; width: 100%; box-sizing: border-box;">
                        <p>Search for a veterinary product to view computations.</p>
                    </div>
                </div>
                <div id="vet-modal" class="modal hidden">
                    <div class="modal-content">
                        <h3>Add Supply</h3>
                        <input type="text" placeholder="Supply Name" id="vet-name-input" />
                        <input type="number" placeholder="Quantity" id="vet-qty-input" />
                        <button id="save-vet-btn" class="btn-primary">Save Supply</button>
                    </div>
                </div>

                <div id="vet-category-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 500px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Veterinary Supplies Category</h3>
                            <button class="modal-close-btn" id="close-vet-category-modal">&times;</button>
                        </div>
                        <div class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Vet Supplies Category ID</label>
                                <input type="text" id="vet-category-id" readonly />
                            </div>
                            <div class="modal-field">
                                <label>Category</label>
                                <input type="text" id="vet-category-name" placeholder="Enter category name" />
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-vet-category-btn" class="btn-primary">Save</button>
                            </div>
                            <div style="margin-top: 20px;">
                                <h4 style="margin-bottom: 10px; font-size: 14px; color: #64748b;">Categories List</h4>
                                <div class="table-wrap">
                                    <table class="data-table product-table">
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th style="width: 50px;"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="vet-categories-table-body">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="vet-suppliers-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Veterinary Suppliers Management</h3>
                            <button class="modal-close-btn" id="close-vet-suppliers-modal">&times;</button>
                        </div>
                        <div class="modal-tabs">
                            <button class="modal-tab active" id="tab-create-vet-supplier" onclick="switchVetSupplierTab('create')">New Veterinary Supplier</button>
                            <button class="modal-tab" id="tab-edit-vet-supplier" onclick="switchVetSupplierTab('edit')">Manage Veterinary Supplier</button>
                        </div>
                        <div id="panel-create-vet-supplier" class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Veterinary Supplier ID</label>
                                <input type="text" id="create-vet-supplier-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company Name</label>
                                    <input type="text" id="create-vet-company-name" placeholder="Enter company name" />
                                </div>
                                <div class="modal-field">
                                    <label>Address</label>
                                    <input type="text" id="create-vet-address" placeholder="Enter address" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>TIN Number</label>
                                    <input type="text" id="create-vet-tin-number" placeholder="TIN Number" maxlength="20" />
                                </div>
                                <div class="modal-field">
                                    <label>Contact Person</label>
                                    <input type="text" id="create-vet-contact-person" placeholder="Enter contact person" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Contact Number</label>
                                    <input type="text" id="create-vet-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="create-vet-supplier-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-create-vet-supplier-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                        <div id="panel-edit-vet-supplier" class="modal-tab-panel" style="display: none;">
                            <div class="modal-field">
                                <label>Search Veterinary Supplier</label>
                                <div style="position: relative;">
                                    <input type="text" id="edit-vet-supplier-search" placeholder="Search by company name..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                                    <div id="edit-vet-supplier-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                                </div>
                            </div>
                            <div class="modal-field">
                                <label>Veterinary Supplier ID</label>
                                <input type="text" id="edit-vet-supplier-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company Name</label>
                                    <input type="text" id="edit-vet-company-name" placeholder="Enter company name" />
                                </div>
                                <div class="modal-field">
                                    <label>Address</label>
                                    <input type="text" id="edit-vet-address" placeholder="Enter address" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>TIN Number</label>
                                    <input type="text" id="edit-vet-tin-number" placeholder="TIN Number" maxlength="20" />
                                </div>
                                <div class="modal-field">
                                    <label>Contact Person</label>
                                    <input type="text" id="edit-vet-contact-person" placeholder="Enter contact person" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Contact Number</label>
                                    <input type="text" id="edit-vet-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="edit-vet-supplier-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-edit-vet-supplier-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
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

                <div id="vet-products-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Veterinary Supplies Management</h3>
                            <button class="modal-close-btn" id="close-vet-products-modal">&times;</button>
                        </div>
                        <div class="modal-tabs">
                            <button class="modal-tab active" id="tab-create-vet-product" onclick="switchVetProductTab('create')">New Veterinary Product</button>
                            <button class="modal-tab" id="tab-edit-vet-product" onclick="switchVetProductTab('edit')">Manage Veterinary Product</button>
                        </div>
                        <div id="panel-create-vet-product" class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Vet Supplies ID</label>
                                <input type="text" id="create-vet-product-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Supplier ID</label>
                                    <select id="create-vet-product-supplier" class="modal-select">
                                        <option value="">Select Supplier</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Item</label>
                                    <input type="text" id="create-vet-product-item" placeholder="Enter item name" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Generic Name</label>
                                    <input type="text" id="create-vet-product-generic" placeholder="Enter generic name" />
                                </div>
                                <div class="modal-field">
                                    <label>Category</label>
                                    <select id="create-vet-product-category" class="modal-select">
                                        <option value="">Select Category</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Package size</label>
                                    <input type="text" id="create-vet-product-package" placeholder="0" />
                                </div>
                                <div class="modal-field">
                                    <label>Unit</label>
                                    <select id="create-vet-product-unit" class="modal-select">
                                        <option value="">Select Unit</option>
                                        <option value="Milliliter">Milliliter</option>
                                        <option value="Grams">Grams</option>
                                        <option value="Piece">Piece</option>
                                        <option value="Vial">Vial</option>
                                        <option value="Lot">Lot</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Unit Cost</label>
                                    <input type="text" id="create-vet-product-cost" placeholder="0.00" />
                                </div>
                                <div class="modal-field">
                                    <label>Discount</label>
                                    <input type="text" id="create-vet-product-discount" placeholder="0%" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="create-vet-product-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-create-vet-product-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                        <div id="panel-edit-vet-product" class="modal-tab-panel" style="display: none;">
                            <div class="modal-field">
                                <label>Search Veterinary Product</label>
                                <div style="position: relative;">
                                    <input type="text" id="edit-vet-product-search" placeholder="Search by item name..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                                    <div id="edit-vet-product-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                                </div>
                            </div>
                            <div class="modal-field">
                                <label>Vet Supplies ID</label>
                                <input type="text" id="edit-vet-product-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Supplier ID</label>
                                    <select id="edit-vet-product-supplier" class="modal-select">
                                        <option value="">Select Supplier</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Item</label>
                                    <input type="text" id="edit-vet-product-item" placeholder="Enter item name" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Generic Name</label>
                                    <input type="text" id="edit-vet-product-generic" placeholder="Enter generic name" />
                                </div>
                                <div class="modal-field">
                                    <label>Category</label>
                                    <select id="edit-vet-product-category" class="modal-select">
                                        <option value="">Select Category</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Package size</label>
                                    <input type="text" id="edit-vet-product-package" placeholder="0" />
                                </div>
                                <div class="modal-field">
                                    <label>Unit</label>
                                    <select id="edit-vet-product-unit" class="modal-select">
                                        <option value="">Select Unit</option>
                                        <option value="Milliliter">Milliliter</option>
                                        <option value="Grams">Grams</option>
                                        <option value="Piece">Piece</option>
                                        <option value="Vial">Vial</option>
                                        <option value="Lot">Lot</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Unit Cost</label>
                                    <input type="text" id="edit-vet-product-cost" placeholder="0.00" />
                                </div>
                                <div class="modal-field">
                                    <label>Discount</label>
                                    <input type="text" id="edit-vet-product-discount" placeholder="0%" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="edit-vet-product-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-edit-vet-product-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="order-vet-supplies-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Order Veterinary Supplies</h3>
                            <button class="modal-close-btn" id="close-order-vet-supplies-modal">&times;</button>
                        </div>
                        <div class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Order Vet Supplies ID</label>
                                <input type="text" id="order-vet-supplies-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Date</label>
                                    <input type="date" id="order-vet-supplies-date" />
                                </div>
                                <div class="modal-field">
                                    <label>Terms</label>
                                    <div style="display: inline-flex; align-items: center; gap: 8px;">
                                        <input type="text" id="order-vet-supplies-terms" placeholder="0" style="width: 210px;" />
                                        <span style="font-size: 12px; color: #1a1f2e; font-weight: 600;">Days</span>
                                    </div>
                                </div>
                                <div class="modal-field">
                                    <label>Sales Invoice</label>
                                    <input type="text" id="order-vet-supplies-invoice" placeholder="Enter invoice number" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company</label>
                                    <select id="order-vet-supplies-company" class="modal-select">
                                        <option value="">Select Company</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Products</label>
                                    <select id="order-vet-supplies-product" class="modal-select">
                                        <option value="">Select Product</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-field">
                                <label>Order Items</label>
                                <div class="table-wrap">
                                    <table class="data-table product-table">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Package Size</th>
                                                <th>Unit</th>
                                                <th>Unit Price</th>
                                                <th>Free Units</th>
                                                <th>Discount</th>
                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody id="order-vet-supplies-items-table-body">
                                        </tbody>
                                    </table>
                            </div>
                         <div class="modal-meta-row" style="margin-top: 15px; display: flex; justify-content: flex-end;">
                                <div class="modal-field" style="width: 25%; min-width: 200px;">
                                    <label>Grand Total</label>
                                    <input type="text" id="order-vet-supplies-grand-total" readonly style="font-size: 20px; font-weight: bold; padding: 12px; text-align: right;" />
                                </div>
                            </div>
                            <div class="modal-field" style="margin-top: 15px;">
                                <label>Supporting Document</label>
                                <div id="order-vet-supplies-upload-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; cursor: pointer; background: #f8fafc; transition: border-color 0.2s, background 0.2s; position: relative;">
                                    <div class="upload-zone-content" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                        <div class="upload-placeholder" style="color: #64748b; font-size: 14px;">
                                            <span>Drag & Drop or Click to Upload (JPG only, max 5MB, auto-compressed to under 1MB)</span>
                                        </div>
                                        <div class="upload-preview" style="display:none; flex-direction: column; align-items: center; gap: 8px; position: relative;">
                                            <button type="button" class="remove-upload-btn" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
                                            <img id="order-vet-supplies-upload-preview-img" style="max-width: 200px; max-height: 200px; border-radius: 4px; object-fit: contain;" />
                                        </div>
                                    </div>
                                    <input type="file" id="order-vet-supplies-file-input" accept="image/jpeg,image/jpg" style="display:none" />
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-order-vet-supplies-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="vet-payment-modal" class="modal hidden" onclick="if(event.target===this)this.classList.add('hidden')">
                <div class="modal-content" style="max-width: 1000px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Pay Veterinary Supplies</h3>
                        <button class="modal-close-btn" id="close-vet-payment-modal">&times;</button>
                    </div>
                    <div class="modal-field">
                        <label>Payment ID</label>
                        <input type="text" id="vet-payment-id" readonly />
                    </div>
                    <div class="modal-field">
                        <label>Select Pending Supplies</label>
                        <div style="display: flex; gap: 8px; align-items: flex-end;">
                            <select id="vet-payment-search" class="modal-select" style="flex: 1;">
                                <option value="">-- Select Pending Supplies --</option>
                            </select>
                            <button id="vet-payment-select-all-btn" class="btn-primary" style="padding: 8px 12px; font-size: 13px; white-space: nowrap;">Select All</button>
                        </div>
                    </div>
                    <div class="table-wrap" style="max-height: 250px; overflow-y: auto; border: 1px solid #D6D6D6; border-radius: 6px;">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Supplier</th>
                                    <th>Invoice</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody id="vet-payment-search-results">
                                <tr class="empty-row"><td colspan="6" style="height: 48px; background: #fff;">&nbsp;</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="display: flex; justify-content: flex-end; padding: 8px 0; font-weight: 600; font-size: 15px;">
                        <span style="margin-right: 12px;">Grand Total:</span>
                        <span id="vet-payment-grand-total">P 0.00</span>
                    </div>
                    <div class="modal-meta-row" style="margin-top: 15px;">
                        <div class="modal-field">
                            <label>Bank Source</label>
                            <select id="vet-payment-bank-source" class="modal-select">
                                <option value="">-- Select Bank --</option>
                            </select>
                        </div>
                        <div class="modal-field">
                            <label>Check Number</label>
                            <input type="text" id="vet-payment-check-number" placeholder="Enter check number" />
                        </div>
                    </div>
                    <div class="modal-tab-actions">
                        <button id="save-vet-payment-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>

            <div id="vet-supply-payment-modal" class="modal hidden" onclick="if(event.target===this)this.classList.add('hidden')">
                <div class="modal-content" style="max-width: 500px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Veterinary Supplies Payment</h3>
                        <button class="modal-close-btn" id="close-vet-supply-payment-modal">&times;</button>
                    </div>
                    <div class="modal-tab-panel" style="display: block;">
                        <div class="modal-field">
                            <label>Order ID</label>
                            <input type="text" id="vet-supply-payment-order-id" readonly />
                        </div>
                        <div class="modal-field">
                            <label>Payment Date</label>
                            <input type="date" id="vet-supply-payment-date" />
                        </div>
                        <div class="modal-field">
                            <label>Payment Source</label>
                            <select id="vet-supply-payment-source" class="modal-select">
                                <option value="">Select Bank Account</option>
                            </select>
                        </div>
                        <div class="modal-field">
                            <label>Check Number</label>
                            <input type="text" id="vet-supply-payment-check-number" placeholder="Enter check number" />
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-vet-supply-payment-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="vet-photo-upload-modal" class="modal hidden" onclick="if(event.target===this)this.classList.add('hidden')">
                <div class="modal-content" style="max-width: 600px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Upload Photo</h3>
                        <button class="modal-close-btn" id="close-vet-photo-upload-modal">&times;</button>
                    </div>
                    <div class="modal-tab-panel" style="display: block;">
                        <div id="vet-photo-upload-drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 40px 20px; text-align: center; background: #f8fafc; transition: border-color 0.2s, background 0.2s; cursor: pointer;">
                            <div class="upload-zone-content" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                <div class="upload-placeholder" style="color: #64748b; font-size: 14px;">
                                    <span>Drag & Drop or Click to Upload (JPG only, max 5MB, auto-compressed to under 1MB)</span>
                                </div>
                                <div class="upload-preview" style="display:none; flex-direction: column; align-items: center; gap: 8px; position: relative;">
                                    <button type="button" class="remove-upload-btn" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
                                    <img id="vet-photo-upload-preview-img" style="max-width: 200px; max-height: 200px; border-radius: 4px; object-fit: contain;" />
                                </div>
                            </div>
                            <input type="file" id="vet-photo-upload-file-input" accept="image/jpeg,image/jpg" style="display:none" />
                        </div>
                        <div class="modal-tab-actions" style="margin-top: 15px;">
                            <button id="save-vet-photo-upload-btn" class="btn-primary">Save</button>
                            <button id="remove-vet-photo-upload-btn" class="btn-danger">Remove Photo</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="record-vet-use-modal" class="modal hidden">
                <div class="modal-content" style="max-width: 1000px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Recording of Veterinary Supplies Consumed</h3>
                        <button class="modal-close-btn" id="close-record-vet-use-modal">&times;</button>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Vet Supplies Recording Transaction</label>
                            <input type="text" id="vet-use-transaction-id" value="VeSuUseID-1" readonly style="background: #f1f5f9;" />
                        </div>
                        <div class="modal-field">
                            <label>Date</label>
                            <input type="date" id="vet-use-date" />
                        </div>
                    </div>
                    <div class="table-wrap" style="max-height: 350px; overflow-y: auto; border: 1px solid #D6D6D6; border-radius: 6px; margin-top: 12px;">
                        <table class="data-table product-table" style="border-spacing: 0 4px; border-collapse: separate;">
                            <thead>
                                <tr>
                                    <th style="padding: 6px 8px;">Building</th>
                                    <th style="padding: 6px 8px;">Item</th>
                                    <th style="padding: 6px 8px;">Category</th>
                                    <th style="padding: 6px 8px;">Unit</th>
                                    <th style="padding: 6px 8px;">Qty</th>
                                    <th style="padding: 6px 8px;">Prepared by</th>
                                    <th style="padding: 6px 8px;">Time</th>
                                </tr>
                            </thead>
                            <tbody id="vet-use-tbody">
                            </tbody>
                        </table>
                        <style>
                            #vet-use-tbody td { padding: 0 !important; }
                            #vet-use-tbody .modal-select,
                            #vet-use-tbody .modal-input { width: 100%; border-radius: 0; border: 1px solid #D6D6D6; padding: 6px 8px; font-size: 13px; box-sizing: border-box; }
                            #vet-use-tbody .building-name-cell { padding: 6px 8px; font-size: 13px; color: #1a1f2e; font-weight: 500; }
                        </style>
                    </div>
                    <div style="margin-top: 8px; text-align: left;">
                        <button id="add-vet-use-row-btn" style="background: #1a1f2e; color: #fff; border: none; border-radius: 4px; cursor: pointer; padding: 8px; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                    <div class="modal-tab-actions" style="margin-top: 16px;">
                        <button id="save-vet-use-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('open-vet-modal').onclick = () => {
            document.getElementById('vet-modal').classList.remove('hidden');
        };
        document.getElementById('save-vet-btn').onclick = () => {
            const name = document.getElementById('vet-name-input').value;
            const qty = document.getElementById('vet-qty-input').value;
            alert(`Adding ${qty} of ${name}...`);
            document.getElementById('vet-modal').classList.add('hidden');
        };

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

        var vetCategories = [];
        var currentVetCategoryId = 1;
        var API_BASE_VET_CATEGORIES = '/api/vet-supplies-categories';

        function switchVetCategoryTab(tab) {
        }

        async function openVetCategoryModal() {
            const modal = document.getElementById('vet-category-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_VET_CATEGORIES + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('vet-category-id').value = idData.category_id || 'VeSuCatID-1';
            } catch (err) {
                document.getElementById('vet-category-id').value = 'VeSuCatID-1';
            }

            document.getElementById('vet-category-name').value = '';
            await loadVetCategories();
            modal.classList.remove('hidden');
        }

        function closeVetCategoryModal() {
            const modal = document.getElementById('vet-category-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadVetCategories() {
            try {
                const res = await fetch(API_BASE_VET_CATEGORIES, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    vetCategories = await res.json();
                    renderVetCategoriesTable();
                }
            } catch (err) {
                console.error('Failed to load vet categories', err);
            }
        }

        async function saveVetCategory() {
            const categoryId = document.getElementById('vet-category-id').value;
            const categoryName = document.getElementById('vet-category-name').value.trim();

            if (!categoryName) {
                alert('Category name is required');
                return;
            }

            const existingCategory = vetCategories.find(c => c.category_name.toLowerCase() === categoryName.toLowerCase());
            if (existingCategory) {
                alert('Category already exists');
                return;
            }

            try {
                const res = await fetch(API_BASE_VET_CATEGORIES, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        category_id: categoryId,
                        category_name: categoryName,
                        created_by: 'current-user'
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save category');
                }

                alert('Category saved successfully\n\nID: ' + categoryId + '\nCategory: ' + categoryName);
                await loadVetCategories();

                try {
                    const idRes = await fetch(API_BASE_VET_CATEGORIES + '/next-id', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    const idData = await idRes.json();
                    document.getElementById('vet-category-id').value = idData.category_id || 'VeSuCatID-1';
                } catch (err) {
                    document.getElementById('vet-category-id').value = 'VeSuCatID-1';
                }

                document.getElementById('vet-category-name').value = '';
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function deleteVetCategory(categoryId) {
            if (!confirm('Are you sure you want to delete this category?')) return;

            try {
                const res = await fetch(`${API_BASE_VET_CATEGORIES}/${encodeURIComponent(categoryId)}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to delete category');
                }

                vetCategories = vetCategories.filter(c => c.category_id !== categoryId);
                renderVetCategoriesTable();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        function renderVetCategoriesTable() {
            const tbody = document.getElementById('vet-categories-table-body');
            if (!tbody) return;

            if (vetCategories.length === 0) {
                tbody.innerHTML = '<tr><td colspan="2" style="text-align:center; color: #94a3b8;">No categories yet</td></tr>';
                return;
            }

            tbody.innerHTML = vetCategories.map(cat => `
                <tr>
                    <td>${cat.category_name}</td>
                    <td style="text-align: center;">
                        <button onclick="deleteVetCategory('${cat.category_id}')" style="background: none; border: none; cursor: pointer; color: #ef4444; font-size: 18px; font-weight: bold; padding: 4px;" title="Delete">&times;</button>
                    </td>
                </tr>
            `).join('');
        }

        const addVetCategoryBtn = document.getElementById('add-vet-category-btn');
        if (addVetCategoryBtn) {
            addVetCategoryBtn.onclick = openVetCategoryModal;
        }

        const closeVetCategoryBtn = document.getElementById('close-vet-category-modal');
        if (closeVetCategoryBtn) {
            closeVetCategoryBtn.onclick = closeVetCategoryModal;
        }

        const saveVetCategoryBtn = document.getElementById('save-vet-category-btn');
        if (saveVetCategoryBtn) {
            saveVetCategoryBtn.onclick = saveVetCategory;
        }

        var vetSuppliersData = [];
        var API_BASE_VET_SUPPLIERS = '/api/vet-suppliers';

        function switchVetSupplierTab(tab) {
            const createPanel = document.getElementById('panel-create-vet-supplier');
            const editPanel = document.getElementById('panel-edit-vet-supplier');
            const createTab = document.getElementById('tab-create-vet-supplier');
            const editTab = document.getElementById('tab-edit-vet-supplier');

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

        async function openVetSuppliersModal() {
            const modal = document.getElementById('vet-suppliers-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_VET_SUPPLIERS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-vet-supplier-id').value = idData.supplier_id || 'VetSuID-1';
            } catch (err) {
                document.getElementById('create-vet-supplier-id').value = 'VetSuID-1';
            }

            switchVetSupplierTab('create');
            modal.classList.remove('hidden');
        }

        function closeVetSuppliersModal() {
            const modal = document.getElementById('vet-suppliers-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadVetSuppliers() {
            const tbody = document.getElementById('vet-suppliers-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_VET_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch veterinary suppliers');
                vetSuppliersData = await res.json();
                renderVetSuppliersTable();
            } catch (err) {
                console.error('Failed to load veterinary suppliers', err);
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderVetSuppliersTable() {
            const tbody = document.getElementById('vet-suppliers-table-body');
            if (!tbody) return;

            if (vetSuppliersData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No suppliers found</td></tr>';
                return;
            }

            tbody.innerHTML = vetSuppliersData.map(supplier => `
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

        async function saveCreateVetSupplier() {
            const supplierId = document.getElementById('create-vet-supplier-id').value;
            const companyName = document.getElementById('create-vet-company-name').value.trim();
            const address = document.getElementById('create-vet-address').value.trim();
            const tinNumber = document.getElementById('create-vet-tin-number').value.trim();
            const contactPerson = document.getElementById('create-vet-contact-person').value.trim();
            const contactNumber = document.getElementById('create-vet-contact-number').value.trim();
            const status = document.getElementById('create-vet-supplier-status').value;

            if (!companyName) {
                alert('Company Name is required');
                return;
            }

            try {
                const res = await fetch(API_BASE_VET_SUPPLIERS, {
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

                alert('Veterinary Supplier created successfully');
                document.getElementById('create-vet-company-name').value = '';
                document.getElementById('create-vet-address').value = '';
                document.getElementById('create-vet-tin-number').value = '';
                document.getElementById('create-vet-contact-person').value = '';
                document.getElementById('create-vet-contact-number').value = '';
                document.getElementById('create-vet-supplier-status').value = 'Active';

                const idRes = await fetch(API_BASE_VET_SUPPLIERS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-vet-supplier-id').value = idData.supplier_id || 'VetSuID-1';

                loadVetSuppliersPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function saveEditVetSupplier() {
            const supplierId = document.getElementById('edit-vet-supplier-id').value;
            const companyName = document.getElementById('edit-vet-company-name').value.trim();
            const address = document.getElementById('edit-vet-address').value.trim();
            const tinNumber = document.getElementById('edit-vet-tin-number').value.trim();
            const contactPerson = document.getElementById('edit-vet-contact-person').value.trim();
            const contactNumber = document.getElementById('edit-vet-contact-number').value.trim();
            const status = document.getElementById('edit-vet-supplier-status').value;

            if (!supplierId || !companyName) {
                alert('Supplier ID and Company Name are required');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_VET_SUPPLIERS}/${encodeURIComponent(supplierId)}`, {
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

                alert('Veterinary Supplier updated successfully');
                loadVetSuppliersPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        function renderVetSupplierSearchResults(suppliers) {
            const searchResults = document.getElementById('edit-vet-supplier-search-results');
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
                    selectVetSupplier(supplierId);
                });
            });
        }

        window.selectVetSupplier = async (supplierId) => {
            const searchResults = document.getElementById('edit-vet-supplier-search-results');
            if (searchResults) searchResults.style.display = 'none';

            try {
                const res = await fetch(`${API_BASE_VET_SUPPLIERS}/code/${encodeURIComponent(supplierId)}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const supplier = await res.json();
                    document.getElementById('edit-vet-supplier-id').value = supplier.supplier_id || '';
                    document.getElementById('edit-vet-company-name').value = supplier.company_name || '';
                    document.getElementById('edit-vet-address').value = supplier.address || '';
                    document.getElementById('edit-vet-tin-number').value = supplier.tin_number || '';
                    document.getElementById('edit-vet-contact-person').value = supplier.contact_person || '';
                    document.getElementById('edit-vet-contact-number').value = supplier.contact_number || '';
                    document.getElementById('edit-vet-supplier-status').value = supplier.status || 'Active';
                    switchVetSupplierTab('edit');
                }
            } catch (err) {
                alert('Error loading supplier: ' + err.message);
            }
        };

        window.switchVetSupplierTab = switchVetSupplierTab;
        window.openVetSuppliersModal = openVetSuppliersModal;
        window.closeVetSuppliersModal = closeVetSuppliersModal;
        window.saveCreateVetSupplier = saveCreateVetSupplier;
        window.saveEditVetSupplier = saveEditVetSupplier;
        window.selectVetSupplier = selectVetSupplier;

        const addVetSuppliersBtn = document.getElementById('add-vet-suppliers-btn');
        if (addVetSuppliersBtn) {
            addVetSuppliersBtn.onclick = openVetSuppliersModal;
        }

        const closeVetSuppliersBtn = document.getElementById('close-vet-suppliers-modal');
        if (closeVetSuppliersBtn) {
            closeVetSuppliersBtn.onclick = closeVetSuppliersModal;
        }

        const saveCreateVetSupplierBtn = document.getElementById('save-create-vet-supplier-btn');
        if (saveCreateVetSupplierBtn) {
            saveCreateVetSupplierBtn.onclick = saveCreateVetSupplier;
        }

        const addRtlSuppliersBtn = document.getElementById('add-rtl-suppliers-btn');
        const rtlSuppliersModal = document.getElementById('rtl-suppliers-modal');

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

        if (addRtlSuppliersBtn && rtlSuppliersModal) {
            addRtlSuppliersBtn.onclick = openRtlSuppliersModal;
        }

        const closeRtlSuppliersBtn = document.getElementById('close-rtl-suppliers-modal');
        if (closeRtlSuppliersBtn && rtlSuppliersModal) {
            closeRtlSuppliersBtn.onclick = closeRtlSuppliersModal;
        }

        if (rtlSuppliersModal) {
            let mouseDownOnBackdrop = false;
            rtlSuppliersModal.addEventListener('mousedown', (e) => {
                mouseDownOnBackdrop = e.target === rtlSuppliersModal;
            });
            rtlSuppliersModal.addEventListener('mouseup', (e) => {
                if (mouseDownOnBackdrop && e.target === rtlSuppliersModal) {
                    rtlSuppliersModal.classList.add('hidden');
                }
                mouseDownOnBackdrop = false;
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
                    const res = await fetch('/api/rtl-suppliers', {
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
                    const res = await fetch(`/api/rtl-suppliers/${encodeURIComponent(supplierId)}`, {
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
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            };
        }

        window.switchRtlSupplierTab = switchRtlSupplierTab;
        window.openRtlSuppliersModal = openRtlSuppliersModal;
        window.closeRtlSuppliersModal = closeRtlSuppliersModal;

        const saveEditVetSupplierBtn = document.getElementById('save-edit-vet-supplier-btn');
        if (saveEditVetSupplierBtn) {
            saveEditVetSupplierBtn.onclick = saveEditVetSupplier;
        }

        setupContactNumber(document.getElementById('create-vet-contact-number'));
        setupContactNumber(document.getElementById('edit-vet-contact-number'));

        const editVetSearchInput = document.getElementById('edit-vet-supplier-search');
        const vetSearchResults = document.getElementById('edit-vet-supplier-search-results');
        let vetSearchDebounce = null;

        if (editVetSearchInput && vetSearchResults) {
            editVetSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (vetSearchDebounce) clearTimeout(vetSearchDebounce);
                if (query.length < 1) {
                    vetSearchResults.style.display = 'none';
                    return;
                }
                vetSearchDebounce = setTimeout(async () => {
                    try {
                        const res = await fetch(API_BASE_VET_SUPPLIERS + '?search=' + encodeURIComponent(query), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const suppliers = await res.json();
                            renderVetSupplierSearchResults(suppliers);
                        }
                    } catch (err) {
                        console.error('Search failed', err);
                    }
                }, 300);
            });

            document.addEventListener('click', (e) => {
                if (!editVetSearchInput.contains(e.target) && !vetSearchResults.contains(e.target)) {
                    vetSearchResults.style.display = 'none';
                }
            });
        }

        var vetSuppliersPageData = [];
        var currentVetSuppliersPageNum = 1;
        var vetSuppliersPerPage = 10;

        async function loadVetSuppliersPage() {
            const tbody = document.getElementById('vet-suppliers-page-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_VET_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch veterinary suppliers');
                vetSuppliersPageData = await res.json();
                currentVetSuppliersPageNum = 1;
                renderVetSuppliersPageTable();
                renderVetSuppliersPagePagination();
            } catch (err) {
                console.error('Failed to load veterinary suppliers page', err);
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderVetSuppliersPageTable() {
            const tbody = document.getElementById('vet-suppliers-page-table-body');
            if (!tbody) return;

            const start = (currentVetSuppliersPageNum - 1) * vetSuppliersPerPage;
            const end = start + vetSuppliersPerPage;
            const pageData = vetSuppliersPageData.slice(start, end);

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

        function renderVetSuppliersPagePagination() {
            const container = document.getElementById('vet-suppliers-page-pagination');
            if (!container) return;

            const totalPages = Math.max(1, Math.ceil(vetSuppliersPageData.length / vetSuppliersPerPage));

            let html = '';
            if (totalPages > 10) {
                html += `<button class="page-btn" id="vet-suppliers-page-first" ${currentVetSuppliersPageNum === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            html += `<button class="page-btn" id="vet-suppliers-page-prev" ${currentVetSuppliersPageNum === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentVetSuppliersPageNum ? 'active' : ''}" id="vet-suppliers-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="vet-suppliers-page-next" ${currentVetSuppliersPageNum >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                html += `<button class="page-btn" id="vet-suppliers-page-last" ${currentVetSuppliersPageNum >= totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }

            container.innerHTML = html;

            document.getElementById('vet-suppliers-page-first')?.addEventListener('click', () => {
                if (currentVetSuppliersPageNum !== 1) {
                    currentVetSuppliersPageNum = 1;
                    renderVetSuppliersPageTable();
                    renderVetSuppliersPagePagination();
                }
            });

            document.getElementById('vet-suppliers-page-prev')?.addEventListener('click', () => {
                if (currentVetSuppliersPageNum > 1) {
                    currentVetSuppliersPageNum--;
                    renderVetSuppliersPageTable();
                    renderVetSuppliersPagePagination();
                }
            });

            document.getElementById('vet-suppliers-page-next')?.addEventListener('click', () => {
                if (currentVetSuppliersPageNum < totalPages) {
                    currentVetSuppliersPageNum++;
                    renderVetSuppliersPageTable();
                    renderVetSuppliersPagePagination();
                }
            });

            document.getElementById('vet-suppliers-page-last')?.addEventListener('click', () => {
                if (currentVetSuppliersPageNum !== totalPages) {
                    currentVetSuppliersPageNum = totalPages;
                    renderVetSuppliersPageTable();
                    renderVetSuppliersPagePagination();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`vet-suppliers-page-${i}`)?.addEventListener('click', () => {
                    currentVetSuppliersPageNum = i;
                    renderVetSuppliersPageTable();
                    renderVetSuppliersPagePagination();
                });
            }
        }

        loadVetSuppliersPage();

        var API_BASE_VET_PRODUCTS = '/api/vet-products';

        function switchVetProductTab(tab) {
            const createPanel = document.getElementById('panel-create-vet-product');
            const editPanel = document.getElementById('panel-edit-vet-product');
            const createTab = document.getElementById('tab-create-vet-product');
            const editTab = document.getElementById('tab-edit-vet-product');

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

        async function openVetProductsModal() {
            const modal = document.getElementById('vet-products-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_VET_PRODUCTS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-vet-product-id').value = idData.product_id || 'VetProdID-1';
            } catch (err) {
                document.getElementById('create-vet-product-id').value = 'VetProdID-1';
            }

            await loadActiveSuppliersForVetProduct();
            await loadActiveCategoriesForVetProduct();
            switchVetProductTab('create');
            modal.classList.remove('hidden');
        }

        function closeVetProductsModal() {
            const modal = document.getElementById('vet-products-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadActiveSuppliersForVetProduct() {
            const selects = [
                document.getElementById('create-vet-product-supplier'),
                document.getElementById('edit-vet-product-supplier')
            ];

            try {
                const res = await fetch(API_BASE_VET_SUPPLIERS, {
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
                console.error('Failed to load suppliers for vet product', err);
            }
        }

        async function loadActiveCategoriesForVetProduct() {
            const selects = [
                document.getElementById('create-vet-product-category'),
                document.getElementById('edit-vet-product-category')
            ];

            try {
                const res = await fetch(API_BASE_VET_CATEGORIES, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const categories = await res.json();
                    selects.forEach(select => {
                        if (!select) return;
                        const currentValue = select.value;
                        select.innerHTML = '<option value="">Select Category</option>';
                        categories.forEach(c => {
                            const option = document.createElement('option');
                            option.value = c.category_name;
                            option.textContent = c.category_name;
                            select.appendChild(option);
                        });
                        if (currentValue) select.value = currentValue;
                    });
                }
            } catch (err) {
                console.error('Failed to load categories for vet product', err);
            }
        }

        async function saveCreateVetProduct() {
            const productId = document.getElementById('create-vet-product-id').value;
            const supplierId = document.getElementById('create-vet-product-supplier').value;
            const item = document.getElementById('create-vet-product-item').value.trim();
            const genericName = document.getElementById('create-vet-product-generic').value.trim();
            const category = document.getElementById('create-vet-product-category').value;
            const packageSize = document.getElementById('create-vet-product-package').value.trim();
            const unit = document.getElementById('create-vet-product-unit').value;
            const unitCost = document.getElementById('create-vet-product-cost').value.trim();
            const discount = document.getElementById('create-vet-product-discount').value;
            const status = document.getElementById('create-vet-product-status').value;

            if (!supplierId) {
                alert('Supplier is required');
                return;
            }
            if (!item) {
                alert('Item is required');
                return;
            }
            if (!category) {
                alert('Category is required');
                return;
            }
            if (!unit) {
                alert('Unit is required');
                return;
            }

            try {
                const res = await fetch(API_BASE_VET_PRODUCTS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        product_id: productId,
                        supplier_id: supplierId,
                        item: item,
                        generic_name: genericName || null,
                        category: category,
                        package_size: packageSize || null,
                        unit: unit,
                        unit_cost: unitCost || 0,
                        discount: discount || '0%',
                        status: status,
                        dosage_preventive_value: dosagePreventiveValue || null,
                        dosage_preventive_unit: dosagePreventiveUnit || null,
                        dosage_preventive_water: dosagePreventiveWater || null,
                        dosage_treatment_value: dosageTreatmentValue || null,
                        dosage_treatment_unit: dosageTreatmentUnit || null,
                        dosage_treatment_water: dosageTreatmentWater || null
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save product');
                }

                alert('Veterinary Product created successfully');
                document.getElementById('create-vet-product-supplier').value = '';
                document.getElementById('create-vet-product-item').value = '';
                document.getElementById('create-vet-product-generic').value = '';
                document.getElementById('create-vet-product-category').value = '';
                document.getElementById('create-vet-product-package').value = '';
                document.getElementById('create-vet-product-unit').value = '';
                document.getElementById('create-vet-product-cost').value = '';
                document.getElementById('create-vet-product-discount').value = '';
                document.getElementById('create-vet-product-status').value = 'Active';

                const idRes = await fetch(API_BASE_VET_PRODUCTS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-vet-product-id').value = idData.product_id || 'VetProdID-1';

                loadVetProductsPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function saveEditVetProduct() {
            const productId = document.getElementById('edit-vet-product-id').value;
            const supplierId = document.getElementById('edit-vet-product-supplier').value;
            const item = document.getElementById('edit-vet-product-item').value.trim();
            const genericName = document.getElementById('edit-vet-product-generic').value.trim();
            const category = document.getElementById('edit-vet-product-category').value;
            const packageSize = document.getElementById('edit-vet-product-package').value.trim();
            const unit = document.getElementById('edit-vet-product-unit').value;
            const unitCost = document.getElementById('edit-vet-product-cost').value.trim();
            const discount = document.getElementById('edit-vet-product-discount').value;
            const status = document.getElementById('edit-vet-product-status').value;

            if (!productId || !item) {
                alert('Product ID and Item are required');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_VET_PRODUCTS}/${encodeURIComponent(productId)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        product_id: productId,
                        supplier_id: supplierId,
                        item: item,
                        generic_name: genericName || null,
                        category: category,
                        package_size: packageSize || null,
                        unit: unit,
                        unit_cost: unitCost || 0,
                        discount: discount || '0%',
                        status: status,
                        dosage_preventive_value: dosagePreventiveValue || null,
                        dosage_preventive_unit: dosagePreventiveUnit || null,
                        dosage_preventive_water: dosagePreventiveWater || null,
                        dosage_treatment_value: dosageTreatmentValue || null,
                        dosage_treatment_unit: dosageTreatmentUnit || null,
                        dosage_treatment_water: dosageTreatmentWater || null
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to update product');
                }

                alert('Veterinary Product updated successfully');
                loadVetProductsPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        function renderVetProductSearchResults(products) {
            const searchResults = document.getElementById('edit-vet-product-search-results');
            if (!searchResults) return;
            if (!products || products.length === 0) {
                searchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No products found</div>';
                searchResults.style.display = 'block';
                return;
            }
            searchResults.innerHTML = products.map(p => `
                <div class="supplier-search-result" data-product-id="${p.product_id}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                    <div style="font-weight: 600; color: #1a1f2e;">${p.item || ''}</div>
                    <div style="font-size: 12px; color: #64748b;">${p.product_id || ''}</div>
                </div>
            `).join('');
            searchResults.style.display = 'block';

            searchResults.querySelectorAll('.supplier-search-result').forEach(item => {
                item.addEventListener('click', () => {
                    const productId = item.getAttribute('data-product-id');
                    selectVetProduct(productId);
                });
            });
        }

        window.selectVetProduct = async (productId) => {
            const searchResults = document.getElementById('edit-vet-product-search-results');
            if (searchResults) searchResults.style.display = 'none';

            try {
                const res = await fetch(`${API_BASE_VET_PRODUCTS}/code/${encodeURIComponent(productId)}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const product = await res.json();
                    document.getElementById('edit-vet-product-id').value = product.product_id || '';
                    document.getElementById('edit-vet-product-supplier').value = product.supplier_id || '';
                    document.getElementById('edit-vet-product-item').value = product.item || '';
                    document.getElementById('edit-vet-product-generic').value = product.generic_name || '';
                    document.getElementById('edit-vet-product-category').value = product.category || '';
                    document.getElementById('edit-vet-product-package').value = product.package_size || '';
                    document.getElementById('edit-vet-product-unit').value = product.unit || '';
                    document.getElementById('edit-vet-product-cost').value = product.unit_cost || '';
                    document.getElementById('edit-vet-product-discount').value = product.discount || '0%';
                    document.getElementById('edit-vet-product-status').value = product.status || 'Active';
                    switchVetProductTab('edit');
                }
            } catch (err) {
                alert('Error loading product: ' + err.message);
            }
        };

        window.switchVetProductTab = switchVetProductTab;
        window.openVetProductsModal = openVetProductsModal;
        window.closeVetProductsModal = closeVetProductsModal;
        window.saveCreateVetProduct = saveCreateVetProduct;
        window.saveEditVetProduct = saveEditVetProduct;
        window.selectVetProduct = selectVetProduct;

        const addVetProductsBtn = document.getElementById('add-vet-products-btn');
        if (addVetProductsBtn) {
            addVetProductsBtn.onclick = openVetProductsModal;
        }

        const closeVetProductsBtn = document.getElementById('close-vet-products-modal');
        if (closeVetProductsBtn) {
            closeVetProductsBtn.onclick = closeVetProductsModal;
        }

        const saveCreateVetProductBtn = document.getElementById('save-create-vet-product-btn');
        if (saveCreateVetProductBtn) {
            saveCreateVetProductBtn.onclick = saveCreateVetProduct;
        }

        const saveEditVetProductBtn = document.getElementById('save-edit-vet-product-btn');
        if (saveEditVetProductBtn) {
            saveEditVetProductBtn.onclick = saveEditVetProduct;
        }

        const editVetProductSearchInput = document.getElementById('edit-vet-product-search');
        const vetProductSearchResults = document.getElementById('edit-vet-product-search-results');
        let vetProductSearchDebounce = null;

        if (editVetProductSearchInput && vetProductSearchResults) {
            editVetProductSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (vetProductSearchDebounce) clearTimeout(vetProductSearchDebounce);
                if (query.length < 1) {
                    vetProductSearchResults.style.display = 'none';
                    return;
                }
                vetProductSearchDebounce = setTimeout(async () => {
                    try {
                        const res = await fetch(API_BASE_VET_PRODUCTS + '?search=' + encodeURIComponent(query), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const products = await res.json();
                            renderVetProductSearchResults(products);
                        }
                    } catch (err) {
                        console.error('Search failed', err);
                    }
                }, 300);
            });

            document.addEventListener('click', (e) => {
                if (!editVetProductSearchInput.contains(e.target) && !vetProductSearchResults.contains(e.target)) {
                    vetProductSearchResults.style.display = 'none';
                }
            });
        }

        function formatNumber(num) {
            if (isNaN(num)) return '0.00';
            return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function setupPackageSizeInput(input) {
            if (!input) return;
            input.addEventListener('input', (e) => {
                let val = e.target.value.replace(/[^0-9]/g, '');
                if (val) {
                    val = parseInt(val).toLocaleString('en-US');
                }
                e.target.value = val;
            });
        }

        function setupUnitCostInput(input) {
            if (!input) return;
            input.addEventListener('blur', (e) => {
                const val = formatPrice(e.target.value);
                if (val) e.target.value = val;
            });
        }

        function formatPrice(value) {
            const num = parseFloat(value.replace(/[^0-9.]/g, ''));
            if (isNaN(num)) return '';
            return num.toFixed(2);
        }

        function setupDiscountInput(input) {
            if (!input) return;
            input.addEventListener('input', (e) => {
                let val = e.target.value.replace(/[^0-9]/g, '');
                if (val) {
                    val = parseInt(val);
                    if (val > 100) val = 100;
                    e.target.value = val + '%';
                } else {
                    e.target.value = '';
                }
            });
            input.addEventListener('blur', (e) => {
                if (!e.target.value || e.target.value === '%') {
                    e.target.value = '0%';
                }
            });
        }

        setupDiscountInput(document.getElementById('create-vet-product-discount'));
        setupDiscountInput(document.getElementById('edit-vet-product-discount'));

        setupPackageSizeInput(document.getElementById('create-vet-product-package'));
        setupPackageSizeInput(document.getElementById('edit-vet-product-package'));
        setupUnitCostInput(document.getElementById('create-vet-product-cost'));
        setupUnitCostInput(document.getElementById('edit-vet-product-cost'));

        var vetProductsPageData = [];
        var currentVetProductsPageNum = 1;
        var vetProductsPerPage = 10;

        async function loadVetProductsPage() {
            const tbody = document.getElementById('vet-products-page-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_VET_PRODUCTS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch veterinary products');
                vetProductsPageData = await res.json();
                currentVetProductsPageNum = 1;
                renderVetProductsPageTable();
                renderVetProductsPagePagination();
            } catch (err) {
                console.error('Failed to load veterinary products page', err);
                tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderVetProductsPageTable() {
            const tbody = document.getElementById('vet-products-page-table-body');
            if (!tbody) return;

            const start = (currentVetProductsPageNum - 1) * vetProductsPerPage;
            const end = start + vetProductsPerPage;
            const pageData = vetProductsPageData.slice(start, end);

            if (pageData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;">No products found</td></tr>';
                return;
            }

            tbody.innerHTML = pageData.map(product => `
                <tr>
                    <td>${product.product_id || '-'}</td>
                    <td>${product.supplier_id || '-'}</td>
                    <td>${product.item || '-'}</td>
                    <td>${product.generic_name || '-'}</td>
                    <td>${product.category || '-'}</td>
                    <td>${product.package_size || '-'}</td>
                    <td>${product.unit || '-'}</td>
                    <td>P ${formatNumber(product.unit_cost || 0)}</td>
                    <td>${product.discount || '0%'}</td>
                    <td>${product.status || '-'}</td>
                </tr>
            `).join('');
        }

        function renderVetProductsPagePagination() {
            const container = document.getElementById('vet-products-page-pagination');
            if (!container) return;

            const totalPages = Math.max(1, Math.ceil(vetProductsPageData.length / vetProductsPerPage));

            let html = '';
            if (totalPages > 10) {
                html += `<button class="page-btn" id="vet-products-page-first" ${currentVetProductsPageNum === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            html += `<button class="page-btn" id="vet-products-page-prev" ${currentVetProductsPageNum === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentVetProductsPageNum ? 'active' : ''}" id="vet-products-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="vet-products-page-next" ${currentVetProductsPageNum >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                html += `<button class="page-btn" id="vet-products-page-last" ${currentVetProductsPageNum >= totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }

            container.innerHTML = html;

            document.getElementById('vet-products-page-first')?.addEventListener('click', () => {
                if (currentVetProductsPageNum !== 1) {
                    currentVetProductsPageNum = 1;
                    renderVetProductsPageTable();
                    renderVetProductsPagePagination();
                }
            });

            document.getElementById('vet-products-page-prev')?.addEventListener('click', () => {
                if (currentVetProductsPageNum > 1) {
                    currentVetProductsPageNum--;
                    renderVetProductsPageTable();
                    renderVetProductsPagePagination();
                }
            });

            document.getElementById('vet-products-page-next')?.addEventListener('click', () => {
                if (currentVetProductsPageNum < totalPages) {
                    currentVetProductsPageNum++;
                    renderVetProductsPageTable();
                    renderVetProductsPagePagination();
                }
            });

            document.getElementById('vet-products-page-last')?.addEventListener('click', () => {
                if (currentVetProductsPageNum !== totalPages) {
                    currentVetProductsPageNum = totalPages;
                    renderVetProductsPageTable();
                    renderVetProductsPagePagination();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`vet-products-page-${i}`)?.addEventListener('click', () => {
                    currentVetProductsPageNum = i;
                    renderVetProductsPageTable();
                    renderVetProductsPagePagination();
                });
            }
        }

        loadVetProductsPage();
        loadVetSuppliersPage();

        var orderVetSuppliesItems = [];
        var API_BASE_VET_PRODUCTS = '/api/vet-products';
        var API_BASE_VET_ORDERS = '/api/order-vet-supplies';
        var API_BASE_VET_REPAYMENT = '/api/order-vet-supplies-repayment';
        var API_BASE_VET_INVENTORY = '/api/vet-products-inventory';

        async function loadVetStocksAvailability() {
            const tbody = document.getElementById('vet-stocks-availability-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_VET_INVENTORY, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch inventory');
                const data = await res.json();

                if (data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: #94a3b8;">No inventory records</td></tr>';
                    return;
                }

                tbody.innerHTML = data.map(row => {
                    const date = row.last_updated ? new Date(row.last_updated).toISOString().split('T')[0] : '';
                    return `<tr><td>${row.item || ''}</td><td>${row.category || ''}</td><td>${row.unit || ''}</td><td>${row.quantity || 0}</td><td>${date}</td></tr>`;
                }).join('');
            } catch (err) {
                console.error('Failed to load stocks availability:', err);
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        async function loadVetUseTransactions() {
            const tbody = document.getElementById('vet-use-transactions-table-body');
            if (!tbody) return;

            try {
                const res = await fetch('/api/vet-supplies-use', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch vet supplies use');
                const data = await res.json();

                if (data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #94a3b8;">No records found</td></tr>';
                    return;
                }

                tbody.innerHTML = data.map(row => {
                    const date = row.date ? new Date(row.date).toISOString().split('T')[0] : '';
                    const useTime = row.use_time || '';
                    return `<tr>
                        <td>${row.use_id || ''}</td>
                        <td>${date}</td>
                        <td>${row.building || ''}</td>
                        <td>${row.item || ''}</td>
                        <td>${row.category || ''}</td>
                        <td>${row.unit || ''}</td>
                        <td>${row.quantity || 0}</td>
                        <td>${row.prepared_by || ''}</td>
                        <td>${useTime}</td>
                        <td>${row.status || ''}</td>
                    </tr>`;
                }).join('');
            } catch (err) {
                console.error('Failed to load vet supplies use transactions:', err);
                tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function switchOrderVetSuppliesTab(tab) {
        }

        async function openOrderVetSuppliesModal() {
            const modal = document.getElementById('order-vet-supplies-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_VET_ORDERS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('order-vet-supplies-id').value = idData.order_id || 'OrVeSupID-1';
            } catch (err) {
                console.error('Failed to fetch next order ID', err);
                document.getElementById('order-vet-supplies-id').value = 'OrVeSupID-1';
            }

            document.getElementById('order-vet-supplies-date').value = new Date().toISOString().split('T')[0];
            document.getElementById('order-vet-supplies-terms').value = '';
            document.getElementById('order-vet-supplies-invoice').value = '';
            document.getElementById('order-vet-supplies-company').innerHTML = '<option value="">Select Company</option>';
            document.getElementById('order-vet-supplies-product').innerHTML = '<option value="">Select Product</option>';
            document.getElementById('order-vet-supplies-grand-total').value = '';
            orderVetSuppliesItems = [];
            renderOrderVetSuppliesItems();

            const uploadZone = document.getElementById('order-vet-supplies-upload-zone');
            if (uploadZone && uploadZone._clear) {
                uploadZone._clear();
            }

            await loadActiveSuppliersForOrderVet();
            modal.classList.remove('hidden');
        }

        function closeOrderVetSuppliesModal() {
            const modal = document.getElementById('order-vet-supplies-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadActiveSuppliersForOrderVet() {
            const supplierSelect = document.getElementById('order-vet-supplies-company');
            if (!supplierSelect) return;

            try {
                const res = await fetch(API_BASE_VET_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const suppliers = await res.json();
                    const activeSuppliers = suppliers.filter(s => s.status === 'Active');
                    supplierSelect.innerHTML = '<option value="">Select Company</option>';
                    activeSuppliers.forEach(s => {
                        const option = document.createElement('option');
                        option.value = s.supplier_id;
                        option.textContent = s.company_name;
                        supplierSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load suppliers for order vet supplies', err);
            }
        }

        async function loadVetProductsBySupplier(supplierId) {
            const productSelect = document.getElementById('order-vet-supplies-product');
            if (!productSelect) return;

            try {
                const res = await fetch(API_BASE_VET_PRODUCTS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const products = await res.json();
                    const supplierProducts = products.filter(p => p.supplier_id === supplierId && p.status === 'Active');
                    productSelect.innerHTML = '<option value="">Select Product</option>';
                    supplierProducts.forEach(p => {
                        const option = document.createElement('option');
                        option.value = p.product_id;
                        option.textContent = p.item;
                        option.setAttribute('data-product-id', p.product_id);
                        option.setAttribute('data-item', p.item);
                        option.setAttribute('data-package-size', p.package_size || '');
                        option.setAttribute('data-unit', p.unit || '');
                        option.setAttribute('data-unit-cost', p.unit_cost || 0);
                        option.setAttribute('data-discount', p.discount || '0%');
                        productSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load vet products', err);
            }
        }

        function addVetSupplyItem() {
            const productSelect = document.getElementById('order-vet-supplies-product');
            const selectedOption = productSelect.options[productSelect.selectedIndex];

            if (!selectedOption || !selectedOption.value) {
                alert('Please select a product');
                return;
            }

            const productId = selectedOption.getAttribute('data-product-id') || selectedOption.value;
            const item = selectedOption.getAttribute('data-item') || selectedOption.textContent;
            const packageSize = selectedOption.getAttribute('data-package-size') || '';
            const unit = selectedOption.getAttribute('data-unit') || '';
            const unitCost = parseFloat(selectedOption.getAttribute('data-unit-cost') || 0);
            const discount = selectedOption.getAttribute('data-discount') || '0%';

            const existingItem = orderVetSuppliesItems.find(i => i.productId === productId);
            if (existingItem) {
                alert('Item already added');
                return;
            }

            orderVetSuppliesItems.push({
                productId: productId,
                item: item,
                quantity: 1,
                packageSize: packageSize,
                unit: unit,
                unitCost: unitCost,
                discount: discount,
                freeUnits: 0
            });

            renderOrderVetSuppliesItems();
            productSelect.value = '';
        }

        function removeVetSupplyItem(index) {
            orderVetSuppliesItems.splice(index, 1);
            renderOrderVetSuppliesItems();
        }

        function renderOrderVetSuppliesItems() {
            const tbody = document.getElementById('order-vet-supplies-items-table-body');
            if (!tbody) return;

            if (orderVetSuppliesItems.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color: #94a3b8;">No items added</td></tr>';
                document.getElementById('order-vet-supplies-grand-total').value = '';
                return;
            }

            tbody.innerHTML = orderVetSuppliesItems.map((item, index) => {
                const freeUnits = parseInt(item.freeUnits) || 0;
                const discountValue = parseFloat(item.discount) || 0;
                const totalPrice = Math.max(0, (item.quantity - freeUnits)) * item.unitCost * (1 - discountValue / 100);
                return `
                    <tr>
                        <td>${item.item}</td>
                        <td><input type="number" value="${item.quantity}" min="1" style="width: 80px; padding: 4px; border: 1px solid #D6D6D6; border-radius: 4px;" onchange="updateVetSupplyItemQuantity(${index}, this.value)" /></td>
                        <td>${item.packageSize || '-'}</td>
                        <td>${item.unit || '-'}</td>
                        <td>P ${formatNumber(item.unitCost)}</td>
                        <td><input type="number" value="${freeUnits}" min="0" style="width: 80px; padding: 4px; border: 1px solid #D6D6D6; border-radius: 4px;" onchange="updateVetSupplyItemFreeUnits(${index}, this.value)" /></td>
                        <td>${item.discount}</td>
                        <td>P ${formatNumber(totalPrice)}</td>
                        <td style="text-align: center;">
                            <button onclick="removeVetSupplyItem(${index})" style="background: none; border: none; cursor: pointer; color: #ef4444; font-size: 18px; font-weight: bold; padding: 4px;" title="Remove">&times;</button>
                        </td>
                    </tr>
                `;
            }).join('');

            const grandTotal = orderVetSuppliesItems.reduce((sum, item) => {
                const freeUnits = parseInt(item.freeUnits) || 0;
                const discountValue = parseFloat(item.discount) || 0;
                return sum + (Math.max(0, item.quantity - freeUnits) * item.unitCost * (1 - discountValue / 100));
            }, 0);
            document.getElementById('order-vet-supplies-grand-total').value = 'P ' + formatNumber(grandTotal);
        }

        window.updateVetSupplyItemQuantity = (index, value) => {
            const qty = parseInt(value) || 1;
            if (qty < 1) {
                orderVetSuppliesItems[index].quantity = 1;
            } else {
                orderVetSuppliesItems[index].quantity = qty;
            }
            renderOrderVetSuppliesItems();
        };

        window.updateVetSupplyItemFreeUnits = (index, value) => {
            const freeUnits = parseInt(value) || 0;
            if (freeUnits < 0) {
                orderVetSuppliesItems[index].freeUnits = 0;
            } else {
                orderVetSuppliesItems[index].freeUnits = freeUnits;
            }
            renderOrderVetSuppliesItems();
        };

        async function saveOrderVetSupplies() {
            const orderId = document.getElementById('order-vet-supplies-id').value;
            const date = document.getElementById('order-vet-supplies-date').value;
            const terms = parseInt(document.getElementById('order-vet-supplies-terms').value) || 0;
            const invoice = document.getElementById('order-vet-supplies-invoice').value;
            const company = document.getElementById('order-vet-supplies-company').value;
            const grandTotal = orderVetSuppliesItems.reduce((sum, item) => {
                return sum + (Math.max(0, item.quantity - (item.freeUnits || 0)) * item.unitCost * (1 - (parseFloat(item.discount) || 0) / 100));
            }, 0);

            if (!date) {
                alert('Date is required');
                return;
            }
            if (!company) {
                alert('Company is required');
                return;
            }
            if (orderVetSuppliesItems.length === 0) {
                alert('Please add at least one item');
                return;
            }

            const dueDate = new Date(date);
            if (terms > 0) {
                dueDate.setDate(dueDate.getDate() + terms);
            }

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

            const itemsToSave = orderVetSuppliesItems.map(item => ({
                date: date,
                due_date: dueDate ? dueDate.toISOString().split('T')[0] : null,
                sales_invoice: invoice || null,
                company_id: company,
                product_item_code: item.item,
                quantity: item.quantity,
                package_size: item.packageSize || null,
                unit: item.unit || null,
                unit_price: item.unitCost,
                free_units: item.freeUnits || 0,
                discount: item.discount || '0%',
                total_price: Math.max(0, (item.quantity - (item.freeUnits || 0)) * item.unitCost * (1 - (parseFloat(item.discount) || 0) / 100)),
                status: 'Pending',
                payment_date: null,
                payment_source: null,
                check_number: null,
                created_by: createdBy
            }));

            const requestBody = {
                items: itemsToSave,
                date: date,
                sales_invoice: invoice || null
            };

            if (orderVetSuppliesFileBlob) {
                requestBody.invoice_file_base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(orderVetSuppliesFileBlob);
                });
            }

            fetch(API_BASE_VET_ORDERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                },
                body: JSON.stringify(requestBody)
            })
            .then(res => res.json())
            .then(async data => {
                if (Array.isArray(data) && data.length > 0) {
                    alert('Order Veterinary Supplies saved successfully\n\nOrder IDs: ' + data.map(o => o.order_id).join(', ') + '\nDate: ' + date + '\nTerms: ' + terms + ' days\nInvoice: ' + (invoice || 'N/A') + '\nCompany: ' + company + '\nItems: ' + orderVetSuppliesItems.length + '\nGrand Total: ' + grandTotal);

                    const companySelect = document.getElementById('order-vet-supplies-company');
                    const companyName = companySelect ? (companySelect.options[companySelect.selectedIndex]?.textContent || company) : company;

                    for (let i = 0; i < data.length; i++) {
                        const order = data[i];
                        const item = orderVetSuppliesItems[i];

                        try {
                            const expenseNextRes = await fetch('/api/expenses/next-id', {
                                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                            });
                            if (!expenseNextRes.ok) continue;
                            const expenseNextData = await expenseNextRes.json();

                            const expenseRes = await fetch('/api/expenses', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                                },
                                body: JSON.stringify({
                                    expense_list_id: expenseNextData.expense_list_id,
                                    tracking_id: order.order_id,
                                    date: date,
                                    accounting_code: '5115',
                                    expense_type: 'Veterinary, Vaccines & Supplements',
                                    description: `${orderVetSuppliesItems.length} item${orderVetSuppliesItems.length !== 1 ? 's' : ''} from ${companyName} - amounting to P ${formatNumber(parseFloat(grandTotal) || 0)}`,
                                    remarks: `Sales invoice # - ${invoice || 'N/A'}`,
                                    total_amount: parseFloat(item.total_price) || 0,
                                    account_source: null,
                                    cleared_date: null,
                                    status: 'Pending'
                                })
                            });

                            if (!expenseRes.ok) {
                                const errData = await expenseRes.json().catch(() => ({}));
                                console.error('Failed to create expense:', errData);
                            }
                        } catch (expenseErr) {
                            console.error('Error creating expense:', expenseErr);
                        }
                    }
                } else {
                    alert('Order Veterinary Supplies saved successfully');
                }
                closeOrderVetSuppliesModal();
                loadVetTransactionsPage();

                for (let i = 0; i < orderVetSuppliesItems.length; i++) {
                    const item = orderVetSuppliesItems[i];
                    const totalQty = (parseInt(item.quantity) || 0);
                    const packageSize = parseFloat((item.packageSize || '').replace(/,/g, '')) || 0;
                    const totalQuantity = packageSize > 0 ? totalQty * packageSize : totalQty;
                    if (totalQuantity > 0 && item.productId) {
                        try {
                            await fetch(API_BASE_VET_INVENTORY + '/add', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                                },
                                body: JSON.stringify({ product_id: item.productId, quantity: totalQuantity })
                            });
                        } catch (invErr) {
                            console.error('Error updating inventory:', invErr);
                        }
                    }
                }
                loadVetStocksAvailability();
            })
            .catch(err => {
                alert('Error: ' + err.message);
            });
        }

        let orderVetSuppliesFileBlob = null;
        let orderVetSuppliesFileName = null;

        function convertImageToWebP(dataUrl, quality = 0.85, maxWidth = null) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.naturalWidth;
                    let height = img.naturalHeight;

                    if (maxWidth && width > maxWidth) {
                        const ratio = maxWidth / width;
                        width = maxWidth;
                        height = Math.round(img.naturalHeight * ratio);
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to convert image to WebP'));
                        }
                    }, 'image/webp', quality);
                };
                img.onerror = () => reject(new Error('Failed to load image for conversion'));
                img.src = dataUrl;
            });
        }

        async function processOrderVetSuppliesFile(file) {
            const validTypes = ['image/jpeg', 'image/jpg'];
            const maxInputSize = 5 * 1024 * 1024;
            const maxOutputSize = 1 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                throw new Error('Only JPG files are allowed.');
            }

            if (file.size > maxInputSize) {
                throw new Error('File size must not exceed 5MB.');
            }

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const dataUrl = e.target.result;
                        const img = new Image();
                        img.onload = async () => {
                            let quality = 0.9;
                            let maxWidth = img.naturalWidth;
                            let blob = await convertImageToWebP(dataUrl, quality, maxWidth);

                            while (blob.size > maxOutputSize && quality > 0.3) {
                                quality -= 0.1;
                                blob = await convertImageToWebP(dataUrl, quality, maxWidth);
                            }

                            while (blob.size > maxOutputSize && maxWidth > 800) {
                                maxWidth = Math.floor(maxWidth * 0.7);
                                quality = 0.85;
                                blob = await convertImageToWebP(dataUrl, quality, maxWidth);
                                while (blob.size > maxOutputSize && quality > 0.3) {
                                    quality -= 0.1;
                                    blob = await convertImageToWebP(dataUrl, quality, maxWidth);
                                }
                            }

                            if (blob.size > maxOutputSize) {
                                reject(new Error('Could not compress image below 1MB. Please use a smaller image.'));
                                return;
                            }
                            resolve({ blob, dataUrl });
                        };
                        img.onerror = () => reject(new Error('Failed to load image. Please try a different file.'));
                        img.src = dataUrl;
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = () => reject(new Error('Failed to read file.'));
                reader.readAsDataURL(file);
            });
        }

        function setupOrderVetSuppliesUploadZone() {
            const zone = document.getElementById('order-vet-supplies-upload-zone');
            if (!zone) return;

            const input = document.getElementById('order-vet-supplies-file-input');
            const placeholder = zone.querySelector('.upload-placeholder');
            const preview = zone.querySelector('.upload-preview');
            const previewImg = document.getElementById('order-vet-supplies-upload-preview-img');
            const removeBtn = preview ? preview.querySelector('.remove-upload-btn') : null;

            if (!input || !placeholder || !preview || !previewImg || !removeBtn) return;

            const showPreview = (dataUrl) => {
                previewImg.src = dataUrl;
                placeholder.style.display = 'none';
                preview.style.display = 'flex';
            };

            const clearPreview = () => {
                previewImg.src = '';
                placeholder.style.display = '';
                preview.style.display = 'none';
                input.value = '';
                orderVetSuppliesFileBlob = null;
                orderVetSuppliesFileName = null;
            };

            const handleFile = async (file) => {
                try {
                    const result = await processOrderVetSuppliesFile(file);
                    orderVetSuppliesFileBlob = result.blob;
                    orderVetSuppliesFileName = file.name;
                    showPreview(result.dataUrl);
                } catch (err) {
                    alert(err.message);
                    clearPreview();
                }
            };

            zone.addEventListener('click', (e) => {
                if (e.target !== removeBtn && !removeBtn.contains(e.target)) {
                    input.click();
                }
            });

            zone.addEventListener('dragenter', (e) => {
                e.preventDefault();
                e.stopPropagation();
                zone.style.borderColor = '#2563eb';
                zone.style.background = 'rgba(37, 99, 235, 0.05)';
            });

            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });

            zone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!zone.contains(e.relatedTarget)) {
                    zone.style.borderColor = '#cbd5e1';
                    zone.style.background = '#f8fafc';
                }
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                zone.style.borderColor = '#cbd5e1';
                zone.style.background = '#f8fafc';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleFile(files[0]);
                }
            });

            input.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleFile(e.target.files[0]);
                }
            });

            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clearPreview();
            });

            zone._clear = clearPreview;
        }

        setupOrderVetSuppliesUploadZone();

        const openVetModalBtn = document.getElementById('open-vet-modal');
        if (openVetModalBtn) {
            openVetModalBtn.onclick = openOrderVetSuppliesModal;
        }

        const closeOrderVetBtn = document.getElementById('close-order-vet-supplies-modal');
        if (closeOrderVetBtn) {
            closeOrderVetBtn.onclick = closeOrderVetSuppliesModal;
        }

        const saveOrderVetBtn = document.getElementById('save-order-vet-supplies-btn');
        if (saveOrderVetBtn) {
            saveOrderVetBtn.onclick = saveOrderVetSupplies;
        }

        const orderVetProductSelect = document.getElementById('order-vet-supplies-product');
        if (orderVetProductSelect) {
            orderVetProductSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    addVetSupplyItem();
                }
            });
        }

        const orderVetCompanySelect = document.getElementById('order-vet-supplies-company');
        if (orderVetCompanySelect) {
            orderVetCompanySelect.addEventListener('change', (e) => {
                const supplierId = e.target.value;
                if (supplierId) {
                    loadVetProductsBySupplier(supplierId);
                } else {
                    document.getElementById('order-vet-supplies-product').innerHTML = '<option value="">Select Product</option>';
                }
            });
        }

        const openVetPaymentModalBtn = document.getElementById('open-vet-payment-modal');
        if (openVetPaymentModalBtn) {
            openVetPaymentModalBtn.onclick = async () => {
                const modal = document.getElementById('vet-payment-modal');
                if (!modal) return;

                document.getElementById('vet-payment-id').value = 'VeSupPayID-1';
                document.getElementById('vet-payment-bank-source').value = '';
                document.getElementById('vet-payment-check-number').value = '';
                const bankSelect = document.getElementById('vet-payment-bank-source');
                bankSelect.innerHTML = '<option value="">-- Select Bank --</option>';

                try {
                    const idRes = await fetch(API_BASE_VET_REPAYMENT + '/next-id', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (idRes.ok) {
                        const { repayment_id } = await idRes.json();
                        document.getElementById('vet-payment-id').value = repayment_id;
                    }
                } catch (err) {
                    console.error('Failed to fetch payment ID', err);
                }

                try {
                    const bankRes = await fetch('/api/bank-accounts', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (bankRes.ok) {
                        const banks = await bankRes.json();
                        const activeBanks = banks.filter(b => b.status === 'Active');
                        activeBanks.forEach(bank => {
                            const option = document.createElement('option');
                            option.value = bank.bank_code || bank.bank;
                            const masked = maskBankAccount(bank.bank_account_number);
                            option.textContent = `${bank.bank_code || bank.bank} (${masked})`;
                            bankSelect.appendChild(option);
                        });
                    }
                } catch (err) {
                    console.error('Failed to load banks', err);
                }

                const tbody = document.getElementById('vet-payment-search-results');
                if (tbody) {
                    tbody.innerHTML = '<tr class="empty-row"><td colspan="6" style="height: 48px; background: #fff;">&nbsp;</td></tr>';
                }
                updateVetPaymentGrandTotal();

                const select = document.getElementById('vet-payment-search');
                select.innerHTML = '<option value="">-- Select Pending Supplies --</option>';

                try {
                    const res = await fetch(API_BASE_VET_ORDERS, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (res.ok) {
                        const orders = await res.json();
                        const pendingOrders = orders.filter(o => o.status === 'Pending');
                        
                        const groupedByInvoice = {};
                        pendingOrders.forEach(order => {
                            const invoice = order.sales_invoice || 'N/A';
                            if (!groupedByInvoice[invoice]) {
                                groupedByInvoice[invoice] = [];
                            }
                            groupedByInvoice[invoice].push(order);
                        });

                        Object.keys(groupedByInvoice).forEach(invoice => {
                            const option = document.createElement('option');
                            option.value = invoice;
                            option.dataset.invoice = invoice;
                            option.dataset.orders = JSON.stringify(groupedByInvoice[invoice]);
                            option.textContent = invoice;
                            select.appendChild(option);
                        });
                    }
                } catch (err) {
                    console.error('Failed to load pending vet supplies', err);
                }

                modal.classList.remove('hidden');
            };
        }

        const closeVetPaymentModalBtn = document.getElementById('close-vet-payment-modal');
        if (closeVetPaymentModalBtn) {
            closeVetPaymentModalBtn.onclick = () => {
                const modal = document.getElementById('vet-payment-modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            };
        }

        document.getElementById('vet-payment-search')?.addEventListener('change', (e) => {
            const selected = e.target.selectedOptions[0];
            const tbody = document.getElementById('vet-payment-search-results');
            if (!tbody || !selected || !selected.value) return;

            const orders = JSON.parse(selected.dataset.orders || '[]');
            if (orders.length === 0) return;

            const existingOrderIds = Array.from(tbody.querySelectorAll('tr:not(.empty-row) td:first-child'))
                .map(td => td.textContent.trim());

            const newOrders = orders.filter(o => !existingOrderIds.includes(o.order_id));
            if (newOrders.length === 0) {
                alert('All items for this invoice have already been chosen');
                e.target.value = '';
                return;
            }

            if (tbody.querySelector('.empty-row')) {
                tbody.innerHTML = '';
            }

            newOrders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.order_id || '-'}</td>
                    <td>${order.company_name || '-'}</td>
                    <td>${order.sales_invoice || '-'}</td>
                    <td>${order.product_item_code || '-'}</td>
                    <td>${formatNumber(parseFloat(order.quantity) || 0)}</td>
                    <td>P ${formatNumber(parseFloat(order.total_price) || 0)}</td>
                `;
                tbody.appendChild(row);
            });

            updateVetPaymentGrandTotal();

            e.target.value = '';
        });

        document.getElementById('vet-payment-select-all-btn')?.addEventListener('click', () => {
            const select = document.getElementById('vet-payment-search');
            const tbody = document.getElementById('vet-payment-search-results');
            if (!select || !tbody) return;

            const options = Array.from(select.querySelectorAll('option')).filter(opt => opt.value);
            if (options.length === 0) {
                alert('No supplies available to select');
                return;
            }

            tbody.innerHTML = '';

            options.forEach(option => {
                const orders = JSON.parse(option.dataset.orders || '[]');
                orders.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.order_id || '-'}</td>
                        <td>${order.company_name || '-'}</td>
                        <td>${order.sales_invoice || '-'}</td>
                        <td>${order.product_item_code || '-'}</td>
                        <td>${formatNumber(parseFloat(order.quantity) || 0)}</td>
                        <td>P ${formatNumber(parseFloat(order.total_price) || 0)}</td>
                    `;
                    tbody.appendChild(row);
                });
            });

            updateVetPaymentGrandTotal();
        });

        function updateVetPaymentGrandTotal() {
            const tbody = document.getElementById('vet-payment-search-results');
            const grandTotalEl = document.getElementById('vet-payment-grand-total');
            if (!tbody || !grandTotalEl) return;

            let total = 0;
            const rows = tbody.querySelectorAll('tr:not(.empty-row)');
            rows.forEach(row => {
                const lastCell = row.querySelector('td:last-child');
                if (lastCell) {
                    const text = lastCell.textContent.replace('P ', '').replace(/,/g, '');
                    const num = parseFloat(text);
                    if (!isNaN(num)) total += num;
                }
            });

            grandTotalEl.textContent = 'P ' + formatNumber(total);
        }

        var currentVetSupplyPaymentOrderId = null;

        window.openVetSupplyPaymentModal = async (orderId, paymentDate, paymentSource, checkNumber) => {
            currentVetSupplyPaymentOrderId = orderId;
            document.getElementById('vet-supply-payment-order-id').value = orderId;
            document.getElementById('vet-supply-payment-date').value = paymentDate || new Date().toISOString().split('T')[0];
            document.getElementById('vet-supply-payment-check-number').value = checkNumber || '';

            const sourceSelect = document.getElementById('vet-supply-payment-source');
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
                            option.textContent = `${acc.bank} - ${maskBankAccount(acc.bank_account_number)}`;
                            if (acc.bank_account_id === paymentSource) option.selected = true;
                            sourceSelect.appendChild(option);
                        });
                    }
                } catch (err) {
                    console.error('Failed to load bank accounts', err);
                }
            }

            document.getElementById('vet-supply-payment-modal').classList.remove('hidden');
        };

        function closeVetSupplyPaymentModal() {
            document.getElementById('vet-supply-payment-modal').classList.add('hidden');
            currentVetSupplyPaymentOrderId = null;
        }

        async function saveVetSupplyPayment() {
            const orderId = document.getElementById('vet-supply-payment-order-id').value;
            const paymentDate = document.getElementById('vet-supply-payment-date').value;
            const paymentSource = document.getElementById('vet-supply-payment-source').value;
            const checkNumber = document.getElementById('vet-supply-payment-check-number').value.trim();

            if (!paymentDate) {
                alert('Payment Date is required');
                return;
            }
            if (!paymentSource) {
                alert('Payment Source is required');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_VET_ORDERS}/${encodeURIComponent(orderId)}`, {
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
                closeVetSupplyPaymentModal();
                loadVetTransactionsPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        document.getElementById('save-vet-payment-btn')?.addEventListener('click', async () => {
            const bankSource = document.getElementById('vet-payment-bank-source').value;
            const checkNumber = document.getElementById('vet-payment-check-number').value;
            const tbody = document.getElementById('vet-payment-search-results');
            const rows = tbody ? tbody.querySelectorAll('tr:not(.empty-row)') : [];

            if (rows.length === 0) {
                alert('Please select at least one supply to pay');
                return;
            }

            if (!bankSource) {
                alert('Please select a bank source');
                return;
            }

            try {
                const items = Array.from(rows).map(row => {
                    const cells = row.querySelectorAll('td');
                    return {
                        order_id: cells[0].textContent.trim(),
                        total: parseFloat(cells[5].textContent.replace('P ', '').replace(/,/g, '')) || 0
                    };
                });

                const res = await fetch(API_BASE_VET_REPAYMENT + '/batch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        items,
                        bank_source: bankSource,
                        check_number: checkNumber || null
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save payment');
                }

                const data = await res.json();
                const ids = Array.isArray(data) ? data.map(d => d.repayment_id).join(', ') : '';

                const today = new Date().toISOString().split('T')[0];
                for (const item of items) {
                    try {
                        await fetch(`/api/expenses/by-tracking-id/${encodeURIComponent(item.order_id)}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                            },
                            body: JSON.stringify({
                                account_source: bankSource,
                                cleared_date: today,
                                status: 'Paid'
                            })
                        });
                    } catch (expenseErr) {
                        console.error('Failed to update expense for', item.order_id, expenseErr);
                    }
                }

                alert('Payment saved successfully!\n\nPayment IDs: ' + ids + '\nItems: ' + items.length + '\nTotal Amount: ' + document.getElementById('vet-payment-grand-total').textContent);
                document.getElementById('vet-payment-modal').classList.add('hidden');
                loadVetTransactionsPage();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });

        const closeVetSupplyPaymentModalBtn = document.getElementById('close-vet-supply-payment-modal');
        if (closeVetSupplyPaymentModalBtn) {
            closeVetSupplyPaymentModalBtn.addEventListener('click', closeVetSupplyPaymentModal);
        }

        const saveVetSupplyPaymentBtn = document.getElementById('save-vet-supply-payment-btn');
        if (saveVetSupplyPaymentBtn) {
            saveVetSupplyPaymentBtn.addEventListener('click', saveVetSupplyPayment);
        }

        const calculateVetProductsBtn = document.getElementById('calculate-vet-products-btn');
        if (calculateVetProductsBtn) {
            calculateVetProductsBtn.addEventListener('click', () => {
                const mainViewElements = document.querySelectorAll('.vet-layout > .header-actions, .vet-layout > .action-buttons-row, .vet-layout > .vet-content-grid, .vet-layout > .vet-bottom-row, .vet-layout > .vet-bottom-row-2');
                const computationsView = document.getElementById('vet-computations-view');
                const breadcrumb = document.getElementById('breadcrumb');
                mainViewElements.forEach(el => el.style.display = 'none');
                if (computationsView) computationsView.style.display = 'block';
                if (breadcrumb) breadcrumb.innerHTML = 'Purchasing <span>/</span> Veterinary Supplies <span>/</span> Veterinary Product Computations';
            });
        }

        const vetComputationsBackBtn = document.getElementById('vet-computations-back-btn');
        if (vetComputationsBackBtn) {
            vetComputationsBackBtn.addEventListener('click', () => {
                const mainViewElements = document.querySelectorAll('.vet-layout > .header-actions, .vet-layout > .action-buttons-row, .vet-layout > .vet-content-grid, .vet-layout > .vet-bottom-row, .vet-layout > .vet-bottom-row-2');
                const computationsView = document.getElementById('vet-computations-view');
                const breadcrumb = document.getElementById('breadcrumb');
                mainViewElements.forEach(el => el.style.display = 'block');
                if (computationsView) computationsView.style.display = 'none';
                if (breadcrumb) breadcrumb.innerHTML = 'Purchasing <span>/</span> Veterinary Supplies';
            });
        }

        const vetComputationsSearch = document.getElementById('vet-computations-search');
        const vetComputationsResults = document.getElementById('vet-computations-results');
        if (vetComputationsSearch && vetComputationsResults) {
            let searchDebounce = null;
            vetComputationsSearch.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (searchDebounce) clearTimeout(searchDebounce);
                searchDebounce = setTimeout(async () => {
                    try {
                        const res = await fetch(API_BASE_VET_PRODUCTS + '?search=' + encodeURIComponent(query), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const products = await res.json();
                            const activeProducts = products.filter(p => p.status === 'Active');
                            renderVetComputationsResults(activeProducts);
                        }
                    } catch (err) {
                        console.error('Failed to search vet products', err);
                    }
                }, 300);
            });
        }

        let vetComputationProduct = null;

        function renderVetComputationsResults(products) {
            if (!vetComputationsResults) return;
            if (!products || products.length === 0) {
                vetComputationsResults.innerHTML = '<p style="color: #64748b;">No active veterinary products found.</p>';
                return;
            }

            if (products.length === 1) {
                vetComputationProduct = products[0];
                renderVetComputationForm(products[0]);
                return;
            }

            vetComputationsResults.innerHTML = `
                <div style="overflow-x: auto;">
                    <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <thead>
                            <tr style="background: #f1f5f9;">
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product ID</th>
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Unit</th>
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Unit Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map(p => `
                                <tr style="border-bottom: 1px solid #eee; cursor: pointer;" class="vet-computation-product-row" data-product-id="${p.product_id}">
                                    <td style="padding: 10px;">${p.product_id || '-'}</td>
                                    <td style="padding: 10px; font-weight: 600; color: #2563eb;">${p.item || '-'}</td>
                                    <td style="padding: 10px;">${p.unit || '-'}</td>
                                    <td style="padding: 10px;">P ${formatNumber(parseFloat(p.unit_cost) || 0)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            vetComputationsResults.querySelectorAll('.vet-computation-product-row').forEach(row => {
                row.addEventListener('click', () => {
                    const productId = row.getAttribute('data-product-id');
                    const product = products.find(p => p.product_id === productId);
                    if (product) {
                        vetComputationProduct = product;
                        renderVetComputationForm(product);
                    }
                });
            });
        }

        function renderVetComputationForm(product) {
            if (!vetComputationsResults) return;

            const prevValue = product.dosage_preventive_value || '';
            const prevUnit = product.dosage_preventive_unit || product.unit || '';
            const prevWater = product.dosage_preventive_water || '';
            const treatValue = product.dosage_treatment_value || '';
            const treatUnit = product.dosage_treatment_unit || product.unit || '';
            const treatWater = product.dosage_treatment_water || '';

            vetComputationsResults.innerHTML = `
                <div style="background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 16px; width: 100%; box-sizing: border-box;">
                    <div style="font-weight: 600; color: #1a1f2e; margin-bottom: 12px; font-size: 16px;">
                        ${product.item || product.product_id || 'Product'}
                    </div>

                    <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
                        <div style="width: 30%; min-width: 280px; display: flex; flex-direction: column; gap: 8px; padding: 12px; background: #f8fafc; border: 1px solid #ddd; border-radius: 6px;">
                            <span style="font-size: 13px; font-weight: 600; color: #1a1f2e; white-space: nowrap;">How much water will you be using?</span>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <input type="number" id="vet-comp-shared-water" placeholder="0" step="0.01" style="flex: 1; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px;" />
                                <span style="font-size: 13px; font-weight: 600; color: #1a1f2e; white-space: nowrap;">Liters</span>
                            </div>
                        </div>
                        <div style="width: 30%; min-width: 280px; display: flex; flex-direction: column; gap: 8px; padding: 12px; background: #f8fafc; border: 1px solid #ddd; border-radius: 6px;">
                            <span style="font-size: 13px; font-weight: 600; color: #1a1f2e; white-space: nowrap;">How many Days do you wish to Use this medicine?</span>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <input type="number" id="vet-comp-days-input" placeholder="0" step="1" style="flex: 1; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px;" />
                                <span style="font-size: 13px; font-weight: 600; color: #1a1f2e; white-space: nowrap;">Days</span>
                            </div>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: stretch;">
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div style="display: flex; flex-direction: column; gap: 10px; padding: 12px; background: #FFF9C4; border: 1px solid #ddd; border-radius: 6px; flex: 1;">
                                <div style="font-weight: 600; color: #1a1f2e; font-size: 13px;">Preventive Dose</div>
                                <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                                    <input type="text" value="${prevUnit}" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-prev-grams" value="${prevValue}" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" value="Liters" readonly style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-prev-liters" value="${prevWater}" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center; margin-top: 8px; flex-wrap: wrap;">
                                    <input type="text" value="${prevUnit}" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-prev-result-value" value="" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" value="Liters" readonly style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-prev-result-water" value="" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                </div>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 10px; padding: 10px; background: #FFF9C4; border: 1px solid #ddd; border-radius: 6px; flex: 1;">
                                <div style="font-weight: 600; color: #1a1f2e; font-size: 13px;">Treatment Dose</div>
                                <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                                    <input type="text" value="${treatUnit}" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-treat-grams" value="${treatValue}" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" value="Liters" readonly style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-treat-liters" value="${treatWater}" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center; margin-top: 8px; flex-wrap: wrap;">
                                    <input type="text" value="${treatUnit}" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-treat-result-value" value="" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" value="Liters" readonly style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-treat-result-water" value="" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                </div>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div style="display: flex; flex-direction: column; gap: 10px; padding: 10px; background: #FFF9C4; border: 1px solid #ddd; border-radius: 6px; flex: 1;">
                                <div style="font-weight: 600; color: #1a1f2e; font-size: 13px;">Actual Preventive Dose</div>
                                <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                                    <input type="text" id="vet-comp-actual-prev-dose" value="" readonly style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" value="${product.unit || 'Grams'}" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 12px; color: #1a1f2e; font-weight: 600;">X</span>
                                    <input type="text" id="vet-comp-actual-prev-days" value="" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600; white-space: nowrap;">days=</span>
                                    <input type="text" id="vet-comp-actual-prev-total" value="" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center; font-weight: 600;" />
                            </div>
                            <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                                <input type="text" id="vet-comp-actual-prev-dose-2" value="" style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #fff; text-align: center;" />
                                <input type="text" value="${product.unit || 'Grams'}" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                <span style="font-size: 12px; color: #1a1f2e; font-weight: 600;">X</span>
                                <input type="text" id="vet-comp-actual-prev-days-2" value="" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600; white-space: nowrap;">days=</span>
                                    <input type="text" id="vet-comp-actual-prev-total-2" value="" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center; font-weight: 600;" />
                            </div>
                        </div>

                            <div style="display: flex; flex-direction: column; gap: 10px; padding: 10px; background: #FFF9C4; border: 1px solid #ddd; border-radius: 6px; flex: 1;">
                                <div style="font-weight: 600; color: #1a1f2e; font-size: 13px;">Actual Treatment Dose</div>
                            <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                                <input type="text" id="vet-comp-actual-treat-dose" value="" readonly style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                <input type="text" value="${product.unit || 'Grams'}" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 12px; color: #1a1f2e; font-weight: 600;">X</span>
                                    <input type="text" id="vet-comp-actual-treat-days" value="" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600; white-space: nowrap;">days=</span>
                                    <input type="text" id="vet-comp-actual-treat-total" value="" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center; font-weight: 600;" />
                            </div>
                            <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                                <input type="text" id="vet-comp-actual-treat-dose-2" value="" style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #fff; text-align: center;" />
                                <input type="text" value="${product.unit || 'Grams'}" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 12px; color: #1a1f2e; font-weight: 600;">X</span>
                                    <input type="text" id="vet-comp-actual-treat-days-2" value="" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600; white-space: nowrap;">days=</span>
                                    <input type="text" id="vet-comp-actual-treat-total-2" value="" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center; font-weight: 600;" />
                            </div>
                        </div>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div style="display: flex; flex-direction: column; gap: 10px; padding: 10px; background: #FFF9C4; border: 1px solid #ddd; border-radius: 6px; flex: 1;">
                                <div style="font-weight: 600; color: #1a1f2e; font-size: 13px;">Preventive Cost</div>
                                <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600; white-space: nowrap;">Unit Cost:</span>
                                    <input type="text" id="vet-comp-prev-unit-cost" value="" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600;">/</span>
                                    <input type="text" id="vet-comp-prev-package-size" value="" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-prev-cost-unit" value="" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                                    <input type="text" id="vet-comp-prev-cost-grams" value="" readonly style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 12px; color: #1a1f2e; font-weight: 600;">=</span>
                                    <input type="text" id="vet-comp-prev-total-cost" value="" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center; font-weight: 600;" />
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600; white-space: nowrap;">PHP</span>
                                </div>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 10px; padding: 10px; background: #FFF9C4; border: 1px solid #ddd; border-radius: 6px; flex: 1;">
                                <div style="font-weight: 600; color: #1a1f2e; font-size: 13px;">Treatment Cost</div>
                                <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600; white-space: nowrap;">Unit Cost:</span>
                                    <input type="text" id="vet-comp-treat-unit-cost" value="" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600;">/</span>
                                    <input type="text" id="vet-comp-treat-package-size" value="" readonly style="flex: 1; min-width: 60px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <input type="text" id="vet-comp-treat-cost-unit" value="" readonly style="flex: 1; min-width: 45px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                                    <input type="text" id="vet-comp-treat-cost-grams" value="" readonly style="flex: 1; min-width: 50px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center;" />
                                    <span style="font-size: 12px; color: #1a1f2e; font-weight: 600;">=</span>
                                    <input type="text" id="vet-comp-treat-total-cost" value="" readonly style="flex: 1; min-width: 55px; padding: 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 13px; background: #f1f5f9; text-align: center; font-weight: 600;" />
                                    <span style="font-size: 11px; color: #1a1f2e; font-weight: 600; white-space: nowrap;">PHP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const sharedWaterInput = document.getElementById('vet-comp-shared-water');

            if (sharedWaterInput) {
                sharedWaterInput.addEventListener('input', () => {
                    const water = sharedWaterInput.value;
                    calculateDose('prev', parseFloat(prevValue) || 0, prevUnit, parseFloat(prevWater) || 0, water);
                    calculateDose('treat', parseFloat(treatValue) || 0, treatUnit, parseFloat(treatWater) || 0, water);
                });
            }

            const daysInput = document.getElementById('vet-comp-days-input');
            if (daysInput) {
                daysInput.addEventListener('input', () => {
                    calculateTotalGrams();
                    updateActualDoseFields();
                });
            }

            const actualPrevDose2 = document.getElementById('vet-comp-actual-prev-dose-2');
            const actualTreatDose2 = document.getElementById('vet-comp-actual-treat-dose-2');
            if (actualPrevDose2) actualPrevDose2.addEventListener('input', calculateActualTotals);
            if (actualTreatDose2) actualTreatDose2.addEventListener('input', calculateActualTotals);

            updateActualDoseFields();

            const prevUnitCostEl = document.getElementById('vet-comp-prev-unit-cost');
            const treatUnitCostEl = document.getElementById('vet-comp-treat-unit-cost');
            if (prevUnitCostEl && product.unit_cost) {
                prevUnitCostEl.value = parseFloat(product.unit_cost).toFixed(2);
            }
            if (treatUnitCostEl && product.unit_cost) {
                treatUnitCostEl.value = parseFloat(product.unit_cost).toFixed(2);
            }

            const prevPackageSizeEl = document.getElementById('vet-comp-prev-package-size');
            const treatPackageSizeEl = document.getElementById('vet-comp-treat-package-size');
            if (prevPackageSizeEl && product.package_size) {
                prevPackageSizeEl.value = product.package_size.replace(/,/g, '');
            }
            if (treatPackageSizeEl && product.package_size) {
                treatPackageSizeEl.value = product.package_size.replace(/,/g, '');
            }

            const prevCostUnitEl = document.getElementById('vet-comp-prev-cost-unit');
            const treatCostUnitEl = document.getElementById('vet-comp-treat-cost-unit');
            if (prevCostUnitEl && product.unit) {
                prevCostUnitEl.value = product.unit;
            }
            if (treatCostUnitEl && product.unit) {
                treatCostUnitEl.value = product.unit;
            }

            calculateCosts();
        }

        function calculateDose(type, presetValue, presetUnit, presetWater, inputWater) {
            const water = parseFloat(inputWater);
            if (!water || water <= 0 || !presetWater || presetWater <= 0) {
                const resultValue = document.getElementById(type === 'prev' ? 'vet-comp-prev-result-value' : 'vet-comp-treat-result-value');
                const resultWater = document.getElementById(type === 'prev' ? 'vet-comp-prev-result-water' : 'vet-comp-treat-result-water');
                if (resultValue) resultValue.value = '';
                if (resultWater) resultWater.value = '';
                updateActualDoseFields();
                return;
            }

            const resultValueNum = (water / presetWater) * presetValue;
            const resultValue = document.getElementById(type === 'prev' ? 'vet-comp-prev-result-value' : 'vet-comp-treat-result-value');
            const resultWater = document.getElementById(type === 'prev' ? 'vet-comp-prev-result-water' : 'vet-comp-treat-result-water');

            if (resultValue) resultValue.value = Math.round(resultValueNum * 100) / 100;
            if (resultWater) resultWater.value = water;

            const gramsPerDayEl = document.getElementById('vet-comp-grams-per-day');
            if (gramsPerDayEl) {
                gramsPerDayEl.value = Math.round(resultValueNum * 100) / 100;
            }

            calculateTotalGrams();
            updateActualDoseFields();
        }

        function calculateCosts() {
            const prevUnitCost = document.getElementById('vet-comp-prev-unit-cost');
            const prevPackageSize = document.getElementById('vet-comp-prev-package-size');
            const prevTotalCost = document.getElementById('vet-comp-prev-total-cost');
            const prevCostGrams = document.getElementById('vet-comp-prev-cost-grams');
            const actualPrevTotal2 = document.getElementById('vet-comp-actual-prev-total-2');

            const treatUnitCost = document.getElementById('vet-comp-treat-unit-cost');
            const treatPackageSize = document.getElementById('vet-comp-treat-package-size');
            const treatTotalCost = document.getElementById('vet-comp-treat-total-cost');
            const treatCostGrams = document.getElementById('vet-comp-treat-cost-grams');
            const actualTreatTotal2 = document.getElementById('vet-comp-actual-treat-total-2');

            if (prevUnitCost && prevPackageSize && prevTotalCost && prevCostGrams && actualPrevTotal2) {
                const total = parseFloat(actualPrevTotal2.value) || 0;
                const unitCost = parseFloat(prevUnitCost.value) || 0;
                const packageSize = parseFloat(prevPackageSize.value.replace(/,/g, '')) || 0;
                prevCostGrams.value = total;
                if (packageSize > 0 && total > 0 && unitCost > 0) {
                    prevTotalCost.value = ((unitCost / packageSize) * total).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                } else {
                    prevTotalCost.value = '';
                }
            }

            if (treatUnitCost && treatPackageSize && treatTotalCost && treatCostGrams && actualTreatTotal2) {
                const total = parseFloat(actualTreatTotal2.value) || 0;
                const unitCost = parseFloat(treatUnitCost.value) || 0;
                const packageSize = parseFloat(treatPackageSize.value.replace(/,/g, '')) || 0;
                treatCostGrams.value = total;
                if (packageSize > 0 && total > 0 && unitCost > 0) {
                    treatTotalCost.value = ((unitCost / packageSize) * total).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                } else {
                    treatTotalCost.value = '';
                }
            }
        }

        function updateActualDoseFields() {
            const prevResultValue = document.getElementById('vet-comp-prev-result-value');
            const treatResultValue = document.getElementById('vet-comp-treat-result-value');
            const actualPrevDose = document.getElementById('vet-comp-actual-prev-dose');
            const actualTreatDose = document.getElementById('vet-comp-actual-treat-dose');
            const actualPrevDays = document.getElementById('vet-comp-actual-prev-days');
            const actualTreatDays = document.getElementById('vet-comp-actual-treat-days');
            const actualPrevDays2 = document.getElementById('vet-comp-actual-prev-days-2');
            const actualTreatDays2 = document.getElementById('vet-comp-actual-treat-days-2');
            const daysInput = document.getElementById('vet-comp-days-input');
            const daysVal = daysInput ? daysInput.value : '';

            if (actualPrevDose && prevResultValue) actualPrevDose.value = prevResultValue.value;
            if (actualTreatDose && treatResultValue) actualTreatDose.value = treatResultValue.value;
            if (actualPrevDays) actualPrevDays.value = daysVal;
            if (actualTreatDays) actualTreatDays.value = daysVal;
            if (actualPrevDays2) actualPrevDays2.value = daysVal;
            if (actualTreatDays2) actualTreatDays2.value = daysVal;

            calculateActualTotals();
        }

        function calculateActualTotals() {
            const actualPrevDose = document.getElementById('vet-comp-actual-prev-dose');
            const actualPrevDays = document.getElementById('vet-comp-actual-prev-days');
            const actualPrevTotal = document.getElementById('vet-comp-actual-prev-total');
            const actualPrevDose2 = document.getElementById('vet-comp-actual-prev-dose-2');
            const actualPrevDays2 = document.getElementById('vet-comp-actual-prev-days-2');
            const actualPrevTotal2 = document.getElementById('vet-comp-actual-prev-total-2');

            const actualTreatDose = document.getElementById('vet-comp-actual-treat-dose');
            const actualTreatDays = document.getElementById('vet-comp-actual-treat-days');
            const actualTreatTotal = document.getElementById('vet-comp-actual-treat-total');
            const actualTreatDose2 = document.getElementById('vet-comp-actual-treat-dose-2');
            const actualTreatDays2 = document.getElementById('vet-comp-actual-treat-days-2');
            const actualTreatTotal2 = document.getElementById('vet-comp-actual-treat-total-2');

            if (actualPrevDose && actualPrevDays && actualPrevTotal) {
                const dose = parseFloat(actualPrevDose.value) || 0;
                const days = parseFloat(actualPrevDays.value) || 0;
                actualPrevTotal.value = dose > 0 && days > 0 ? (dose * days).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '';
            }
            if (actualPrevDose2 && actualPrevDays2 && actualPrevTotal2) {
                const dose = parseFloat(actualPrevDose2.value) || 0;
                const days = parseFloat(actualPrevDays2.value) || 0;
                actualPrevTotal2.value = dose > 0 && days > 0 ? (dose * days).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '';
            }
            if (actualTreatDose && actualTreatDays && actualTreatTotal) {
                const dose = parseFloat(actualTreatDose.value) || 0;
                const days = parseFloat(actualTreatDays.value) || 0;
                actualTreatTotal.value = dose > 0 && days > 0 ? (dose * days).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '';
            }
            if (actualTreatDose2 && actualTreatDays2 && actualTreatTotal2) {
                const dose = parseFloat(actualTreatDose2.value) || 0;
                const days = parseFloat(actualTreatDays2.value) || 0;
                actualTreatTotal2.value = dose > 0 && days > 0 ? (dose * days).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '';
            }

            calculateCosts();
        }

        function calculateTotalGrams() {
            const gramsPerDayEl = document.getElementById('vet-comp-grams-per-day');
            const daysInput = document.getElementById('vet-comp-days-input');
            const totalGramsEl = document.getElementById('vet-comp-total-grams');
            const totalDaysEl = document.getElementById('vet-comp-total-days');

            if (!gramsPerDayEl || !daysInput || !totalGramsEl || !totalDaysEl) return;

            const gramsPerDay = parseFloat(gramsPerDayEl.value);
            const days = parseFloat(daysInput.value);

            if (!gramsPerDay || !days || gramsPerDay <= 0 || days <= 0) {
                totalGramsEl.value = '';
                totalDaysEl.value = '';
                return;
            }

            const total = gramsPerDay * days;
            totalGramsEl.value = total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            totalDaysEl.value = days;
        }

        var vetTransactionsPageData = [];
        var vetBankAccountsMap = {};
        var vetBankCodeMap = {};
        var currentVetTransactionsPageNum = 1;
        var vetTransactionsPerPage = 10;

        async function loadVetTransactionsPage() {
            const tbody = document.getElementById('vet-transactions-page-table-body');
            if (!tbody) return;

            try {
                const [ordersRes, banksRes] = await Promise.all([
                    fetch(API_BASE_VET_ORDERS, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    }),
                    fetch('/api/bank-accounts', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    })
                ]);

                if (!ordersRes.ok) throw new Error('Failed to fetch veterinary supplies transactions');
                vetTransactionsPageData = await ordersRes.json();

                vetBankAccountsMap = {};
                vetBankCodeMap = {};
                if (banksRes.ok) {
                    const banks = await banksRes.json();
                    banks.forEach(bank => {
                        vetBankAccountsMap[bank.bank_account_id] = bank;
                        if (bank.bank_code) {
                            vetBankCodeMap[bank.bank_code] = bank;
                        }
                    });
                }

                currentVetTransactionsPageNum = 1;
                renderVetTransactionsPageTable();
                renderVetTransactionsPagePagination();
            } catch (err) {
                console.error('Failed to load veterinary supplies transactions', err);
                tbody.innerHTML = '<tr><td colspan="16" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        async function deleteVetTransaction(orderId) {
            if (!confirm('Are you sure you want to permanently delete this record?')) {
                return;
            }
            try {
                const res = await fetch(`${API_BASE_VET_ORDERS}/${encodeURIComponent(orderId)}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to delete veterinary supplies transaction');
                }
                await loadVetTransactionsPage();
                alert('Transaction deleted successfully');
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        function renderVetTransactionsPageTable() {
            const tbody = document.getElementById('vet-transactions-page-table-body');
            if (!tbody) return;

            const start = (currentVetTransactionsPageNum - 1) * vetTransactionsPerPage;
            const end = start + vetTransactionsPerPage;
            const pageData = vetTransactionsPageData.slice(start, end);

            if (pageData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="16" style="text-align:center;">No transactions found</td></tr>';
                return;
            }

            tbody.innerHTML = pageData.map(order => `
                <tr>
                    <td>${order.order_id || '-'}</td>
                    <td>${formatDate(order.date)}</td>
                    <td>${formatDate(order.due_date)}</td>
                    <td>${order.sales_invoice || '-'}</td>
                    <td>${order.company_name || '-'}</td>
                    <td>${order.product_item_code || '-'}</td>
                    <td>${order.quantity || '-'}</td>
                    <td>P ${formatNumber(order.unit_price || 0)}</td>
                    <td>${order.free_units || 0}</td>
                    <td>${order.discount || '0%'}</td>
                    <td>P ${formatNumber(order.total_price || 0)}</td>
                    <td>${order.status || '-'}</td>
                    <td>${order.file_path && String(order.file_path).trim() ? `<span class="photo-icon-wrap" data-file-path="${order.file_path}" data-order-id="${order.order_id}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg></span>` : `<span class="photo-icon-wrap" data-order-id="${order.order_id}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#800000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg></span>`}</td>
                    <td>${formatDate(order.payment_date)}</td>
                    <td>${(() => { const bank = vetBankAccountsMap[order.payment_source] || vetBankCodeMap[order.payment_source]; return bank ? bank.bank + ' - ' + maskBankAccount(bank.bank_account_number) : (order.payment_source || '-'); })()}</td>
                    <td>${order.check_number || '-'}</td>
                    <td style="text-align: center; color: #e74c3c; font-weight: bold; cursor: pointer; font-size: 20px; padding: 8px;"><span class="delete-vet-transaction-btn" data-order-id="${order.order_id}" style="cursor: pointer;">&times;</span></td>
                </tr>
            `).join('');
        }

        function renderVetTransactionsPagePagination() {
            const container = document.getElementById('vet-transactions-page-pagination');
            if (!container) return;

            const totalPages = Math.max(1, Math.ceil(vetTransactionsPageData.length / vetTransactionsPerPage));

            let html = '';
            if (totalPages > 10) {
                html += `<button class="page-btn" id="vet-transactions-page-first" ${currentVetTransactionsPageNum === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            html += `<button class="page-btn" id="vet-transactions-page-prev" ${currentVetTransactionsPageNum === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentVetTransactionsPageNum ? 'active' : ''}" id="vet-transactions-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="vet-transactions-page-next" ${currentVetTransactionsPageNum >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                html += `<button class="page-btn" id="vet-transactions-page-last" ${currentVetTransactionsPageNum >= totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }

            container.innerHTML = html;

            document.getElementById('vet-transactions-page-first')?.addEventListener('click', () => {
                if (currentVetTransactionsPageNum !== 1) {
                    currentVetTransactionsPageNum = 1;
                    renderVetTransactionsPageTable();
                    renderVetTransactionsPagePagination();
                }
            });

            document.getElementById('vet-transactions-page-prev')?.addEventListener('click', () => {
                if (currentVetTransactionsPageNum > 1) {
                    currentVetTransactionsPageNum--;
                    renderVetTransactionsPageTable();
                    renderVetTransactionsPagePagination();
                }
            });

            document.getElementById('vet-transactions-page-next')?.addEventListener('click', () => {
                if (currentVetTransactionsPageNum < totalPages) {
                    currentVetTransactionsPageNum++;
                    renderVetTransactionsPageTable();
                    renderVetTransactionsPagePagination();
                }
            });

            document.getElementById('vet-transactions-page-last')?.addEventListener('click', () => {
                if (currentVetTransactionsPageNum !== totalPages) {
                    currentVetTransactionsPageNum = totalPages;
                    renderVetTransactionsPageTable();
                    renderVetTransactionsPagePagination();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`vet-transactions-page-${i}`)?.addEventListener('click', () => {
                    currentVetTransactionsPageNum = i;
                    renderVetTransactionsPageTable();
                    renderVetTransactionsPagePagination();
                });
            }
        }

        function formatDate(dateStr) {
            if (!dateStr) return '-';
            if (dateStr.includes('T')) {
                return dateStr.split('T')[0];
            }
            return dateStr;
        }

        function formatNumber(num) {
            if (isNaN(num)) return '-';
            return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function maskBankAccount(accountNumber) {
            if (!accountNumber || accountNumber.length <= 5) return accountNumber || '-';
            const first3 = accountNumber.slice(0, 3);
            const last2 = accountNumber.slice(-2);
            const stars = '*'.repeat(accountNumber.length - 5);
            return `${first3}${stars}${last2}`;
        }

        const vetPhotoTooltip = document.createElement('div');
        vetPhotoTooltip.className = 'photo-preview-tooltip';
        vetPhotoTooltip.style.cssText = 'display:none; position:fixed; z-index:9999; background:#fff; border:1px solid #ddd; border-radius:6px; padding:6px; box-shadow:0 4px 12px rgba(0,0,0,0.15); pointer-events:none;';
        document.body.appendChild(vetPhotoTooltip);

        document.addEventListener('mouseover', (e) => {
            const wrap = e.target.closest('.photo-icon-wrap');
            if (!wrap) return;
            const src = wrap.getAttribute('data-file-path');
            if (!src) return;
            const fullSrc = src.startsWith('http') ? src : `${src}`;
            vetPhotoTooltip.innerHTML = `<img src="${fullSrc}" alt="preview" style="max-width: min(90vw, 1200px); max-height: 90vh; object-fit: contain; display: block;">`;
            vetPhotoTooltip.style.display = 'block';
            positionVetPhotoTooltip();
        });

        document.addEventListener('mouseout', (e) => {
            const wrap = e.target.closest('.photo-icon-wrap');
            if (!wrap) return;
            vetPhotoTooltip.style.display = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (vetPhotoTooltip.style.display === 'block') {
                positionVetPhotoTooltip();
            }
        });

        function positionVetPhotoTooltip() {
            const rect = vetPhotoTooltip.getBoundingClientRect();
            const left = Math.max(8, (window.innerWidth - rect.width) / 2);
            const top = Math.max(8, (window.innerHeight - rect.height) / 2);
            vetPhotoTooltip.style.left = left + 'px';
            vetPhotoTooltip.style.top = top + 'px';
        }

        let currentVetPhotoUploadOrderId = null;
        let vetPhotoUploadFileBlob = null;
        let vetPhotoUploadOriginalFile = null;

        document.getElementById('vet-transactions-page-table-body')?.addEventListener('click', (e) => {
            const icon = e.target.closest('.photo-icon-wrap');
            if (!icon) return;
            e.stopPropagation();
            const orderId = icon.getAttribute('data-order-id');
            if (!orderId) return;

            currentVetPhotoUploadOrderId = orderId;
            const modal = document.getElementById('vet-photo-upload-modal');
            if (modal) {
                modal.classList.remove('hidden');
            }
        });

        document.getElementById('close-vet-photo-upload-modal')?.addEventListener('click', () => {
            const modal = document.getElementById('vet-photo-upload-modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        });

        document.getElementById('vet-transactions-page-table-body')?.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-vet-transaction-btn');
            if (!deleteBtn) return;
            const orderId = deleteBtn.getAttribute('data-order-id');
            if (orderId) deleteVetTransaction(orderId);
        });

        const vetPhotoUploadDropZone = document.getElementById('vet-photo-upload-drop-zone');
        const vetPhotoUploadFileInput = document.getElementById('vet-photo-upload-file-input');

        if (vetPhotoUploadDropZone && vetPhotoUploadFileInput) {
            vetPhotoUploadDropZone.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON') {
                    vetPhotoUploadFileInput.click();
                }
            });

            vetPhotoUploadDropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                vetPhotoUploadDropZone.style.borderColor = '#2563eb';
                vetPhotoUploadDropZone.style.background = 'rgba(37, 99, 235, 0.05)';
            });

            vetPhotoUploadDropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!vetPhotoUploadDropZone.contains(e.relatedTarget)) {
                    vetPhotoUploadDropZone.style.borderColor = '#cbd5e1';
                    vetPhotoUploadDropZone.style.background = '#f8fafc';
                }
            });

            vetPhotoUploadDropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                vetPhotoUploadDropZone.style.borderColor = '#cbd5e1';
                vetPhotoUploadDropZone.style.background = '#f8fafc';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleVetPhotoUploadFile(files[0]);
                }
            });

            vetPhotoUploadFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleVetPhotoUploadFile(e.target.files[0]);
                }
            });

            const removeBtn = vetPhotoUploadDropZone.querySelector('.remove-upload-btn');
            if (removeBtn) {
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    vetPhotoUploadFileBlob = null;
                    vetPhotoUploadOriginalFile = null;
                    const preview = vetPhotoUploadDropZone.querySelector('.upload-preview');
                    const placeholder = vetPhotoUploadDropZone.querySelector('.upload-placeholder');
                    const previewImg = preview ? preview.querySelector('img') : null;
                    if (preview && placeholder && previewImg) {
                        previewImg.src = '';
                        placeholder.style.display = '';
                        preview.style.display = 'none';
                    }
                    if (vetPhotoUploadFileInput) {
                        vetPhotoUploadFileInput.value = '';
                    }
                });
            }
        }

        async function handleVetPhotoUploadFile(file) {
            vetPhotoUploadOriginalFile = file;
            const validTypes = ['image/jpeg', 'image/jpg'];
            const maxInputSize = 5 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                alert('Only JPG files are allowed.');
                vetPhotoUploadOriginalFile = null;
                return;
            }

            if (file.size > maxInputSize) {
                alert('File size must not exceed 5MB.');
                vetPhotoUploadOriginalFile = null;
                return;
            }

            try {
                const dataUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = () => reject(new Error('Failed to read file.'));
                    reader.readAsDataURL(file);
                });

                const zone = document.getElementById('vet-photo-upload-drop-zone');
                const preview = zone ? zone.querySelector('.upload-preview') : null;
                const placeholder = zone ? zone.querySelector('.upload-placeholder') : null;
                const previewImg = preview ? preview.querySelector('img') : null;

                if (preview && placeholder && previewImg) {
                    previewImg.src = dataUrl;
                    placeholder.style.display = 'none';
                    preview.style.display = 'flex';
                }

                const img = new Image();
                img.onload = async () => {
                    let quality = 0.9;
                    let maxWidth = img.naturalWidth;
                    let blob = await convertImageToWebP(dataUrl, quality, maxWidth);

                    while (blob.size > 1024 * 1024 && quality > 0.3) {
                        quality -= 0.1;
                        blob = await convertImageToWebP(dataUrl, quality, maxWidth);
                    }

                    while (blob.size > 1024 * 1024 && maxWidth > 800) {
                        maxWidth = Math.floor(maxWidth * 0.7);
                        quality = 0.85;
                        blob = await convertImageToWebP(dataUrl, quality, maxWidth);
                        while (blob.size > 1024 * 1024 && quality > 0.3) {
                            quality -= 0.1;
                            blob = await convertImageToWebP(dataUrl, quality, maxWidth);
                        }
                    }

                    if (blob.size > 1024 * 1024) {
                        alert('Could not compress image below 1MB. Please use a smaller image.');
                        return;
                    }

                    vetPhotoUploadFileBlob = blob;
                };
                img.onerror = () => alert('Failed to load image. Please try a different file.');
                img.src = dataUrl;
            } catch (err) {
                console.error('Failed to process file', err);
                alert('Failed to process file');
            }
        }

        document.getElementById('save-vet-photo-upload-btn')?.addEventListener('click', async () => {
            if (!currentVetPhotoUploadOrderId) {
                alert('No order selected');
                return;
            }

            const fileToUpload = vetPhotoUploadFileBlob || vetPhotoUploadOriginalFile;
            if (!fileToUpload) {
                alert('Please select a file first');
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', fileToUpload, `order-${currentVetPhotoUploadOrderId}.webp`);
                const uploadRes = await fetch(`/api/order-vet-supplies/${currentVetPhotoUploadOrderId}/photo`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: formData
                });

                if (!uploadRes.ok) {
                    const errData = await uploadRes.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to upload photo');
                }

                const modal = document.getElementById('vet-photo-upload-modal');
                if (modal) {
                    modal.classList.add('hidden');
                }

                await loadVetTransactionsPage();
                alert('Photo uploaded successfully');
            } catch (err) {
                console.error('Failed to upload photo', err);
                alert(err.message || 'Failed to upload photo');
            }
        });

        const removeVetPhotoBtn = document.getElementById('remove-vet-photo-upload-btn');
        if (removeVetPhotoBtn) {
            removeVetPhotoBtn.addEventListener('click', async () => {
                if (!currentVetPhotoUploadOrderId) {
                    alert('No order selected');
                    return;
                }
                try {
                    const res = await fetch(`/api/order-vet-supplies/${encodeURIComponent(currentVetPhotoUploadOrderId)}/photo`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        }
                    });
                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to remove photo');
                    }
                    const modal = document.getElementById('vet-photo-upload-modal');
                    if (modal) {
                        modal.classList.add('hidden');
                    }
                    await loadVetTransactionsPage();
                    alert('Photo removed successfully');
                } catch (err) {
                    console.error('Failed to remove photo', err);
                    alert(err.message || 'Failed to remove photo');
                }
            });
        }

        const recordVetUseBtn = document.getElementById('record-vet-use-btn');
        const recordVetUseModal = document.getElementById('record-vet-use-modal');
        let vetUseItemOptions = '';

        const createVetUseRow = (buildingName, isCustom = false) => {
            const tbody = document.getElementById('vet-use-tbody');
            if (!tbody) return;
            const selectHtml = `<select class="modal-input vet-use-item-select"><option value="">Select Item</option>${vetUseItemOptions}</select>`;
            const buildingOptions = `<option value="">Select</option><option value="Checkpoint 1">Checkpoint 1</option><option value="Checkpoint 2">Checkpoint 2</option><option value="Others">Others</option>`;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${isCustom ? `<select class="modal-input vet-use-building-select">${buildingOptions}</select>` : `<div class="building-name-cell">${buildingName}</div>`}</td>
                <td>${selectHtml}</td>
                <td><div class="vet-use-category-cell" style="padding: 6px 8px; font-size: 13px; color: #1a1f2e;">-</div></td>
                <td><div class="vet-use-unit-cell" style="padding: 6px 8px; font-size: 13px; color: #1a1f2e;">-</div></td>
                <td><input type="number" class="modal-input" placeholder="Qty" /></td>
                <td><input type="text" class="modal-input" placeholder="Prepared by" /></td>
                <td><input type="time" class="modal-input" /></td>
            `;
            tbody.appendChild(tr);

            tr.querySelector('.vet-use-item-select').addEventListener('change', (e) => {
                const option = e.target.options[e.target.selectedIndex];
                const category = option.getAttribute('data-category') || '-';
                const unit = option.getAttribute('data-unit') || '-';
                const row = e.target.closest('tr');
                row.querySelector('.vet-use-category-cell').textContent = category;
                row.querySelector('.vet-use-unit-cell').textContent = unit;
            });
        };

        const populateVetUseRowData = async () => {
            const tbody = document.getElementById('vet-use-tbody');
            if (!tbody) return;
            try {
                const buildingsRes = await fetch('/api/layer-buildings-reports/buildings/active', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const buildings = buildingsRes.ok ? await buildingsRes.json() : [];

                const inventoryRes = await fetch(API_BASE_VET_INVENTORY, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const inventory = inventoryRes.ok ? await inventoryRes.json() : [];

                tbody.innerHTML = '';
                if (!buildings.length && !inventory.length) {
                    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #999;">No data available</td></tr>';
                    return;
                }

                vetUseItemOptions = inventory.map(item => `<option value="${item.product_id}" data-category="${item.category}" data-unit="${item.unit}">${item.item}</option>`).join('');

                buildings.forEach(b => {
                    const tr = document.createElement('tr');
                    tr.dataset.buildingId = b.building_id || '';
                    tr.innerHTML = `
                        <td><div class="building-name-cell">${b.building_name}</div></td>
                        <td><select class="modal-input vet-use-item-select"><option value="">Select Item</option>${vetUseItemOptions}</select></td>
                        <td><div class="vet-use-category-cell" style="padding: 6px 8px; font-size: 13px; color: #1a1f2e;">-</div></td>
                        <td><div class="vet-use-unit-cell" style="padding: 6px 8px; font-size: 13px; color: #1a1f2e;">-</div></td>
                        <td><input type="number" class="modal-input" placeholder="Qty" /></td>
                        <td><input type="text" class="modal-input" placeholder="Prepared by" /></td>
                        <td><input type="time" class="modal-input" /></td>
                    `;
                    tbody.appendChild(tr);

                    tr.querySelector('.vet-use-item-select').addEventListener('change', (e) => {
                        const option = e.target.options[e.target.selectedIndex];
                        const category = option.getAttribute('data-category') || '-';
                        const unit = option.getAttribute('data-unit') || '-';
                        const row = e.target.closest('tr');
                        row.querySelector('.vet-use-category-cell').textContent = category;
                        row.querySelector('.vet-use-unit-cell').textContent = unit;
                    });
                });
            } catch (err) {
                console.error('Failed to load vet use row data', err);
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        };

        const addVetUseRowBtn = document.getElementById('add-vet-use-row-btn');
        if (addVetUseRowBtn) {
            addVetUseRowBtn.addEventListener('click', () => {
                createVetUseRow('', true);
            });
        }

        if (recordVetUseBtn && recordVetUseModal) {
            recordVetUseBtn.addEventListener('click', async () => {
                await populateVetUseRowData();
                try {
                    const idRes = await fetch('/api/vet-supplies-use/next-id', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    const idData = await idRes.json();
                    document.getElementById('vet-use-transaction-id').value = idData.use_id || 'VeSuUseID-1';
                } catch (err) {
                    document.getElementById('vet-use-transaction-id').value = 'VeSuUseID-1';
                }
                document.getElementById('vet-use-date').value = new Date().toISOString().split('T')[0];
                recordVetUseModal.classList.remove('hidden');
            });
        }

        const closeRecordVetUseModal = document.getElementById('close-record-vet-use-modal');
        if (closeRecordVetUseModal && recordVetUseModal) {
            closeRecordVetUseModal.addEventListener('click', () => {
                recordVetUseModal.classList.add('hidden');
            });
        }

        if (recordVetUseModal) {
            let mouseDownOnBackdrop = false;
            recordVetUseModal.addEventListener('mousedown', (e) => {
                mouseDownOnBackdrop = e.target === recordVetUseModal;
            });
            recordVetUseModal.addEventListener('mouseup', (e) => {
                if (mouseDownOnBackdrop && e.target === recordVetUseModal) {
                    recordVetUseModal.classList.add('hidden');
                }
                mouseDownOnBackdrop = false;
            });
        }

        const saveVetUseBtn = document.getElementById('save-vet-use-btn');
        if (saveVetUseBtn) {
            saveVetUseBtn.addEventListener('click', async () => {
                const tbody = document.getElementById('vet-use-tbody');
                if (!tbody) return;

                const date = document.getElementById('vet-use-date').value;
                if (!date) {
                    alert('Date is required');
                    return;
                }

                const rows = Array.from(tbody.querySelectorAll('tr'));
                const validRecords = [];
                for (const row of rows) {
                    const itemSelect = row.querySelector('.vet-use-item-select');
                    const productId = itemSelect ? itemSelect.value : '';
                    const itemText = itemSelect ? itemSelect.options[itemSelect.selectedIndex]?.textContent : '';
                    const qtyInput = row.querySelector('input[placeholder="Qty"]');
                    const preparedByInput = row.querySelector('input[placeholder="Prepared by"]');
                    const timeInput = row.querySelector('input[type="time"]');
                    const buildingCell = row.querySelector('.building-name-cell');
                    const buildingSelect = row.querySelector('.vet-use-building-select');

                    const building = buildingSelect ? buildingSelect.value : (buildingCell ? buildingCell.textContent.trim() : '');
                    const quantity = qtyInput ? parseFloat(qtyInput.value) || 0 : 0;
                    const preparedBy = preparedByInput ? preparedByInput.value.trim() : '';
                    const useTime = timeInput ? timeInput.value : '';

                    if (!productId || !itemText || itemText === 'Select Item' || quantity <= 0) {
                        continue;
                    }

                    const categoryCell = row.querySelector('.vet-use-category-cell');
                    const unitCell = row.querySelector('.vet-use-unit-cell');

                    validRecords.push({
                        date: date,
                        building: building,
                        product_id: productId,
                        item: itemText,
                        category: categoryCell ? categoryCell.textContent.trim() : '',
                        unit: unitCell ? unitCell.textContent.trim() : '',
                        quantity: quantity,
                        prepared_by: preparedBy,
                        use_time: useTime,
                        status: 'Pending'
                    });
                }

                if (validRecords.length === 0) {
                    alert('Please select at least one item with quantity');
                    return;
                }

                try {
                    const res = await fetch('/api/vet-supplies-use', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: JSON.stringify({ records: validRecords })
                    });

                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to save vet supplies use');
                    }

                    for (const record of validRecords) {
                        try {
                            await fetch(API_BASE_VET_INVENTORY + '/subtract', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                                },
                                body: JSON.stringify({ product_id: record.product_id, quantity: record.quantity })
                            });
                        } catch (invErr) {
                            console.error('Error subtracting inventory:', invErr);
                        }
                    }

                    alert('Vet supplies use recorded successfully');
                    document.getElementById('record-vet-use-modal').classList.add('hidden');
                    loadVetStocksAvailability();
                    loadVetUseTransactions();
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            });
        }

        loadVetTransactionsPage();
        loadVetStocksAvailability();
        loadVetUseTransactions();
    };

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'purchasing';
    const render = ModuleComponents[currentTab] || ModuleComponents['purchasing'];
    render(contentArea);
}
