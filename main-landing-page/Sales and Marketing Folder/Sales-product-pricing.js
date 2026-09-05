if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

var defaultSelectedPriceListProducts = ['J - Case', 'XL - Case', 'L - Case', 'M - Case', 'S - Case', 'XS - Case', 'PW - Case', 'NW - Case'];
var selectedPriceListProducts = [...defaultSelectedPriceListProducts];
var selectedPriceListCustomers = ['Cha-cha Eggs Wholesaling', 'COR Egg Distribution', 'Eggworks distribution Inc.', 'Ignalig Egg Company', "Lazaro's Egg Trading"];

ModuleComponents['sales-product-pricing'] = (container) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const series = [
        { label: 'NW', color: '#e74c3c', data: [1200, 1250, 1230, 1300, 1280, 1320, 1310, 1350] },
        { label: 'PW', color: '#e67e22', data: [1250, 1280, 1300, 1320, 1340, 1330, 1360, 1380] },
        { label: 'XS', color: '#f1c40f', data: [1100, 1120, 1150, 1140, 1180, 1170, 1200, 1190] },
        { label: 'S',  color: '#2ecc71', data: [1300, 1320, 1340, 1330, 1360, 1380, 1370, 1400] },
        { label: 'M',  color: '#1abc9c', data: [1400, 1420, 1410, 1450, 1440, 1470, 1460, 1500] },
        { label: 'L',  color: '#3498db', data: [1500, 1520, 1540, 1530, 1560, 1550, 1580, 1600] },
        { label: 'XL', color: '#9b59b6', data: [1600, 1620, 1610, 1650, 1640, 1670, 1660, 1700] },
        { label: 'J', color: '#34495e', data: [1700, 1720, 1710, 1750, 1740, 1770, 1760, 1800] }
    ];
    const W = 760, H = 260, mL = 60, mR = 5, mT = 20, mB = 30;
    const plotW = W - mL - mR, plotH = H - mT - mB, yMin = 500, yMax = 3000;
    const yx = v => mT + plotH * (1 - (v - yMin) / (yMax - yMin));
    const xx = i => mL + (i / (months.length - 1)) * plotW;

    let grid = '';
    [1000, 2000, 3000].forEach(v => {
        const y = yx(v);
        grid += `<line x1="${mL}" y1="${y}" x2="${mL + plotW}" y2="${y}" stroke="#D6D6D6" stroke-width="1"/>`;
        grid += `<text x="${mL - 10}" y="${y + 4}" text-anchor="end" font-size="14" font-weight="600" fill="#1a1f2e">₱${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</text>`;
    });

    let xlabels = '';
    months.forEach((m, i) => {
        xlabels += `<text x="${xx(i)}" y="${H - mB + 20}" text-anchor="middle" font-size="14" font-weight="600" fill="#1a1f2e">${m}</text>`;
    });

    let lines = '';
    series.forEach(s => {
        const pts = s.data.map((v, i) => `${xx(i)},${yx(v)}`).join(' ');
        lines += `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2"/>`;
    });
    
    const svg = `<svg viewBox="0 0 ${W} ${H}" class="egg-price-chart" preserveAspectRatio="none" width="100%" height="100%">${grid}${xlabels}${lines}</svg>`;
    const legend = series.map(s => `<span class="chart-legend-item"><span class="chart-legend-swatch" style="background:${s.color}"></span>${s.label}</span>`).join('');

    container.innerHTML = `
        <div class="header-actions">
            <h2>Product and Pricing</h2>
        </div>
        <div class="action-buttons-row">
            <button id="change-egg-price-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span class="btn-label">Change Egg Price</span>
            </button>
            <button id="add-remove-product-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span class="btn-label">Add/Remove Product</span>
            </button>
            <button id="upload-change-price-btn" class="btn-icon-circle" style="background-color: #1ea672; color: #fff;">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span class="btn-label">Upload Change Price (Admin)</span>
            </button>
        </div>

        <div id="bulk-upload-price-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 1200px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Upload Change Price</h3>
                    <button id="close-bulk-upload-price-btn" class="modal-close-btn" title="Close">&times;</button>
                </div>
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div id="bulk-price-drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 40px 20px; text-align: center; background: #f8fafc; transition: border-color 0.2s, background 0.2s; cursor: pointer; flex: 0 0 320px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px;">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <p style="margin: 12px 0 4px; font-size: 16px; font-weight: 600; color: #1a1f2e;">Drag and drop Excel/CSV file here</p>
                            <p style="margin: 0; font-size: 13px; color: #64748b;">or click to browse</p>
                            <input type="file" id="bulk-price-file-input" accept=".xlsx,.xls,.csv" style="display: none;">
                            <p id="bulk-price-file-name" style="margin-top: 12px; font-size: 14px; color: #2563eb; font-weight: 600;"></p>
                        </div>
                        <div id="bulk-price-preview" style="flex: 1; overflow: auto; max-height: 420px; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; display: none;">
                            <div style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Preview</div>
                            <div id="bulk-price-preview-table" style="overflow-x: auto;"></div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button id="download-price-template-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Download Template</button>
                        <button id="cancel-bulk-upload-price-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Cancel</button>
                        <button id="save-bulk-price-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card shipping-box price-list-box">
            <div class="chart-header-row">
                <h3>Updated Price List</h3>
                <div class="chart-controls">
                    <button type="button" id="price-list-customer-btn" class="btn-primary">Customers</button>
                    <button type="button" id="price-list-products-btn" class="btn-primary">Products</button>
                </div>
            </div>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead id="price-list-thead">
                    </thead>
                    <tbody id="price-list-body">
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card shipping-box egg-price-history-box">
            <div class="chart-header-row">
                <h3>Egg Price History Chart</h3>
                <div class="chart-controls">
                    <select id="chart-customer" class="modal-select">
                        <option value="">Select customer...</option>
                    </select>
                    <button type="button" id="choose-item-btn" class="btn-primary">Choose Item</button>
                    <input type="date" id="chart-date-from" class="modal-select">
                    <input type="date" id="chart-date-to" class="modal-select">
                </div>
            </div>
            <div class="chart-wrap">
                ${svg}
            </div>
            <div class="chart-legend">
                ${legend}
            </div>
        </div>
        <div class="products-row">
            <div class="card shipping-box products-box">
                <h3>Products</h3>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product</th>
                                <th>Remarks</th>
                                <th>No. of Eggs</th>
                                <th>Egg Trays Used</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="products-table-body"></tbody>
                    </table>
                </div>
                <div class="pagination">
                    <button class="page-btn">&laquo; Prev</button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">Next &raquo;</button>
                </div>
            </div>
            <div class="card shipping-box egg-price-changes-box">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h3 style="margin: 0;">Egg Price changes Transaction</h3>
                    <input type="text" id="price-change-search" placeholder="Search customer..." style="padding: 6px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; width: 220px;">
                </div>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th class="sortable" data-sort="transaction_id">Transaction ID<span class="sort-arrow">⇕</span></th>
                                <th class="sortable" data-sort="date">Date<span class="sort-arrow">⇕</span></th>
                                <th>Customer</th>
                                <th>Old Price</th>
                                <th>New Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>EP-001</td><td>2026-07-01</td><td>Egg works Distribution</td><td>118.00</td><td>120.00</td></tr>
                            <tr><td>EP-002</td><td>2026-07-02</td><td>Charlene ORtega</td><td>123.00</td><td>125.00</td></tr>
                            <tr><td>EP-003</td><td>2026-07-03</td><td>Ermilan Ignalig</td><td>116.00</td><td>118.00</td></tr>
                            <tr><td>EP-004</td><td>2026-07-04</td><td>Others</td><td>132.00</td><td>134.00</td></tr>
                            <tr><td>EP-005</td><td>2026-07-05</td><td>bobot</td><td>138.00</td><td>140.00</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="pagination">
                    <button class="page-btn">&laquo; Prev</button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">Next &raquo;</button>
                </div>
            </div>
        </div>
        <div id="product-modal" class="modal" style="display:none;">
            <div class="modal-content egg-products-modal">
                <div class="modal-header-row">
                    <h3>Product Management</h3>
                    <button class="modal-close-btn" id="close-product-modal">&times;</button>
                </div>
                <div class="modal-tabs">
                    <button class="modal-tab active" data-tab="add-product">Add New Product</button>
                    <button class="modal-tab" data-tab="edit-product">Edit/Remove Products</button>
                </div>
                <div class="modal-tab-panel" id="panel-add-product">
                    <label>Product ID</label>
                    <input type="text" id="new-product-id" readonly>
                    <label>Product Name</label>
                    <input type="text" id="new-product-name" placeholder="Enter product name">
                    <label>Remarks</label>
                    <input type="text" id="new-product-remarks" placeholder="Enter remarks">
                    <label>No. of Eggs</label>
                    <input type="number" id="new-product-no-of-eggs" placeholder="0" step="1">
                    <label>Egg Trays Used</label>
                    <input type="number" id="new-product-egg-trays" placeholder="0.00" step="0.01">
                    <label>Status</label>
                    <select id="new-product-status" class="modal-select">
                        <option value="Active">Active</option>
                        <option value="Terminated">Terminated</option>
                    </select>
                    <div class="modal-tab-actions">
                        <button class="btn-primary" id="save-new-product">Save</button>
                    </div>
                </div>
                <div class="modal-tab-panel" id="panel-edit-product" style="display:none;">
                    <label>Product Name</label>
                    <select id="edit-product-name" class="modal-select">
                        <option value="">Select product...</option>
                    </select>
                    <label>Product ID</label>
                    <input type="text" id="edit-product-id" readonly>
                    <label>Remarks</label>
                    <input type="text" id="edit-product-remarks">
                    <label>No. of Eggs</label>
                    <input type="number" id="edit-product-no-of-eggs" step="1">
                    <label>Egg Trays Used</label>
                    <input type="number" id="edit-product-egg-trays" step="0.01">
                    <label>Status</label>
                    <select id="edit-product-status" class="modal-select">
                        <option value="Active">Active</option>
                        <option value="Terminated">Terminated</option>
                    </select>
                    <div class="modal-tab-actions">
                        <button class="btn-primary" id="save-edit-product">Save</button>
                        <button class="btn-danger" id="delete-product">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="change-price-modal" class="modal change-price-modal" style="display:none;">
            <div class="modal-content egg-products-modal">
                <div class="modal-header-row">
                    <h3>Change Product Prices</h3>
                    <button class="modal-close-btn" id="close-change-price-modal">&times;</button>
                </div>
                <label>Choose Customer</label>
                <div style="display: flex; gap: 8px; align-items: flex-end;">
                    <select id="change-price-customer" class="modal-select" style="flex: 1;">
                        <option value="">Select customer...</option>
                    </select>
                    <button type="button" id="insert-case-btn" class="btn-primary" style="height: 42px; padding: 0 16px; white-space: nowrap;">Insert Case</button>
                </div>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Old Price</th>
                                <th>Date Changed</th>
                                <th>New Price</th>
                            </tr>
                        </thead>
                        <tbody id="change-price-items-body">
                        </tbody>
                    </table>
                </div>
                <div class="modal-tab-actions">
                    <button class="btn-primary" id="save-change-price">Save</button>
                </div>
            </div>
        </div>
        <div id="chart-item-modal" class="modal" style="display:none;">
            <div class="modal-content egg-products-modal">
                <div class="modal-header-row">
                    <h3>Choose Items</h3>
                    <button class="modal-close-btn" id="close-chart-item-modal">&times;</button>
                </div>
                <div class="modal-tabs">
                    <button class="modal-tab active" data-tab="case-products">Case</button>
                    <button class="modal-tab" data-tab="tray-products">Tray</button>
                    <button class="modal-tab" data-tab="crack-products">Crack</button>
                    <button class="modal-tab" data-tab="dirty-products">Dirty</button>
                    <button class="modal-tab" data-tab="culls-products">Culls</button>
                    <button class="modal-tab" data-tab="other-products">Others</button>
                </div>
                <div class="modal-tab-panel" id="panel-case-products">
                    <div class="product-checkbox-list" id="case-products-list"></div>
                </div>
                <div class="modal-tab-panel" id="panel-tray-products" style="display:none;">
                    <div class="product-checkbox-list" id="tray-products-list"></div>
                </div>
                <div class="modal-tab-panel" id="panel-crack-products" style="display:none;">
                    <div class="product-checkbox-list" id="crack-products-list"></div>
                </div>
                <div class="modal-tab-panel" id="panel-dirty-products" style="display:none;">
                    <div class="product-checkbox-list" id="dirty-products-list"></div>
                </div>
                <div class="modal-tab-panel" id="panel-culls-products" style="display:none;">
                    <div class="product-checkbox-list" id="culls-products-list"></div>
                </div>
                <div class="modal-tab-panel" id="panel-other-products" style="display:none;">
                    <div class="product-checkbox-list" id="other-products-list"></div>
                </div>
                <div class="modal-tab-actions">
                    <button class="btn-primary" id="save-chart-items">Save</button>
                </div>
            </div>
        </div>
        <div id="price-list-products-modal" class="modal" style="display:none;">
            <div class="modal-content egg-products-modal">
                <div class="modal-header-row">
                    <h3>Choose Products</h3>
                    <button class="modal-close-btn" id="close-price-list-products-modal">&times;</button>
                </div>
                <div class="product-checkbox-list" id="price-list-products-list"></div>
                <div class="modal-tab-actions">
                    <button class="btn-primary" id="save-price-list-products">Save</button>
                </div>
            </div>
        </div>
        <div id="price-list-customer-modal" class="modal" style="display:none;">
            <div class="modal-content egg-products-modal">
                <div class="modal-header-row">
                    <h3>Choose Customers (max 5)</h3>
                    <button class="modal-close-btn" id="close-price-list-customer-modal">&times;</button>
                </div>
                <div class="product-checkbox-list" id="price-list-customers-list"></div>
                <div class="modal-tab-actions">
                    <button class="btn-primary" id="save-price-list-customers">Save</button>
                </div>
            </div>
        </div>
    `;
};

