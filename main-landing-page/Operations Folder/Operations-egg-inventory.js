if (typeof ModuleComponents === 'undefined') { 
    window.ModuleComponents = {}; 
}

function getAuthHeaders() {
    const token = localStorage.getItem('goldenfield_auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

var API_BASE_EGG_PRODUCTS = '/api/egg-products';

ModuleComponents['operations-egg-inventory'] = (container) => {
    container.innerHTML = `
        <div class="egg-inventory-layout">
            <div class="header-actions">
                <h2>Egg Inventory Management</h2>
            </div>
            <div class="action-buttons-row">
                <button id="open-egg-modal" class="btn-icon-circle" style="background-color: #F7F18B; color: #1a1f2e;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span class="btn-label">Add Daily Egg Production</span>
                </button>
                <button id="add-egg-products-btn" class="btn-icon-circle" style="background-color: #EAD355; color: #1a1f2e;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span class="btn-label">Add Egg Products</span>
                </button>
            </div>
            <div class="tracking-cards-row">
                <div class="card tracking-card">
                    <h3>Egg Availability</h3>
                    <p class="card-sub-label">Total Eggs Available in the Warehouse</p>
                    <div class="card-value-row">
                        <div class="card-value">123,000 pcs</div>
                        <span class="trend-up">▲ 5%</span>
                    </div>
                    <p class="vs-last-month">VS Yesterday</p>
                </div>
                <div class="card tracking-card">
                    <h3>Egg Production</h3>
                    <p class="card-sub-label">Daily Average of Egg Production</p>
                    <div class="card-value-row">
                        <div class="card-value">235,000 Pcs</div>
                        <span class="trend-up">▲ 5%</span>
                    </div>
                    <p class="vs-last-month">VS Yesterday</p>
                </div>
                <div class="card tracking-card">
                    <h3>Egg Waste</h3>
                    <p class="card-sub-label">Discarded Eggs Daily (Sold as Plastic Eggs)</p>
                    <div class="card-value-row">
                        <div class="card-value">1,500 pcs</div>
                        <span class="trend-down">▼ 1%</span>
                    </div>
                    <p class="vs-last-month">VS Yesterday</p>
                </div>
                <div class="card tracking-card">
                    <h3>Good to Broken %</h3>
                    <p class="card-sub-label">Percentage between Good and Waste Eggs</p>
                    <div class="card-value-row">
                        <div class="card-value">98%-2%</div>
                        <span class="trend-down">▼ 1%</span>
                    </div>
                    <p class="vs-last-month">VS Yesterday</p>
                </div>
            </div>
            <div class="chart-and-sidebar">
                <div class="card graph-placeholder chart-main">
                    <h3>Egg Type Distribution Chart</h3>
                    <div class="egg-distribution-chart">
                        <div class="egg-chart-bars">
                            <div class="egg-chart-row">
                                <span class="egg-size-label">NW</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" style="width: 75%;" title="4,500"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">PW</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" style="width: 87%;" title="5,200"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">XS</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" style="width: 63%;" title="3,800"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">S</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" style="width: 97%;" title="5,800"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">M</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" style="width: 92%;" title="5,500"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">L</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" style="width: 70%;" title="4,200"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">XL</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" style="width: 47%;" title="2,800"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">J</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" style="width: 25%;" title="1,500"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">Broken</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" style="width: 13%;" title="800"></div>
                                </div>
                            </div>
                        </div>
                        <div class="egg-x-axis">
                            <span>1k</span>
                            <span>2k</span>
                            <span>3k</span>
                            <span>4k</span>
                            <span>5k</span>
                            <span>6k</span>
                        </div>
                    </div>
                </div>
                <div class="card graph-placeholder efficiency-card">
                    <h3>Machine Efficiency</h3>
                    <p class="card-sub-label">The machine time and Quantity of eggs ratio</p>
                    <div class="table-wrap">
                        <table class="data-table efficiency-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Machine Time</th>
                                    <th>Egg Quantity</th>
                                    <th>Efficiency</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>July 1</td><td>5:30</td><td>100,000</td><td>97%</td></tr>
                                <tr><td>July 2</td><td>5:45</td><td>102,500</td><td>96%</td></tr>
                                <tr><td>July 3</td><td>5:15</td><td>98,000</td><td>98%</td></tr>
                                <tr><td>July 4</td><td>6:00</td><td>105,000</td><td>95%</td></tr>
                                <tr><td>July 5</td><td>5:30</td><td>100,000</td><td>97%</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="bottom-cards-row">
                <div class="card graph-placeholder product-list-card">
                    <h3>Product List</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product</th>
                                    <th>Remarks</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="egg-product-list-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="egg-product-pagination">
                        <button class="page-btn">&laquo; Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">2</button>
                        <button class="page-btn">3</button>
                        <button class="page-btn">Next &raquo;</button>
                    </div>
                </div>
                <div class="card graph-placeholder daily-egg-card">
                    <h3>Daily Egg Transaction</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Starting Inventory</th>
                                    <th>Eggs Sold</th>
                                    <th>Egg Waste</th>
                                    <th>Graded</th>
                                    <th>Ungraded</th>
                                    <th>Ending Inventory</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>2026-07-01</td><td>50,000</td><td>12,000</td><td>500</td><td>11,800</td><td>200</td><td>37,500</td><td>48,300</td></tr>
                                <tr><td>2026-07-02</td><td>52,000</td><td>13,500</td><td>600</td><td>13,200</td><td>300</td><td>38,000</td><td>50,400</td></tr>
                                <tr><td>2026-07-03</td><td>48,000</td><td>11,800</td><td>400</td><td>11,600</td><td>200</td><td>35,800</td><td>47,000</td></tr>
                                <tr><td>2026-07-04</td><td>51,000</td><td>14,200</td><td>700</td><td>13,900</td><td>300</td><td>36,100</td><td>49,700</td></tr>
                                <tr><td>2026-07-05</td><td>49,500</td><td>12,600</td><td>550</td><td>12,350</td><td>250</td><td>36,350</td><td>48,450</td></tr>
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
            
            <div id="egg-modal" class="modal hidden">
                <div class="modal-content daily-egg-modal">
                    <div class="modal-header-row">
                        <h3>Add Daily Egg Production</h3>
                        <button id="close-egg-modal-btn" class="modal-close-btn" title="Close">&times;</button>
                    </div>
                    <div class="egg-modal-body">
                        <p>Modal content placeholder</p>
                    </div>
                </div>
            </div>

            <div id="egg-products-modal" class="modal hidden">
                <div class="modal-content egg-products-modal">
                    <div class="modal-header-row">
                        <h3>Egg Products</h3>
                        <button id="close-egg-products-btn" class="modal-close-btn" title="Close">&times;</button>
                    </div>
                    <div class="modal-tabs">
                        <button class="modal-tab active" data-tab="add">Add New Products</button>
                        <button class="modal-tab" data-tab="change">Change or Remove Products</button>
                    </div>
                    <div class="modal-tab-panel" id="tab-add">
                        <label>Product ID</label>
                        <input type="text" id="new-product-id" readonly placeholder="EgRoProID-1" />
                        <label>Product</label>
                        <input type="text" id="new-product-name" placeholder="Product name" />
                        <label>Status</label>
                        <select id="new-product-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <label>Remarks</label>
                        <textarea rows="3" placeholder="Remarks"></textarea>
                        <div class="modal-tab-actions">
                            <button class="btn-primary">Save</button>
                        </div>
                    </div>
                    <div class="modal-tab-panel hidden" id="tab-change">
                        <label>Search Products</label>
                        <input type="text" id="product-search" placeholder="Search products..." />
                        <label>Product</label>
                        <select class="modal-select" id="change-product">
                            <option value="">Select a product...</option>
                            <option value="EP#001">NW</option>
                            <option value="EP#002">PW</option>
                            <option value="EP#003">XS</option>
                            <option value="EP#004">S</option>
                            <option value="EP#005">M</option>
                            <option value="EP#006">L</option>
                            <option value="EP#007">XL</option>
                            <option value="EP#008">J</option>
                            <option value="EP#009">Broken</option>
                            <option value="EP#010">Reject</option>
                        </select>
                        <label>Product ID</label>
                        <input type="text" id="change-product-id" readonly placeholder="Product ID" />
                        <label>Status</label>
                        <select id="change-product-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <label>Remarks</label>
                        <textarea id="change-remarks" rows="3" readonly placeholder="Remarks"></textarea>
                        <div class="modal-tab-actions">
                            <button class="btn-primary">Save</button>
                            <button class="btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Attach Event Listeners for Modals
    const eggModal = container.querySelector('#egg-modal');
    const openEggModalBtn = container.querySelector('#open-egg-modal');
    const closeEggModalBtn = container.querySelector('#close-egg-modal-btn');

    if (openEggModalBtn && eggModal) {
        openEggModalBtn.addEventListener('click', () => eggModal.classList.remove('hidden'));
    }
    if (closeEggModalBtn && eggModal) {
        closeEggModalBtn.addEventListener('click', () => eggModal.classList.add('hidden'));
    }

    const eggProductsModal = container.querySelector('#egg-products-modal');
    const openEggProductsBtn = container.querySelector('#add-egg-products-btn');
    const closeEggProductsBtn = container.querySelector('#close-egg-products-btn');
    const productListBody = container.querySelector('#egg-product-list-body');

    const resetAddTab = () => {
        const productIdInput = eggProductsModal.querySelector('#new-product-id');
        const productNameInput = eggProductsModal.querySelector('#new-product-name');
        const statusSelect = eggProductsModal.querySelector('#new-product-status');
        const remarksTextarea = eggProductsModal.querySelector('#tab-add textarea');
        if (productIdInput) productIdInput.value = 'EgRoProID-1';
        if (productNameInput) productNameInput.value = '';
        if (statusSelect) statusSelect.value = 'Active';
        if (remarksTextarea) remarksTextarea.value = '';
    };

    const resetChangeTab = () => {
        if (changeProductSelect) changeProductSelect.value = '';
        if (changeProductId) changeProductId.value = '';
        if (changeRemarks) {
            changeRemarks.value = '';
            changeRemarks.setAttribute('readonly', true);
        }
        if (changeStatus) {
            changeStatus.value = 'Active';
            changeStatus.disabled = true;
        }
        if (productSearchInput) productSearchInput.value = '';
    };

    let eggProductCurrentPage = 1;
    const EGG_PRODUCTS_PER_PAGE = 5;

    const renderEggProductPagination = (totalItems) => {
        const pagination = container.querySelector('#egg-product-pagination');
        if (!pagination) return;
        const totalPages = Math.max(1, Math.ceil(totalItems / EGG_PRODUCTS_PER_PAGE));
        if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        }
        pagination.style.display = 'flex';
        let buttonsHtml = '';
        if (eggProductCurrentPage > 1) {
            buttonsHtml += `<button class="page-btn" data-page="${eggProductCurrentPage - 1}">&laquo; Prev</button>`;
        } else {
            buttonsHtml += `<button class="page-btn" disabled>&laquo; Prev</button>`;
        }
        for (let i = 1; i <= totalPages; i++) {
            buttonsHtml += `<button class="page-btn ${i === eggProductCurrentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        if (eggProductCurrentPage < totalPages) {
            buttonsHtml += `<button class="page-btn" data-page="${eggProductCurrentPage + 1}">Next &raquo;</button>`;
        } else {
            buttonsHtml += `<button class="page-btn" disabled>Next &raquo;</button>`;
        }
        pagination.innerHTML = buttonsHtml;
        pagination.querySelectorAll('.page-btn:not([disabled])').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page, 10);
                if (!isNaN(page)) {
                    eggProductCurrentPage = page;
                    loadEggProductList();
                }
            });
        });
    };

    const loadEggProductList = async () => {
        if (!productListBody) return;
        try {
            const res = await fetch(`${API_BASE_EGG_PRODUCTS}`, { headers: getAuthHeaders() });
            if (!res.ok) throw new Error('Failed to fetch products');
            const products = await res.json();
            const totalItems = products.length;
            const totalPages = Math.max(1, Math.ceil(totalItems / EGG_PRODUCTS_PER_PAGE));
            if (eggProductCurrentPage > totalPages) eggProductCurrentPage = totalPages;
            const start = (eggProductCurrentPage - 1) * EGG_PRODUCTS_PER_PAGE;
            const paginatedProducts = products.slice(start, start + EGG_PRODUCTS_PER_PAGE);
            productListBody.innerHTML = paginatedProducts.map(p => `
                <tr>
                    <td>${p.product_id}</td>
                    <td>${p.product_name}</td>
                    <td>${p.remarks || ''}</td>
                    <td>${p.status || 'Active'}</td>
                </tr>
            `).join('');
            if (totalItems === 0) {
                productListBody.innerHTML = '<tr><td colspan="4">No products found</td></tr>';
            }
            renderEggProductPagination(totalItems);
        } catch (err) {
            console.error('Failed to load egg product list', err);
            productListBody.innerHTML = '<tr><td colspan="4">No products found</td></tr>';
            const pagination = container.querySelector('#egg-product-pagination');
            if (pagination) pagination.style.display = 'none';
        }
    };

    if (openEggProductsBtn && eggProductsModal) {
        openEggProductsBtn.addEventListener('click', async () => {
            eggProductsModal.classList.remove('hidden');
            eggProductCurrentPage = 1;
            resetAddTab();
            resetChangeTab();
            eggProductTabs.forEach(t => t.classList.remove('active'));
            const firstTab = eggProductsModal.querySelector('.modal-tab[data-tab="add"]');
            if (firstTab) firstTab.classList.add('active');
            Object.keys(eggProductPanels).forEach(key => {
                if (eggProductPanels[key]) {
                    eggProductPanels[key].classList.toggle('hidden', key !== 'add');
                }
            });
            const productIdInput = eggProductsModal.querySelector('#new-product-id');
            if (productIdInput) {
                try {
                    const res = await fetch(`${API_BASE_EGG_PRODUCTS}/next-id`, { headers: getAuthHeaders() });
                    if (res.ok) {
                        const data = await res.json();
                        productIdInput.value = data.product_id || 'EgRoProID-1';
                    } else {
                        productIdInput.value = 'EgRoProID-1';
                    }
                } catch {
                    productIdInput.value = 'EgRoProID-1';
                }
            }
            await loadEggProductsForChange();
        });
    }
    if (eggProductsModal) {
        eggProductsModal.addEventListener('click', (e) => {
            if (e.target === eggProductsModal) {
                eggProductsModal.classList.add('hidden');
            }
        });
    }

    const eggProductTabs = eggProductsModal ? eggProductsModal.querySelectorAll('.modal-tab') : [];
    const eggProductPanels = {
        add: eggProductsModal ? eggProductsModal.querySelector('#tab-add') : null,
        change: eggProductsModal ? eggProductsModal.querySelector('#tab-change') : null
    };

    eggProductTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            eggProductTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.dataset.tab;
            Object.keys(eggProductPanels).forEach(key => {
                if (eggProductPanels[key]) {
                    eggProductPanels[key].classList.toggle('hidden', key !== tabName);
                }
            });
        });
    });

    const productSearchInput = eggProductsModal ? eggProductsModal.querySelector('#product-search') : null;
    const changeProductSelect = eggProductsModal ? eggProductsModal.querySelector('#change-product') : null;
    const changeProductId = eggProductsModal ? eggProductsModal.querySelector('#change-product-id') : null;
    const changeRemarks = eggProductsModal ? eggProductsModal.querySelector('#change-remarks') : null;
    const changeStatus = eggProductsModal ? eggProductsModal.querySelector('#change-product-status') : null;

    if (productSearchInput && changeProductSelect) {
        productSearchInput.addEventListener('input', () => {
            const query = productSearchInput.value.toLowerCase();
            Array.from(changeProductSelect.options).forEach(option => {
                const text = option.text.toLowerCase();
                option.style.display = text.includes(query) || !query ? '' : 'none';
            });
        });
    }

    if (changeProductSelect) {
        changeProductSelect.addEventListener('change', () => {
            if (changeProductSelect.value) {
                const parts = changeProductSelect.value.split('#');
                if (parts.length === 2) {
                    const num = parseInt(parts[1], 10);
                    if (changeProductId) changeProductId.value = `EgRoProID-${num}`;
                }
                if (changeRemarks) changeRemarks.removeAttribute('readonly');
                if (changeStatus) changeStatus.disabled = false;
            } else {
                if (changeProductId) changeProductId.value = '';
                if (changeRemarks) {
                    changeRemarks.value = '';
                    changeRemarks.setAttribute('readonly', true);
                }
                if (changeStatus) changeStatus.disabled = true;
            }
        });
    }

    const saveNewProductBtn = eggProductsModal ? eggProductsModal.querySelector('#tab-add .btn-primary') : null;
    if (saveNewProductBtn) {
        saveNewProductBtn.addEventListener('click', async () => {
            const productIdInput = eggProductsModal.querySelector('#new-product-id');
            const productNameInput = eggProductsModal.querySelector('#new-product-name');
            const statusSelect = eggProductsModal.querySelector('#new-product-status');
            const remarksTextarea = eggProductsModal.querySelector('#tab-add textarea');

            const product_id = productIdInput ? productIdInput.value : '';
            const product_name = productNameInput ? productNameInput.value.trim() : '';
            const status = statusSelect ? statusSelect.value : 'Active';
            const remarks = remarksTextarea ? remarksTextarea.value.trim() : '';

            if (!product_id || !product_name) {
                alert('Product ID and Product Name are required');
                return;
            }

            try {
                const res = await fetch(API_BASE_EGG_PRODUCTS, {
                    method: 'POST',
                    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_id, product_name, remarks, status })
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                alert('Product saved: ' + product_name);
                eggProductsModal.classList.add('hidden');
                if (productNameInput) productNameInput.value = '';
                if (remarksTextarea) remarksTextarea.value = '';
                if (statusSelect) statusSelect.value = 'Active';
                try {
                    const res = await fetch(`${API_BASE_EGG_PRODUCTS}/next-id`, { headers: getAuthHeaders() });
                    if (res.ok) {
                        const data = await res.json();
                        if (productIdInput) productIdInput.value = data.product_id || 'EgRoProID-1';
                    } else {
                        if (productIdInput) productIdInput.value = 'EgRoProID-1';
                    }
                } catch {
                    if (productIdInput) productIdInput.value = 'EgRoProID-1';
                }
                eggProductCurrentPage = 1;
                await loadEggProductList();
            } catch (err) {
                console.error('Failed to save egg product', err);
                alert('Error saving product: ' + err.message);
            }
        });
    }

    const saveChangeProductBtn = eggProductsModal ? eggProductsModal.querySelector('#tab-change .btn-primary') : null;
    const deleteChangeProductBtn = eggProductsModal ? eggProductsModal.querySelector('#tab-change .btn-danger') : null;

    if (saveChangeProductBtn) {
        saveChangeProductBtn.addEventListener('click', async () => {
            const productId = changeProductId ? changeProductId.value : '';
            const productSelect = changeProductSelect;
            const productName = productSelect && productSelect.selectedOptions[0] ? productSelect.selectedOptions[0].textContent.trim() : '';
            const remarks = changeRemarks ? changeRemarks.value.trim() : '';
            const status = changeStatus ? changeStatus.value : 'Active';

            if (!productSelect || !productSelect.value) {
                alert('Please select a product');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_EGG_PRODUCTS}/${encodeURIComponent(productId)}`, {
                    method: 'PUT',
                    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_name: productName, remarks, status })
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                alert('Product updated: ' + productName);
                eggProductsModal.classList.add('hidden');
                eggProductCurrentPage = 1;
                await loadEggProductList();
            } catch (err) {
                console.error('Failed to update egg product', err);
                alert('Error updating product: ' + err.message);
            }
        });
    }

    if (deleteChangeProductBtn) {
        deleteChangeProductBtn.addEventListener('click', async () => {
            const productId = changeProductId ? changeProductId.value : '';
            const productSelect = changeProductSelect;
            const productName = productSelect && productSelect.selectedOptions[0] ? productSelect.selectedOptions[0].textContent.trim() : '';

            if (!productSelect || !productSelect.value) {
                alert('Please select a product');
                return;
            }
            if (!confirm('Delete ' + productName + '?')) return;

            try {
                const res = await fetch(`${API_BASE_EGG_PRODUCTS}/${encodeURIComponent(productId)}`, {
                    method: 'DELETE',
                    headers: getAuthHeaders()
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                alert('Product deleted');
                eggProductsModal.classList.add('hidden');
                eggProductCurrentPage = 1;
                await loadEggProductList();
            } catch (err) {
                console.error('Failed to delete egg product', err);
                alert('Error deleting product: ' + err.message);
            }
        });
    }

    const loadEggProductsForChange = async () => {
        try {
            const res = await fetch(`${API_BASE_EGG_PRODUCTS}`, { headers: getAuthHeaders() });
            if (!res.ok) throw new Error('Failed to fetch products');
            const products = await res.json();
            if (changeProductSelect) {
                changeProductSelect.innerHTML = '<option value="">Select a product...</option>' +
                    products.map(p => `<option value="${p.product_id}">${p.product_name}</option>`).join('');
            }
        } catch (err) {
            console.error('Failed to load egg products', err);
        }
    };

    loadEggProductList();
};

// Global Initialization Routine
function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations-egg-inventory';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations-egg-inventory'];
    if (typeof render === 'function') {
        render(contentArea);
    }
}
