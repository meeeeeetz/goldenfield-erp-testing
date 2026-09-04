if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['purchasing-feeds'] = (container) => {
        container.innerHTML = `
            <div class="feeds-layout">
                <div class="header-actions">
                    <h2>Feed Management</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="open-feed-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Order Feeds</span>
                    </button>
                    <button id="open-rebate-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Rebates</span>
                    </button>
                    <button id="open-repayment-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Pay Feeds</span>
                    </button>
                    <button id="record-feeds-use-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Record Feeds Use</span>
                    </button>
                    <button id="add-feeds-suppliers-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Feeds Suppliers</span>
                    </button>
                    <button id="add-feed-type-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Feed Type</span>
                    </button>
                    <button id="open-bulk-upload-modal" class="btn-icon-circle success">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Upload Feeds Admin</span>
                    </button>
                </div>
                <div class="tracking-cards-row">
                    <div class="card tracking-card">
                        <h3>Available Feeds</h3>
                        <p class="card-sub-label">Total available feeds in stock</p>
                        <div class="card-value-row">
                            <div class="card-value">15,340 Kgs</div>
                        </div>
                    </div>
                    <div class="card tracking-card">
                        <h3>Feeds Consumption</h3>
                        <p class="card-sub-label">This month</p>
                        <div class="card-value-row">
                            <div class="card-value">543,000 Kgs</div>
                        </div>
                    </div>
                    <div class="card tracking-card">
                        <h3>Outstanding Balance</h3>
                        <p class="card-sub-label">Pending payments</p>
                        <div class="card-value-row">
                            <div class="card-value" id="outstanding-balance-value">P 0.00</div>
                        </div>
                    </div>
                </div>
                <div class="bottom-cards-row">
                    <div class="card graph-placeholder feeds-inventory-card">
                        <h3>Feeds Inventory</h3>
                        <div class="feeds-inventory-list">
                            <div class="feeds-inventory-item">
                                <span class="feeds-inventory-label">Pre-Lay</span>
                                <span class="feeds-inventory-value" id="inventory-pre-lay">0 Kgs</span>
                            </div>
                            <div class="feeds-inventory-item">
                                <span class="feeds-inventory-label">Layer 1</span>
                                <span class="feeds-inventory-value" id="inventory-layer-1">0 Kgs</span>
                            </div>
                            <div class="feeds-inventory-item">
                                <span class="feeds-inventory-label">Layer 2</span>
                                <span class="feeds-inventory-value" id="inventory-layer-2">0 Kgs</span>
                            </div>
                        </div>
                    </div>
                    <div class="card graph-placeholder silo-chart-card">
                        <h3>Feeds Storage Level</h3>
                        <div class="silo-chart-wrap">
                            <div class="silo-y-axis">
                                <span>100%</span>
                                <span>75%</span>
                                <span>50%</span>
                                <span>25%</span>
                                <span>0%</span>
                            </div>
                            <div class="silo-bar-group">
                                <div class="silo-bar" style="height: 80%;"></div>
                                <div class="silo-x-label">Silo 1</div>
                            </div>
                            <div class="silo-bar-group">
                                <div class="silo-bar" style="height: 45%;"></div>
                                <div class="silo-x-label">Silo 2</div>
                            </div>
                            <div class="silo-bar-group">
                                <div class="silo-bar" style="height: 90%;"></div>
                                <div class="silo-x-label">Silo 3</div>
                            </div>
                            <div class="silo-bar-group">
                                <div class="silo-bar" style="height: 30%;"></div>
                                <div class="silo-x-label">Silo 4</div>
                            </div>
                            <div class="silo-bar-group">
                                <div class="silo-bar" style="height: 65%;"></div>
                                <div class="silo-x-label">Silo 5</div>
                            </div>
                        </div>
                    </div>
                    <div class="card graph-placeholder outstanding-chart-card">
                        <h3>Outstanding Balance Break down</h3>
                        <div class="outstanding-chart-wrap">
                            <svg viewBox="0 0 200 200" class="outstanding-donut-chart">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#e74c3c" stroke-width="30" stroke-dasharray="190.5 312.15" stroke-dashoffset="0" transform="rotate(-90 100 100)"></circle>
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#e67e22" stroke-width="30" stroke-dasharray="109.6 393.05" stroke-dashoffset="-190.5" transform="rotate(-90 100 100)"></circle>
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#2ecc71" stroke-width="30" stroke-dasharray="202.55 300.10" stroke-dashoffset="-300.1" transform="rotate(-90 100 100)"></circle>
                                <text x="100" y="96" text-anchor="middle" font-size="11" font-weight="700" fill="#1a1f2e">Total</text>
                                <text x="100" y="112" text-anchor="middle" font-size="12" font-weight="700" fill="#1a1f2e">P 1.58M</text>
                            </svg>
                            <div class="outstanding-legend">
                                <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#e74c3c"></span>Supplier 1</span>
                                <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#e67e22"></span>Supplier 2</span>
                                <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#2ecc71"></span>Supplier 3</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card graph-placeholder feeds-transaction-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%;">
                        <h3 style="margin: 0;">Feeds Transaction</h3>
                        <input type="text" id="feeds-transaction-search" placeholder="Search Supplier, Feed type, Invoice, Order ID..." style="margin-left: auto; padding: 8px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; width: 260px; box-sizing: border-box;">
                    </div>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th class="sortable" data-sort="order_id">Order ID <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="date">Date <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="due_date">Due Date <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="company_name">Supplier <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="sales_invoice">Invoice <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="feed_type">Feed Type <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="quantity">Quantity <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="unit">Unit <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="price">Price <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="total_price">Total Price <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="status">Status <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="rebate_status">Rebate Status <span class="sort-arrow">&#8645;</span></th>
                                    <th>Photo</th>
                                    <th class="sortable" data-sort="payment_date">Payment Date <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="payment_source">Payment Source <span class="sort-arrow">&#8645;</span></th>
                                    <th>Bank Account</th>
                                    <th class="sortable" data-sort="check_number">Check Number <span class="sort-arrow">&#8645;</span></th>
                                </tr>
                            </thead>
                            <tbody id="feeds-transaction-table-body">
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="17" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="feeds-transaction-pagination">
                        <button class="page-btn" id="feeds-transaction-prev-btn">&laquo; Prev</button>
                        <button class="page-btn active" id="feeds-transaction-page-1">1</button>
                        <button class="page-btn" id="feeds-transaction-next-btn">Next &raquo;</button>
                    </div>
                </div>
                <div class="card graph-placeholder feeds-transaction-repayment-card">
                    <h3>Feeds Transaction Repayment</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th class="sortable" data-sort="repayment_id">Feeds Repayment <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="order_id">Order ID <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="created_at">Repayment Date <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="sales_invoice">Invoice Numbers <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="check_number">Check Number <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="total">Amount <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="status">Status <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="bank_source">Paid by <span class="sort-arrow">&#8645;</span></th>
                                </tr>
                            </thead>
                            <tbody id="feeds-repayment-table-body">
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="feeds-repayment-pagination">
                        <button class="page-btn" id="feeds-repayment-prev-btn">&laquo; Prev</button>
                        <button class="page-btn active" id="feeds-repayment-page-1">1</button>
                        <button class="page-btn" id="feeds-repayment-next-btn">Next &raquo;</button>
                    </div>
                </div>
                <div class="bottom-cards-row">
                    <div class="card graph-placeholder feeds-suppliers-card">
                        <h3>Feeds Suppliers</h3>
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
                                <tbody id="feeds-suppliers-table-body">
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                    <tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination" id="feeds-suppliers-pagination">
                            <button class="page-btn" id="feeds-suppliers-prev-btn">&laquo; Prev</button>
                            <button class="page-btn active" id="feeds-suppliers-page-1">1</button>
                            <button class="page-btn" id="feeds-suppliers-next-btn">Next &raquo;</button>
                        </div>
                    </div>
                    <div class="card graph-placeholder feeds-type-card">
                        <h3>Feeds Type</h3>
                        <div class="table-wrap">
                            <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Feeds ID</th>
                                    <th>Supplier ID</th>
                                    <th>Feeds Type</th>
                                    <th>Remarks</th>
                                    <th>Unit</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="feed-types-table-body">
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="8" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                            </tbody>
                            </table>
                        </div>
                        <div class="pagination" id="feed-types-pagination">
                            <button class="page-btn" id="feed-types-prev-btn">&laquo; Prev</button>
                            <button class="page-btn active" id="feed-types-page-1">1</button>
                            <button class="page-btn" id="feed-types-next-btn">Next &raquo;</button>
                        </div>
                    </div>
                </div>
                <div id="feed-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Order Feeds</h3>
                            <button class="modal-close-btn" id="close-feed-modal">&times;</button>
                        </div>
                        <div class="modal-field">
                            <label>Order ID</label>
                            <input type="text" id="order-id" readonly />
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Date</label>
                                <input type="date" id="order-date" />
                            </div>
                            <div class="modal-field">
                                <label>Due Date</label>
                                <input type="text" id="order-due-date" readonly />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Supplier</label>
                                <select id="order-supplier" class="modal-select">
                                    <option value="">Select Supplier</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label>Sales Invoice</label>
                                <input type="text" id="order-sales-invoice" placeholder="Enter sales invoice" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Feed Type</label>
                                <select id="order-feed-type" class="modal-select">
                                    <option value="">Select Feed Type</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label>Quantity</label>
                                <input type="number" id="order-quantity" placeholder="Enter quantity" min="0" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Unit</label>
                                <input type="text" id="order-unit" readonly />
                            </div>
                            <div class="modal-field">
                                <label>Feed Type Price</label>
                                <input type="text" id="order-feed-price" readonly />
                            </div>
                        </div>
                        <div class="modal-field">
                            <label>Total Price</label>
                            <input type="text" id="order-total-price" readonly />
                        </div>
                        <div class="modal-field">
                            <label>Feed Receipt</label>
                            <div id="order-receipt-upload-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; cursor: pointer; background: #f8fafc; transition: border-color 0.2s, background 0.2s; position: relative;">
                                <div class="upload-zone-content" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                    <div class="upload-placeholder" style="color: #64748b; font-size: 14px;">
                                        <span>Drag & Drop or Click to Upload (JPG only, max 5MB, auto-compressed to under 1MB)</span>
                                    </div>
                                    <div class="upload-preview" style="display:none; flex-direction: column; align-items: center; gap: 8px; position: relative;">
                                        <img src="" alt="preview" style="max-width: 200px; max-height: 200px; object-fit: contain; border-radius: 4px; border: 1px solid #e2e8f0;">
                                        <button type="button" class="remove-upload-btn" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
                                    </div>
                                </div>
                                <input type="file" accept="image/jpeg,image/jpg" style="display:none">
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-feed-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>

                <div id="photo-upload-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 600px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Upload Photo</h3>
                            <button class="modal-close-btn" id="close-photo-upload-modal">&times;</button>
                        </div>
                        <div id="photo-upload-drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 40px 20px; text-align: center; background: #f8fafc; transition: border-color 0.2s, background 0.2s; cursor: pointer;">
                            <div class="upload-zone-content" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                <div class="upload-placeholder" style="color: #64748b; font-size: 14px;">
                                    <span>Drag & Drop or Click to Upload (JPG only, max 5MB, auto-compressed to under 1MB)</span>
                                </div>
                                <div class="upload-preview" style="display:none; flex-direction: column; align-items: center; gap: 8px; position: relative;">
                                    <img src="" alt="preview" style="max-width: 200px; max-height: 200px; object-fit: contain; border-radius: 4px; border: 1px solid #e2e8f0;">
                                    <button type="button" class="remove-upload-btn" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
                                </div>
                            </div>
                            <input type="file" id="photo-upload-file-input" accept="image/jpeg,image/jpg" style="display:none">
                        </div>
                        <div class="modal-tab-actions" style="margin-top: 16px; justify-content: flex-end;">
                            <button id="save-photo-upload-btn" class="btn-primary">Save</button>
                            <button id="remove-photo-upload-btn" class="btn-danger">Remove Photo</button>
                        </div>
                    </div>
                </div>

                <div id="repayment-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 1000px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Feeds Repayment</h3>
                            <button class="modal-close-btn" id="close-repayment-modal">&times;</button>
                        </div>
                        <div class="modal-field">
                            <label>Feeds Repayment ID</label>
                            <input type="text" id="repayment-id" readonly />
                        </div>
                        <div class="modal-field">
                            <label>Select Pending Feed</label>
                            <div style="display: flex; gap: 8px; align-items: flex-end;">
                                <select id="repayment-search" class="modal-select" style="flex: 1;">
                                    <option value="">-- Select Pending Feed --</option>
                                </select>
                                <button id="repayment-select-all-btn" class="btn-primary" style="padding: 8px 12px; font-size: 13px; white-space: nowrap;">Select All</button>
                            </div>
                        </div>
                        <div class="table-wrap" style="max-height: 250px; overflow-y: auto; border: 1px solid #D6D6D6; border-radius: 6px;">
                            <table class="data-table product-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Supplier</th>
                                        <th>Invoice</th>
                                        <th>Feed Type</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody id="repayment-search-results">
                                    <tr class="empty-row"><td colspan="6" style="height: 48px; background: #fff;">&nbsp;</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="display: flex; justify-content: flex-end; padding: 8px 0; font-weight: 600; font-size: 15px;">
                            <span style="margin-right: 12px;">Grand Total:</span>
                            <span id="repayment-grand-total">P 0.00</span>
                        </div>
                        <div class="modal-meta-row" style="margin-top: 15px;">
                            <div class="modal-field">
                                <label>Bank Source</label>
                                <select id="repayment-bank-source" class="modal-select">
                                    <option value="">-- Select Bank --</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label>Check Number</label>
                                <input type="text" id="repayment-check-number" placeholder="Enter check number" />
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-repayment-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>

                <div id="rebate-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 1000px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Rebates</h3>
                            <button class="modal-close-btn" id="close-rebate-modal">&times;</button>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Date</label>
                                <input type="date" id="rebate-date-input" />
                            </div>
                            <div class="modal-field">
                                <label>Rebate Price</label>
                                <input type="number" id="rebate-price-input" placeholder="Enter rebate price" step="0.01" min="0" />
                            </div>
                            <div class="modal-field">
                                <label>Select Order Feed</label>
                                <select id="rebate-search" class="modal-select">
                                    <option value="">-- Select Order Feed --</option>
                                </select>
                            </div>
                        </div>
                        <div class="table-wrap" style="max-height: 250px; overflow-y: auto; border: 1px solid #D6D6D6; border-radius: 6px;">
                            <table class="data-table product-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Supplier</th>
                                        <th>Invoice</th>
                                        <th>Quantity</th>
                                        <th>Rebate</th>
                                    </tr>
                                </thead>
                                <tbody id="rebate-search-results">
                                    <tr class="empty-row"><td colspan="5" style="height: 48px; background: #fff;">&nbsp;</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="display: flex; justify-content: flex-end; padding: 8px 0; font-weight: 600; font-size: 15px;">
                            <span style="margin-right: 12px;">Grand Total:</span>
                            <span id="rebate-grand-total">P 0.00</span>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-rebate-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>

                <div id="feeds-suppliers-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Feeds Suppliers Management</h3>
                            <button class="modal-close-btn" id="close-feeds-suppliers-modal">&times;</button>
                        </div>
                        <div class="modal-tabs">
                            <button class="modal-tab active" id="tab-create-supplier" onclick="switchSupplierTab('create')">Create New Supplier</button>
                            <button class="modal-tab" id="tab-edit-supplier" onclick="switchSupplierTab('edit')">Edit Supplier</button>
                        </div>
                        <div id="panel-create-supplier" class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Feeds Suppliers ID</label>
                                <input type="text" id="create-supplier-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company Name</label>
                                    <input type="text" id="create-company-name" placeholder="Enter company name" />
                                </div>
                                <div class="modal-field">
                                    <label>Address</label>
                                    <input type="text" id="create-address" placeholder="Enter address" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>TIN Number</label>
                                    <input type="text" id="create-tin-number" placeholder="TIN Number" maxlength="20" />
                                </div>
                                <div class="modal-field">
                                    <label>Contact Person</label>
                                    <input type="text" id="create-contact-person" placeholder="Enter contact person" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Contact Number</label>
                                    <input type="text" id="create-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="create-supplier-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-create-supplier-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                        <div id="panel-edit-supplier" class="modal-tab-panel" style="display: none;">
                            <div class="modal-field">
                                <label>Search Supplier</label>
                                <div style="position: relative;">
                                    <input type="text" id="edit-supplier-search" placeholder="Search by company name..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                                    <div id="edit-supplier-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                                </div>
                            </div>
                            <div class="modal-field">
                                <label>Feeds Suppliers ID</label>
                                <input type="text" id="edit-supplier-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company Name</label>
                                    <input type="text" id="edit-company-name" placeholder="Enter company name" />
                                </div>
                                <div class="modal-field">
                                    <label>Address</label>
                                    <input type="text" id="edit-address" placeholder="Enter address" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>TIN Number</label>
                                    <input type="text" id="edit-tin-number" placeholder="TIN Number" maxlength="20" />
                                </div>
                                <div class="modal-field">
                                    <label>Contact Person</label>
                                    <input type="text" id="edit-contact-person" placeholder="Enter contact person" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Contact Number</label>
                                    <input type="text" id="edit-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="edit-supplier-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-edit-supplier-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="feed-type-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 900px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Feed Type Management</h3>
                            <button class="modal-close-btn" id="close-feed-type-modal">&times;</button>
                        </div>
                        <div class="modal-tabs">
                            <button class="modal-tab active" id="tab-create-feed-type" onclick="switchFeedTypeTab('create')">Create New Feed Type</button>
                            <button class="modal-tab" id="tab-edit-feed-type" onclick="switchFeedTypeTab('edit')">Edit Feed Type</button>
                        </div>
                        <div id="panel-create-feed-type" class="modal-tab-panel" style="display: block;">
                            <div class="modal-field">
                                <label>Feed Type ID</label>
                                <input type="text" id="create-feed-type-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company</label>
                                    <select id="create-feed-type-company" class="modal-select">
                                        <option value="">Select Supplier</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Feed Type</label>
                                    <input type="text" id="create-feed-type-name" placeholder="Enter feed type" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Unit</label>
                                    <select id="create-feed-type-unit" class="modal-select">
                                        <option value="">Select Unit</option>
                                        <option value="Sack">Sack</option>
                                        <option value="Kilos">Kilos</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Category</label>
                                    <select id="create-feed-type-category" class="modal-select">
                                        <option value="">Select Category</option>
                                        <option value="Pre-Lay">Pre-Lay</option>
                                        <option value="Layer 1">Layer 1</option>
                                        <option value="Layer 2">Layer 2</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Price</label>
                                    <input type="text" id="create-feed-type-price" placeholder="0.00" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Remarks</label>
                                    <textarea id="create-feed-type-remarks" placeholder="Enter remarks" rows="3" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; resize: vertical;"></textarea>
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="create-feed-type-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-create-feed-type-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                        <div id="panel-edit-feed-type" class="modal-tab-panel" style="display: none;">
                            <div class="modal-field">
                                <label>Search Feed Type</label>
                                <div style="position: relative;">
                                    <input type="text" id="edit-feed-type-search" placeholder="Search by feed type name..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                                    <div id="edit-feed-type-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                                </div>
                            </div>
                            <div class="modal-field">
                                <label>Feed Type ID</label>
                                <input type="text" id="edit-feed-type-id" readonly />
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Company</label>
                                    <select id="edit-feed-type-company" class="modal-select">
                                        <option value="">Select Supplier</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Feed Type</label>
                                    <input type="text" id="edit-feed-type-name" placeholder="Enter feed type" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Unit</label>
                                    <select id="edit-feed-type-unit" class="modal-select">
                                        <option value="">Select Unit</option>
                                        <option value="Sack">Sack</option>
                                        <option value="Kilos">Kilos</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Category</label>
                                    <select id="edit-feed-type-category" class="modal-select">
                                        <option value="">Select Category</option>
                                        <option value="Pre-Lay">Pre-Lay</option>
                                        <option value="Layer 1">Layer 1</option>
                                        <option value="Layer 2">Layer 2</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label>Price</label>
                                    <input type="text" id="edit-feed-type-price" placeholder="0.00" />
                                </div>
                            </div>
                            <div class="modal-meta-row">
                                <div class="modal-field">
                                    <label>Remarks</label>
                                    <textarea id="edit-feed-type-remarks" placeholder="Enter remarks" rows="3" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; resize: vertical;"></textarea>
                                </div>
                                <div class="modal-field">
                                    <label>Status</label>
                                    <select id="edit-feed-type-status" class="modal-select">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-edit-feed-type-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="bulk-upload-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 1100px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Bulk Upload for Feeds management</h3>
                            <button class="modal-close-btn" id="close-bulk-upload-modal">&times;</button>
                        </div>
                        <div style="display: flex; gap: 16px; align-items: stretch;">
                            <div style="flex: 1; min-width: 0;">
                                <div id="bulk-upload-drop-zone" style="border: 2px dashed #D6D6D6; border-radius: 8px; padding: 40px 20px; text-align: center; background: #fafafa; transition: border-color 0.2s, background 0.2s; cursor: pointer;">
                                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                    <p style="margin-top: 12px; color: #555; font-weight: 600;">Drag and drop Excel or CSV file here</p>
                                    <p style="margin-top: 6px; color: #888; font-size: 13px;">or click to browse</p>
                                    <input type="file" id="bulk-upload-file-input" accept=".xlsx,.xls,.csv" style="display: none;" />
                                </div>
                                <div style="margin-top: 16px; display: flex; gap: 10px; justify-content: flex-end;">
                                    <button id="download-template-btn" class="btn-primary">Download Template</button>
                                    <button id="save-bulk-upload-btn" class="btn-success">Save</button>
                                </div>
                            </div>
                            <div style="flex: 1; min-width: 0; border: 1px solid #D6D6D6; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
                                <div style="background: #f5f5f5; padding: 10px 14px; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1a1f2e;">File Preview</div>
                                <div id="bulk-upload-preview" style="padding: 14px; overflow: auto; max-height: 400px; flex: 1; background: #fff;">
                                    <p style="color: #999; text-align: center; margin-top: 40px;">No file selected</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            <div id="record-feeds-use-modal" class="modal hidden">
                <div class="modal-content" style="max-width: 900px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Recording of Feeds Consumed</h3>
                        <button class="modal-close-btn" id="close-record-feeds-use-modal">&times;</button>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Feeds Recording Transaction</label>
                            <input type="text" id="feeds-use-transaction-id" value="FeUseID-1" readonly style="background: #f1f5f9;" />
                        </div>
                        <div class="modal-field">
                            <label>Date</label>
                            <input type="date" id="feeds-use-date" />
                        </div>
                    </div>
                    <div class="table-wrap" style="max-height: 350px; overflow-y: auto; border: 1px solid #D6D6D6; border-radius: 6px; margin-top: 12px;">
                        <table class="data-table product-table" style="border-spacing: 0 4px; border-collapse: separate;">
                            <thead>
                                <tr>
                                    <th style="padding: 6px 8px;">Building</th>
                                    <th style="padding: 6px 8px;">Feeds Category</th>
                                    <th style="padding: 6px 8px;">Unit</th>
                                    <th style="padding: 6px 8px;">Quantity</th>
                                    <th style="padding: 6px 8px;">Driver</th>
                                    <th style="padding: 6px 8px;">Time</th>
                                </tr>
                            </thead>
                            <tbody id="feeds-use-tbody">
                            </tbody>
                        </table>
                        <style>
                            #feeds-use-tbody td { padding: 0 !important; }
                            #feeds-use-tbody .modal-select,
                            #feeds-use-tbody .modal-input { width: 100%; border-radius: 0; border: 1px solid #D6D6D6; padding: 6px 8px; font-size: 13px; box-sizing: border-box; }
                            #feeds-use-tbody .building-select { width: 100%; border-radius: 0; border: 1px solid #D6D6D6; padding: 6px 8px; font-size: 13px; box-sizing: border-box; }
                            #feeds-use-tbody .building-name-cell { padding: 6px 8px; font-size: 13px; color: #1a1f2e; font-weight: 500; }
                            #feeds-use-tbody .feeds-type-select { width: 100%; border-radius: 0; border: 1px solid #D6D6D6; padding: 6px 8px; font-size: 13px; box-sizing: border-box; }
                        </style>
                    </div>
                    <div class="modal-tab-actions" style="margin-top: 16px;">
                        <button id="save-feeds-use-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;

        document.getElementById('open-feed-modal').onclick = async () => {
            const modal = document.getElementById('feed-modal');
            if (!modal) return;

            document.getElementById('order-date').value = '';
            document.getElementById('order-due-date').value = '';
            document.getElementById('order-supplier').innerHTML = '<option value="">Select Supplier</option>';
            document.getElementById('order-sales-invoice').value = '';
            document.getElementById('order-feed-type').innerHTML = '<option value="">Select Feed Type</option>';
            document.getElementById('order-quantity').value = '';
            document.getElementById('order-unit').value = '';
            document.getElementById('order-feed-price').value = '';
            document.getElementById('order-total-price').value = '';

            modal.classList.remove('hidden');

            try {
                const idRes = await fetch(API_BASE_ORDER_FEEDS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('order-id').value = idData.order_id || 'OrFeID-1';
            } catch (err) {
                document.getElementById('order-id').value = 'OrFeID-1';
            }

            try {
                const supRes = await fetch(API_BASE_FEEDS_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (supRes.ok) {
                    const suppliers = await supRes.json();
                    const supplierSelect = document.getElementById('order-supplier');
                    suppliers.forEach(s => {
                        const option = document.createElement('option');
                        option.value = s.supplier_id;
                        option.textContent = s.company_name;
                        supplierSelect.appendChild(option);
                    });
                }

                const ftRes = await fetch(API_BASE_FEED_TYPES, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (ftRes.ok) {
                    const feedTypes = await ftRes.json();
                    const feedTypeSelect = document.getElementById('order-feed-type');
                    feedTypes.filter(ft => ft.status === 'Active').forEach(ft => {
                        const option = document.createElement('option');
                        option.value = ft.feed_type_id;
                        option.textContent = ft.remarks ? `${ft.feed_type} - ${ft.remarks}` : ft.feed_type;
                        option.dataset.unit = ft.unit || '';
                        option.dataset.price = ft.price || '0';
                        feedTypeSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load order data', err);
            }
        };

        document.getElementById('close-feed-modal').onclick = () => {
            document.getElementById('feed-modal').classList.add('hidden');
        };

        document.getElementById('open-repayment-modal').onclick = async () => {
            const modal = document.getElementById('repayment-modal');
            if (!modal) return;

            document.getElementById('repayment-bank-source').value = '';
            document.getElementById('repayment-check-number').value = '';
            const bankSelect = document.getElementById('repayment-bank-source');
            bankSelect.innerHTML = '<option value="">-- Select Bank --</option>';

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
                        const masked = maskAccountNumber(bank.bank_account_number);
                        option.textContent = `${bank.bank_code || bank.bank} (${masked})`;
                        bankSelect.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load banks', err);
            }

            const tbody = document.getElementById('repayment-search-results');
            if (tbody) {
                tbody.innerHTML = '<tr class="empty-row"><td colspan="6" style="height: 48px; background: #fff;">&nbsp;</td></tr>';
            }
            updateRepaymentGrandTotal();

            const select = document.getElementById('repayment-search');
            select.innerHTML = '<option value="">-- Select Pending Feed --</option>';

            try {
                const idRes = await fetch('/api/order-feeds-repayment/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (idRes.ok) {
                    const { repayment_id } = await idRes.json();
                    document.getElementById('repayment-id').value = repayment_id;
                } else {
                    document.getElementById('repayment-id').value = 'ReOrFeID-1';
                }
            } catch (err) {
                document.getElementById('repayment-id').value = 'ReOrFeID-1';
            }

            try {
                const res = await fetch(API_BASE_ORDER_FEEDS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const orders = await res.json();
                    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Rebate');
                    pendingOrders.forEach(order => {
                        const option = document.createElement('option');
                        option.value = order.order_id;
                        option.dataset.orderId = order.order_id || '';
                        option.dataset.supplier = order.company_name || '';
                        option.dataset.invoice = order.sales_invoice || '';
                        option.dataset.feedType = order.feed_type || '';
                        option.dataset.quantity = order.quantity || '';
                        option.dataset.totalPrice = order.total_price || '';
                        option.textContent = `${order.order_id} - ${order.company_name || 'Unknown'} [${order.rebate_status || 'Unclaimed'}]`;
                        select.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load pending feeds', err);
            }

            modal.classList.remove('hidden');
        };

        document.getElementById('repayment-search').addEventListener('change', (e) => {
            const selected = e.target.selectedOptions[0];
            const tbody = document.getElementById('repayment-search-results');
            if (!tbody || !selected || !selected.value) return;

            const existingRows = Array.from(tbody.querySelectorAll('tr:not(.empty-row)'));
            const alreadyAdded = existingRows.some(row => {
                const firstCell = row.querySelector('td');
                return firstCell && firstCell.textContent.trim() === selected.value;
            });

            if (alreadyAdded) {
                alert('This feed has already been chosen');
                e.target.value = '';
                return;
            }

            if (existingRows.length === 0) {
                tbody.innerHTML = '';
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${selected.dataset.orderId || selected.value}</td>
                <td>${selected.dataset.supplier || '-'}</td>
                <td>${selected.dataset.invoice || '-'}</td>
                <td>${selected.dataset.feedType || '-'}</td>
                <td>${formatNumber(parseFloat(selected.dataset.quantity))}</td>
                <td>P ${formatNumber(parseFloat(selected.dataset.totalPrice || 0))}</td>
            `;
            tbody.appendChild(row);

            updateRepaymentGrandTotal();

            e.target.value = '';
        });

        document.getElementById('repayment-select-all-btn').addEventListener('click', () => {
            const select = document.getElementById('repayment-search');
            const tbody = document.getElementById('repayment-search-results');
            if (!select || !tbody) return;

            const options = Array.from(select.querySelectorAll('option')).filter(opt => opt.value);
            if (options.length === 0) {
                alert('No feeds available to select');
                return;
            }

            tbody.innerHTML = '';

            options.forEach(option => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${option.dataset.orderId || option.value}</td>
                    <td>${option.dataset.supplier || '-'}</td>
                    <td>${option.dataset.invoice || '-'}</td>
                    <td>${option.dataset.feedType || '-'}</td>
                    <td>${formatNumber(parseFloat(option.dataset.quantity))}</td>
                    <td>P ${formatNumber(parseFloat(option.dataset.totalPrice || 0))}</td>
                `;
                tbody.appendChild(row);
            });

            updateRepaymentGrandTotal();
        });

        function updateRepaymentGrandTotal() {
            const tbody = document.getElementById('repayment-search-results');
            const grandTotalEl = document.getElementById('repayment-grand-total');
            if (!tbody || !grandTotalEl) return;

            let total = 0;
            const rows = tbody.querySelectorAll('tr:not(.empty-row)');
            rows.forEach(row => {
                const lastCell = row.querySelector('td:last-child');
                if (lastCell) {
                    const text = lastCell.textContent.replace('P ', '').replace(',', '');
                    const num = parseFloat(text);
                    if (!isNaN(num)) total += num;
                }
            });

            grandTotalEl.textContent = 'P ' + formatNumber(total);
        }

        document.getElementById('close-repayment-modal').onclick = () => {
            document.getElementById('repayment-modal').classList.add('hidden');
        };

        document.getElementById('save-repayment-btn').onclick = async () => {
            const tbody = document.getElementById('repayment-search-results');
            const rows = tbody.querySelectorAll('tr:not(.empty-row)');
            if (rows.length === 0) {
                alert('No feeds selected for repayment');
                return;
            }

            const bankSource = document.getElementById('repayment-bank-source').value;
            const checkNumber = document.getElementById('repayment-check-number').value;

            try {
                const idRes = await fetch('/api/order-feeds-repayment/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!idRes.ok) throw new Error('Failed to get repayment ID');
                const { repayment_id } = await idRes.json();

                const promises = Array.from(rows).map(async (row) => {
                    const cells = row.querySelectorAll('td');
                    const orderId = cells[0].textContent.trim();
                    const totalText = cells[5].textContent.replace('P ', '').replace(',', '');
                    const total = parseFloat(totalText);

                    const res = await fetch('/api/order-feeds-repayment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: JSON.stringify({
                            repayment_id,
                            order_id: orderId,
                            bank_source: bankSource,
                            check_number: checkNumber,
                            total
                        })
                    });

                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to save repayment');
                    }

                    return res.json();
                });

                await Promise.all(promises);

                const orderIds = Array.from(rows).map(row => {
                    const cells = row.querySelectorAll('td');
                    return cells[0].textContent.trim();
                });

                await fetch(API_BASE_ORDER_FEEDS + '/settle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({ order_ids: orderIds })
                });

                const today = new Date().toISOString().split('T')[0];
                const expenseUpdatePromises = orderIds.map(orderId =>
                    fetch(`/api/expenses/by-tracking-id/${encodeURIComponent(orderId)}`, {
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
                    }).then(res => {
                        if (!res.ok) return res.json().catch(() => ({}));
                        return res.json();
                    }).catch(err => {
                        console.error('Failed to update expense for', orderId, err);
                        return null;
                    })
                );

                await Promise.all(expenseUpdatePromises);

                document.getElementById('repayment-modal').classList.add('hidden');
                await loadFeedsTransactionTable();
                await loadFeedsRepaymentTable();
                await loadOutstandingBalance();
                await loadFeedInventorySummary();
                alert('Repayment saved successfully');
            } catch (err) {
                console.error('Failed to save repayment', err);
                alert(err.message || 'Failed to save repayment');
            }
        };

        function maskAccountNumber(accountNumber) {
            if (!accountNumber || accountNumber.length < 6) return accountNumber || '';
            const first2 = accountNumber.slice(0, 2);
            const last3 = accountNumber.slice(-3);
            const stars = '*'.repeat(accountNumber.length - 5);
            return `${first2}${stars}${last3}`;
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

        function formatDate(dateStr) {
            if (!dateStr) return '-';
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr || '-';
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        document.getElementById('open-rebate-modal').onclick = async () => {
            const modal = document.getElementById('rebate-modal');
            if (!modal) return;

            document.getElementById('rebate-price-input').value = '';
            const tbody = document.getElementById('rebate-search-results');
            if (tbody) {
                tbody.innerHTML = '<tr class="empty-row"><td colspan="5" style="height: 48px; background: #fff;">&nbsp;</td></tr>';
            }
            updateRebateGrandTotal();

            const select = document.getElementById('rebate-search');
            select.innerHTML = '<option value="">-- Select Order Feed --</option>';

            const dateInput = document.getElementById('rebate-date-input');
            if (dateInput) {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                dateInput.value = `${year}-${month}-${day}`;
            }

            try {
                const res = await fetch(API_BASE_ORDER_FEEDS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const orders = await res.json();
                    const unclaimedOrders = orders.filter(o => o.rebate_status === 'Unclaimed');
                    unclaimedOrders.forEach(order => {
                        const option = document.createElement('option');
                        option.value = order.order_id;
                        option.dataset.orderId = order.order_id || '';
                        option.dataset.supplier = order.company_name || '';
                        option.dataset.invoice = order.sales_invoice || '';
                        option.dataset.quantity = order.quantity || '';
                        option.dataset.price = order.price || '';
                        option.textContent = `${order.order_id} - ${order.company_name || 'Unknown'}`;
                        select.appendChild(option);
                    });
                }
            } catch (err) {
                console.error('Failed to load unclaimed order feeds', err);
            }

            modal.classList.remove('hidden');
        };

        document.getElementById('rebate-search').addEventListener('change', (e) => {
            const selected = e.target.selectedOptions[0];
            const tbody = document.getElementById('rebate-search-results');
            if (!tbody || !selected || !selected.value) return;

            const existingRows = Array.from(tbody.querySelectorAll('tr:not(.empty-row)'));
            const alreadyAdded = existingRows.some(row => {
                const firstCell = row.querySelector('td');
                return firstCell && firstCell.textContent.trim() === selected.value;
            });

            if (alreadyAdded) {
                alert('This order feed has already been chosen');
                e.target.value = '';
                return;
            }

            if (existingRows.length === 0) {
                tbody.innerHTML = '';
            }

            const rebatePrice = parseFloat(document.getElementById('rebate-price-input').value) || 0;
            const quantity = parseFloat(selected.dataset.quantity) || 0;
            const rebateTotal = -(rebatePrice * quantity);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${selected.dataset.orderId || selected.value}</td>
                <td>${selected.dataset.supplier || '-'}</td>
                <td>${selected.dataset.invoice || '-'}</td>
                <td>${formatNumber(quantity)}</td>
                <td>P ${formatNumber(rebateTotal)}</td>
            `;
            tbody.appendChild(row);

            updateRebateGrandTotal();

            e.target.value = '';
        });

        function updateRebateGrandTotal() {
            const tbody = document.getElementById('rebate-search-results');
            const grandTotalEl = document.getElementById('rebate-grand-total');
            if (!tbody || !grandTotalEl) return;

            let total = 0;
            const rows = tbody.querySelectorAll('tr:not(.empty-row)');
            rows.forEach(row => {
                const rebateCell = row.querySelector('td:nth-child(5)');
                if (rebateCell) {
                    const text = rebateCell.textContent.replace('P ', '').replace(',', '');
                    const num = parseFloat(text);
                    if (!isNaN(num)) total += num;
                }
            });

            grandTotalEl.textContent = 'P ' + formatNumber(total);
        }

        document.getElementById('rebate-price-input').addEventListener('input', () => {
            const tbody = document.getElementById('rebate-search-results');
            if (!tbody) return;

            const rebatePrice = parseFloat(document.getElementById('rebate-price-input').value) || 0;
            const rows = tbody.querySelectorAll('tr:not(.empty-row)');
            rows.forEach(row => {
                const quantityCell = row.querySelector('td:nth-child(4)');
                const rebateCell = row.querySelector('td:nth-child(5)');
                if (quantityCell && rebateCell) {
                    const quantity = parseFloat(quantityCell.textContent.replace(/,/g, '')) || 0;
                    const rebateTotal = -(rebatePrice * quantity);
                    rebateCell.textContent = 'P ' + formatNumber(rebateTotal);
                }
            });

            updateRebateGrandTotal();
        });

        document.getElementById('close-rebate-modal').onclick = () => {
            document.getElementById('rebate-modal').classList.add('hidden');
        };

        document.getElementById('save-rebate-btn').onclick = async () => {
            const tbody = document.getElementById('rebate-search-results');
            const rows = tbody.querySelectorAll('tr:not(.empty-row)');
            if (rows.length === 0) {
                alert('No order feeds selected');
                return;
            }

            const orderIds = Array.from(rows).map(row => {
                const firstCell = row.querySelector('td');
                return firstCell ? firstCell.textContent.trim() : null;
            }).filter(Boolean);

            const grandTotalText = document.getElementById('rebate-grand-total').textContent.replace('P ', '').replace(/,/g, '');
            const rebateTotal = parseFloat(grandTotalText);

            if (isNaN(rebateTotal)) {
                alert('Invalid rebate total');
                return;
            }

            const confirmMessage = `Are you sure you want to claim rebates for ${rows.length} order feed(s)?\n\nGrand Total: P ${formatNumber(rebateTotal)}`;
            if (!confirm(confirmMessage)) {
                return;
            }

            try {
                const rebatePriceValue = parseFloat(document.getElementById('rebate-price-input').value) || 0;
                const res = await fetch(API_BASE_ORDER_FEEDS + '/claim-rebates', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({ order_ids: orderIds, rebate_total: rebateTotal, rebate_price: rebatePriceValue })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save rebates');
                }

                const claimResult = await res.json();
                const newOrderId = claimResult.order_id || orderIds[0];

                const rebateDate = document.getElementById('rebate-date-input').value || '';

                const invoiceList = Array.from(rows).map(row => {
                    const cells = row.querySelectorAll('td');
                    return cells.length > 2 ? cells[2].textContent.trim() : '';
                }).filter(Boolean).join(', ');

                try {
                    const expenseNextRes = await fetch('/api/expenses/next-id', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (expenseNextRes.ok) {
                        const expenseNextData = await expenseNextRes.json();
                        const expenseListId = expenseNextData.expense_list_id;

                        const expenseRes = await fetch('/api/expenses', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                            },
                            body: JSON.stringify({
                                expense_list_id: expenseListId,
                                date: rebateDate || (function() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); })(),
                                accounting_code: '5110',
                                expense_type: 'Direct Raw Materials & Feed',
                                description: `Rebates of ${rebatePriceValue}`,
                                remarks: invoiceList,
                                total_amount: rebateTotal,
                                account_source: null,
                                cleared_date: null,
                                status: 'Pending',
                                tracking_id: newOrderId
                            })
                        });

                        if (!expenseRes.ok) {
                            const errData = await expenseRes.json().catch(() => ({}));
                            console.error('Failed to create expense:', errData);
                        }
                    }
                } catch (expenseErr) {
                    console.error('Error creating expense:', expenseErr);
                }

                document.getElementById('rebate-modal').classList.add('hidden');
                await loadFeedsTransactionTable();
                await loadOutstandingBalance();
                await loadFeedInventorySummary();
            } catch (err) {
                console.error('Failed to save rebates', err);
                alert(err.message || 'Failed to save rebates');
            }
        };

        document.getElementById('order-date').addEventListener('change', (e) => {
            const dateVal = e.target.value;
            if (dateVal) {
                const due = new Date(dateVal);
                due.setDate(due.getDate() + 7);
                const dueYear = due.getFullYear();
                const dueMonth = String(due.getMonth() + 1).padStart(2, '0');
                const dueDay = String(due.getDate()).padStart(2, '0');
                document.getElementById('order-due-date').value = `${dueYear}-${dueMonth}-${dueDay}`;
            } else {
                document.getElementById('order-due-date').value = '';
            }
        });

        document.getElementById('order-feed-type').addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            if (selectedOption && selectedOption.value) {
                document.getElementById('order-unit').value = selectedOption.dataset.unit || '';
                document.getElementById('order-feed-price').value = parseFloat(selectedOption.dataset.price || 0).toFixed(2);
                computeTotalPrice();
            } else {
                document.getElementById('order-unit').value = '';
                document.getElementById('order-feed-price').value = '';
                document.getElementById('order-total-price').value = '';
            }
        });

        document.getElementById('order-quantity').addEventListener('input', computeTotalPrice);

        function computeTotalPrice() {
            const qty = parseFloat(document.getElementById('order-quantity').value) || 0;
            const price = parseFloat(document.getElementById('order-feed-price').value) || 0;
            const total = qty * price;
            document.getElementById('order-total-price').value = total > 0 ? 'P ' + total.toFixed(2) : '';
        }

        let orderReceiptFileBlob = null;
        let orderReceiptFileName = null;

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

        async function processOrderReceiptFile(file) {
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

        function setupOrderReceiptUploadZone() {
            const zone = document.getElementById('order-receipt-upload-zone');
            if (!zone) return;

            const input = zone.querySelector('input[type="file"]');
            const placeholder = zone.querySelector('.upload-placeholder');
            const preview = zone.querySelector('.upload-preview');
            const previewImg = preview ? preview.querySelector('img') : null;
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
                orderReceiptFileBlob = null;
                orderReceiptFileName = null;
            };

            const handleFile = async (file) => {
                try {
                    const result = await processOrderReceiptFile(file);
                    orderReceiptFileBlob = result.blob;
                    orderReceiptFileName = file.name;
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

        document.getElementById('save-feed-btn').onclick = async () => {
            const orderId = document.getElementById('order-id').value;
            const date = document.getElementById('order-date').value;
            const dueDate = document.getElementById('order-due-date').value;
            const supplierSelect = document.getElementById('order-supplier');
            const supplier = supplierSelect.value;
            const supplierName = supplierSelect.options[supplierSelect.selectedIndex]?.text || 'Unknown';
            const salesInvoice = document.getElementById('order-sales-invoice').value.trim();
            const feedType = document.getElementById('order-feed-type').value;
            const quantity = document.getElementById('order-quantity').value;
            const unit = document.getElementById('order-unit').value;
            const feedPrice = document.getElementById('order-feed-price').value;
            const totalPrice = document.getElementById('order-total-price').value;

            if (!date) {
                alert('Date is required');
                return;
            }
            if (!supplier) {
                alert('Supplier is required');
                return;
            }
            if (!feedType) {
                alert('Feed Type is required');
                return;
            }
            if (!quantity || parseFloat(quantity) <= 0) {
                alert('Quantity must be greater than 0');
                return;
            }
            if (!salesInvoice) {
                alert('Sales Invoice is required');
                return;
            }
            if (!unit) {
                alert('Unit is required');
                return;
            }
            if (!feedPrice) {
                alert('Price is required');
                return;
            }
            if (!totalPrice) {
                alert('Total Price is required');
                return;
            }

            let filePath = null;

            try {
                if (orderReceiptFileBlob) {
                    const safeSupplier = supplierName.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
                    const safeInvoice = (salesInvoice || 'NoInvoice').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
                    const safeDate = (date || 'NoDate').replace(/[^0-9]/g, '_');
                    const customFileName = `${safeSupplier} - ${safeInvoice} - ${safeDate}.webp`;

                    const formData = new FormData();
                    formData.append('file', orderReceiptFileBlob, customFileName);
                    const uploadRes = await fetch('/api/order-feeds/upload', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: formData
                    });
                    if (!uploadRes.ok) {
                        const errData = await uploadRes.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to upload file');
                    }
                    const uploadData = await uploadRes.json();
                    filePath = uploadData.filePath;
                }

                const orderRes = await fetch('/api/order-feeds', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        order_id: orderId,
                        date: date || (function() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); })(),
                        due_date: dueDate || null,
                        supplier_id: supplier,
                        sales_invoice: salesInvoice,
                        feed_type_id: feedType,
                        quantity: parseFloat(quantity),
                        unit: unit,
                        price: parseFloat(feedPrice.replace('P ', '') || 0),
                        total_price: parseFloat(totalPrice.replace('P ', '') || 0),
                        receipt_path: filePath,
                        status: 'Pending',
                        rebate_status: 'Unclaimed'
                    })
                });

                if (!orderRes.ok) {
                    const errData = await orderRes.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save order');
                }

                const selectedFeedType = feedTypesData.find(ft => ft.feed_type_id === feedType);
                const feedRemarks = selectedFeedType ? (selectedFeedType.remarks || '') : '';

                try {
                    const expenseNextRes = await fetch('/api/expenses/next-id', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (expenseNextRes.ok) {
                        const expenseNextData = await expenseNextRes.json();
                        const expenseListId = expenseNextData.expense_list_id;

                        const expenseRes = await fetch('/api/expenses', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                            },
                            body: JSON.stringify({
                                expense_list_id: expenseListId,
                                date: date || (function() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); })(),
                                accounting_code: '5110',
                                expense_type: 'Direct Raw Materials & Feed',
                                description: `Sales Invoice: ${salesInvoice} from ${supplier} at the price of ${feedType}`,
                                remarks: feedRemarks,
                                total_amount: parseFloat(totalPrice.replace('P ', '') || 0),
                                account_source: null,
                                cleared_date: null,
                                status: 'Pending',
                                tracking_id: orderId
                            })
                        });

                        if (!expenseRes.ok) {
                            const errData = await expenseRes.json().catch(() => ({}));
                            console.error('Failed to create expense:', errData);
                        }
                    }
                } catch (expenseErr) {
                    console.error('Error creating expense:', expenseErr);
                }

                alert(`Order saved:\nID: ${orderId}\nDate: ${date}\nDue: ${dueDate}\nSupplier: ${supplier}\nInvoice: ${salesInvoice}\nFeed Type: ${feedType}\nQty: ${quantity} ${unit}\nPrice: P ${feedPrice}\nTotal: ${totalPrice}\nFile: ${filePath || 'None'}`);

                document.getElementById('order-date').value = '';
                document.getElementById('order-due-date').value = '';
                document.getElementById('order-supplier').value = '';
                document.getElementById('order-sales-invoice').value = '';
                document.getElementById('order-feed-type').value = '';
                document.getElementById('order-quantity').value = '';
                document.getElementById('order-unit').value = '';
                document.getElementById('order-feed-price').value = '';
                document.getElementById('order-total-price').value = '';
                
                const zone = document.getElementById('order-receipt-upload-zone');
                if (zone && zone._clear) zone._clear();

                loadFeedsTransactionTable();
                loadFeedsRepaymentTable();
                loadOutstandingBalance();
                loadFeedInventorySummary();

                document.getElementById('feed-modal').classList.add('hidden');
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };

        var API_BASE_FEEDS_SUPPLIERS = '/api/feeds-suppliers';
        var feedsSuppliersData = [];
        var currentSupplierPage = 1;
        var suppliersPerPage = 10;

        var API_BASE_FEED_TYPES = '/api/feed-types';
        var feedTypesData = [];
        var currentFeedTypePage = 1;
        var feedTypesPerPage = 10;

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

        function switchSupplierTab(tab) {
            const createPanel = document.getElementById('panel-create-supplier');
            const editPanel = document.getElementById('panel-edit-supplier');
            const createTab = document.getElementById('tab-create-supplier');
            const editTab = document.getElementById('tab-edit-supplier');

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

        async function loadFeedsSuppliers() {
            const tbody = document.getElementById('feeds-suppliers-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_FEEDS_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch suppliers');
                feedsSuppliersData = await res.json();
                currentSupplierPage = 1;
                renderFeedsSuppliersPage();
                renderFeedsSuppliersPagination();
            } catch (err) {
                console.error('Failed to load feeds suppliers', err);
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderFeedsSuppliersPage() {
            const tbody = document.getElementById('feeds-suppliers-table-body');
            if (!tbody) return;

            const start = (currentSupplierPage - 1) * suppliersPerPage;
            const end = start + suppliersPerPage;
            const pageData = feedsSuppliersData.slice(start, end);

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

            const totalPages = Math.max(1, Math.ceil(feedsSuppliersData.length / suppliersPerPage));
            renderFeedsSuppliersPagination(totalPages);
        }

        function renderFeedsSuppliersPagination(totalPages) {
            const container = document.getElementById('feeds-suppliers-pagination');
            if (!container) return;

            let html = '';
            html += `<button class="page-btn" id="feeds-suppliers-prev-btn" ${currentSupplierPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentSupplierPage ? 'active' : ''}" id="feeds-suppliers-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="feeds-suppliers-next-btn" ${currentSupplierPage >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;

            container.innerHTML = html;

            document.getElementById('feeds-suppliers-prev-btn')?.addEventListener('click', () => {
                if (currentSupplierPage > 1) {
                    currentSupplierPage--;
                    renderFeedsSuppliersPage();
                }
            });

            document.getElementById('feeds-suppliers-next-btn')?.addEventListener('click', () => {
                if (currentSupplierPage < totalPages) {
                    currentSupplierPage++;
                    renderFeedsSuppliersPage();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`feeds-suppliers-page-${i}`)?.addEventListener('click', () => {
                    currentSupplierPage = i;
                    renderFeedsSuppliersPage();
                });
            }
        }

        async function openFeedsSuppliersModal() {
            const modal = document.getElementById('feeds-suppliers-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_FEEDS_SUPPLIERS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-supplier-id').value = idData.supplier_id || 'FeSuID-1';
            } catch (err) {
                document.getElementById('create-supplier-id').value = 'FeSuID-1';
            }

            switchSupplierTab('create');
            modal.classList.remove('hidden');
            loadFeedsSuppliers();
        }

        function closeFeedsSuppliersModal() {
            const modal = document.getElementById('feeds-suppliers-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function saveCreateSupplier() {
            const supplierId = document.getElementById('create-supplier-id').value;
            const companyName = document.getElementById('create-company-name').value.trim();
            const address = document.getElementById('create-address').value.trim();
            const tinNumber = document.getElementById('create-tin-number').value.trim();
            const contactPerson = document.getElementById('create-contact-person').value.trim();
            const contactNumber = document.getElementById('create-contact-number').value.trim();
            const status = document.getElementById('create-supplier-status').value;

            if (!companyName) {
                alert('Company Name is required');
                return;
            }

            try {
                const res = await fetch(API_BASE_FEEDS_SUPPLIERS, {
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
                document.getElementById('create-company-name').value = '';
                document.getElementById('create-address').value = '';
                document.getElementById('create-tin-number').value = '';
                document.getElementById('create-contact-person').value = '';
                document.getElementById('create-contact-number').value = '';
                document.getElementById('create-supplier-status').value = 'Active';

                const idRes = await fetch(API_BASE_FEEDS_SUPPLIERS + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-supplier-id').value = idData.supplier_id || 'FeSuID-1';

                loadFeedsSuppliers();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function saveEditSupplier() {
            const supplierId = document.getElementById('edit-supplier-id').value;
            const companyName = document.getElementById('edit-company-name').value.trim();
            const address = document.getElementById('edit-address').value.trim();
            const tinNumber = document.getElementById('edit-tin-number').value.trim();
            const contactPerson = document.getElementById('edit-contact-person').value.trim();
            const contactNumber = document.getElementById('edit-contact-number').value.trim();
            const status = document.getElementById('edit-supplier-status').value;

            if (!supplierId || !companyName) {
                alert('Supplier ID and Company Name are required');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_FEEDS_SUPPLIERS}/${encodeURIComponent(supplierId)}`, {
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
                loadFeedsSuppliers();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        loadFeedsSuppliers();
        loadFeedTypes();

        const addBtn = document.getElementById('add-feeds-suppliers-btn');
        if (addBtn) {
            addBtn.onclick = openFeedsSuppliersModal;
        }

        const closeBtn = document.getElementById('close-feeds-suppliers-modal');
        if (closeBtn) {
            closeBtn.onclick = closeFeedsSuppliersModal;
        }

        const saveCreateBtn = document.getElementById('save-create-supplier-btn');
        if (saveCreateBtn) {
            saveCreateBtn.onclick = saveCreateSupplier;
        }

        const saveEditBtn = document.getElementById('save-edit-supplier-btn');
        if (saveEditBtn) {
            saveEditBtn.onclick = saveEditSupplier;
        }

        setupContactNumber(document.getElementById('create-contact-number'));
        setupContactNumber(document.getElementById('edit-contact-number'));

        const editSearchInput = document.getElementById('edit-supplier-search');
        const searchResults = document.getElementById('edit-supplier-search-results');
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
                        const res = await fetch(API_BASE_FEEDS_SUPPLIERS + '?search=' + encodeURIComponent(query), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const suppliers = await res.json();
                            renderSupplierSearchResults(suppliers);
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

        const addFeedTypeBtn = document.getElementById('add-feed-type-btn');
        if (addFeedTypeBtn) {
            addFeedTypeBtn.onclick = openFeedTypeModal;
        }

        const closeFeedTypeBtn = document.getElementById('close-feed-type-modal');
        if (closeFeedTypeBtn) {
            closeFeedTypeBtn.onclick = closeFeedTypeModal;
        }

        const saveCreateFeedTypeBtn = document.getElementById('save-create-feed-type-btn');
        if (saveCreateFeedTypeBtn) {
            saveCreateFeedTypeBtn.onclick = saveCreateFeedType;
        }

        const saveEditFeedTypeBtn = document.getElementById('save-edit-feed-type-btn');
        if (saveEditFeedTypeBtn) {
            saveEditFeedTypeBtn.onclick = saveEditFeedType;
        }

        const createPriceInput = document.getElementById('create-feed-type-price');
        if (createPriceInput) {
            createPriceInput.addEventListener('blur', (e) => {
                const val = formatPrice(e.target.value);
                if (val) e.target.value = val;
            });
        }

        const editPriceInput = document.getElementById('edit-feed-type-price');
        if (editPriceInput) {
            editPriceInput.addEventListener('blur', (e) => {
                const val = formatPrice(e.target.value);
                if (val) e.target.value = val;
            });
        }

        const editFeedTypeSearchInput = document.getElementById('edit-feed-type-search');
        const feedTypeSearchResults = document.getElementById('edit-feed-type-search-results');
        let feedTypeSearchDebounce = null;

        if (editFeedTypeSearchInput && feedTypeSearchResults) {
            editFeedTypeSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (feedTypeSearchDebounce) clearTimeout(feedTypeSearchDebounce);
                if (query.length < 1) {
                    feedTypeSearchResults.style.display = 'none';
                    return;
                }
                feedTypeSearchDebounce = setTimeout(async () => {
                    try {
                        const res = await fetch(API_BASE_FEED_TYPES + '?search=' + encodeURIComponent(query), {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                        });
                        if (res.ok) {
                            const feedTypes = await res.json();
                            renderFeedTypeSearchResults(feedTypes);
                        }
                    } catch (err) {
                        console.error('Search failed', err);
                    }
                }, 300);
            });

            document.addEventListener('click', (e) => {
                if (!editFeedTypeSearchInput.contains(e.target) && !feedTypeSearchResults.contains(e.target)) {
                    feedTypeSearchResults.style.display = 'none';
                }
            });
        }

        function renderSupplierSearchResults(suppliers) {
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
                    selectSupplier(supplierId);
                });
            });
        }

        window.selectSupplier = async (supplierId) => {
            const searchResults = document.getElementById('edit-supplier-search-results');
            if (searchResults) searchResults.style.display = 'none';

            try {
                const res = await fetch(`${API_BASE_FEEDS_SUPPLIERS}/code/${encodeURIComponent(supplierId)}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const supplier = await res.json();
                    document.getElementById('edit-supplier-id').value = supplier.supplier_id || '';
                    document.getElementById('edit-company-name').value = supplier.company_name || '';
                    document.getElementById('edit-address').value = supplier.address || '';
                    document.getElementById('edit-tin-number').value = supplier.tin_number || '';
                    document.getElementById('edit-contact-person').value = supplier.contact_person || '';
                    document.getElementById('edit-contact-number').value = supplier.contact_number || '';
                    document.getElementById('edit-supplier-status').value = supplier.status || 'Active';
                }
            } catch (err) {
                alert('Error loading supplier: ' + err.message);
            }
        };

        function switchFeedTypeTab(tab) {
            const createPanel = document.getElementById('panel-create-feed-type');
            const editPanel = document.getElementById('panel-edit-feed-type');
            const createTab = document.getElementById('tab-create-feed-type');
            const editTab = document.getElementById('tab-edit-feed-type');

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

        async function loadActiveSuppliers() {
            const companySelects = [
                document.getElementById('create-feed-type-company'),
                document.getElementById('edit-feed-type-company')
            ];

            try {
                const res = await fetch(API_BASE_FEEDS_SUPPLIERS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const suppliers = await res.json();
                    companySelects.forEach(select => {
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

        async function loadFeedTypes() {
            const tbody = document.getElementById('feed-types-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_FEED_TYPES, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch feed types');
                feedTypesData = await res.json();
                currentFeedTypePage = 1;
                renderFeedTypesPage();
                renderFeedTypesPagination();
            } catch (err) {
                console.error('Failed to load feed types', err);
                tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderFeedTypesPage() {
            const tbody = document.getElementById('feed-types-table-body');
            if (!tbody) return;

            const start = (currentFeedTypePage - 1) * feedTypesPerPage;
            const end = start + feedTypesPerPage;
            const pageData = feedTypesData.slice(start, end);

            if (pageData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No feed types found</td></tr>';
                return;
            }

            tbody.innerHTML = pageData.map(ft => `
                <tr>
                    <td>${ft.feed_type_id || '-'}</td>
                    <td>${ft.supplier_id || '-'}</td>
                    <td>${ft.feed_type || '-'}</td>
                    <td>${ft.remarks || '-'}</td>
                    <td>${ft.unit || '-'}</td>
                    <td>${ft.category || '-'}</td>
                    <td>P ${parseFloat(ft.price || 0).toFixed(2)}</td>
                    <td>${ft.status || '-'}</td>
                </tr>
            `).join('');

            const totalPages = Math.max(1, Math.ceil(feedTypesData.length / feedTypesPerPage));
            renderFeedTypesPagination(totalPages);
        }

        function renderFeedTypesPagination(totalPages) {
            const container = document.getElementById('feed-types-pagination');
            if (!container) return;

            let html = '';
            html += `<button class="page-btn" id="feed-types-prev-btn" ${currentFeedTypePage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentFeedTypePage ? 'active' : ''}" id="feed-types-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="feed-types-next-btn" ${currentFeedTypePage >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;

            container.innerHTML = html;

            document.getElementById('feed-types-prev-btn')?.addEventListener('click', () => {
                if (currentFeedTypePage > 1) {
                    currentFeedTypePage--;
                    renderFeedTypesPage();
                }
            });

            document.getElementById('feed-types-next-btn')?.addEventListener('click', () => {
                if (currentFeedTypePage < totalPages) {
                    currentFeedTypePage++;
                    renderFeedTypesPage();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`feed-types-page-${i}`)?.addEventListener('click', () => {
                    currentFeedTypePage = i;
                    renderFeedTypesPage();
                });
            }
        }

        async function openFeedTypeModal() {
            const modal = document.getElementById('feed-type-modal');
            if (!modal) return;

            try {
                const idRes = await fetch(API_BASE_FEED_TYPES + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-feed-type-id').value = idData.feed_type_id || 'FeTyID-1';
            } catch (err) {
                document.getElementById('create-feed-type-id').value = 'FeTyID-1';
            }

            await loadActiveSuppliers();
            switchFeedTypeTab('create');
            modal.classList.remove('hidden');
            loadFeedTypes();
        }

        function closeFeedTypeModal() {
            const modal = document.getElementById('feed-type-modal');
            if (modal) modal.classList.add('hidden');
        }

        function formatPrice(value) {
            const num = parseFloat(value.replace(/[^0-9.]/g, ''));
            if (isNaN(num)) return '';
            return num.toFixed(2);
        }

        async function saveCreateFeedType() {
            const feedTypeId = document.getElementById('create-feed-type-id').value;
            const supplierId = document.getElementById('create-feed-type-company').value;
            const feedType = document.getElementById('create-feed-type-name').value.trim();
            const category = document.getElementById('create-feed-type-category').value;
            const unit = document.getElementById('create-feed-type-unit').value.trim();
            const priceRaw = document.getElementById('create-feed-type-price').value;
            const remarks = document.getElementById('create-feed-type-remarks').value.trim();
            const status = document.getElementById('create-feed-type-status').value;

            if (!supplierId) {
                alert('Company is required');
                return;
            }
            if (!feedType) {
                alert('Feed Type is required');
                return;
            }
            if (!unit) {
                alert('Unit is required');
                return;
            }

            const price = formatPrice(priceRaw);

            try {
                const res = await fetch(API_BASE_FEED_TYPES, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        feed_type_id: feedTypeId,
                        supplier_id: supplierId,
                        feed_type: feedType,
                        category: category || null,
                        unit: unit,
                        price: price,
                        remarks: remarks || null,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save feed type');
                }

                alert('Feed Type created successfully');
                document.getElementById('create-feed-type-company').value = '';
                document.getElementById('create-feed-type-name').value = '';
                document.getElementById('create-feed-type-unit').value = '';
                document.getElementById('create-feed-type-category').value = '';
                document.getElementById('create-feed-type-price').value = '';
                document.getElementById('create-feed-type-remarks').value = '';
                document.getElementById('create-feed-type-status').value = 'Active';

                const idRes = await fetch(API_BASE_FEED_TYPES + '/next-id', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                const idData = await idRes.json();
                document.getElementById('create-feed-type-id').value = idData.feed_type_id || 'FeTyID-1';

                loadFeedTypes();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function saveEditFeedType() {
            const feedTypeId = document.getElementById('edit-feed-type-id').value;
            const supplierId = document.getElementById('edit-feed-type-company').value;
            const feedType = document.getElementById('edit-feed-type-name').value.trim();
            const category = document.getElementById('edit-feed-type-category').value;
            const unit = document.getElementById('edit-feed-type-unit').value.trim();
            const priceRaw = document.getElementById('edit-feed-type-price').value;
            const remarks = document.getElementById('edit-feed-type-remarks').value.trim();
            const status = document.getElementById('edit-feed-type-status').value;

            if (!feedTypeId || !feedType) {
                alert('Feed Type ID and Feed Type are required');
                return;
            }

            const price = formatPrice(priceRaw);

            try {
                const res = await fetch(`${API_BASE_FEED_TYPES}/${encodeURIComponent(feedTypeId)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        feed_type_id: feedTypeId,
                        supplier_id: supplierId,
                        feed_type: feedType,
                        category: category || null,
                        unit: unit,
                        price: price,
                        remarks: remarks || null,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to update feed type');
                }

                alert('Feed Type updated successfully');
                loadFeedTypes();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        function renderFeedTypeSearchResults(feedTypes) {
            const searchResults = document.getElementById('edit-feed-type-search-results');
            if (!searchResults) return;
            if (!feedTypes || feedTypes.length === 0) {
                searchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No feed types found</div>';
                searchResults.style.display = 'block';
                return;
            }
            searchResults.innerHTML = feedTypes.map(ft => `
                <div class="feed-type-search-result" data-feed-type-id="${ft.feed_type_id}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                    <div style="font-weight: 600; color: #1a1f2e;">${ft.feed_type || ''}</div>
                    <div style="font-size: 12px; color: #64748b;">${ft.feed_type_id || ''} - ${ft.supplier_id || ''}</div>
                </div>
            `).join('');
            searchResults.style.display = 'block';

            searchResults.querySelectorAll('.feed-type-search-result').forEach(item => {
                item.addEventListener('click', () => {
                    const feedTypeId = item.getAttribute('data-feed-type-id');
                    selectFeedType(feedTypeId);
                });
            });
        }

        window.selectFeedType = async (feedTypeId) => {
            const searchResults = document.getElementById('edit-feed-type-search-results');
            if (searchResults) searchResults.style.display = 'none';

            try {
                const res = await fetch(`${API_BASE_FEED_TYPES}/code/${encodeURIComponent(feedTypeId)}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (res.ok) {
                    const ft = await res.json();
                    await loadActiveSuppliers();
                     document.getElementById('edit-feed-type-id').value = ft.feed_type_id || '';
                     document.getElementById('edit-feed-type-company').value = ft.supplier_id || '';
                     document.getElementById('edit-feed-type-name').value = ft.feed_type || '';
                     document.getElementById('edit-feed-type-unit').value = ft.unit || '';
                     document.getElementById('edit-feed-type-category').value = ft.category || '';
                     document.getElementById('edit-feed-type-price').value = ft.price || '';
                     document.getElementById('edit-feed-type-remarks').value = ft.remarks || '';
                     document.getElementById('edit-feed-type-status').value = ft.status || 'Active';
                }
            } catch (err) {
                alert('Error loading feed type: ' + err.message);
            }
        };

        window.switchFeedTypeTab = switchFeedTypeTab;
        window.openFeedTypeModal = openFeedTypeModal;
        window.closeFeedTypeModal = closeFeedTypeModal;
        window.saveCreateFeedType = saveCreateFeedType;
        window.saveEditFeedType = saveEditFeedType;
        window.selectFeedType = selectFeedType;
        window.openFeedsSuppliersModal = openFeedsSuppliersModal;
        window.closeFeedsSuppliersModal = closeFeedsSuppliersModal;
        window.saveCreateSupplier = saveCreateSupplier;
        window.saveEditSupplier = saveEditSupplier;
        window.selectSupplier = selectSupplier;
        window.switchSupplierTab = switchSupplierTab;

        setupOrderReceiptUploadZone();

        var API_BASE_ORDER_FEEDS = '/api/order-feeds';
        var API_BASE_ORDER_FEEDS_REPAYMENT = '/api/order-feeds-repayment';
        var feedsTransactionData = [];
        var feedsTransactionCurrentPage = 1;
        var FEEDS_TRANSACTION_PER_PAGE = 10;
        var feedsTransactionSortState = { col: null, dir: 1 };

        var feedsRepaymentData = [];
        var feedsRepaymentSortState = { col: null, dir: 1 };

        async function loadFeedsRepaymentTable() {
            const tbody = document.getElementById('feeds-repayment-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_ORDER_FEEDS_REPAYMENT, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch repayments');
                feedsRepaymentData = await res.json();
                renderFeedsRepaymentTable();
            } catch (err) {
                console.error('Failed to load repayments', err);
                tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderFeedsRepaymentTable() {
            const tbody = document.getElementById('feeds-repayment-table-body');
            if (!tbody) return;

            let sortedData = [...feedsRepaymentData];
            if (feedsRepaymentSortState.col) {
                sortedData.sort((a, b) => {
                    let va = a[feedsRepaymentSortState.col];
                    let vb = b[feedsRepaymentSortState.col];
                    if (feedsRepaymentSortState.col === 'total') {
                        va = parseFloat(va) || 0;
                        vb = parseFloat(vb) || 0;
                    } else {
                        va = (va || '').toString().toLowerCase();
                        vb = (vb || '').toString().toLowerCase();
                    }
                    if (va < vb) return -1 * feedsRepaymentSortState.dir;
                    if (va > vb) return 1 * feedsRepaymentSortState.dir;
                    return 0;
                });
            }

            if (sortedData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No data found</td></tr>';
                return;
            }

            tbody.innerHTML = sortedData.map(r => `
                <tr>
                    <td>${r.repayment_id || '-'}</td>
                    <td>${r.order_id || '-'}</td>
                    <td>${formatDate(r.created_at)}</td>
                    <td>${r.sales_invoice || '-'}</td>
                    <td>${r.check_number || '-'}</td>
                    <td>P ${formatNumber(parseFloat(r.total || 0))}</td>
                    <td>Paid</td>
                    <td>${r.bank_code || r.bank_source || '-'}</td>
                </tr>
            `).join('');

            const repaymentTable = document.querySelector('.feeds-transaction-repayment-card table.data-table');
            if (repaymentTable) {
                repaymentTable.querySelectorAll('th.sortable').forEach(th => {
                    const arrow = th.querySelector('.sort-arrow');
                    if (arrow) arrow.textContent = '⇅';
                });
                if (feedsRepaymentSortState.col) {
                    const activeHeader = repaymentTable.querySelector(`th.sortable[data-sort="${feedsRepaymentSortState.col}"]`);
                    if (activeHeader) {
                        const arrow = activeHeader.querySelector('.sort-arrow');
                        if (arrow) arrow.textContent = feedsRepaymentSortState.dir === 1 ? '▲' : '▼';
                    }
                }
            }
        }

        async function loadOutstandingBalance() {
            const el = document.getElementById('outstanding-balance-value');
            if (!el) return;

            try {
                const res = await fetch(API_BASE_ORDER_FEEDS + '/outstanding-balance', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch outstanding balance');
                const data = await res.json();
                el.textContent = 'P ' + formatNumber(data.outstanding_balance || 0);
            } catch (err) {
                console.error('Failed to load outstanding balance', err);
                el.textContent = 'P 0.00';
            }
        }

        async function loadFeedInventorySummary() {
            const preLayEl = document.getElementById('inventory-pre-lay');
            const layer1El = document.getElementById('inventory-layer-1');
            const layer2El = document.getElementById('inventory-layer-2');
            if (!preLayEl || !layer1El || !layer2El) return;

            try {
                const res = await fetch('/api/feed-inventory/summary', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch feed inventory summary');
                const summary = await res.json();

                const getStock = (category) => {
                    const item = summary.find(s => s.category === category);
                    return item ? Math.max(0, parseFloat(item.remaining_stock || 0)) : 0;
                };

                const preLayStock = getStock('Pre-Lay');
                const layer1Stock = getStock('Layer 1');
                const layer2Stock = getStock('Layer 2');

                preLayEl.textContent = preLayStock.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kgs';
                layer1El.textContent = layer1Stock.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kgs';
                layer2El.textContent = layer2Stock.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kgs';
            } catch (err) {
                console.error('Failed to load feed inventory summary', err);
                preLayEl.textContent = '0 Kgs';
                layer1El.textContent = '0 Kgs';
                layer2El.textContent = '0 Kgs';
            }
        }

        async function loadFeedsTransactionTable() {
            const tbody = document.getElementById('feeds-transaction-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_ORDER_FEEDS, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                });
                if (!res.ok) throw new Error('Failed to fetch transactions');
                feedsTransactionData = await res.json();
                feedsTransactionCurrentPage = 1;
                renderFeedsTransactionPage();
            } catch (err) {
                console.error('Failed to load feeds transactions', err);
                tbody.innerHTML = '<tr><td colspan="18" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        function renderFeedsTransactionPage() {
            const tbody = document.getElementById('feeds-transaction-table-body');
            if (!tbody) return;

            const searchInput = document.getElementById('feeds-transaction-search');
            const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';

            let filteredData = feedsTransactionData;
            if (searchTerm) {
                filteredData = feedsTransactionData.filter(tx => {
                    return (
                        (tx.order_id || '').toLowerCase().includes(searchTerm) ||
                        (tx.company_name || '').toLowerCase().includes(searchTerm) ||
                        (tx.sales_invoice || '').toLowerCase().includes(searchTerm) ||
                        (tx.feed_type || '').toLowerCase().includes(searchTerm) ||
                        (tx.status || '').toLowerCase().includes(searchTerm) ||
                        (tx.rebate_status || '').toLowerCase().includes(searchTerm)
                    );
                });
            }

            if (feedsTransactionSortState.col) {
                filteredData = [...filteredData].sort((a, b) => {
                    let va = a[feedsTransactionSortState.col];
                    let vb = b[feedsTransactionSortState.col];
                    if (feedsTransactionSortState.col === 'price' || feedsTransactionSortState.col === 'total_price') {
                        va = parseFloat(va) || 0;
                        vb = parseFloat(vb) || 0;
                    } else if (feedsTransactionSortState.col === 'quantity') {
                        va = parseFloat(va) || 0;
                        vb = parseFloat(vb) || 0;
                    } else {
                        va = (va || '').toString().toLowerCase();
                        vb = (vb || '').toString().toLowerCase();
                    }
                    if (va < vb) return -1 * feedsTransactionSortState.dir;
                    if (va > vb) return 1 * feedsTransactionSortState.dir;
                    return 0;
                });
            }

            const start = (feedsTransactionCurrentPage - 1) * FEEDS_TRANSACTION_PER_PAGE;
            const end = start + FEEDS_TRANSACTION_PER_PAGE;
            const pageData = filteredData.slice(start, end);

            if (pageData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="18" style="text-align:center;">No transactions found</td></tr>';
                return;
            }

            tbody.innerHTML = pageData.map(tx => `
                <tr>
                    <td>${tx.order_id || '-'}</td>
                    <td>${tx.status === 'Rebate' ? '-' : formatDate(tx.date)}</td>
                    <td>${tx.status === 'Rebate' ? '-' : formatDate(tx.due_date)}</td>
                    <td>${tx.company_name || '-'}</td>
                    <td>${tx.sales_invoice || '-'}</td>
                    <td>${tx.feed_type || 'Rebate'}</td>
                    <td>${tx.quantity || '-'}</td>
                    <td>${tx.unit || '-'}</td>
                    <td>P ${parseFloat(tx.price || 0).toFixed(2)}</td>
                    <td>P ${parseFloat(tx.total_price || 0).toFixed(2)}</td>
                    <td>${tx.status || '-'}</td>
                    <td>${tx.rebate_status || '-'}</td>
                    <td>${!tx.feed_type ? '-' : (tx.receipt_path && String(tx.receipt_path).trim() ? `<span class="photo-icon-wrap" data-receipt-path="${tx.receipt_path}" data-order-id="${tx.order_id}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg></span>` : `<span class="photo-icon-wrap" data-order-id="${tx.order_id}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#800000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg></span>`)}</td>
                    <td>${formatDate(tx.payment_date)}</td>
                    <td>${tx.bank_code || tx.payment_source || '-'}</td>
                    <td>${tx.bank_account_number ? maskBankAccount(tx.bank_account_number) : '-'}</td>
                    <td>${tx.check_number || '-'}</td>
                </tr>
            `).join('');

            const totalPages = Math.max(1, Math.ceil(filteredData.length / FEEDS_TRANSACTION_PER_PAGE));
            renderFeedsTransactionPagination(totalPages);

            const txTable = document.querySelector('.feeds-transaction-card table.data-table');
            if (txTable) {
                txTable.querySelectorAll('th.sortable').forEach(th => {
                    const arrow = th.querySelector('.sort-arrow');
                    if (arrow) arrow.textContent = '⇅';
                });
                if (feedsTransactionSortState.col) {
                    const activeHeader = txTable.querySelector(`th.sortable[data-sort="${feedsTransactionSortState.col}"]`);
                    if (activeHeader) {
                        const arrow = activeHeader.querySelector('.sort-arrow');
                        if (arrow) arrow.textContent = feedsTransactionSortState.dir === 1 ? '▲' : '▼';
                    }
                }
            }
        }

        function renderFeedsTransactionPagination(totalPages) {
            const container = document.getElementById('feeds-transaction-pagination');
            if (!container) return;

            let html = '';
            html += `<button class="page-btn" id="feeds-transaction-prev-btn" ${feedsTransactionCurrentPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === feedsTransactionCurrentPage ? 'active' : ''}" id="feeds-transaction-page-${i}">${i}</button>`;
            }

            html += `<button class="page-btn" id="feeds-transaction-next-btn" ${feedsTransactionCurrentPage >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;

            container.innerHTML = html;

            document.getElementById('feeds-transaction-prev-btn')?.addEventListener('click', () => {
                if (feedsTransactionCurrentPage > 1) {
                    feedsTransactionCurrentPage--;
                    renderFeedsTransactionPage();
                }
            });

            document.getElementById('feeds-transaction-next-btn')?.addEventListener('click', () => {
                if (feedsTransactionCurrentPage < totalPages) {
                    feedsTransactionCurrentPage++;
                    renderFeedsTransactionPage();
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                document.getElementById(`feeds-transaction-page-${i}`)?.addEventListener('click', () => {
                    feedsTransactionCurrentPage = i;
                    renderFeedsTransactionPage();
                });
            }
        }

        loadFeedsTransactionTable();
        loadFeedsRepaymentTable();
        loadOutstandingBalance();
        loadFeedInventorySummary();

        const feedsTransactionSearchInput = document.getElementById('feeds-transaction-search');
        if (feedsTransactionSearchInput) {
            let searchDebounce;
            feedsTransactionSearchInput.addEventListener('input', (e) => {
                clearTimeout(searchDebounce);
                searchDebounce = setTimeout(() => {
                    feedsTransactionCurrentPage = 1;
                    renderFeedsTransactionPage();
                }, 200);
            });
        }

        document.querySelectorAll('.feeds-transaction-card th.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const col = th.dataset.sort;
                if (!col) return;
                if (feedsTransactionSortState.col === col) {
                    feedsTransactionSortState.dir *= -1;
                } else {
                    feedsTransactionSortState.col = col;
                    feedsTransactionSortState.dir = 1;
                }
                renderFeedsTransactionPage();
            });
        });

        document.querySelectorAll('.feeds-transaction-repayment-card th.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const col = th.dataset.sort;
                if (!col) return;
                if (feedsRepaymentSortState.col === col) {
                    feedsRepaymentSortState.dir *= -1;
                } else {
                    feedsRepaymentSortState.col = col;
                    feedsRepaymentSortState.dir = 1;
                }
                renderFeedsRepaymentTable();
            });
        });

        const photoTooltip = document.createElement('div');
        photoTooltip.className = 'photo-preview-tooltip';
        photoTooltip.style.display = 'none';
        document.body.appendChild(photoTooltip);

        document.addEventListener('mouseover', (e) => {
            const wrap = e.target.closest('.photo-icon-wrap');
            if (!wrap) return;
            const src = wrap.getAttribute('data-receipt-path');
            if (!src) return;
            const fullSrc = src.startsWith('http') ? src : `${src}`;
            photoTooltip.innerHTML = `<img src="${fullSrc}" alt="receipt preview">`;
            photoTooltip.style.display = 'block';
            positionTooltip(e);
        });

        document.addEventListener('mouseout', (e) => {
            const wrap = e.target.closest('.photo-icon-wrap');
            if (!wrap) return;
            photoTooltip.style.display = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (photoTooltip.style.display === 'block') {
                positionTooltip(e);
            }
        });

        function positionTooltip(e) {
            const offset = 15;
            let left = e.clientX + offset;
            let top = e.clientY + offset;
            const rect = photoTooltip.getBoundingClientRect();
            if (left + rect.width > window.innerWidth) {
                left = e.clientX - rect.width - offset;
            }
            if (top + rect.height > window.innerHeight) {
                top = e.clientY - rect.height - offset;
            }
            photoTooltip.style.left = left + 'px';
            photoTooltip.style.top = top + 'px';
        }

        const bulkUploadModal = document.getElementById('bulk-upload-modal');
        const bulkUploadDropZone = document.getElementById('bulk-upload-drop-zone');
        const bulkUploadFileInput = document.getElementById('bulk-upload-file-input');
        const bulkUploadPreview = document.getElementById('bulk-upload-preview');
        let bulkUploadFile = null;
        let bulkUploadRows = [];

        document.getElementById('open-bulk-upload-modal')?.addEventListener('click', () => {
            if (bulkUploadModal) {
                bulkUploadModal.classList.remove('hidden');
            }
        });

        document.getElementById('close-bulk-upload-modal')?.addEventListener('click', () => {
            if (bulkUploadModal) {
                bulkUploadModal.classList.add('hidden');
            }
        });

        if (bulkUploadDropZone) {
            bulkUploadDropZone.addEventListener('click', () => {
                bulkUploadFileInput?.click();
            });

            bulkUploadDropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                bulkUploadDropZone.style.borderColor = '#2e7d32';
                bulkUploadDropZone.style.background = '#e8f5e9';
            });

            bulkUploadDropZone.addEventListener('dragleave', () => {
                bulkUploadDropZone.style.borderColor = '#D6D6D6';
                bulkUploadDropZone.style.background = '#fafafa';
            });

            bulkUploadDropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                bulkUploadDropZone.style.borderColor = '#D6D6D6';
                bulkUploadDropZone.style.background = '#fafafa';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleBulkUploadFile(files[0]);
                }
            });
        }

        if (bulkUploadFileInput) {
            bulkUploadFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleBulkUploadFile(e.target.files[0]);
                }
            });
        }

        async function handleBulkUploadFile(file) {
            bulkUploadFile = file;
            bulkUploadRows = [];
            const validTypes = [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
                'text/csv',
                'text/plain'
            ];
            const validExtensions = ['.xlsx', '.xls', '.csv'];
            const fileName = file.name || '';
            const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

            if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
                alert('Please upload a valid Excel or CSV file');
                return;
            }

            if (bulkUploadPreview) {
                bulkUploadPreview.innerHTML = '<p style="color: #555; text-align: center; margin-top: 20px;">Loading preview...</p>';
            }

            try {
                const text = await file.text();
                let html = '<div style="overflow-x: auto;"><table style="border-collapse: collapse; font-size: 13px; width: 100%;">';

                if (fileExtension === '.csv') {
                    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
                    const headers = lines[0] ? lines[0].split(',') : [];
                    
                    lines.forEach((line, index) => {
                        const cells = line.split(',');
                        const tag = index === 0 ? 'th' : 'td';
                        const style = 'border: 1px solid #e5e5e5; padding: 8px 10px; text-align: left; background: ' + (index === 0 ? '#f5f5f5' : '#fff') + ';';
                        html += '<tr>' + cells.map(cell => `<${tag} style="${style}">${escapeHtml(cell.trim())}</${tag}>`).join('') + '</tr>';
                    });

                    for (let i = 1; i < lines.length; i++) {
                        const values = lines[i].split(',');
                        const row = {};
                        headers.forEach((header, idx) => {
                            row[header.trim()] = (values[idx] || '').trim();
                        });
                        bulkUploadRows.push(row);
                    }
                } else {
                    html += '<tr><td style="border: 1px solid #e5e5e5; padding: 20px; text-align: center; color: #666;">Excel preview not available. Please download the template and open in Excel.</td></tr>';
                }

                html += '</table></div>';
                if (bulkUploadPreview) {
                    bulkUploadPreview.innerHTML = html;
                }
            } catch (err) {
                console.error('Failed to read file', err);
                if (bulkUploadPreview) {
                    bulkUploadPreview.innerHTML = '<p style="color: #e74c3c; text-align: center; margin-top: 20px;">Failed to load file preview</p>';
                }
            }
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        document.getElementById('download-template-btn')?.addEventListener('click', () => {
            const headers = [
                'order_id',
                'date',
                'due_date',
                'supplier_id',
                'sales_invoice',
                'feed_type_id',
                'quantity',
                'unit',
                'price',
                'total_price',
                'receipt_path',
                'status',
                'rebate_status'
            ];
            const csvContent = headers.join(',') + '\n';
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'feeds_bulk_upload_template.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });

        document.getElementById('save-bulk-upload-btn')?.addEventListener('click', async () => {
            if (!bulkUploadFile) {
                alert('Please select a file first');
                return;
            }
            if (bulkUploadRows.length === 0) {
                alert('No data rows found in file');
                return;
            }

            try {
                const res = await fetch('/api/order-feeds/bulk', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({ rows: bulkUploadRows })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Bulk upload failed');
                }

                const result = await res.json();
                alert(result.message || 'Bulk upload completed successfully');
                document.getElementById('bulk-upload-modal').classList.add('hidden');
                bulkUploadFile = null;
                bulkUploadRows = [];
                if (bulkUploadPreview) {
                    bulkUploadPreview.innerHTML = '';
                }
                await loadFeedsTransactionTable();
                await loadOutstandingBalance();
                await loadFeedInventorySummary();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });

        let currentPhotoUploadOrderId = null;
        let photoUploadFileBlob = null;
        let photoUploadOriginalFile = null;

        document.getElementById('feeds-transaction-table-body')?.addEventListener('click', (e) => {
            const icon = e.target.closest('.photo-icon-wrap');
            if (!icon) return;
            e.stopPropagation();
            const orderId = icon.getAttribute('data-order-id');
            if (!orderId) return;

            currentPhotoUploadOrderId = orderId;
            const modal = document.getElementById('photo-upload-modal');
            if (modal) {
                modal.classList.remove('hidden');
            }
        });

        document.getElementById('close-photo-upload-modal')?.addEventListener('click', () => {
            const modal = document.getElementById('photo-upload-modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        });

        const photoUploadDropZone = document.getElementById('photo-upload-drop-zone');
        const photoUploadFileInput = document.getElementById('photo-upload-file-input');

        if (photoUploadDropZone && photoUploadFileInput) {
            photoUploadDropZone.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON') {
                    photoUploadFileInput.click();
                }
            });

            photoUploadDropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                photoUploadDropZone.style.borderColor = '#2563eb';
                photoUploadDropZone.style.background = 'rgba(37, 99, 235, 0.05)';
            });

            photoUploadDropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!photoUploadDropZone.contains(e.relatedTarget)) {
                    photoUploadDropZone.style.borderColor = '#cbd5e1';
                    photoUploadDropZone.style.background = '#f8fafc';
                }
            });

            photoUploadDropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                photoUploadDropZone.style.borderColor = '#cbd5e1';
                photoUploadDropZone.style.background = '#f8fafc';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handlePhotoUploadFile(files[0]);
                }
            });

            photoUploadFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handlePhotoUploadFile(e.target.files[0]);
                }
            });

            const removeBtn = photoUploadDropZone.querySelector('.remove-upload-btn');
            if (removeBtn) {
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    photoUploadFileBlob = null;
                    photoUploadOriginalFile = null;
                    const preview = photoUploadDropZone.querySelector('.upload-preview');
                    const placeholder = photoUploadDropZone.querySelector('.upload-placeholder');
                    const previewImg = preview ? preview.querySelector('img') : null;
                    if (preview && placeholder && previewImg) {
                        previewImg.src = '';
                        placeholder.style.display = '';
                        preview.style.display = 'none';
                    }
                    if (photoUploadFileInput) {
                        photoUploadFileInput.value = '';
                    }
                });
            }
        }

        async function handlePhotoUploadFile(file) {
            photoUploadOriginalFile = file;
            const validTypes = ['image/jpeg', 'image/jpg'];
            const maxInputSize = 5 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                alert('Only JPG files are allowed.');
                photoUploadOriginalFile = null;
                return;
            }

            if (file.size > maxInputSize) {
                alert('File size must not exceed 5MB.');
                photoUploadOriginalFile = null;
                return;
            }

            try {
                const dataUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = () => reject(new Error('Failed to read file.'));
                    reader.readAsDataURL(file);
                });

                const zone = document.getElementById('photo-upload-drop-zone');
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

                    photoUploadFileBlob = blob;
                };
                img.onerror = () => alert('Failed to load image. Please try a different file.');
                img.src = dataUrl;
            } catch (err) {
                console.error('Failed to process file', err);
                alert('Failed to process file');
            }
        }

        document.getElementById('save-photo-upload-btn')?.addEventListener('click', async () => {
            if (!currentPhotoUploadOrderId) {
                alert('No order selected');
                return;
            }

            const fileToUpload = photoUploadFileBlob || photoUploadOriginalFile;
            if (!fileToUpload) {
                alert('Please select a file first');
                return;
            }

            try {
                let customFileName = `order-${currentPhotoUploadOrderId}.webp`;
                try {
                    let supplierName = 'Unknown';
                    const orderRes = await fetch(`/api/order-feeds/${currentPhotoUploadOrderId}`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (orderRes.ok) {
                        const order = await orderRes.json();
                        supplierName = order.company_name || order.supplier_name || 'Unknown';
                        if (supplierName === 'Unknown' && order.supplier_id) {
                            try {
                                const supRes = await fetch(`/api/feeds-suppliers/code/${encodeURIComponent(order.supplier_id)}`, {
                                    headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                                });
                                if (supRes.ok) {
                                    const supplier = await supRes.json();
                                    supplierName = supplier.company_name || supplier.supplier_name || 'Unknown';
                                }
                            } catch (err) {
                                console.error('Failed to fetch supplier for filename', err);
                            }
                        }
                        const invoice = order.sales_invoice || 'NoInvoice';
                        const dateStr = formatDate(order.date);
                        const safeSupplier = supplierName.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
                        const safeInvoice = invoice.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
                        const safeDate = dateStr.replace(/[^0-9]/g, '_');
                        customFileName = `${safeSupplier} - ${safeInvoice} - ${safeDate}.webp`;
                    }
                } catch (err) {
                    console.error('Failed to fetch order for filename', err);
                }

                const formData = new FormData();
                formData.append('file', fileToUpload, customFileName);
                const uploadRes = await fetch(`/api/order-feeds/${currentPhotoUploadOrderId}/photo`, {
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

                const modal = document.getElementById('photo-upload-modal');
                if (modal) {
                    modal.classList.add('hidden');
                }

                await loadFeedsTransactionTable();
                alert('Photo uploaded successfully');
            } catch (err) {
                console.error('Failed to upload photo', err);
                alert(err.message || 'Failed to upload photo');
            }
        });

        const removePhotoBtn = document.getElementById('remove-photo-upload-btn');
        if (removePhotoBtn) {
            removePhotoBtn.addEventListener('click', async () => {
                if (!currentPhotoUploadOrderId) {
                    alert('No order selected');
                    return;
                }
                try {
                    const res = await fetch(`/api/order-feeds/${encodeURIComponent(currentPhotoUploadOrderId)}/photo`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        }
                    });
                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to remove photo');
                    }
                    const modal = document.getElementById('photo-upload-modal');
                    if (modal) {
                        modal.classList.add('hidden');
                    }
                    await loadFeedsTransactionTable();
                    alert('Photo removed successfully');
                } catch (err) {
                    console.error('Failed to remove photo', err);
                    alert(err.message || 'Failed to remove photo');
                }
            });
        }

    const recordFeedsUseModal = document.getElementById('record-feeds-use-modal');
    const recordFeedsUseBtn = document.getElementById('record-feeds-use-btn');

    const populateRowData = async () => {
        const tbody = document.getElementById('feeds-use-tbody');
        if (!tbody) return;
        try {
            const buildingsRes = await fetch('/api/layer-buildings-reports/buildings/active', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            const buildings = buildingsRes.ok ? await buildingsRes.json() : [];
            
            tbody.innerHTML = '';
            if (!buildings.length) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: #999;">No active buildings</td></tr>';
                return;
            }
            
            const categoryOptions = [
                `<option value="">Select Category</option>`,
                `<option value="Pre-Lay">Pre-Lay</option>`,
                `<option value="Layer 1">Layer 1</option>`,
                `<option value="Layer 2">Layer 2</option>`
            ].join('');
            
            buildings.forEach(b => {
                const tr = document.createElement('tr');
                tr.dataset.buildingId = b.building_id || '';
                tr.innerHTML = `
                    <td><div class="building-name-cell">${b.building_name}</div></td>
                    <td><select class="modal-input feeds-type-select"><option value="">Select Category</option>${categoryOptions}</select></td>
                    <td><div style="padding: 6px 8px; font-size: 13px; color: #1a1f2e;">Kilos</div></td>
                    <td><input type="number" class="modal-input" placeholder="Qty" /></td>
                    <td><input type="text" class="modal-input" placeholder="Driver" /></td>
                    <td><input type="time" class="modal-input" /></td>
                `;
                tbody.appendChild(tr);
            });
        } catch (err) {
            console.error('Failed to load row data for feeds use', err);
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
        }
    };

    if (recordFeedsUseBtn && recordFeedsUseModal) {
        recordFeedsUseBtn.addEventListener('click', async () => {
            await populateRowData();
            recordFeedsUseModal.classList.remove('hidden');
        });
    }

    const closeRecordFeedsUseModal = document.getElementById('close-record-feeds-use-modal');
    if (closeRecordFeedsUseModal && recordFeedsUseModal) {
        closeRecordFeedsUseModal.addEventListener('click', () => {
            recordFeedsUseModal.classList.add('hidden');
        });
    }

    if (recordFeedsUseModal) {
        recordFeedsUseModal.addEventListener('click', (e) => {
            if (e.target === recordFeedsUseModal) {
                recordFeedsUseModal.classList.add('hidden');
            }
        });
    }

    const saveFeedsUseBtn = document.getElementById('save-feeds-use-btn');
    if (saveFeedsUseBtn) {
        saveFeedsUseBtn.addEventListener('click', async () => {
            const tbody = document.getElementById('feeds-use-tbody');
            if (!tbody) return;

            const rows = Array.from(tbody.querySelectorAll('tr'));
            const validRows = rows.filter(row => {
                const category = row.querySelector('.feeds-type-select')?.value;
                const qty = row.querySelector('input[placeholder="Qty"]')?.value;
                return category && qty && parseFloat(qty) > 0;
            });

            if (validRows.length === 0) {
                alert('Please fill in at least one row with Category and Quantity');
                return;
            }

            try {
                const feedInventoryRows = validRows.map((row, index) => {
                    const category = row.querySelector('.feeds-type-select').value;
                    const quantity = parseFloat(row.querySelector('input[placeholder="Qty"]').value) || 0;
                    const driver = row.querySelector('input[placeholder="Driver"]')?.value || null;
                    const feedTime = row.querySelector('input[placeholder="Time"]')?.value || null;
                    const buildingId = row.dataset.buildingId || '';

                    return {
                        source_type: 'consumption',
                        building_tracking_receipt: `B-${buildingId}`,
                        category: category,
                        unit: 'Kilos',
                        quantity: quantity,
                        driver: driver,
                        feed_time: feedTime,
                        status: 'Pending'
                    };
                });

                const res = await fetch('/api/feed-inventory/bulk', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({ rows: feedInventoryRows })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save feed consumption');
                }

                await loadFeedInventorySummary();
                alert('Feeds consumed recorded successfully');
                document.getElementById('record-feeds-use-modal').classList.add('hidden');
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });
    }
}

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'purchasing';
    const render = ModuleComponents[currentTab] || ModuleComponents['purchasing'];
    render(contentArea);
}
