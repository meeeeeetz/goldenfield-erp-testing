if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-salary-overtime'] = (container) => {
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1f2e;">Overtime logs</h2>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button id="add-overtime-log-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    <span class="btn-label">Add Overtime Logs</span>
                </button>
                <button id="back-to-salary-btn" class="btn-icon-circle" style="margin-left: auto;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span class="btn-label">Back to Salary</span>
                </button>
            </div>
        </div>

        <div class="card" style="margin-top: 20px; padding: 0; overflow: visible;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">Pending Approval Overtime Log</h3>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <input type="text" id="pending-overtime-search" placeholder="Search name or date..." style="padding: 6px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 13px; width: 220px; box-sizing: border-box;">
                    <button id="approve-filtered-overtime-btn" class="btn-primary" type="button" style="padding: 6px 12px; font-size: 12px; cursor: pointer; background: #28a745; border-color: #28a745; color: white;">Approve Filtered</button>
                    <button id="reject-filtered-overtime-btn" class="btn-danger" type="button" style="padding: 6px 12px; font-size: 12px; cursor: pointer;">Reject Filtered</button>
                </div>
            </div>
            <div style="padding: 0 15px 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                    <thead>
                        <tr>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Overtime ID</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Employee ID</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Date</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Last Name</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">First Name</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Total Hours</th>
                            <th style="width: 150px; padding: 2px; font-size: 15px;">Remarks</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Created by</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="pending-overtime-tbody">
                        <tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card" style="margin-top: 20px; padding: 0; overflow: visible;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">History of Overtime Log</h3>
            </div>
            <div style="padding: 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                    <thead>
                        <tr>
                            <th class="sortable" data-sort="overtime_id" style="width: 140px; padding: 2px; font-size: 15px; cursor: pointer;">Overtime ID <span class="sort-arrow">&#8645;</span></th>
                            <th class="sortable" data-sort="employee_id" style="width: 100px; padding: 2px; font-size: 15px; cursor: pointer;">Employee ID <span class="sort-arrow">&#8645;</span></th>
                            <th class="sortable" data-sort="date" style="width: 120px; padding: 2px; font-size: 15px; cursor: pointer;">Date <span class="sort-arrow">&#8645;</span></th>
                            <th class="sortable" data-sort="last_name" style="width: 120px; padding: 2px; font-size: 15px; cursor: pointer;">Last Name <span class="sort-arrow">&#8645;</span></th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">First Name</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Total Hours</th>
                            <th style="width: 150px; padding: 2px; font-size: 15px;">Remarks</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Created by</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="overtime-history-tbody">
                        <tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="overtime-log-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 1240px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header-row">
                    <h3>Batch Overtime logs</h3>
                    <button class="modal-close-btn" id="close-overtime-log-modal">&times;</button>
                </div>
                <div style="overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; gap: 8px; align-items: flex-start; position: relative;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Search Name</label>
                            <input type="text" id="overtime-search-name" placeholder="Search employee name..." autocomplete="off" style="width: 100%; box-sizing: border-box; padding: 9px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 14px; margin: 0;">
                        </div>
                        <div id="overtime-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; margin-top: 4px;">
                        </div>
                    </div>
                    <div style="overflow-x: auto; border: 1px solid #D6D6D6; border-radius: 6px; margin: 0;">
                        <table class="data-table" style="width: 100%; border-collapse: collapse; min-width: 1200px; margin: 0;">
                            <thead>
                                <tr>
                                    <th style="width: 50px; padding: 2px; font-size: 15px;">Action</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Employee ID</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Last Name</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">First Name</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Date</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Time In</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Time Out</th>
                                    <th style="width: 150px; padding: 2px; font-size: 15px;">Remarks</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Total Hours</th>
                                </tr>
                            </thead>
                            <tbody id="overtime-log-tbody">
                                <tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">No rows added yet</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="display: flex; gap: 6px; justify-content: flex-end; margin: 0;">
                        <button id="cancel-overtime-log-btn" class="btn-danger" type="button" style="padding: 6px 12px; font-size: 14px; margin: 0;">Cancel</button>
                        <button id="save-overtime-log-btn" class="btn-primary" type="button" style="padding: 6px 12px; font-size: 14px; margin: 0;">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const addOvertimeLogBtn = document.getElementById('add-overtime-log-btn');
    const overtimeLogModal = document.getElementById('overtime-log-modal');
    const closeOvertimeLogModal = document.getElementById('close-overtime-log-modal');
    const cancelOvertimeLogBtn = document.getElementById('cancel-overtime-log-btn');
    const saveOvertimeLogBtn = document.getElementById('save-overtime-log-btn');
    const searchInput = document.getElementById('overtime-search-name');
    const searchResults = document.getElementById('overtime-search-results');
    const tbody = document.getElementById('overtime-log-tbody');
    let searchDebounce = null;

    const openOvertimeLogModal = () => {
        if (overtimeLogModal) {
            overtimeLogModal.style.display = 'flex';
            if (tbody) {
                tbody.innerHTML = '';
                for (let i = 0; i < 10; i++) {
                    createBlankRow();
                }
            }
            if (searchInput) {
                searchInput.value = '';
            }
            if (searchResults) {
                searchResults.style.display = 'none';
                searchResults.innerHTML = '';
            }
        }
    };

    const closeOvertimeLogModalFn = () => {
        if (overtimeLogModal) overtimeLogModal.style.display = 'none';
    };

    if (addOvertimeLogBtn) {
        addOvertimeLogBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openOvertimeLogModal();
        });
    }

    if (closeOvertimeLogModal) {
        closeOvertimeLogModal.addEventListener('click', closeOvertimeLogModalFn);
    }

    if (cancelOvertimeLogBtn) {
        cancelOvertimeLogBtn.addEventListener('click', closeOvertimeLogModalFn);
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
                    const res = await fetch(`http://localhost:5000/api/attendance-logs/search-employee?query=${encodeURIComponent(query)}`);
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
                addOvertimeRow(employeeId, lastName, firstName);
                if (searchInput) searchInput.value = '';
                if (searchResults) searchResults.style.display = 'none';
            });
        });
    }

    function createBlankRow() {
        if (!tbody) return;
        if (tbody.querySelector('td[colspan]')) {
            tbody.innerHTML = '';
        }

        const row = document.createElement('tr');
        row.style.height = '32px';
        row.innerHTML = `
            <td style="padding: 2px; margin: 0;">
                <button class="btn-danger remove-row-btn" style="background: #DC3545; color: #fff; border: none; border-radius: 4px; padding: 4px 8px; font-size: 12px; cursor: pointer;">✕</button>
            </td>
            <td style="padding: 2px; margin: 0;"><input type="text" value="" readonly style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0; background: #f1f5f9;"></td>
            <td style="padding: 2px; margin: 0;"><input type="text" value="" readonly style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0; background: #f1f5f9;"></td>
            <td style="padding: 2px; margin: 0;"><input type="text" value="" readonly style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0; background: #f1f5f9;"></td>
            <td style="padding: 2px; margin: 0;"><input type="date" class="overtime-date" style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0;"></td>
            <td style="padding: 2px; margin: 0;"><input type="text" class="overtime-time-in" placeholder="HH:MM (24h)" maxlength="5" style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0;"></td>
            <td style="padding: 2px; margin: 0;"><input type="text" class="overtime-time-out" placeholder="HH:MM (24h)" maxlength="5" style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0;"></td>
            <td style="padding: 2px; margin: 0;"><input type="text" class="overtime-remarks" placeholder="Remarks" style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0;"></td>
            <td style="padding: 2px; margin: 0;"><input type="text" class="overtime-total-hours" readonly style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0; background: #f1f5f9;"></td>
        `;

        row.querySelector('.remove-row-btn').addEventListener('click', () => {
            row.remove();
            if (tbody && tbody.children.length === 0) {
                tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">No rows added yet</td></tr>';
            }
        });

        const timeInInput = row.querySelector('.overtime-time-in');
        const timeOutInput = row.querySelector('.overtime-time-out');
        const totalHoursInput = row.querySelector('.overtime-total-hours');

        function calculateTotalHours() {
            const timeIn = timeInInput ? timeInInput.value : null;
            const timeOut = timeOutInput ? timeOutInput.value : null;
            if (timeIn && timeOut) {
                const [inHours, inMinutes] = timeIn.split(':').map(Number);
                const [outHours, outMinutes] = timeOut.split(':').map(Number);
                const totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
                const hours = Math.max(0, totalMinutes / 60).toFixed(2);
                if (totalHoursInput) totalHoursInput.value = hours;
            } else if (totalHoursInput) {
                totalHoursInput.value = '';
            }
        }

        if (timeInInput) timeInInput.addEventListener('input', calculateTotalHours);
        if (timeOutInput) timeOutInput.addEventListener('input', calculateTotalHours);

        tbody.appendChild(row);
    }

    function addOvertimeRow(employeeId, lastName, firstName) {
        if (!tbody) return;
        if (tbody.querySelector('td[colspan]')) {
            tbody.innerHTML = '';
        }

        const existingRows = Array.from(tbody.querySelectorAll('tr'));
        const emptyRow = existingRows.find(row => {
            const empInput = row.querySelector('td:nth-child(2) input');
            return empInput && !empInput.value.trim();
        });

        if (emptyRow) {
            const cells = emptyRow.querySelectorAll('td');
            const inputs = {
                empId: cells[1].querySelector('input'),
                lastName: cells[2].querySelector('input'),
                firstName: cells[3].querySelector('input'),
            };
            if (inputs.empId) inputs.empId.value = employeeId || '';
            if (inputs.lastName) inputs.lastName.value = lastName || '';
            if (inputs.firstName) inputs.firstName.value = firstName || '';
            
            emptyRow.querySelector('.remove-row-btn')?.addEventListener('click', () => {
                emptyRow.remove();
                if (tbody && tbody.children.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">No rows added yet</td></tr>';
                }
            });

            const timeInInput = emptyRow.querySelector('.overtime-time-in');
            const timeOutInput = emptyRow.querySelector('.overtime-time-out');
            const totalHoursInput = emptyRow.querySelector('.overtime-total-hours');

            function calculateTotalHours() {
                const timeIn = timeInInput ? timeInInput.value : null;
                const timeOut = timeOutInput ? timeOutInput.value : null;
                if (timeIn && timeOut) {
                    const [inHours, inMinutes] = timeIn.split(':').map(Number);
                    const [outHours, outMinutes] = timeOut.split(':').map(Number);
                    const totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
                    const hours = Math.max(0, totalMinutes / 60).toFixed(2);
                    if (totalHoursInput) totalHoursInput.value = hours;
                } else if (totalHoursInput) {
                    totalHoursInput.value = '';
                }
            }

            if (timeInInput) timeInInput.addEventListener('input', calculateTotalHours);
            if (timeOutInput) timeOutInput.addEventListener('input', calculateTotalHours);
        } else {
            const row = document.createElement('tr');
            row.style.height = '32px';
            row.innerHTML = `
                <td style="padding: 2px; margin: 0;">
                    <button class="btn-danger remove-row-btn" style="background: #DC3545; color: #fff; border: none; border-radius: 4px; padding: 4px 8px; font-size: 12px; cursor: pointer;">✕</button>
                </td>
                <td style="padding: 2px; margin: 0;"><input type="text" value="${employeeId || ''}" readonly style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0; background: #f1f5f9;"></td>
                <td style="padding: 2px; margin: 0;"><input type="text" value="${lastName || ''}" readonly style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0; background: #f1f5f9;"></td>
                <td style="padding: 2px; margin: 0;"><input type="text" value="${firstName || ''}" readonly style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0; background: #f1f5f9;"></td>
                <td style="padding: 2px; margin: 0;"><input type="date" class="overtime-date" style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0;"></td>
                <td style="padding: 2px; margin: 0;"><input type="text" class="overtime-time-in" placeholder="HH:MM (24h)" maxlength="5" style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0;"></td>
                <td style="padding: 2px; margin: 0;"><input type="text" class="overtime-time-out" placeholder="HH:MM (24h)" maxlength="5" style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0;"></td>
                <td style="padding: 2px; margin: 0;"><input type="text" class="overtime-remarks" placeholder="Remarks" style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0;"></td>
                <td style="padding: 2px; margin: 0;"><input type="text" class="overtime-total-hours" readonly style="width: 100%; box-sizing: border-box; padding: 4px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 14px; margin: 0; background: #f1f5f9;"></td>
            `;

            row.querySelector('.remove-row-btn').addEventListener('click', () => {
                row.remove();
                if (tbody && tbody.children.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">No rows added yet</td></tr>';
                }
            });

            const timeInInput = row.querySelector('.overtime-time-in');
            const timeOutInput = row.querySelector('.overtime-time-out');
            const totalHoursInput = row.querySelector('.overtime-total-hours');

            function calculateTotalHours() {
                const timeIn = timeInInput ? timeInInput.value : null;
                const timeOut = timeOutInput ? timeOutInput.value : null;
                if (timeIn && timeOut) {
                    const [inHours, inMinutes] = timeIn.split(':').map(Number);
                    const [outHours, outMinutes] = timeOut.split(':').map(Number);
                    const totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
                    const hours = Math.max(0, totalMinutes / 60).toFixed(2);
                    if (totalHoursInput) totalHoursInput.value = hours;
                } else if (totalHoursInput) {
                    totalHoursInput.value = '';
                }
            }

            if (timeInInput) timeInInput.addEventListener('input', calculateTotalHours);
            if (timeOutInput) timeOutInput.addEventListener('input', calculateTotalHours);

            tbody.appendChild(row);
        }
    }

    if (saveOvertimeLogBtn) {
        saveOvertimeLogBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const rows = tbody.querySelectorAll('tr');
            const logs = [];

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length < 9) return;

                const employeeId = cells[1].querySelector('input')?.value || null;
                const date = cells[4].querySelector('input')?.value || null;
                const timeIn = cells[5].querySelector('input')?.value || null;
                const timeOut = cells[6].querySelector('input')?.value || null;
                const remarks = cells[7].querySelector('input')?.value || null;
                const totalHours = cells[8].querySelector('input')?.value || 0;

                if (employeeId && date && timeIn && timeOut) {
                    logs.push({
                        employee_id: employeeId,
                        date,
                        time_in: timeIn,
                        time_out: timeOut,
                        remarks,
                        total_hours: totalHours
                    });
                }
            });

            if (logs.length === 0) {
                alert('Please fill in at least one complete row');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/overtime-logs/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ logs })
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save overtime logs');
                }
                const result = await res.json();
                const savedIds = (result.data || []).map(row => row.overtime_id).filter(Boolean);
                alert(`Saved ${logs.length} row(s) successfully\nIDs: ${savedIds.join(', ')}`);
                closeOvertimeLogModalFn();
                loadPendingOvertimeLogs();
                loadOvertimeHistory();
            } catch (err) {
                console.error('Save error:', err);
                alert(err.message || 'Failed to save overtime logs');
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

    async function loadPendingOvertimeLogs() {
        const tbody = document.getElementById('pending-overtime-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('http://localhost:5000/api/overtime-logs/pending');
            if (!res.ok) throw new Error('Failed to load pending overtime logs');
            const logs = await res.json();
            allPendingOvertimeLogs = logs;
            renderPendingOvertimeLogs(logs);
        } catch (err) {
            console.error('Pending overtime logs error:', err);
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">Failed to load pending logs</td></tr>';
            }
        }
    }

    function renderPendingOvertimeLogs(logs) {
        const tbody = document.getElementById('pending-overtime-tbody');
        if (!tbody) return;

        if (!logs || logs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">No pending overtime logs</td></tr>';
            return;
        }

        tbody.innerHTML = logs.map(log => `
            <tr style="height: 32px;">
                <td style="padding: 2px; margin: 0;">${log.overtime_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.employee_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${formatDate(log.date)}</td>
                <td style="padding: 2px; margin: 0;">${log.last_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.first_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.total_hours != null ? Number(log.total_hours).toFixed(2) : ''}</td>
                <td style="padding: 2px; margin: 0;">${log.remarks || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.created_by || ''}</td>
                <td style="padding: 2px; margin: 0;"><span style="background: #FFF3CD; color: #856404; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
                <td style="padding: 2px; margin: 0;">
                    <button class="btn-primary approve-overtime-btn" data-overtime-id="${log.overtime_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; flex: 1; min-width: 70px; text-align: center;">Approve</button>
                    <button class="btn-reject reject-overtime-btn" data-overtime-id="${log.overtime_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; margin-left: 6px; background: #dc3545; color: white; border: none; border-radius: 4px; flex: 1; min-width: 70px; text-align: center;">Reject</button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.approve-overtime-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const overtimeId = e.target.getAttribute('data-overtime-id');
                if (!overtimeId) return;

                try {
                    const res = await fetch(`http://localhost:5000/api/overtime-logs/${encodeURIComponent(overtimeId)}/approve`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to approve overtime log');
                    }

                    alert(`Overtime log ${overtimeId} approved successfully`);
                    loadPendingOvertimeLogs();
                    filterPendingOvertimeLogs();
                    loadOvertimeHistory();
                } catch (err) {
                    console.error('Approve error:', err);
                    alert(err.message || 'Failed to approve overtime log');
                }
            });
        });

        tbody.querySelectorAll('.reject-overtime-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const overtimeId = e.target.getAttribute('data-overtime-id');
                if (!overtimeId) return;

                try {
                    const res = await fetch(`http://localhost:5000/api/overtime-logs/reject/${encodeURIComponent(overtimeId)}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to reject overtime log');
                    }

                    alert(`Overtime log ${overtimeId} rejected successfully`);
                    loadPendingOvertimeLogs();
                    filterPendingOvertimeLogs();
                    loadOvertimeHistory();
                } catch (err) {
                    console.error('Reject error:', err);
                    alert(err.message || 'Failed to reject overtime log');
                }
            });
        });
    }

    let allPendingOvertimeLogs = [];

    function filterPendingOvertimeLogs() {
        const searchInput = document.getElementById('pending-overtime-search');
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        if (!query) {
            renderPendingOvertimeLogs(allPendingOvertimeLogs);
            return;
        }
        const filtered = allPendingOvertimeLogs.filter(log => {
            const fullName = `${log.last_name || ''} ${log.first_name || ''}`.toLowerCase();
            const formattedDate = formatDate(log.date).toLowerCase();
            return fullName.includes(query) || formattedDate.includes(query);
        });
        renderPendingOvertimeLogs(filtered);
    }

    const getVisiblePendingOvertimeIds = () => {
        const tbody = document.getElementById('pending-overtime-tbody');
        if (!tbody) return [];
        const ids = [];
        tbody.querySelectorAll('tr').forEach(row => {
            const overtimeId = row.querySelector('.approve-overtime-btn')?.getAttribute('data-overtime-id');
            if (overtimeId) ids.push(overtimeId);
        });
        return ids;
    };

    const bulkApproveFilteredOvertime = async () => {
        const ids = getVisiblePendingOvertimeIds();
        if (ids.length === 0) {
            alert('No pending overtime logs to approve');
            return;
        }
        const confirmed = confirm(`Approve ${ids.length} overtime log(s)?`);
        if (!confirmed) return;
        try {
            const res = await fetch('http://localhost:5000/api/overtime-logs/bulk-approve', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ overtime_ids: ids })
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to bulk approve');
            }
            const data = await res.json();
            let alertMsg = data.message || `Approved ${ids.length} logs`;
            if (data.data && data.data.skipped && data.data.skipped.length > 0) {
                alertMsg += `\nSkipped: ${data.data.skipped.map(s => s.overtime_id).join(', ')}`;
            }
            alert(alertMsg);
            await loadPendingOvertimeLogs();
            filterPendingOvertimeLogs();
            loadOvertimeHistory();
        } catch (err) {
            console.error('Bulk approve error:', err);
            alert(err.message || 'Failed to bulk approve');
        }
    };

    const bulkRejectFilteredOvertime = async () => {
        const ids = getVisiblePendingOvertimeIds();
        if (ids.length === 0) {
            alert('No pending overtime logs to reject');
            return;
        }
        const confirmed = confirm(`Reject ${ids.length} overtime log(s)?`);
        if (!confirmed) return;
        try {
            const res = await fetch('http://localhost:5000/api/overtime-logs/bulk-reject', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ overtime_ids: ids })
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to bulk reject');
            }
            const data = await res.json();
            let alertMsg = data.message || `Rejected ${ids.length} logs`;
            if (data.data && data.data.skipped && data.data.skipped.length > 0) {
                alertMsg += `\nSkipped: ${data.data.skipped.map(s => s.overtime_id).join(', ')}`;
            }
            alert(alertMsg);
            await loadPendingOvertimeLogs();
            filterPendingOvertimeLogs();
            loadOvertimeHistory();
        } catch (err) {
            console.error('Bulk reject error:', err);
            alert(err.message || 'Failed to bulk reject');
        }
    };

    const pendingOvertimeSearchInput = document.getElementById('pending-overtime-search');
    if (pendingOvertimeSearchInput) {
        pendingOvertimeSearchInput.addEventListener('input', () => {
            filterPendingOvertimeLogs();
        });
    }

    const approveFilteredOvertimeBtn = document.getElementById('approve-filtered-overtime-btn');
    const rejectFilteredOvertimeBtn = document.getElementById('reject-filtered-overtime-btn');

    if (approveFilteredOvertimeBtn) {
        approveFilteredOvertimeBtn.addEventListener('click', bulkApproveFilteredOvertime);
    }

    if (rejectFilteredOvertimeBtn) {
        rejectFilteredOvertimeBtn.addEventListener('click', bulkRejectFilteredOvertime);
    }

    async function loadOvertimeHistory() {
        const tbody = document.getElementById('overtime-history-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('http://localhost:5000/api/overtime-logs/all');
            if (!res.ok) throw new Error('Failed to load overtime history');
            const logs = await res.json();

            if (!logs || logs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">No overtime history</td></tr>';
                return;
            }

            tbody.innerHTML = logs.map(log => `
                <tr style="height: 32px;">
                    <td style="padding: 2px; margin: 0;">${log.overtime_id || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.employee_id || ''}</td>
                    <td style="padding: 2px; margin: 0;">${formatDate(log.date)}</td>
                    <td style="padding: 2px; margin: 0;">${log.last_name || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.first_name || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.total_hours != null ? Number(log.total_hours).toFixed(2) : ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.remarks || ''}</td>
                    <td style="padding: 2px; margin: 0;">${log.created_by || ''}</td>
                    <td style="padding: 2px; margin: 0;"><span style="background: ${log.status === 'Approved' ? '#d4edda' : '#FFF3CD'}; color: ${log.status === 'Approved' ? '#155724' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load overtime history:', err);
            tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">Failed to load overtime history</td></tr>';
        }
    }

    loadPendingOvertimeLogs();
    loadOvertimeHistory();

    const overtimeSortState = { col: null, dir: 1 };
    const applyOvertimeSort = () => {
        const tbody = document.getElementById('overtime-history-tbody');
        if (!tbody) return;
        document.querySelectorAll('th.sortable .sort-arrow').forEach(a => a.textContent = '⇅');
        if (!overtimeSortState.col) return;
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const colMap = { overtime_id: 0, employee_id: 1, date: 2, last_name: 3 };
        const colIndex = colMap[overtimeSortState.col];
        if (colIndex === undefined) return;
        rows.sort((a, b) => {
            const va = a.children[colIndex].textContent.trim();
            const vb = b.children[colIndex].textContent.trim();
            if (overtimeSortState.col === 'overtime_id') {
                return va.localeCompare(vb, undefined, { numeric: true }) * overtimeSortState.dir;
            }
            if (overtimeSortState.col === 'date') {
                const da = new Date(va);
                const db = new Date(vb);
                return (da - db) * overtimeSortState.dir;
            }
            return va.localeCompare(vb) * overtimeSortState.dir;
        });
        rows.forEach(r => tbody.appendChild(r));
        const arrow = document.querySelector(`th.sortable[data-sort="${overtimeSortState.col}"] .sort-arrow`);
        if (arrow) arrow.textContent = overtimeSortState.dir === 1 ? '▲' : '▼';
    };
    document.querySelectorAll('th.sortable').forEach(th => {
        th.onclick = () => {
            const col = th.dataset.sort;
            if (overtimeSortState.col === col) overtimeSortState.dir *= -1;
            else { overtimeSortState.col = col; overtimeSortState.dir = 1; }
            applyOvertimeSort();
        };
    });
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId;
    const render = ModuleComponents[currentTab];
    if (render) render(contentArea);
}
