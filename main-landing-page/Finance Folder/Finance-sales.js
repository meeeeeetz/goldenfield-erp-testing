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
                    <div class="card-value">P234,500</div>
                    <span class="trend-up">▲ 3%</span>
                </div>
                <p class="vs-last-month">VS last selected period</p>
            </div>
            <div class="card tracking-card">
                <h3>Total Volume Sold</h3>
                <p class="card-sub-label">Total Number of Pcs sold for the selected period</p>
                <div class="card-value-row">
                    <div class="card-value">234,500 pcs</div>
                    <span class="trend-up">▲ 1%</span>
                </div>
                <p class="vs-last-month">VS last selected period</p>
            </div>
            <div class="card tracking-card">
                <h3>Average Order Value</h3>
                <p class="card-sub-label">the mean spend amount per customer Invoices</p>
                <div class="card-value-row">
                    <div class="card-value">P87,500.00</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Active Customer Count</h3>
                <p class="card-sub-label">Number of unique customer purchasing in the period</p>
                <div class="card-value-row">
                    <div class="card-value">5 customers</div>
                </div>
            </div>
        </div>
        <div class="finance-sales-row">
        <div class="card graph-placeholder sales-trends-card">
            <h3>Sales trends over time</h3>
            <div class="chart-wrap">
                <svg viewBox="0 0 760 360" class="egg-price-chart sales-line-chart" preserveAspectRatio="xMidYMid meet">
                    <line x1="70" y1="20" x2="70" y2="310" stroke="#D6D6D6" stroke-width="1"></line>
                    <line x1="70" y1="310" x2="730" y2="310" stroke="#D6D6D6" stroke-width="1"></line>
                    <line x1="70" y1="252" x2="730" y2="252" stroke="#D6D6D6" stroke-width="1"></line>
                    <line x1="70" y1="194" x2="730" y2="194" stroke="#D6D6D6" stroke-width="1"></line>
                    <line x1="70" y1="136" x2="730" y2="136" stroke="#D6D6D6" stroke-width="1"></line>
                    <line x1="70" y1="78" x2="730" y2="78" stroke="#D6D6D6" stroke-width="1"></line>
                    <line x1="70" y1="20" x2="730" y2="20" stroke="#D6D6D6" stroke-width="1"></line>
                    <text x="60" y="315" text-anchor="end" font-size="11" fill="#555">0</text>
                    <text x="60" y="256" text-anchor="end" font-size="11" fill="#555">50k</text>
                    <text x="60" y="198" text-anchor="end" font-size="11" fill="#555">100k</text>
                    <text x="60" y="140" text-anchor="end" font-size="11" fill="#555">150k</text>
                    <text x="60" y="82" text-anchor="end" font-size="11" fill="#555">200k</text>
                    <text x="60" y="24" text-anchor="end" font-size="11" fill="#555">250k</text>
                    <text x="114" y="335" text-anchor="middle" font-size="11" fill="#555">Feb</text>
                    <text x="234" y="335" text-anchor="middle" font-size="11" fill="#555">Mar</text>
                    <text x="354" y="335" text-anchor="middle" font-size="11" fill="#555">Apr</text>
                    <text x="474" y="335" text-anchor="middle" font-size="11" fill="#555">May</text>
                    <text x="594" y="335" text-anchor="middle" font-size="11" fill="#555">Jun</text>
                    <text x="714" y="335" text-anchor="middle" font-size="11" fill="#555">Jul</text>
                    <polyline points="114,199 234,96 334,140 466,108 598,250 730,180" fill="none" stroke="#a88805" stroke-width="3"></polyline>
                    <circle cx="114" cy="199" r="5" fill="#a88805"></circle>
                    <circle cx="234" cy="96" r="5" fill="#a88805"></circle>
                    <circle cx="334" cy="140" r="5" fill="#a88805"></circle>
                    <circle cx="466" cy="108" r="5" fill="#a88805"></circle>
                    <circle cx="598" cy="250" r="5" fill="#a88805"></circle>
                    <circle cx="730" cy="180" r="5" fill="#a88805"></circle>
                    <polyline points="114,280 234,250 334,210 466,170 598,130 730,95" fill="none" stroke="#2ecc71" stroke-width="3"></polyline>
                    <circle cx="114" cy="280" r="5" fill="#2ecc71"></circle>
                    <circle cx="234" cy="250" r="5" fill="#2ecc71"></circle>
                    <circle cx="334" cy="210" r="5" fill="#2ecc71"></circle>
                    <circle cx="466" cy="170" r="5" fill="#2ecc71"></circle>
                    <circle cx="598" cy="130" r="5" fill="#2ecc71"></circle>
                    <circle cx="730" cy="95" r="5" fill="#2ecc71"></circle>
                </svg>
            </div>
            <div class="chart-legend">
                <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#a88805"></span>Revenue</span>
                <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#2ecc71"></span>Volume</span>
            </div>
        </div>
        <div class="card graph-placeholder product-performance-card">
            <h3>Product Performance Break down</h3>
            <p class="card-sub-label">Top 8 Products Sales for the Period</p>
            <div class="egg-distribution-chart">
                <div class="egg-chart-bars">
                    <div class="egg-chart-row"><span class="egg-size-label">NW</span><div class="egg-bar-track"><div class="egg-bar" style="width:75%;background:#a88805;"></div></div><span class="bar-total">P45,200</span></div>
                    <div class="egg-chart-row"><span class="egg-size-label">PW</span><div class="egg-bar-track"><div class="egg-bar" style="width:87%;background:#e67e22;"></div></div><span class="bar-total">P52,800</span></div>
                    <div class="egg-chart-row"><span class="egg-size-label">XS</span><div class="egg-bar-track"><div class="egg-bar" style="width:63%;background:#2ecc71;"></div></div><span class="bar-total">P38,300</span></div>
                    <div class="egg-chart-row"><span class="egg-size-label">S</span><div class="egg-bar-track"><div class="egg-bar" style="width:97%;background:#3498db;"></div></div><span class="bar-total">P58,900</span></div>
                    <div class="egg-chart-row"><span class="egg-size-label">M</span><div class="egg-bar-track"><div class="egg-bar" style="width:92%;background:#9b59b6;"></div></div><span class="bar-total">P55,400</span></div>
                    <div class="egg-chart-row"><span class="egg-size-label">L</span><div class="egg-bar-track"><div class="egg-bar" style="width:70%;background:#e74c3c;"></div></div><span class="bar-total">P42,100</span></div>
                    <div class="egg-chart-row"><span class="egg-size-label">XL</span><div class="egg-bar-track"><div class="egg-bar" style="width:47%;background:#1abc9c;"></div></div><span class="bar-total">P28,700</span></div>
                    <div class="egg-chart-row"><span class="egg-size-label">J</span><div class="egg-bar-track"><div class="egg-bar" style="width:25%;background:#34495e;"></div></div><span class="bar-total">P15,300</span></div>
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
                    <tbody>
                        <tr><td>1</td><td>Egg works Distribution</td><td>P125,400.00</td></tr>
                        <tr><td>2</td><td>Charlene Ortega</td><td>P78,900.00</td></tr>
                        <tr><td>3</td><td>Ermilan Ignalig</td><td>P54,300.00</td></tr>
                        <tr><td>4</td><td>Ana Garcia</td><td>P31,200.00</td></tr>
                        <tr><td>5</td><td>Others</td><td>P12,750.00</td></tr>
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
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);
}