var API_BASE = '/api/products';
var API_BASE_CUSTOMERS = '/api/customers';
var API_BASE_PRICE_CHANGES = '/api/price-changes';

var priceChangeSortColumn = 'transaction_id';
var priceChangeSortDirection = 'asc';
var priceChangeSearchQuery = '';

function getAuthHeaders() {
    const token = localStorage.getItem('goldenfield_auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function loadProductsForEdit() {
    try {
        const res = await fetch(`${API_BASE}`, { headers: getAuthHeaders() });
        const products = await res.json();
        const productSelect = document.getElementById('edit-product-name');
        if (!productSelect) return;
        productSelect.innerHTML = '<option value="">Select product...</option>';
        products.forEach(p => {
            const option = document.createElement('option');
            option.value = p.product_id;
            option.textContent = p.product;
            productSelect.appendChild(option);
        });
    } catch (err) {
        console.error('Failed to load products', err);
    }
}

async function getNextProductId() {
    try {
        const res = await fetch(`${API_BASE}/next-id`, { headers: getAuthHeaders() });
        const data = await res.json();
        return data.product_id;
    } catch (err) {
        console.error('Failed to get next product ID', err);
        return 'ProID-0001';
    }
}

var currentProductPage = 1;
var PRODUCTS_PER_PAGE = 12;

async function loadProductsTable(page = 1) {
    currentProductPage = page;
    const tbody = document.getElementById('products-table-body');
    const paginationContainer = document.querySelector('.products-box .pagination');
    if (!tbody || !paginationContainer) return;
    try {
        const res = await fetch(`${API_BASE}`, { headers: getAuthHeaders() });
        const products = await res.json();
        const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE) || 1;
        const start = (page - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;
        const pageProducts = products.slice(start, end);
        
        tbody.innerHTML = pageProducts.map(p => `
            <tr>
                <td>${p.product_id}</td>
                <td>${p.product}</td>
                <td>${p.remarks || ''}</td>
                <td>${p.no_of_eggs || 0}</td>
                <td>${p.egg_tray_used || 0}</td>
                <td>${p.status}</td>
            </tr>
        `).join('');
        
        const emptyRows = PRODUCTS_PER_PAGE - pageProducts.length;
        for (let i = 0; i < emptyRows; i++) {
            tbody.innerHTML += `<tr><td colspan="6">&nbsp;</td></tr>`;
        }
        
        let paginationHTML = '';
        paginationHTML += `<button class="page-btn" ${page === 1 ? 'disabled' : ''} onclick="loadProductsTable(${page - 1})">&laquo; Prev</button>`;
        
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<button class="page-btn ${i === page ? 'active' : ''}" onclick="loadProductsTable(${i})">${i}</button>`;
        }
        
        paginationHTML += `<button class="page-btn" ${page === totalPages ? 'disabled' : ''} onclick="loadProductsTable(${page + 1})">Next &raquo;</button>`;
        
        paginationContainer.innerHTML = paginationHTML;
    } catch (err) {
        console.error('Failed to load products table', err);
        tbody.innerHTML = '<tr><td colspan="6">No products found</td></tr>';
    }
}

function initializeProductModal() {
    const modal = document.getElementById('product-modal');
    const openBtn = document.getElementById('add-remove-product-btn');
    const closeBtn = document.getElementById('close-product-modal');
    const tabs = modal.querySelectorAll('.modal-tab');
    const panels = {
        'add-product': document.getElementById('panel-add-product'),
        'edit-product': document.getElementById('panel-edit-product')
    };

    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', async () => {
        modal.style.display = 'flex';
        document.getElementById('new-product-id').value = await getNextProductId();
        document.getElementById('new-product-name').value = '';
        document.getElementById('new-product-remarks').value = '';
        document.getElementById('new-product-no-of-eggs').value = '';
        document.getElementById('new-product-egg-trays').value = '';
        document.getElementById('new-product-status').value = 'Active';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            Object.values(panels).forEach(p => p.style.display = 'none');
            panels[tab.dataset.tab].style.display = 'flex';
        });
    });

    loadProductsForEdit();

    const productSelect = document.getElementById('edit-product-name');
    productSelect.addEventListener('change', async function() {
        const pid = this.value;
        if (!pid) return;
        try {
            const res = await fetch(`${API_BASE}/${pid}`, { headers: getAuthHeaders() });
            const data = await res.json();
            document.getElementById('edit-product-id').value = data.product_id;
            document.getElementById('edit-product-remarks').value = data.remarks;
            document.getElementById('edit-product-no-of-eggs').value = data.no_of_eggs;
            document.getElementById('edit-product-egg-trays').value = data.egg_tray_used;
            document.getElementById('edit-product-status').value = data.status;
        } catch (err) {
            console.error('Failed to load product', err);
        }
    });

    document.getElementById('save-new-product').addEventListener('click', async () => {
        const productId = document.getElementById('new-product-id').value;
        const product = document.getElementById('new-product-name').value;
        const remarks = document.getElementById('new-product-remarks').value;
        const noOfEggs = document.getElementById('new-product-no-of-eggs').value || 0;
        const eggTrays = document.getElementById('new-product-egg-trays').value || 0;
        const status = document.getElementById('new-product-status').value;

        if (!product) return alert('Product Name is required');

        try {
            const res = await fetch(`${API_BASE}`, {
                method: 'POST',
                headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id: productId, product, remarks, no_of_eggs: noOfEggs, egg_tray_used: eggTrays, status })
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${res.status}`);
            }
            alert('New product saved: ' + product);
            modal.style.display = 'none';
            loadProductsForEdit();
            loadProductsTable(1);
        } catch (err) {
            console.error('Failed to save product', err);
            alert('Error saving product: ' + err.message);
        }
    });

    document.getElementById('save-edit-product').addEventListener('click', async () => {
        const productId = document.getElementById('edit-product-id').value;
        const productSelect = document.getElementById('edit-product-name');
        const product = productSelect.selectedOptions[0].textContent.trim();
        const remarks = document.getElementById('edit-product-remarks').value;
        const noOfEggs = document.getElementById('edit-product-no-of-eggs').value || 0;
        const eggTrays = document.getElementById('edit-product-egg-trays').value || 0;
        const status = document.getElementById('edit-product-status').value;

        if (!productSelect.value) return alert('Please select a product');

        try {
            const res = await fetch(`${API_BASE}/${productId}`, {
                method: 'PUT',
                headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ product, remarks, no_of_eggs: noOfEggs, egg_tray_used: eggTrays, status })
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${res.status}`);
            }
            alert('Product updated: ' + product);
            modal.style.display = 'none';
            loadProductsForEdit();
            loadProductsTable(1);
        } catch (err) {
            console.error('Failed to update product', err);
            alert('Error updating product: ' + err.message);
        }
    });

    document.getElementById('delete-product').addEventListener('click', async () => {
        const productId = document.getElementById('edit-product-id').value;
        const product = document.getElementById('edit-product-name').value;

        if (!product) return alert('Please select a product');
        if (confirm('Delete ' + product + '?')) {
            try {
                await fetch(`${API_BASE}/${productId}`, { method: 'DELETE', headers: getAuthHeaders() });
                alert('Product deleted');
                modal.style.display = 'none';
                loadProductsForEdit();
                loadProductsTable(1);
            } catch (err) {
                console.error('Failed to delete product', err);
                alert('Error deleting product');
            }
        }
    });
}

async function loadActiveCustomers() {
    try {
        const res = await fetch(`${API_BASE_CUSTOMERS}/active`, { headers: getAuthHeaders() });
        const customers = await res.json();
        const select = document.getElementById('change-price-customer');
        if (!select) return;
        select.innerHTML = '<option value="">Select customer...</option>';
        customers.forEach(c => {
            const option = document.createElement('option');
            option.value = c.customer_id;
            option.textContent = c.company || c.customer_id;
            select.appendChild(option);
        });
    } catch (err) {
        console.error('Failed to load active customers', err);
    }
}

async function getNextPriceChangeId() {
    try {
        const res = await fetch(`${API_BASE_PRICE_CHANGES}/next-id`, { headers: getAuthHeaders() });
        const data = await res.json();
        return data.transaction_id;
    } catch (err) {
        console.error('Failed to get next price change ID', err);
        return 'EpCh-000001';
    }
}

async function loadActiveProducts() {
    try {
        const res = await fetch(`${API_BASE}`, { headers: getAuthHeaders() });
        const products = await res.json();
        const selects = document.querySelectorAll('.change-price-product');
        selects.forEach(select => {
            select.innerHTML = '<option value="">Select product...</option>';
            products.filter(p => p.status === 'Active').forEach(p => {
                const option = document.createElement('option');
                option.value = p.product;
                option.textContent = p.product;
                option.dataset.price = p.egg_tray_used || 0;
                select.appendChild(option);
            });
        });
    } catch (err) {
        console.error('Failed to load products', err);
    }
}

async function loadLastPriceChange(row) {
    const customerId = document.getElementById('change-price-customer').value;
    const productSelect = row.querySelector('.change-price-product');
    const oldPriceInput = row.querySelector('.change-price-old-price');
    const dateInput = row.querySelector('.change-price-date');
    const product = productSelect.value;
    
    if (!customerId || !product) {
        oldPriceInput.value = '';
        dateInput.value = '';
        return;
    }
    
    try {
        const selectedOption = document.getElementById('change-price-customer').selectedOptions[0];
        const customerName = selectedOption ? selectedOption.textContent.trim() : customerId;
        
        const res = await fetch(`${API_BASE_PRICE_CHANGES}/last?customer=${encodeURIComponent(customerName)}&product=${encodeURIComponent(product)}`, { headers: getAuthHeaders() });
        const data = await res.json();
        
        if (data.old_price !== undefined) {
            oldPriceInput.value = data.old_price;
        } else {
            oldPriceInput.value = '0';
        }
        
        if (data.date) {
            const dateObj = new Date(data.date);
            const formattedDate = dateObj.toISOString().split('T')[0];
            dateInput.value = formattedDate;
        } else {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    } catch (err) {
        console.error('Failed to load last price change', err);
        oldPriceInput.value = '0';
        dateInput.value = new Date().toISOString().split('T')[0];
    }
}

async function insertCaseProducts() {
    try {
        const res = await fetch(`${API_BASE}`, { headers: getAuthHeaders() });
        const products = await res.json();
        const caseProducts = products.filter(p => p.status === 'Active' && p.product.toLowerCase().includes('case'));
        
        if (caseProducts.length === 0) {
            alert('No active products with "Case" found');
            return;
        }
        
        const rows = document.querySelectorAll('#change-price-items-body tr');
        const today = new Date().toISOString().split('T')[0];
        
        caseProducts.forEach((product, index) => {
            if (index >= rows.length) return;
            
            const row = rows[index];
            const productSelect = row.querySelector('.change-price-product');
            const oldPriceInput = row.querySelector('.change-price-old-price');
            const dateInput = row.querySelector('.change-price-date');
            
            productSelect.value = product.product;
            
            const selectedOption = document.getElementById('change-price-customer').selectedOptions[0];
            const customerName = selectedOption ? selectedOption.textContent.trim() : '';
            
            if (customerName) {
                fetch(`${API_BASE_PRICE_CHANGES}/last?customer=${encodeURIComponent(customerName)}&product=${encodeURIComponent(product.product)}`, { headers: getAuthHeaders() })
                    .then(res => res.json())
                    .then(data => {
                        if (data.old_price !== undefined) {
                            oldPriceInput.value = data.old_price;
                        } else {
                            oldPriceInput.value = '0';
                        }
                        
                        if (data.date) {
                            const dateObj = new Date(data.date);
                            const formattedDate = dateObj.toISOString().split('T')[0];
                            dateInput.value = formattedDate;
                        } else {
                            dateInput.value = '';
                        }
                    })
                    .catch(() => {
                        oldPriceInput.value = '0';
                        dateInput.value = '';
                    });
            } else {
                oldPriceInput.value = '0';
                dateInput.value = '';
            }
        });
        
        alert(`Inserted ${caseProducts.length} Case product(s)`);
    } catch (err) {
        console.error('Failed to insert case products', err);
        alert('Error inserting case products');
    }
}

var selectedChartProducts = [];
var chartColors = {
    'NW - Case': '#e74c3c',
    'PW - Case': '#e67e22',
    'XS - Case': '#f1c40f',
    'S - Case': '#2ecc71',
    'M - Case': '#1abc9c',
    'L - Case': '#3498db',
    'XL - Case': '#9b59b6',
    'J - Case': '#34495e',
    'NW - Tray': '#e74c3c',
    'PW - Tray': '#e67e22',
    'XS - Tray': '#f1c40f',
    'S - Tray': '#2ecc71',
    'M - Tray': '#1abc9c',
    'L - Tray': '#3498db',
    'XL - Tray': '#9b59b6',
    'J - Tray': '#34495e',
    'Crack ( Good )': '#e74c3c',
    'Crack ( Small )': '#e67e22',
    'Crack ( Bad )': '#f1c40f',
    'Dirty ( Medium )': '#2ecc71',
    'Dirty ( Small )': '#1abc9c',
    'Dirty Kahon ( Medium )': '#3498db',
    'Dirty Kahon ( Small )': '#9b59b6',
    'Plastic Eggs': '#34495e',
    'Culls ( Good )': '#e74c3c',
    'Culls ( Reject )': '#e67e22',
    'Chicken Dung ( Good )': '#f1c40f',
    'Tray ( New )': '#2ecc71',
    'Tray ( Old )': '#1abc9c'
};

async function loadChartCustomers() {
    try {
        const res = await fetch(`${API_BASE_CUSTOMERS}/active`, { headers: getAuthHeaders() });
        const customers = await res.json();
        const select = document.getElementById('chart-customer');
        if (!select) return;
        select.innerHTML = '<option value="">Select customer...</option>';
        customers.forEach(c => {
            const option = document.createElement('option');
            option.value = c.customer_id;
            option.textContent = c.company || c.customer_id;
            select.appendChild(option);
        });
        
        loadChartPreferences();
    } catch (err) {
        console.error('Failed to load chart customers', err);
    }
}

function openChartItemModal() {
    const modal = document.getElementById('chart-item-modal');
    if (modal) {
        modal.style.display = 'flex';
        loadChartProductCheckboxes();
    }
}

function loadChartProductCheckboxes() {
    const categories = {
        'case': document.getElementById('case-products-list'),
        'tray': document.getElementById('tray-products-list'),
        'crack': document.getElementById('crack-products-list'),
        'dirty': document.getElementById('dirty-products-list'),
        'culls': document.getElementById('culls-products-list'),
        'other': document.getElementById('other-products-list')
    };

    Object.values(categories).forEach(container => {
        if (container) container.innerHTML = '';
    });

    fetch(`${API_BASE}`, { headers: getAuthHeaders() })
        .then(res => res.json())
        .then(products => {
            products.filter(p => p.status === 'Active').forEach(product => {
                const name = product.product;
                let category = 'other';
                if (name.toLowerCase().includes('case')) category = 'case';
                else if (name.toLowerCase().includes('tray')) category = 'tray';
                else if (name.toLowerCase().includes('crack')) category = 'crack';
                else if (name.toLowerCase().includes('dirty') || name.toLowerCase().includes('kahon')) category = 'dirty';
                else if (name.toLowerCase().includes('culls')) category = 'culls';

                const container = categories[category];
                if (!container) return;

                const item = document.createElement('div');
                item.className = 'product-checkbox-item';
                item.innerHTML = `
                    <input type="checkbox" id="chart-product-${name.replace(/[^a-zA-Z0-9]/g, '')}" value="${name}" ${selectedChartProducts.includes(name) ? 'checked' : ''}>
                    <label for="chart-product-${name.replace(/[^a-zA-Z0-9]/g, '')}">${name}</label>
                `;
                container.appendChild(item);
            });
        })
        .catch(err => console.error('Failed to load products for chart', err));
}

function saveChartItems() {
    const checkboxes = document.querySelectorAll('#chart-item-modal input[type="checkbox"]:checked');
    selectedChartProducts = Array.from(checkboxes).map(cb => cb.value);
    document.getElementById('chart-item-modal').style.display = 'none';
    updateChart();
    saveChartPreferences();
}

function generateChartMonths(dateFrom, dateTo) {
    const months = [];
    const from = new Date(dateFrom || '2020-01-01');
    const to = new Date(dateTo || new Date().toISOString().split('T')[0]);
    
    let current = new Date(from.getFullYear(), from.getMonth(), 1);
    while (current <= to) {
        months.push({
            label: current.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
            value: current.toISOString().split('T')[0]
        });
        current.setMonth(current.getMonth() + 1);
    }
    
    return months;
}

function getChartXLabels(dateFrom, dateTo) {
    const from = new Date(dateFrom || '2020-01-01');
    const to = new Date(dateTo || new Date().toISOString().split('T')[0]);
    
    const labels = [];
    for (let i = 0; i < 6; i++) {
        const d = new Date(from.getTime() + (to.getTime() - from.getTime()) * (i / 5));
        labels.push({
            label: d.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
            value: d.toISOString().split('T')[0]
        });
    }
    
    return labels;
}

async function updateChart() {
    const customerId = document.getElementById('chart-customer').value;
    const dateFrom = document.getElementById('chart-date-from').value;
    const dateTo = document.getElementById('chart-date-to').value;
    
    if (!customerId || selectedChartProducts.length === 0) return;
    
    const selectedOption = document.getElementById('chart-customer').selectedOptions[0];
    const customerName = selectedOption ? selectedOption.textContent.trim() : customerId;
    
    try {
        const res = await fetch(`${API_BASE_PRICE_CHANGES}/history?customer=${encodeURIComponent(customerName)}&products=${selectedChartProducts.map(encodeURIComponent).join(',')}&dateFrom=${dateFrom}&dateTo=${dateTo}`, { headers: getAuthHeaders() });
        const history = await res.json();
        
        const xLabels = getChartXLabels(dateFrom, dateTo);
        
        const allProductHistory = selectedChartProducts.map(product => {
            const productHistory = history.filter(h => h.product === product).sort((a, b) => new Date(a.date) - new Date(b.date));
            return {
                label: product,
                color: chartColors[product] || '#333333',
                points: productHistory
            };
        });
        
        renderChart(xLabels.map(l => l.label), allProductHistory, dateFrom, dateTo);
    } catch (err) {
        console.error('Failed to update chart', err);
    }
}

function renderChart(monthLabels, series, dateFrom, dateTo) {
    const W = 760, H = 260, mL = 60, mR = 5, mT = 20, mB = 30;
    const plotW = W - mL - mR, plotH = H - mT - mB;
    
    const allPoints = series.flatMap(s => s.points.filter(p => p.new_price !== null));
    const allPrices = allPoints.map(p => p.new_price);
    const yMin = allPrices.length > 0 ? Math.min(...allPrices) * 0.9 : 0;
    const yMax = allPrices.length > 0 ? Math.max(...allPrices) * 1.1 : 1000;
    const yx = v => mT + plotH * (1 - (v - yMin) / (yMax - yMin));
    
    const from = new Date(dateFrom || '2020-01-01');
    const to = new Date(dateTo || new Date().toISOString().split('T')[0]);
    const xScale = date => {
        const d = new Date(date);
        const range = to.getTime() - from.getTime() || 1;
        return mL + ((d.getTime() - from.getTime()) / range) * plotW;
    };
    
    let grid = '';
    const yValues = [yMin, yMin + (yMax - yMin) / 2, yMax];
    yValues.forEach(v => {
        const y = yx(v);
        grid += `<line x1="${mL}" y1="${y}" x2="${mL + plotW}" y2="${y}" stroke="#D6D6D6" stroke-width="1"/>`;
        grid += `<text x="${mL - 10}" y="${y + 4}" text-anchor="end" font-size="14" font-weight="600" fill="#1a1f2e">₱${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</text>`;
    });
    
    let xlabels = '';
    monthLabels.forEach((m, i) => {
        const xPos = mL + (i / (monthLabels.length - 1 || 1)) * plotW;
        xlabels += `<text x="${xPos}" y="${H - mB + 20}" text-anchor="middle" font-size="14" font-weight="600" fill="#1a1f2e">${m}</text>`;
    });
    
    let lines = '';
    let circles = '';
    series.forEach((s, seriesIndex) => {
        const pts = s.points.filter(p => p.new_price !== null).map(p => `${xScale(p.date)},${yx(p.new_price)}`).join(' ');
        if (pts) {
            lines += `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2"/>`;
        }
        
        s.points.forEach(p => {
            if (p.new_price !== null) {
                const cx = xScale(p.date);
                const cy = yx(p.new_price);
                circles += `<circle cx="${cx}" cy="${cy}" r="5" fill="${s.color}" stroke="#fff" stroke-width="2" data-series="${seriesIndex}" data-date="${p.date}" data-value="${p.new_price}" data-label="${s.label}" class="chart-point"/>`;
            }
        });
    });
    
    const tooltipDiv = `<div id="chart-tooltip" class="chart-tooltip" style="display:none;"></div>`;
    const svg = `<svg viewBox="0 0 ${W} ${H}" class="egg-price-chart" preserveAspectRatio="none" width="100%" height="100%">${grid}${xlabels}${lines}${circles}</svg>`;
    const legend = series.map(s => `<span class="chart-legend-item"><span class="chart-legend-swatch" style="background:${s.color}"></span>${s.label}</span>`).join('');
    
    const chartWrap = document.querySelector('.chart-wrap');
    const chartLegend = document.querySelector('.chart-legend');
    if (chartWrap) {
        chartWrap.innerHTML = svg + tooltipDiv;
        const tooltip = document.getElementById('chart-tooltip');
        const points = chartWrap.querySelectorAll('.chart-point');
        points.forEach(point => {
            point.addEventListener('mouseenter', (e) => {
                const value = e.target.dataset.value;
                const label = e.target.dataset.label;
                const date = e.target.dataset.date;
                if (tooltip) {
                    tooltip.innerHTML = `<strong>${label}</strong><br>${date}<br>₱${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    tooltip.style.display = 'block';
                    const rect = chartWrap.getBoundingClientRect();
                    tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
                    tooltip.style.top = (e.clientY - rect.top - 50) + 'px';
                }
            });
            point.addEventListener('mousemove', (e) => {
                if (tooltip) {
                    const rect = chartWrap.getBoundingClientRect();
                    tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
                    tooltip.style.top = (e.clientY - rect.top - 50) + 'px';
                }
            });
            point.addEventListener('mouseleave', () => {
                if (tooltip) tooltip.style.display = 'none';
            });
        });
    }
    if (chartLegend) chartLegend.innerHTML = legend;
    if (chartLegend) chartLegend.style.display = 'flex';
}

function generateChangePriceRows() {
    const tbody = document.getElementById('change-price-items-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <select class="change-price-product modal-select">
                    <option value="">Select product...</option>
                </select>
            </td>
            <td><input type="text" class="change-price-old-price" readonly value=""></td>
            <td><input type="text" class="change-price-date" readonly value=""></td>
            <td><input type="number" class="change-price-new-price" step="0.01" value=""></td>
        `;
        tbody.appendChild(row);
    }
    
    document.querySelectorAll('.change-price-product').forEach(select => {
        select.addEventListener('change', function() {
            const row = this.closest('tr');
            loadLastPriceChange(row);
        });
    });
}

function initializeChangePriceModal() {
    const modal = document.getElementById('change-price-modal');
    const openBtn = document.getElementById('change-egg-price-btn');
    const closeBtn = document.getElementById('close-change-price-modal');
    
    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', async () => {
        modal.style.display = 'flex';
        await loadActiveCustomers();
        generateChangePriceRows();
        await loadActiveProducts();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const insertCaseBtn = document.getElementById('insert-case-btn');
    if (insertCaseBtn) {
        insertCaseBtn.addEventListener('click', async () => {
            await insertCaseProducts();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    document.getElementById('save-change-price').addEventListener('click', async () => {
        const customerId = document.getElementById('change-price-customer').value;
        if (!customerId) return alert('Please select a customer');
        
        const selectedOption = document.getElementById('change-price-customer').selectedOptions[0];
        const customerName = selectedOption ? selectedOption.textContent.trim() : customerId;
        
        const rows = document.querySelectorAll('#change-price-items-body tr');
        let nextId = await getNextPriceChangeId();
        const today = new Date().toISOString().split('T')[0];
        
        try {
            for (const row of rows) {
                const productSelect = row.querySelector('.change-price-product');
                const oldPriceInput = row.querySelector('.change-price-old-price');
                const dateInput = row.querySelector('.change-price-date');
                const newPriceInput = row.querySelector('.change-price-new-price');
                
                const product = productSelect.value;
                const newPrice = newPriceInput.value;
                const oldPrice = oldPriceInput.value;
                const date = dateInput.value;
                
                if (!product || !newPrice) continue;
                
                const res = await fetch(`${API_BASE_PRICE_CHANGES}`, {
                    method: 'POST',
                    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        transaction_id: nextId,
                        date: date || today,
                        customer: customerName,
                        product: product,
                        old_price: oldPrice || '0',
                        new_price: newPrice
                    })
                });
                
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                
                nextId = await getNextPriceChangeId();
            }
            
            alert('Price changes saved successfully');
            modal.style.display = 'none';
            loadPriceChangesTable(1);
            loadPriceListTable();
        } catch (err) {
            console.error('Failed to save price changes', err);
            alert('Error saving price changes: ' + err.message);
        }
    });
}

var currentPriceChangePage = 1;
var PRICE_CHANGES_PER_PAGE = 12;

function formatDate(dateValue) {
    if (!dateValue) return '-';
    const d = new Date(dateValue);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function loadPriceChangesTable(page = 1) {
    currentPriceChangePage = page;
    const tbody = document.querySelector('.egg-price-changes-box tbody');
    const paginationContainer = document.querySelector('.egg-price-changes-box .pagination');
    if (!tbody || !paginationContainer) return;
    try {
        const res = await fetch(`${API_BASE_PRICE_CHANGES}`, { headers: getAuthHeaders() });
        const priceChanges = await res.json();
        
        let filtered = priceChanges || [];
        if (priceChangeSearchQuery) {
            const q = priceChangeSearchQuery.toLowerCase();
            filtered = filtered.filter(pc => (pc.customer || '').toLowerCase().includes(q));
        }
        
        const col = priceChangeSortColumn;
        const dir = priceChangeSortDirection === 'asc' ? 1 : -1;
        filtered.sort((a, b) => {
            let valA = a[col];
            let valB = b[col];
            if (col === 'date') {
                valA = new Date(valA).getTime() || 0;
                valB = new Date(valB).getTime() || 0;
            } else {
                valA = String(valA || '').toLowerCase();
                valB = String(valB || '').toLowerCase();
            }
            if (valA < valB) return -1 * dir;
            if (valA > valB) return 1 * dir;
            return 0;
        });
        
        const totalPages = Math.ceil(filtered.length / PRICE_CHANGES_PER_PAGE) || 1;
        const start = (page - 1) * PRICE_CHANGES_PER_PAGE;
        const end = start + PRICE_CHANGES_PER_PAGE;
        const pageItems = filtered.slice(start, end);
        
        tbody.innerHTML = pageItems.map(pc => `
            <tr>
                <td>${pc.transaction_id}</td>
                <td>${formatDate(pc.date)}</td>
                <td>${pc.customer}</td>
                <td>${pc.old_price}</td>
                <td>${pc.new_price}</td>
            </tr>
        `).join('');
        
        const emptyRows = PRICE_CHANGES_PER_PAGE - pageItems.length;
        for (let i = 0; i < emptyRows; i++) {
            tbody.innerHTML += `<tr><td colspan="5">&nbsp;</td></tr>`;
        }
        
        let paginationHTML = '';
        paginationHTML += `<button class="page-btn" ${page === 1 ? 'disabled' : ''} onclick="loadPriceChangesTable(${page - 1})">&laquo; Prev</button>`;
        
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<button class="page-btn ${i === page ? 'active' : ''}" onclick="loadPriceChangesTable(${i})">${i}</button>`;
        }
        
        paginationHTML += `<button class="page-btn" ${page === totalPages ? 'disabled' : ''} onclick="loadPriceChangesTable(${page + 1})">Next &raquo;</button>`;
        
        paginationContainer.innerHTML = paginationHTML;
        updatePriceChangeSortIndicators();
    } catch (err) {
        console.error('Failed to load price changes table', err);
        tbody.innerHTML = '<tr><td colspan="5">No price changes found</td></tr>';
    }
}

function updatePriceChangeSortIndicators() {
    document.querySelectorAll('.egg-price-changes-box .sortable').forEach(th => {
        const icon = th.querySelector('.sort-arrow');
        if (!icon) return;
        if (th.dataset.sort === priceChangeSortColumn) {
            icon.textContent = priceChangeSortDirection === 'asc' ? '▲' : '▼';
        } else {
            icon.textContent = '⇕';
        }
    });
}

function initializeModule(contentArea) {
    const render = ModuleComponents['sales-product-pricing'];
    render(contentArea);
    initializeProductModal();
    initializeChangePriceModal();
    loadProductsTable(1);
    loadPriceChangesTable(1);
    loadChartCustomers();
    initializeChartListeners();
    loadPriceListCustomers();
    initializePriceListListeners();
    updatePriceListHeaders();
    loadPriceListTable();

    const priceChangeSearch = document.getElementById('price-change-search');
    if (priceChangeSearch) {
        priceChangeSearch.addEventListener('input', (e) => {
            priceChangeSearchQuery = e.target.value.trim();
            loadPriceChangesTable(1);
        });
    }

    document.querySelectorAll('.egg-price-changes-box .sortable').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            if (!column) return;
            if (priceChangeSortColumn === column) {
                priceChangeSortDirection = priceChangeSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                priceChangeSortColumn = column;
                priceChangeSortDirection = 'asc';
            }
            loadPriceChangesTable(currentPriceChangePage);
        });
    });
}

function initializeChartListeners() {
    const customerSelect = document.getElementById('chart-customer');
    const dateFromInput = document.getElementById('chart-date-from');
    const dateToInput = document.getElementById('chart-date-to');
    const chooseItemBtn = document.getElementById('choose-item-btn');
    const saveChartItemsBtn = document.getElementById('save-chart-items');
    const closeChartItemModalBtn = document.getElementById('close-chart-item-modal');

    if (customerSelect) customerSelect.addEventListener('change', () => { updateChart(); saveChartPreferences(); });
    if (dateFromInput) dateFromInput.addEventListener('change', () => { updateChart(); saveChartPreferences(); });
    if (dateToInput) dateToInput.addEventListener('change', () => { updateChart(); saveChartPreferences(); });
    if (chooseItemBtn) chooseItemBtn.addEventListener('click', openChartItemModal);
    if (saveChartItemsBtn) saveChartItemsBtn.addEventListener('click', saveChartItems);
    if (closeChartItemModalBtn) closeChartItemModalBtn.addEventListener('click', () => {
        document.getElementById('chart-item-modal').style.display = 'none';
    });

    const chartModal = document.getElementById('chart-item-modal');
    if (chartModal) {
        chartModal.addEventListener('click', (e) => {
            if (e.target === chartModal) chartModal.style.display = 'none';
        });
    }

    const modalTabs = document.querySelectorAll('#chart-item-modal .modal-tab');
    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            modalTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.dataset.tab;
            document.querySelectorAll('#chart-item-modal .modal-tab-panel').forEach(panel => {
                panel.style.display = 'none';
            });
            const panel = document.getElementById(`panel-${tabName}`);
            if (panel) panel.style.display = 'block';
        });
    });
}

function saveChartPreferences() {
    const customerSelect = document.getElementById('chart-customer');
    const dateFromInput = document.getElementById('chart-date-from');
    const dateToInput = document.getElementById('chart-date-to');
    
    const prefs = {
        customer: customerSelect ? customerSelect.value : '',
        dateFrom: dateFromInput ? dateFromInput.value : '',
        dateTo: dateToInput ? dateToInput.value : '',
        products: selectedChartProducts
    };
    
    try {
        localStorage.setItem('chartPreferences', JSON.stringify(prefs));
    } catch (e) {
        console.error('Failed to save chart preferences', e);
    }
}

async function loadChartPreferences() {
    try {
        const saved = localStorage.getItem('chartPreferences');
        if (!saved) return;
        
        const prefs = JSON.parse(saved);
        const customerSelect = document.getElementById('chart-customer');
        const dateFromInput = document.getElementById('chart-date-from');
        const dateToInput = document.getElementById('chart-date-to');
        
        if (customerSelect && prefs.customer) {
            customerSelect.value = prefs.customer;
        }
        if (dateFromInput && prefs.dateFrom) {
            dateFromInput.value = prefs.dateFrom;
        }
        if (dateToInput && prefs.dateTo) {
            dateToInput.value = prefs.dateTo;
        }
        if (prefs.products && prefs.products.length > 0) {
            selectedChartProducts = prefs.products;
        }
        
        if (prefs.customer && selectedChartProducts.length > 0) {
            updateChart();
        }
    } catch (e) {
        console.error('Failed to load chart preferences', e);
    }
}

async function loadPriceListCustomers() {
    try {
        const res = await fetch(`${API_BASE_CUSTOMERS}/active`, { headers: getAuthHeaders() });
        const customers = await res.json();
        const container = document.getElementById('price-list-customers-list');
        if (!container) return;
        container.innerHTML = '';
        customers.forEach(c => {
            const item = document.createElement('div');
            item.className = 'product-checkbox-item';
            const customerKey = c.company || c.customer_id;
            const isChecked = selectedPriceListCustomers.includes(customerKey) ? 'checked' : '';
            item.innerHTML = `
                <input type="checkbox" id="price-list-customer-${c.customer_id}" value="${customerKey}" ${isChecked}>
                <label for="price-list-customer-${c.customer_id}">${customerKey}</label>
            `;
            container.appendChild(item);
        });

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const checked = container.querySelectorAll('input[type="checkbox"]:checked');
                checkboxes.forEach(c => {
                    const item = c.closest('.product-checkbox-item');
                    if (checked.length >= 5 && !c.checked) {
                        c.disabled = true;
                        if (item) item.classList.add('disabled');
                    } else {
                        c.disabled = false;
                        if (item) item.classList.remove('disabled');
                    }
                });
            });
        });
    } catch (err) {
        console.error('Failed to load price list customers', err);
    }
}

function openPriceListCustomersModal() {
    const modal = document.getElementById('price-list-customer-modal');
    if (modal) {
        modal.style.display = 'flex';
        loadPriceListCustomers();
    }
}

function savePriceListCustomers() {
    const checkboxes = document.querySelectorAll('#price-list-customers-list input[type="checkbox"]:checked');
    if (checkboxes.length > 5) {
        alert('You can only select up to 5 customers');
        return;
    }
    selectedPriceListCustomers = Array.from(checkboxes).map(cb => cb.value);
    document.getElementById('price-list-customer-modal').style.display = 'none';
    loadPriceListTable();
}

function openPriceListProductsModal() {
    const modal = document.getElementById('price-list-products-modal');
    if (modal) {
        modal.style.display = 'flex';
        loadPriceListProducts();
    }
}

async function loadPriceListProducts() {
    const container = document.getElementById('price-list-products-list');
    if (!container) return;
    container.innerHTML = '';
    try {
        const res = await fetch(`${API_BASE}`, { headers: getAuthHeaders() });
        const products = await res.json();
        products.filter(p => p.status === 'Active').forEach(product => {
            const item = document.createElement('div');
            item.className = 'product-checkbox-item';
            const isChecked = selectedPriceListProducts.includes(product.product) ? 'checked' : '';
            item.innerHTML = `
                <input type="checkbox" id="price-list-product-${product.product_id}" value="${product.product}" ${isChecked}>
                <label for="price-list-product-${product.product_id}">${product.product}</label>
            `;
            container.appendChild(item);
        });
    } catch (err) {
        console.error('Failed to load products for price list', err);
    }
}

function savePriceListProducts() {
    const checkboxes = document.querySelectorAll('#price-list-products-modal input[type="checkbox"]:checked');
    selectedPriceListProducts = Array.from(checkboxes).map(cb => cb.value);
    document.getElementById('price-list-products-modal').style.display = 'none';
    updatePriceListHeaders();
    loadPriceListTable();
}

function updatePriceListHeaders() {
    const thead = document.getElementById('price-list-thead');
    if (!thead) return;
    let html = '<tr><th>Customer</th>';
    selectedPriceListProducts.forEach(product => {
        html += `<th>${product}</th>`;
    });
    html += '</tr>';
    thead.innerHTML = html;
}

async function loadPriceListTable() {
    const tbody = document.getElementById('price-list-body');
    if (!tbody) return;

    if (selectedPriceListCustomers.length === 0 || selectedPriceListProducts.length === 0) {
        tbody.innerHTML = '';
        return;
    }

    try {
        tbody.innerHTML = '';
        for (const customerKey of selectedPriceListCustomers) {
            const res = await fetch(`${API_BASE_PRICE_CHANGES}/today?customer=${encodeURIComponent(customerKey)}&products=${selectedPriceListProducts.map(encodeURIComponent).join(',')}`, { headers: getAuthHeaders() });
            const data = await res.json();

            if (!Array.isArray(data)) {
                tbody.innerHTML = `<tr><td colspan="100%">API Error: ${data.error || 'Unknown error'}</td></tr>`;
                console.error('API returned non-array:', data);
                return;
            }

            const row = document.createElement('tr');
            row.innerHTML = `<td>${customerKey}</td>` + selectedPriceListProducts.map(() => '<td>—</td>').join('');

            data.forEach(item => {
                const product = item.product;
                const price = item.price;
                const colIndex = selectedPriceListProducts.indexOf(product);
                if (colIndex >= 0 && row.cells[colIndex + 1]) {
                    row.cells[colIndex + 1].textContent = price;
                }
            });

            tbody.appendChild(row);
        }
    } catch (err) {
        console.error('Failed to load price list', err);
        tbody.innerHTML = '<tr><td colspan="100%">Error loading data</td></tr>';
    }
}

function initializePriceListListeners() {
    const customerBtn = document.getElementById('price-list-customer-btn');
    const productsBtn = document.getElementById('price-list-products-btn');
    const saveProductsBtn = document.getElementById('save-price-list-products');
    const saveCustomersBtn = document.getElementById('save-price-list-customers');
    const closeProductsBtn = document.getElementById('close-price-list-products-modal');
    const closeCustomersBtn = document.getElementById('close-price-list-customer-modal');

    if (customerBtn) customerBtn.addEventListener('click', openPriceListCustomersModal);
    if (productsBtn) productsBtn.addEventListener('click', openPriceListProductsModal);
    if (saveProductsBtn) saveProductsBtn.addEventListener('click', savePriceListProducts);
    if (saveCustomersBtn) saveCustomersBtn.addEventListener('click', savePriceListCustomers);
    if (closeProductsBtn) closeProductsBtn.addEventListener('click', () => {
        document.getElementById('price-list-products-modal').style.display = 'none';
    });
    if (closeCustomersBtn) closeCustomersBtn.addEventListener('click', () => {
        document.getElementById('price-list-customer-modal').style.display = 'none';
    });

    const productsModal = document.getElementById('price-list-products-modal');
    if (productsModal) {
        productsModal.addEventListener('click', (e) => {
            if (e.target === productsModal) productsModal.style.display = 'none';
        });
    }

    const customersModal = document.getElementById('price-list-customer-modal');
    if (customersModal) {
        customersModal.addEventListener('click', (e) => {
            if (e.target === customersModal) customersModal.style.display = 'none';
        });
    }

    const bulkUploadPriceModal = document.getElementById('bulk-upload-price-modal');
    const closeBulkUploadPriceBtn = document.getElementById('close-bulk-upload-price-btn');
    const cancelBulkUploadPriceBtn = document.getElementById('cancel-bulk-upload-price-btn');
    const bulkPriceDropZone = document.getElementById('bulk-price-drop-zone');
    const bulkPriceFileInput = document.getElementById('bulk-price-file-input');
    const bulkPriceFileName = document.getElementById('bulk-price-file-name');
    const bulkPricePreview = document.getElementById('bulk-price-preview');
    const bulkPricePreviewTable = document.getElementById('bulk-price-preview-table');
    const saveBulkPriceBtn = document.getElementById('save-bulk-price-btn');
    const downloadPriceTemplateBtn = document.getElementById('download-price-template-btn');

    if (document.getElementById('upload-change-price-btn')) {
        document.getElementById('upload-change-price-btn').onclick = () => {
            bulkUploadPriceModal.classList.remove('hidden');
        };
    }

    const closeBulkUploadPriceModal = () => {
        bulkUploadPriceModal.classList.add('hidden');
        if (bulkPriceFileName) bulkPriceFileName.textContent = '';
        if (bulkPriceFileInput) bulkPriceFileInput.value = '';
        if (bulkPricePreview) bulkPricePreview.style.display = 'none';
    };

    if (closeBulkUploadPriceBtn) closeBulkUploadPriceBtn.onclick = closeBulkUploadPriceModal;
    if (cancelBulkUploadPriceBtn) cancelBulkUploadPriceBtn.onclick = closeBulkUploadPriceModal;

    if (bulkPriceDropZone) {
        bulkPriceDropZone.addEventListener('click', () => {
            bulkPriceFileInput?.click();
        });

        bulkPriceDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            bulkPriceDropZone.style.borderColor = '#2563eb';
            bulkPriceDropZone.style.background = '#eff6ff';
        });

        bulkPriceDropZone.addEventListener('dragleave', () => {
            bulkPriceDropZone.style.borderColor = '#cbd5e1';
            bulkPriceDropZone.style.background = '#f8fafc';
        });

        bulkPriceDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            bulkPriceDropZone.style.borderColor = '#cbd5e1';
            bulkPriceDropZone.style.background = '#f8fafc';
            const files = e.dataTransfer?.files;
            if (files && files.length > 0) {
                bulkPriceFileInput.files = files;
                if (bulkPriceFileName) bulkPriceFileName.textContent = files[0].name;
                renderBulkPricePreview(files[0]);
            }
        });
    }

    if (bulkPriceFileInput) {
        bulkPriceFileInput.addEventListener('change', () => {
            if (bulkPriceFileInput.files && bulkPriceFileInput.files.length > 0) {
                if (bulkPriceFileName) bulkPriceFileName.textContent = bulkPriceFileInput.files[0].name;
                renderBulkPricePreview(bulkPriceFileInput.files[0]);
            }
        });
    }

    const renderBulkPricePreview = (file) => {
        const previewContainer = document.getElementById('bulk-price-preview');
        const previewTable = document.getElementById('bulk-price-preview-table');
        if (!previewContainer || !previewTable || !file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, raw: false, defval: '' });

                if (!jsonData.length) {
                    previewTable.innerHTML = '<div style="padding: 20px; color: #999;">No data found in file</div>';
                    previewContainer.style.display = 'block';
                    return;
                }

                const headers = jsonData[0];
                const rows = jsonData.slice(1);

                let tableHtml = '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">';
                tableHtml += '<thead><tr>';
                headers.forEach(h => {
                    tableHtml += `<th style="padding: 8px 10px; text-align: left; border-bottom: 2px solid #e2e8f0; background: #f8fafc; font-weight: 600; color: #334155; white-space: nowrap;">${h}</th>`;
                });
                tableHtml += '</tr></thead><tbody>';

                rows.forEach((row, idx) => {
                    tableHtml += '<tr>';
                    row.forEach((cell, cellIdx) => {
                        const bgColor = idx % 2 === 0 ? '#fff' : '#f8fafc';
                        tableHtml += `<td style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; background: ${bgColor}; white-space: nowrap;">${cell}</td>`;
                    });
                    tableHtml += '</tr>';
                });

                tableHtml += '</tbody></table>';
                previewTable.innerHTML = tableHtml;
                previewContainer.style.display = 'block';
            } catch (err) {
                console.error('Failed to parse file:', err);
                previewTable.innerHTML = '<div style="padding: 20px; color: #e74c3c;">Failed to parse file</div>';
                previewContainer.style.display = 'block';
            }
        };
        reader.readAsArrayBuffer(file);
    };

    if (downloadPriceTemplateBtn) {
        downloadPriceTemplateBtn.onclick = () => {
            const workbook = XLSX.utils.book_new();

            const priceData = [
                ['Date', 'Customer', 'Old Price', 'New Price'],
                ['2026-08-19', 'Customer A', '1200', '1250'],
                ['2026-08-19', 'Customer B', '1300', '1350']
            ];
            const priceSheet = XLSX.utils.aoa_to_sheet(priceData);
            XLSX.utils.book_append_sheet(workbook, priceSheet, 'Price Changes');

            const customersData = [
                ['Customer Name', 'Status'],
                ['Customer A', 'Active'],
                ['Customer B', 'Active'],
                ['Customer C', 'Active']
            ];
            const customerSheet = XLSX.utils.aoa_to_sheet(customersData);
            XLSX.utils.book_append_sheet(workbook, customerSheet, 'Active Customers');

            XLSX.writeFile(workbook, 'price_change_template.xlsx');
        };
    }

    if (saveBulkPriceBtn) {
        saveBulkPriceBtn.onclick = () => {
            if (!bulkPriceFileInput || !bulkPriceFileInput.files || bulkPriceFileInput.files.length === 0) {
                alert('Please upload a file first');
                return;
            }
            alert('Price changes saved successfully!');
            closeBulkUploadPriceModal();
        };
    }
}
