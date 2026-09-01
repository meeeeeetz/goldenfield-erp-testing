if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-salary-losses'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>Loss / Damages</h2>
        </div>
        <div class="action-buttons-row">
            <button id="add-loss-damage-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span class="btn-label">Add Loss/Damages</span>
            </button>
            <button id="back-to-salary-btn" class="btn-icon-circle" style="margin-left: auto;">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                <span class="btn-label">Return to Salary</span>
            </button>
        </div>
        <div class="card" style="margin-top: 20px; padding: 0; overflow: visible;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">Pending Loss/Damages Log</h3>
            </div>
            <div style="padding: 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                    <thead>
                        <tr>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Loss/Damage ID</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Employee ID</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Date</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Last Name</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">First Name</th>
                            <th style="width: 150px; padding: 2px; font-size: 15px;">Amount</th>
                            <th style="width: 150px; padding: 2px; font-size: 15px;">Remarks</th>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">No. of Payroll Cycle</th>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Installment Amount</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Created by</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="pending-loss-damage-tbody">
                        <tr><td colspan="12" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card" style="margin-top: 20px; padding: 0; overflow: visible;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">History of Loss / Damages</h3>
            </div>
            <div style="padding: 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                    <thead>
                        <tr>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Loss/Damage ID</th>
                            <th style="width: 160px; padding: 2px; font-size: 15px;">Loss/Damage Repayment ID</th>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Payroll Cycle ID</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Employee ID</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Date</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Paid Date</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Last Name</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">First Name</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Amount</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Amount Paid</th>
                            <th style="width: 150px; padding: 2px; font-size: 15px;">Remarks</th>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">No. of Payroll Cycle</th>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Installment Amount</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Created by</th>
                        </tr>
                    </thead>
                    <tbody id="loss-damage-history-tbody">
                        <tr><td colspan="15" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="add-loss-damage-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 520px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Losses and Damages</h3>
                    <button class="modal-close-btn" id="close-add-loss-damage-modal">&times;</button>
                </div>
                <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; flex-direction: column; gap: 4px; position: relative;">
                        <label style="font-size: 14px; font-weight: 600;">Search Employee</label>
                        <input type="text" id="loss-damage-search-name" placeholder="Search active employee..." autocomplete="off" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                        <div id="loss-damage-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; margin-top: 4px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Loss/Damage ID</label>
                            <input type="text" id="loss-damage-id" readonly placeholder="LoDaID-000000001" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Employee ID</label>
                            <input type="text" id="loss-damage-emp-id" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Last Name</label>
                            <input type="text" id="loss-damage-last-name" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">First Name</label>
                            <input type="text" id="loss-damage-first-name" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 12px; display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                                <label style="font-size: 14px; font-weight: 600;">Amount</label>
                                <input type="number" id="loss-damage-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px; font-weight: 600;">Description</label>
                            <textarea id="loss-damage-description" rows="3" placeholder="Enter description..." style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; resize: vertical;"></textarea>
                        </div>
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 12px; display: flex; flex-direction: column; gap: 12px;">
                        <label style="font-size: 14px; font-weight: 700; color: #000;">Repayment terms</label>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                                <label style="font-size: 14px;">Number of Payroll Cycle</label>
                                <input type="text" id="loss-damage-payroll-cycle" placeholder="e.g. 2" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                                <label style="font-size: 14px;">Per payroll cycle</label>
                                <input type="text" id="loss-damage-per-payroll" readonly placeholder="0.00" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px;">
                        <button id="cancel-add-loss-damage-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px;">Cancel</button>
                        <button id="save-add-loss-damage-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px;">Save</button>
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

    async function loadPendingLossDamages() {
        const tbody = document.getElementById('pending-loss-damage-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/loss-damages/pending');
            if (!res.ok) throw new Error('Failed to load pending loss/damages');
            const logs = await res.json();
            renderPendingLossDamages(logs);
        } catch (err) {
            console.error('Pending loss/damages error:', err);
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="12" style="text-align: center; padding: 20px; color: #999;">Failed to load pending logs</td></tr>';
            }
        }
    }

    function renderPendingLossDamages(logs) {
        const tbody = document.getElementById('pending-loss-damage-tbody');
        if (!tbody) return;

        if (!logs || logs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="12" style="text-align: center; padding: 20px; color: #999;">No pending loss/damages</td></tr>';
            return;
        }

        tbody.innerHTML = logs.map(log => `
            <tr style="height: 32px;">
                <td style="padding: 2px; margin: 0;">${log.lossdamage_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.employee_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${formatDate(log.created_at)}</td>
                <td style="padding: 2px; margin: 0;">${log.last_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.first_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.amount != null ? Number(log.amount).toFixed(2) : ''}</td>
                <td style="padding: 2px; margin: 0;">${log.reason || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.no_of_payroll_cycle != null ? Number(log.no_of_payroll_cycle).toFixed(0) : ''}</td>
                <td style="padding: 2px; margin: 0;">${log.installment_amount != null ? Number(log.installment_amount).toFixed(2) : ''}</td>
                <td style="padding: 2px; margin: 0;"><span style="background: ${log.status === 'Approved' ? '#d4edda' : log.status === 'Rejected' ? '#f8d7da' : '#FFF3CD'}; color: ${log.status === 'Approved' ? '#155724' : log.status === 'Rejected' ? '#721c24' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
                <td style="padding: 2px; margin: 0;">${log.created_by || ''}</td>
                <td style="padding: 2px; margin: 0;">
                    <button class="btn-primary approve-loss-damage-btn" data-loss-damage-id="${log.lossdamage_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; flex: 1; min-width: 70px; text-align: center;">Approve</button>
                    <button class="btn-reject reject-loss-damage-btn" data-loss-damage-id="${log.lossdamage_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; margin-left: 6px; background: #dc3545; color: white; border: none; border-radius: 4px; flex: 1; min-width: 70px; text-align: center;">Reject</button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.approve-loss-damage-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const lossDamageId = e.target.getAttribute('data-loss-damage-id');
                if (!lossDamageId) return;

                try {
                    const res = await fetch(`/api/loss-damages/${encodeURIComponent(lossDamageId)}/approve`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to approve loss/damage');
                    }

                    alert(`Loss/Damage ${lossDamageId} approved successfully`);
                    loadPendingLossDamages();
                    loadLossDamageHistory();
                } catch (err) {
                    console.error('Approve error:', err);
                    alert(err.message || 'Failed to approve loss/damage');
                }
            });
        });

        tbody.querySelectorAll('.reject-loss-damage-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const lossDamageId = e.target.getAttribute('data-loss-damage-id');
                if (!lossDamageId) return;

                try {
                    const res = await fetch(`/api/loss-damages/${encodeURIComponent(lossDamageId)}/reject`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to reject loss/damage');
                    }

                    alert(`Loss/Damage ${lossDamageId} rejected successfully`);
                    loadPendingLossDamages();
                    loadLossDamageHistory();
                } catch (err) {
                    console.error('Reject error:', err);
                    alert(err.message || 'Failed to reject loss/damage');
                }
            });
        });
    }

    async function loadLossDamageHistory() {
        const tbody = document.getElementById('loss-damage-history-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/loss-damages/all');
            if (!res.ok) throw new Error('Failed to load loss/damage history');
            const logs = await res.json();

            if (!logs || logs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="15" style="text-align: center; padding: 20px; color: #999;">No loss/damage history</td></tr>';
                return;
            }

            tbody.innerHTML = logs.map(log => `
                <tr style="height: 32px;">
                    <td style="padding: 2px; margin: 0;">${log.lossdamage_id || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.lossdamage_repayment_id != null ? 'REP-' + String(log.lossdamage_repayment_id).padStart(9, '0') : ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.payrollcycle_id || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.employee_id || ''}</td>
                    <td style="padding: 2px; margin: 0;">${formatDate(log.created_at)}</td>
                    <td style="padding: 2px; margin: 0;">${formatDate(log.paid_at)}</td>
                    <td style="padding: 2px; margin: 0;">${log.last_name || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.first_name || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.amount != null ? Number(log.amount).toFixed(2) : ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.amount_paid != null ? Number(log.amount_paid).toFixed(2) : ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.reason || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.no_of_payroll_cycle != null ? Number(log.no_of_payroll_cycle).toFixed(0) : ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.installment_amount != null ? Number(log.installment_amount).toFixed(2) : ''}</td>
                <td style="padding: 2px; margin: 0;"><span style="background: ${log.status === 'Approved' ? '#d4edda' : log.status === 'Rejected' ? '#f8d7da' : '#FFF3CD'}; color: ${log.status === 'Approved' ? '#155724' : log.status === 'Rejected' ? '#721c24' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
                    <td style="padding: 2px; margin: 0;">${log.created_by || ''}</td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load loss/damage history:', err);
            tbody.innerHTML = '<tr><td colspan="15" style="text-align: center; padding: 20px; color: #999;">Failed to load loss/damage history</td></tr>';
        }
    }

    loadPendingLossDamages();
    loadLossDamageHistory();

    const addLossDamageBtn = document.getElementById('add-loss-damage-btn');
    const addLossDamageModal = document.getElementById('add-loss-damage-modal');
    const closeAddLossDamageModal = document.getElementById('close-add-loss-damage-modal');
    const cancelAddLossDamageBtn = document.getElementById('cancel-add-loss-damage-btn');
    const saveAddLossDamageBtn = document.getElementById('save-add-loss-damage-btn');
    const searchInput = document.getElementById('loss-damage-search-name');
    const searchResults = document.getElementById('loss-damage-search-results');
    let searchDebounce = null;

    const openAddLossDamageModal = async () => {
        if (addLossDamageModal) {
            try {
                const res = await fetch('/api/loss-damages/next-id');
                if (res.ok) {
                    const data = await res.json();
                    const lossDamageIdInput = document.getElementById('loss-damage-id');
                    if (lossDamageIdInput && data.lossdamage_id) {
                        lossDamageIdInput.value = data.lossdamage_id;
                    }
                }
            } catch (err) {
                console.error('Failed to load next loss/damage ID:', err);
            }
            addLossDamageModal.style.display = 'flex';
        }
    };

    const closeAddLossDamageModalFn = () => {
        if (addLossDamageModal) addLossDamageModal.style.display = 'none';
    };

    if (addLossDamageBtn) {
        addLossDamageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openAddLossDamageModal();
        });
    }

    if (closeAddLossDamageModal) {
        closeAddLossDamageModal.addEventListener('click', closeAddLossDamageModalFn);
    }

    if (cancelAddLossDamageBtn) {
        cancelAddLossDamageBtn.addEventListener('click', closeAddLossDamageModalFn);
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
            item.addEventListener('click', () => {
                const employeeId = item.getAttribute('data-employee-id');
                const lastName = item.getAttribute('data-last-name') || '';
                const firstName = item.getAttribute('data-first-name') || '';

                const empIdInput = document.getElementById('loss-damage-emp-id');
                const lastNameInput = document.getElementById('loss-damage-last-name');
                const firstNameInput = document.getElementById('loss-damage-first-name');

                if (empIdInput) empIdInput.value = employeeId;
                if (lastNameInput) lastNameInput.value = lastName;
                if (firstNameInput) firstNameInput.value = firstName;

                if (searchInput) searchInput.value = '';
                if (searchResults) searchResults.style.display = 'none';
            });
        });
    }

    const lossDamageAmount = document.getElementById('loss-damage-amount');
    const lossDamagePayrollCycle = document.getElementById('loss-damage-payroll-cycle');
    const lossDamagePerPayroll = document.getElementById('loss-damage-per-payroll');

    const calculatePerPayroll = () => {
        if (!lossDamageAmount || !lossDamagePayrollCycle || !lossDamagePerPayroll) return;
        const amount = parseFloat(lossDamageAmount.value) || 0;
        const cycles = parseFloat(lossDamagePayrollCycle.value) || 0;
        if (cycles > 0) {
            const perCycle = amount / cycles;
            lossDamagePerPayroll.value = perCycle.toFixed(2);
        } else {
            lossDamagePerPayroll.value = '0.00';
        }
    };

    if (lossDamageAmount) {
        lossDamageAmount.addEventListener('input', calculatePerPayroll);
    }

    if (lossDamagePayrollCycle) {
        lossDamagePayrollCycle.addEventListener('input', calculatePerPayroll);
    }

    if (saveAddLossDamageBtn) {
        saveAddLossDamageBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const employeeId = document.getElementById('loss-damage-emp-id')?.value.trim();
            const amount = document.getElementById('loss-damage-amount')?.value.trim();
            const reason = document.getElementById('loss-damage-description')?.value.trim();
            const payrollCycle = document.getElementById('loss-damage-payroll-cycle')?.value.trim();
            const installmentAmount = document.getElementById('loss-damage-per-payroll')?.value.trim();

            if (!employeeId || !amount || !payrollCycle || !installmentAmount) {
                alert('Please fill in all required fields');
                return;
            }

            try {
                const res = await fetch('/api/loss-damages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        employee_id: employeeId,
                        loss_damage_amount: parseFloat(amount),
                        reason: reason || null,
                        no_of_payroll_cycle: parseInt(payrollCycle) || 0,
                        installment_amount: parseFloat(installmentAmount)
                    })
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save loss/damage');
                }

                alert('Loss/Damage saved successfully');
                if (addLossDamageModal) addLossDamageModal.style.display = 'none';
                loadPendingLossDamages();
                loadLossDamageHistory();
            } catch (err) {
                console.error('Save loss/damage error:', err);
                alert(err.message || 'Failed to save loss/damage');
            }
        });
    }

    const backToSalaryBtn = document.getElementById('back-to-salary-btn');
    if (backToSalaryBtn) {
        backToSalaryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            switchTab('hr-salary');
        });
    }
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId;
    const render = ModuleComponents[currentTab];
    if (render) render(contentArea);

    const breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) breadcrumb.innerHTML = 'Human Resources <span>/</span> Salary <span>/</span> Loss/Damages';
}
