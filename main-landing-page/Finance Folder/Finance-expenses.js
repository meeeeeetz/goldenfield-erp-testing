if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

var expenseCategoriesData = [];
var expenseCurrentPage = 1;
var expenseRowsPerPage = 12;
var editingExpenseId = null;
var expensesData = [];
var expenseListCurrentPage = 1;
var expenseListRowsPerPage = 10;
var expenseListSortColumn = null;
var expenseListSortDirection = 'asc';

ModuleComponents['finance-expenses'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>Expenses</h2>
        </div>
        <div class="action-buttons-row">
            <button id="add-expense-category-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span class="btn-label">add Category</span>
            </button>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Total Monthly Expenses</h3>
                <p class="card-sub-label">total amount spent for the period</p>
                <div class="card-value-row">
                    <div class="card-value" id="monthly-expense-value">P 0.00</div>
                    <span class="trend-up" id="monthly-expense-trend" style="color:#e74c3c;">&#9650; 0%</span>
                </div>
                <p class="vs-last-month" id="monthly-expense-vs">VS last month</p>
            </div>
            <div class="card tracking-card">
                <h3>Pending Accounts payables</h3>
                <p class="card-sub-label">bill recieved that still needs to be paid</p>
                <div class="card-value-row">
                    <div class="card-value" id="pending-accounts-value">P 0.00</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Operating Expense</h3>
                <p class="card-sub-label">Total Expenses divided by gross revenue to measure efficiency</p>
                <div class="card-value-row">
                    <div class="card-value">50%</div>
                    <span class="trend-down" style="color:#1ea672;">&#9660; 4%</span>
                </div>
                <p class="vs-last-month">VS last period</p>
            </div>
        </div>
        <div class="card graph-placeholder expense-list-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; gap: 24px;">
                <h3 style="margin: 0;">Full List of Expenses</h3>
                <input type="text" id="expense-list-search" placeholder="Search expenses..." style="padding: 6px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; width: 220px; margin-left: auto;" />
            </div>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th class="sortable" data-column="expense_list_id">Expense List ID <span class="sort-arrow">&#8645;</span></th>
                            <th class="sortable" data-column="tracking_id">Tracking ID <span class="sort-arrow">&#8645;</span></th>
                            <th class="sortable" data-column="date">Date <span class="sort-arrow">&#8645;</span></th>
                            <th>Accounting Code</th>
                            <th>Expense Type</th>
                            <th>Description</th>
                            <th>Remarks</th>
                            <th>Total Amount</th>
                            <th>Account Source</th>
                            <th>Cleared Date</th>
                            <th>Status</th>
                            <th style="color: #e74c3c;">Delete</th>
                        </tr>
                    </thead>
                    <tbody id="expense-list-body">
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                        <tr class="empty-row"><td colspan="12" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                    </tbody>
                </table>
                <div class="pagination" id="expense-list-pagination">
                    <button class="page-btn" id="expense-list-prev-btn">&laquo; Prev</button>
                    <button class="page-btn active" id="expense-list-page-1">1</button>
                    <button class="page-btn" id="expense-list-next-btn">Next &raquo;</button>
                </div>
            </div>
        </div>
        <div class="finance-sales-row">
        <div class="card graph-placeholder expense-category-card">
            <h3>Categories of expenses</h3>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th>Expense ID</th>
                            <th>Expense Type</th>
                            <th>Accounting Code</th>
                            <th>Remarks</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="expense-categories-body">
                        <tr><td colspan="5">Loading...</td></tr>
                    </tbody>
                </table>
                <div class="pagination" id="expense-pagination">
                    <button class="page-btn" id="expense-prev-btn">&laquo; Prev</button>
                    <button class="page-btn active" id="expense-page-1">1</button>
                    <button class="page-btn" id="expense-next-btn">Next &raquo;</button>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder category-expenses-card">
            <h3>Category Expenses</h3>
            <div class="salary-chart-wrap">
                <svg viewBox="0 0 220 220" class="salary-donut-chart">
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#a88805" stroke-width="30" stroke-dasharray="183.47 319.18" stroke-dashoffset="0" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#e67e22" stroke-width="30" stroke-dasharray="122.65 380.00" stroke-dashoffset="-183.47" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#2ecc71" stroke-width="30" stroke-dasharray="48.76 453.89" stroke-dashoffset="-306.12" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#3498db" stroke-width="30" stroke-dasharray="32.67 469.98" stroke-dashoffset="-354.88" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#9b59b6" stroke-width="30" stroke-dasharray="24.63 478.02" stroke-dashoffset="-387.55" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#e74c3c" stroke-width="30" stroke-dasharray="16.08 486.57" stroke-dashoffset="-412.18" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#1abc9c" stroke-width="30" stroke-dasharray="14.07 488.58" stroke-dashoffset="-428.26" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#34495e" stroke-width="30" stroke-dasharray="20.61 482.04" stroke-dashoffset="-442.33" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#f39c12" stroke-width="30" stroke-dasharray="15.58 487.07" stroke-dashoffset="-462.94" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#16a085" stroke-width="30" stroke-dasharray="18.60 484.05" stroke-dashoffset="-478.52" transform="rotate(-90 110 110)"></circle>
                    <circle cx="110" cy="110" r="80" fill="none" stroke="#95a5a6" stroke-width="30" stroke-dasharray="5.53 497.12" stroke-dashoffset="-497.12" transform="rotate(-90 110 110)"></circle>
                    <text x="110" y="104" text-anchor="middle" font-size="12" font-weight="700" fill="#1a1f2e">Total</text>
                    <text x="110" y="124" text-anchor="middle" font-size="14" font-weight="700" fill="#1a1f2e">P123,123</text>
                </svg>
                <div class="chart-legend">
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#a88805"></span>Salary &mdash; P45,000</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#e67e22"></span>Feeds &mdash; P30,000</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#2ecc71"></span>Flock &mdash; P12,000</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#3498db"></span>Maintenance &mdash; P8,000</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#9b59b6"></span>construction &mdash; P6,000</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#e74c3c"></span>office &mdash; P4,000</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#1abc9c"></span>legal and Accountant &mdash; P3,500</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#34495e"></span>veterinary &mdash; P5,000</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#f39c12"></span>Egg Tray &mdash; P3,800</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#16a085"></span>Utilities &mdash; P4,500</span>
                    <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#95a5a6"></span>others &mdash; P1,323</span>
                </div>
            </div>
        </div>
        </div>
        
        <div id="expense-category-modal" class="modal" style="display:none;">
            <div class="modal-content egg-products-modal">
                <div class="modal-header-row">
                    <h3 id="expense-category-modal-title">Add Expense Category</h3>
                    <button class="modal-close-btn" id="close-expense-category-modal">&times;</button>
                </div>
                <label>Expense ID</label>
                <input type="text" id="expense-id-input" readonly>
                <label>Expense Type</label>
                <input type="text" id="expense-type-input" placeholder="Enter expense type">
                <label>Expense Accounting Code</label>
                <input type="text" id="expense-accounting-code-input" placeholder="Enter accounting code">
                <label>Remarks</label>
                <textarea id="expense-remarks-input" placeholder="Enter remarks" rows="3"></textarea>
                <div class="modal-tab-actions">
                    <button class="btn-primary" id="save-expense-category-btn">Save</button>
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);
    loadExpenseCategories();
    loadExpenses();
    setupExpenseListSort();
    setupExpenseListSearch();
    setupExpenseDelete();
    initializeExpenseCategoryModal();
}

