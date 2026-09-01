if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['finance-loans'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="header-actions">
                <h2>Loans</h2>
            </div>
            <div class="action-buttons-row">
                <button id="apply-loan-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span class="btn-label">Apply for loan</span>
                </button>
                <button id="repay-loan-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span class="btn-label">Repay loan</span>
                </button>
                <button id="loan-account-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    <span class="btn-label">Add/remove loan account</span>
                </button>
            </div>
            <div class="tracking-cards-row">
                <div class="card tracking-card">
                    <h3>Total Active Loans</h3>
                    <p class="card-sub-label">All active loans</p>
                    <div class="card-value-row">
                        <div class="card-value">P34,567,890.00</div>
                    </div>
                </div>
                <div class="card tracking-card">
                    <h3>Active Lenders Count</h3>
                    <p class="card-sub-label">Total number of individuals we owe money to</p>
                    <div class="card-value-row">
                        <div class="card-value">4 persons</div>
                    </div>
                </div>
                <div class="card tracking-card">
                    <h3>Total Debt Cleared</h3>
                    <p class="card-sub-label">A progress metric comparing your starting debt from paid debts</p>
                    <div class="card-value-row">
                        <div class="card-value">35%</div>
                    </div>
                </div>
                <div class="card tracking-card">
                    <h3>Closed Ledger Counter</h3>
                    <p class="card-sub-label">Number of debts paid and closed</p>
                    <div class="card-value-row">
                        <div class="card-value">3 debts</div>
                    </div>
                </div>
            </div>
            <div class="loan-breakdown-row">
                <div class="card graph-placeholder expense-category-card">
                    <h3>Active loans break down</h3>
                    <div class="salary-chart-wrap">
                        <svg viewBox="0 0 220 220" class="salary-donut-chart">
                            <circle cx="110" cy="110" r="80" fill="none" stroke="#e0e0e0" stroke-width="30"></circle>
                            <circle cx="110" cy="110" r="80" fill="none" stroke="#a88805" stroke-width="30" stroke-dasharray="201.06 502.65" stroke-dashoffset="0" transform="rotate(-90 110 110)"></circle>
                            <circle cx="110" cy="110" r="80" fill="none" stroke="#e67e22" stroke-width="30" stroke-dasharray="125.66 502.65" stroke-dashoffset="-201.06" transform="rotate(-90 110 110)"></circle>
                            <circle cx="110" cy="110" r="80" fill="none" stroke="#2ecc71" stroke-width="30" stroke-dasharray="100.53 502.65" stroke-dashoffset="-326.72" transform="rotate(-90 110 110)"></circle>
                            <circle cx="110" cy="110" r="80" fill="none" stroke="#3498db" stroke-width="30" stroke-dasharray="75.40 502.65" stroke-dashoffset="-427.25" transform="rotate(-90 110 110)"></circle>
                        </svg>
                        <div class="chart-legend">
                            <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#a88805"></span>Bank Loan &mdash; P15,000,000</span>
                            <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#e67e22"></span>Private Lender &mdash; P8,000,000</span>
                            <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#2ecc71"></span>Supplier Credit &mdash; P7,000,000</span>
                            <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#3498db"></span>Equipment Finance &mdash; P4,567,890</span>
                        </div>
                    </div>
                </div>
                <div class="card graph-placeholder loan-summary-card">
                    <h3>Loan Summary</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Lender Name</th>
                                    <th>Original Loan</th>
                                    <th>Remaining Loan</th>
                                    <th>Current Status</th>
                                    <th>Next Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>ABC Bank</td><td>P 15,000,000.00</td><td>P 10,000,000.00</td><td>Active</td><td>2026-08-01</td></tr>
                                <tr><td>Private Lender A</td><td>P 8,000,000.00</td><td>P 6,500,000.00</td><td>Active</td><td>2026-07-28</td></tr>
                                <tr><td>Supplier Credit</td><td>P 7,000,000.00</td><td>P 5,200,000.00</td><td>Active</td><td>2026-08-05</td></tr>
                                <tr><td>Equipment Finance</td><td>P 4,567,890.00</td><td>P 2,867,890.00</td><td>Active</td><td>2026-07-30</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card graph-placeholder loan-transaction-card">
                <h3>Loan Transaction</h3>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Borrow</th>
                                <th>Pay Principal</th>
                                <th>Pay Interest</th>
                                <th>Remaining Loan</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>TRX-001</td><td>2026-06-15</td><td>P 10,000,000.00</td><td>P 2,000,000.00</td><td>P 500,000.00</td><td>P 8,000,000.00</td><td>Approved</td></tr>
                            <tr><td>TRX-002</td><td>2026-05-20</td><td>P 8,000,000.00</td><td>P 1,500,000.00</td><td>P 400,000.00</td><td>P 6,500,000.00</td><td>Approved</td></tr>
                            <tr><td>TRX-003</td><td>2026-04-10</td><td>P 7,000,000.00</td><td>P 1,800,000.00</td><td>P 350,000.00</td><td>P 5,200,000.00</td><td>Approved</td></tr>
                            <tr><td>TRX-004</td><td>2026-03-05</td><td>P 4,567,890.00</td><td>P 1,000,000.00</td><td>P 228,394.50</td><td>P 2,867,890.00</td><td>Pending</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card graph-placeholder loan-accounts-card">
                <h3>Loan Accounts</h3>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Account ID</th>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>ACC-001</td><td>ABC Bank</td><td>Active</td></tr>
                            <tr><td>ACC-002</td><td>Private Lender A</td><td>Active</td></tr>
                            <tr><td>ACC-003</td><td>Supplier Credit</td><td>Active</td></tr>
                            <tr><td>ACC-004</td><td>Equipment Finance</td><td>Closed</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);
}
