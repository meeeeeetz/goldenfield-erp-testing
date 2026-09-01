if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['finance-bank-management'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="header-actions">
                <h2>Bank management</h2>
            </div>
            <div class="action-buttons-row">
                <button id="manage-bank-accounts-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                    <span class="btn-label">Manage Bank accounts</span>
                </button>
                <button id="register-checks-btn" class="btn-icon-circle" onclick="switchTab('finance-check-management')">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span class="btn-label">Register Checks</span>
                </button>
                <button id="upload-bank-statement-btn" class="btn-icon-circle" onclick="switchTab('finance-bank-statement')">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span class="btn-label">Upload bank Statement</span>
                </button>
            </div>
            <div class="card" style="margin-top: 24px; overflow: hidden;">
                <h3>Accounts</h3>
                <div id="accounts-carousel" style="display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; margin-top: 12px; scroll-behavior: auto; -webkit-overflow-scrolling: touch; cursor: grab; width: 100%;">
                </div>
            </div>
            <div class="card" style="margin-top: 24px;">
                <h3>Bank Accounts</h3>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Bank Account ID</th>
                                <th>Bank Code</th>
                                <th>Bank</th>
                                <th>Address</th>
                                <th>Bank Account No.</th>
                                <th>Status</th>
                                <th>Starting Bank Cash</th>
                            </tr>
                        </thead>
                        <tbody id="bank-accounts-table-body">
                            <tr><td>BA-001</td><td>PNB</td><td>PNB</td><td>123 Main St, Manila</td><td>2029123123</td><td>Active</td><td>100564.15</td></tr>
                            <tr><td>BA-002</td><td>BDO</td><td>BDO</td><td>456 Oak Ave, Quezon City</td><td>1234-1234-1234</td><td>Active</td><td>0.00</td></tr>
                            <tr><td>BA-003</td><td>MBTC</td><td>MBTC</td><td>789 Pine Rd, Makati</td><td>8655-4555-4444-34</td><td>Active</td><td>98401.06</td></tr>
                            <tr><td>BA-004</td><td>BDO</td><td>BDO 2</td><td>321 Elm St, Pasig</td><td>1235-9456-7345</td><td>Active</td><td>0.00</td></tr>
                            <tr><td>BA-005</td><td>Security Bank</td><td>SECB</td><td>654 Maple Dr, Taguig</td><td>4567-8901-2345</td><td>Active</td><td>0.00</td></tr>
                            <tr><td>BA-006</td><td>Landbank</td><td>LBP</td><td>987 Cedar Ln, Mandaluyong</td><td>3210-9876-5432</td><td>Active</td><td>0.00</td></tr>
                            <tr><td>BA-007</td><td>China Bank</td><td>CHIB</td><td>147 Birch Blvd, San Juan</td><td>1357-2468-0246</td><td>Active</td><td>0.00</td></tr>
                            <tr><td>BA-008</td><td>UnionBank</td><td>UBP</td><td>258 Aspen Ct, Paranaque</td><td>8642-0753-1975</td><td>Active</td><td>0.00</td></tr>
                            <tr><td>BA-009</td><td>Metrobank</td><td>MBTC</td><td>369 Walnut St, Pasay</td><td>7410-3698-2145</td><td>Active</td><td>0.00</td></tr>
                            <tr><td>BA-010</td><td>RCBC</td><td>RCBC</td><td>159 Cherry Rd, Las Pinas</td><td>9630-8520-7410</td><td>Inactive</td><td>0.00</td></tr>
                        </tbody>
                    </table>
                    <div class="pagination" id="bank-accounts-pagination"></div>
                </div>
            </div>
            <div id="bank-accounts-modal" class="modal" style="display:none;">
                <div class="modal-content bank-accounts-modal">
                    <div class="modal-header-row">
                        <h3>Manage Bank Accounts</h3>
                        <button class="modal-close-btn" id="close-bank-accounts-modal">&times;</button>
                    </div>
                    <div class="modal-tabs">
                        <button class="modal-tab active" data-tab="add-bank-account">Add Bank Account</button>
                        <button class="modal-tab" data-tab="edit-bank-account">Edit Bank Account</button>
                    </div>
                    <div class="modal-tab-panel" id="panel-add-bank-account">
                        <label>Bank Account ID</label>
                        <input type="text" id="add-bank-account-id" value="BnkAc-001" readonly>
                        <label>Bank Code</label>
                        <input type="text" id="add-bank-code" placeholder="Enter bank code">
                        <label>Bank</label>
                        <input type="text" id="add-bank-name" placeholder="Enter bank name">
                        <label>Address</label>
                        <input type="text" id="add-bank-address" placeholder="Enter bank address">
                        <label>Bank Account Number</label>
                        <input type="text" id="add-bank-account-number" placeholder="Enter account number">
                        <label>Starting Bank Cash</label>
                        <input type="number" id="add-starting-bank-cash" placeholder="0.00" step="0.01" min="0">
                        <label>Status</label>
                        <select id="add-bank-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Terminated">Terminated</option>
                        </select>
                        <div class="modal-tab-actions">
                            <button class="btn-primary" id="add-bank-account-btn">Save</button>
                        </div>
                    </div>
                    <div class="modal-tab-panel" id="panel-edit-bank-account" style="display:none;">
                        <label>Search Bank Code</label>
                        <select id="edit-bank-code-search" class="modal-select">
                            <option value="">Select Bank Code</option>
                        </select>
                        <label>Bank Account ID</label>
                        <input type="text" id="edit-bank-account-id" readonly>
                        <label>Bank</label>
                        <input type="text" id="edit-bank-name" placeholder="Enter bank name">
                        <label>Address</label>
                        <input type="text" id="edit-bank-address" placeholder="Enter bank address">
                        <label>Bank Account Number</label>
                        <input type="text" id="edit-bank-account-number" placeholder="Enter account number">
                        <label>Starting Bank Cash</label>
                        <input type="number" id="edit-starting-bank-cash" placeholder="0.00" step="0.01" min="0">
                        <label>Status</label>
                        <select id="edit-bank-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Terminated">Terminated</option>
                        </select>
                        <div class="modal-tab-actions">
                            <button class="btn-primary" id="edit-bank-account-btn">Save</button>
                            <button class="btn-danger" id="delete-bank-account-btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

var API_BASE_BANK_ACCOUNTS = '/api/bank-accounts';

async function loadAccountsCarousel() {
    const carousel = document.getElementById('accounts-carousel');
    if (!carousel) return;

    try {
        const res = await fetch(`${API_BASE_BANK_ACCOUNTS}`);
        if (!res.ok) throw new Error('Failed to fetch bank accounts');
        const accounts = await res.json();

        carousel.innerHTML = accounts.map(acc => `
            <div style="flex: 0 0 calc(33.333% - 12px); padding: 24px; border-radius: 8px; background: #f9f9f9; border: 1px solid #e0e0e0;">
                <div style="font-weight: 700; font-size: 22px; color: #1a1f2e;">${acc.bank || '-'}</div>
                <div style="font-size: 14px; color: #555; margin-top: 6px;">${acc.bank_code || ''}</div>
                <div style="font-size: 14px; color: #555; margin-top: 4px;">Account No. : ${acc.bank_account_number || '-'}</div>
                <div style="font-size: 14px; color: #555; margin-top: 4px;">Starting Cash : P ${Number(acc.starting_bank_cash || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div style="font-size: 24px; font-weight: 700; color: #1a1f2e; margin-top: 10px;">${acc.status || ''}</div>
            </div>
        `).join('');

        initAccountsCarousel();
    } catch (err) {
        console.error('Failed to load accounts carousel', err);
        carousel.innerHTML = '<div style="padding: 20px; color: #e74c3c;">Failed to load accounts</div>';
    }
}

function initAccountsCarousel() {
    const carousel = document.getElementById('accounts-carousel');
    if (!carousel) return;

    const originalCards = Array.from(carousel.children);
    const cardCount = originalCards.length;
    if (cardCount === 0) return;

    const clonesBefore = originalCards.map(card => card.cloneNode(true));
    const clonesAfter = originalCards.map(card => card.cloneNode(true));
    clonesBefore.forEach(clone => carousel.insertBefore(clone, carousel.firstChild));
    clonesAfter.forEach(clone => carousel.appendChild(clone));

    let originalWidth = 0;
    const gap = 16;

    function initCarouselDimensions() {
        originalWidth = 0;
        originalCards.forEach(card => {
            originalWidth += card.offsetWidth + gap;
        });
        carousel.scrollLeft = originalWidth;
    }

    window.addEventListener('load', initCarouselDimensions);
    window.addEventListener('resize', initCarouselDimensions);
    setTimeout(initCarouselDimensions, 50);

    carousel.addEventListener('scroll', () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const threshold = 2;
        if (carousel.scrollLeft <= threshold) {
            carousel.scrollLeft = originalWidth + carousel.scrollLeft;
        } else if (carousel.scrollLeft >= maxScroll - threshold) {
            carousel.scrollLeft = carousel.scrollLeft - originalWidth;
        }
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    const stopDragging = () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    };

    carousel.addEventListener('mouseleave', stopDragging);
    carousel.addEventListener('mouseup', stopDragging);

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            carousel.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    }, { passive: true });
}

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);
    loadAccountsCarousel();
    loadBankAccountsTable();

    const manageBtn = document.getElementById('manage-bank-accounts-btn');
    const modal = document.getElementById('bank-accounts-modal');
    const closeBtn = document.getElementById('close-bank-accounts-modal');

    if (manageBtn && modal) {
        manageBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    const tabs = modal ? modal.querySelectorAll('.modal-tab') : [];
    const panels = modal ? modal.querySelectorAll('.modal-tab-panel') : [];

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.style.display = 'none');
            tab.classList.add('active');
            const panelId = 'panel-' + tab.dataset.tab;
            const panel = document.getElementById(panelId);
            if (panel) panel.style.display = 'flex';
            
            if (tab.dataset.tab === 'edit-bank-account') {
                loadBankCodeOptions();
            } else if (tab.dataset.tab === 'add-bank-account') {
                loadNextBankAccountId();
            }
        });
    });

    if (manageBtn && modal) {
        manageBtn.addEventListener('click', async () => {
            modal.style.display = 'flex';
            await loadBankCodeOptions();
            await loadNextBankAccountId();
        });
    }

    async function loadNextBankAccountId() {
        const idInput = document.getElementById('add-bank-account-id');
        if (!idInput) return;
        
        try {
            const res = await fetch(`${API_BASE_BANK_ACCOUNTS}/next-id`);
            if (res.ok) {
                const data = await res.json();
                idInput.value = data.bank_account_id || 'BnkAc-001';
            }
        } catch (err) {
            console.error('Failed to load next bank account ID', err);
        }
    }

    async function loadBankCodeOptions() {
        const select = document.getElementById('edit-bank-code-search');
        if (!select) return;
        
        try {
            const res = await fetch(`${API_BASE_BANK_ACCOUNTS}`);
            if (res.ok) {
                const accounts = await res.json();
                select.innerHTML = '<option value="">Select Bank Code</option>' +
                    accounts.map(acc => `<option value="${acc.bank_code}">${acc.bank_code}</option>`).join('');
            }
        } catch (err) {
            console.error('Failed to load bank codes', err);
        }
    }

    const editBankSearch = document.getElementById('edit-bank-code-search');
    if (editBankSearch) {
        editBankSearch.addEventListener('change', async (e) => {
            const selected = e.target.value;
            const accountIdInput = document.getElementById('edit-bank-account-id');
            const nameInput = document.getElementById('edit-bank-name');
            const addressInput = document.getElementById('edit-bank-address');
            const accountNumberInput = document.getElementById('edit-bank-account-number');
            const statusSelect = document.getElementById('edit-bank-status');
            const startingCashInput = document.getElementById('edit-starting-bank-cash');
            
            if (selected && accountIdInput) {
                try {
                    const res = await fetch(`${API_BASE_BANK_ACCOUNTS}/code/${encodeURIComponent(selected)}`);
                    if (res.ok) {
                        const accounts = await res.json();
                        if (accounts.length > 0) {
                            const account = accounts[0];
                            accountIdInput.value = account.bank_account_id || '';
                            if (nameInput) nameInput.value = account.bank || '';
                            if (addressInput) addressInput.value = account.address || '';
                            if (accountNumberInput) accountNumberInput.value = account.bank_account_number || '';
                            if (statusSelect) statusSelect.value = account.status || 'Active';
                            if (startingCashInput) startingCashInput.value = account.starting_bank_cash || 0;
                        }
                    }
                } catch (err) {
                    console.error('Failed to load bank account', err);
                }
            }
        });
    }

    const addBankBtn = document.getElementById('add-bank-account-btn');
    if (addBankBtn) {
        addBankBtn.addEventListener('click', async () => {
            const bankAccountId = document.getElementById('add-bank-account-id').value;
            const bankCode = document.getElementById('add-bank-code').value;
            const bank = document.getElementById('add-bank-name').value;
            const address = document.getElementById('add-bank-address').value;
            const bankAccountNumber = document.getElementById('add-bank-account-number').value;
            const startingCash = document.getElementById('add-starting-bank-cash').value;
            const status = document.getElementById('add-bank-status').value;
            
            if (!bankCode || !bank || !bankAccountNumber) {
                alert('Please fill in all required fields');
                return;
            }
            
            try {
                const res = await fetch(`${API_BASE_BANK_ACCOUNTS}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bank_account_id: bankAccountId, bank_code: bankCode, bank, address, bank_account_number: bankAccountNumber, status, starting_bank_cash: startingCash || 0 })
                });
                
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                
                alert('Bank account added successfully');
                if (modal) modal.style.display = 'none';
                loadBankAccountsTable();
            } catch (err) {
                console.error('Failed to add bank account', err);
                alert('Error adding bank account: ' + err.message);
            }
        });
    }

    const editBankBtn = document.getElementById('edit-bank-account-btn');
    if (editBankBtn) {
        editBankBtn.addEventListener('click', async () => {
            const bankAccountId = document.getElementById('edit-bank-account-id').value;
            const bankCode = document.getElementById('edit-bank-code-search').value;
            const bank = document.getElementById('edit-bank-name').value;
            const address = document.getElementById('edit-bank-address').value;
            const bankAccountNumber = document.getElementById('edit-bank-account-number').value;
            const startingCash = document.getElementById('edit-starting-bank-cash').value;
            const status = document.getElementById('edit-bank-status').value;
            
            if (!bankAccountId || !bankCode || !bank || !bankAccountNumber) {
                alert('Please fill in all required fields');
                return;
            }
            
            try {
                const res = await fetch(`${API_BASE_BANK_ACCOUNTS}/${encodeURIComponent(bankAccountId)}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bank_code: bankCode, bank, address, bank_account_number: bankAccountNumber, status, starting_bank_cash: startingCash || 0 })
                });
                
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                
                alert('Bank account updated successfully');
                if (modal) modal.style.display = 'none';
                loadBankAccountsTable();
            } catch (err) {
                console.error('Failed to update bank account', err);
                alert('Error updating bank account: ' + err.message);
            }
        });
    }

    const deleteBankBtn = document.getElementById('delete-bank-account-btn');
    if (deleteBankBtn) {
        deleteBankBtn.addEventListener('click', async () => {
            const bankAccountId = document.getElementById('edit-bank-account-id').value;
            if (!bankAccountId) {
                alert('No bank account selected');
                return;
            }
            
            if (!confirm('Are you sure you want to delete this bank account?')) return;
            
            try {
                const res = await fetch(`${API_BASE_BANK_ACCOUNTS}/${encodeURIComponent(bankAccountId)}`, {
                    method: 'DELETE'
                });
                
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                
                alert('Bank account deleted successfully');
                if (modal) modal.style.display = 'none';
                loadBankAccountsTable();
            } catch (err) {
                console.error('Failed to delete bank account', err);
                alert('Error deleting bank account: ' + err.message);
            }
        });
    }
}

