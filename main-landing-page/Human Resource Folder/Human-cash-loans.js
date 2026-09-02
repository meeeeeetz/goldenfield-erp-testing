if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-cash-loans'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>Cash Loans</h2>
        </div>
        <div class="action-buttons-row">
            <button id="apply-cash-advance-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span class="btn-label">Apply Cash Advance</span>
            </button>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Total Cash Loan</h3>
                <p class="card-sub-label">all cash advances by employees</p>
                <div class="card-value-row">
                    <div class="card-value">P 34,500.00</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Cash Loan Approved</h3>
                <p class="card-sub-label">approved cash advances</p>
                <div class="card-value-row">
                    <div class="card-value">P 15,000</div>
                    <span class="trend-up">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px;"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                        2%
                    </span>
                </div>
                <p class="vs-last-month">VS last month</p>
            </div>
            <div class="card tracking-card">
                <h3>Pending Cash Loans</h3>
                <p class="card-sub-label">awaiting approval</p>
                <div class="card-value-row">
                    <div class="card-value">3 pending</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Unrecovered Debt</h3>
                <p class="card-sub-label">debts that are not paid by employees</p>
                <div class="card-value-row">
                    <div class="card-value" id="unrecovered-debt-value">P 0,000.00</div>
                </div>
            </div>
        </div>
        <div class="card" style="margin-top: 20px; padding: 0; overflow: visible;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">Pending Cash Loans</h3>
            </div>
            <div style="padding: 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                            <thead>
                                <tr>
                                    <th style="width: 140px; padding: 2px; font-size: 15px; text-align: center;">Cash Advance ID</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Employee ID</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px; text-align: center;">Date</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px; text-align: center;">Last Name</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px; text-align: center;">First Name</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px; text-align: center;">Amount</th>
                                    <th style="width: 150px; padding: 2px; font-size: 15px; text-align: center;">Reason</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px; text-align: center;">No. of Payroll Cycle</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px; text-align: center;">Installment Amount</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Status</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Created by</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Action</th>
                                </tr>
                            </thead>
                    <tbody id="pending-cash-loan-tbody">
                        <tr><td colspan="12" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card" style="margin-top: 20px; padding: 0; overflow: visible;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">Employee Cash Loan</h3>
            </div>
            <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; flex-direction: column; gap: 4px; position: relative;">
                    <label style="font-size: 14px; font-weight: 600;">Search Employee</label>
                    <input type="text" id="employee-cash-loan-search" placeholder="Search active employee..." autocomplete="off" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                    <div id="employee-cash-loan-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; margin-top: 4px;">
                    </div>
                </div>
                <div id="employee-cash-loan-info" style="display: none;">
                    <div class="loan-history-layout">
                        <div class="loan-history-left">
                            <div class="loan-info-box" id="employee-cash-loan-details">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="employee-cash-loan-history-container" style="display: none;">
                    <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #1a1f2e;">Cash Loan History</h4>
                    <div style="overflow-x: auto;">
                        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px; margin: 0;">
                            <thead>
                                <tr>
                                    <th style="width: 140px; padding: 2px; font-size: 13px; text-align: center;">Cash Advance ID</th>
                                    <th style="width: 120px; padding: 2px; font-size: 13px; text-align: center;">Date</th>
                                    <th style="width: 100px; padding: 2px; font-size: 13px; text-align: center;">Amount</th>
                                    <th style="width: 150px; padding: 2px; font-size: 13px; text-align: center;">Reason</th>
                                    <th style="width: 140px; padding: 2px; font-size: 13px; text-align: center;">No. of Payroll Cycle</th>
                                    <th style="width: 140px; padding: 2px; font-size: 13px; text-align: center;">Installment Amount</th>
                                </tr>
                            </thead>
                            <tbody id="employee-cash-loan-history">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="employee-cash-loan-repayments-container" style="display: none;">
                    <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #1a1f2e;">Repayment History</h4>
                    <div style="overflow-x: auto;">
                        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px; margin: 0;">
                            <thead>
                                <tr>
                                    <th style="width: 160px; padding: 2px; font-size: 13px; text-align: center;">Repayment ID</th>
                                    <th style="width: 140px; padding: 2px; font-size: 13px; text-align: center;">Payroll Cycle ID</th>
                                    <th style="width: 100px; padding: 2px; font-size: 13px; text-align: center;">Amount Paid</th>
                                    <th style="width: 120px; padding: 2px; font-size: 13px; text-align: center;">Paid Date</th>
                                    <th style="width: 120px; padding: 2px; font-size: 13px; text-align: center;">Created Date</th>
                                </tr>
                            </thead>
                            <tbody id="employee-cash-loan-repayments">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="card" style="margin-top: 20px; padding: 0; overflow: visible;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">History of Cash Loans</h3>
            </div>
            <div style="padding: 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                            <thead>
                                <tr>
                                    <th style="width: 140px; padding: 2px; font-size: 15px; text-align: center;">Cash Advance ID</th>
                                    <th style="width: 160px; padding: 2px; font-size: 15px; text-align: center;">Cash Advance Repayment ID</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px; text-align: center;">Payroll Cycle ID</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Employee ID</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px; text-align: center;">Date</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px; text-align: center;">Paid Date</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px; text-align: center;">Last Name</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px; text-align: center;">First Name</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Amount</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Amount Paid</th>
                                    <th style="width: 150px; padding: 2px; font-size: 15px; text-align: center;">Reason</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px; text-align: center;">No. of Payroll Cycle</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px; text-align: center;">Installment Amount</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Status</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Created by</th>
                                     <th style="width: 120px; padding: 2px; font-size: 15px; text-align: center;">Action</th>
                                     <th style="width: 100px; padding: 2px; font-size: 15px; text-align: center;">Delete</th>
                                 </tr>
                             </thead>
                    <tbody id="cash-loan-history-tbody">
                        <tr><td colspan="17" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="apply-cash-advance-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 520px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Apply Cash Advance</h3>
                    <button class="modal-close-btn" id="close-apply-cash-advance-modal">&times;</button>
                </div>
                <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; flex-direction: column; gap: 4px; position: relative;">
                        <label style="font-size: 14px; font-weight: 600;">Search Employee</label>
                        <input type="text" id="cash-advance-search-name" placeholder="Search active employee..." autocomplete="off" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                        <div id="cash-advance-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; margin-top: 4px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Employee ID</label>
                            <input type="text" id="cash-advance-emp-id" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Last Name</label>
                            <input type="text" id="cash-advance-last-name" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">First Name</label>
                            <input type="text" id="cash-advance-first-name" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Outstanding Cash Advance</label>
                            <input type="text" id="cash-advance-outstanding" readonly placeholder="0.00" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 12px; display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                                <label style="font-size: 14px; font-weight: 600;">Amount</label>
                                <input type="number" id="cash-advance-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px; font-weight: 600;">Reason</label>
                            <textarea id="cash-advance-reason" rows="3" placeholder="Enter reason..." style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; resize: vertical;"></textarea>
                        </div>
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 12px; display: flex; flex-direction: column; gap: 12px;">
                        <label style="font-size: 14px; font-weight: 700; color: #000;">Repayment terms</label>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                                <label style="font-size: 14px;">Number of Payroll Cycle</label>
                                <input type="text" id="cash-advance-payroll-cycle" placeholder="e.g. 2" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                                <label style="font-size: 14px;">Per payroll cycle</label>
                                <input type="text" id="cash-advance-per-payroll" readonly placeholder="0.00" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px;">
                        <button id="cancel-apply-cash-advance-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px;">Cancel</button>
                        <button id="save-apply-cash-advance-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px;">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return '';
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day} ${year}`;
    }

    async function loadPendingCashLoans() {
        const tbody = document.getElementById('pending-cash-loan-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/cash-advances/pending');
            if (!res.ok) throw new Error('Failed to load pending cash loans');
            const logs = await res.json();
            renderPendingCashLoans(logs);
        } catch (err) {
            console.error('Pending cash loans error:', err);
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="12" style="text-align: center; padding: 20px; color: #999;">Failed to load pending cash loans</td></tr>';
            }
        }
    }

    function renderPendingCashLoans(logs) {
        const tbody = document.getElementById('pending-cash-loan-tbody');
        if (!tbody) return;

        if (!logs || logs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="12" style="text-align: center; padding: 20px; color: #999;">No pending cash loans</td></tr>';
            return;
        }

        tbody.innerHTML = logs.map(log => `
            <tr style="height: 32px;">
                <td style="padding: 2px; margin: 0; text-align: center;">${log.cashadvance_id || ''}</td>
                <td style="padding: 2px; margin: 0; text-align: center;">${log.employee_id || ''}</td>
                <td style="padding: 2px; margin: 0; text-align: center;">${formatDate(log.created_at)}</td>
                <td style="padding: 2px; margin: 0; text-align: center;">${log.last_name || ''}</td>
                <td style="padding: 2px; margin: 0; text-align: center;">${log.first_name || ''}</td>
                <td style="padding: 2px; margin: 0; text-align: center;">${log.amount != null ? formatCurrency(log.amount) : ''}</td>
                <td style="padding: 2px; margin: 0; text-align: center;">${log.reason || ''}</td>
                <td style="padding: 2px; margin: 0; text-align: center;">${log.no_of_payroll_cycle != null ? Number(log.no_of_payroll_cycle).toFixed(0) : ''}</td>
                <td style="padding: 2px; margin: 0; text-align: center;">${log.installment_amount != null ? formatCurrency(log.installment_amount) : ''}</td>
                <td style="padding: 2px; margin: 0; text-align: center;"><span style="background: ${log.status === 'Approved' ? '#d4edda' : log.status === 'Rejected' ? '#f8d7da' : '#FFF3CD'}; color: ${log.status === 'Approved' ? '#155724' : log.status === 'Rejected' ? '#721c24' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
                <td style="padding: 2px; margin: 0; text-align: center;">${log.created_by || ''}</td>
                <td style="padding: 2px; margin: 0; text-align: center;">
                    <button class="btn-primary approve-cash-loan-btn" data-cash-loan-id="${log.cashadvance_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; flex: 1; min-width: 70px; text-align: center;">Approve</button>
                    <button class="btn-reject reject-cash-loan-btn" data-cash-loan-id="${log.cashadvance_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; margin-left: 6px; background: #dc3545; color: white; border: none; border-radius: 4px; flex: 1; min-width: 70px; text-align: center;">Reject</button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.approve-cash-loan-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const cashLoanId = e.target.getAttribute('data-cash-loan-id');
                if (!cashLoanId) return;

                try {
                    const res = await fetch(`/api/cash-advances/${encodeURIComponent(cashLoanId)}/approve`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to approve cash loan');
                    }

                    alert(`Cash Loan ${cashLoanId} approved successfully`);
                    loadPendingCashLoans();
                    loadCashLoanHistory();
                } catch (err) {
                    console.error('Approve error:', err);
                    alert(err.message || 'Failed to approve cash loan');
                }
            });
        });

        tbody.querySelectorAll('.reject-cash-loan-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const cashLoanId = e.target.getAttribute('data-cash-loan-id');
                if (!cashLoanId) return;

                try {
                    const res = await fetch(`/api/cash-advances/${encodeURIComponent(cashLoanId)}/reject`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to reject cash loan');
                    }

                    alert(`Cash Loan ${cashLoanId} rejected successfully`);
                    loadPendingCashLoans();
                    loadCashLoanHistory();
                } catch (err) {
                    console.error('Reject error:', err);
                    alert(err.message || 'Failed to reject cash loan');
                }
            });
        });
    }

    async function loadCashLoanHistory() {
        const tbody = document.getElementById('cash-loan-history-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/cash-advances/all');
            if (!res.ok) throw new Error('Failed to load cash loan history');
            const logs = await res.json();

            if (!logs || logs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="17" style="text-align: center; padding: 20px; color: #999;">No cash loan history</td></tr>';
                return;
            }

            tbody.innerHTML = logs.map(log => `
                <tr style="height: 32px;">
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.cashadvance_id || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.cashadvance_repayment_id != null ? 'REP-' + String(log.cashadvance_repayment_id).padStart(9, '0') : ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.payroll_cycle_id || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.employee_id || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${formatDate(log.created_at)}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${formatDate(log.paid_at)}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.last_name || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.first_name || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.amount != null ? formatCurrency(log.amount) : ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.amount_paid != null ? formatCurrency(log.amount_paid) : ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.reason || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.no_of_payroll_cycle != null ? Number(log.no_of_payroll_cycle).toFixed(0) : ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.installment_amount != null ? formatCurrency(log.installment_amount) : ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;"><span style="background: ${log.status === 'Fully Paid' ? '#d4edda' : log.status === 'Approved' ? '#ecfccb' : log.status === 'Rejected' ? '#f8d7da' : '#FFF3CD'}; color: ${log.status === 'Fully Paid' ? '#155724' : log.status === 'Approved' ? '#3f6212' : log.status === 'Rejected' ? '#721c24' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${log.created_by || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">
                        ${log.status === 'Approved' ? `<button class="reject-history-cash-loan-btn" data-cash-loan-id="${log.cashadvance_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; background: #dc3545; color: white; border: none; border-radius: 4px;">Reject</button>` : ''}
                    </td>
                    <td style="padding: 2px; margin: 0; text-align: center;">
                        <button class="delete-history-cash-loan-btn" data-cash-loan-id="${log.cashadvance_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; background: #dc3545; color: white; border: none; border-radius: 4px;">Delete</button>
                    </td>
                </tr>
            `).join('');

            tbody.querySelectorAll('.reject-history-cash-loan-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const cashLoanId = e.target.getAttribute('data-cash-loan-id');
                    if (!cashLoanId) return;

                    if (!confirm('Are you sure you want to reject this cash advance?')) return;

                    try {
                        const res = await fetch(`/api/cash-advances/${encodeURIComponent(cashLoanId)}/reject`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' }
                        });

                        if (!res.ok) {
                            const errorData = await res.json().catch(() => ({}));
                            throw new Error(errorData.error || 'Failed to reject cash loan');
                        }

                        alert(`Cash Loan ${cashLoanId} rejected successfully`);
                        await loadCashLoanHistory();
                    } catch (err) {
                        console.error('Reject error:', err);
                        alert(err.message || 'Failed to reject cash loan');
                    }
                });
            });

            tbody.querySelectorAll('.delete-history-cash-loan-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const cashLoanId = e.target.getAttribute('data-cash-loan-id');
                    if (!cashLoanId) return;

                    if (!confirm(`Are you sure you want to permanently delete cash advance ${cashLoanId}? This action cannot be undone.`)) return;

                    try {
                        const res = await fetch(`/api/cash-advances/${encodeURIComponent(cashLoanId)}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' }
                        });

                        if (!res.ok) {
                            const errorData = await res.json().catch(() => ({}));
                            throw new Error(errorData.error || 'Failed to delete cash advance');
                        }

                        alert(`Cash advance ${cashLoanId} deleted successfully`);
                        await loadCashLoanHistory();
                    } catch (err) {
                        console.error('Delete error:', err);
                        alert(err.message || 'Failed to delete cash advance');
                    }
                });
            });
        } catch (err) {
            console.error('Failed to load cash loan history:', err);
            tbody.innerHTML = '<tr><td colspan="17" style="text-align: center; padding: 20px; color: #999;">Failed to load cash loan history</td></tr>';
        }
    }

    const formatCurrency = (value) => {
        const num = Number(value || 0);
        return 'P ' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    loadPendingCashLoans();
    loadCashLoanHistory();

    const applyCashAdvanceBtn = document.getElementById('apply-cash-advance-btn');
    const applyCashAdvanceModal = document.getElementById('apply-cash-advance-modal');
    const closeApplyCashAdvanceModal = document.getElementById('close-apply-cash-advance-modal');
    const cancelApplyCashAdvanceBtn = document.getElementById('cancel-apply-cash-advance-btn');
    const saveApplyCashAdvanceBtn = document.getElementById('save-apply-cash-advance-btn');
    const searchInput = document.getElementById('cash-advance-search-name');
    const searchResults = document.getElementById('cash-advance-search-results');
    let searchDebounce = null;

    const openApplyCashAdvanceModal = () => {
        if (applyCashAdvanceModal) applyCashAdvanceModal.style.display = 'flex';
    };

    const closeApplyCashAdvanceModalFn = () => {
        if (applyCashAdvanceModal) applyCashAdvanceModal.style.display = 'none';
    };

    if (applyCashAdvanceBtn) {
        applyCashAdvanceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openApplyCashAdvanceModal();
        });
    }

    if (closeApplyCashAdvanceModal) {
        closeApplyCashAdvanceModal.addEventListener('click', closeApplyCashAdvanceModalFn);
    }

    if (cancelApplyCashAdvanceBtn) {
        cancelApplyCashAdvanceBtn.addEventListener('click', closeApplyCashAdvanceModalFn);
    }

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/attendance-logs/search-employee?query=${encodeURIComponent(query)}`);
                    if (!res.ok) throw new Error('Failed to search employees');
                    const employees = await res.json();
                    renderSearchResults(employees);
                } catch (err) {
                    console.error('Search error:', err);
                    searchResults.style.display = 'none';
                }
            }, 300);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchResults.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    function renderSearchResults(employees) {
        if (!searchResults) return;
        if (!employees || employees.length === 0) {
            searchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No active employees found</div>';
            searchResults.style.display = 'block';
            return;
        }

        searchResults.innerHTML = employees.map(emp => `
            <div class="employee-search-result" data-employee-id="${emp.employee_id}" data-last-name="${emp.last_name || ''}" data-first-name="${emp.first_name || ''}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                <div style="font-weight: 600; color: #1a1f2e;">${emp.last_name || ''}, ${emp.first_name || ''}</div>
                <div style="font-size: 12px; color: #64748b;">${emp.employee_id || ''}</div>
            </div>
        `).join('');
        searchResults.style.display = 'block';

        searchResults.querySelectorAll('.employee-search-result').forEach(item => {
            item.addEventListener('click', async () => {
                const employeeId = item.getAttribute('data-employee-id');
                const lastName = item.getAttribute('data-last-name') || '';
                const firstName = item.getAttribute('data-first-name') || '';

                const empIdInput = document.getElementById('cash-advance-emp-id');
                const lastNameInput = document.getElementById('cash-advance-last-name');
                const firstNameInput = document.getElementById('cash-advance-first-name');

                if (empIdInput) empIdInput.value = employeeId;
                if (lastNameInput) lastNameInput.value = lastName;
                if (firstNameInput) firstNameInput.value = firstName;

                if (employeeId) {
                    try {
                        const outstandingRes = await fetch(`/api/cash-advances/outstanding/${encodeURIComponent(employeeId)}`);
                        if (outstandingRes.ok) {
                            const outstandingData = await outstandingRes.json();
                            const outstandingInput = document.getElementById('cash-advance-outstanding');
                            if (outstandingInput) outstandingInput.value = outstandingData.outstanding != null ? outstandingData.outstanding : '0.00';
                        }
                    } catch (err) {
                        console.error('Failed to load outstanding cash advance:', err);
                    }
                }

                if (searchInput) searchInput.value = '';
                if (searchResults) searchResults.style.display = 'none';
            });
        });
    }

    if (saveApplyCashAdvanceBtn) {
        saveApplyCashAdvanceBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const employeeId = document.getElementById('cash-advance-emp-id')?.value.trim();
            const amount = document.getElementById('cash-advance-amount')?.value.trim();
            const reason = document.getElementById('cash-advance-reason')?.value.trim();
            const payrollCycle = document.getElementById('cash-advance-payroll-cycle')?.value.trim();
            const installmentAmount = document.getElementById('cash-advance-per-payroll')?.value.trim();

            if (!employeeId || !amount || !payrollCycle || !installmentAmount) {
                alert('Please fill in all required fields');
                return;
            }

            try {
                const res = await fetch('/api/cash-advances', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        employee_id: employeeId,
                        ca_amount: parseFloat(amount),
                        reason: reason || null,
                        no_of_payroll_cycle: parseInt(payrollCycle) || 0,
                        installment_amount: parseFloat(installmentAmount)
                    })
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save cash advance');
                }

                alert('Cash advance applied successfully');
                if (applyCashAdvanceModal) applyCashAdvanceModal.style.display = 'none';
                loadPendingCashLoans();
                loadCashLoanHistory();
            } catch (err) {
                console.error('Save cash advance error:', err);
                alert(err.message || 'Failed to save cash advance');
            }
        });
    }

    const cashAdvanceAmount = document.getElementById('cash-advance-amount');
    const cashAdvancePayrollCycle = document.getElementById('cash-advance-payroll-cycle');
    const cashAdvancePerPayroll = document.getElementById('cash-advance-per-payroll');

    const calculatePerPayroll = () => {
        if (!cashAdvanceAmount || !cashAdvancePayrollCycle || !cashAdvancePerPayroll) return;
        const amount = parseFloat(cashAdvanceAmount.value) || 0;
        const cycles = parseFloat(cashAdvancePayrollCycle.value) || 0;
        if (cycles > 0) {
            const perCycle = amount / cycles;
            cashAdvancePerPayroll.value = perCycle.toFixed(2);
        } else {
            cashAdvancePerPayroll.value = '0.00';
        }
    };

    if (cashAdvanceAmount) {
        cashAdvanceAmount.addEventListener('input', calculatePerPayroll);
    }

    if (cashAdvancePayrollCycle) {
        cashAdvancePayrollCycle.addEventListener('input', calculatePerPayroll);
    }

    const employeeCashLoanSearch = document.getElementById('employee-cash-loan-search');
    const employeeCashLoanResults = document.getElementById('employee-cash-loan-search-results');
    const employeeCashLoanInfo = document.getElementById('employee-cash-loan-info');
    const employeeCashLoanHistoryContainer = document.getElementById('employee-cash-loan-history-container');
    const employeeCashLoanRepaymentsContainer = document.getElementById('employee-cash-loan-repayments-container');
    const employeeCashLoanHistory = document.getElementById('employee-cash-loan-history');
    const employeeCashLoanRepayments = document.getElementById('employee-cash-loan-repayments');
    let selectedEmployeeId = null;
    let employeeSearchDebounce = null;

    if (employeeCashLoanSearch && employeeCashLoanResults) {
        employeeCashLoanSearch.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length < 2) {
                employeeCashLoanResults.style.display = 'none';
                return;
            }

            clearTimeout(employeeSearchDebounce);
            employeeSearchDebounce = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/attendance-logs/search-employee?query=${encodeURIComponent(query)}`);
                    if (!res.ok) throw new Error('Failed to search employees');
                    const employees = await res.json();
                    renderEmployeeSearchResults(employees);
                } catch (err) {
                    console.error('Search error:', err);
                    employeeCashLoanResults.style.display = 'none';
                }
            }, 300);
        });

        employeeCashLoanSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                employeeCashLoanResults.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (employeeCashLoanSearch && !employeeCashLoanSearch.contains(e.target) && employeeCashLoanResults && !employeeCashLoanResults.contains(e.target)) {
                employeeCashLoanResults.style.display = 'none';
            }
        });
    }

    function renderEmployeeSearchResults(employees) {
        if (!employeeCashLoanResults) return;
        if (!employees || employees.length === 0) {
            employeeCashLoanResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No active employees found</div>';
            employeeCashLoanResults.style.display = 'block';
            return;
        }

        employeeCashLoanResults.innerHTML = employees.map(emp => `
            <div class="employee-search-result" data-employee-id="${emp.employee_id}" data-last-name="${emp.last_name || ''}" data-first-name="${emp.first_name || ''}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                <div style="font-weight: 600; color: #1a1f2e;">${emp.last_name || ''}, ${emp.first_name || ''}</div>
                <div style="font-size: 12px; color: #64748b;">${emp.employee_id || ''}</div>
            </div>
        `).join('');
        employeeCashLoanResults.style.display = 'block';

        employeeCashLoanResults.querySelectorAll('.employee-search-result').forEach(item => {
            item.addEventListener('click', async () => {
                const employeeId = item.getAttribute('data-employee-id');
                const lastName = item.getAttribute('data-last-name') || '';
                const firstName = item.getAttribute('data-first-name') || '';

                selectedEmployeeId = employeeId;
                if (employeeCashLoanSearch) employeeCashLoanSearch.value = `${lastName}, ${firstName}`;
                if (employeeCashLoanResults) employeeCashLoanResults.style.display = 'none';

                if (employeeId) {
                    await loadEmployeeCashLoanData(employeeId);
                }
            });
        });
    }

    async function loadEmployeeCashLoanData(employeeId) {
        if (!employeeCashLoanInfo || !employeeCashLoanHistory || !employeeCashLoanRepayments) return;

        try {
            const [cashAdvancesRes, outstandingRes] = await Promise.all([
                fetch(`/api/cash-advances/employee/${encodeURIComponent(employeeId)}`),
                fetch(`/api/cash-advances/outstanding/${encodeURIComponent(employeeId)}`)
            ]);

            if (!cashAdvancesRes.ok) throw new Error('Failed to load cash advances');
            const cashAdvances = await cashAdvancesRes.json();
            const outstandingData = outstandingRes.ok ? await outstandingRes.json() : { outstanding: 0 };

            const outstanding = Number(outstandingData.outstanding) || 0;
            employeeCashLoanInfo.style.display = 'block';
            employeeCashLoanInfo.innerHTML = `
                <div class="loan-info-box">
                    <div class="loan-info-row"><span class="loan-label">Employee ID:</span><span class="loan-value">${employeeId}</span></div>
                    <div class="loan-info-row"><span class="loan-label">Employee name:</span><span class="loan-value">${employeeCashLoanSearch ? employeeCashLoanSearch.value : ''}</span></div>
                    <div class="loan-info-row"><span class="loan-label">Outstanding Cash Advance:</span><span class="loan-value">${formatCurrency(outstanding)}</span></div>
                    <div class="loan-info-row"><span class="loan-label">Total Cash Loan:</span><span class="loan-value">${formatCurrency(cashAdvances.reduce((sum, ca) => sum + Number(ca.ca_amount || 0), 0))}</span></div>
                </div>
            `;

            if (!cashAdvances || cashAdvances.length === 0) {
                employeeCashLoanHistoryContainer.style.display = 'block';
                employeeCashLoanRepaymentsContainer.style.display = 'block';
                employeeCashLoanHistory.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #999;">No cash loan history found</td></tr>';
                employeeCashLoanRepayments.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;">No repayments found</td></tr>';
                return;
            }

            employeeCashLoanHistoryContainer.style.display = 'block';
            employeeCashLoanRepaymentsContainer.style.display = 'block';

            employeeCashLoanHistory.innerHTML = cashAdvances.map(ca => `
                <tr style="height: 32px;">
                    <td style="padding: 2px; margin: 0; text-align: center;">${ca.cashadvance_id || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${ca.created_at ? new Date(ca.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${formatCurrency(ca.ca_amount)}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${ca.reason || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${ca.no_of_payroll_cycle || 0}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${formatCurrency(ca.installment_amount)}</td>
                </tr>
            `).join('');

            const repayments = await Promise.all(
                cashAdvances.map(ca =>
                    fetch(`/api/cash-advance-repayments/cash-advance/${encodeURIComponent(ca.cashadvance_id)}`)
                        .then(res => res.ok ? res.json() : [])
                        .catch(() => [])
                )
            );

            const allRepayments = repayments.flat();
            if (allRepayments.length === 0) {
                employeeCashLoanRepayments.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;">No repayments found</td></tr>';
                return;
            }

            employeeCashLoanRepayments.innerHTML = allRepayments.map(rep => `
                <tr style="height: 32px;">
                    <td style="padding: 2px; margin: 0; text-align: center;">${rep.cashadvance_repayment_id != null ? 'REP-' + String(rep.cashadvance_repayment_id).padStart(9, '0') : ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${rep.payroll_cycle_id || ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${formatCurrency(rep.amount_paid)}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${rep.paid_at ? new Date(rep.paid_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</td>
                    <td style="padding: 2px; margin: 0; text-align: center;">${rep.created_at ? new Date(rep.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load employee cash loan data:', err);
            if (employeeCashLoanInfo) employeeCashLoanInfo.style.display = 'block';
            if (employeeCashLoanHistoryContainer) employeeCashLoanHistoryContainer.style.display = 'block';
            if (employeeCashLoanRepaymentsContainer) employeeCashLoanRepaymentsContainer.style.display = 'block';
            if (employeeCashLoanInfo) employeeCashLoanInfo.innerHTML = '<div style="padding: 20px; color: #999;">Failed to load employee data</div>';
            if (employeeCashLoanHistory) employeeCashLoanHistory.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #999;">Failed to load cash loan history</td></tr>';
            if (employeeCashLoanRepayments) employeeCashLoanRepayments.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;">Failed to load repayments</td></tr>';
        }
    }

    const loadUnrecoveredDebt = async () => {
        const unrecoveredDebtValue = document.getElementById('unrecovered-debt-value');
        if (!unrecoveredDebtValue) return;
        try {
            const res = await fetch('/api/cash-advances/unrecovered-debt');
            if (!res.ok) return;
            const data = await res.json();
            unrecoveredDebtValue.textContent = formatCurrency(data.unrecovered || 0);
        } catch (err) {
            console.error('Failed to load unrecovered debt:', err);
        }
    };

    loadUnrecoveredDebt();
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
