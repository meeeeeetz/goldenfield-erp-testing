if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-salary-leave'] = (container) => {
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1f2e;">Leave logs</h2>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button id="add-leave-log-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    <span class="btn-label">Add Leave Logs</span>
                </button>
                <button id="back-to-salary-btn" class="btn-icon-circle" style="margin-left: auto;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span class="btn-label">Back to Salary</span>
                </button>
            </div>
        </div>

        <div class="card" style="margin-top: 20px; padding: 0; overflow: visible;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">Pending Approval Leave Log</h3>
            </div>
            <div style="padding: 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                    <thead>
                        <tr>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Leave ID</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Employee ID</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Date</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Last Name</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">First Name</th>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Leave Type</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Total Days</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Created by</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="pending-leave-tbody">
                        <tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card" style="margin-top: 20px; padding: 0; overflow: visible;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">History of Leave Log</h3>
            </div>
            <div style="padding: 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                    <thead>
                        <tr>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Leave ID</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Employee ID</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Date</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Last Name</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">First Name</th>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Leave Type</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Total Days</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Created by</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="leave-history-tbody">
                        <tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="apply-leave-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 520px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header-row">
                    <h3>Apply for Leave</h3>
                    <button class="modal-close-btn" id="close-apply-leave-modal">&times;</button>
                </div>
                <div style="overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px; position: relative;">
                            <label style="font-size: 14px; font-weight: 600;">Search Employee</label>
                            <input type="text" id="apply-leave-search-name" placeholder="Search active employee..." autocomplete="off" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            <div id="apply-leave-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; margin-top: 4px;">
                            </div>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Employee ID</label>
                            <input type="text" id="apply-leave-emp-id" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Last Name</label>
                            <input type="text" id="apply-leave-last-name" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">First Name</label>
                            <input type="text" id="apply-leave-first-name" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Sick Leave Available</label>
                            <input type="text" id="apply-leave-sick-available" readonly placeholder="0" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Vacation Leave Available</label>
                            <input type="text" id="apply-leave-vacation-available" readonly placeholder="0" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Leave Type</label>
                            <select id="apply-leave-type" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                <option value="">Select Leave Type</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Vacation Leave">Vacation Leave</option>
                            </select>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Start Date</label>
                            <input type="date" id="apply-leave-start-date" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">End Date</label>
                            <input type="date" id="apply-leave-end-date" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 14px;">Reasons / Details</label>
                        <textarea id="apply-leave-reasons" rows="3" placeholder="Enter reasons or details..." style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; resize: vertical;"></textarea>
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px;">
                        <button id="cancel-apply-leave-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px;">Cancel</button>
                        <button id="save-apply-leave-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px;">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const addLeaveLogBtn = document.getElementById('add-leave-log-btn');
    const applyLeaveModal = document.getElementById('apply-leave-modal');
    const closeApplyLeaveModal = document.getElementById('close-apply-leave-modal');
    const cancelApplyLeaveBtn = document.getElementById('cancel-apply-leave-btn');
    const saveApplyLeaveBtn = document.getElementById('save-apply-leave-btn');
    const searchInput = document.getElementById('apply-leave-search-name');
    const searchResults = document.getElementById('apply-leave-search-results');
    let searchDebounce = null;

    const openApplyLeaveModal = () => {
        if (applyLeaveModal) {
            applyLeaveModal.style.display = 'flex';
        }
    };

    const closeApplyLeaveModalFn = () => {
        if (applyLeaveModal) applyLeaveModal.style.display = 'none';
    };

    if (addLeaveLogBtn) {
        addLeaveLogBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openApplyLeaveModal();
        });
    }

    if (closeApplyLeaveModal) {
        closeApplyLeaveModal.addEventListener('click', closeApplyLeaveModalFn);
    }

    if (cancelApplyLeaveBtn) {
        cancelApplyLeaveBtn.addEventListener('click', closeApplyLeaveModalFn);
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
                
                const empIdInput = document.getElementById('apply-leave-emp-id');
                const lastNameInput = document.getElementById('apply-leave-last-name');
                const firstNameInput = document.getElementById('apply-leave-first-name');
                const sickInput = document.getElementById('apply-leave-sick-available');
                const vacationInput = document.getElementById('apply-leave-vacation-available');

                if (empIdInput) empIdInput.value = employeeId || '';
                if (lastNameInput) lastNameInput.value = lastName || '';
                if (firstNameInput) firstNameInput.value = firstName || '';

                try {
                    const compRes = await fetch(`/api/employee-compensations/employee/${encodeURIComponent(employeeId)}`);
                    let sickAvailable = 0;
                    let vacationAvailable = 0;

                    if (compRes.ok) {
                        const comp = await compRes.json();
                        sickAvailable = comp.yearly_sick_leave != null ? Number(comp.yearly_sick_leave) : 0;
                        vacationAvailable = comp.yearly_vacation_leave != null ? Number(comp.yearly_vacation_leave) : 0;
                    }

                    const leaveRes = await fetch(`/api/leave-logs/employee/${encodeURIComponent(employeeId)}`);
                    if (leaveRes.ok) {
                        const leaveLogs = await leaveRes.json();
                        const currentYear = new Date().getFullYear().toString();
                        let sickUsed = 0;
                        let vacationUsed = 0;

                        leaveLogs.forEach(log => {
                            const logYear = log.date ? new Date(log.date).getFullYear().toString() : '';
                            if (logYear === currentYear && ['Approved', 'For Disbursement', 'Disbursed'].includes(log.status)) {
                                if (log.leave_type === 'Sick Leave') {
                                    sickUsed += Number(log.total_days) || 0;
                                } else if (log.leave_type === 'Vacation Leave') {
                                    vacationUsed += Number(log.total_days) || 0;
                                }
                            }
                        });

                        sickAvailable = Math.max(0, sickAvailable - sickUsed);
                        vacationAvailable = Math.max(0, vacationAvailable - vacationUsed);
                    }

                    if (sickInput) sickInput.value = sickAvailable;
                    if (vacationInput) vacationInput.value = vacationAvailable;
                } catch (err) {
                    console.error('Failed to load leave data:', err);
                    if (sickInput) sickInput.value = '0';
                    if (vacationInput) vacationInput.value = '0';
                }

                if (searchInput) searchInput.value = '';
                if (searchResults) searchResults.style.display = 'none';
            });
        });
    }

    if (saveApplyLeaveBtn) {
        saveApplyLeaveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const employeeId = document.getElementById('apply-leave-emp-id')?.value.trim() || '';
            const lastName = document.getElementById('apply-leave-last-name')?.value.trim() || '';
            const firstName = document.getElementById('apply-leave-first-name')?.value.trim() || '';
            const leaveType = document.getElementById('apply-leave-type')?.value || '';
            const startDate = document.getElementById('apply-leave-start-date')?.value || '';
            const endDate = document.getElementById('apply-leave-end-date')?.value || '';
            const reasons = document.getElementById('apply-leave-reasons')?.value.trim() || '';

            if (!employeeId || !leaveType || !startDate || !endDate) {
                alert('Please fill in all required fields');
                return;
            }

            const start = new Date(startDate);
            const end = new Date(endDate);
            const totalDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);

            const availableSick = Number(document.getElementById('apply-leave-sick-available')?.value || 0);
            const availableVacation = Number(document.getElementById('apply-leave-vacation-available')?.value || 0);

            if (leaveType === 'Sick Leave' && totalDays > availableSick) {
                alert(`Insufficient Sick Leave balance. Available: ${availableSick} day(s), requested: ${totalDays} day(s).`);
                return;
            }

            if (leaveType === 'Vacation Leave' && totalDays > availableVacation) {
                alert(`Insufficient Vacation Leave balance. Available: ${availableVacation} day(s), requested: ${totalDays} day(s).`);
                return;
            }

            try {
                const res = await fetch('/api/leave-logs/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        logs: [{
                            employee_id: employeeId,
                            last_name: lastName,
                            first_name: firstName,
                            leave_type: leaveType,
                            date: startDate,
                            total_days: totalDays,
                            remarks: reasons
                        }]
                    })
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save leave application');
                }

                alert('Leave application submitted successfully');
                closeApplyLeaveModalFn();
                loadPendingLeaveLogs();
            } catch (err) {
                console.error('Save error:', err);
                alert(err.message || 'Failed to save leave application');
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

    async function loadPendingLeaveLogs() {
        const tbody = document.getElementById('pending-leave-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/leave-logs/pending');
            if (!res.ok) throw new Error('Failed to load pending leave logs');
            const logs = await res.json();
            renderPendingLeaveLogs(logs);
        } catch (err) {
            console.error('Pending leave logs error:', err);
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">Failed to load pending logs</td></tr>';
            }
        }
    }

    function renderPendingLeaveLogs(logs) {
        const tbody = document.getElementById('pending-leave-tbody');
        if (!tbody) return;

        if (!logs || logs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">No pending leave logs</td></tr>';
            return;
        }

        tbody.innerHTML = logs.map(log => `
            <tr style="height: 32px;">
                <td style="padding: 2px; margin: 0;">${log.leave_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.employee_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${formatDate(log.date)}</td>
                <td style="padding: 2px; margin: 0;">${log.last_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.first_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.leave_type || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.total_days != null ? Number(log.total_days).toFixed(2) : ''}</td>
                <td style="padding: 2px; margin: 0;">${log.created_by || ''}</td>
                <td style="padding: 2px; margin: 0;"><span style="background: ${log.status === 'Approved' ? '#d4edda' : log.status === 'Rejected' ? '#f8d7da' : '#FFF3CD'}; color: ${log.status === 'Approved' ? '#155724' : log.status === 'Rejected' ? '#721c24' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
                <td style="padding: 2px; margin: 0; white-space: nowrap;">
                    <button class="btn-primary approve-leave-btn" data-leave-id="${log.leave_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; flex: 1; min-width: 70px; text-align: center;">Approve</button>
                    <button class="btn-reject reject-leave-btn" data-leave-id="${log.leave_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; margin-left: 6px; background: #dc3545; color: white; border: none; border-radius: 4px; flex: 1; min-width: 70px; text-align: center;">Reject</button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.approve-leave-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const leaveId = e.target.getAttribute('data-leave-id');
                if (!leaveId) return;

                try {
                    const res = await fetch(`/api/leave-logs/${encodeURIComponent(leaveId)}/approve`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to approve leave log');
                    }

                    alert(`Leave log ${leaveId} approved successfully`);
                    loadPendingLeaveLogs();
                    loadLeaveHistory();
                } catch (err) {
                    console.error('Approve error:', err);
                    alert(err.message || 'Failed to approve leave log');
                }
            });
        });

        tbody.querySelectorAll('.reject-leave-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const leaveId = e.target.getAttribute('data-leave-id');
                if (!leaveId) return;

                try {
                    const res = await fetch(`/api/leave-logs/reject/${encodeURIComponent(leaveId)}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to reject leave log');
                    }

                    alert(`Leave log ${leaveId} rejected successfully`);
                    loadPendingLeaveLogs();
                    loadLeaveHistory();
                } catch (err) {
                    console.error('Reject error:', err);
                    alert(err.message || 'Failed to reject leave log');
                }
            });
        });
    }

    async function loadLeaveHistory() {
        const tbody = document.getElementById('leave-history-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/leave-logs/all');
            if (!res.ok) throw new Error('Failed to load leave history');
            const logs = await res.json();

            if (!logs || logs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">No leave history</td></tr>';
                return;
            }

            tbody.innerHTML = logs.map(log => `
                <tr style="height: 32px;">
                    <td style="padding: 2px; margin: 0;">${log.leave_id || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.employee_id || ''}</td>
                    <td style="padding: 2px; margin: 0;">${formatDate(log.date)}</td>
                    <td style="padding: 2px; margin: 0;">${log.last_name || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.first_name || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.leave_type || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.total_days != null ? Number(log.total_days).toFixed(2) : ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.created_by || ''}</td>
                    <td style="padding: 2px; margin: 0;"><span style="background: ${log.status === 'Approved' ? '#d4edda' : '#FFF3CD'}; color: ${log.status === 'Approved' ? '#155724' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load leave history:', err);
            tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">Failed to load leave history</td></tr>';
        }
    }

    loadPendingLeaveLogs();
    loadLeaveHistory();
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId;
    const render = ModuleComponents[currentTab];
    if (render) render(contentArea);
}