var bankAccountsCurrentPage = 1;
var bankAccountsData = [];
var BANK_ACCOUNTS_PER_PAGE = 5;

async function loadBankAccountsTable() {
    const tbody = document.getElementById('bank-accounts-table-body');
    if (!tbody) return;
    
    try {
        const res = await fetch(`${API_BASE_BANK_ACCOUNTS}`);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        bankAccountsData = await res.json();
        renderBankAccountsTable();
    } catch (err) {
        console.error('Failed to load bank accounts', err);
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Error loading bank accounts. Please refresh.</td></tr>';
    }
}

function renderBankAccountsTable() {
    const tbody = document.getElementById('bank-accounts-table-body');
    if (!tbody) return;
    
    const start = (bankAccountsCurrentPage - 1) * BANK_ACCOUNTS_PER_PAGE;
    const end = start + BANK_ACCOUNTS_PER_PAGE;
    const pageData = bankAccountsData.slice(start, end);
    
    let html = pageData.map(acc => `
        <tr>
            <td>${acc.bank_account_id}</td>
            <td>${acc.bank_code || ''}</td>
            <td>${acc.bank}</td>
            <td>${acc.address || ''}</td>
            <td>${acc.bank_account_number}</td>
            <td>${acc.status}</td>
            <td>${Number(acc.starting_bank_cash || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        </tr>
    `).join('');
    
    const totalPages = Math.ceil(bankAccountsData.length / BANK_ACCOUNTS_PER_PAGE);
    const rowsNeeded = Math.min(BANK_ACCOUNTS_PER_PAGE, totalPages * BANK_ACCOUNTS_PER_PAGE - (bankAccountsCurrentPage - 1) * BANK_ACCOUNTS_PER_PAGE);
    for (let i = pageData.length; i < BANK_ACCOUNTS_PER_PAGE; i++) {
        html += `<tr class="empty-row"><td colspan="7" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>`;
    }
    
    tbody.innerHTML = html;
    renderBankAccountsPagination(totalPages);
}

function renderBankAccountsPagination(totalPages) {
    const container = document.getElementById('bank-accounts-pagination');
    if (!container || totalPages < 1) {
        if (container) container.innerHTML = '';
        return;
    }
    
    let html = '';
    html += `<button class="page-btn" ${bankAccountsCurrentPage === 1 ? 'disabled' : ''} onclick="bankAccountsCurrentPage--; renderBankAccountsTable();">&lt;</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === bankAccountsCurrentPage ? 'active' : ''}" onclick="bankAccountsCurrentPage=${i}; renderBankAccountsTable();">${i}</button>`;
    }
    
    html += `<button class="page-btn" ${bankAccountsCurrentPage === totalPages ? 'disabled' : ''} onclick="bankAccountsCurrentPage++; renderBankAccountsTable();">&gt;</button>`;
    
    container.innerHTML = html;
}
