if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-13th-month'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>13th month Pay</h2>
        </div>
        <div class="action-buttons-row">
            <button id="generate-year-end-13th-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="10" y2="14"></line><line x1="14" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="10" y2="18"></line><line x1="14" y1="18" x2="16" y2="18"></line></svg>
                <span class="btn-label">Generate Year End13th month</span>
            </button>
            <button id="generate-prorated-13th-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span class="btn-label">Generate Prorated 13th month</span>
            </button>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Accumulated 13th month</h3>
                <p class="card-sub-label">grand total for year end 13th month pay</p>
                <div class="card-value-row">
                    <div class="card-value">P 234,567.00</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Total Prorated Paid-to-date</h3>
                <p class="card-sub-label">a running total of 13th month that had been paid out early</p>
                <div class="card-value-row">
                    <div class="card-value">P 34,500.00</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Last Year 13th month Total payouts</h3>
                <p class="card-sub-label">total accumulation of last years 13th month prorated and Year end</p>
                <div class="card-value-row">
                    <div class="card-value">P 350,000.00</div>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder month13-employee-search-card">
            <div class="card-header-row">
                <h3>Employee Search</h3>
                <input type="text" class="employee-search-input" placeholder="Search employee...">
            </div>
            <div class="month13-search-layout">
                <div class="month13-search-left">
                    <div class="employee-card">
                        <div class="emp-photo">👤</div>
                        <div class="emp-info">
                            <div class="emp-name">Juan Dela Cruz</div>
                            <div class="emp-id">EMP-001</div>
                            <div class="emp-start">Start Date: Jan 15, 2024</div>
                            <div class="emp-accrued">Accrued Total: P 45,000.00</div>
                            <div class="emp-running">Running 13th month: P 12,000.00</div>
                        </div>
                    </div>
                </div>
                <div class="month13-search-right">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Days worked</th>
                                <th>Salary</th>
                                <th>13th month</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>January</td><td>22</td><td>P 25,000.00</td><td>P 2,083.33</td></tr>
                            <tr><td>February</td><td>20</td><td>P 25,000.00</td><td>P 1,888.89</td></tr>
                            <tr><td>March</td><td>23</td><td>P 25,000.00</td><td>P 2,166.67</td></tr>
                            <tr><td>April</td><td>21</td><td>P 25,000.00</td><td>P 1,972.22</td></tr>
                            <tr><td>May</td><td>22</td><td>P 25,000.00</td><td>P 2,083.33</td></tr>
                            <tr><td>June</td><td>20</td><td>P 25,000.00</td><td>P 1,888.89</td></tr>
                            <tr><td>July</td><td>23</td><td>P 25,000.00</td><td>P 2,166.67</td></tr>
                            <tr><td>August</td><td>21</td><td>P 25,000.00</td><td>P 1,972.22</td></tr>
                            <tr><td>September</td><td>22</td><td>P 25,000.00</td><td>P 2,083.33</td></tr>
                            <tr><td>October</td><td>20</td><td>P 25,000.00</td><td>P 1,888.89</td></tr>
                            <tr><td>November</td><td>21</td><td>P 25,000.00</td><td>P 1,972.22</td></tr>
                            <tr><td>December</td><td>22</td><td>P 25,000.00</td><td>P 2,083.33</td></tr>
                        </tbody>
                        <tfoot>
                            <tr class="month13-total-row"><td colspan="3">Total 13th month</td><td>P 14,000.00</td></tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder month13-transaction-card">
            <h3>13thmonth pay transactions</h3>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th>13thmonth transaction ID</th>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th>Amount</th>
                            <th>Mode of payment</th>
                            <th>Reference</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>13M-001</td><td>2026-07-01</td><td>Year-end payout</td><td>P 234,567.00</td><td>Bank Transfer</td><td>REF-13M-001</td><td>Paid</td></tr>
                        <tr><td>13M-002</td><td>2026-06-15</td><td>Prorated payout</td><td>P 34,500.00</td><td>Cash</td><td>REF-13M-002</td><td>Pending</td></tr>
                        <tr><td>13M-003</td><td>2025-12-20</td><td>Last year payout</td><td>P 350,000.00</td><td>Bank Transfer</td><td>REF-13M-003</td><td>Paid</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'human-resources';
    const render = ModuleComponents[currentTab] || ModuleComponents['human-resources'];
    if (typeof render !== 'function') {
        console.error('[MODULE RUNTIME ERROR]: render is not a function for tab:', currentTab);
        return;
    }
    render(contentArea);
}