async function loadExpenseCategories() {
    const tbody = document.getElementById('expense-categories-body');
    if (!tbody) return;
    try {
        const res = await fetch('http://localhost:5000/api/expense-categories');
        if (!res.ok) throw new Error('Failed to fetch expense categories');
        const data = await res.json();
        expenseCategoriesData = data;
        expenseCurrentPage = 1;
        renderExpensePage();
        renderExpensePagination();
    } catch (err) {
        console.error('Failed to load expense categories', err);
        tbody.innerHTML = '<tr><td colspan="5">Failed to load data</td></tr>';
    }
}

function renderExpensePage() {
    const tbody = document.getElementById('expense-categories-body');
    if (!tbody) return;
    
    const start = (expenseCurrentPage - 1) * expenseRowsPerPage;
    const end = start + expenseRowsPerPage;
    const pageData = expenseCategoriesData.slice(start, end);
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No expense categories found</td></tr>';
        return;
    }
    
    tbody.innerHTML = pageData.map(cat => `
        <tr>
            <td>${cat.expense_id || 'ExpID-' + String(cat.id).padStart(4, '0')}</td>
            <td>${cat.expense_type}</td>
            <td>${cat.accounting_code || ''}</td>
            <td>${cat.remarks || ''}</td>
            <td>
                <button class="btn-edit" onclick="editExpenseCategory(${cat.id})">Edit</button>
                <button class="btn-delete" onclick="deleteExpenseCategory(${cat.id}, '${cat.expense_type.replace(/'/g, "\\'")}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function renderExpensePagination() {
    const totalPages = Math.max(1, Math.ceil(expenseCategoriesData.length / expenseRowsPerPage));
    if (expenseCurrentPage > totalPages) expenseCurrentPage = totalPages;
    
    const pagination = document.getElementById('expense-pagination');
    if (!pagination) return;
    
    let pages = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        let start = Math.max(1, expenseCurrentPage - 3);
        let end = Math.min(totalPages, start + 6);
        if (end - start < 6) {
            start = Math.max(1, end - 6);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
    }
    
    let buttonsHtml = '';
    buttonsHtml += `<button class="page-btn" id="expense-prev-btn" ${expenseCurrentPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;
    
    pages.forEach(i => {
        buttonsHtml += `<button class="page-btn ${i === expenseCurrentPage ? 'active' : ''}" id="expense-page-${i}">${i}</button>`;
    });
    
    buttonsHtml += `<button class="page-btn" id="expense-next-btn" ${expenseCurrentPage === totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
    
    pagination.innerHTML = buttonsHtml;
    
    document.getElementById('expense-prev-btn')?.addEventListener('click', () => {
        if (expenseCurrentPage > 1) {
            expenseCurrentPage--;
            renderExpensePage();
            renderExpensePagination();
        }
    });
    
    document.getElementById('expense-next-btn')?.addEventListener('click', () => {
        if (expenseCurrentPage < totalPages) {
            expenseCurrentPage++;
            renderExpensePage();
            renderExpensePagination();
        }
    });
    
    pages.forEach(i => {
        document.getElementById(`expense-page-${i}`)?.addEventListener('click', () => {
            expenseCurrentPage = i;
            renderExpensePage();
            renderExpensePagination();
        });
    });
}

function initializeExpenseCategoryModal() {
    const addBtn = document.getElementById('add-expense-category-btn');
    const modal = document.getElementById('expense-category-modal');
    const closeBtn = document.getElementById('close-expense-category-modal');
    const saveBtn = document.getElementById('save-expense-category-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', async () => {
            editingExpenseId = null;
            document.getElementById('expense-category-modal-title').textContent = 'Add Expense Category';
            document.getElementById('expense-type-input').value = '';
            document.getElementById('expense-remarks-input').value = '';
            
            try {
                const res = await fetch('http://localhost:5000/api/expense-categories/next-id');
                const data = await res.json();
                document.getElementById('expense-id-input').value = data.expense_id;
            } catch (err) {
                document.getElementById('expense-id-input').value = '';
            }
            
            modal.style.display = 'flex';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            const expenseType = document.getElementById('expense-type-input').value.trim();
            const accountingCode = document.getElementById('expense-accounting-code-input').value.trim();
            const remarks = document.getElementById('expense-remarks-input').value.trim();
            
            if (!expenseType) {
                alert('Expense Type is required');
                return;
            }
            
            try {
                let res;
                if (editingExpenseId) {
                    res = await fetch(`http://localhost:5000/api/expense-categories/${editingExpenseId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ expense_type: expenseType, accounting_code: accountingCode, remarks })
                    });
                } else {
                    res = await fetch('http://localhost:5000/api/expense-categories', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ expense_type: expenseType, accounting_code: accountingCode, remarks })
                    });
                }
                
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save expense category');
                }
                
                modal.style.display = 'none';
                loadExpenseCategories();
            } catch (err) {
                console.error('Error saving expense category', err);
                alert('Error: ' + err.message);
            }
        });
    }
}

