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
                    <span class="btn-label">Loan Account Management</span>
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
                                    <th>Loan Account</th>
                                    <th>Account Name</th>
                                    <th>Total Loans</th>
                                    <th>Total Principal Paid</th>
                                    <th>Total Interest Paid</th>
                                    <th>Total Balance</th>
                                </tr>
                            </thead>
                            <tbody id="loan-summary-table-body">
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
                                <th>Loan Transaction ID</th>
                                <th>Date</th>
                                <th>Loan Account</th>
                                <th>Borrow</th>
                                <th>Pay Principal</th>
                                <th>Pay Interest</th>
                                <th>Source Account</th>
                                <th>Check Number</th>
                                <th>Remaining Balance</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody id="loan-transactions-table-body">
                        </tbody>
                    </table>
                    <div class="pagination" id="loan-transactions-pagination"></div>
                </div>
            </div>
            <div class="card graph-placeholder loan-accounts-card">
                <h3>Loan Accounts</h3>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Loan Account ID</th>
                                <th>Company/Individual</th>
                                <th>Contact Details</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="loan-accounts-table-body">
                        </tbody>
                    </table>
                    <div class="pagination" id="loan-accounts-pagination"></div>
                </div>
            </div>
        </div>

        <!-- Loan Account Management Modal -->
        <div id="loan-account-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 700px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Loan Account Management</h3>
                    <button class="modal-close-btn" id="close-loan-account-modal">&times;</button>
                </div>
                <div class="modal-tabs">
                    <button class="modal-tab active" id="tab-create-loan-account" onclick="switchLoanAccountTab('create')">Create New Loan Account</button>
                    <button class="modal-tab" id="tab-edit-loan-account" onclick="switchLoanAccountTab('edit')">Edit Loan Account</button>
                </div>
                <div id="panel-create-loan-account" class="modal-tab-panel" style="display: block;">
                    <div class="modal-field">
                        <label>Loan Account ID</label>
                        <input type="text" id="create-loan-account-id" readonly />
                    </div>
                    <div class="modal-field">
                        <label>Company/Individual</label>
                        <input type="text" id="create-loan-company" placeholder="Enter company or individual name" />
                    </div>
                    <div class="modal-field">
                        <label>Contact Details</label>
                        <input type="text" id="create-loan-contact" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                    </div>
                    <div class="modal-field">
                        <label>Status</label>
                        <select id="create-loan-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="modal-tab-actions">
                        <button id="save-create-loan-account-btn" class="btn-primary">Save</button>
                    </div>
                </div>
                <div id="panel-edit-loan-account" class="modal-tab-panel" style="display: none;">
                    <div class="modal-field">
                        <label>Search Account</label>
                        <div style="position: relative;">
                            <input type="text" id="edit-loan-account-search" placeholder="Search by company/individual name..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                            <div id="edit-loan-account-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                        </div>
                    </div>
                    <div class="modal-field">
                        <label>Loan Account ID</label>
                        <input type="text" id="edit-loan-account-id" readonly />
                    </div>
                    <div class="modal-field">
                        <label>Company/Individual</label>
                        <input type="text" id="edit-loan-company" placeholder="Enter company or individual name" />
                    </div>
                    <div class="modal-field">
                        <label>Contact Details</label>
                        <input type="text" id="edit-loan-contact" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                    </div>
                    <div class="modal-field">
                        <label>Status</label>
                        <select id="edit-loan-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="modal-tab-actions">
                        <button id="save-edit-loan-account-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Apply for Loan Modal -->
        <div id="apply-loan-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 600px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Loan Application</h3>
                    <button class="modal-close-btn" id="close-apply-loan-modal">&times;</button>
                </div>
                <div class="modal-meta-row">
                    <div class="modal-field">
                        <label>Loan Application ID</label>
                        <input type="text" id="apply-loan-id" readonly />
                    </div>
                    <div class="modal-field">
                        <label>Date</label>
                        <input type="date" id="apply-loan-date" />
                    </div>
                </div>
                <div class="modal-meta-row">
                    <div class="modal-field">
                        <label>Loan Account</label>
                        <select id="apply-loan-account" class="modal-select">
                            <option value="">Select Loan Account</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Loan Balance</label>
                        <input type="text" id="apply-loan-balance" readonly placeholder="P 0.00" />
                    </div>
                </div>
                <div class="modal-field">
                    <label>Amount</label>
                    <input type="number" id="apply-loan-amount" placeholder="P 0.00" step="0.01" min="0" />
                </div>
                <div class="modal-tab-actions">
                    <button id="save-apply-loan-btn" class="btn-primary">Save</button>
                </div>
            </div>
        </div>

        <!-- Repay Loan Modal -->
        <div id="repay-loan-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 600px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Loan Payments</h3>
                    <button class="modal-close-btn" id="close-repay-loan-modal">&times;</button>
                </div>
                <div class="modal-meta-row">
                    <div class="modal-field">
                        <label>Loan Payment ID</label>
                        <input type="text" id="repay-loan-id" readonly />
                    </div>
                    <div class="modal-field">
                        <label>Date</label>
                        <input type="date" id="repay-loan-date" />
                    </div>
                </div>
                <div class="modal-meta-row">
                    <div class="modal-field">
                        <label>Loan Account</label>
                        <select id="repay-loan-account" class="modal-select">
                            <option value="">Select Loan Account</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Loan Balance</label>
                        <input type="text" id="repay-loan-balance" readonly placeholder="P 0.00" />
                    </div>
                </div>
                <div class="modal-meta-row">
                    <div class="modal-field">
                        <label>Payment Type</label>
                        <select id="repay-loan-payment-type" class="modal-select">
                            <option value="Principal">Principal</option>
                            <option value="Interest">Interest</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Amount</label>
                        <input type="number" id="repay-loan-amount" placeholder="P 0.00" step="0.01" min="0" />
                    </div>
                </div>
                <div class="modal-meta-row">
                    <div class="modal-field">
                        <label>Source Account</label>
                        <select id="repay-loan-source-account" class="modal-select">
                            <option value="">Select Source Account</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Check Number</label>
                        <input type="text" id="repay-loan-check-number" placeholder="Enter check number" />
                    </div>
                </div>
                <div class="modal-tab-actions">
                    <button id="save-repay-loan-btn" class="btn-primary">Save</button>
                </div>
            </div>
        </div>
    `;

    const API_BASE = '/api/loan-accounts';
    const API_BASE_LOAN_TRANSACTIONS = '/api/loan-transactions';

    // Tab switching
    window.switchLoanAccountTab = function(tab) {
        document.querySelectorAll('#loan-account-modal .modal-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('#loan-account-modal .modal-tab-panel').forEach(p => p.style.display = 'none');
        document.getElementById('tab-' + tab + '-loan-account').classList.add('active');
        document.getElementById('panel-' + tab + '-loan-account').style.display = 'block';
        if (tab === 'create') {
            loadNextLoanAccountId();
        }
    };

    // Loan Accounts Table
    var loanAccountsData = [];
    var loanAccountsCurrentPage = 1;
    var loanAccountsPerPage = 5;

    async function loadLoanAccountsTable() {
        const tbody = document.getElementById('loan-accounts-table-body');
        if (!tbody) return;

        try {
            const res = await fetch(API_BASE, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            if (!res.ok) throw new Error('Failed to fetch loan accounts');
            loanAccountsData = await res.json();
            // Filter only active accounts
            loanAccountsData = loanAccountsData.filter(a => a.status === 'Active');
            renderLoanAccountsTable();
        } catch (err) {
            console.error('Failed to load loan accounts', err);
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
        }
    }

    function renderLoanAccountsTable() {
        const tbody = document.getElementById('loan-accounts-table-body');
        if (!tbody) return;

        const start = (loanAccountsCurrentPage - 1) * loanAccountsPerPage;
        const end = start + loanAccountsPerPage;
        const pageData = loanAccountsData.slice(start, end);

        let rows = pageData.map(account => `
            <tr>
                <td>${account.loan_account_id || '-'}</td>
                <td>${account.company_individual || '-'}</td>
                <td>${account.contact_details || '-'}</td>
                <td>${account.status || '-'}</td>
            </tr>
        `).join('');

        // Fill remaining rows to always show 5
        const emptyRowsNeeded = loanAccountsPerPage - pageData.length;
        for (let i = 0; i < emptyRowsNeeded; i++) {
            rows += '<tr class="empty-row"><td colspan="4" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>';
        }

        tbody.innerHTML = rows;

        // Render pagination
        const totalPages = Math.max(1, Math.ceil(loanAccountsData.length / loanAccountsPerPage));
        renderLoanAccountsPagination(totalPages);
    }

    function renderLoanAccountsPagination(totalPages) {
        const container = document.getElementById('loan-accounts-pagination');
        if (!container || totalPages < 2) {
            if (container) container.innerHTML = '';
            return;
        }

        let html = '';
        html += `<button class="page-btn" ${loanAccountsCurrentPage === 1 ? 'disabled' : ''} onclick="loanAccountsCurrentPage--; renderLoanAccountsTable();">&lt;</button>`;
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${i === loanAccountsCurrentPage ? 'active' : ''}" onclick="loanAccountsCurrentPage=${i}; renderLoanAccountsTable();">${i}</button>`;
        }
        html += `<button class="page-btn" ${loanAccountsCurrentPage >= totalPages ? 'disabled' : ''} onclick="loanAccountsCurrentPage++; renderLoanAccountsTable();">&gt;</button>`;
        container.innerHTML = html;
    }

    // Load next ID
    async function loadNextLoanAccountId() {
        try {
            const res = await fetch(API_BASE + '/next-id', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            const data = await res.json();
            document.getElementById('create-loan-account-id').value = data.loan_account_id || '';
        } catch (err) {
            console.error('Failed to load next ID:', err);
        }
    }

    // Create new loan account
    const saveCreateBtn = document.getElementById('save-create-loan-account-btn');
    if (saveCreateBtn) {
        saveCreateBtn.addEventListener('click', async () => {
            const loanAccountId = document.getElementById('create-loan-account-id').value.trim();
            const company = document.getElementById('create-loan-company').value.trim();
            const contact = document.getElementById('create-loan-contact').value.trim();
            const status = document.getElementById('create-loan-status').value;

            if (!loanAccountId || !company) {
                alert('Loan Account ID and Company/Individual are required');
                return;
            }

            try {
                const res = await fetch(API_BASE, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        loan_account_id: loanAccountId,
                        company_individual: company,
                        contact_details: contact,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to create loan account');
                }

                alert('Loan account created successfully');
                document.getElementById('create-loan-company').value = '';
                document.getElementById('create-loan-contact').value = '';
                document.getElementById('create-loan-status').value = 'Active';
                loadNextLoanAccountId();
                loadLoanAccountsTable();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });
    }

    // Edit loan account - search
    const searchInput = document.getElementById('edit-loan-account-search');
    const searchResults = document.getElementById('edit-loan-account-search-results');
    let searchTimeout = null;

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            const query = searchInput.value.trim();
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            searchTimeout = setTimeout(async () => {
                try {
                    const res = await fetch(API_BASE + '?search=' + encodeURIComponent(query), {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    const accounts = await res.json();
                    if (accounts.length === 0) {
                        searchResults.innerHTML = '<div style="padding: 8px; color: #666;">No results found</div>';
                    } else {
                        searchResults.innerHTML = accounts.map(a => `
                            <div class="search-result-item" data-id="${a.loan_account_id}" style="padding: 8px; cursor: pointer; border-bottom: 1px solid #eee;">
                                <strong>${a.loan_account_id}</strong> - ${a.company_individual}
                            </div>
                        `).join('');
                        searchResults.querySelectorAll('.search-result-item').forEach(item => {
                            item.addEventListener('click', () => {
                                loadAccountForEdit(item.dataset.id);
                                searchResults.style.display = 'none';
                                searchInput.value = item.textContent.trim();
                            });
                        });
                    }
                    searchResults.style.display = 'block';
                } catch (err) {
                    console.error('Search failed:', err);
                }
            }, 300);
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // Load account for editing
    async function loadAccountForEdit(accountId) {
        try {
            const res = await fetch(API_BASE + '/' + encodeURIComponent(accountId), {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            const account = await res.json();
            document.getElementById('edit-loan-account-id').value = account.loan_account_id || '';
            document.getElementById('edit-loan-company').value = account.company_individual || '';
            document.getElementById('edit-loan-contact').value = account.contact_details || '';
            document.getElementById('edit-loan-status').value = account.status || 'Active';
        } catch (err) {
            console.error('Failed to load account:', err);
        }
    }

    // Save edited loan account
    const saveEditBtn = document.getElementById('save-edit-loan-account-btn');
    if (saveEditBtn) {
        saveEditBtn.addEventListener('click', async () => {
            const loanAccountId = document.getElementById('edit-loan-account-id').value.trim();
            const company = document.getElementById('edit-loan-company').value.trim();
            const contact = document.getElementById('edit-loan-contact').value.trim();
            const status = document.getElementById('edit-loan-status').value;

            if (!loanAccountId || !company) {
                alert('Loan Account ID and Company/Individual are required');
                return;
            }

            try {
                const res = await fetch(API_BASE + '/' + encodeURIComponent(loanAccountId), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        company_individual: company,
                        contact_details: contact,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to update loan account');
                }

                alert('Loan account updated successfully');
                loadLoanAccountsTable();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });
    }

    // Modal controls
    const loanAccountBtn = document.getElementById('loan-account-btn');
    const loanAccountModal = document.getElementById('loan-account-modal');
    const closeLoanAccountBtn = document.getElementById('close-loan-account-modal');

    if (loanAccountBtn) {
        loanAccountBtn.addEventListener('click', () => {
            loanAccountModal.classList.remove('hidden');
            loadNextLoanAccountId();
        });
    }

    if (closeLoanAccountBtn) {
        closeLoanAccountBtn.addEventListener('click', () => {
            loanAccountModal.classList.add('hidden');
        });
    }

    if (loanAccountModal) {
        loanAccountModal.addEventListener('click', (e) => {
            if (e.target === loanAccountModal) {
                loanAccountModal.classList.add('hidden');
            }
        });
    }

    // Contact number formatting
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

    setupContactNumber(document.getElementById('create-loan-contact'));
    setupContactNumber(document.getElementById('edit-loan-contact'));

    // Apply for Loan Modal

    async function loadNextLoanApplicationId() {
        try {
            const res = await fetch(API_BASE_LOAN_TRANSACTIONS + '/next-id?prefix=LoApID', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            const data = await res.json();
            document.getElementById('apply-loan-id').value = data.next_id || 'LoApID-1';
        } catch (err) {
            document.getElementById('apply-loan-id').value = 'LoApID-1';
        }
    }

    async function loadNextLoanPaymentId() {
        try {
            const res = await fetch(API_BASE_LOAN_TRANSACTIONS + '/next-id?prefix=LoPayID', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            const data = await res.json();
            document.getElementById('repay-loan-id').value = data.next_id || 'LoPayID-1';
        } catch (err) {
            document.getElementById('repay-loan-id').value = 'LoPayID-1';
        }
    }

    async function loadLoanAccountsForDropdown(selectId) {
        const select = document.getElementById(selectId);
        if (!select) return;
        try {
            const res = await fetch(API_BASE, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            const accounts = await res.json();
            const activeAccounts = accounts.filter(a => a.status === 'Active');
            select.innerHTML = '<option value="">Select Loan Account</option>' +
                activeAccounts.map(a => `<option value="${a.loan_account_id}">${a.loan_account_id} - ${a.company_individual}</option>`).join('');

            // Add onchange handler to update balance
            select.onchange = async function() {
                const accountId = this.value;
                const balanceInput = document.getElementById(selectId.replace('-account', '-balance'));
                if (!balanceInput) return;

                if (!accountId) {
                    balanceInput.value = 'P 0.00';
                    return;
                }

                try {
                    const balanceRes = await fetch(API_BASE_LOAN_TRANSACTIONS + '/account-balance/' + encodeURIComponent(accountId), {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    const balanceData = await balanceRes.json();
                    balanceInput.value = 'P ' + Number(balanceData.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                } catch (err) {
                    balanceInput.value = 'P 0.00';
                }
            };
        } catch (err) {
            console.error('Failed to load loan accounts for dropdown:', err);
        }
    }

    async function loadBankAccountsForDropdown(selectId) {
        const select = document.getElementById(selectId);
        if (!select) return;
        try {
            const res = await fetch('/api/bank-accounts', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            const accounts = await res.json();
            const activeAccounts = accounts.filter(a => a.status === 'Active');
            select.innerHTML = '<option value="">Select Source Account</option>' +
                activeAccounts.map(a => `<option value="${a.bank_account_id}">${a.bank} - ${a.bank_account_number}</option>`).join('');
        } catch (err) {
            console.error('Failed to load bank accounts for dropdown:', err);
        }
    }

    const applyLoanBtn = document.getElementById('apply-loan-btn');
    const applyLoanModal = document.getElementById('apply-loan-modal');
    const closeApplyLoanBtn = document.getElementById('close-apply-loan-modal');

    if (applyLoanBtn) {
        applyLoanBtn.addEventListener('click', () => {
            applyLoanModal.classList.remove('hidden');
            loadNextLoanApplicationId();
            loadLoanAccountsForDropdown('apply-loan-account');
        });
    }

    if (closeApplyLoanBtn) {
        closeApplyLoanBtn.addEventListener('click', () => {
            applyLoanModal.classList.add('hidden');
        });
    }

    if (applyLoanModal) {
        applyLoanModal.addEventListener('click', (e) => {
            if (e.target === applyLoanModal) applyLoanModal.classList.add('hidden');
        });
    }

    const saveApplyLoanBtn = document.getElementById('save-apply-loan-btn');
    if (saveApplyLoanBtn) {
        saveApplyLoanBtn.addEventListener('click', async () => {
            const loanAppId = document.getElementById('apply-loan-id').value.trim();
            const date = document.getElementById('apply-loan-date').value;
            const loanAccount = document.getElementById('apply-loan-account').value;
            const amount = document.getElementById('apply-loan-amount').value;

            if (!loanAppId || !date || !loanAccount || !amount) {
                alert('All fields are required');
                return;
            }

            try {
                const res = await fetch(API_BASE_LOAN_TRANSACTIONS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        loan_transaction_id: loanAppId,
                        date: date,
                        loan_account_id: loanAccount,
                        borrow_amount: parseFloat(amount),
                        payment_interest_amount: 0,
                        payment_principal_amount: 0
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to create loan application');
                }

                alert('Loan application created successfully');
                applyLoanModal.classList.add('hidden');
                loadLoanTransactionsTable();
                loadLoanSummaryTable();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });
    }

    // Repay Loan Modal
    const repayLoanBtn = document.getElementById('repay-loan-btn');
    const repayLoanModal = document.getElementById('repay-loan-modal');
    const closeRepayLoanBtn = document.getElementById('close-repay-loan-modal');

    if (repayLoanBtn) {
        repayLoanBtn.addEventListener('click', () => {
            repayLoanModal.classList.remove('hidden');
            loadNextLoanPaymentId();
            loadLoanAccountsForDropdown('repay-loan-account');
            loadBankAccountsForDropdown('repay-loan-source-account');
        });
    }

    if (closeRepayLoanBtn) {
        closeRepayLoanBtn.addEventListener('click', () => {
            repayLoanModal.classList.add('hidden');
        });
    }

    if (repayLoanModal) {
        repayLoanModal.addEventListener('click', (e) => {
            if (e.target === repayLoanModal) repayLoanModal.classList.add('hidden');
        });
    }

    const saveRepayLoanBtn = document.getElementById('save-repay-loan-btn');
    if (saveRepayLoanBtn) {
        saveRepayLoanBtn.addEventListener('click', async () => {
            const loanPayId = document.getElementById('repay-loan-id').value.trim();
            const date = document.getElementById('repay-loan-date').value;
            const loanAccount = document.getElementById('repay-loan-account').value;
            const paymentType = document.getElementById('repay-loan-payment-type').value;
            const amount = document.getElementById('repay-loan-amount').value;
            const sourceAccount = document.getElementById('repay-loan-source-account').value;
            const checkNumber = document.getElementById('repay-loan-check-number').value.trim();

            if (!loanPayId || !date || !loanAccount || !amount) {
                alert('All fields are required');
                return;
            }

            try {
                const isInterest = paymentType === 'Interest';
                const res = await fetch(API_BASE_LOAN_TRANSACTIONS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        loan_transaction_id: loanPayId,
                        date: date,
                        loan_account_id: loanAccount,
                        borrow_amount: 0,
                        payment_interest_amount: isInterest ? parseFloat(amount) : 0,
                        payment_principal_amount: isInterest ? 0 : parseFloat(amount),
                        source_account: sourceAccount || null,
                        check_number: checkNumber || null
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to create loan payment');
                }

                alert('Loan payment created successfully');
                repayLoanModal.classList.add('hidden');
                loadLoanTransactionsTable();
                loadLoanSummaryTable();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });
    }

    // Loan Transactions Table
    var loanTransactionsData = [];
    var loanTransactionsCurrentPage = 1;
    var loanTransactionsPerPage = 5;

    async function loadLoanTransactionsTable() {
        const tbody = document.getElementById('loan-transactions-table-body');
        if (!tbody) return;

        try {
            const res = await fetch(API_BASE_LOAN_TRANSACTIONS, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            if (!res.ok) throw new Error('Failed to fetch loan transactions');
            loanTransactionsData = await res.json();
            renderLoanTransactionsTable();
        } catch (err) {
            console.error('Failed to load loan transactions', err);
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
        }
    }

    function renderLoanTransactionsTable() {
        const tbody = document.getElementById('loan-transactions-table-body');
        if (!tbody) return;

        const start = (loanTransactionsCurrentPage - 1) * loanTransactionsPerPage;
        const end = start + loanTransactionsPerPage;
        const pageData = loanTransactionsData.slice(start, end);

        let runningBalance = 0;
        const fmt = (val) => 'P ' + Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Group transactions by account and calculate running balance per account
        const accountBalances = {};
        loanTransactionsData.forEach(t => {
            const acct = t.loan_account_id;
            if (!accountBalances[acct]) accountBalances[acct] = 0;
            accountBalances[acct] += (t.borrow_amount || 0) - (t.payment_principal_amount || 0);
        });

        let rows = pageData.map(t => {
            const acct = t.loan_account_id;
            const balance = (t.borrow_amount || 0) - (t.payment_principal_amount || 0);
            const currentBalance = accountBalances[acct];
            accountBalances[acct] -= balance;
            return `
                <tr>
                    <td>${t.loan_transaction_id || '-'}</td>
                    <td>${t.date ? new Date(t.date).toLocaleDateString() : '-'}</td>
                    <td>${acct || '-'}</td>
                    <td>${t.borrow_amount ? fmt(t.borrow_amount) : '-'}</td>
                    <td>${t.payment_principal_amount ? fmt(t.payment_principal_amount) : '-'}</td>
                    <td>${t.payment_interest_amount ? fmt(t.payment_interest_amount) : '-'}</td>
                    <td>${t.source_account || '-'}</td>
                    <td>${t.check_number || '-'}</td>
                    <td>${fmt(currentBalance)}</td>
                    <td><button class="delete-btn" data-id="${t.loan_transaction_id}" title="Delete Transaction" style="background:none; border:none; cursor:pointer; color:#e74c3c; font-size:18px; padding:4px 8px;">&times;</button></td>
                </tr>
            `;
        }).join('');

        // Fill remaining rows to always show 5
        const emptyRowsNeeded = loanTransactionsPerPage - pageData.length;
        for (let i = 0; i < emptyRowsNeeded; i++) {
            rows += '<tr class="empty-row"><td colspan="10" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>';
        }

        tbody.innerHTML = rows;

        // Add delete event listeners
        tbody.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const transactionId = btn.dataset.id;
                deleteLoanTransaction(transactionId);
            });
        });

        // Render pagination
        const totalPages = Math.max(1, Math.ceil(loanTransactionsData.length / loanTransactionsPerPage));
        renderLoanTransactionsPagination(totalPages);
    }

    async function deleteLoanTransaction(transactionId) {
        if (!confirm('Are you sure you want to delete this transaction?')) return;

        try {
            const res = await fetch(API_BASE_LOAN_TRANSACTIONS + '/' + encodeURIComponent(transactionId), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Failed to delete transaction');
            }

            alert('Transaction deleted successfully');
            loadLoanTransactionsTable();
            loadLoanSummaryTable();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    }

    function renderLoanTransactionsPagination(totalPages) {
        const container = document.getElementById('loan-transactions-pagination');
        if (!container || totalPages < 2) {
            if (container) container.innerHTML = '';
            return;
        }

        let html = '';
        html += `<button class="page-btn" ${loanTransactionsCurrentPage === 1 ? 'disabled' : ''} onclick="loanTransactionsCurrentPage--; renderLoanTransactionsTable();">&lt;</button>`;
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${i === loanTransactionsCurrentPage ? 'active' : ''}" onclick="loanTransactionsCurrentPage=${i}; renderLoanTransactionsTable();">${i}</button>`;
        }
        html += `<button class="page-btn" ${loanTransactionsCurrentPage >= totalPages ? 'disabled' : ''} onclick="loanTransactionsCurrentPage++; renderLoanTransactionsTable();">&gt;</button>`;
        container.innerHTML = html;
    }

    // Loan Summary Table
    async function loadLoanSummaryTable() {
        const tbody = document.getElementById('loan-summary-table-body');
        if (!tbody) return;

        try {
            const res = await fetch(API_BASE_LOAN_TRANSACTIONS + '/account-summary', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            if (!res.ok) throw new Error('Failed to fetch loan summary');
            const summaries = await res.json();
            renderLoanSummaryTable(summaries);
        } catch (err) {
            console.error('Failed to load loan summary', err);
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
        }
    }

    function renderLoanSummaryTable(summaries) {
        const tbody = document.getElementById('loan-summary-table-body');
        if (!tbody) return;

        const fmt = (val) => 'P ' + Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if (summaries.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: #94a3b8;">No active loan accounts</td></tr>';
            return;
        }

        tbody.innerHTML = summaries.map(s => `
            <tr>
                <td>${s.loan_account_id || '-'}</td>
                <td>${s.account_name || '-'}</td>
                <td>${fmt(s.total_loans)}</td>
                <td>${fmt(s.total_principal_paid)}</td>
                <td>${fmt(s.total_interest_paid)}</td>
                <td>${fmt(s.total_balance)}</td>
            </tr>
        `).join('');
    }

    // Load loan accounts table on init
    loadLoanAccountsTable();
    loadLoanTransactionsTable();
    loadLoanSummaryTable();
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);
}
