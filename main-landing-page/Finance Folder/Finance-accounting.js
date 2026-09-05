if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

(() => {
    let accountingCodesData = [];
    let accountingCurrentPage = 1;
    const accountingRowsPerPage = 12;
    let currentEditingDbId = null;

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    ModuleComponents['finance-accounting'] = (container) => {
        container.innerHTML = `
            <div class="module-dashboard">
                <div class="header-actions">
                    <h2>Accounting</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="add-accounting-code-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">add Accounting Code</span>
                    </button>
                </div>
                <div class="card" style="margin-top: 24px;">
                    <h3>Accounting Codes</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Accounting ID</th>
                                    <th>Accounting Type</th>
                                    <th>Accounting Code</th>
                                    <th>Remarks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="accounting-codes-body">
                                <tr><td colspan="5">Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="accounting-pagination"></div>
                </div>
            </div>

            <div id="accounting-code-modal" class="modal" style="display:none;">
                <div class="modal-content egg-products-modal">
                    <div class="modal-header-row">
                        <h3 id="accounting-code-modal-title">add Accounting Code</h3>
                        <button class="modal-close-btn" id="close-accounting-code-modal">&times;</button>
                    </div>
                    <label>Accounting ID</label>
                    <input type="text" id="accounting-id-input" readonly>
                    <label>Accounting Type</label>
                    <input type="text" id="accounting-type-input" placeholder="Enter accounting type">
                    <label>Accounting Code</label>
                    <input type="text" id="accounting-code-input" placeholder="Enter accounting code">
                    <label>Remarks</label>
                    <textarea id="accounting-remarks-input" placeholder="Enter remarks" rows="3"></textarea>
                    <div class="modal-tab-actions">
                        <button class="btn-primary" id="save-accounting-code-btn">Save</button>
                    </div>
                </div>
            </div>
        `;
    };

    function loadAccountingCodes() {
        const tbody = document.getElementById('accounting-codes-body');
        if (!tbody) return;

        fetch('/api/accounting-codes')
            .then(res => res.json())
            .then(data => {
                accountingCodesData = data;
                accountingCurrentPage = 1;
                renderAccountingPage();
                renderAccountingPagination();
            })
            .catch(err => {
                console.error('Failed to load accounting codes', err);
                tbody.innerHTML = '<tr><td colspan="5">Failed to load data</td></tr>';
            });
    }

    function renderAccountingPage() {
        const tbody = document.getElementById('accounting-codes-body');
        if (!tbody) return;

        const start = (accountingCurrentPage - 1) * accountingRowsPerPage;
        const end = start + accountingRowsPerPage;
        const pageData = accountingCodesData.slice(start, end);

        if (pageData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5">No accounting codes found</td></tr>';
            return;
        }

        tbody.innerHTML = pageData.map(row => `
            <tr>
                <td>${escapeHtml(row.accounting_id)}</td>
                <td>${escapeHtml(row.accounting_type)}</td>
                <td>${escapeHtml(row.accounting_code)}</td>
                <td>${escapeHtml(row.remarks)}</td>
                <td>
                    <button class="btn-edit" data-id="${row.id}">Edit</button>
                    <button class="btn-delete" data-id="${row.id}" data-code-id="${escapeHtml(row.accounting_id)}">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    function renderAccountingPagination() {
        const totalPages = Math.max(1, Math.ceil(accountingCodesData.length / accountingRowsPerPage));
        if (accountingCurrentPage > totalPages) accountingCurrentPage = totalPages;

        const pagination = document.getElementById('accounting-pagination');
        if (!pagination) return;

        let pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, accountingCurrentPage - 3);
            let end = Math.min(totalPages, start + 6);
            if (end - start < 6) start = Math.max(1, end - 6);
            for (let i = start; i <= end; i++) pages.push(i);
        }

        let buttonsHtml = '';
        if (totalPages > 10) {
            buttonsHtml += `<button class="page-btn" data-action="first" ${accountingCurrentPage === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
        }
        buttonsHtml += `<button class="page-btn" data-action="prev" ${accountingCurrentPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;
        pages.forEach(i => {
            buttonsHtml += `<button class="page-btn ${i === accountingCurrentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        });
        buttonsHtml += `<button class="page-btn" data-action="next" ${accountingCurrentPage === totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
        if (totalPages > 10) {
            buttonsHtml += `<button class="page-btn" data-action="last" ${accountingCurrentPage === totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
        }

        pagination.innerHTML = buttonsHtml;
    }

    function editAccountingCode(id) {
        const code = accountingCodesData.find(c => c.id === id);
        if (!code) return;

        currentEditingDbId = id;
        document.getElementById('accounting-code-modal-title').textContent = 'Edit Accounting Code';
        document.getElementById('accounting-id-input').value = code.accounting_id || '';
        document.getElementById('accounting-type-input').value = code.accounting_type || '';
        document.getElementById('accounting-code-input').value = code.accounting_code || '';
        document.getElementById('accounting-remarks-input').value = code.remarks || '';
        document.getElementById('accounting-code-modal').style.display = 'flex';
    }

    function deleteAccountingCode(id, name) {
        if (!confirm('Are you sure you want to delete "' + name + '"?')) return;
        fetch(`/api/accounting-codes/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete');
                loadAccountingCodes();
            })
            .catch(err => {
                console.error('Error deleting accounting code', err);
                alert('Error deleting accounting code: ' + err.message);
            });
    }

    function initializeEventListeners() {
        document.getElementById('accounting-codes-body')?.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.btn-edit');
            const deleteBtn = e.target.closest('.btn-delete');

            if (editBtn) {
                editAccountingCode(Number(editBtn.dataset.id));
            } else if (deleteBtn) {
                deleteAccountingCode(Number(deleteBtn.dataset.id), deleteBtn.dataset.codeId);
            }
        });

        document.getElementById('accounting-pagination')?.addEventListener('click', (e) => {
            const btn = e.target.closest('.page-btn');
            if (!btn || btn.disabled) return;

            const totalPages = Math.ceil(accountingCodesData.length / accountingRowsPerPage);
            if (btn.dataset.action === 'first' && accountingCurrentPage !== 1) {
                accountingCurrentPage = 1;
            } else if (btn.dataset.action === 'prev' && accountingCurrentPage > 1) {
                accountingCurrentPage--;
            } else if (btn.dataset.action === 'next' && accountingCurrentPage < totalPages) {
                accountingCurrentPage++;
            } else if (btn.dataset.action === 'last' && accountingCurrentPage !== totalPages) {
                accountingCurrentPage = totalPages;
            } else if (btn.dataset.page) {
                accountingCurrentPage = Number(btn.dataset.page);
            }

            renderAccountingPage();
            renderAccountingPagination();
        });

        const addBtn = document.getElementById('add-accounting-code-btn');
        const modal = document.getElementById('accounting-code-modal');
        const closeBtn = document.getElementById('close-accounting-code-modal');
        const saveBtn = document.getElementById('save-accounting-code-btn');

        addBtn?.addEventListener('click', async () => {
            currentEditingDbId = null;
            document.getElementById('accounting-code-modal-title').textContent = 'Add Accounting Code';
            document.getElementById('accounting-id-input').value = '';
            document.getElementById('accounting-type-input').value = '';
            document.getElementById('accounting-code-input').value = '';
            document.getElementById('accounting-remarks-input').value = '';

            try {
                const res = await fetch('/api/accounting-codes/next-id');
                const data = await res.json();
                document.getElementById('accounting-id-input').value = data.accounting_id;
            } catch (err) {
                document.getElementById('accounting-id-input').value = '';
            }

            modal.style.display = 'flex';
        });

        closeBtn?.addEventListener('click', () => modal.style.display = 'none');

        saveBtn?.addEventListener('click', async () => {
            const accountingId = document.getElementById('accounting-id-input').value.trim();
            const accountingType = document.getElementById('accounting-type-input').value.trim();
            const accountingCode = document.getElementById('accounting-code-input').value.trim();
            const remarks = document.getElementById('accounting-remarks-input').value.trim();

            if (!accountingId || !accountingType || !accountingCode) {
                alert('Accounting ID, Accounting Type, and Accounting Code are required');
                return;
            }

            const url = currentEditingDbId
                ? `/api/accounting-codes/${currentEditingDbId}`
                : '/api/accounting-codes';

            const method = currentEditingDbId ? 'PUT' : 'POST';

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accounting_id: accountingId, accounting_type: accountingType, accounting_code: accountingCode, remarks })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save accounting code');
                }

                modal.style.display = 'none';
                loadAccountingCodes();
            } catch (err) {
                console.error('Error saving accounting code', err);
                alert('Error: ' + err.message);
            }
        });
    }

    window.initializeModule = function(contentArea) {
        const currentTab = window.__currentTabId || 'finance-accounting';
        const render = ModuleComponents[currentTab] || ModuleComponents['finance-accounting'];
        render(contentArea);
        loadAccountingCodes();
        initializeEventListeners();
    };
})();
