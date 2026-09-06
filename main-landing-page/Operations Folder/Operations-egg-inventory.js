if (typeof ModuleComponents === 'undefined') { 
    window.ModuleComponents = {}; 
}

function getAuthHeaders() {
    const token = localStorage.getItem('goldenfield_auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

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
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>EP#001</td><td>NW</td><td>35g and Below</td></tr>
                                <tr><td>EP#002</td><td>PW</td><td>36g to 40g</td></tr>
                                <tr><td>EP#003</td><td>XS</td><td>41g to 45g</td></tr>
                                <tr><td>EP#004</td><td>S</td><td>46g to 50g</td></tr>
                                <tr><td>EP#005</td><td>M</td><td>51g to 55g</td></tr>
                                <tr><td>EP#006</td><td>L</td><td>56g to 60g</td></tr>
                                <tr><td>EP#007</td><td>XL</td><td>61g to 65g</td></tr>
                                <tr><td>EP#008</td><td>J</td><td>66g to 70g</td></tr>
                                <tr><td>EP#009</td><td>Broken</td><td>Cracked / Damaged</td></tr>
                                <tr><td>EP#010</td><td>Reject</td><td>Oversize / Undersize</td></tr>
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
                        <label>Product</label>
                        <input type="text" id="new-product-name" placeholder="Product name" />
                        <label>Product ID</label>
                        <input type="text" id="new-product-id" readonly placeholder="Auto-generated" />
                        <label>Remarks</label>
                        <textarea rows="3" placeholder="Remarks"></textarea>
                        <div class="modal-tab-actions">
                            <button class="btn-primary">Save</button>
                        </div>
                    </div>
                    <div class="modal-tab-panel hidden" id="tab-change">
                        <label>Product</label>
                        <select class="modal-select" id="change-product">
                            <option value="">Search available products...</option>
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

    // Handle Open Egg Modal Event
    const openEggBtn = document.getElementById('open-egg-modal');
    if (openEggBtn) {
        openEggBtn.onclick = async () => {
            const today = new Date().toISOString().split('T')[0];
            const dateInput = document.getElementById('report-date');
            if (dateInput) dateInput.value = today;

            try {
                const [receiptsRes, productsRes] = await Promise.all([
                    fetch('/api/receipt-issues', { headers: getAuthHeaders() }),
                    fetch('/api/products', { headers: getAuthHeaders() })
                ]);

                if (receiptsRes.ok && productsRes.ok) {
                    const receipts = await receiptsRes.json();
                    const products = await productsRes.json();
                    const productMap = new Map(products.map(p => [p.product, p.no_of_eggs || 0]));

                    const soldBySize = {};
                    receipts
                        .filter(r => r.date === today)
                        .forEach(r => {
                            const product = r.product || 'Unknown';
                            const eggs = productMap.get(product) || 0;
                            const qty = parseFloat(r.qty) || 0;
                            const pcs = qty * eggs;
                            soldBySize[product] = (soldBySize[product] || 0) + pcs;
                        });

                    const tbody = document.getElementById('sold-by-size-table-body');
                    if (tbody) {
                        tbody.innerHTML = '';
                        Object.entries(soldBySize)
                            .sort((a, b) => a[0].localeCompare(b[0]))
                            .forEach(([item, pcs]) => {
                                const row = document.createElement('tr');
                                row.innerHTML = `<td>${item}</td><td>${pcs.toLocaleString()}</td>`;
                                tbody.appendChild(row);
                            });
                    }
                }
            } catch (err) {
                console.error('Failed to load modal data:', err);
            }

            document.getElementById('egg-modal')?.classList.remove('hidden');
        };
    }

    // Handle Modal Close Events
    const closeEggBtn = document.getElementById('close-egg-modal-btn');
    if (closeEggBtn) {
        closeEggBtn.onclick = () => {
            document.getElementById('egg-modal')?.classList.add('hidden');
        };
    }

    // Helper: Parse string numbers with commas
    function parseNum(v) {
        return parseFloat(String(v).replace(/,/g, '')) || 0;
    }

    // Helper: Calculate total pieces from table rows
    function calculateTotalSoldFromTable() {
        const tbody = document.getElementById('sold-by-size-table-body');
        if (!tbody) return 0;
        let total = 0;
        tbody.querySelectorAll('tr').forEach(row => {
            const pcsCell = row.querySelector('td:last-child');
            if (pcsCell) total += parseNum(pcsCell.textContent);
        });
        return total;
    }

    // Helper: Convert time string to fractional hours
    function timeToHours(t) {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h + (m || 0) / 60;
    }

    // Helper: Calculate work hours across two shifts
    function calculateShiftHours(start1, end1, start2, end2) {
        let total = 0;
        if (start1 && end1) {
            let diff = timeToHours(end1) - timeToHours(start1);
            if (diff < 0) diff += 24;
            total += diff;
        }
        if (start2 && end2) {
            let diff = timeToHours(end2) - timeToHours(start2);
            if (diff < 0) diff += 24;
            total += diff;
        }

        const totalEl = document.getElementById('total-time-hours');
        if (totalEl) totalEl.value = total.toFixed(2);
        return total;
    }
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations'];
    if (typeof render === 'function') {
        render(contentArea);
    }
}
