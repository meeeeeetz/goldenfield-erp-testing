if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['finance-movements'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="header-actions">
                <h2>Movements</h2>
            </div>
            <div class="action-buttons-row">
                <button id="record-movement-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span class="btn-label">Record Movements</span>
                </button>
            </div>
            <div style="margin-top: 24px; display: flex; gap: 16px; align-items: stretch;">
                <div class="card graph-placeholder" style="flex: 0 0 75%;">
                <h3>Money movements</h3>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Source Account</th>
                                <th>Recipient Account</th>
                                <th>Remarks</th>
                                <th>Check Details</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>2026-07-01</td><td>P 500,000.00</td><td>Main Account</td><td>Supplier A</td><td>Monthly payment</td><td>CHK-1001</td><td>Completed</td></tr>
                            <tr><td>2026-07-02</td><td>P 250,000.00</td><td>Petty Cash</td><td>Employee Reimbursement</td><td>Travel expenses</td><td>CHK-1002</td><td>Completed</td></tr>
                            <tr><td>2026-07-03</td><td>P 1,200,000.00</td><td>Main Account</td><td>Bank Loan Payment</td><td>Loan amortization</td><td>CHK-1003</td><td>Completed</td></tr>
                            <tr><td>2026-07-04</td><td>P 75,000.00</td><td>Operations</td><td>Vendor B</td><td>Material purchase</td><td>CHK-1004</td><td>Pending</td></tr>
                            <tr><td>2026-07-05</td><td>P 320,000.00</td><td>Sales Revenue</td><td>Main Account</td><td>Daily deposit</td><td>CHK-1005</td><td>Completed</td></tr>
                            <tr><td>2026-07-06</td><td>P 180,000.00</td><td>Main Account</td><td>Utility Provider</td><td>Electric bill</td><td>CHK-1006</td><td>Completed</td></tr>
                            <tr><td>2026-07-07</td><td>P 450,000.00</td><td>Main Account</td><td>Payroll</td><td>Monthly salaries</td><td>CHK-1007</td><td>Completed</td></tr>
                            <tr><td>2026-07-08</td><td>P 95,000.00</td><td>Petty Cash</td><td>Office Supplies</td><td>Stationery</td><td>CHK-1008</td><td>Completed</td></tr>
                            <tr><td>2026-07-09</td><td>P 600,000.00</td><td>Main Account</td><td>Equipment Finance</td><td>Machinery down payment</td><td>CHK-1009</td><td>Pending</td></tr>
                            <tr><td>2026-07-10</td><td>P 210,000.00</td><td>Sales Revenue</td><td>Main Account</td><td>Daily deposit</td><td>CHK-1010</td><td>Completed</td></tr>
                            <tr><td>2026-07-11</td><td>P 150,000.00</td><td>Main Account</td><td>Insurance Premium</td><td>Annual premium</td><td>CHK-1011</td><td>Completed</td></tr>
                            <tr><td>2026-07-12</td><td>P 88,000.00</td><td>Operations</td><td>Maintenance</td><td>Repair works</td><td>CHK-1012</td><td>Pending</td></tr>
                            <tr><td>2026-07-13</td><td>P 340,000.00</td><td>Main Account</td><td>Private Lender A</td><td>Loan payment</td><td>CHK-1013</td><td>Completed</td></tr>
                            <tr><td>2026-07-14</td><td>P 120,000.00</td><td>Petty Cash</td><td>Transportation</td><td>Fuel and logistics</td><td>CHK-1014</td><td>Completed</td></tr>
                            <tr><td>2026-07-15</td><td>P 275,000.00</td><td>Sales Revenue</td><td>Main Account</td><td>Daily deposit</td><td>CHK-1015</td><td>Completed</td></tr>
                            <tr><td>2026-07-16</td><td>P 190,000.00</td><td>Main Account</td><td>Professional Fees</td><td>Legal services</td><td>CHK-1016</td><td>Pending</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="pagination">
                    <button class="page-btn">&laquo; Prev</button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">2</button>
                    <button class="page-btn">Next &raquo;</button>
                </div>
            </div>
            <div class="card graph-placeholder" style="flex: 1;">
                <h3>Accounts</h3>
                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px; height: 100%; overflow: visible;">
                    <div style="width: 145%; padding: 0; border-radius: 8px; background: #f9f9f9; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; margin-left: 0; height: 175px;">
                        <img src="../../assets/Photos/Bank Logo PNB.png" alt="PNB Logo" style="height: 96px; width: auto; max-width: none; object-fit: contain; margin: 0; padding: 8px 0 0 8px;">
                        <div style="align-self: flex-end; text-align: right; padding: 0 8px 8px 8px;">
                            <div style="font-weight: 600; color: #1a1f2e; font-size: 16px;">Philippine National Bank</div>
                            <div style="font-size: 22px; font-weight: 700; color: #1a1f2e; margin-top: 8px;">P 1,234,500.00</div>
                        </div>
                    </div>
                    <div style="width: 145%; padding: 0; border-radius: 8px; background: #f9f9f9; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; margin-left: 0; height: 175px;">
                        <img src="../../assets/Photos/Bank Logo BDO.png" alt="BDO Logo" style="height: 48px; width: auto; max-width: none; object-fit: contain; margin: 0; padding: 8px 0 0 8px;">
                        <div style="align-self: flex-end; text-align: right; padding: 0 8px 8px 8px;">
                            <div style="font-weight: 600; color: #1a1f2e; font-size: 16px;">Banco De Oro</div>
                            <div style="font-size: 22px; font-weight: 700; color: #1a1f2e; margin-top: 8px;">P 5,345,000.00</div>
                        </div>
                    </div>
                    <div style="width: 145%; padding: 0; border-radius: 8px; background: #f9f9f9; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; margin-left: 0; height: 175px;">
                        <img src="../../assets/Photos/Bank Logo MBTC.png" alt="MBTC Logo" style="height: 96px; width: auto; max-width: none; object-fit: contain; margin: 0; padding: 8px 0 0 8px;">
                        <div style="align-self: flex-end; text-align: right; padding: 0 8px 8px 8px;">
                            <div style="font-weight: 600; color: #1a1f2e; font-size: 16px;">Metrobank</div>
                            <div style="font-size: 22px; font-weight: 700; color: #1a1f2e; margin-top: 8px;">P 66,345.00</div>
                        </div>
                    </div>
                    <div style="width: 145%; padding: 0; border-radius: 8px; background: #f9f9f9; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; margin-left: 0; height: 175px;">
                        <img src="../../assets/Photos/Bank-Logo-Cash.png" alt="Cash Logo" style="height: 120px; width: auto; max-width: none; object-fit: contain; margin: 0; padding: 3px 0 0 8px;">
                        <div style="align-self: flex-end; text-align: right; padding: 0 8px 8px 8px;">
                            <div style="font-weight: 600; color: #1a1f2e; font-size: 16px;">Petty Cash</div>
                            <div style="font-size: 22px; font-weight: 700; color: #1a1f2e; margin-top: 8px;">P 123,000.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    if (typeof render !== 'function') {
        console.error('[MODULE RUNTIME ERROR]: render is not a function for tab:', currentTab);
        return;
    }
    render(contentArea);
}
