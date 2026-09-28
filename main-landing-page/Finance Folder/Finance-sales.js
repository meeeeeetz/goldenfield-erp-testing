if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['finance-sales'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>Sales</h2>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Total Revenue</h3>
                <p class="card-sub-label">Gross Sales amount over a selected period</p>
                <div class="card-value-row">
                    <div class="card-value" id="total-revenue-value">Loading...</div>
                    <span class="trend" id="total-revenue-trend"></span>
                </div>
                <p class="vs-last-month">VS last month</p>
            </div>
            <div class="card tracking-card">
                <h3>Total Volume Sold</h3>
                <p class="card-sub-label">Total Number of Eggs sold for the selected period</p>
                <div class="card-value-row">
                    <div class="card-value" id="total-volume-value">Loading...</div>
                    <span class="trend" id="total-volume-trend"></span>
                </div>
                <p class="vs-last-month">VS last month</p>
            </div>
            <div class="card tracking-card">
                <h3>Average Order Value</h3>
                <p class="card-sub-label">the mean spend amount per customer Invoices</p>
                <div class="card-value-row">
                    <div class="card-value" id="avg-order-value">Loading...</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Active Customer Count</h3>
                <p class="card-sub-label">Number of unique customer purchasing in the period</p>
                <div class="card-value-row">
                    <div class="card-value" id="active-customers-value">Loading...</div>
                </div>
            </div>
        </div>
<div class="finance-sales-row">
        <div class="card graph-placeholder sales-trends-card">
            <h3>Sales trends over time</h3>
            <div class="chart-wrap">
                <svg viewBox="0 0 760 360" class="egg-price-chart sales-line-chart" preserveAspectRatio="xMidYMid meet" id="sales-trends-chart"></svg>
            </div>
            <div class="chart-legend">
                <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#a88805"></span>Revenue</span>
                <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#2ecc71"></span>Volume (Eggs)</span>
            </div>
        </div>
        <div class="card graph-placeholder product-performance-card">
            <h3>Product Performance Break down</h3>
            <p class="card-sub-label">Top 8 Products Sales for the Period</p>
            <div class="egg-distribution-chart">
                <div class="egg-chart-bars" id="top-products-bars">
                    <div class="egg-chart-row"><span class="egg-size-label">Loading...</span></div>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder top-customer-card">
            <h3>top customer list</h3>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Customer</th>
                            <th>Overall Accumulated Amount</th>
                        </tr>
                    </thead>
                    <tbody id="top-customers-body">
                        <tr><td colspan="3" style="text-align:center;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        <div class="finance-sales-row">
        <div class="card graph-placeholder payment-mix-card">
            <h3>Payment method mix</h3>
            <p class="card-sub-label">Cash sales vs credit account terms to monitor immediate cash flow</p>
            <div class="chart-wrap payment-mix-wrap">
                <svg viewBox="0 0 200 200" class="payment-mix-chart">
                    <path d="M100,100 L100,0 A100,100 0 1 1 19.1,158.8 Z" fill="#a88805"></path>
                    <path d="M100,100 L19.1,158.8 A100,100 0 0 1 100,0 Z" fill="#2ecc71"></path>
                </svg>
            </div>
            <div class="chart-legend">
                <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#a88805"></span>Cash Sales &mdash; P152,425 (65%)</span>
                <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#2ecc71"></span>Credit Account Terms &mdash; P82,075 (35%)</span>
            </div>
        </div>
        <div class="card graph-placeholder inventory-sold-card">
            <h3>Inventory vs Sold Ratio</h3>
            <p class="card-sub-label">Compares total eggs collected from operations against total eggs sold to see the discrepancy</p>
            <div class="egg-distribution-chart">
                <div class="egg-chart-bars">
                    <div class="egg-chart-row"><span class="egg-size-label">Collected</span><div class="egg-bar-track"><div class="egg-bar" style="width:100%;background:#a88805;"></div></div><span class="bar-total">1,250,000</span></div>
                    <div class="egg-chart-row"><span class="egg-size-label">Sold</span><div class="egg-bar-track"><div class="egg-bar" style="width:94.4%;background:#2ecc71;"></div></div><span class="bar-total">1,180,000</span></div>
                </div>
            </div>
            <p class="discrepancy-note">Discrepancy: 70,000 pcs unsold (5.6% of collected)</p>
        </div>
        </div>
    `;

    // Fetch sales comparison data
    async function loadSalesComparison() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch('/api/receipt-issues/sales-comparison', { headers });
            if (!res.ok) throw new Error('Failed to fetch sales data');
            const data = await res.json();

            const valueEl = document.getElementById('total-revenue-value');
            const trendEl = document.getElementById('total-revenue-trend');

            if (valueEl) {
                valueEl.textContent = 'P' + Number(data.current_month_sales).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            if (trendEl) {
                const pct = data.percentage_difference || '0.0';
                const trend = data.trend || 'neutral';
                if (trend === 'up') {
                    trendEl.textContent = '▲ ' + pct + '%';
                    trendEl.className = 'trend trend-up';
                } else if (trend === 'down') {
                    trendEl.textContent = '▼ ' + pct + '%';
                    trendEl.className = 'trend trend-down';
                } else {
                    trendEl.textContent = '—';
                    trendEl.className = 'trend';
                }
            }
        } catch (err) {
            console.error('Failed to load sales comparison:', err);
            const valueEl = document.getElementById('total-revenue-value');
            if (valueEl) valueEl.textContent = 'Error';
        }
    }

    loadSalesComparison();

    async function loadEggsComparison() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch('/api/receipt-issues/eggs-comparison', { headers });
            if (!res.ok) throw new Error('Failed to fetch eggs data');
            const data = await res.json();

            const valueEl = document.getElementById('total-volume-value');
            const trendEl = document.getElementById('total-volume-trend');

            if (valueEl) {
                valueEl.textContent = Number(data.current_month_eggs).toLocaleString() + ' pcs';
            }

            if (trendEl) {
                const pct = data.percentage_difference || '0.0';
                const trend = data.trend || 'neutral';
                if (trend === 'up') {
                    trendEl.textContent = '▲ ' + pct + '%';
                    trendEl.className = 'trend trend-up';
                } else if (trend === 'down') {
                    trendEl.textContent = '▼ ' + pct + '%';
                    trendEl.className = 'trend trend-down';
                } else {
                    trendEl.textContent = '—';
                    trendEl.className = 'trend';
                }
            }
        } catch (err) {
            console.error('Failed to load eggs comparison:', err);
            const valueEl = document.getElementById('total-volume-value');
            if (valueEl) valueEl.textContent = 'Error';
        }
    }

    loadEggsComparison();

    async function loadAvgOrderValue() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch('/api/receipt-issues/avg-order-value', { headers });
            if (!res.ok) throw new Error('Failed to fetch avg order value');
            const data = await res.json();

            const valueEl = document.getElementById('avg-order-value');
            if (valueEl) {
                valueEl.textContent = 'P' + Number(data.avg_order_value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
        } catch (err) {
            console.error('Failed to load avg order value:', err);
            const valueEl = document.getElementById('avg-order-value');
            if (valueEl) valueEl.textContent = 'Error';
        }
    }

    loadAvgOrderValue();

    async function loadActiveCustomers() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch('/api/receipt-issues/active-customers', { headers });
            if (!res.ok) throw new Error('Failed to fetch active customers');
            const data = await res.json();

            const valueEl = document.getElementById('active-customers-value');
            if (valueEl) {
                valueEl.textContent = data.active_customers + ' customers';
            }
        } catch (err) {
            console.error('Failed to load active customers:', err);
            const valueEl = document.getElementById('active-customers-value');
            if (valueEl) valueEl.textContent = 'Error';
        }
    }

    loadActiveCustomers();

    async function loadSalesTrends() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch('/api/receipt-issues/sales-trends', { headers });
            if (!res.ok) throw new Error('Failed to fetch sales trends');
            const data = await res.json();

            const svg = document.getElementById('sales-trends-chart');
            if (!svg) return;

            // Clear existing content
            svg.innerHTML = '';

            const months = data.map(d => d.month_label);
            const grandTotals = data.map(d => Number(d.grand_total));
            const eggsSold = data.map(d => Number(d.eggs_sold));

            const maxGrandTotal = Math.max(...grandTotals, 1);
            const maxEggsSold = Math.max(...eggsSold, 1);

            // Chart dimensions
            const marginLeft = 70;
            const marginBottom = 50;
            const marginTop = 20;
            const marginRight = 40;
            const chartWidth = 760 - marginLeft - marginRight;
            const chartHeight = 360 - marginTop - marginBottom;
            const chartBottom = 360 - marginBottom;
            const chartTop = marginTop;

            // Helper functions to map values to Y coordinates
            const yRevenue = (val) => chartBottom - (val / maxGrandTotal) * chartHeight;
            const yEggs = (val) => chartBottom - (val / maxEggsSold) * chartHeight;

            // X positions for 6 months
            const xPositions = months.map((_, i) => marginLeft + (i / (months.length - 1)) * chartWidth);

            // Draw Y-axis grid lines and labels (Revenue - left axis)
            const revenueSteps = 5;
            for (let i = 0; i <= revenueSteps; i++) {
                const y = chartBottom - (i / revenueSteps) * chartHeight;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', marginLeft);
                line.setAttribute('y1', y);
                line.setAttribute('x2', marginLeft + chartWidth);
                line.setAttribute('y2', y);
                line.setAttribute('stroke', '#D6D6D6');
                line.setAttribute('stroke-width', '1');
                svg.appendChild(line);

                const val = (maxGrandTotal * i / revenueSteps);
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', marginLeft - 10);
                text.setAttribute('y', y + 4);
                text.setAttribute('text-anchor', 'end');
                text.setAttribute('font-size', '11');
                text.setAttribute('fill', '#555');
                text.textContent = val >= 1000 ? (val/1000).toFixed(0) + 'k' : val.toFixed(0);
                svg.appendChild(text);
            }

            // Draw X-axis
            const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            xAxis.setAttribute('x1', marginLeft);
            xAxis.setAttribute('y1', chartBottom);
            xAxis.setAttribute('x2', marginLeft + chartWidth);
            xAxis.setAttribute('y2', chartBottom);
            xAxis.setAttribute('stroke', '#D6D6D6');
            xAxis.setAttribute('stroke-width', '1');
            svg.appendChild(xAxis);

            // Y-axis line
            const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            yAxis.setAttribute('x1', marginLeft);
            yAxis.setAttribute('y1', marginTop);
            yAxis.setAttribute('x2', marginLeft);
            yAxis.setAttribute('y2', chartBottom);
            yAxis.setAttribute('stroke', '#D6D6D6');
            yAxis.setAttribute('stroke-width', '1');
            svg.appendChild(yAxis);

            // Draw X-axis month labels
            months.forEach((month, i) => {
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', xPositions[i]);
                text.setAttribute('y', chartBottom + 25);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('font-size', '11');
                text.setAttribute('fill', '#555');
                text.textContent = month;
                svg.appendChild(text);
            });

            // Draw Revenue line (Gold - #a88805)
            if (grandTotals.length > 1) {
                const revenuePoints = grandTotals.map((val, i) => `${xPositions[i]},${yRevenue(val)}`).join(' ');
                const revenueLine = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                revenueLine.setAttribute('points', revenuePoints);
                revenueLine.setAttribute('fill', 'none');
                revenueLine.setAttribute('stroke', '#a88805');
                revenueLine.setAttribute('stroke-width', '3');
                svg.appendChild(revenueLine);

                // Revenue circles
                grandTotals.forEach((val, i) => {
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', xPositions[i]);
                    circle.setAttribute('cy', yRevenue(val));
                    circle.setAttribute('r', '5');
                    circle.setAttribute('fill', '#a88805');
                    svg.appendChild(circle);
                });
            }

            // Draw Eggs Sold line (Green - #2ecc71)
            if (eggsSold.length > 1) {
                const eggsPoints = eggsSold.map((val, i) => `${xPositions[i]},${yEggs(val)}`).join(' ');
                const eggsLine = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                eggsLine.setAttribute('points', eggsPoints);
                eggsLine.setAttribute('fill', 'none');
                eggsLine.setAttribute('stroke', '#2ecc71');
                eggsLine.setAttribute('stroke-width', '3');
                svg.appendChild(eggsLine);

                // Eggs circles
                eggsSold.forEach((val, i) => {
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', xPositions[i]);
                    circle.setAttribute('cy', yEggs(val));
                    circle.setAttribute('r', '5');
                    circle.setAttribute('fill', '#2ecc71');
                    svg.appendChild(circle);
                });
            }

        } catch (err) {
            console.error('Failed to load sales trends:', err);
        }
    }

    loadSalesTrends();

    async function loadTopProducts() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch('/api/receipt-issues/top-products', { headers });
            if (!res.ok) throw new Error('Failed to fetch top products');
            const data = await res.json();

            const container = document.getElementById('top-products-bars');
            if (!container) return;

            if (!data || data.length === 0) {
                container.innerHTML = '<div class="egg-chart-row"><span class="egg-size-label">No data</span></div>';
                return;
            }

            const maxAmount = Math.max(...data.map(d => Number(d.amount)), 1);
            const colors = ['#a88805', '#e67e22', '#2ecc71', '#3498db', '#9b59b6', '#e74c3c', '#1abc9c', '#34495e'];

            container.innerHTML = data.map((item, i) => {
                const pct = (Number(item.amount) / maxAmount) * 100;
                const color = colors[i % colors.length];
                return `
                    <div class="egg-chart-row">
                        <span class="egg-size-label">${item.product}</span>
                        <div class="egg-bar-track">
                            <div class="egg-bar" style="width:${pct.toFixed(1)}%;background:${color};"></div>
                        </div>
                        <span class="bar-total">P${Number(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                `;
            }).join('');

        } catch (err) {
            console.error('Failed to load top products:', err);
            const container = document.getElementById('top-products-bars');
            if (container) container.innerHTML = '<div class="egg-chart-row"><span class="egg-size-label">Error loading</span></div>';
        }
    }

    loadTopProducts();

    async function loadTopCustomers() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch('/api/receipt-issues/top-customers', { headers });
            if (!res.ok) throw new Error('Failed to fetch top customers');
            const data = await res.json();

            const tbody = document.getElementById('top-customers-body');
            if (!tbody) return;

            if (!data || data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">No data</td></tr>';
                return;
            }

            tbody.innerHTML = data.map((item, i) => `
                <tr>
                    <td>${i + 1}</td>
                    <td>${item.customer}</td>
                    <td>P${Number(item.accumulated_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
            `).join('');

        } catch (err) {
            console.error('Failed to load top customers:', err);
            const tbody = document.getElementById('top-customers-body');
            if (tbody) tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Error loading</td></tr>';
        }
    }

    loadTopCustomers();
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);
}
