if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-employees-manage-org-structure'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="header-actions">
                <h2>Manage Organizational Structure</h2>
            </div>
            <div class="action-buttons-row">
                <button id="add-org-unit-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span class="btn-label">Add Organizational Unit</span>
                </button>
                <button id="add-role-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span class="btn-label">Add Role</span>
                </button>
                <button id="edit-org-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    <span class="btn-label">Edit Structure</span>
                </button>
                <button id="return-to-employees-btn" class="btn-icon-circle" style="margin-left: auto;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span class="btn-label">Return to Employees Tab</span>
                </button>
            </div>
            <div class="tracking-cards-row">
                <div class="card tracking-card">
                    <h3>Total Roles</h3>
                    <p class="card-sub-label">Number of Roles needed to be employed in the Business</p>
                     <div class="card-value-row">
                         <div class="card-value" id="total-roles-count">35</div>
                     </div>
                </div>
                <div class="card tracking-card">
                    <h3>Total Organizational Units</h3>
                    <p class="card-sub-label">Number of Departments for the whole Business</p>
                    <div class="card-value-row">
                        <div class="card-value" id="total-units-count">5</div>
                    </div>
                </div>
                <div class="card tracking-card">
                    <h3>Unique Roles</h3>
                    <p class="card-sub-label">Number of unique roles for the company</p>
                    <div class="card-value-row">
                        <div class="card-value" id="unique-roles-count">9</div>
                    </div>
                </div>
                <div class="card tracking-card">
                    <h3>Filled Roles</h3>
                    <p class="card-sub-label">Percentage of Total Roles filled</p>
                    <div class="card-value-row">
                        <div class="card-value">100%</div>
                    </div>
                    <p class="vs-last-month">VS Last month</p>
                </div>
            </div>
            <div class="card" style="margin-top: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <h3 style="margin: 0;">Organizational Chart</h3>
                    <select id="org-chart-unit-select" class="modal-select" style="width: 220px;">
                        <option value="">Select Unit</option>
                    </select>
                </div>
                 <div id="org-chart-display" style="padding: 8px; text-align: center; color: #999; font-size: 13px; border: 1px dashed #d1d5db; border-radius: 8px; min-height: 200px; display: flex; align-items: flex-start; justify-content: center;">
                    Select a unit to view its organizational chart.
                </div>
            </div>
            <div id="org-unit-modal" class="modal" style="display:none;">
                <div class="modal-content" style="max-width: 560px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Organizational Unit</h3>
                        <button class="modal-close-btn" id="close-org-unit-modal">&times;</button>
                    </div>
                    <div class="modal-tabs">
                        <button class="modal-tab active" data-tab="add-new-unit">Add New Unit</button>
                        <button class="modal-tab" data-tab="manage-unit">Manage Unit</button>
                    </div>
                    <div class="modal-tab-panel" id="panel-add-new-unit">
                        <label>Unit Name</label>
                        <input type="text" id="org-unit-name" placeholder="Enter unit name">
                        <label>Organizational Unit ID</label>
                        <input type="text" id="org-unit-id" value="OrgUn-001" readonly>
                        <label>Status</label>
                        <select id="org-unit-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Terminated">Terminated</option>
                        </select>
                        <div class="modal-tab-actions">
                            <button class="btn-primary" id="save-new-org-unit-btn">Save</button>
                        </div>
                    </div>
                    <div class="modal-tab-panel" id="panel-manage-unit" style="display:none;">
                        <label>Unit Name</label>
                        <select id="manage-unit-name" class="modal-select">
                            <option value="">Select Unit</option>
                        </select>
                        <label>Organizational Unit ID</label>
                        <input type="text" id="manage-unit-id" readonly>
                        <label>Status</label>
                        <select id="manage-unit-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Terminated">Terminated</option>
                        </select>
                        <div class="modal-tab-actions">
                            <button class="btn-primary" id="save-manage-org-unit-btn">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="role-modal" class="modal" style="display:none;">
                <div class="modal-content" style="max-width: 560px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Role</h3>
                        <button class="modal-close-btn" id="close-role-modal">&times;</button>
                    </div>
                    <div class="modal-tabs">
                        <button class="modal-tab active" data-tab="add-role">Add Role</button>
                        <button class="modal-tab" data-tab="manage-role">Manage Role</button>
                    </div>
                    <div class="modal-tab-panel" id="panel-add-role">
                        <label>Role ID</label>
                        <input type="text" id="role-id" value="OrgRol-001" readonly>
                        <label>Role Name</label>
                        <input type="text" id="role-name" placeholder="Enter role name">
                        <label>Organizational Unit</label>
                        <select id="role-org-unit" class="modal-select">
                            <option value="">Select Unit</option>
                        </select>
                        <label>Level</label>
                        <select id="role-level" class="modal-select">
                            <option value="Root">Root</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <label>Status</label>
                        <select id="role-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Terminated">Terminated</option>
                        </select>
                        <div class="modal-tab-actions">
                            <button class="btn-primary" id="save-new-role-btn">Save</button>
                        </div>
                    </div>
                    <div class="modal-tab-panel" id="panel-manage-role" style="display:none;">
                        <label>Role Name</label>
                        <select id="manage-role-name" class="modal-select">
                            <option value="">Select Role</option>
                        </select>
                        <label>Role ID</label>
                        <input type="text" id="manage-role-id" readonly>
                        <label>Organizational Unit</label>
                        <select id="manage-role-org-unit" class="modal-select">
                            <option value="">Select Unit</option>
                        </select>
                        <label>Level</label>
                        <select id="manage-role-level" class="modal-select">
                            <option value="Root">Root</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <label>Status</label>
                        <select id="manage-role-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <div class="modal-tab-actions">
                            <button class="btn-primary" id="save-manage-role-btn">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="edit-structure-modal" class="modal" style="display:none;">
                <div class="modal-content" style="max-width: 1400px; width: 95%; max-height: 50vh; height: auto; display: flex; flex-direction: column; padding: 10px;">
                    <div class="modal-header-row">
                        <h3>Edit Structure</h3>
                        <button class="modal-close-btn" id="close-edit-structure-modal">&times;</button>
                    </div>
                    <div style="display: flex; gap: 16px; padding: 16px; align-items: stretch; flex: 1 1 auto; min-height: 0;">
                        <div style="flex: 1 1 55%; min-width: 0; min-height: 0; overflow: auto;">
                            <label>Organizational Unit</label>
                            <select id="edit-structure-unit-select" class="modal-select">
                                <option value="">Select Unit</option>
                            </select>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; margin-bottom: 8px;">
                                <span style="font-weight: 600; font-size: 14px;">Total Roles: <span id="edit-structure-total-roles">0</span></span>
                            </div>
                            <div class="table-wrap">
                                <table class="data-table product-table edit-structure-roles-table">
                                    <thead>
                                        <tr>
                                            <th>OrgUnitRole ID</th>
                                            <th>Role Title</th>
                                            <th>Org Unit</th>
                                            <th>Parent ID</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="edit-structure-roles-table-body">
                                        <tr><td colspan="5" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="edit-structure-pagination" class="pagination"></div>
                            <div style="display: flex; gap: 12px; margin-top: 16px; align-items: flex-end;">
                                <div style="flex: 1;">
                                    <label>Role</label>
                                    <select id="edit-structure-role-select" class="modal-select">
                                        <option value="">Select Role</option>
                                    </select>
                                </div>
                                <div style="flex: 1;">
                                    <label>Reports To</label>
                                    <select id="edit-structure-reports-to" class="modal-select">
                                        <option value="Root">Root</option>
                                    </select>
                                </div>
                            </div>
                            <button id="edit-structure-add-role-btn" class="btn-primary" style="display: block; width: 100%; margin-top: 12px;">Add Role</button>
                        </div>
                        <div id="org-tree-container" style="flex: 1 1 45%; min-width: 400px; min-height: 0; border: 1px solid #e5e7eb; border-radius: 8px; padding: 4px; background: #fafafa; overflow: auto;">
                            <span style="color: #999; font-size: 13px;">Select a unit to view its organizational chart.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 24px; margin-top: 24px; flex-wrap: nowrap;">
                <div class="card" style="flex: 1 1 0; min-width: 0;">
                    <h3>Organizational Units</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Org Unit ID</th>
                                    <th>Unit Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="org-units-table-body">
                                <tr><td colspan="3" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card" style="flex: 1 1 0; min-width: 0;">
                    <h3>Roles</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Role ID</th>
                                    <th>Role</th>
                                    <th>Org Unit</th>
                                    <th>Level</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="org-roles-table-body">
                                <tr><td colspan="5" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'hr-employees';
    const render = ModuleComponents[currentTab] || ModuleComponents['hr-employees'];
    render(contentArea);

     const API_BASE_ORG_UNITS = 'http://localhost:5000/api/organizational-units';
     const API_BASE_ORG_ROLES = 'http://localhost:5000/api/organizational-roles';
     const API_BASE_ORG_STRUCTURE = 'http://localhost:5000/api/organizational-structure';
     const API_BASE_UPLOADS = 'http://localhost:5000/uploads/employee-photos';
     const returnBtn = document.getElementById('return-to-employees-btn');
     if (returnBtn) {
         returnBtn.addEventListener('click', () => {
             switchTab('hr-employees');
         });
     }

    const addOrgUnitBtn = document.getElementById('add-org-unit-btn');
    const orgUnitModal = document.getElementById('org-unit-modal');
    const closeOrgUnitModal = document.getElementById('close-org-unit-modal');

    if (addOrgUnitBtn && orgUnitModal) {
        addOrgUnitBtn.addEventListener('click', () => {
            orgUnitModal.style.display = 'flex';
        });
    }

    if (closeOrgUnitModal && orgUnitModal) {
        closeOrgUnitModal.addEventListener('click', () => {
            orgUnitModal.style.display = 'none';
        });
    }

    if (orgUnitModal) {
        orgUnitModal.addEventListener('click', (e) => {
            if (e.target === orgUnitModal) orgUnitModal.style.display = 'none';
        });
    }

    const orgUnitTabs = orgUnitModal ? orgUnitModal.querySelectorAll('.modal-tab') : [];
    const orgUnitPanels = orgUnitModal ? orgUnitModal.querySelectorAll('.modal-tab-panel') : [];

    orgUnitTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            orgUnitTabs.forEach(t => t.classList.remove('active'));
            orgUnitPanels.forEach(p => p.style.display = 'none');
            tab.classList.add('active');
            const panelId = 'panel-' + tab.dataset.tab;
            const panel = document.getElementById(panelId);
            if (panel) panel.style.display = 'flex';
        });
    });

    const saveNewOrgUnitBtn = document.getElementById('save-new-org-unit-btn');
    if (saveNewOrgUnitBtn) {
        saveNewOrgUnitBtn.addEventListener('click', async () => {
            const unitName = document.getElementById('org-unit-name').value.trim();
            const status = document.getElementById('org-unit-status').value;
            if (!unitName) { alert('Please enter a unit name'); return; }
            try {
                const nextIdRes = await fetch(`${API_BASE_ORG_UNITS}/next-id`);
                if (!nextIdRes.ok) throw new Error('Failed to fetch next ID');
                const nextIdData = await nextIdRes.json();
                const orgUnitId = nextIdData.org_unit_id;
                const res = await fetch(`${API_BASE_ORG_UNITS}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ org_unit_id: orgUnitId, unit_name: unitName, status })
                });
                if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Failed to save unit'); }
                const saved = await res.json();
                document.getElementById('org-unit-id').value = saved.org_unit_id;
                alert('Organizational unit saved successfully');
                orgUnitModal.style.display = 'none';
                loadOrganizationalUnits();
                loadTotalUnitsCount();
                populateManageUnitDropdown();
                populateOrgChartDropdown();
            } catch (err) {
                console.error('Save unit error:', err);
                alert('Save failed: ' + err.message);
            }
        });
    }

    const manageUnitNameSelect = document.getElementById('manage-unit-name');
    const manageUnitIdInput = document.getElementById('manage-unit-id');
    const manageUnitStatusSelect = document.getElementById('manage-unit-status');

    const populateManageUnitDropdown = async () => {
        if (!manageUnitNameSelect) return;
        try {
            const res = await fetch(`${API_BASE_ORG_UNITS}`);
            if (!res.ok) throw new Error('Failed to fetch units');
            const units = await res.json();
            manageUnitNameSelect.innerHTML = '<option value="">Select Unit</option>' +
                units.map(u => `<option value="${u.org_unit_id}">${u.unit_name}</option>`).join('');
        } catch (err) {
            console.error('Failed to load units for manage dropdown:', err);
        }
    };

    if (manageUnitNameSelect) {
        manageUnitNameSelect.addEventListener('change', async () => {
            const selectedId = manageUnitNameSelect.value;
            if (!selectedId) { if (manageUnitIdInput) manageUnitIdInput.value = ''; return; }
            try {
                const res = await fetch(`${API_BASE_ORG_UNITS}/${encodeURIComponent(selectedId)}`);
                if (!res.ok) throw new Error('Failed to fetch unit details');
                const unit = await res.json();
                if (manageUnitIdInput) manageUnitIdInput.value = unit.org_unit_id || '';
                if (manageUnitStatusSelect) manageUnitStatusSelect.value = unit.status || 'Active';
            } catch (err) {
                console.error('Failed to load unit details:', err);
            }
        });
    }

    const saveManageOrgUnitBtn = document.getElementById('save-manage-org-unit-btn');
    if (saveManageOrgUnitBtn) {
        saveManageOrgUnitBtn.addEventListener('click', async () => {
            const orgUnitId = manageUnitIdInput ? manageUnitIdInput.value.trim() : '';
            const status = manageUnitStatusSelect ? manageUnitStatusSelect.value : 'Active';
            const unitName = manageUnitNameSelect ? (manageUnitNameSelect.options[manageUnitNameSelect.selectedIndex]?.text || '').trim() : '';
            if (!orgUnitId) { alert('Please select a unit'); return; }
            if (!unitName) { alert('Unit name is missing'); return; }
            try {
                const res = await fetch(`${API_BASE_ORG_UNITS}/${encodeURIComponent(orgUnitId)}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ unit_name: unitName, status })
                });
                if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Failed to update unit'); }
                alert('Organizational unit updated successfully');
                orgUnitModal.style.display = 'none';
                loadOrganizationalUnits();
                loadTotalUnitsCount();
                populateManageUnitDropdown();
                populateOrgChartDropdown();
            } catch (err) {
                console.error('Update unit error:', err);
                alert('Update failed: ' + err.message);
            }
        });
    }

    if (addOrgUnitBtn && orgUnitModal) {
        addOrgUnitBtn.addEventListener('click', async () => {
            populateManageUnitDropdown();
            const orgUnitIdInput = document.getElementById('org-unit-id');
            const orgUnitNameInput = document.getElementById('org-unit-name');
            if (orgUnitNameInput) orgUnitNameInput.value = '';
            try {
                const nextIdRes = await fetch(`${API_BASE_ORG_UNITS}/next-id`);
                if (nextIdRes.ok) {
                    const nextIdData = await nextIdRes.json();
                    if (orgUnitIdInput) orgUnitIdInput.value = nextIdData.org_unit_id || 'OrgUn-001';
                }
            } catch (err) {
                console.error('Failed to fetch next org unit ID:', err);
            }
            orgUnitModal.style.display = 'flex';
        });
    }

    const addRoleBtn = document.getElementById('add-role-btn');
    const roleModal = document.getElementById('role-modal');
    const closeRoleModal = document.getElementById('close-role-modal');

    if (closeRoleModal && roleModal) {
        closeRoleModal.addEventListener('click', () => {
            roleModal.style.display = 'none';
        });
    }

    if (roleModal) {
        roleModal.addEventListener('click', (e) => {
            if (e.target === roleModal) roleModal.style.display = 'none';
        });
    }

    const roleTabs = roleModal ? roleModal.querySelectorAll('.modal-tab') : [];
    const rolePanels = roleModal ? roleModal.querySelectorAll('.modal-tab-panel') : [];

    roleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            roleTabs.forEach(t => t.classList.remove('active'));
            rolePanels.forEach(p => p.style.display = 'none');
            tab.classList.add('active');
            const panelId = 'panel-' + tab.dataset.tab;
            const panel = document.getElementById(panelId);
            if (panel) panel.style.display = 'flex';
        });
    });

    const populateOrgUnitDropdowns = async () => {
        try {
            const res = await fetch(`${API_BASE_ORG_UNITS}`);
            if (!res.ok) throw new Error('Failed to fetch units');
            const units = await res.json();
            const activeUnits = units.filter(u => (u.status || '').toLowerCase() === 'active');
            const optionsHtml = '<option value="">Select Unit</option>' +
                activeUnits.map(u => `<option value="${u.org_unit_id}">${u.unit_name}</option>`).join('');
            const roleOrgUnit = document.getElementById('role-org-unit');
            const manageRoleOrgUnit = document.getElementById('manage-role-org-unit');
            if (roleOrgUnit) roleOrgUnit.innerHTML = optionsHtml;
            if (manageRoleOrgUnit) manageRoleOrgUnit.innerHTML = optionsHtml;
        } catch (err) {
            console.error('Failed to load org units for dropdowns:', err);
        }
    };

    const saveNewRoleBtn = document.getElementById('save-new-role-btn');
    if (saveNewRoleBtn) {
        saveNewRoleBtn.addEventListener('click', async () => {
            const roleName = document.getElementById('role-name').value.trim();
            const orgUnit = document.getElementById('role-org-unit').value;
            const level = document.getElementById('role-level').value;
            const status = document.getElementById('role-status').value;
            if (!roleName) { alert('Please enter a role name'); return; }
            if (!orgUnit) { alert('Please select an organizational unit'); return; }
            try {
                const nextIdRes = await fetch(`${API_BASE_ORG_ROLES}/next-id`);
                if (!nextIdRes.ok) throw new Error('Failed to fetch next role ID');
                const nextIdData = await nextIdRes.json();
                const roleId = nextIdData.role_id;
                const res = await fetch(`${API_BASE_ORG_ROLES}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ role_id: roleId, role_name: roleName, org_unit: orgUnit, level, status })
                });
                if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Failed to save role'); }
                const saved = await res.json();
                document.getElementById('role-id').value = saved.role_id;
                alert('Role saved successfully');
                roleModal.style.display = 'none';
                loadOrganizationalRoles();
                loadUniqueRolesCount();
                populateManageRoleDropdown();
            } catch (err) {
                console.error('Save role error:', err);
                alert('Save failed: ' + err.message);
            }
        });
    }

    const manageRoleNameSelect = document.getElementById('manage-role-name');
    const manageRoleIdInput = document.getElementById('manage-role-id');
    const manageRoleLevelSelect = document.getElementById('manage-role-level');
    const manageRoleStatusSelect = document.getElementById('manage-role-status');
    const manageRoleOrgUnitSelect = document.getElementById('manage-role-org-unit');

    const populateManageRoleDropdown = async () => {
        if (!manageRoleNameSelect) return;
        try {
            const res = await fetch(`${API_BASE_ORG_ROLES}`);
            if (!res.ok) throw new Error('Failed to fetch roles');
            const roles = await res.json();
            manageRoleNameSelect.innerHTML = '<option value="">Select Role</option>' +
                roles.map(r => `<option value="${r.role_id}">${r.role_name}</option>`).join('');
        } catch (err) {
            console.error('Failed to load roles for manage dropdown:', err);
        }
    };

    if (manageRoleNameSelect) {
        manageRoleNameSelect.addEventListener('change', async () => {
            const selectedId = manageRoleNameSelect.value;
            if (!selectedId) {
                if (manageRoleIdInput) manageRoleIdInput.value = '';
                if (manageRoleOrgUnitSelect) manageRoleOrgUnitSelect.value = '';
                if (manageRoleLevelSelect) manageRoleLevelSelect.value = 'Root';
                if (manageRoleStatusSelect) manageRoleStatusSelect.value = 'Active';
                return;
            }
            try {
                const res = await fetch(`${API_BASE_ORG_ROLES}/${encodeURIComponent(selectedId)}`);
                if (!res.ok) throw new Error('Failed to fetch role details');
                const role = await res.json();
                if (manageRoleIdInput) manageRoleIdInput.value = role.role_id || '';
                if (manageRoleOrgUnitSelect) manageRoleOrgUnitSelect.value = role.org_unit || '';
                if (manageRoleLevelSelect) manageRoleLevelSelect.value = role.level || 'Root';
                if (manageRoleStatusSelect) manageRoleStatusSelect.value = role.status || 'Active';
            } catch (err) {
                console.error('Failed to load role details:', err);
            }
        });
    }

    const saveManageRoleBtn = document.getElementById('save-manage-role-btn');
    if (saveManageRoleBtn) {
        saveManageRoleBtn.addEventListener('click', async () => {
            const roleId = manageRoleIdInput ? manageRoleIdInput.value.trim() : '';
            const roleName = manageRoleNameSelect ? (manageRoleNameSelect.options[manageRoleNameSelect.selectedIndex]?.text || '').trim() : '';
            const orgUnit = manageRoleOrgUnitSelect ? manageRoleOrgUnitSelect.value : '';
            const level = manageRoleLevelSelect ? manageRoleLevelSelect.value : 'Root';
            const status = manageRoleStatusSelect ? manageRoleStatusSelect.value : 'Active';
            if (!roleId) { alert('Please select a role'); return; }
            try {
                const res = await fetch(`${API_BASE_ORG_ROLES}/${encodeURIComponent(roleId)}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ role_name: roleName, org_unit: orgUnit, level, status })
                });
                if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Failed to update role'); }
                alert('Role updated successfully');
                roleModal.style.display = 'none';
                loadOrganizationalRoles();
                loadUniqueRolesCount();
                populateManageRoleDropdown();
            } catch (err) {
                console.error('Update role error:', err);
                alert('Update failed: ' + err.message);
            }
        });
    }

    if (addRoleBtn && roleModal) {
        addRoleBtn.addEventListener('click', async () => {
            populateOrgUnitDropdowns();
            populateManageRoleDropdown();
            const roleIdInput = document.getElementById('role-id');
            const roleNameInput = document.getElementById('role-name');
            if (roleNameInput) roleNameInput.value = '';
            try {
                const nextIdRes = await fetch(`${API_BASE_ORG_ROLES}/next-id`);
                if (nextIdRes.ok) {
                    const nextIdData = await nextIdRes.json();
                    if (roleIdInput) roleIdInput.value = nextIdData.role_id || 'OrgRol-001';
                }
            } catch (err) {
                console.error('Failed to fetch next role ID:', err);
            }
            roleModal.style.display = 'flex';
        });
    }

    async function loadOrganizationalUnits() {
        const tbody = document.getElementById('org-units-table-body');
        if (!tbody) return;
        try {
            const res = await fetch(`${API_BASE_ORG_UNITS}`);
            if (!res.ok) throw new Error('Failed to fetch organizational units');
            const units = await res.json();
            if (!units || units.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>';
                return;
            }
            tbody.innerHTML = units.map(u => `
                <tr>
                    <td>${u.org_unit_id || ''}</td>
                    <td>${u.unit_name || ''}</td>
                    <td>${u.status || ''}</td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load organizational units:', err);
            tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 12px; color: #c0392b;">Failed to load data</td></tr>';
        }
    }

    async function loadOrganizationalRoles() {
        const tbody = document.getElementById('org-roles-table-body');
        if (!tbody) return;
        try {
            const [rolesRes, unitsRes] = await Promise.all([
                fetch(`${API_BASE_ORG_ROLES}`),
                fetch(`${API_BASE_ORG_UNITS}`)
            ]);
            if (!rolesRes.ok) throw new Error('Failed to fetch organizational roles');
            if (!unitsRes.ok) throw new Error('Failed to fetch organizational units');
            const roles = await rolesRes.json();
            const units = await unitsRes.json();
            const unitMap = {};
            (units || []).forEach(u => { unitMap[u.org_unit_id] = u.unit_name; });
            if (!roles || roles.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>';
                return;
            }
            tbody.innerHTML = roles.map(r => {
                const unitName = unitMap[r.org_unit] || r.org_unit || '';
                return `
                    <tr>
                        <td>${r.role_id || ''}</td>
                        <td>${r.role_name || ''}</td>
                        <td>${unitName}</td>
                        <td>${r.level || ''}</td>
                        <td>${r.status || ''}</td>
                    </tr>
                `;
            }).join('');
        } catch (err) {
            console.error('Failed to load organizational roles:', err);
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 12px; color: #c0392b;">Failed to load data</td></tr>';
        }
    }

    async function loadTotalRolesCount() {
        const totalRolesEl = document.getElementById('total-roles-count');
        if (!totalRolesEl) return;
        try {
            const res = await fetch(`${API_BASE_ORG_STRUCTURE}`);
            if (!res.ok) throw new Error('Failed to fetch organizational structure');
            const structures = await res.json();
            const activeCount = (structures || []).filter(s => (s.status || '').toLowerCase() === 'active').length;
            totalRolesEl.textContent = activeCount;
        } catch (err) {
            console.error('Failed to load total roles count:', err);
            totalRolesEl.textContent = '0';
        }
    }

    async function loadTotalUnitsCount() {
        const totalUnitsEl = document.getElementById('total-units-count');
        if (!totalUnitsEl) return;
        try {
            const res = await fetch(`${API_BASE_ORG_UNITS}`);
            if (!res.ok) throw new Error('Failed to fetch organizational units');
            const units = await res.json();
            const activeCount = (units || []).filter(u => (u.status || '').toLowerCase() === 'active').length;
            totalUnitsEl.textContent = activeCount;
        } catch (err) {
            console.error('Failed to load total units count:', err);
            totalUnitsEl.textContent = '0';
        }
    }

    async function loadUniqueRolesCount() {
        const uniqueRolesEl = document.getElementById('unique-roles-count');
        if (!uniqueRolesEl) return;
        try {
            const res = await fetch(`${API_BASE_ORG_ROLES}`);
            if (!res.ok) throw new Error('Failed to fetch organizational roles');
            const roles = await res.json();
            const activeCount = (roles || []).filter(r => (r.status || '').toLowerCase() === 'active').length;
            uniqueRolesEl.textContent = activeCount;
        } catch (err) {
            console.error('Failed to load unique roles count:', err);
            uniqueRolesEl.textContent = '0';
        }
    }

    loadOrganizationalUnits();
    loadOrganizationalRoles();
    loadTotalRolesCount();
    loadTotalUnitsCount();
    loadUniqueRolesCount();
    populateOrgChartDropdown();

    async function populateOrgChartDropdown() {
        const select = document.getElementById('org-chart-unit-select');
        if (!select) return;
        try {
            const res = await fetch(`${API_BASE_ORG_UNITS}`);
            if (!res.ok) throw new Error('Failed to fetch organizational units');
            const units = await res.json();
            const activeUnits = units.filter(u => (u.status || '').toLowerCase() === 'active');
            select.innerHTML = '<option value="">Select Unit</option>' +
                activeUnits.map(u => `<option value="${u.org_unit_id}">${u.unit_name}</option>`).join('');
        } catch (err) {
            console.error('Failed to populate org chart dropdown:', err);
        }
    }

    const orgChartUnitSelect = document.getElementById('org-chart-unit-select');
    const orgChartDisplay = document.getElementById('org-chart-display');

    if (orgChartUnitSelect) {
        orgChartUnitSelect.addEventListener('change', async () => {
            const selectedId = orgChartUnitSelect.value;
            if (!selectedId) {
                if (orgChartDisplay) orgChartDisplay.innerHTML = 'Select a unit to view its organizational chart.';
                return;
            }
            try {
                const [unitRes, structureRes] = await Promise.all([
                    fetch(`${API_BASE_ORG_UNITS}/${encodeURIComponent(selectedId)}`),
                    fetch(`${API_BASE_ORG_STRUCTURE}/org-unit/${encodeURIComponent(selectedId)}`)
                ]);
                if (!unitRes.ok) throw new Error('Failed to fetch unit details');
                if (!structureRes.ok) throw new Error('Failed to fetch structure');
                const unit = await unitRes.json();
                const structures = await structureRes.json();
                
                if (orgChartDisplay) {
                    if (!structures || structures.length === 0) {
                        orgChartDisplay.innerHTML = '<span style="color: #999; font-size: 13px;">No hierarchy data for this unit.</span>';
                        return;
                    }
                    await renderOrgTree(selectedId, orgChartDisplay, 200, 660, true, false, 40);
                }
            } catch (err) {
                console.error('Failed to load org chart details:', err);
                if (orgChartDisplay) orgChartDisplay.innerHTML = 'Failed to load unit details.';
            }
        });
    }

    const editOrgBtn = document.getElementById('edit-org-btn');
    const editStructureModal = document.getElementById('edit-structure-modal');
    const closeEditStructureModal = document.getElementById('close-edit-structure-modal');
    const editStructureUnitSelect = document.getElementById('edit-structure-unit-select');
    const editStructureRolesTableBody = document.getElementById('edit-structure-roles-table-body');
    const editStructureTotalRoles = document.getElementById('edit-structure-total-roles');
    const editStructureRoleSelect = document.getElementById('edit-structure-role-select');
    const editStructureReportsTo = document.getElementById('edit-structure-reports-to');
    const editStructureAddRoleBtn = document.getElementById('edit-structure-add-role-btn');
    const editStructurePagination = document.getElementById('edit-structure-pagination');
    let editStructureCurrentPage = 1;
    const editStructureRowsPerPage = 8;
    let editStructureAllStructures = [];

    const populateEditStructureUnitDropdown = async () => {
        if (!editStructureUnitSelect) return;
        try {
            const res = await fetch(`${API_BASE_ORG_UNITS}`);
            if (!res.ok) throw new Error('Failed to fetch units');
            const units = await res.json();
            const activeUnits = units.filter(u => (u.status || '').toLowerCase() === 'active');
            editStructureUnitSelect.innerHTML = '<option value="">Select Unit</option>' +
                activeUnits.map(u => `<option value="${u.org_unit_id}">${u.unit_name}</option>`).join('');
        } catch (err) {
            console.error('Failed to populate edit structure unit dropdown:', err);
        }
    };

    const loadEditStructureRoles = async (orgUnitId) => {
        if (!editStructureRolesTableBody || !editStructureTotalRoles) return;
        try {
            const [structureRes, rolesRes] = await Promise.all([
                fetch(`${API_BASE_ORG_STRUCTURE}/org-unit/${encodeURIComponent(orgUnitId)}`),
                fetch(`${API_BASE_ORG_ROLES}`)
            ]);
            if (!structureRes.ok) throw new Error('Failed to fetch structure');
            if (!rolesRes.ok) throw new Error('Failed to fetch roles');
            const structures = await structureRes.json();
            const roles = await rolesRes.json();
            const unitRoles = roles.filter(r => r.org_unit === orgUnitId);
            editStructureAllStructures = structures;
            editStructureCurrentPage = 1;
            editStructureTotalRoles.textContent = structures.length;
            renderEditStructureTablePage();
            const roleOptions = '<option value="">Select Role</option>' +
                unitRoles.map(r => `<option value="${r.role_id}">${r.role_name}</option>`).join('');
            if (editStructureRoleSelect) editStructureRoleSelect.innerHTML = roleOptions;
            const reportsToOptions = (structures.some(s => s.parent_id === 'Root') ? '' : '<option value="Root">Root</option>') +
                structures.map(s => `<option value="${s.org_unit_role_id}">${s.org_unit_role_id}</option>`).join('');
            if (editStructureReportsTo) editStructureReportsTo.innerHTML = reportsToOptions;
        } catch (err) {
            console.error('Failed to load edit structure roles:', err);
            if (editStructureRolesTableBody) {
                    editStructureRolesTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 12px; color: #c0392b;">Failed to load data</td></tr>';
            }
            if (editStructurePagination) {
                editStructurePagination.innerHTML = '';
            }
        }
    };

    const renderEditStructureTablePage = () => {
        if (!editStructureRolesTableBody) return;
        const start = (editStructureCurrentPage - 1) * editStructureRowsPerPage;
        const pageItems = editStructureAllStructures.slice(start, start + editStructureRowsPerPage);
        if (pageItems.length === 0) {
            editStructureRolesTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>';
        } else {
            editStructureRolesTableBody.innerHTML = pageItems.map(s => `
                <tr>
                    <td>${s.org_unit_role_id || ''}</td>
                    <td>${s.role_title || ''}</td>
                    <td>${s.org_unit_name || ''}</td>
                    <td>${s.parent_id || '-'}</td>
                    <td><button class="delete-structure-btn" data-id="${s.org_unit_role_id}" style="background:none;border:none;color:#e74c3c;cursor:pointer;font-size:12px;font-weight:600;">Delete</button></td>
                </tr>
            `).join('');
        }
        const totalPages = Math.max(1, Math.ceil(editStructureAllStructures.length / editStructureRowsPerPage));
        renderEditStructurePagination(totalPages);
    };

    const renderEditStructurePagination = (totalPages) => {
        if (!editStructurePagination) return;
        if (totalPages <= 1) {
            editStructurePagination.innerHTML = '';
            return;
        }
        let html = '';
        html += `<button class="page-btn" data-page="prev" ${editStructureCurrentPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${i === editStructureCurrentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        html += `<button class="page-btn" data-page="next" ${editStructureCurrentPage === totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
        editStructurePagination.innerHTML = html;
        editStructurePagination.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                if (page === 'prev') {
                    if (editStructureCurrentPage > 1) {
                        editStructureCurrentPage--;
                        renderEditStructureTablePage();
                    }
                } else if (page === 'next') {
                    const totalPagesCalc = Math.max(1, Math.ceil(editStructureAllStructures.length / editStructureRowsPerPage));
                    if (editStructureCurrentPage < totalPagesCalc) {
                        editStructureCurrentPage++;
                        renderEditStructureTablePage();
                    }
                } else {
                    editStructureCurrentPage = parseInt(page, 10);
                    renderEditStructureTablePage();
                }
            });
        });
    };

    if (editStructureRolesTableBody) {
        editStructureRolesTableBody.addEventListener('click', async (e) => {
            const btn = e.target.closest('.delete-structure-btn');
            if (!btn) return;
            const orgUnitRoleId = btn.dataset.id;
            if (!orgUnitRoleId) return;
            if (!confirm('Are you sure you want to delete this role? This will mark it as deleted.')) return;
            try {
                const res = await fetch(`${API_BASE_ORG_STRUCTURE}/${encodeURIComponent(orgUnitRoleId)}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Failed to delete structure');
                const orgUnitId = editStructureUnitSelect ? editStructureUnitSelect.value : '';
                await loadEditStructureRoles(orgUnitId);
                await renderOrgTree(orgUnitId, undefined, 40, 220, false, false);
                loadTotalRolesCount();
                loadTotalUnitsCount();
                loadUniqueRolesCount();
            } catch (err) {
                console.error('Delete structure error:', err);
                alert('Delete failed: ' + err.message);
            }
        });
    }

    async function renderOrgTree(orgUnitId, container = document.getElementById('org-tree-container'), nodeHeight = 80, nodeWidth = 280, showImagePlaceholder = true, centerVertically = true, bottomPadding = 1000) {
        if (!container) return;
        if (!orgUnitId) {
            container.innerHTML = '<span style="color: #999; font-size: 13px;">Select a unit to view its organizational chart.</span>';
            return;
        }
        try {
            const res = await fetch(`${API_BASE_ORG_STRUCTURE}/org-unit/${encodeURIComponent(orgUnitId)}`);
            if (!res.ok) throw new Error('Failed to fetch structure');
            const structures = await res.json();
            container.innerHTML = '';
            if (!structures || structures.length === 0) {
                container.innerHTML = '<span style="color: #999; font-size: 13px;">No hierarchy data for this unit.</span>';
                return;
            }
            container.style.overflow = 'auto';
            const margin = { top: 10, right: 10, bottom: 10, left: 10 };
            const root = d3.stratify()
                .id(d => d.org_unit_role_id)
                .parentId(d => d.parent_id === 'Root' ? null : d.parent_id)(structures);
            root.x0 = 0;
            root.y0 = 0;
            const nodeHalfH = nodeHeight / 2;
            const treeLayout = d3.tree().nodeSize([nodeHeight + 20, nodeWidth]);
            treeLayout(root);
            let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
            root.each(d => {
                if (d.x > x1) x1 = d.x;
                if (d.x < x0) x0 = d.x;
                if (d.y > y1) y1 = d.y;
                if (d.y < y0) y0 = d.y;
            });
            const nodeHalfW = showImagePlaceholder ? 220 : 80;
            const actualNodeWidth = showImagePlaceholder ? 440 : 160;
            const width = y1 - y0 + nodeHalfW * 2 + margin.left + margin.right;
            const height = x1 - x0 + nodeHeight + margin.top + margin.bottom + bottomPadding;
            const verticalCenterOffset = centerVertically ? (x1 - x0) / 2 : 0;
            const svg = d3.select(container).append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('display', 'block')
                .style('overflow', 'visible');
            const g = svg.append('g')
                .attr('transform', `translate(${margin.left + nodeHalfW - y0},${margin.top + nodeHalfH - x0 + verticalCenterOffset})`);
            const link = g.selectAll('.link')
                .data(root.links())
                .enter().append('path')
                .attr('class', 'link')
                .attr('d', d => {
                    const r = 8;
                    const sx = d.source.y + nodeHalfW;
                    const tx = d.target.y - nodeHalfW;
                    const sy = d.source.x + nodeHalfH;
                    const ty = d.target.x - nodeHalfH;
                    const mx = (sx + tx) / 2;
                    const dir = ty >= sy ? 1 : -1;
                    return `M${sx},${sy}H${mx - r}Q${mx},${sy} ${mx},${sy + dir * r}V${ty - dir * r}Q${mx},${ty} ${tx},${ty}`;
                })
                .attr('fill', 'none')
                .attr('stroke', '#9ca3af')
                .attr('stroke-width', 1.5);;
            const node = g.selectAll('.node')
                .data(root.descendants())
                .enter().append('g')
                .attr('class', 'node')
                .attr('transform', d => `translate(${d.y},${d.x})`);
            node.append('rect')
                .attr('width', actualNodeWidth)
                .attr('height', showImagePlaceholder ? nodeHeight : 40)
                .attr('x', -nodeHalfW)
                .attr('y', showImagePlaceholder ? -nodeHalfH : -20)
                .attr('rx', 6)
                .attr('fill', '#fff')
                .attr('stroke', '#2563eb')
                .attr('stroke-width', 1.5);
            if (showImagePlaceholder) {
                const imgSize = 180;
                const imgY = -nodeHalfH + 10;
                const imgX = -nodeHalfW + 10;
                
                node.append('image')
                    .attr('class', 'node-image')
                    .attr('href', d => {
                        if (d.data.photo_file_name && d.data.folder_name) {
                            return `${API_BASE_UPLOADS}/${encodeURIComponent(d.data.folder_name)}/${encodeURIComponent(d.data.photo_file_name)}`;
                        }
                        return null;
                    })
                    .attr('width', imgSize)
                    .attr('height', imgSize)
                    .attr('x', imgX)
                    .attr('y', imgY)
                    .attr('preserveAspectRatio', 'xMidYMid slice')
                    .on('error', function() {
                        d3.select(this).style('display', 'none');
                    });
                
                node.append('rect')
                    .attr('class', 'node-image-placeholder-bg')
                    .attr('x', imgX)
                    .attr('y', imgY)
                    .attr('width', imgSize)
                    .attr('height', imgSize)
                    .attr('rx', 4)
                    .attr('fill', d => (d.data.photo_file_name && d.data.folder_name) ? 'none' : '#f3f4f6')
                    .attr('stroke', d => (d.data.photo_file_name && d.data.folder_name) ? 'none' : '#d1d5db')
                    .attr('stroke-width', 1);
                
                node.append('text')
                    .attr('class', 'node-image-text')
                    .attr('x', imgX + imgSize / 2)
                    .attr('y', imgY + imgSize / 2)
                    .text(d => (d.data.photo_file_name && d.data.folder_name) ? '' : '2x2')
                    .attr('font-size', Math.max(8, imgSize * 0.25) + 'px')
                    .attr('fill', '#9ca3af')
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'central');
                
                const textCenterX = imgX + imgSize + 8 + (actualNodeWidth - imgSize - 18) / 2;
                const nameY = -nodeHalfH + 25;
                const empIdY = -nodeHalfH + 50;
                const roleTitleY = -nodeHalfH + 82;
                const roleCodeY = -nodeHalfH + 110;
                node.append('text')
                    .attr('class', 'node-name')
                    .attr('x', textCenterX)
                    .attr('y', nameY)
                    .text(d => (d.data.first_name && d.data.last_name) ? `${d.data.last_name}, ${d.data.first_name}` : 'Name')
                    .attr('font-size', '11px')
                    .attr('fill', d => (d.data.first_name && d.data.last_name) ? '#111827' : '#9ca3af')
                    .attr('text-anchor', 'middle');
                node.append('text')
                    .attr('class', 'node-empid')
                    .attr('x', textCenterX)
                    .attr('y', empIdY)
                    .text(d => d.data.employee_id || 'Employee ID')
                    .attr('font-size', '11px')
                    .attr('fill', d => d.data.employee_id ? '#6b7280' : '#9ca3af')
                    .attr('text-anchor', 'middle');
                node.append('text')
                    .attr('class', 'node-title')
                    .attr('x', textCenterX)
                    .attr('y', roleTitleY)
                    .text(d => d.data.role_title || d.id)
                    .attr('font-size', '18px')
                    .attr('font-weight', '700')
                    .attr('fill', '#111827')
                    .attr('text-anchor', 'middle');
                node.append('text')
                    .attr('class', 'node-rolecode')
                    .attr('x', textCenterX)
                    .attr('y', roleCodeY)
                    .text(d => d.id)
                    .attr('font-size', '12px')
                    .attr('fill', '#6b7280')
                    .attr('text-anchor', 'middle');
            } else {
                node.append('text')
                    .attr('dy', '0.35em')
                    .attr('text-anchor', 'middle')
                    .text(d => d.data.role_title || d.id)
                    .attr('font-size', '12px')
                    .attr('fill', '#111827');
                node.append('text')
                    .attr('dy', '1.6em')
                    .attr('text-anchor', 'middle')
                    .text(d => d.id)
                    .attr('font-size', '10px')
                    .attr('fill', '#6b7280');
            }
        } catch (err) {
            console.error('Failed to render org tree:', err);
            container.innerHTML = '<span style="color: #c0392b; font-size: 13px;">Failed to render organizational chart.</span>';
        }
    }

    if (editOrgBtn && editStructureModal) {
        editOrgBtn.addEventListener('click', async () => {
            populateEditStructureUnitDropdown();
            editStructureModal.style.display = 'flex';
        });
    }

    if (closeEditStructureModal && editStructureModal) {
        closeEditStructureModal.addEventListener('click', () => {
            editStructureModal.style.display = 'none';
        });
    }

    if (editStructureModal) {
        editStructureModal.addEventListener('click', (e) => {
            if (e.target === editStructureModal) editStructureModal.style.display = 'none';
        });
    }

    if (editStructureUnitSelect) {
        editStructureUnitSelect.addEventListener('change', async () => {
            const selectedId = editStructureUnitSelect.value;
            if (!selectedId) {
                if (editStructureTotalRoles) editStructureTotalRoles.textContent = '0';
                if (editStructureRolesTableBody) {
            editStructureRolesTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>';
                }
                if (editStructurePagination) {
                    editStructurePagination.innerHTML = '';
                }
                if (editStructureRoleSelect) editStructureRoleSelect.innerHTML = '<option value="">Select Role</option>';
                if (editStructureReportsTo) editStructureReportsTo.innerHTML = '<option value="Root">Root</option>';
                const container = document.getElementById('org-tree-container');
                if (container) container.innerHTML = '<span style="color: #999; font-size: 13px;">Select a unit to view its organizational chart.</span>';
                return;
            }
            await Promise.all([
                loadEditStructureRoles(selectedId),
                renderOrgTree(selectedId, undefined, 40, 220, false, false)
            ]);
        });
    }

    if (editStructureAddRoleBtn) {
        editStructureAddRoleBtn.addEventListener('click', async () => {
            const orgUnitId = editStructureUnitSelect ? editStructureUnitSelect.value : '';
            const orgUnitName = editStructureUnitSelect ? (editStructureUnitSelect.options[editStructureUnitSelect.selectedIndex]?.text || '').trim() : '';
            const roleTitle = editStructureRoleSelect ? (editStructureRoleSelect.options[editStructureRoleSelect.selectedIndex]?.text || '').trim() : '';
            const parentId = editStructureReportsTo ? editStructureReportsTo.value : 'Root';
            if (!orgUnitId) { alert('Please select an organizational unit'); return; }
            if (!roleTitle) { alert('Please select a role'); return; }
            try {
                const nextIdRes = await fetch(`${API_BASE_ORG_STRUCTURE}/next-id`);
                if (!nextIdRes.ok) throw new Error('Failed to fetch next structure ID');
                const nextIdData = await nextIdRes.json();
                const orgUnitRoleId = nextIdData.org_unit_role_id;
                const res = await fetch(`${API_BASE_ORG_STRUCTURE}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ org_unit_role_id: orgUnitRoleId, org_unit_id: orgUnitId, org_unit_name: orgUnitName, role_title: roleTitle, parent_id: parentId, status: 'Active' })
                });
                if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Failed to save structure'); }
                const saved = await res.json();
                alert('Role added to structure successfully');
                await loadEditStructureRoles(orgUnitId);
                await renderOrgTree(orgUnitId, undefined, 40, 220, false, false);
                loadOrganizationalUnits();
                loadOrganizationalRoles();
                loadTotalRolesCount();
                loadTotalUnitsCount();
                loadUniqueRolesCount();
                populateOrgChartDropdown();
            } catch (err) {
                console.error('Add structure error:', err);
                alert('Add failed: ' + err.message);
            }
        });
    }
}
