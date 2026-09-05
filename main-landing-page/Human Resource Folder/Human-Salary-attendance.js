if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-salary-attendance'] = (container) => {
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1f2e;">Attendance Log</h2>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button id="attendance-subtab-add-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                <span class="btn-label">Add Attendance Log</span>
            </button>
                <button id="batch-upload-attendance-btn" class="btn-icon-circle" style="margin-left: 8px;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span class="btn-label">Batch Upload</span>
                </button>
                <button id="back-to-salary-btn" class="btn-icon-circle" style="margin-left: auto;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span class="btn-label">Back to Salary</span>
                </button>
            </div>
        <div class="card" style="padding: 0; margin: 0;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">Pending Approval Attendance Log</h3>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <input type="text" id="pending-attendance-search" placeholder="Search name or date..." style="padding: 6px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 13px; width: 220px; box-sizing: border-box;">
                    <button id="approve-filtered-btn" class="btn-primary" type="button" style="padding: 6px 12px; font-size: 12px; cursor: pointer; background: #28a745; border-color: #28a745; color: white;">Approve Filtered</button>
                    <button id="reject-filtered-btn" class="btn-danger" type="button" style="padding: 6px 12px; font-size: 12px; cursor: pointer;">Reject Filtered</button>
                </div>
            </div>
            <div style="overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                    <thead>
                        <tr>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Attendance ID</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Employee ID</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Date</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Last Name</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">First Name</th>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Actual Payable Hours</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Created by</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="pending-attendance-tbody">
                        <tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card" style="padding: 0; margin: 0;">
            <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1a1f2e;">History of Attendance Log</h3>
                <input type="text" id="history-attendance-search" placeholder="Search name or date..." style="padding: 6px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 13px; width: 220px; box-sizing: border-box;">
            </div>
            <div style="overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                    <thead>
                        <tr>
                            <th class="sortable" data-sort="attendance_id" style="width: 140px; padding: 2px; font-size: 15px; cursor: pointer;">Attendance ID <span class="sort-arrow">&#8645;</span></th>
                            <th class="sortable" data-sort="employee_id" style="width: 100px; padding: 2px; font-size: 15px; cursor: pointer;">Employee ID <span class="sort-arrow">&#8645;</span></th>
                            <th class="sortable" data-sort="date" style="width: 120px; padding: 2px; font-size: 15px; cursor: pointer;">Date <span class="sort-arrow">&#8645;</span></th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Last Name</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">First Name</th>
                            <th class="sortable" data-sort="actual_payable_hours" style="width: 140px; padding: 2px; font-size: 15px; cursor: pointer;">Actual Payable Hours <span class="sort-arrow">&#8645;</span></th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Created by</th>
                            <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="attendance-history-tbody">
                        <tr><td colspan="8" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="attendance-log-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 1400px; width: 115%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header-row">
                    <h3>Input Attendance Log</h3>
                    <button class="modal-close-btn" id="close-attendance-log-modal">&times;</button>
                </div>
                <div style="overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; gap: 8px; align-items: flex-start; position: relative;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-size: 14px;">Search Name</label>
                            <input type="text" id="att-search-name" placeholder="Search employee name..." autocomplete="off" style="width: 100%; box-sizing: border-box; padding: 9px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 14px; margin: 0;">
                        </div>
                        <div id="att-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; margin-top: 4px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Employee ID</label>
                            <input type="text" id="att-emp-id" readonly style="width: 100%; box-sizing: border-box; padding: 9px; border: 1px solid #D6D6D6; border-radius: 4px; background: #f1f5f9; font-size: 14px; margin: 0;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Shift Type</label>
                            <input type="text" id="att-shift-type" readonly style="width: 100%; box-sizing: border-box; padding: 9px; border: 1px solid #D6D6D6; border-radius: 4px; background: #f1f5f9; font-size: 14px; margin: 0;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Last Name</label>
                            <input type="text" id="att-last-name" readonly style="width: 100%; box-sizing: border-box; padding: 9px; border: 1px solid #D6D6D6; border-radius: 4px; background: #f1f5f9; font-size: 14px; margin: 0;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>First Name</label>
                            <input type="text" id="att-first-name" readonly style="width: 100%; box-sizing: border-box; padding: 9px; border: 1px solid #D6D6D6; border-radius: 4px; background: #f1f5f9; font-size: 14px; margin: 0;">
                        </div>
                    </div>
                    <div style="overflow-x: auto; border: 1px solid #D6D6D6; border-radius: 6px; margin: 0;">
                        <table class="data-table" style="width: 100%; border-collapse: collapse; min-width: 1700px; margin: 0;">
                            <thead>
                                <tr>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Date</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Time In</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">1st Coffee Break IN</th>
                                    <th style="width: 130px; padding: 2px; font-size: 15px;">1st Coffee Break OUT</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Mid Break IN</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Mid Break OUT</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px;">2nd Coffee Break IN</th>
                                    <th style="width: 150px; padding: 2px; font-size: 15px;">2nd Coffee Break OUT</th>
                                    <th style="width: 150px; padding: 2px; font-size: 15px;">Time Out</th>
                                    <th style="width: 130px; padding: 2px; font-size: 15px;">Total Late Minutes</th>
                                    <th style="width: 150px; padding: 2px; font-size: 15px;">Total Early Out Minutes</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px;">Total Deductable Time (Minutes)</th>
                            <th class="sortable" data-sort="actual_payable_hours" style="width: 140px; padding: 2px; font-size: 15px; cursor: pointer;">Actual Payable Hours <span class="sort-arrow">&#8645;</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Array.from({length: 16}, (_, i) => `
                                <tr style="height: 32px;">
                                    <td style="padding: 0px; margin: 0;"><input type="date" style="width: 100%; box-sizing: border-box; padding: 0px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 15px; margin: 0; height: 30px; line-height: 22px;"></td>
                                    <td style="padding: 0px; margin: 0;"><input type="time" style="width: 100%; box-sizing: border-box; padding: 0px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 15px; margin: 0; height: 30px; line-height: 22px;"></td>
                                    <td style="padding: 0px; margin: 0;"><input type="time" style="width: 100%; box-sizing: border-box; padding: 0px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 15px; margin: 0; height: 30px; line-height: 22px;"></td>
                                    <td style="padding: 0px; margin: 0;"><input type="time" style="width: 100%; box-sizing: border-box; padding: 0px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 15px; margin: 0; height: 30px; line-height: 22px;"></td>
                                    <td style="padding: 0px; margin: 0;"><input type="time" style="width: 100%; box-sizing: border-box; padding: 0px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 15px; margin: 0; height: 30px; line-height: 22px;"></td>
                                    <td style="padding: 0px; margin: 0;"><input type="time" style="width: 100%; box-sizing: border-box; padding: 0px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 15px; margin: 0; height: 30px; line-height: 22px;"></td>
                                    <td style="padding: 0px; margin: 0;"><input type="time" style="width: 100%; box-sizing: border-box; padding: 0px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 15px; margin: 0; height: 30px; line-height: 22px;"></td>
                                    <td style="padding: 0px; margin: 0;"><input type="time" style="width: 100%; box-sizing: border-box; padding: 0px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 15px; margin: 0; height: 30px; line-height: 22px;"></td>
                                    <td style="padding: 0px; margin: 0;"><input type="time" style="width: 100%; box-sizing: border-box; padding: 0px; border: 1px solid #e2e8f0; border-radius: 2px; font-size: 15px; margin: 0; height: 30px; line-height: 22px;"></td>
                                    <td style="padding: 0px; margin: 0; text-align: right;"><span class="computed-value" style="display: block; padding: 0px; font-size: 15px; margin: 0; height: 30px; line-height: 30px;">0</span></td>
                                    <td style="padding: 0px; margin: 0; text-align: right;"><span class="computed-value" style="display: block; padding: 0px; font-size: 15px; margin: 0; height: 30px; line-height: 30px;">0</span></td>
                                    <td style="padding: 0px; margin: 0; text-align: right;"><span class="computed-value" style="display: block; padding: 0px; font-size: 15px; margin: 0; height: 30px; line-height: 30px;">0</span></td>
                                    <td style="padding: 0px; margin: 0; text-align: right;"><span class="computed-value" style="display: block; padding: 0px; font-size: 15px; margin: 0; height: 30px; line-height: 30px;">0.00</span></td>
                                 </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div style="display: flex; gap: 6px; justify-content: flex-end; margin: 0;">
                        <button id="cancel-attendance-log-btn" class="btn-danger" type="button" style="padding: 6px 12px; font-size: 14px; margin: 0;">Cancel</button>
                        <button id="save-attendance-log-btn" class="btn-primary" type="button" style="padding: 6px 12px; font-size: 14px; margin: 0;">Save</button>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div id="batch-upload-attendance-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 1200px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Batch Upload Attendance</h3>
                    <button class="modal-close-btn" id="close-batch-upload-attendance-modal">&times;</button>
                </div>
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div id="batch-attendance-drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 40px 20px; text-align: center; background: #f8fafc; transition: border-color 0.2s, background 0.2s; cursor: pointer; flex: 0 0 320px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px;">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <p style="margin: 12px 0 4px; font-size: 16px; font-weight: 600; color: #1a1f2e;">Drag and drop Excel/CSV file here</p>
                            <p style="margin: 0; font-size: 13px; color: #64748b;">or click to browse</p>
                            <input type="file" id="batch-attendance-file-input" accept=".xlsx,.xls,.csv" style="display: none;">
                            <p id="batch-attendance-file-name" style="margin-top: 12px; font-size: 14px; color: #2563eb; font-weight: 600;"></p>
                        </div>
                        <div id="batch-attendance-preview" style="flex: 1; overflow: auto; max-height: 420px; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; display: none;">
                            <div style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Preview</div>
                            <div id="batch-attendance-preview-table" style="overflow-x: auto;"></div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button id="download-attendance-template-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Download Template</button>
                        <button id="download-attendance-template-admin-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer; background: #28a745; border-color: #28a745; color: white;">Download Template admin</button>
                        <button id="cancel-batch-upload-attendance-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Cancel</button>
                        <button id="save-batch-upload-attendance-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="bulk-attendance-summary-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 600px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Bulk Upload Summary</h3>
                    <button class="modal-close-btn" id="close-bulk-attendance-summary-modal">&times;</button>
                </div>
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; gap: 16px; justify-content: space-around; text-align: center;">
                        <div style="flex: 1; padding: 12px; border-radius: 8px; background: #d4edda;">
                            <div style="font-size: 24px; font-weight: 700; color: #155724;" id="bulk-attendance-ok-count">0</div>
                            <div style="font-size: 13px; color: #155724;">Rows OK</div>
                        </div>
                        <div style="flex: 1; padding: 12px; border-radius: 8px; background: #f8d7da;">
                            <div style="font-size: 24px; font-weight: 700; color: #721c24;" id="bulk-attendance-missing-count">0</div>
                            <div style="font-size: 13px; color: #721c24;">Rows Missing</div>
                        </div>
                    </div>
                    <div id="bulk-attendance-missing-details" style="display: none; padding: 12px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px;">
                        <strong>Missing Rows (incomplete data):</strong>
                        <div id="bulk-attendance-missing-list" style="margin-top: 8px; font-size: 13px; color: #856404;"></div>
                    </div>
                    <div id="bulk-attendance-error-details" style="display: none; padding: 12px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 6px;">
                        <strong>Errors:</strong>
                        <div id="bulk-attendance-error-list" style="margin-top: 8px; font-size: 13px; color: #721c24;"></div>
                    </div>
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button id="cancel-bulk-attendance-summary-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Cancel</button>
                        <button id="proceed-bulk-attendance-summary-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Proceed</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const attendanceSubtabAddBtn = document.getElementById('attendance-subtab-add-btn');
    const attendanceLogModal = document.getElementById('attendance-log-modal');
    const closeAttendanceLogModal = document.getElementById('close-attendance-log-modal');
    const cancelAttendanceLogBtn = document.getElementById('cancel-attendance-log-btn');
    const saveAttendanceLogBtn = document.getElementById('save-attendance-log-btn');

    const openAttendanceLogModal = () => {
        if (attendanceLogModal) attendanceLogModal.style.display = 'flex';
        calculateAllRows();
    };

    const closeAttendanceLogModalFn = () => {
        if (attendanceLogModal) attendanceLogModal.style.display = 'none';
    };

    if (attendanceSubtabAddBtn) {
        attendanceSubtabAddBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openAttendanceLogModal();
        });
    }

    if (closeAttendanceLogModal) {
        closeAttendanceLogModal.addEventListener('click', closeAttendanceLogModalFn);
    }

    if (cancelAttendanceLogBtn) {
        cancelAttendanceLogBtn.addEventListener('click', closeAttendanceLogModalFn);
    }

    const backToSalaryBtn = document.getElementById('back-to-salary-btn');
    if (backToSalaryBtn) {
        backToSalaryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            switchTab('hr-salary');
        });
    }

    const searchInput = document.getElementById('att-search-name');
    const searchResults = document.getElementById('att-search-results');
    const empIdInput = document.getElementById('att-emp-id');
    const shiftTypeInput = document.getElementById('att-shift-type');
    const lastNameInput = document.getElementById('att-last-name');
    const firstNameInput = document.getElementById('att-first-name');
    let selectedEmployeeId = null;
    let searchDebounce = null;

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            selectedEmployeeId = null;
            if (empIdInput) empIdInput.value = '';
            if (shiftTypeInput) shiftTypeInput.value = '';
            if (lastNameInput) lastNameInput.value = '';
            if (firstNameInput) firstNameInput.value = '';

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
                selectedEmployeeId = item.getAttribute('data-employee-id');
                if (empIdInput) empIdInput.value = selectedEmployeeId;
                if (lastNameInput) lastNameInput.value = item.getAttribute('data-last-name') || '';
                if (firstNameInput) firstNameInput.value = item.getAttribute('data-first-name') || '';
                if (searchInput) searchInput.value = `${item.getAttribute('data-last-name') || ''}, ${item.getAttribute('data-first-name') || ''}`;
                if (searchResults) searchResults.style.display = 'none';

                try {
                    const res = await fetch(`/api/attendance-logs/employee/${encodeURIComponent(selectedEmployeeId)}`);
                    if (!res.ok) throw new Error('Failed to load employee details');
                    const emp = await res.json();
                    if (shiftTypeInput) shiftTypeInput.value = emp.shift_policy || '';
                    await loadShiftPolicy(emp.shift_policy || '');
                } catch (err) {
                    console.error('Employee detail error:', err);
                }
            });
        });
    }

    async function loadShiftPolicy(shiftType) {
        if (!shiftType) return;
        try {
            const res = await fetch(`/api/attendance-logs/shift-policy/${encodeURIComponent(shiftType)}`);
            if (!res.ok) throw new Error('Failed to load shift policy');
            window.currentShiftPolicy = await res.json();
            calculateAllRows();
        } catch (err) {
            console.error('Shift policy error:', err);
            window.currentShiftPolicy = null;
        }
    }

    function calculateRow(row) {
        const cells = row.querySelectorAll('td');
        if (cells.length < 13) return;

        const timeIn = cells[1].querySelector('input')?.value || null;
        const firstCoffeeBreakOut = cells[3].querySelector('input')?.value || null;
        const midBreakOut = cells[5].querySelector('input')?.value || null;
        const secondCoffeeBreakOut = cells[7].querySelector('input')?.value || null;
        const firstCoffeeBreakIn = cells[2].querySelector('input')?.value || null;
        const midBreakIn = cells[4].querySelector('input')?.value || null;
        const secondCoffeeBreakIn = cells[6].querySelector('input')?.value || null;
        const timeOut = cells[8].querySelector('input')?.value || null;

        const shiftPolicyName = employeeShiftMap[String(selectedEmployeeId || '').trim()];
        const shiftPolicy = shiftPolicyName ? shiftPolicyMap[shiftPolicyName] : null;
        const scheduledStart = shiftPolicy ? toMinutes(shiftPolicy.start) : 8 * 60;
        const scheduledEnd = shiftPolicy ? toMinutes(shiftPolicy.end) : 17 * 60;
        const scheduledBreakMinutes = getScheduledBreakMinutes(shiftPolicy);
        const scheduledWorkMinutes = scheduledEnd - scheduledStart - scheduledBreakMinutes;

        const timeInMin = toMinutes(timeIn);
        const timeOutMin = toMinutes(timeOut);

        let actualWorkMinutes = 0;
        if (timeInMin != null && timeOutMin != null && timeOutMin > timeInMin) {
            let totalActualBreakMinutes = 0;
            if (firstCoffeeBreakIn && firstCoffeeBreakOut) {
                const start = toMinutes(firstCoffeeBreakIn);
                const end = toMinutes(firstCoffeeBreakOut);
                if (start != null && end != null && end > start) totalActualBreakMinutes += end - start;
            }
            if (midBreakIn && midBreakOut) {
                const start = toMinutes(midBreakIn);
                const end = toMinutes(midBreakOut);
                if (start != null && end != null && end > start) totalActualBreakMinutes += end - start;
            }
            if (secondCoffeeBreakIn && secondCoffeeBreakOut) {
                const start = toMinutes(secondCoffeeBreakIn);
                const end = toMinutes(secondCoffeeBreakOut);
                if (start != null && end != null && end > start) totalActualBreakMinutes += end - start;
            }
            actualWorkMinutes = timeOutMin - timeInMin - totalActualBreakMinutes;
        }
        actualWorkMinutes = Math.max(0, actualWorkMinutes);

        const isPartialDay = actualWorkMinutes < scheduledWorkMinutes;

        let totalLateMinutes, totalEarlyOutMinutes, totalDeductableTime, actualPayableHours;

        if (isPartialDay) {
            totalLateMinutes = 0;
            totalEarlyOutMinutes = 0;
            totalDeductableTime = 0;
            actualPayableHours = +(actualWorkMinutes / 60).toFixed(2);
        } else {
            const lateMinutes = timeInMin != null && timeInMin > scheduledStart ? +(timeInMin - scheduledStart).toFixed(2) : 0;
            const earlyOutMinutes = timeOutMin != null && timeOutMin < scheduledEnd ? +(scheduledEnd - timeOutMin).toFixed(2) : 0;
            totalLateMinutes = lateMinutes;
            totalEarlyOutMinutes = earlyOutMinutes;
            totalDeductableTime = +(lateMinutes + earlyOutMinutes).toFixed(2);
            actualPayableHours = +Math.max(0, scheduledWorkMinutes / 60 - totalDeductableTime / 60).toFixed(2);
        }

        const lateSpan = cells[9].querySelector('.computed-value');
        const earlySpan = cells[10].querySelector('.computed-value');
        const deductSpan = cells[11].querySelector('.computed-value');
        const actualSpan = cells[12].querySelector('.computed-value');

        if (lateSpan) lateSpan.textContent = totalLateMinutes || 0;
        if (earlySpan) earlySpan.textContent = totalEarlyOutMinutes || 0;
        if (deductSpan) deductSpan.textContent = totalDeductableTime || 0;
        if (actualSpan) actualSpan.textContent = actualPayableHours;
    }

    function calculateAllRows() {
        const tbody = document.querySelector('#attendance-log-modal table.data-table tbody');
        if (!tbody) return;
        tbody.querySelectorAll('tr').forEach(calculateRow);
    }

    function attachRowListeners(row) {
        const inputs = row.querySelectorAll('input[type="time"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => calculateRow(row));
            input.addEventListener('change', () => calculateRow(row));
        });
    }

    const tbody = document.querySelector('#attendance-log-modal table.data-table tbody');
    if (tbody) {
        tbody.querySelectorAll('tr').forEach(attachRowListeners);
    }

    if (saveAttendanceLogBtn) {
        saveAttendanceLogBtn.addEventListener('click', async () => {
            if (!selectedEmployeeId) {
                alert('Please select an employee first');
                return;
            }

            const tbody = document.querySelector('#attendance-log-modal table.data-table tbody');
            if (!tbody) return;

            const rows = tbody.querySelectorAll('tr');
            const logs = [];
            const skippedRows = [];

            rows.forEach((row, index) => {
                const cells = row.querySelectorAll('td');
                if (cells.length < 13) return;

                const date = cells[0].querySelector('input')?.value || null;
                const time_in = cells[1].querySelector('input')?.value || null;
                const first_coffee_break_in = cells[2].querySelector('input')?.value || null;
                const first_coffee_break_out = cells[3].querySelector('input')?.value || null;
                const mid_day_break_in = cells[4].querySelector('input')?.value || null;
                const mid_day_break_out = cells[5].querySelector('input')?.value || null;
                const second_coffee_break_in = cells[6].querySelector('input')?.value || null;
                const second_coffee_break_out = cells[7].querySelector('input')?.value || null;
                const time_out = cells[8].querySelector('input')?.value || null;

                if (!date) {
                    skippedRows.push(index + 1);
                    return;
                }

                const total_late_minutes = cells[9].querySelector('.computed-value')?.textContent || 0;
                const total_early_out_minutes = cells[10].querySelector('.computed-value')?.textContent || 0;
                const total_deductable_time = cells[11].querySelector('.computed-value')?.textContent || 0;
                const actual_payable_hours = cells[12].querySelector('.computed-value')?.textContent || 0;

                logs.push({
                    employee_id: selectedEmployeeId,
                    date,
                    time_in,
                    first_coffee_break_in,
                    first_coffee_break_out,
                    mid_day_break_in,
                    mid_day_break_out,
                    second_coffee_break_in,
                    second_coffee_break_out,
                    time_out,
                    total_late_minutes,
                    total_early_out_minutes,
                    total_deductable_time,
                    actual_payable_hours,
                    created_by: (() => { try { const u = JSON.parse(localStorage.getItem('goldenfield_user') || '{}'); return u.id || null; } catch(e) { return null; } })()
                });
            });

            if (logs.length === 0) {
                alert('Please fill in at least the Date for one row.');
                return;
            }

            if (skippedRows.length > 0) {
                const proceed = confirm(`Rows ${skippedRows.join(', ')} have no date and will be skipped. Continue saving ${logs.length} row(s)?`);
                if (!proceed) return;
            }

            try {
                const res = await fetch('/api/attendance-logs/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ logs })
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save attendance logs');
                }
                const result = await res.json();
                const savedIds = (result.data || []).map(row => row.attendance_id).filter(Boolean);
                alert(`Saved ${logs.length} row(s) successfully\nIDs: ${savedIds.join(', ')}`);
                await loadPendingAttendanceLogs();
                closeAttendanceLogModalFn();
            } catch (err) {
                console.error('Save error:', err);
                alert(err.message || 'Failed to save attendance logs');
            }
        });
    }

    let allPendingAttendanceLogs = [];

    async function loadPendingAttendanceLogs() {
        const tbody = document.getElementById('pending-attendance-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/attendance-logs/pending');
            if (!res.ok) throw new Error('Failed to load pending attendance logs');
            const logs = await res.json();
            allPendingAttendanceLogs = logs;
            renderPendingLogs(logs);
        } catch (err) {
            console.error('Pending logs error:', err);
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">Failed to load pending logs</td></tr>';
            }
        }
    }

    function filterPendingLogs() {
        const searchInput = document.getElementById('pending-attendance-search');
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        if (!query) {
            renderPendingLogs(allPendingAttendanceLogs);
            return;
        }
        const filtered = allPendingAttendanceLogs.filter(log => {
            const fullName = `${log.last_name || ''} ${log.first_name || ''}`.toLowerCase();
            const formattedDate = formatDate(log.date).toLowerCase();
            return fullName.includes(query) || formattedDate.includes(query);
        });
        renderPendingLogs(filtered);
    }

    const pendingSearchInput = document.getElementById('pending-attendance-search');
    if (pendingSearchInput) {
        pendingSearchInput.addEventListener('input', () => {
            filterPendingLogs();
        });
    }

    const approveFilteredBtn = document.getElementById('approve-filtered-btn');
    const rejectFilteredBtn = document.getElementById('reject-filtered-btn');

    const getVisiblePendingIds = () => {
        const tbody = document.getElementById('pending-attendance-tbody');
        if (!tbody) return [];
        const rows = tbody.querySelectorAll('tr');
        const ids = [];
        rows.forEach(row => {
            const firstCell = row.children[0];
            if (firstCell) {
                const id = firstCell.textContent.trim();
                if (id && id !== 'No pending attendance logs' && id !== 'Loading...' && id !== 'Failed to load pending logs') {
                    ids.push(id);
                }
            }
        });
        return ids;
    };

    const bulkApproveFiltered = async () => {
        const ids = getVisiblePendingIds();
        if (ids.length === 0) {
            alert('No pending attendance logs to approve');
            return;
        }
        const confirmed = confirm(`Approve ${ids.length} attendance log(s)?`);
        if (!confirmed) return;
        try {
            const res = await fetch('/api/attendance-logs/bulk-approve', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ attendance_ids: ids })
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to bulk approve');
            }
            const data = await res.json();
            let alertMsg = data.message || `Approved ${ids.length} logs`;
            if (data.skipped && data.skipped.length > 0) {
                alertMsg += `\n\nWARNING: ${data.skipped.length} record(s) were skipped:\n`;
                alertMsg += data.skipped.map(s => `- ${s.attendance_id}: ${s.reason}`).join('\n');
            }
            alert(alertMsg);
            await loadPendingAttendanceLogs();
            filterPendingLogs();
            await loadAttendanceHistory();
            filterAttendanceHistory();
        } catch (err) {
            console.error('Bulk approve error:', err);
            alert(err.message || 'Failed to bulk approve');
        }
    };

    const bulkRejectFiltered = async () => {
        const ids = getVisiblePendingIds();
        if (ids.length === 0) {
            alert('No pending attendance logs to reject');
            return;
        }
        const confirmed = confirm(`Reject ${ids.length} attendance log(s)?`);
        if (!confirmed) return;
        try {
            const res = await fetch('/api/attendance-logs/bulk-reject', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ attendance_ids: ids })
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to bulk reject');
            }
            const data = await res.json();
            let alertMsg = data.message || `Rejected ${ids.length} logs`;
            if (data.skipped && data.skipped.length > 0) {
                alertMsg += `\n\nWARNING: ${data.skipped.length} record(s) were skipped:\n`;
                alertMsg += data.skipped.map(s => `- ${s.attendance_id}: ${s.reason}`).join('\n');
            }
            alert(alertMsg);
            await loadPendingAttendanceLogs();
            filterPendingLogs();
            await loadAttendanceHistory();
            filterAttendanceHistory();
        } catch (err) {
            console.error('Bulk reject error:', err);
            alert(err.message || 'Failed to bulk reject');
        }
    };

    if (approveFilteredBtn) {
        approveFilteredBtn.addEventListener('click', bulkApproveFiltered);
    }

    if (rejectFilteredBtn) {
        rejectFilteredBtn.addEventListener('click', bulkRejectFiltered);
    }

    const historySearchInput = document.getElementById('history-attendance-search');
    if (historySearchInput) {
        historySearchInput.addEventListener('input', () => {
            filterAttendanceHistory();
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

    function renderPendingLogs(logs) {
        const tbody = document.getElementById('pending-attendance-tbody');
        if (!tbody) return;

        if (!logs || logs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 20px; color: #999;">No pending attendance logs</td></tr>';
            return;
        }

        tbody.innerHTML = logs.map(log => `
            <tr style="height: 32px;">
                <td style="padding: 2px; margin: 0;">${log.attendance_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.employee_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${formatDate(log.date)}</td>
                <td style="padding: 2px; margin: 0;">${log.last_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.first_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.actual_payable_hours != null ? Number(log.actual_payable_hours).toFixed(2) : ''}</td>
                <td style="padding: 2px; margin: 0;">${log.created_by || ''}</td>
                <td style="padding: 2px; margin: 0;"><span style="background: #FFF3CD; color: #856404; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
                <td style="padding: 2px; margin: 0;">
                    <button class="btn-primary approve-btn" data-attendance-id="${log.attendance_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; flex: 1; min-width: 70px; text-align: center;">Approve</button>
                    <button class="btn-reject reject-attendance-btn" data-attendance-id="${log.attendance_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; margin-left: 6px; background: #dc3545; color: white; border: none; border-radius: 4px; flex: 1; min-width: 70px; text-align: center;">Reject</button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const attendanceId = e.target.getAttribute('data-attendance-id');
                if (!attendanceId) return;

                try {
                    const res = await fetch(`/api/attendance-logs/${encodeURIComponent(attendanceId)}/approve`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to approve attendance log');
                    }

                    alert(`Attendance log ${attendanceId} approved successfully`);
                    await loadPendingAttendanceLogs();
                    filterPendingLogs();
                    await loadAttendanceHistory();
                    filterAttendanceHistory();
                } catch (err) {
                    console.error('Approve error:', err);
                    alert(err.message || 'Failed to approve attendance log');
                }
            });
        });

        tbody.querySelectorAll('.reject-attendance-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const attendanceId = e.target.getAttribute('data-attendance-id');
                if (!attendanceId) return;

                try {
                    const res = await fetch(`/api/attendance-logs/reject/${encodeURIComponent(attendanceId)}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to reject attendance log');
                    }

                    alert(`Attendance log ${attendanceId} rejected successfully`);
                    await loadPendingAttendanceLogs();
                    filterPendingLogs();
                    await loadAttendanceHistory();
                    filterAttendanceHistory();
                } catch (err) {
                    console.error('Reject error:', err);
                    alert(err.message || 'Failed to reject attendance log');
                }
            });
        });
    }

    let allAttendanceHistoryLogs = [];

    async function loadAttendanceHistory() {
        const tbody = document.getElementById('attendance-history-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/attendance-logs/all');
            if (!res.ok) throw new Error('Failed to load attendance history');
            const logs = await res.json();
            allAttendanceHistoryLogs = logs;

            if (!logs || logs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: #999;">No attendance history</td></tr>';
                return;
            }

            renderAttendanceHistory(logs);
        } catch (err) {
            console.error('Failed to load attendance history:', err);
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: #999;">Failed to load attendance history</td></tr>';
        }
    }

    function renderAttendanceHistory(logs) {
        const tbody = document.getElementById('attendance-history-tbody');
        if (!tbody) return;

        if (!logs || logs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: #999;">No matching records</td></tr>';
            return;
        }

        tbody.innerHTML = logs.map(log => `
            <tr style="height: 32px;">
                <td style="padding: 2px; margin: 0;">${log.attendance_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.employee_id || ''}</td>
                <td style="padding: 2px; margin: 0;">${formatDate(log.date)}</td>
                <td style="padding: 2px; margin: 0;">${log.last_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.first_name || ''}</td>
                <td style="padding: 2px; margin: 0;">${log.actual_payable_hours != null ? Number(log.actual_payable_hours).toFixed(2) : ''}</td>
                <td style="padding: 2px; margin: 0;">${log.created_by || ''}</td>
                <td style="padding: 2px; margin: 0;"><span style="background: ${log.status === 'Approved' ? '#d4edda' : '#FFF3CD'}; color: ${log.status === 'Approved' ? '#155724' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${log.status || 'Pending'}</span></td>
            </tr>
        `).join('');
    }

    function filterAttendanceHistory() {
        const searchInput = document.getElementById('history-attendance-search');
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        if (!query) {
            renderAttendanceHistory(allAttendanceHistoryLogs);
            applyAttendanceSort();
            return;
        }
        const filtered = allAttendanceHistoryLogs.filter(log => {
            const fullName = `${log.last_name || ''} ${log.first_name || ''}`.toLowerCase();
            const formattedDate = formatDate(log.date).toLowerCase();
            const status = (log.status || '').toLowerCase();
            return fullName.includes(query) || formattedDate.includes(query) || status.includes(query);
        });
        renderAttendanceHistory(filtered);
        applyAttendanceSort();
    }

    const attendanceSortState = { col: null, dir: 1 };
    const applyAttendanceSort = () => {
        document.querySelectorAll('th.sortable .sort-arrow').forEach(a => a.textContent = '⇅');
        if (!attendanceSortState.col) return;
        const tbody = document.getElementById('attendance-history-tbody');
        if (!tbody) return;
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const colMap = { attendance_id: 0, employee_id: 1, date: 2, actual_payable_hours: 5 };
        const colIndex = colMap[attendanceSortState.col];
        if (colIndex === undefined) return;
        rows.sort((a, b) => {
            const va = a.children[colIndex].textContent.trim();
            const vb = b.children[colIndex].textContent.trim();
            if (attendanceSortState.col === 'attendance_id') {
                return va.localeCompare(vb, undefined, { numeric: true }) * attendanceSortState.dir;
            }
            if (attendanceSortState.col === 'date') {
                const da = new Date(va);
                const db = new Date(vb);
                return (da - db) * attendanceSortState.dir;
            }
            if (attendanceSortState.col === 'actual_payable_hours') {
                const na = parseFloat(va) || 0;
                const nb = parseFloat(vb) || 0;
                return (na - nb) * attendanceSortState.dir;
            }
            return va.localeCompare(vb) * attendanceSortState.dir;
        });
        rows.forEach(r => tbody.appendChild(r));
        const arrow = document.querySelector(`th.sortable[data-sort="${attendanceSortState.col}"] .sort-arrow`);
        if (arrow) arrow.textContent = attendanceSortState.dir === 1 ? '▲' : '▼';
    };

    // Use event delegation for sorting (works with dynamically rendered tables)
    document.addEventListener('click', (e) => {
        const th = e.target.closest('th.sortable');
        if (!th) return;
        const tbody = document.getElementById('attendance-history-tbody');
        if (!tbody) return;
        const col = th.dataset.sort;
        if (attendanceSortState.col === col) attendanceSortState.dir *= -1;
        else { attendanceSortState.col = col; attendanceSortState.dir = 1; }
        applyAttendanceSort();
    });

    loadPendingAttendanceLogs();
    loadAttendanceHistory();

    let employeeShiftMap = {};
    let shiftPolicyMap = {};

    const toMinutes = (val) => {
        if (val === null || val === undefined || val === '') return null;
        
        if (val instanceof Date) {
            if (isNaN(val.getTime())) return null;
            return val.getHours() * 60 + val.getMinutes() + val.getSeconds() / 60;
        }
        
        const str = String(val).trim();
        
        if (str.includes('T')) {
            const datePart = new Date(str);
            if (!isNaN(datePart.getTime())) {
                return datePart.getHours() * 60 + datePart.getMinutes() + datePart.getSeconds() / 60;
            }
        }
        
        const num = Number(str);
        if (!isNaN(num) && num > 0 && num < 1) {
            return Math.round(num * 24 * 60);
        }
        
        const m = str.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
        if (m) {
            const h = parseInt(m[1], 10);
            const min = parseInt(m[2], 10);
            const sec = m[3] ? parseInt(m[3], 10) : 0;
            return h * 60 + min + sec / 60;
        }
        
        const m2 = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (m2) {
            let h = parseInt(m2[1], 10);
            const min = parseInt(m2[2], 10);
            const period = m2[3].toUpperCase();
            if (period === 'PM' && h < 12) h += 12;
            if (period === 'AM' && h === 12) h = 0;
            return h * 60 + min;
        }
        
        return null;
    };

    const getScheduledBreakMinutes = (shiftPolicy) => {
        if (!shiftPolicy) return 0;
        let total = 0;
        if (shiftPolicy.first_coffee_break_start && shiftPolicy.first_coffee_break_end) {
            const start = toMinutes(shiftPolicy.first_coffee_break_start);
            const end = toMinutes(shiftPolicy.first_coffee_break_end);
            if (start != null && end != null && end > start) total += end - start;
        }
        if (shiftPolicy.mid_break_start && shiftPolicy.mid_break_end) {
            const start = toMinutes(shiftPolicy.mid_break_start);
            const end = toMinutes(shiftPolicy.mid_break_end);
            if (start != null && end != null && end > start) total += end - start;
        }
        if (shiftPolicy.second_coffee_break_start && shiftPolicy.second_coffee_break_end) {
            const start = toMinutes(shiftPolicy.second_coffee_break_start);
            const end = toMinutes(shiftPolicy.second_coffee_break_end);
            if (start != null && end != null && end > start) total += end - start;
        }
        return total;
    };

    const computeAttendanceRow = (employeeId, timeIn, timeOut, firstCoffeeIn, firstCoffeeOut, midBreakIn, midBreakOut, secondCoffeeIn, secondCoffeeOut) => {
        const timeInMin = toMinutes(timeIn);
        const timeOutMin = toMinutes(timeOut);

        const shiftPolicyName = employeeShiftMap[String(employeeId || '').trim()];
        const shiftPolicy = shiftPolicyName ? shiftPolicyMap[shiftPolicyName] : null;
        const scheduledStart = shiftPolicy ? toMinutes(shiftPolicy.start) : 8 * 60;
        const scheduledEnd = shiftPolicy ? toMinutes(shiftPolicy.end) : 17 * 60;
        const scheduledBreakMinutes = getScheduledBreakMinutes(shiftPolicy);
        const scheduledWorkMinutes = scheduledEnd - scheduledStart - scheduledBreakMinutes;

        let actualWorkMinutes = 0;
        if (timeInMin != null && timeOutMin != null && timeOutMin > timeInMin) {
            let totalActualBreakMinutes = 0;
            if (firstCoffeeIn && firstCoffeeOut) {
                const start = toMinutes(firstCoffeeIn);
                const end = toMinutes(firstCoffeeOut);
                if (start != null && end != null && end > start) totalActualBreakMinutes += end - start;
            }
            if (midBreakIn && midBreakOut) {
                const start = toMinutes(midBreakIn);
                const end = toMinutes(midBreakOut);
                if (start != null && end != null && end > start) totalActualBreakMinutes += end - start;
            }
            if (secondCoffeeIn && secondCoffeeOut) {
                const start = toMinutes(secondCoffeeIn);
                const end = toMinutes(secondCoffeeOut);
                if (start != null && end != null && end > start) totalActualBreakMinutes += end - start;
            }
            actualWorkMinutes = timeOutMin - timeInMin - totalActualBreakMinutes;
        }
        actualWorkMinutes = Math.max(0, actualWorkMinutes);

        const isPartialDay = actualWorkMinutes < scheduledWorkMinutes;

        const totalLateMinutes = 0;
        const totalEarlyOutMinutes = 0;
        const totalDeductableTime = 0;

        let actualPayableHours;
        if (isPartialDay) {
            actualPayableHours = +Math.max(0, actualWorkMinutes / 60).toFixed(2);
        } else {
            const lateMinutes = timeInMin != null && timeInMin > scheduledStart ? +(timeInMin - scheduledStart).toFixed(2) : 0;
            const earlyOutMinutes = timeOutMin != null && timeOutMin < scheduledEnd ? +(scheduledEnd - timeOutMin).toFixed(2) : 0;
            const deductable = +(lateMinutes + earlyOutMinutes).toFixed(2);
            actualPayableHours = +Math.max(0, scheduledWorkMinutes / 60 - deductable / 60).toFixed(2);
            return { totalLateMinutes: lateMinutes, totalEarlyOutMinutes: earlyOutMinutes, totalDeductableTime: deductable, actualPayableHours };
        }

        actualPayableHours = Math.min(actualPayableHours, scheduledWorkMinutes / 60);

        return { totalLateMinutes, totalEarlyOutMinutes, totalDeductableTime, actualPayableHours };
    };

    const fetchShiftData = async () => {
        try {
            const [employeesRes, policiesRes] = await Promise.all([
                fetch('/api/employee-profiles/active-with-compensation'),
                fetch('/api/shift-policies')
            ]);
            
            if (employeesRes.ok) {
                const employees = await employeesRes.json();
                if (Array.isArray(employees)) {
                    employeeShiftMap = {};
                    employees.forEach(emp => {
                        if (emp.employee_id && emp.shift_policy) {
                            employeeShiftMap[emp.employee_id] = emp.shift_policy;
                        }
                    });
                }
            }
            
            if (policiesRes.ok) {
                const policies = await policiesRes.json();
                if (Array.isArray(policies)) {
                    shiftPolicyMap = {};
                    policies.forEach(policy => {
                        if (policy.shift_name) {
                            shiftPolicyMap[policy.shift_name] = {
                                start: policy.shift_time_start,
                                end: policy.shift_time_end
                            };
                        }
                    });
                }
            }
        } catch (err) {
            console.error('Failed to fetch shift data:', err);
        }
    };

    const batchUploadAttendanceBtn = document.getElementById('batch-upload-attendance-btn');
    const batchUploadAttendanceModal = document.getElementById('batch-upload-attendance-modal');
    const closeBatchUploadAttendanceModal = document.getElementById('close-batch-upload-attendance-modal');
    const cancelBatchUploadAttendanceBtn = document.getElementById('cancel-batch-upload-attendance-btn');
    const saveBatchUploadAttendanceBtn = document.getElementById('save-batch-upload-attendance-btn');
    const downloadAttendanceTemplateBtn = document.getElementById('download-attendance-template-btn');
    const downloadAttendanceTemplateAdminBtn = document.getElementById('download-attendance-template-admin-btn');
    const batchAttendanceDropZone = document.getElementById('batch-attendance-drop-zone');
    const batchAttendanceFileInput = document.getElementById('batch-attendance-file-input');
    const batchAttendanceFileName = document.getElementById('batch-attendance-file-name');

    const openBatchUploadAttendanceModal = async () => {
        await fetchShiftData();
        if (batchUploadAttendanceModal) batchUploadAttendanceModal.style.display = 'flex';
    };

    const closeBatchUploadAttendanceModalFn = () => {
        if (batchUploadAttendanceModal) batchUploadAttendanceModal.style.display = 'none';
        if (batchAttendanceFileName) batchAttendanceFileName.textContent = '';
        if (batchAttendanceFileInput) batchAttendanceFileInput.value = '';
    };

    if (batchUploadAttendanceBtn) {
        batchUploadAttendanceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openBatchUploadAttendanceModal();
        });
    }

    if (closeBatchUploadAttendanceModal) {
        closeBatchUploadAttendanceModal.addEventListener('click', closeBatchUploadAttendanceModalFn);
    }

    if (cancelBatchUploadAttendanceBtn) {
        cancelBatchUploadAttendanceBtn.addEventListener('click', closeBatchUploadAttendanceModalFn);
    }

    if (batchAttendanceDropZone) {
        batchAttendanceDropZone.addEventListener('click', () => {
            batchAttendanceFileInput?.click();
        });

        batchAttendanceDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            batchAttendanceDropZone.style.borderColor = '#2563eb';
            batchAttendanceDropZone.style.background = '#eff6ff';
        });

        batchAttendanceDropZone.addEventListener('dragleave', () => {
            batchAttendanceDropZone.style.borderColor = '#cbd5e1';
            batchAttendanceDropZone.style.background = '#f8fafc';
        });

        batchAttendanceDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            batchAttendanceDropZone.style.borderColor = '#cbd5e1';
            batchAttendanceDropZone.style.background = '#f8fafc';
            const files = e.dataTransfer?.files;
            if (files && files.length > 0) {
                batchAttendanceFileInput.files = files;
                if (batchAttendanceFileName) batchAttendanceFileName.textContent = files[0].name;
                renderBatchAttendancePreview(files[0]);
            }
        });
    }

    if (batchAttendanceFileInput) {
        batchAttendanceFileInput.addEventListener('change', () => {
            if (batchAttendanceFileInput.files && batchAttendanceFileInput.files.length > 0) {
                if (batchAttendanceFileName) batchAttendanceFileName.textContent = batchAttendanceFileInput.files[0].name;
                renderBatchAttendancePreview(batchAttendanceFileInput.files[0]);
            }
        });
    }

     const renderBatchAttendancePreview = (file) => {
        const previewContainer = document.getElementById('batch-attendance-preview');
        const previewTable = document.getElementById('batch-attendance-preview-table');
        if (!previewContainer || !previewTable || !file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, raw: false, defval: '' });

                if (!jsonData.length) {
                    previewTable.innerHTML = '<div style="padding: 20px; color: #999;">No data found in file</div>';
                    previewContainer.style.display = 'block';
                    return;
                }

                const headers = jsonData[0];
                const rows = jsonData.slice(1);
                const empIdx = headers.findIndex(h => String(h).toLowerCase().includes('employee'));
                const timeInIdx = headers.findIndex(h => String(h).toLowerCase().includes('time in'));
                const timeOutIdx = headers.findIndex(h => String(h).toLowerCase().includes('time out'));
                const firstCoffeeInIdx = headers.findIndex(h => String(h).toLowerCase().includes('1st coffee break in'));
                const firstCoffeeOutIdx = headers.findIndex(h => String(h).toLowerCase().includes('1st coffee break out'));
                const midBreakInIdx = headers.findIndex(h => String(h).toLowerCase().includes('mid break in'));
                const midBreakOutIdx = headers.findIndex(h => String(h).toLowerCase().includes('mid break out'));
                const secondCoffeeInIdx = headers.findIndex(h => String(h).toLowerCase().includes('2nd coffee break in'));
                const secondCoffeeOutIdx = headers.findIndex(h => String(h).toLowerCase().includes('2nd coffee break out'));

                const computeRow = (row) => {
                    const timeIn = timeInIdx >= 0 ? row[timeInIdx] : null;
                    const timeOut = timeOutIdx >= 0 ? row[timeOutIdx] : null;
                    const employeeId = empIdx >= 0 ? row[empIdx] : null;
                    const firstCoffeeIn = firstCoffeeInIdx >= 0 ? row[firstCoffeeInIdx] : null;
                    const firstCoffeeOut = firstCoffeeOutIdx >= 0 ? row[firstCoffeeOutIdx] : null;
                    const midBreakIn = midBreakInIdx >= 0 ? row[midBreakInIdx] : null;
                    const midBreakOut = midBreakOutIdx >= 0 ? row[midBreakOutIdx] : null;
                    const secondCoffeeIn = secondCoffeeInIdx >= 0 ? row[secondCoffeeInIdx] : null;
                    const secondCoffeeOut = secondCoffeeOutIdx >= 0 ? row[secondCoffeeOutIdx] : null;
                    return computeAttendanceRow(employeeId, timeIn, timeOut, firstCoffeeIn, firstCoffeeOut, midBreakIn, midBreakOut, secondCoffeeIn, secondCoffeeOut);
                };

                let html = '<table style="width: 100%; border-collapse: collapse; font-size: 12px;">';
                html += '<thead><tr>';
                headers.forEach(h => {
                    html += `<th style="border: 1px solid #ddd; padding: 6px; background: #f4f4f4; font-weight: 600; text-align: left; white-space: nowrap;">${h || ''}</th>`;
                });
                html += '<th style="border: 1px solid #ddd; padding: 6px; background: #f4f4f4; font-weight: 600; text-align: right; white-space: nowrap;">Total Late Minutes</th>';
                html += '<th style="border: 1px solid #ddd; padding: 6px; background: #f4f4f4; font-weight: 600; text-align: right; white-space: nowrap;">Total Early Out Minutes</th>';
                html += '<th style="border: 1px solid #ddd; padding: 6px; background: #f4f4f4; font-weight: 600; text-align: right; white-space: nowrap;">Total Deductable Time (Minutes)</th>';
                html += '<th style="border: 1px solid #ddd; padding: 6px; background: #f4f4f4; font-weight: 600; text-align: right; white-space: nowrap;">Actual Payable Hours</th>';
                html += '</tr></thead><tbody>';

                rows.forEach(row => {
                    html += '<tr>';
                    headers.forEach((_, i) => {
                        let val = row[i] != null ? row[i] : '';
                        if (val && typeof val === 'string') {
                            val = val.trim();
                        }
                        html += `<td style="border: 1px solid #ddd; padding: 6px; text-align: left;">${val}</td>`;
                    });

                    const computed = computeRow(row);
                    html += `<td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${computed.totalLateMinutes}</td>`;
                    html += `<td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${computed.totalEarlyOutMinutes}</td>`;
                    html += `<td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${computed.totalDeductableTime}</td>`;
                    html += `<td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${computed.actualPayableHours}</td>`;
                    html += '</tr>';
                });

                html += '</tbody></table>';

                previewTable.innerHTML = html;
                previewContainer.style.display = 'block';
            } catch (err) {
                console.error('Failed to parse file:', err);
                previewTable.innerHTML = '<div style="padding: 20px; color: #dc2626;">Failed to parse file. Please ensure it is a valid Excel/CSV file.</div>';
                previewContainer.style.display = 'block';
            }
        };

        reader.readAsArrayBuffer(file);
    };

    if (downloadAttendanceTemplateBtn) {
        downloadAttendanceTemplateBtn.addEventListener('click', async () => {
            try {
                const employeesRes = await fetch('/api/employee-profiles/active-with-compensation');
                const employees = employeesRes.ok ? await employeesRes.json() : [];

                const attendanceHeaders = ['Last Name', 'First Name', 'Employee ID', 'Date', 'Time In', '1st Coffee Break IN', '1st Coffee Break OUT', 'Mid Break IN', 'Mid Break OUT', '2nd Coffee Break IN', '2nd Coffee Break OUT', 'Time Out'];
                const instructionRow = ['Auto-filled from Employees tab (do not edit)', 'Auto-filled from Employees tab (do not edit)', 'Enter Employee ID here', '', '', '', '', '', '', '', '', ''];
                const attendanceData = [attendanceHeaders, instructionRow];

                const employeeHeaders = ['Employee ID', 'Last Name', 'First Name', 'Department', 'Role'];
                const employeeData = [employeeHeaders];

                if (Array.isArray(employees)) {
                    employees.forEach(emp => {
                        employeeData.push([
                            emp.employee_id || '',
                            emp.last_name || '',
                            emp.first_name || '',
                            emp.department || '',
                            emp.role || ''
                        ]);
                    });
                }

                const workbook = XLSX.utils.book_new();
                const attendanceSheet = XLSX.utils.aoa_to_sheet(attendanceData);
                const employeeSheet = XLSX.utils.aoa_to_sheet(employeeData);

                attendanceSheet['!merges'] = [
                    { s: { r: 1, c: 0 }, e: { r: 1, c: 11 } }
                ];

                for (let row = 2; row < 102; row++) {
                    const rowNum = row + 1;
                    const lastNameAddr = XLSX.utils.encode_cell({ r: row, c: 0 });
                    attendanceSheet[lastNameAddr] = { f: `XLOOKUP(C${rowNum},Employees!A:A,Employees!B:B,"")` };

                    const firstNameAddr = XLSX.utils.encode_cell({ r: row, c: 1 });
                    attendanceSheet[firstNameAddr] = { f: `XLOOKUP(C${rowNum},Employees!A:A,Employees!C:C,"")` };
                }

                attendanceSheet['!cols'] = [
                    { wch: 18 },
                    { wch: 18 },
                    { wch: 16 },
                    { wch: 12, z: 'MM/DD/YYYY' },
                    { wch: 10 },
                    { wch: 18 },
                    { wch: 20 },
                    { wch: 14 },
                    { wch: 16 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 10 }
                ];

                XLSX.utils.book_append_sheet(workbook, attendanceSheet, 'Attendance');
                XLSX.utils.book_append_sheet(workbook, employeeSheet, 'Employees');

                XLSX.writeFile(workbook, 'attendance_template.xlsx');
            } catch (err) {
                console.error('Failed to download template:', err);
                alert('Failed to download template');
            }
        });
    }

    if (downloadAttendanceTemplateAdminBtn) {
        downloadAttendanceTemplateAdminBtn.addEventListener('click', async () => {
            try {
                const employeesRes = await fetch('/api/employee-profiles/active-with-compensation');
                const employees = employeesRes.ok ? await employeesRes.json() : [];

                const attendanceHeaders = ['Last Name', 'First Name', 'Employee ID', 'Date', 'Time In', '1st Coffee Break IN', '1st Coffee Break OUT', 'Mid Break IN', 'Mid Break OUT', '2nd Coffee Break IN', '2nd Coffee Break OUT', 'Time Out', 'Status'];
                const instructionRow = ['Auto-filled from Employees tab (do not edit)', 'Auto-filled from Employees tab (do not edit)', 'Enter Employee ID here', '', '', '', '', '', '', '', '', '', ''];
                const attendanceData = [attendanceHeaders, instructionRow];

                const employeeHeaders = ['Employee ID', 'Last Name', 'First Name', 'Department', 'Role'];
                const employeeData = [employeeHeaders];

                if (Array.isArray(employees)) {
                    employees.forEach(emp => {
                        employeeData.push([
                            emp.employee_id || '',
                            emp.last_name || '',
                            emp.first_name || '',
                            emp.department || '',
                            emp.role || ''
                        ]);
                    });
                }

                const workbook = XLSX.utils.book_new();
                const attendanceSheet = XLSX.utils.aoa_to_sheet(attendanceData);
                const employeeSheet = XLSX.utils.aoa_to_sheet(employeeData);

                attendanceSheet['!merges'] = [
                    { s: { r: 1, c: 0 }, e: { r: 1, c: 12 } }
                ];

                for (let row = 2; row < 102; row++) {
                    const rowNum = row + 1;
                    const lastNameAddr = XLSX.utils.encode_cell({ r: row, c: 0 });
                    attendanceSheet[lastNameAddr] = { f: `XLOOKUP(C${rowNum},Employees!A:A,Employees!B:B,"")` };

                    const firstNameAddr = XLSX.utils.encode_cell({ r: row, c: 1 });
                    attendanceSheet[firstNameAddr] = { f: `XLOOKUP(C${rowNum},Employees!A:A,Employees!C:C,"")` };
                }

                attendanceSheet['!cols'] = [
                    { wch: 18 },
                    { wch: 18 },
                    { wch: 16 },
                    { wch: 12, z: 'MM/DD/YYYY' },
                    { wch: 10 },
                    { wch: 20 },
                    { wch: 22 },
                    { wch: 14 },
                    { wch: 16 },
                    { wch: 22 },
                    { wch: 22 },
                    { wch: 10 },
                    { wch: 12 }
                ];

                XLSX.utils.book_append_sheet(workbook, attendanceSheet, 'Attendance');
                XLSX.utils.book_append_sheet(workbook, employeeSheet, 'Employees');

                XLSX.writeFile(workbook, 'attendance_template_admin.xlsx');
            } catch (err) {
                console.error('Failed to download admin template:', err);
                alert('Failed to download admin template');
            }
        });
    }

    if (saveBatchUploadAttendanceBtn) {
        saveBatchUploadAttendanceBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const file = batchAttendanceFileInput?.files?.[0];
            if (!file) {
                alert('Please select a file first');
                return;
            }

            try {
                const data = new Uint8Array(await file.arrayBuffer());
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, raw: false, defval: '' });

                if (!jsonData.length) {
                    alert('No data found in file');
                    return;
                }

                const headers = jsonData[0];
                const rows = jsonData.slice(1);
                const empIdx = headers.findIndex(h => String(h).toLowerCase().includes('employee'));
                const dateIdx = headers.findIndex(h => String(h).toLowerCase().includes('date'));
                const timeInIdx = headers.findIndex(h => String(h).toLowerCase().includes('time in'));
                const timeOutIdx = headers.findIndex(h => String(h).toLowerCase().includes('time out'));
                const firstCoffeeInIdx = headers.findIndex(h => String(h).toLowerCase().includes('1st coffee break in'));
                const firstCoffeeOutIdx = headers.findIndex(h => String(h).toLowerCase().includes('1st coffee break out'));
                const midBreakInIdx = headers.findIndex(h => String(h).toLowerCase().includes('mid break in'));
                const midBreakOutIdx = headers.findIndex(h => String(h).toLowerCase().includes('mid break out'));
                const secondCoffeeInIdx = headers.findIndex(h => String(h).toLowerCase().includes('2nd coffee break in'));
                const secondCoffeeOutIdx = headers.findIndex(h => String(h).toLowerCase().includes('2nd coffee break out'));
                const statusIdx = headers.findIndex(h => String(h).toLowerCase().includes('status'));

                if (empIdx < 0 || dateIdx < 0 || timeInIdx < 0 || timeOutIdx < 0) {
                    alert('File must contain Employee ID, Date, Time In, and Time Out columns');
                    return;
                }

                const logs = [];
                const skippedRows = [];
                const missingShiftPolicyRows = [];
                const missingShiftPolicy = new Set();

                rows.forEach((row, index) => {
                    const employee_id = String(row[empIdx] || '').trim();
                    const date = String(row[dateIdx] || '').trim();
                    const time_in = String(row[timeInIdx] || '').trim();
                    const time_out = String(row[timeOutIdx] || '').trim();
                    const first_coffee_break_in = firstCoffeeInIdx >= 0 ? String(row[firstCoffeeInIdx] || '').trim() : '';
                    const first_coffee_break_out = firstCoffeeOutIdx >= 0 ? String(row[firstCoffeeOutIdx] || '').trim() : '';
                    const mid_day_break_in = midBreakInIdx >= 0 ? String(row[midBreakInIdx] || '').trim() : '';
                    const mid_day_break_out = midBreakOutIdx >= 0 ? String(row[midBreakOutIdx] || '').trim() : '';
                    const second_coffee_break_in = secondCoffeeInIdx >= 0 ? String(row[secondCoffeeInIdx] || '').trim() : '';
                    const second_coffee_break_out = secondCoffeeOutIdx >= 0 ? String(row[secondCoffeeOutIdx] || '').trim() : '';
                    const status = statusIdx >= 0 ? String(row[statusIdx] || '').trim() : 'Pending';

                    const requiredFields = [employee_id, date, time_in, time_out];
                    const allFilled = requiredFields.every(field => field !== '');

                    if (!allFilled) {
                        skippedRows.push(index + 2);
                        return;
                    }

                    if (!employeeShiftMap[employee_id]) {
                        missingShiftPolicy.add(employee_id);
                        missingShiftPolicyRows.push(index + 2);
                        return;
                    }

                    const computed = computeAttendanceRow(employee_id, time_in, time_out, first_coffee_break_in, first_coffee_break_out, mid_day_break_in, mid_day_break_out, second_coffee_break_in, second_coffee_break_out);

                    logs.push({
                        employee_id,
                        date,
                        time_in,
                        first_coffee_break_in,
                        first_coffee_break_out,
                        mid_day_break_in,
                        mid_day_break_out,
                        second_coffee_break_in,
                        second_coffee_break_out,
                        time_out,
                        status,
                        total_late_minutes: computed.totalLateMinutes,
                        total_early_out_minutes: computed.totalEarlyOutMinutes,
                        total_deductable_time: computed.totalDeductableTime,
                        actual_payable_hours: computed.actualPayableHours,
                        created_by: (() => { try { const u = JSON.parse(localStorage.getItem('goldenfield_user') || '{}'); return u.id || null; } catch(e) { return null; } })()
                    });
                });

                const okCount = logs.length;
                const missingCount = skippedRows.length;
                const errorCount = missingShiftPolicyRows.length;

                const summaryModal = document.getElementById('bulk-attendance-summary-modal');
                const okCountEl = document.getElementById('bulk-attendance-ok-count');
                const missingCountEl = document.getElementById('bulk-attendance-missing-count');
                const missingDetails = document.getElementById('bulk-attendance-missing-details');
                const missingList = document.getElementById('bulk-attendance-missing-list');
                const errorDetails = document.getElementById('bulk-attendance-error-details');
                const errorList = document.getElementById('bulk-attendance-error-list');
                const proceedBtn = document.getElementById('proceed-bulk-attendance-summary-btn');

                if (okCountEl) okCountEl.textContent = okCount;
                if (missingCountEl) missingCountEl.textContent = missingCount;

                if (missingDetails && missingList) {
                    if (skippedRows.length > 0) {
                        missingDetails.style.display = 'block';
                        missingList.textContent = `Rows ${skippedRows.join(', ')} have incomplete data and will be skipped.`;
                    } else {
                        missingDetails.style.display = 'none';
                    }
                }

                if (errorDetails && errorList) {
                    if (missingShiftPolicyRows.length > 0) {
                        errorDetails.style.display = 'block';
                        errorList.textContent = `Rows ${missingShiftPolicyRows.join(', ')} have employees without shift policy:\n${[...missingShiftPolicy].join('\n')}`;
                    } else {
                        errorDetails.style.display = 'none';
                    }
                }

                if (proceedBtn) {
                    proceedBtn.disabled = errorCount > 0;
                    proceedBtn.style.opacity = errorCount > 0 ? '0.5' : '1';
                }

                if (summaryModal) summaryModal.style.display = 'flex';

                const proceedSave = async () => {
                    if (summaryModal) summaryModal.style.display = 'none';

                    if (logs.length === 0) {
                        alert('No valid rows to save');
                        return;
                    }

                    saveBatchUploadAttendanceBtn.disabled = true;
                    saveBatchUploadAttendanceBtn.innerText = 'Saving...';

                    const res = await fetch('/api/attendance-logs/save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ logs })
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to save attendance logs');
                    }

                    const result = await res.json();
                    const savedIds = (result.data || []).map(row => row.attendance_id).filter(Boolean);
                    alert(`Saved ${logs.length} row(s) successfully\nIDs: ${savedIds.join(', ')}`);
                    await loadPendingAttendanceLogs();
                    await loadAttendanceHistory();
                    closeBatchUploadAttendanceModalFn();
                };

                const cancelSummary = () => {
                    if (summaryModal) summaryModal.style.display = 'none';
                };

                const proceedBtnEl = document.getElementById('proceed-bulk-attendance-summary-btn');
                const cancelBtnEl = document.getElementById('cancel-bulk-attendance-summary-btn');
                const closeBtnEl = document.getElementById('close-bulk-attendance-summary-modal');

                if (proceedBtnEl) {
                    proceedBtnEl.onclick = proceedSave;
                }
                if (cancelBtnEl) {
                    cancelBtnEl.onclick = cancelSummary;
                }
                if (closeBtnEl) {
                    closeBtnEl.onclick = cancelSummary;
                }

            } catch (err) {
                console.error('Failed to save batch attendance:', err);
                alert('Failed to save batch upload: ' + err.message);
            } finally {
                if (saveBatchUploadAttendanceBtn) {
                    saveBatchUploadAttendanceBtn.disabled = false;
                    saveBatchUploadAttendanceBtn.innerText = 'Save';
                }
            }
        });
    }
};
