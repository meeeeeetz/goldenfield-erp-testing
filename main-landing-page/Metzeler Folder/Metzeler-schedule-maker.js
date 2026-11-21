if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['metz-schedule-maker'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%;">
                <h2>Schedule Maker ( Turks )</h2>
            </div>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
                <button id="add-turks-employee-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    <span class="btn-label">Add TURKS Employee</span>
                </button>
                <button id="add-turks-branch-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2C8 2 5 5 5 9c0 3 3 5 7 11 4-6 7-8 7-11 0-4-3-7-7-7z"></path>
                        <circle cx="12" cy="9" r="2.5"></circle>
                        <line x1="12" y1="16" x2="12" y2="19"></line>
                    </svg>
                    <span class="btn-label">Add Turks Branch</span>
                </button>
                <button id="branch-staff-day-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                        <path d="M12 14v6"></path>
                        <path d="M9 17h6"></path>
                    </svg>
                    <span class="btn-label">Branch Staff/Day</span>
                </button>
                <button id="create-schedule-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                        <line x1="12" y1="14" x2="12" y2="18"></line>
                        <line x1="9" y1="17" x2="15" y2="17"></line>
                    </svg>
                    <span class="btn-label">Create Schedule</span>
                </button>
            </div>
            <div style="display: flex; gap: 16px; margin-top: 16px;">
                <div class="card" style="width: 25%; min-width: 300px;">
                    <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Turks Employee list</h3>
                    <div class="table-wrap">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody id="turks-employee-table-body">
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                                <tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="turks-employee-pagination" style="display: flex; justify-content: center; gap: 6px; margin-top: 16px; flex-wrap: wrap;">
                        <button class="page-btn" id="turks-employee-first-btn" disabled>&laquo; 1st</button>
                        <button class="page-btn" id="turks-employee-prev-btn" disabled>&laquo; Prev</button>
                        <button class="page-btn active" id="turks-employee-page-1">1</button>
                        <button class="page-btn" id="turks-employee-next-btn" disabled>Next &raquo;</button>
                        <button class="page-btn" id="turks-employee-last-btn" disabled>Last &raquo;</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- TURKS Employee Modal -->
        <div id="turks-employee-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 700px; width: 95%;">
                <div class="modal-header-row">
                    <h3>TURKS Employee Management</h3>
                    <button class="modal-close-btn" id="close-turks-employee-modal">&times;</button>
                </div>
                <div class="modal-tabs">
                    <button class="modal-tab active" id="tab-create-turks-employee" onclick="switchTurksEmployeeTab('create')">Create Employee</button>
                    <button class="modal-tab" id="tab-manage-turks-employee" onclick="switchTurksEmployeeTab('manage')">Manage Employee</button>
                </div>
                
                <!-- Create Employee Tab -->
                <div id="panel-create-turks-employee" class="modal-tab-panel" style="display: block;">
                    <div class="modal-field">
                        <label>Employee CODE</label>
                        <input type="text" id="create-turks-emp-code" readonly placeholder="TuEmpID-1" />
                    </div>
                    <div class="modal-field">
                        <label>Employee Name</label>
                        <input type="text" id="create-turks-emp-name" placeholder="Enter employee name" />
                    </div>
                    <div class="modal-field">
                        <label>Employee Department</label>
                        <select id="create-turks-emp-department" class="modal-select">
                            <option value="">Select Department</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Status</label>
                        <input type="text" id="create-turks-emp-status" readonly value="Active" style="background: #f5f5f5;" />
                    </div>
                    <div class="modal-tab-actions">
                        <button id="save-create-turks-employee-btn" class="btn-primary">Save</button>
                    </div>
                </div>
                
                <!-- Manage Employee Tab -->
                <div id="panel-manage-turks-employee" class="modal-tab-panel" style="display: none;">
                    <div class="modal-field">
                        <label>Search Employee</label>
                        <div style="position: relative;">
                            <input type="text" id="manage-turks-emp-search" placeholder="Search by employee name or code..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                            <div id="manage-turks-emp-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                        </div>
                    </div>
                    <div class="modal-field">
                        <label>Employee CODE</label>
                        <input type="text" id="manage-turks-emp-code" readonly />
                    </div>
                    <div class="modal-field">
                        <label>Employee Name</label>
                        <input type="text" id="manage-turks-emp-name" placeholder="Enter employee name" />
                    </div>
                    <div class="modal-field">
                        <label>Employee Department</label>
                        <select id="manage-turks-emp-department" class="modal-select">
                            <option value="">Select Department</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Status</label>
                        <select id="manage-turks-emp-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="modal-tab-actions">
                        <button id="save-manage-turks-employee-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- TURKS Branch Modal -->
        <div id="turks-branch-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 700px; width: 95%;">
                <div class="modal-header-row">
                    <h3>TURKS Branch Management</h3>
                    <button class="modal-close-btn" id="close-turks-branch-modal">&times;</button>
                </div>
                <div class="modal-tabs">
                    <button class="modal-tab active" id="tab-create-turks-branch" onclick="switchTurksBranchTab('create')">Create Branch</button>
                    <button class="modal-tab" id="tab-manage-turks-branch" onclick="switchTurksBranchTab('manage')">Manage Branch</button>
                </div>
                
                <!-- Create Branch Tab -->
                <div id="panel-create-turks-branch" class="modal-tab-panel" style="display: block;">
                    <div class="modal-field">
                        <label>Branch CODE</label>
                        <input type="text" id="create-turks-branch-code" readonly placeholder="TuBrID-1" />
                    </div>
                    <div class="modal-field">
                        <label>Branch Name</label>
                        <input type="text" id="create-turks-branch-name" placeholder="Enter branch name" />
                    </div>
                    <div class="modal-field">
                        <label>Branch Location</label>
                        <input type="text" id="create-turks-branch-location" placeholder="Enter branch location" />
                    </div>
                    <div class="modal-field">
                        <label>Status</label>
                        <input type="text" id="create-turks-branch-status" readonly value="Active" style="background: #f5f5f5;" />
                    </div>
                    <div class="modal-tab-actions">
                        <button id="save-create-turks-branch-btn" class="btn-primary">Save</button>
                    </div>
                </div>
                
                <!-- Manage Branch Tab -->
                <div id="panel-manage-turks-branch" class="modal-tab-panel" style="display: none;">
                    <div class="modal-field">
                        <label>Search Branch</label>
                        <div style="position: relative;">
                            <input type="text" id="manage-turks-branch-search" placeholder="Search by branch name or code..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                            <div id="manage-turks-branch-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                        </div>
                    </div>
                    <div class="modal-field">
                        <label>Branch CODE</label>
                        <input type="text" id="manage-turks-branch-code" readonly />
                    </div>
                    <div class="modal-field">
                        <label>Branch Name</label>
                        <input type="text" id="manage-turks-branch-name" placeholder="Enter branch name" />
                    </div>
                    <div class="modal-field">
                        <label>Branch Location</label>
                        <input type="text" id="manage-turks-branch-location" placeholder="Enter branch location" />
                    </div>
                    <div class="modal-field">
                        <label>Status</label>
                        <select id="manage-turks-branch-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="modal-tab-actions">
                        <button id="save-manage-turks-branch-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Schedule Creator Modal -->
        <div id="schedule-creator-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 500px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Schedule Creator</h3>
                    <button class="modal-close-btn" id="close-schedule-creator-modal">&times;</button>
                </div>
                <div style="padding: 20px;">
                    <div class="modal-field">
                        <label>Date Start</label>
                        <input type="date" id="schedule-date-start" />
                    </div>
                    <div class="modal-field">
                        <label>Date End</label>
                        <input type="date" id="schedule-date-end" />
                    </div>
                    <div class="modal-tab-actions" style="justify-content: flex-end; margin-top: 24px;">
                        <button id="schedule-creator-cancel-btn" class="btn-secondary" style="margin-right: 8px;">Cancel</button>
                        <button id="schedule-creator-ok-btn" class="btn-primary">OK</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Schedule Detail Modal -->
        <div id="schedule-detail-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 1200px; width: 95%; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header-row">
                    <h3>Schedule Details</h3>
                    <button class="modal-close-btn" id="close-schedule-detail-modal">&times;</button>
                </div>
                <div style="padding: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <div>
                            <span id="schedule-detail-date-range" style="font-weight: 600; color: #1a1f2e;"></span>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button id="schedule-detail-save-btn" class="btn-primary">Save Schedule</button>
                        </div>
                    </div>
                    <div class="table-wrap" style="overflow-x: auto; overflow-y: visible;">
                        <table class="data-table" style="min-width: 100%; width: max-content;">
                            <thead>
                                <tr>
                                    <th style="width: 70px; text-align: center; padding: 8px 4px; font-size: 13px; font-weight: 600;">Day</th>
                                    <th style="width: 100px; text-align: center; padding: 8px 4px; font-size: 13px; font-weight: 600;">Day of the Week</th>
                                </tr>
                            </thead>
                            <tbody id="schedule-detail-table-body">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Branch Staff/Day Modal -->
        <div id="branch-staff-day-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 600px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Branch Staff / Day</h3>
                    <button class="modal-close-btn" id="close-branch-staff-day-modal">&times;</button>
                </div>
                <div style="padding: 20px;">
                    <div class="modal-field">
                        <label>Branch</label>
                        <select id="branch-staff-day-branch" class="modal-select">
                            <option value="">Select Branch</option>
                        </select>
                    </div>
                    <div id="branch-staff-day-table-container" style="display: none; margin-top: 16px;">
                        <div class="table-wrap">
                            <table class="data-table" style="min-width: 500px;">
                                <thead>
                                    <tr>
                                        <th style="width: 150px;">Day of the Week</th>
                                        <th>Number of Pax</th>
                                    </tr>
                                </thead>
                                <tbody id="branch-staff-day-table-body">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-tab-actions" style="justify-content: flex-end; margin-top: 24px;">
                        <button id="branch-staff-day-cancel-btn" class="btn-secondary" style="margin-right: 8px;">Cancel</button>
                        <button id="branch-staff-day-save-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'metz-schedule-maker';
    const render = ModuleComponents[currentTab] || ModuleComponents['metz-schedule-maker'];
    render(contentArea);

    // Load employees on init
    loadTurksEmployees();

    // Load active branches for employee department dropdowns
    async function loadActiveBranches() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const res = await fetch('/api/metzeler/turks/branches', {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            if (!res.ok) throw new Error('Failed to load branches');
            const branches = await res.json();
            const activeBranches = branches.filter(b => b.status === 'Active');
            
            const createDept = document.getElementById('create-turks-emp-department');
            const manageDept = document.getElementById('manage-turks-emp-department');
            
            const options = activeBranches.map(b => 
                `<option value="${b.branch_code}">${b.branch_name}</option>`
            ).join('');
            
            if (createDept) createDept.innerHTML = '<option value="">Select Department</option>' + options;
            if (manageDept) manageDept.innerHTML = '<option value="">Select Department</option>' + options;
        } catch (err) {
            console.error('Failed to load branches:', err);
        }
    }

    // Load active employees into the table
    async function loadTurksEmployees() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            
            // Fetch both employees and branches in parallel
            const [employeesRes, branchesRes] = await Promise.all([
                fetch('/api/metzeler/turks/employees', { headers: token ? { 'Authorization': `Bearer ${token}` } : {} }),
                fetch('/api/metzeler/turks/branches', { headers: token ? { 'Authorization': `Bearer ${token}` } : {} })
            ]);
            
            if (!employeesRes.ok) throw new Error('Failed to load employees');
            if (!branchesRes.ok) throw new Error('Failed to load branches');
            
            const employees = await employeesRes.json();
            const branches = await branchesRes.json();
            
            // Create branch code -> branch name mapping
            const branchMap = {};
            branches.forEach(b => { branchMap[b.branch_code] = b.branch_name; });
            
            const activeEmployees = employees.filter(e => e.status === 'Active');
            
            const tbody = document.getElementById('turks-employee-table-body');
            if (!tbody) return;
            
            if (activeEmployees.length === 0) {
                tbody.innerHTML = Array(10).fill('<tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>').join('');
                return;
            }
            
            tbody.innerHTML = activeEmployees.map(e => `
                <tr>
                    <td>${e.employee_name}</td>
                    <td>${branchMap[e.employee_department] || e.employee_department}</td>
                </tr>
            `).join('');
            
            // Fill remaining rows with empty rows to keep 10 rows visible
            const remaining = 10 - activeEmployees.length;
            if (remaining > 0) {
                tbody.innerHTML += Array(remaining).fill('<tr class="empty-row"><td colspan="2" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>').join('');
            }
        } catch (err) {
            console.error('Failed to load employees:', err);
        }
    }

    // Open TURKS Employee Modal
    const addEmpBtn = document.getElementById('add-turks-employee-btn');
    const empModal = document.getElementById('turks-employee-modal');
    const closeEmpBtn = document.getElementById('close-turks-employee-modal');

    if (addEmpBtn && empModal) {
        addEmpBtn.onclick = async () => {
            empModal.classList.remove('hidden');
            loadActiveBranches();
            // Load next employee code
            const codeInput = document.getElementById('create-turks-emp-code');
            if (codeInput && (!codeInput.value || codeInput.value === '')) {
                try {
                    const token = localStorage.getItem('goldenfield_auth_token');
                    const res = await fetch('/api/metzeler/turks/employees/next-code', {
                        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                    });
                    if (res.ok) {
                        const data = await res.json();
                        codeInput.value = data.employee_code;
                    }
                } catch (e) {
                    console.error('Failed to fetch next employee code:', e);
                }
            }
        };
    }
    if (closeEmpBtn && empModal) {
        closeEmpBtn.onclick = () => {
            empModal.classList.add('hidden');
        };
    }
    if (empModal) {
        empModal.onclick = (e) => {
            if (e.target === empModal) empModal.classList.add('hidden');
        };
    }

    // Open TURKS Branch Modal
    const addBranchBtn = document.getElementById('add-turks-branch-btn');
    const branchModal = document.getElementById('turks-branch-modal');
    const closeBranchBtn = document.getElementById('close-turks-branch-modal');

    if (addBranchBtn && branchModal) {
        addBranchBtn.onclick = async () => {
            branchModal.classList.remove('hidden');
            // Fetch next branch code when opening create tab
            const codeInput = document.getElementById('create-turks-branch-code');
            if (codeInput && codeInput.value === '' || codeInput.placeholder) {
                try {
                    const token = localStorage.getItem('goldenfield_auth_token');
                    const res = await fetch('/api/metzeler/turks/branches/next-code', {
                        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                    });
                    if (res.ok) {
                        const data = await res.json();
                        codeInput.value = data.branch_code;
                    }
                } catch (e) {
                    console.error('Failed to fetch next branch code:', e);
                }
            }
        };
    }
    if (closeBranchBtn && branchModal) {
        closeBranchBtn.onclick = () => {
            branchModal.classList.add('hidden');
        };
    }
    if (branchModal) {
        branchModal.onclick = (e) => {
            if (e.target === branchModal) branchModal.classList.add('hidden');
        };
    }

    // Tab switching for Employee
    window.switchTurksEmployeeTab = (tab) => {
        const createPanel = document.getElementById('panel-create-turks-employee');
        const managePanel = document.getElementById('panel-manage-turks-employee');
        const createTab = document.getElementById('tab-create-turks-employee');
        const manageTab = document.getElementById('tab-manage-turks-employee');

        if (tab === 'create') {
            createPanel.style.display = 'block';
            managePanel.style.display = 'none';
            createTab.classList.add('active');
            manageTab.classList.remove('active');
        } else {
            createPanel.style.display = 'none';
            managePanel.style.display = 'block';
            createTab.classList.remove('active');
            manageTab.classList.add('active');
        }
    };

    // Tab switching for Branch
    window.switchTurksBranchTab = (tab) => {
        const createPanel = document.getElementById('panel-create-turks-branch');
        const managePanel = document.getElementById('panel-manage-turks-branch');
        const createTab = document.getElementById('tab-create-turks-branch');
        const manageTab = document.getElementById('tab-manage-turks-branch');

        if (tab === 'create') {
            createPanel.style.display = 'block';
            managePanel.style.display = 'none';
            createTab.classList.add('active');
            manageTab.classList.remove('active');
        } else {
            createPanel.style.display = 'none';
            managePanel.style.display = 'block';
            createTab.classList.remove('active');
            manageTab.classList.add('active');
        }
    };

    // Save Create Branch
    const saveCreateBranchBtn = document.getElementById('save-create-turks-branch-btn');
    if (saveCreateBranchBtn) {
        saveCreateBranchBtn.onclick = async () => {
            const branch_code = document.getElementById('create-turks-branch-code').value;
            const branch_name = document.getElementById('create-turks-branch-name').value;
            const branch_location = document.getElementById('create-turks-branch-location').value;

            if (!branch_code || !branch_name) {
                alert('Branch Code and Branch Name are required');
                return;
            }

            try {
                const token = localStorage.getItem('goldenfield_auth_token');
                const res = await fetch('/api/metzeler/turks/branches', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({ branch_code, branch_name, branch_location: branch_location || null })
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Failed to create branch');
                }

                const branch = await res.json();
                alert('Branch created successfully!');
                branchModal.classList.add('hidden');
                // Reset form
                document.getElementById('create-turks-branch-code').value = '';
                document.getElementById('create-turks-branch-name').value = '';
                document.getElementById('create-turks-branch-location').value = '';
                // Refresh table would go here
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };
    }

    // Save Manage Branch
    const saveManageBranchBtn = document.getElementById('save-manage-turks-branch-btn');
    if (saveManageBranchBtn) {
        saveManageBranchBtn.onclick = async () => {
            const branch_id = document.getElementById('manage-turks-branch-code').dataset.id;
            const branch_name = document.getElementById('manage-turks-branch-name').value;
            const branch_location = document.getElementById('manage-turks-branch-location').value;
            const status = document.getElementById('manage-turks-branch-status').value;

            if (!branch_id) {
                alert('No branch selected');
                return;
            }

            try {
                const token = localStorage.getItem('goldenfield_auth_token');
                const res = await fetch(`/api/metzeler/turks/branches/${branch_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({ branch_name, branch_location: branch_location || null, status })
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Failed to update branch');
                }

                const branch = await res.json();
                alert('Branch updated successfully!');
                // Refresh search results would go here
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };
    }

    // Search Branch in Manage Tab
    const manageSearchInput = document.getElementById('manage-turks-branch-search');
    if (manageSearchInput) {
        let searchTimeout;
        manageSearchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(async () => {
                const query = manageSearchInput.value.trim();
                if (query.length < 2) return;
                try {
                    const token = localStorage.getItem('goldenfield_auth_token');
                    const res = await fetch(`/api/metzeler/turks/branches/search?q=${encodeURIComponent(query)}`, {
                        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                    });
                    if (!res.ok) throw new Error('Search failed');
                    const branches = await res.json();
                    renderBranchSearchResults(branches);
                } catch (err) {
                    console.error('Search error:', err);
                }
            }, 300);
        });
    }

    function renderBranchSearchResults(branches) {
        const container = document.getElementById('manage-turks-branch-search-results');
        if (!container) return;
        if (branches.length === 0) {
            container.innerHTML = '<div style="padding: 12px; color: #666;">No branches found</div>';
            container.style.display = 'block';
            return;
        }
        container.innerHTML = branches.map(b => `
            <div style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #eee;" 
                 data-id="${b.id}" 
                 data-code="${b.branch_code}"
                 data-name="${b.branch_name}"
                 data-location="${b.branch_location || ''}"
                 data-status="${b.status}"
                 onmouseover="this.style.background='#f5f5f5'" 
                 onmouseout="this.style.background='white'">
                <strong>${b.branch_name}</strong> (${b.branch_code})
            </div>
        `).join('');
        container.style.display = 'block';

        container.querySelectorAll('[data-id]').forEach(item => {
            item.onclick = () => {
                document.getElementById('manage-turks-branch-code').value = item.dataset.code;
                document.getElementById('manage-turks-branch-code').dataset.id = item.dataset.id;
                document.getElementById('manage-turks-branch-name').value = item.dataset.name;
                document.getElementById('manage-turks-branch-location').value = item.dataset.location;
                document.getElementById('manage-turks-branch-status').value = item.dataset.status;
                container.style.display = 'none';
                manageSearchInput.value = '';
            };
        });
    }

    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
        const container = document.getElementById('manage-turks-branch-search-results');
        const searchInput = document.getElementById('manage-turks-branch-search');
        if (container && searchInput && !container.contains(e.target) && e.target !== searchInput) {
            container.style.display = 'none';
        }
    });

    // ==================== TURKS EMPLOYEE MANAGEMENT ====================

    // Save Create Employee
    const saveCreateEmpBtn = document.getElementById('save-create-turks-employee-btn');
    if (saveCreateEmpBtn) {
        saveCreateEmpBtn.onclick = async () => {
            const employee_code = document.getElementById('create-turks-emp-code').value;
            const employee_name = document.getElementById('create-turks-emp-name').value;
            const employee_department = document.getElementById('create-turks-emp-department').value;

            if (!employee_code || !employee_name || !employee_department) {
                alert('Employee Code, Name, and Department are required');
                return;
            }

            try {
                const token = localStorage.getItem('goldenfield_auth_token');
                const res = await fetch('/api/metzeler/turks/employees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({ employee_code, employee_name, employee_department })
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Failed to create employee');
                }

                const employee = await res.json();
                alert('Employee created successfully!');
                empModal.classList.add('hidden');
                // Reset form
                document.getElementById('create-turks-emp-code').value = '';
                document.getElementById('create-turks-emp-name').value = '';
                document.getElementById('create-turks-emp-department').value = '';
                // Refresh employee list
                loadTurksEmployees();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };
    }

    // Save Manage Employee
    const saveManageEmpBtn = document.getElementById('save-manage-turks-employee-btn');
    if (saveManageEmpBtn) {
        saveManageEmpBtn.onclick = async () => {
            const employee_id = document.getElementById('manage-turks-emp-code').dataset.id;
            const employee_name = document.getElementById('manage-turks-emp-name').value;
            const employee_department = document.getElementById('manage-turks-emp-department').value;
            const status = document.getElementById('manage-turks-emp-status').value;

            if (!employee_id) {
                alert('No employee selected');
                return;
            }

            try {
                const token = localStorage.getItem('goldenfield_auth_token');
                const res = await fetch(`/api/metzeler/turks/employees/${employee_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({ employee_name, employee_department, status })
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Failed to update employee');
                }

                const employee = await res.json();
                alert('Employee updated successfully!');
                // Refresh employee list
                loadTurksEmployees();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };
    }

    // Search Employee in Manage Tab
    const manageEmpSearchInput = document.getElementById('manage-turks-emp-search');
    if (manageEmpSearchInput) {
        let searchTimeout;
        manageEmpSearchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(async () => {
                const query = manageEmpSearchInput.value.trim();
                if (query.length < 2) return;
                try {
                    const token = localStorage.getItem('goldenfield_auth_token');
                    const res = await fetch(`/api/metzeler/turks/employees/search?q=${encodeURIComponent(query)}`, {
                        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                    });
                    if (!res.ok) throw new Error('Search failed');
                    const employees = await res.json();
                    renderEmployeeSearchResults(employees);
                } catch (err) {
                    console.error('Search error:', err);
                }
            }, 300);
        });
    }

    function renderEmployeeSearchResults(employees) {
        const container = document.getElementById('manage-turks-emp-search-results');
        if (!container) return;
        if (employees.length === 0) {
            container.innerHTML = '<div style="padding: 12px; color: #666;">No employees found</div>';
            container.style.display = 'block';
            return;
        }
        container.innerHTML = employees.map(e => `
            <div style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #eee;" 
                 data-id="${e.id}" 
                 data-code="${e.employee_code}"
                 data-name="${e.employee_name}"
                 data-department="${e.employee_department}"
                 data-status="${e.status}"
                 onmouseover="this.style.background='#f5f5f5'" 
                 onmouseout="this.style.background='white'">
                <strong>${e.employee_name}</strong> (${e.employee_code})
            </div>
        `).join('');
        container.style.display = 'block';

        container.querySelectorAll('[data-id]').forEach(item => {
            item.onclick = () => {
                document.getElementById('manage-turks-emp-code').value = item.dataset.code;
                document.getElementById('manage-turks-emp-code').dataset.id = item.dataset.id;
                document.getElementById('manage-turks-emp-name').value = item.dataset.name;
                document.getElementById('manage-turks-emp-department').value = item.dataset.department;
                document.getElementById('manage-turks-emp-status').value = item.dataset.status;
                container.style.display = 'none';
                manageEmpSearchInput.value = '';
            };
        });
    }

    // Hide employee search results when clicking outside
    document.addEventListener('click', (e) => {
        const container = document.getElementById('manage-turks-emp-search-results');
        const searchInput = document.getElementById('manage-turks-emp-search');
        if (container && searchInput && !container.contains(e.target) && e.target !== searchInput) {
            container.style.display = 'none';
        }
    });

    // Load next employee code when switching to create tab
    const createEmpTab = document.getElementById('tab-create-turks-employee');
    if (createEmpTab) {
        createEmpTab.addEventListener('click', async () => {
            const codeInput = document.getElementById('create-turks-emp-code');
            if (codeInput && (!codeInput.value || codeInput.value === '')) {
                try {
                    const token = localStorage.getItem('goldenfield_auth_token');
                    const res = await fetch('/api/metzeler/turks/employees/next-code', {
                        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                    });
                    if (res.ok) {
                        const data = await res.json();
                        codeInput.value = data.employee_code;
                    }
                } catch (e) {
                    console.error('Failed to fetch next employee code:', e);
                }
            }
        });
    }

    // Schedule Creator Modal
    const createScheduleBtn = document.getElementById('create-schedule-btn');
    const scheduleModal = document.getElementById('schedule-creator-modal');
    const closeScheduleBtn = document.getElementById('close-schedule-creator-modal');
    const cancelScheduleBtn = document.getElementById('schedule-creator-cancel-btn');
    const okScheduleBtn = document.getElementById('schedule-creator-ok-btn');

    if (createScheduleBtn && scheduleModal) {
        createScheduleBtn.onclick = () => {
            // Calculate next period based on current date
            const today = new Date();
            const currentDay = today.getDate();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            
            let dateStart, dateEnd;
            
            if (currentDay <= 15) {
                // First half of month (1-15) -> show second half (16 to end of month)
                dateStart = new Date(currentYear, currentMonth, 16);
                // Get last day of current month
                const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
                dateEnd = new Date(currentYear, currentMonth, lastDay);
            } else {
                // Second half of month (16+) -> show first half of next month (1-15)
                dateStart = new Date(currentYear, currentMonth + 1, 1);
                dateEnd = new Date(currentYear, currentMonth + 1, 15);
            }
            
            // Format as YYYY-MM-DD for input (use local date components to avoid timezone issues)
            const formatDate = (d) => {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
            
            document.getElementById('schedule-date-start').value = formatDate(dateStart);
            document.getElementById('schedule-date-end').value = formatDate(dateEnd);
            
            scheduleModal.classList.remove('hidden');
        };
    }
    const closeScheduleModal = () => {
        if (scheduleModal) scheduleModal.classList.add('hidden');
    };
    if (closeScheduleBtn) closeScheduleBtn.onclick = closeScheduleModal;
    if (cancelScheduleBtn) cancelScheduleBtn.onclick = closeScheduleModal;
    if (scheduleModal) {
        scheduleModal.onclick = (e) => {
            if (e.target === scheduleModal) closeScheduleModal();
        };
    }
    if (okScheduleBtn) {
        okScheduleBtn.onclick = async () => {
            const dateStart = document.getElementById('schedule-date-start').value;
            const dateEnd = document.getElementById('schedule-date-end').value;
            
            if (!dateStart || !dateEnd) {
                alert('Please select both Date Start and Date End');
                return;
            }
            
            if (new Date(dateStart) > new Date(dateEnd)) {
                alert('Date Start cannot be after Date End');
                return;
            }
            
            closeScheduleModal();
            
            // Open schedule detail modal and populate table
            openScheduleDetailModal(dateStart, dateEnd);
        };
    }

    // Schedule Detail Modal
    let scheduleDetailModal = null;
    let scheduleDetailCloseBtn = null;
    let scheduleDetailSaveBtn = null;
    let scheduleDetailDateRange = null;
    let scheduleDetailTableBody = null;

    function openScheduleDetailModal(dateStart, dateEnd) {
        // Initialize modal elements if not already
        if (!scheduleDetailModal) {
            scheduleDetailModal = document.getElementById('schedule-detail-modal');
            scheduleDetailCloseBtn = document.getElementById('close-schedule-detail-modal');
            scheduleDetailSaveBtn = document.getElementById('schedule-detail-save-btn');
            scheduleDetailDateRange = document.getElementById('schedule-detail-date-range');
            scheduleDetailTableBody = document.getElementById('schedule-detail-table-body');
            
            if (scheduleDetailCloseBtn) scheduleDetailCloseBtn.onclick = () => scheduleDetailModal.classList.add('hidden');
            if (scheduleDetailModal) {
                scheduleDetailModal.onclick = (e) => {
                    if (e.target === scheduleDetailModal) scheduleDetailModal.classList.add('hidden');
                };
            }
            if (scheduleDetailSaveBtn) {
                scheduleDetailSaveBtn.onclick = saveScheduleDetail;
            }
        }
        
        // Format date range for display
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        scheduleDetailDateRange.textContent = `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
        
        // Fetch active branches and populate table
        populateScheduleDetailTable(dateStart, dateEnd);
        
        scheduleDetailModal.classList.remove('hidden');
    }

    async function populateScheduleDetailTable(dateStart, dateEnd) {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            
            // Fetch both branches and staff day settings in parallel
            const [branchesRes, staffDayRes] = await Promise.all([
                fetch('/api/metzeler/turks/branches', { headers: token ? { 'Authorization': `Bearer ${token}` } : {} }),
                fetch('/api/metzeler/turks/branch-staff-day/all', { headers: token ? { 'Authorization': `Bearer ${token}` } : {} })
            ]);
            
            if (!branchesRes.ok) throw new Error('Failed to load branches');
            const branches = await branchesRes.json();
            const activeBranches = branches.filter(b => b.status === 'Active');
            
            // Build staff day map: branch_code -> { day_of_week -> pax }
            let staffDayMap = {};
            if (staffDayRes.ok) {
                const staffDayData = await staffDayRes.json();
                staffDayData.forEach(item => {
                    if (!staffDayMap[item.branch_code]) staffDayMap[item.branch_code] = {};
                    staffDayMap[item.branch_code][item.day_of_week] = item.pax;
                });
            }
            
            if (!scheduleDetailTableBody) return;
            
            // Update table header with branch columns
            const table = scheduleDetailTableBody.closest('table');
            if (table) {
                const thead = table.querySelector('thead tr');
                const branchHeaders = activeBranches.map(b => 
                    `<th style="width: 80px; text-align: center; padding: 8px 4px; font-size: 13px; font-weight: 600;">${b.branch_name}</th>`
                ).join('');
                thead.innerHTML = `
                    <th style="width: 70px; text-align: center; padding: 8px 4px; font-size: 13px; font-weight: 600;">Day</th>
                    <th style="width: 100px; text-align: center; padding: 8px 4px; font-size: 13px; font-weight: 600;">Day of the Week</th>
                    ${branchHeaders}
                `;
            }
            
            // Generate rows for each day in range
            const rows = [];
            const start = new Date(dateStart);
            const end = new Date(dateEnd);
            const current = new Date(start);
            
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            while (current <= end) {
                const dayOfWeek = dayNames[current.getDay()];
                const dayStr = `${monthNames[current.getMonth()]} ${current.getDate()}`;
                const dateKey = current.toISOString().split('T')[0];
                
                const branchCells = activeBranches.map(branch => {
                    const savedPax = staffDayMap[branch.branch_code]?.[dayOfWeek] || '';
                    return `<td style="padding: 4px 2px;"><input type="number" class="pax-input" min="0" value="${savedPax}" placeholder="0" data-branch-code="${branch.branch_code}" data-date="${dateKey}" data-day-of-week="${dayOfWeek}" style="width: 72px; height: 38px; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 4px; font-size: 16px; text-align: center; box-sizing: border-box;"></td>`;
                }).join('');
                
                rows.push(`
                    <tr data-date="${dateKey}" data-day-of-week="${dayOfWeek}" style="vertical-align: middle;">
                        <td style="padding: 8px 6px; font-size: 13px; white-space: nowrap; text-align: center;">${dayStr}</td>
                        <td style="padding: 8px 6px; font-size: 13px; font-weight: 600; text-align: center;">${dayOfWeek}</td>
                        ${branchCells}
                    </tr>
                `);
                
                current.setDate(current.getDate() + 1);
            }
            
            if (rows.length === 0) {
                scheduleDetailTableBody.innerHTML = '<tr><td colspan="' + (2 + activeBranches.length) + '" style="text-align: center; padding: 20px; color: #666;">No active branches found</td></tr>';
            } else {
                scheduleDetailTableBody.innerHTML = rows.join('');
            }
        } catch (err) {
            console.error('Failed to populate schedule detail:', err);
            if (scheduleDetailTableBody) {
                scheduleDetailTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }
    }

    async function saveScheduleDetail() {
        if (!scheduleDetailTableBody) return;
        
        const rows = scheduleDetailTableBody.querySelectorAll('tr[data-date]');
        const scheduleData = [];
        
        rows.forEach(row => {
            const inputs = row.querySelectorAll('.pax-input');
            inputs.forEach(input => {
                const pax = parseInt(input.value) || 0;
                if (pax > 0) {
                    scheduleData.push({
                        branch_code: input.dataset.branchCode,
                        date: input.dataset.date,
                        pax: pax
                    });
                }
            });
        });
        
        if (scheduleData.length === 0) {
            alert('Please enter at least one pax value');
            return;
        }
        
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const res = await fetch('/api/metzeler/turks/schedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ schedule: scheduleData })
            });
            
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to save schedule');
            }
            
            alert('Schedule saved successfully!');
            scheduleDetailModal.classList.add('hidden');
        } catch (err) {
            alert('Error: ' + err.message);
        }
    }

    // Branch Staff/Day Modal
    const branchStaffDayBtn = document.getElementById('branch-staff-day-btn');
    const branchStaffDayModal = document.getElementById('branch-staff-day-modal');
    const branchStaffDayCloseBtn = document.getElementById('close-branch-staff-day-modal');
    const branchStaffDayCancelBtn = document.getElementById('branch-staff-day-cancel-btn');
    const branchStaffDaySaveBtn = document.getElementById('branch-staff-day-save-btn');
    const branchStaffDaySelect = document.getElementById('branch-staff-day-branch');
    const branchStaffDayTableContainer = document.getElementById('branch-staff-day-table-container');
    const branchStaffDayTableBody = document.getElementById('branch-staff-day-table-body');

    let branchStaffDayCurrentBranchCode = null;

    const closeBranchStaffDayModal = () => {
        branchStaffDayModal.classList.add('hidden');
        branchStaffDaySelect.value = '';
        branchStaffDayTableContainer.style.display = 'none';
        branchStaffDayCurrentBranchCode = null;
    };

    if (branchStaffDayBtn && branchStaffDayModal) {
        branchStaffDayBtn.onclick = async () => {
            branchStaffDayModal.classList.remove('hidden');
            // Load active branches into dropdown
            await loadBranchesForStaffDay();
        };
    }
    if (branchStaffDayCloseBtn) branchStaffDayCloseBtn.onclick = closeBranchStaffDayModal;
    if (branchStaffDayCancelBtn) branchStaffDayCancelBtn.onclick = closeBranchStaffDayModal;
    if (branchStaffDayModal) {
        branchStaffDayModal.onclick = (e) => {
            if (e.target === branchStaffDayModal) closeBranchStaffDayModal();
        };
    }

    async function loadBranchesForStaffDay() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const res = await fetch('/api/metzeler/turks/branches', {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            if (!res.ok) throw new Error('Failed to load branches');
            const branches = await res.json();
            const activeBranches = branches.filter(b => b.status === 'Active');
            
            if (branchStaffDaySelect) {
                branchStaffDaySelect.innerHTML = '<option value="">Select Branch</option>' + 
                    activeBranches.map(b => `<option value="${b.branch_code}">${b.branch_name}</option>`).join('');
            }
        } catch (err) {
            console.error('Failed to load branches:', err);
        }
    }

    if (branchStaffDaySelect) {
        branchStaffDaySelect.onchange = () => {
            const branchCode = branchStaffDaySelect.value;
            if (branchCode) {
                branchStaffDayCurrentBranchCode = branchCode;
                populateBranchStaffDayTable(branchCode);
                branchStaffDayTableContainer.style.display = 'block';
            } else {
                branchStaffDayTableContainer.style.display = 'none';
                branchStaffDayCurrentBranchCode = null;
            }
        };
    }

    async function populateBranchStaffDayTable(branchCode) {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const res = await fetch(`/api/metzeler/turks/branch-staff-day/${branchCode}`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            
            let savedData = {};
            if (res.ok) {
                const staffDay = await res.json();
                staffDay.forEach(item => {
                    savedData[item.day_of_week] = item.pax;
                });
            }
            
            if (branchStaffDayTableBody) {
                branchStaffDayTableBody.innerHTML = dayNames.map(day => `
                    <tr data-day="${day}">
                        <td style="font-weight: 600;">${day}</td>
                        <td><input type="number" class="staff-day-pax-input" min="0" value="${savedData[day] || ''}" placeholder="0" style="width: 100px; padding: 6px; border: 1px solid #D6D6D6; border-radius: 4px;"></td>
                    </tr>
                `).join('');
            }
        } catch (err) {
            console.error('Failed to load staff day:', err);
            if (branchStaffDayTableBody) {
                branchStaffDayTableBody.innerHTML = dayNames.map(day => `
                    <tr data-day="${day}">
                        <td style="font-weight: 600;">${day}</td>
                        <td><input type="number" class="staff-day-pax-input" min="0" value="" placeholder="0" style="width: 100px; padding: 6px; border: 1px solid #D6D6D6; border-radius: 4px;"></td>
                    </tr>
                `).join('');
            }
        }
    }

    if (branchStaffDaySaveBtn) {
        branchStaffDaySaveBtn.onclick = async () => {
            if (!branchStaffDayCurrentBranchCode) {
                alert('Please select a branch');
                return;
            }
            
            const rows = branchStaffDayTableBody.querySelectorAll('tr[data-day]');
            const staffData = [];
            
            rows.forEach(row => {
                const input = row.querySelector('.staff-day-pax-input');
                const pax = parseInt(input.value) || 0;
                if (pax > 0) {
                    staffData.push({
                        day_of_week: row.dataset.day,
                        pax: pax
                    });
                }
            });
            
            if (staffData.length === 0) {
                alert('Please enter at least one pax value');
                return;
            }
            
            try {
                const token = localStorage.getItem('goldenfield_auth_token');
                const res = await fetch('/api/metzeler/turks/branch-staff-day', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({ 
                        branch_code: branchStaffDayCurrentBranchCode, 
                        staff_day: staffData 
                    })
                });
                
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Failed to save staff/day');
                }
                
                alert('Branch staff/day saved successfully!');
                closeBranchStaffDayModal();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };
    }
}