async function editExpenseCategory(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/expense-categories/${id}`);
        if (!res.ok) throw new Error('Failed to fetch expense category');
        const category = await res.json();
        
        editingExpenseId = id;
        document.getElementById('expense-category-modal-title').textContent = 'Edit Expense Category';
        document.getElementById('expense-id-input').value = category.expense_id || 'ExpID-' + String(category.id).padStart(4, '0');
        document.getElementById('expense-type-input').value = category.expense_type || '';
        document.getElementById('expense-accounting-code-input').value = category.accounting_code || '';
        document.getElementById('expense-remarks-input').value = category.remarks || '';
        document.getElementById('expense-category-modal').style.display = 'flex';
    } catch (err) {
        console.error('Error loading expense category', err);
        alert('Error loading expense category: ' + err.message);
    }
}

async function deleteExpenseCategory(id, name) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
        const res = await fetch(`http://localhost:5000/api/expense-categories/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Failed to delete expense category');
        }
        loadExpenseCategories();
    } catch (err) {
        console.error('Error deleting expense category', err);
        alert('Error deleting expense category: ' + err.message);
    }
}

async function loadExpenses() {
    const tbody = document.getElementById('expense-list-body');
    if (!tbody) return;
    try {
        const res = await fetch('http://localhost:5000/api/expenses', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch expenses');
        expensesData = await res.json();
        expenseListCurrentPage = 1;
        const searchInput = document.getElementById('expense-list-search');
        if (searchInput) searchInput.value = '';
        renderExpenseListPage();
        updateSortIndicators();
        updateMonthlyExpenseCard();
        updatePendingAccountsCard();
    } catch (err) {
        console.error('Failed to load expenses', err);
        tbody.innerHTML = '<tr><td colspan="12" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
    }
}

function getMonthKey(dateValue) {
    if (!dateValue) return null;
    const d = new Date(dateValue);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

function updateMonthlyExpenseCard() {
    const valueEl = document.getElementById('monthly-expense-value');
    const trendEl = document.getElementById('monthly-expense-trend');
    const vsEl = document.getElementById('monthly-expense-vs');
    if (!valueEl || !trendEl || !vsEl) return;

    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

    let currentTotal = 0;
    let lastTotal = 0;

    expensesData.forEach(exp => {
        const monthKey = getMonthKey(exp.date);
        if (monthKey === currentMonthKey) {
            currentTotal += parseFloat(exp.total_amount || 0);
        } else if (monthKey === lastMonthKey) {
            lastTotal += parseFloat(exp.total_amount || 0);
        }
    });

    valueEl.textContent = 'P ' + currentTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (lastTotal === 0) {
        trendEl.innerHTML = '&#9650; 0%';
        trendEl.style.color = '#e74c3c';
        vsEl.textContent = 'VS last month';
    } else {
        const change = ((currentTotal - lastTotal) / lastTotal) * 100;
        const isUp = change >= 0;
        const arrow = isUp ? '&#9650;' : '&#9660;';
        const color = isUp ? '#e74c3c' : '#1ea672';
        trendEl.innerHTML = `${arrow} ${Math.abs(change).toFixed(1)}%`;
        trendEl.style.color = color;
        vsEl.textContent = 'VS last month';
    }
}

function updatePendingAccountsCard() {
    const valueEl = document.getElementById('pending-accounts-value');
    if (!valueEl) return;

    const pendingTotal = expensesData
        .filter(exp => exp.status === 'Pending')
        .reduce((sum, exp) => sum + parseFloat(exp.total_amount || 0), 0);

    valueEl.textContent = 'P ' + pendingTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function deleteExpense(id) {
    if (!confirm('Are you sure you want to permanently delete this record?')) {
        return;
    }
    try {
        const res = await fetch(`http://localhost:5000/api/expenses/${encodeURIComponent(id)}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
        });
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Failed to delete expense');
        }
        await loadExpenses();
        alert('Expense deleted successfully');
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

function formatDateLocal(dateValue) {
    if (!dateValue) return '-';
    const d = new Date(dateValue);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function filterExpenses() {
    const searchInput = document.getElementById('expense-list-search');
    if (!searchInput) return;
    const term = searchInput.value.trim().toLowerCase();
    if (!term) {
        renderExpenseListPage();
        return;
    }
    const filtered = expensesData.filter(exp => {
        const searchable = [
            exp.expense_list_id,
            exp.tracking_id,
            formatDateLocal(exp.date),
            exp.accounting_code,
            exp.expense_type,
            Number(exp.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        ].join(' ').toLowerCase();
        return searchable.includes(term);
    });
    expenseListCurrentPage = 1;
    renderFilteredExpenseListPage(filtered);
}

function sortExpenses(column) {
    if (expenseListSortColumn === column) {
        expenseListSortDirection = expenseListSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        expenseListSortColumn = column;
        expenseListSortDirection = 'asc';
    }

    const sorted = [...expensesData].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        if (column === 'date') {
            valA = valA ? new Date(valA).getTime() : 0;
            valB = valB ? new Date(valB).getTime() : 0;
        } else {
            valA = (valA || '').toString().toLowerCase();
            valB = (valB || '').toString().toLowerCase();
        }

        if (valA < valB) return expenseListSortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return expenseListSortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    updateSortIndicators();
    renderFilteredExpenseListPage(sorted);
}

function updateSortIndicators() {
    document.querySelectorAll('#expense-list-body').forEach(el => {});
    const headers = document.querySelectorAll('.sortable');
    headers.forEach(th => {
        const arrow = th.querySelector('.sort-arrow');
        if (!arrow) return;
        const column = th.dataset.column;
        if (column === expenseListSortColumn) {
            arrow.innerHTML = expenseListSortDirection === 'asc' ? '&#9650;' : '&#9660;';
            th.style.color = '#1a1f2e';
        } else {
            arrow.innerHTML = '&#8645;';
            th.style.color = '';
        }
    });
}

function renderFilteredExpenseListPage(filteredData) {
    const tbody = document.getElementById('expense-list-body');
    if (!tbody) return;
    const start = (expenseListCurrentPage - 1) * expenseListRowsPerPage;
    const end = start + expenseListRowsPerPage;
    const pageData = filteredData.slice(start, end);
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" style="text-align:center;">No expenses found</td></tr>';
        return;
    }
    tbody.innerHTML = pageData.map(exp => `
        <tr>
            <td>${exp.expense_list_id || '-'}</td>
            <td>${exp.tracking_id || '-'}</td>
            <td>${formatDateLocal(exp.date)}</td>
            <td>${exp.accounting_code || '-'}</td>
            <td>${exp.expense_type || '-'}</td>
            <td>${exp.description || '-'}</td>
            <td>${exp.remarks || '-'}</td>
            <td>${Number(exp.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${exp.account_source || '-'}</td>
            <td>${formatDateLocal(exp.cleared_date)}</td>
            <td>${exp.status || '-'}</td>
            <td style="text-align: center; color: #e74c3c; font-weight: bold; cursor: pointer; font-size: 20px; padding: 8px;"><span class="delete-expense-btn" data-expense-id="${exp.id}" style="cursor: pointer;">&times;</span></td>
        </tr>
    `).join('');
    const totalPages = Math.max(1, Math.ceil(filteredData.length / expenseListRowsPerPage));
    renderExpenseListPagination(totalPages);
    updateSortIndicators();
}

function renderExpenseListPage() {
    const tbody = document.getElementById('expense-list-body');
    if (!tbody) return;

    let displayData = expensesData;
    if (expenseListSortColumn) {
        displayData = [...expensesData].sort((a, b) => {
            let valA = a[expenseListSortColumn];
            let valB = b[expenseListSortColumn];
            if (expenseListSortColumn === 'date') {
                valA = valA ? new Date(valA).getTime() : 0;
                valB = valB ? new Date(valB).getTime() : 0;
            } else {
                valA = (valA || '').toString().toLowerCase();
                valB = (valB || '').toString().toLowerCase();
            }
            if (valA < valB) return expenseListSortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return expenseListSortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }
    
    const start = (expenseListCurrentPage - 1) * expenseListRowsPerPage;
    const end = start + expenseListRowsPerPage;
    const pageData = displayData.slice(start, end);
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" style="text-align:center;">No expenses found</td></tr>';
        return;
    }
    
    tbody.innerHTML = pageData.map(exp => `
        <tr>
            <td>${exp.expense_list_id || '-'}</td>
            <td>${exp.tracking_id || '-'}</td>
            <td>${formatDateLocal(exp.date)}</td>
            <td>${exp.accounting_code || '-'}</td>
            <td>${exp.expense_type || '-'}</td>
            <td>${exp.description || '-'}</td>
            <td>${exp.remarks || '-'}</td>
            <td>${Number(exp.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${exp.account_source || '-'}</td>
            <td>${formatDateLocal(exp.cleared_date)}</td>
            <td>${exp.status || '-'}</td>
            <td style="text-align: center; color: #e74c3c; font-weight: bold; cursor: pointer; font-size: 20px; padding: 8px;"><span class="delete-expense-btn" data-expense-id="${exp.id}" style="cursor: pointer;">&times;</span></td>
        </tr>
    `).join('');
    
    const totalPages = Math.max(1, Math.ceil(displayData.length / expenseListRowsPerPage));
    renderExpenseListPagination(totalPages);
    updateSortIndicators();
}

function renderExpenseListPagination(totalPages) {
    const container = document.getElementById('expense-list-pagination');
    if (!container) return;
    
    let html = '';
    html += `<button class="page-btn" id="expense-list-prev-btn" ${expenseListCurrentPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === expenseListCurrentPage ? 'active' : ''}" id="expense-list-page-${i}">${i}</button>`;
    }
    
    html += `<button class="page-btn" id="expense-list-next-btn" ${expenseListCurrentPage >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
    
    container.innerHTML = html;
    
    document.getElementById('expense-list-prev-btn')?.addEventListener('click', () => {
        if (expenseListCurrentPage > 1) {
            expenseListCurrentPage--;
            renderExpenseListPage();
        }
    });
    
    document.getElementById('expense-list-next-btn')?.addEventListener('click', () => {
        if (expenseListCurrentPage < totalPages) {
            expenseListCurrentPage++;
            renderExpenseListPage();
        }
    });
    
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById(`expense-list-page-${i}`)?.addEventListener('click', () => {
            expenseListCurrentPage = i;
            renderExpenseListPage();
        });
    }
}

function setupExpenseListSort() {
    document.querySelectorAll('.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
            const column = th.dataset.column;
            if (column) sortExpenses(column);
        });
    });
}

function setupExpenseListSearch() {
    const searchInput = document.getElementById('expense-list-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterExpenses);
    }
}

function setupExpenseDelete() {
    const tbody = document.getElementById('expense-list-body');
    if (!tbody) return;
    tbody.addEventListener('click', (e) => {
        const btn = e.target.closest('.delete-expense-btn');
        if (!btn) return;
        const id = btn.dataset.expenseId;
        if (id) deleteExpense(id);
    });
}
