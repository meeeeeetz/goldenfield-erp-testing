if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

    if (!document.getElementById('batch-overtime-spin-style')) {
        const style = document.createElement('style');
        style.id = 'batch-overtime-spin-style';
        style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
    }

    ModuleComponents['hr-salary-overtime'] = (container) => {
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1f2e;">Overtime logs</h2>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button id="add-overtime-log-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    <span class="btn-label">Add Overtime Logs</span>
                </button>
                <button id="batch-upload-overtime-btn" class="btn-icon-circle" style="margin-left: 8px;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span class="btn-label">Bulk Upload Overtime</span>
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
                <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 6px; background: #f0fdf4; padding: 6px 12px; border-radius: 6px; border: 1px solid #22c55e;">
                        <label style="font-size: 13px; font-weight: 600; color: #15803d;">Total Hours:</label>
                        <input type="text" id="pending-overtime-total-hours" readonly style="width: 80px; padding: 4px 8px; border: 1px solid #22c55e; border-radius: 4px; font-size: 13px; font-weight: 700; color: #15803d; background: #fff; text-align: center; box-sizing: border-box;">
                    </div>
                    <input type="text" id="pending-overtime-search" placeholder="Search name or date..." style="padding: 6px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 13px; width: 220px; box-sizing: border-box;">
                    <button id="approve-filtered-overtime-btn" class="btn-primary" type="button" style="padding: 6px 12px; font-size: 12px; cursor: pointer; background: #28a745; border-color: #28a745; color: white;">Approve Filtered</button>
                    <button id="reject-filtered-overtime-btn" class="btn-danger" type="button" style="padding: 6px 12px; font-size: 12px; cursor: pointer;">Reject Filtered</button>
                </div>
            </div>
            <div style="padding: 0 15px 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
<thead>
                                <tr>
                                    <th class="sortable" data-sort="overtime_id" style="width: 140px; padding: 2px; font-size: 15px; cursor: pointer;">Overtime ID <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="employee_id" style="width: 100px; padding: 2px; font-size: 15px; cursor: pointer;">Employee ID <span class="sort-arrow">&#8645;</span></th>
                                    <th class="sortable" data-sort="date" style="width: 120px; padding: 2px; font-size: 15px; cursor: pointer;">Date <span class="sort-arrow">&#8645;</span></th>
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

        <div id="batch-upload-overtime-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 1200px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Batch Upload Overtime</h3>
                    <button class="modal-close-btn" id="close-batch-upload-overtime-modal">&times;</button>
                </div>
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px; position: relative;">
                    <div id="batch-overtime-loading-overlay" style="display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.85); z-index: 100; align-items: center; justify-content: center; flex-direction: column; gap: 12px;">
                        <div style="width: 48px; height: 48px; border: 4px solid #e2e8f0; border-top-color: #2563eb; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                        <div style="font-size: 15px; font-weight: 600; color: #1a1f2e;">Saving overtime logs...</div>
                        <div id="batch-overtime-loading-count" style="font-size: 13px; color: #64748b;"></div>
                    </div>
                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div id="batch-overtime-drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 40px 20px; text-align: center; background: #f8fafc; transition: border-color 0.2s, background 0.2s; cursor: pointer; flex: 0 0 320px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px;">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <p style="margin: 12px 0 4px; font-size: 16px; font-weight: 600; color: #1a1f2e;">Drag and drop Excel/CSV file here</p>
                            <p style="margin: 0; font-size: 13px; color: #64748b;">or click to browse</p>
                            <input type="file" id="batch-overtime-file-input" accept=".xlsx,.xls,.csv" style="display: none;">
                            <p id="batch-overtime-file-name" style="margin-top: 12px; font-size: 14px; color: #2563eb; font-weight: 600;"></p>
                        </div>
                        <div id="batch-overtime-preview" style="flex: 1; overflow: auto; max-height: 420px; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; display: none;">
                            <div style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Preview</div>
                            <div id="batch-overtime-preview-table" style="overflow-x: auto;"></div>
                        </div>
                    </div>
                    <div id="batch-overtime-validation" style="display: none; gap: 12px;">
                        <div style="display: flex; gap: 16px;">
                            <div style="flex: 1; padding: 12px; border-radius: 8px; background: #d4edda;">
                                <div style="font-size: 24px; font-weight: 700; color: #155724;" id="batch-overtime-ok-count">0</div>
                                <div style="font-size: 13px; color: #155724;">Rows OK</div>
                            </div>
                            <div style="flex: 1; padding: 12px; border-radius: 8px; background: #fff3cd;">
                                <div style="font-size: 24px; font-weight: 700; color: #856404;" id="batch-overtime-missing-count">0</div>
                                <div style="font-size: 13px; color: #856404;">Rows Missing</div>
                            </div>
                            <div style="flex: 1; padding: 12px; border-radius: 8px; background: #f8d7da;">
                                <div style="font-size: 24px; font-weight: 700; color: #721c24;" id="batch-overtime-error-count">0</div>
                                <div style="font-size: 13px; color: #721c24;">Errors</div>
                            </div>
                        </div>
                        <div id="batch-overtime-missing-details" style="display: none; padding: 12px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px;">
                            <strong>Missing Rows (incomplete data):</strong>
                            <div id="batch-overtime-missing-list" style="margin-top: 8px; font-size: 13px; color: #856404;"></div>
                        </div>
                        <div id="batch-overtime-error-details" style="display: none; padding: 12px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 6px;">
                            <strong>Errors:</strong>
                            <div id="batch-overtime-error-list" style="margin-top: 8px; font-size: 13px; color: #721c24;"></div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button id="download-overtime-template-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Download Template</button>
                        <button id="download-overtime-template-admin-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer; background: #28a745; border-color: #28a745; color: white;">Download Template admin</button>
                        <button id="cancel-batch-upload-overtime-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Cancel</button>
                        <button id="save-batch-upload-overtime-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="bulk-overtime-summary-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 600px; width: 95%; display: flex; flex-direction: column; max-height: 80vh;">
                <div class="modal-header-row" style="flex-shrink: 0;">
                    <h3>Bulk Upload Summary</h3>
                    <button class="modal-close-btn" id="close-bulk-overtime-summary-modal">&times;</button>
                </div>
                <div style="flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; gap: 16px; justify-content: space-around; text-align: center;">
                        <div style="flex: 1; padding: 12px; border-radius: 8px; background: #d4edda;">
                            <div style="font-size: 24px; font-weight: 700; color: #155724;" id="bulk-overtime-ok-count">0</div>
                            <div style="font-size: 13px; color: #155724;">Rows OK</div>
                        </div>
                        <div style="flex: 1; padding: 12px; border-radius: 8px; background: #fff3cd;">
                            <div style="font-size: 24px; font-weight: 700; color: #856404;" id="bulk-overtime-missing-count">0</div>
                            <div style="font-size: 13px; color: #856404;">Rows Missing</div>
                        </div>
                        <div style="flex: 1; padding: 12px; border-radius: 8px; background: #f8d7da;">
                            <div style="font-size: 24px; font-weight: 700; color: #721c24;" id="bulk-overtime-error-count">0</div>
                            <div style="font-size: 13px; color: #721c24;">Errors</div>
                        </div>
                    </div>
                    <div id="bulk-overtime-missing-details" style="display: none; padding: 12px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px;">
                        <strong>Missing Rows (incomplete data):</strong>
                        <div id="bulk-overtime-missing-list" style="margin-top: 8px; font-size: 13px; color: #856404;"></div>
                    </div>
                    <div id="bulk-overtime-error-details" style="display: none; padding: 12px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 6px;">
                        <strong>Errors:</strong>
                        <div id="bulk-overtime-error-list" style="margin-top: 8px; font-size: 13px; color: #721c24;"></div>
                    </div>
                </div>
                <div style="flex-shrink: 0; padding: 16px 20px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px; justify-content: flex-end;">
                    <button id="cancel-bulk-overtime-summary-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Cancel</button>
                    <button id="proceed-bulk-overtime-summary-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Proceed</button>
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
                const res = await fetch('/api/overtime-logs/save', {
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

    const batchUploadOvertimeBtn = document.getElementById('batch-upload-overtime-btn');
    const batchUploadOvertimeModal = document.getElementById('batch-upload-overtime-modal');
    const closeBatchUploadOvertimeModal = document.getElementById('close-batch-upload-overtime-modal');
    const cancelBatchUploadOvertimeBtn = document.getElementById('cancel-batch-upload-overtime-btn');
    const saveBatchUploadOvertimeBtn = document.getElementById('save-batch-upload-overtime-btn');
    const downloadOvertimeTemplateBtn = document.getElementById('download-overtime-template-btn');
    const downloadOvertimeTemplateAdminBtn = document.getElementById('download-overtime-template-admin-btn');
    const batchOvertimeDropZone = document.getElementById('batch-overtime-drop-zone');
    const batchOvertimeFileInput = document.getElementById('batch-overtime-file-input');
    const batchOvertimeFileName = document.getElementById('batch-overtime-file-name');

    const openBatchUploadOvertimeModal = async () => {
        if (batchUploadOvertimeModal) batchUploadOvertimeModal.style.display = 'flex';
        const previewContainer = document.getElementById('batch-overtime-preview');
        const previewTable = document.getElementById('batch-overtime-preview-table');
        if (previewContainer) previewContainer.style.display = 'none';
        if (previewTable) previewTable.innerHTML = '';
        if (batchOvertimeFileName) batchOvertimeFileName.textContent = '';
        if (batchOvertimeFileInput) batchOvertimeFileInput.value = '';
        if (saveBatchUploadOvertimeBtn) {
            saveBatchUploadOvertimeBtn.disabled = false;
            saveBatchUploadOvertimeBtn.innerText = 'Save';
        }
    };

    const closeBatchUploadOvertimeModalFn = () => {
        if (batchUploadOvertimeModal) batchUploadOvertimeModal.style.display = 'none';
        if (batchOvertimeFileName) batchOvertimeFileName.textContent = '';
        if (batchOvertimeFileInput) batchOvertimeFileInput.value = '';
    };

    if (batchUploadOvertimeBtn) {
        batchUploadOvertimeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openBatchUploadOvertimeModal();
        });
    }

    if (closeBatchUploadOvertimeModal) {
        closeBatchUploadOvertimeModal.addEventListener('click', closeBatchUploadOvertimeModalFn);
    }

    if (cancelBatchUploadOvertimeBtn) {
        cancelBatchUploadOvertimeBtn.addEventListener('click', closeBatchUploadOvertimeModalFn);
    }

    if (batchOvertimeDropZone) {
        batchOvertimeDropZone.addEventListener('click', () => {
            batchOvertimeFileInput?.click();
        });

        batchOvertimeDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            batchOvertimeDropZone.style.borderColor = '#2563eb';
            batchOvertimeDropZone.style.background = '#eff6ff';
        });

        batchOvertimeDropZone.addEventListener('dragleave', () => {
            batchOvertimeDropZone.style.borderColor = '#cbd5e1';
            batchOvertimeDropZone.style.background = '#f8fafc';
        });

        batchOvertimeDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            batchOvertimeDropZone.style.borderColor = '#cbd5e1';
            batchOvertimeDropZone.style.background = '#f8fafc';
            const files = e.dataTransfer?.files;
            if (files && files.length > 0) {
                batchOvertimeFileInput.files = files;
                if (batchOvertimeFileName) batchOvertimeFileName.textContent = files[0].name;
                renderBatchOvertimePreview(files[0]);
            }
        });
    }

    if (batchOvertimeFileInput) {
        batchOvertimeFileInput.addEventListener('change', () => {
            if (batchOvertimeFileInput.files && batchOvertimeFileInput.files.length > 0) {
                if (batchOvertimeFileName) batchOvertimeFileName.textContent = batchOvertimeFileInput.files[0].name;
                renderBatchOvertimePreview(batchOvertimeFileInput.files[0]);
            }
        });
    }

    const renderBatchOvertimePreview = (file) => {
        const previewContainer = document.getElementById('batch-overtime-preview');
        const previewTable = document.getElementById('batch-overtime-preview-table');
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
                const dateIdx = headers.findIndex(h => String(h).toLowerCase().includes('date'));
                const timeInIdx = headers.findIndex(h => String(h).toLowerCase().includes('time in'));
                const timeOutIdx = headers.findIndex(h => String(h).toLowerCase().includes('time out'));
                const remarksIdx = headers.findIndex(h => String(h).toLowerCase().includes('remark'));

                const computeRow = (row) => {
                    const timeIn = timeInIdx >= 0 ? row[timeInIdx] : null;
                    const timeOut = timeOutIdx >= 0 ? row[timeOutIdx] : null;
                    const employeeId = empIdx >= 0 ? row[empIdx] : null;
                    return computeOvertimeRow(employeeId, timeIn, timeOut);
                };

                let html = '<table style="width: 100%; border-collapse: collapse; font-size: 12px;">';
                html += '<thead><tr>';
                headers.forEach(h => {
                    html += `<th style="border: 1px solid #ddd; padding: 6px; background: #f4f4f4; font-weight: 600; text-align: left; white-space: nowrap;">${h || ''}</th>`;
                });
                html += '<th style="border: 1px solid #ddd; padding: 6px; background: #f4f4f4; font-weight: 600; text-align: right; white-space: nowrap;">Total Hours</th>';
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
                    html += `<td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${computed.totalHours}</td>`;
                    html += '</tr>';
                });

                html += '</tbody></table>';

                previewTable.innerHTML = html;
                previewContainer.style.display = 'block';

                // Auto-validate rows and show counts
                const okCount = rows.filter(row => {
                    const emp = String(row[empIdx] || '').trim();
                    const d = String(row[dateIdx] || '').trim();
                    const ti = timeInIdx >= 0 ? String(row[timeInIdx] || '').trim() : '';
                    const to = timeOutIdx >= 0 ? String(row[timeOutIdx] || '').trim() : '';
                    return emp && d && ti && to;
                }).length;
                const missingCount = rows.filter(row => {
                    const emp = String(row[empIdx] || '').trim();
                    const d = String(row[dateIdx] || '').trim();
                    if (!emp && !d) return false;
                    if (!d) return false;
                    return !emp;
                }).length;
                const errorCount = rows.filter(row => {
                    const emp = String(row[empIdx] || '').trim();
                    const d = String(row[dateIdx] || '').trim();
                    const ti = timeInIdx >= 0 ? String(row[timeInIdx] || '').trim() : '';
                    const to = timeOutIdx >= 0 ? String(row[timeOutIdx] || '').trim() : '';
                    if (!emp && !d) return false;
                    if (!d) return false;
                    if (!emp) return false;
                    return !ti || !to;
                }).length;

                const okEl = document.getElementById('batch-overtime-ok-count');
                const missEl = document.getElementById('batch-overtime-missing-count');
                const errEl = document.getElementById('batch-overtime-error-count');
                const validationBox = document.getElementById('batch-overtime-validation');
                if (okEl) okEl.textContent = okCount;
                if (missEl) missEl.textContent = missingCount;
                if (errEl) errEl.textContent = errorCount;
                if (validationBox) validationBox.style.display = 'flex';
            } catch (err) {
                console.error('Failed to parse file:', err);
                previewTable.innerHTML = '<div style="padding: 20px; color: #dc2626;">Failed to parse file. Please ensure it is a valid Excel/CSV file.</div>';
                previewContainer.style.display = 'block';
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const computeOvertimeRow = (employeeId, timeIn, timeOut) => {
        const timeInMin = toMinutes(timeIn);
        const timeOutMin = toMinutes(timeOut);
        let totalHours = 0;
        if (timeInMin != null && timeOutMin != null && timeOutMin > timeInMin) {
            totalHours = +((timeOutMin - timeInMin) / 60).toFixed(2);
        }
        return { totalHours };
    };

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

    if (downloadOvertimeTemplateBtn) {
        downloadOvertimeTemplateBtn.addEventListener('click', async () => {
            try {
                const employeesRes = await fetch('/api/employee-profiles/active-with-compensation');
                const employees = employeesRes.ok ? await employeesRes.json() : [];

                const overtimeHeaders = ['Last Name', 'First Name', 'Employee ID', 'Date', 'Time In', 'Time Out', 'Remarks'];
                const instructionRow = ['Auto-filled from Employees tab (do not edit)', 'Auto-filled from Employees tab (do not edit)', 'Enter Employee ID here', '', '', '', ''];
                const overtimeData = [overtimeHeaders, instructionRow];

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
                const overtimeSheet = XLSX.utils.aoa_to_sheet(overtimeData);
                const employeeSheet = XLSX.utils.aoa_to_sheet(employeeData);

                overtimeSheet['!merges'] = [
                    { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } }
                ];

                for (let row = 2; row < 102; row++) {
                    const rowNum = row + 1;
                    const lastNameAddr = XLSX.utils.encode_cell({ r: row, c: 0 });
                    overtimeSheet[lastNameAddr] = { f: `XLOOKUP(C${rowNum},Employees!A:A,Employees!B:B,"")` };

                    const firstNameAddr = XLSX.utils.encode_cell({ r: row, c: 1 });
                    overtimeSheet[firstNameAddr] = { f: `XLOOKUP(C${rowNum},Employees!A:A,Employees!C:C,"")` };
                }

                overtimeSheet['!cols'] = [
                    { wch: 18 },
                    { wch: 18 },
                    { wch: 16 },
                    { wch: 12, z: 'MM/DD/YYYY' },
                    { wch: 10 },
                    { wch: 10 },
                    { wch: 20 }
                ];

                XLSX.utils.book_append_sheet(workbook, overtimeSheet, 'Overtime');
                XLSX.utils.book_append_sheet(workbook, employeeSheet, 'Employees');

                XLSX.writeFile(workbook, 'overtime_template.xlsx');
            } catch (err) {
                console.error('Failed to download template:', err);
                alert('Failed to download template');
            }
        });
    }

    if (downloadOvertimeTemplateAdminBtn) {
        downloadOvertimeTemplateAdminBtn.addEventListener('click', async () => {
            try {
                const employeesRes = await fetch('/api/employee-profiles/active-with-compensation');
                const employees = employeesRes.ok ? await employeesRes.json() : [];

                const overtimeHeaders = ['Last Name', 'First Name', 'Employee ID', 'Date', 'Time In', 'Time Out', 'Remarks', 'Status'];
                const instructionRow = ['Auto-filled from Employees tab (do not edit)', 'Auto-filled from Employees tab (do not edit)', 'Enter Employee ID here', '', '', '', '', ''];
                const overtimeData = [overtimeHeaders, instructionRow];

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
                const overtimeSheet = XLSX.utils.aoa_to_sheet(overtimeData);
                const employeeSheet = XLSX.utils.aoa_to_sheet(employeeData);

                overtimeSheet['!merges'] = [
                    { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } }
                ];

                for (let row = 2; row < 102; row++) {
                    const rowNum = row + 1;
                    const lastNameAddr = XLSX.utils.encode_cell({ r: row, c: 0 });
                    overtimeSheet[lastNameAddr] = { f: `XLOOKUP(C${rowNum},Employees!A:A,Employees!B:B,"")` };

                    const firstNameAddr = XLSX.utils.encode_cell({ r: row, c: 1 });
                    overtimeSheet[firstNameAddr] = { f: `XLOOKUP(C${rowNum},Employees!A:A,Employees!C:C,"")` };
                }

                overtimeSheet['!cols'] = [
                    { wch: 18 },
                    { wch: 18 },
                    { wch: 16 },
                    { wch: 12, z: 'MM/DD/YYYY' },
                    { wch: 10 },
                    { wch: 10 },
                    { wch: 20 },
                    { wch: 12 }
                ];

                XLSX.utils.book_append_sheet(workbook, overtimeSheet, 'Overtime');
                XLSX.utils.book_append_sheet(workbook, employeeSheet, 'Employees');

                XLSX.writeFile(workbook, 'overtime_template_admin.xlsx');
            } catch (err) {
                console.error('Failed to download admin template:', err);
                alert('Failed to download admin template');
            }
        });
    }

    if (saveBatchUploadOvertimeBtn) {
        saveBatchUploadOvertimeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const file = batchOvertimeFileInput?.files?.[0];
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
                const remarksIdx = headers.findIndex(h => String(h).toLowerCase().includes('remark'));
                const statusIdx = headers.findIndex(h => String(h).toLowerCase().includes('status'));

                if (empIdx < 0 || dateIdx < 0 || timeInIdx < 0 || timeOutIdx < 0) {
                    alert('File must contain Employee ID, Date, Time In, and Time Out columns');
                    return;
                }

                const logs = [];
                const skippedRows = [];
                const missingTimeRows = [];

                rows.forEach((row, index) => {
                    const employee_id = String(row[empIdx] || '').trim();
                    const date = String(row[dateIdx] || '').trim();
                    const time_in = String(row[timeInIdx] || '').trim();
                    const time_out = String(row[timeOutIdx] || '').trim();
                    const remarks = remarksIdx >= 0 ? String(row[remarksIdx] || '').trim() : '';
                    const status = statusIdx >= 0 ? String(row[statusIdx] || '').trim() : 'Pending';

                    // Skip completely empty rows (no employee ID and no date)
                    if (!employee_id && !date) {
                        return;
                    }

                    // Skip instruction/header rows (date is always empty for these)
                    if (!date) {
                        return;
                    }

                    // Missing employee ID = incomplete
                    if (!employee_id) {
                        skippedRows.push(index + 2);
                        return;
                    }

                    // Missing time in or time out = error
                    if (!time_in || !time_out) {
                        missingTimeRows.push(index + 2);
                        return;
                    }

                    const computed = computeOvertimeRow(employee_id, time_in, time_out);

                    logs.push({
                        employee_id,
                        date,
                        time_in,
                        time_out,
                        remarks,
                        status,
                        total_hours: computed.totalHours,
                        created_by: (() => { try { const u = JSON.parse(localStorage.getItem('goldenfield_user') || '{}'); return `${u.first_name || ''} ${u.last_name || ''}`.trim() || null; } catch(e) { return null; } })()
                    });
                });

                const okCount = logs.length;
                const missingCount = skippedRows.length;
                const errorCount = missingTimeRows.length;

                const summaryModal = document.getElementById('bulk-overtime-summary-modal');
                const okCountEl = document.getElementById('bulk-overtime-ok-count');
                const missingCountEl = document.getElementById('bulk-overtime-missing-count');
                const errorCountEl = document.getElementById('bulk-overtime-error-count');
                const missingDetails = document.getElementById('bulk-overtime-missing-details');
                const missingList = document.getElementById('bulk-overtime-missing-list');
                const errorDetails = document.getElementById('bulk-overtime-error-details');
                const errorList = document.getElementById('bulk-overtime-error-list');
                const proceedBtn = document.getElementById('proceed-bulk-overtime-summary-btn');

                if (okCountEl) okCountEl.textContent = okCount;
                if (missingCountEl) missingCountEl.textContent = missingCount;
                if (errorCountEl) errorCountEl.textContent = errorCount;

                if (missingDetails && missingList) {
                    if (skippedRows.length > 0) {
                        missingDetails.style.display = 'block';
                        missingList.textContent = `Rows ${skippedRows.join(', ')} have incomplete data and will be skipped.`;
                    } else {
                        missingDetails.style.display = 'none';
                    }
                }

                if (errorDetails && errorList) {
                    if (missingTimeRows.length > 0) {
                        errorDetails.style.display = 'block';
                        errorList.textContent = `Rows ${missingTimeRows.join(', ')} are missing Time In or Time Out.`;
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

                    const loadingOverlay = document.getElementById('batch-overtime-loading-overlay');
                    const loadingCount = document.getElementById('batch-overtime-loading-count');
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'flex';
                        loadingOverlay.style.position = 'fixed';
                        loadingOverlay.style.top = '0';
                        loadingOverlay.style.left = '0';
                        loadingOverlay.style.right = '0';
                        loadingOverlay.style.bottom = '0';
                        loadingOverlay.style.zIndex = '9999';
                        loadingOverlay.style.borderRadius = '0';
                    }
                    if (loadingCount) loadingCount.textContent = 'Saving 0 of ' + logs.length + ' rows...';

                    saveBatchUploadOvertimeBtn.disabled = true;
                    saveBatchUploadOvertimeBtn.innerText = 'Saving...';

                    let savedCount = 0;
                    for (let i = 0; i < logs.length; i++) {
                        if (loadingCount) loadingCount.textContent = 'Saving ' + (i + 1) + ' of ' + logs.length + ' rows...';
                        try {
                            const res = await fetch('/api/overtime-logs/save', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ logs: [logs[i]] })
                            });
                            if (res.ok) savedCount++;
                        } catch (err) {
                            console.error('Save error for row', i, err);
                        }
                    }

                    if (loadingOverlay) loadingOverlay.style.display = 'none';

                    alert(`Saved ${savedCount} of ${logs.length} row(s) successfully`);
                    await loadPendingOvertimeLogs();
                    await loadOvertimeHistory();
                    closeBatchUploadOvertimeModalFn();
                };

                const cancelSummary = () => {
                    if (summaryModal) summaryModal.style.display = 'none';
                };

                const proceedBtnEl = document.getElementById('proceed-bulk-overtime-summary-btn');
                const cancelBtnEl = document.getElementById('cancel-bulk-overtime-summary-btn');
                const closeBtnEl = document.getElementById('close-bulk-overtime-summary-modal');

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
                console.error('Failed to save batch overtime:', err);
                alert('Failed to save batch upload: ' + err.message);
            } finally {
                if (saveBatchUploadOvertimeBtn) {
                    saveBatchUploadOvertimeBtn.disabled = false;
                    saveBatchUploadOvertimeBtn.innerText = 'Save';
                }
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
            const res = await fetch('/api/overtime-logs/pending');
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
                    const res = await fetch(`/api/overtime-logs/${encodeURIComponent(overtimeId)}/approve`, {
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
                    const res = await fetch(`/api/overtime-logs/reject/${encodeURIComponent(overtimeId)}`, {
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
        updatePendingOvertimeTotalHours(logs);
    }

    let allPendingOvertimeLogs = [];

    function filterPendingOvertimeLogs() {
        const searchInput = document.getElementById('pending-overtime-search');
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        if (!query) {
            renderPendingOvertimeLogs(allPendingOvertimeLogs);
            applyOvertimeSort();
            return;
        }
        const filtered = allPendingOvertimeLogs.filter(log => {
            const fullName = `${log.last_name || ''} ${log.first_name || ''}`.toLowerCase();
            const formattedDate = formatDate(log.date).toLowerCase();
            const empId = String(log.employee_id || '').toLowerCase();
            return fullName.includes(query) || formattedDate.includes(query) || empId.includes(query);
        });
renderPendingOvertimeLogs(filtered);
            applyOvertimeSort();
            updatePendingOvertimeTotalHours(filtered);
    }

    function updatePendingOvertimeTotalHours(logs) {
        const totalHoursInput = document.getElementById('pending-overtime-total-hours');
        if (!totalHoursInput) return;
        if (!logs || logs.length === 0) {
            totalHoursInput.value = '0.00';
            return;
        }
        const totalHours = logs.reduce((sum, log) => sum + (parseFloat(log.total_hours) || 0), 0);
        totalHoursInput.value = totalHours.toFixed(2);
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
            const res = await fetch('/api/overtime-logs/bulk-approve', {
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
            const res = await fetch('/api/overtime-logs/bulk-reject', {
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
            const res = await fetch('/api/overtime-logs/all');
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
        const historyTbody = document.getElementById('overtime-history-tbody');
        const pendingTbody = document.getElementById('pending-overtime-tbody');
        document.querySelectorAll('th.sortable .sort-arrow').forEach(a => a.textContent = '↕');
        if (!overtimeSortState.col) return;

        const sortRows = (tbodyEl) => {
            if (!tbodyEl) return;
            const rows = Array.from(tbodyEl.querySelectorAll('tr'));
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
            rows.forEach(r => tbodyEl.appendChild(r));
        };

        sortRows(historyTbody);
        sortRows(pendingTbody);

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
